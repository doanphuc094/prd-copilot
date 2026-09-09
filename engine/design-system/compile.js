#!/usr/bin/env node
/**
 * compile.js — Trình biên dịch bộ luật design system
 *
 * Người bảo trì sửa các lớp nguồn (rules/ + profile.<cty>/).
 * Agent đọc ĐÚNG file build/<component>.resolved.yaml do script này sinh ra.
 *
 * Vì sao cần bước này: tách lớp làm việc đọc 1 quyết định phải mở 6-7 file.
 * Không có bản resolve thì agent phải tự gom, và sẽ có lần gom thiếu rồi đoán
 * — đúng thứ _core.discipline.never_guess cấm. Xem _core.profile_contract.resolved_view
 *
 * Dùng:
 *   node compile.js                 # compile mọi component trong manifest
 *   node compile.js Button          # compile 1 component
 *   node compile.js --check         # chỉ kiểm, không ghi file
 *
 * Phụ thuộc: js-yaml  (npm i js-yaml)
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = __dirname;
const argv = process.argv.slice(2);
const CHECK_ONLY = argv.includes("--check");
const ONLY = argv.find((a) => !a.startsWith("--"));

const errors = [];
const warnings = [];
const notes = [];

const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const note = (m) => notes.push(m);

function loadYaml(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) {
    err(`Không tìm thấy file: ${rel}`);
    return null;
  }
  try {
    // Chặn key trùng — yaml.load im lặng lấy key cuối, che mất lỗi thật
    return yaml.load(fs.readFileSync(p, "utf8"), {
      filename: rel,
      onWarning: (w) => warn(`${rel}: ${w.message}`),
      json: false,
    });
  } catch (e) {
    err(`${rel} không parse được: ${e.message}`);
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Tiện ích đi cây
 * ------------------------------------------------------------------ */

const RULE_ID = /^[A-Z][A-Z0-9]*(-[A-Z0-9]+)*(-[a-z])?$/;

function walk(node, fn, trail = []) {
  fn(node, trail);
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, fn, trail.concat(String(i))));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walk(v, fn, trail.concat(k));
  }
}

function collectRules(tree, sourceFile) {
  const out = [];
  walk(tree, (n) => {
    if (n && typeof n === "object" && !Array.isArray(n) && typeof n.id === "string" && RULE_ID.test(n.id)) {
      out.push({ id: n.id, body: n, source: sourceFile });
    }
  });
  return out;
}

function stripKeys(node, keys) {
  if (Array.isArray(node)) return node.map((v) => stripKeys(v, keys));
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (keys.includes(k)) continue;
      out[k] = stripKeys(v, keys);
    }
    return out;
  }
  return node;
}

function dig(obj, dotted) {
  const parts = dotted.split(".").filter((p) => p && !p.startsWith("_"));
  let cur = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return undefined;
  }
  return cur;
}

/* ------------------------------------------------------------------ *
 * Nạp manifest
 * ------------------------------------------------------------------ */

const manifest = loadYaml("manifest.yaml");
if (!manifest) {
  console.error("Không nạp được manifest.yaml — dừng.");
  process.exit(1);
}

const aliases = manifest.rule_id_aliases || {};
const stripList = (manifest.build && manifest.build.strip_fields && manifest.build.strip_fields.keys) || [];

/* ------------------------------------------------------------------ *
 * Lằn ranh chống lạm dụng
 * ------------------------------------------------------------------ */

function checkGuardrails() {
  const kinds = manifest.component_kinds || {};
  for (const [name, k] of Object.entries(kinds)) {
    const members = [...(k.members_active || []), ...(k.members_planned || [])];
    if (members.length < 3) {
      warn(
        `guardrail kind_needs_3_members: kind '${name}' chỉ có ${members.length} thành viên ` +
          `(cần >= 3). Kind cho 1 component là luật component đội lốt.`
      );
    }
    // Lằn ranh #2: kind phẳng, không thừa kế
    if (k.parent || k.extends || k.inherits) {
      err(`guardrail flat_kinds_only: kind '${name}' khai kind cha — cấm thừa kế.`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Compile 1 component
 * ------------------------------------------------------------------ */

function compileComponent(name, spec) {
  const layerFiles = [];
  const trees = {};

  // --- lớp luật ---
  const coreFile = manifest.rule_layers.find((l) => l.id === "core").file;
  trees.core = loadYaml(coreFile);
  layerFiles.push(coreFile);

  const kindFiles = [];
  for (const kindName of spec.kinds || []) {
    const k = (manifest.component_kinds || {})[kindName];
    if (!k) {
      err(`${name}: khai kind '${kindName}' nhưng manifest không định nghĩa kind này.`);
      continue;
    }
    if (!fs.existsSync(path.join(ROOT, k.file))) {
      err(`${name}: kind '${kindName}' trỏ tới ${k.file} — file không tồn tại.`);
      continue;
    }
    kindFiles.push(k.file);
    trees[`kind:${kindName}`] = loadYaml(k.file);
    layerFiles.push(k.file);
  }

  if (spec.rules) {
    trees.component = loadYaml(spec.rules);
    layerFiles.push(spec.rules);
  }

  const compFile = manifest.rule_layers.find((l) => l.id === "composition").file;
  const compositionAll = loadYaml(compFile);
  layerFiles.push(compFile);

  // --- lọc luật liên component theo `involves` ---
  const claimTokens = new Set([name, name.toLowerCase(), ...(spec.kinds || [])]);
  const compositionRules = [];
  const compositionSkipped = [];
  for (const r of collectRules(compositionAll, compFile)) {
    const involves = r.body.involves || [];
    const hit = involves.some((i) => claimTokens.has(i));
    (hit ? compositionRules : compositionSkipped).push(r);
  }
  trees.composition = { rules: compositionRules.map((r) => r.body) };

  // --- giá trị ---
  const sharedBinding = loadYaml(manifest.shared_binding) || {};
  const compBinding = spec.binding ? loadYaml(spec.binding) || {} : {};
  const policyRaw = loadYaml(manifest.policy) || {};

  // policy: gộp shared + scope của component thành 1 namespace phẳng
  const scope = spec.policy_scope;
  const policy = Object.assign({}, policyRaw.shared || {}, (scope && policyRaw[scope]) || {});
  const binding = Object.assign({}, sharedBinding, compBinding);

  // --- phát hiện xung đột giữa các kind (lằn ranh #3) ---
  const byId = new Map();
  for (const [layerName, tree] of Object.entries(trees)) {
    if (!tree) continue;
    for (const r of collectRules(tree, layerName)) {
      if (byId.has(r.id)) {
        const prev = byId.get(r.id);
        const a = JSON.stringify(prev.body);
        const b = JSON.stringify(r.body);
        if (a !== b && prev.source !== r.source) {
          err(
            `guardrail conflict_is_error: rule '${r.id}' được khai ở CẢ '${prev.source}' và ` +
              `'${r.source}' với nội dung khác nhau. Xung đột nghĩa là mô hình sai — sửa mô hình, ` +
              `không để compiler tự chọn bên.`
          );
        }
      } else {
        byId.set(r.id, r);
      }
    }
  }

  // --- lằn ranh #4: file component phải nhỏ ---
  if (trees.component) {
    const own = collectRules(trees.component, "component").filter(
      (r) => !(trees.component.rules_live_at && JSON.stringify(trees.component.rules_live_at).includes(r.id))
    );
    if (own.length > 5) {
      warn(
        `guardrail component_file_stays_small: ${spec.rules} khai ${own.length} rule (> 5). ` +
          `File component phình lên là dấu hiệu kind SAI — bốc luật lên kind, đừng nuôi file này.`
      );
    }
    note(`${name}: file luật riêng khai ${own.length} rule.`);
  }

  // --- rule_toggles ---
  const undisableable = new Set();
  for (const tree of Object.values(trees)) {
    if (tree && Array.isArray(tree.undisableable)) tree.undisableable.forEach((id) => undisableable.add(id));
    if (tree) {
      walk(tree, (n) => {
        if (n && typeof n === "object" && n.id && n.undisableable === true) undisableable.add(n.id);
      });
    }
  }
  const disabled = [];
  for (const [rid, cfg] of Object.entries(policyRaw.rule_toggles || {})) {
    if (cfg && cfg.enabled === false) {
      if (undisableable.has(rid)) {
        err(
          `policy cố tắt '${rid}' nhưng luật này có cờ undisableable. ` +
            `Không tắt được luật thuộc discipline / a11y / an toàn dữ liệu.`
        );
      } else {
        if (!cfg.reason) err(`policy tắt '${rid}' mà không ghi reason — bắt buộc phải có lý do.`);
        disabled.push(rid);
      }
    }
  }

  // --- kiểm tham chiếu profile.* ---
  const refs = new Set();
  for (const tree of Object.values(trees)) {
    if (!tree) continue;
    walk(tree, (n) => {
      if (typeof n === "string") {
        for (const m of n.matchAll(/profile\.(policy|binding)\.([A-Za-z_][\w.]*)/g)) {
          refs.add(`${m[1]}|${m[2]}`);
        }
      }
    });
  }
  const unresolved = [];
  for (const r of refs) {
    const [kind, p] = r.split("|");
    const target = kind === "policy" ? policy : binding;
    if (dig(target, p) === undefined) unresolved.push(`profile.${kind}.${p}`);
  }
  for (const u of unresolved) err(`${name}: tham chiếu không giải được → ${u}`);

  // --- kiểm AX-PHY-01: trục ordered_scale_physical phải có giá trị thật ---
  for (const [axisName, axisSpec] of Object.entries(spec.axes || {})) {
    if (axisSpec.kind !== "ordered_scale_physical") continue;
    const b = binding[axisName];
    const hasReal =
      b && (b.height_px || b.width_px || b.value_px || Object.keys(b).some((k) => /_px$/.test(k)));
    if (!hasReal) {
      err(
        `${name}: trục '${axisName}' khai kind ordered_scale_physical nhưng binding KHÔNG có giá trị ` +
          `thật (AX-PHY-01). Thiếu số thật thì mọi luật dạng "phải >= ngưỡng" trở thành vô hiệu âm thầm.`
      );
    }
  }

  // --- gom invariant thành hàm chấm ---
  const invariants = [];
  for (const [layerName, tree] of Object.entries(trees)) {
    if (!tree) continue;
    walk(tree, (n) => {
      if (n && typeof n === "object" && n.id && typeof n.check === "string") {
        if (disabled.includes(n.id)) return;
        invariants.push({
          id: n.id,
          layer: layerName,
          rule: n.rule || n.name || null,
          check: n.check,
          severity: n.severity || "error",
          undisableable: undisableable.has(n.id) || n.undisableable === true,
        });
      }
    });
  }

  // --- emit ---
  const resolvedRules = {};
  for (const [layerName, tree] of Object.entries(trees)) {
    if (!tree) continue;
    resolvedRules[layerName] = stripKeys(tree, stripList);
  }

  // Lớp giá trị bị strip mạnh tay hơn lớp luật — xem manifest.build.strip_fields_values
  const stripValues = [
    ...stripList,
    ...((manifest.build && manifest.build.strip_fields_values && manifest.build.strip_fields_values.keys) || []),
  ].filter(
    (k) =>
      !(
        (manifest.build &&
          manifest.build.keep_fields_values &&
          manifest.build.keep_fields_values.keys) ||
        []
      ).includes(k)
  );

  const out = {
    _generated: {
      by: "compile.js",
      at: new Date().toISOString().slice(0, 10),
      component: name,
      kinds: spec.kinds,
      from_layers: layerFiles,
      warning:
        "FILE SINH TỰ ĐỘNG — KHÔNG sửa tay. Sửa ở rules/ hoặc profile.<cty>/ rồi chạy lại compile.js",
      read_this_file_only:
        "Agent đọc đúng file này. Không cần mở lớp nguồn; mọi tham chiếu profile.* đã có giá trị ở § values.",
    },
    values: {
      policy: stripKeys(policy, stripValues),
      binding: stripKeys(binding, stripValues),
    },
    rules: resolvedRules,
    invariants_count: invariants.length,
    disabled_rules: disabled,
    composition_not_applicable: compositionSkipped.map((r) => ({
      id: r.id,
      involves: r.body.involves,
    })),
  };

  return { name, out, invariants, compositionSkipped, layerFiles };
}

/* ------------------------------------------------------------------ *
 * Chạy
 * ------------------------------------------------------------------ */

checkGuardrails();

const components = manifest.components || {};
const targets = ONLY ? { [ONLY]: components[ONLY] } : components;
if (ONLY && !components[ONLY]) {
  console.error(`Manifest không có component '${ONLY}'. Có: ${Object.keys(components).join(", ")}`);
  process.exit(1);
}

const buildDir = path.join(ROOT, (manifest.build && manifest.build.dir) || "build");
if (!CHECK_ONLY && !fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });

const results = [];
const claimedComposition = new Set();

for (const [name, spec] of Object.entries(targets)) {
  const r = compileComponent(name, spec);
  results.push(r);
  collectRules(r.out.rules.composition || {}, "x").forEach((x) => claimedComposition.add(x.id));

  if (!CHECK_ONLY) {
    const yamlPath = path.join(buildDir, `${name.toLowerCase()}.resolved.yaml`);
    const jsonPath = path.join(buildDir, `${name.toLowerCase()}.invariants.json`);
    fs.writeFileSync(yamlPath, yaml.dump(r.out, { lineWidth: 100, noRefs: true, sortKeys: false }), "utf8");
    fs.writeFileSync(jsonPath, JSON.stringify({ component: name, invariants: r.invariants }, null, 2), "utf8");
  }
}

// luật liên component chưa component nào nhận — để nó không biến mất im lặng
const allComposition = collectRules(loadYaml(manifest.rule_layers.find((l) => l.id === "composition").file), "c");
const orphans = allComposition.filter((r) => !claimedComposition.has(r.id));
if (orphans.length && !ONLY) {
  for (const o of orphans) {
    note(
      `luật liên component chưa component nào nhận: ${o.id} (involves: ${(o.body.involves || []).join(", ")}) ` +
        `— sẽ được nạp khi component tương ứng vào manifest.`
    );
  }
}

/* ------------------------------------------------------------------ *
 * Báo cáo
 * ------------------------------------------------------------------ */

console.log("=".repeat(72));
console.log(`BIÊN DỊCH BỘ LUẬT — ${results.length} component`);
console.log("=".repeat(72));

for (const r of results) {
  const size = Buffer.byteLength(yaml.dump(r.out), "utf8");
  console.log(`\n${r.name}`);
  console.log(`  kinds        : ${(r.out._generated.kinds || []).join(", ")}`);
  console.log(`  gộp từ       : ${r.layerFiles.length} file`);
  console.log(`  invariant    : ${r.invariants.length}`);
  console.log(`  luật bị tắt  : ${r.out.disabled_rules.length ? r.out.disabled_rules.join(", ") : "không"}`);
  console.log(`  liên comp bỏ : ${r.compositionSkipped.length} (không dính tới component này)`);
  console.log(`  kích thước   : ${size} bytes  (~${Math.round(size / 3)} token ước lượng)`);
}

const emit = (label, arr) => {
  if (!arr.length) return;
  console.log(`\n${label} (${arr.length})`);
  arr.forEach((m) => console.log(`  - ${m}`));
};
emit("GHI CHÚ", notes);
emit("CẢNH BÁO", warnings);
emit("LỖI", errors);

console.log(
  `\n${errors.length ? "THẤT BẠI" : "OK"} — ${errors.length} lỗi, ${warnings.length} cảnh báo` +
    (CHECK_ONLY ? " (chế độ --check, không ghi file)" : ` → ${path.relative(ROOT, buildDir)}/`)
);
process.exit(errors.length ? 1 : 0);
