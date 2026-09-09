#!/usr/bin/env node
/**
 * compile-v1-to-render-dsl.js — Phase 1 MVP (2026-09-06)
 *
 * Biên dịch schema v1 (semantic, PRD Copilot, spec-v1-*.json) sang spec.json
 * cấp render DSL mà ghn-figma-renderer.js / validate-spec.js đọc được
 * (folder ghn-figma-pipeline).
 *
 * CẬP NHẬT 2026-09-06 (Williams chốt hướng 1, xem `phase1-compiler-notes.md`
 * Mục 4): `ghn-figma-renderer.js` ĐÃ được vá thêm (chỉ thêm, không đổi code
 * cũ) — nếu 1 node có field "specId", renderer tự ghi ID đó vào
 * `pluginData` của node Figma vừa tạo (FRAME/TEXT/INSTANCE). Compiler này
 * giờ gán "specId" cho: root mỗi screen (= id screen), 1 số section-level
 * frame chính (toolbar, bảng, modal card), và mỗi button (slug từ label).
 * Granularity hiện tại là THÔ (screen/section/button), CHƯA xuống tới từng
 * ô bảng/field lẻ — đủ cho vùng khoá/tự do ở mức section, chưa đủ cho patch
 * cực nhỏ (Phase 2) — sẽ tinh chỉnh khi cần.
 *
 * ============================== PHẠM VI MVP ==============================
 * Viết tay theo cấu trúc màn #06 (quản lý chi phí phát sinh: 1 màn chính +
 * 4 modal), CHƯA tổng quát hoá cho mọi section type có thể có trong schema
 * v1 — coi đây là bản chứng minh khái niệm (proof of concept), không phải
 * compiler hoàn chỉnh.
 *
 * CẬP NHẬT 2026-09-07 (Williams yêu cầu "giải quyết 2 việc" sau khi verify
 * 100% 71 standalone components — xem `phase1-compiler-notes.md` Mục 10):
 * search box trên toolbar và các field nhập liệu trong modal form_section
 * (trừ attachment/date_range/radio_group_with_description — xem "CHƯA CÓ")
 * giờ dùng INSTANCE component DS THẬT (Input/Textarea/Select organism),
 * KHÔNG còn là FRAME placeholder giả lập. Xem emitInputField()/
 * emitTextareaField()/emitSelectField() — path override + hideLayers đọc
 * trực tiếp từ get_metadata() thật trên file GHN-DS (zECOR8UK45lmZcpMG9aOR7),
 * không suy đoán tên layer.
 *
 * CÓ:
 *  - Page shell: sidebar (PARTIAL) + globalActionHome (PARTIAL) + page header
 *  - toolbar_standard: search = INSTANCE "Input / Input organism" thật +
 *    filter button + right_actions
 *  - table_card → PARTIAL "table" (xem giản lược ở dưới)
 *  - status_filter_tabs → placeholder TEXT (chưa dùng INSTANCE Tabs thật)
 *  - modal (screen_type=modal) → FRAME trung tâm, form_section (read_only/
 *    summary/numbered_list_readonly = TEXT rows như cũ; field nhập liệu
 *    text/number/phone → INSTANCE "Input organism", textarea → INSTANCE
 *    "Textarea organism", select → INSTANCE "↳ Select :: Select" — cả 3 đều
 *    là component DS thật, xác nhận live Figma), footer buttons
 *  - transitions giữa các screen (từ opens_screen trong row_actions/
 *    menu_items/buttons)
 *
 * CHƯA CÓ (bỏ qua, không vẽ node giả để tránh trông như "xong"):
 *  - filter_panel, column_visibility_panel (popover, chưa xác nhận component)
 *  - bulk_action_bar (visible_when = có chọn dòng, mặc định ẩn nên bỏ qua)
 *  - input_type "attachment" — KHÔNG tìm thấy component upload/attachment
 *    thật trong GHN-DS (chỉ có "Upload" ở library khác — "GHN (Freight)
 *    Design System", 1 wrapper Ant Design, SAI library) — vẫn giữ khung
 *    placeholder, ghi rõ trong node để không nhầm là đã xác nhận.
 *  - input_type "date_range" — cần Calendar/DateRangePicker, CHƯA khảo sát
 *    biến thể đúng, vẫn giữ khung placeholder.
 *  - input_type "radio_group_with_description" — render ở nhánh khác (không
 *    thuộc phạm vi field text/select/textarea sửa lần này).
 *  - Select mới chỉ vẽ Ở TRẠNG THÁI ĐÓNG (component "↳ Select :: Select" =
 *    cái trigger) — CHƯA vẽ menu mở ("SelectMenu"/"Parts/selectItem"), vì
 *    MVP chỉ cần trạng thái tĩnh trên form, không demo tương tác mở dropdown.
 *
 * GIẢN LƯỢC ĐÃ BIẾT TRONG table_card (mất thông tin thị giác so với schema
 * v1 đã chốt, xem finding #3 trong spec-v1-06 — chính schema cũng đã ghi
 * nhận 2 display_type này chưa có enum khớp gọn):
 *  - "text_bold_badge_below" (Khách hàng: tên + chip; Loại điểm: tên + badge
 *    màu) → PARTIAL table chỉ hỗ trợ multi-line dạng mảng string (2 dòng
 *    TEXT thường), KHÔNG có badge/chip màu bên dưới → dòng 2 mất màu.
 *  - "Số tiền ghi nhận" (số tiền + nút [Xem ảnh]) → PARTIAL table không có
 *    cell dạng "text + button" → chỉ vẽ số tiền, bỏ nút.
 *
 * QUYẾT ĐỊNH KIẾN TRÚC — KHÔNG dùng PARTIAL "button"/"footerActions":
 * 2 partial đó hardcode 1 cặp Style×Type cố định mỗi variant (xem
 * ghn-figma-renderer.js ~dòng 765) — không đủ biểu diễn
 * global.button_color_semantics (role × style_override_allowed) đã chốt.
 * Compiler tự emit INSTANCE Button, set Style/Type trực tiếp theo
 * ghn-ds-properties-reference.json (2 property độc lập, xác nhận đủ combo
 * enum) — xem emitButton().
 *
 * ⚠️ CHƯA XÁC NHẬN THẬT (property-level — validate-spec.js không bắt được,
 * chỉ lộ khi render thật, xem chính lời cảnh báo trong validate-spec.js):
 *  - Badge "Đỏ" → tạm Type="Destructive" (suy từ tên enum, CHƯA render thử).
 *    Grey→"Grey", Green→"Success" lấy từ ví dụ renderer thật (đáng tin hơn).
 *  - Button Style×Type ngoài 4 tổ hợp PARTIAL cũ dùng (vd Outline+Secondary,
 *    Outline+Destructive) — property list cho thấy 2 field độc lập, nhưng
 *    PIPELINE-SUMMARY.md cảnh báo "một số cặp variant bị khoá với nhau" —
 *    CHƯA chạy thử thật trên Figma.
 *  - Sidebar item list dùng PLACEHOLDER 1 module — MENU-THEO-HE-THONG.md tự
 *    xác nhận danh sách module thật của B2B portal "CHƯA khảo sát" — không
 *    tự bịa, chờ Williams/Figma MCP khảo sát trước khi push Figma thật.
 *
 * Input:  spec-v1-*.json (schema v1)
 * Output: render-DSL JSON { flowName, screens[], transitions[] }
 * Chạy:   node compile-v1-to-render-dsl.js <input.json> <output.json>
 * ==========================================================================
 */

const fs = require("fs");

function slugify(s) {
  return String(s)
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

const BUTTON_COMPONENT = "⚫ Button :: Button / Button organism";

const ROLE_TO_TYPE = {
  primary: "Primary",
  secondary: "Secondary",
  destructive: "Destructive",
  cancel: "Grey",
};
const STYLE_TO_DS = { Fill: "Fill Round", Outline: "Outline Round" };
const BADGE_TYPE = { grey: "Grey", green: "Success", red: "Destructive" /* CHƯA XÁC NHẬN */ };

function emitButton(label, role, styleOverride, buttonSemantics, opts) {
  opts = opts || {};
  const sem = buttonSemantics && buttonSemantics[role];
  const effectiveStyle = styleOverride || (sem && sem.default_style) || "Outline";
  const type = ROLE_TO_TYPE[role] || "Grey";
  const style = STYLE_TO_DS[effectiveStyle] || "Outline Round";
  const node = {
    type: "INSTANCE",
    component: BUTTON_COMPONENT,
    _compiler_note: `role=${role} effective_style=${effectiveStyle} — bypass PARTIAL "button", xem header file compiler`,
    specId: opts.specId,
    props: {
      Style: style,
      Size: opts.size || "md",
      Type: type,
      State: opts.disabled ? "Disable" : "Default",
      "iconLeft#17:0": !!opts.icon,
      "iconRight#17:5": !!opts.iconRight,
    },
    overrides: { Button: label },
  };
  if (opts.icon) {
    node.nestedProps = {
      "font awesome / Base": { Type: "regular", Size: "16", "↳ Content#5679:21": opts.icon },
    };
  }
  return node;
}

// ============================================================================
// emitInputField / emitTextareaField / emitSelectField — thêm 2026-09-07.
//
// Thay 2 khung placeholder cũ (search box toolbar + field nhập liệu modal)
// bằng INSTANCE component DS THẬT. Cả 3 component + mọi path override/
// hideLayers dưới đây đã xác nhận LIVE qua mcp__Figma__get_metadata trên
// chính file GHN-DS thật (zECOR8UK45lmZcpMG9aOR7), KHÔNG suy đoán tên layer
// từ ảnh chụp hay tài liệu cũ — xem phase1-compiler-notes.md Mục 10.
//
// Path override dùng cú pháp ">" y hệt renderer (xem ghn-figma-renderer.js,
// đoạn xử lý node.overrides): nối tên layer từ ngoài vào trong, đúng thứ tự
// panel Layers trong Figma.
// ============================================================================

const INPUT_COMPONENT = "⚫ Input :: Input / Input organism";
const TEXTAREA_COMPONENT = "⚫ Textarea :: Textarea / Textarea organism";
const SELECT_COMPONENT = "↳ Select :: Select";

// "Text input" (frame) > "Label" (instance) > "Text input container" >
// "Text input" > "Label" (TEXT) — xác nhận qua get_metadata node 40:1724.
const INPUT_LABEL_PATH = "Text input > Label > Text input container > Text input > Label";
// "Text input" > "Input / Input filed type (Base)" > "Input / Input text
// type (Base)" > "Text" — xác nhận qua get_metadata node 67:17462 → 725:7527.
const INPUT_VALUE_PATH = "Text input > Input / Input filed type (Base) > Input / Input text type (Base) > Text";

// "Frame 48096428" (tên frame gốc trong file DS, không đổi được) > "Textarea
// / Textarea label (Base)" > "topWrapper" > "Container" > "Label" — xác nhận
// qua get_metadata node 909:61021 → 948:26175.
const TEXTAREA_LABEL_PATH = "Frame 48096428 > Textarea / Textarea label (Base) > topWrapper > Container > Label";
// "Frame 48096428" > "Textarea / Textarea body (Base)" > "Text" — xác nhận
// qua get_metadata node 909:60879.
const TEXTAREA_VALUE_PATH = "Frame 48096428 > Textarea / Textarea body (Base) > Text";

// "Input / Input label (Base)" > "topWrapper" > "Container" > "Label" — xác
// nhận qua get_metadata node 42:4974 (component set "↳ Select :: Select").
const SELECT_LABEL_PATH = "Input / Input label (Base) > topWrapper > Container > Label";
// "Combobox" > "Content" > "Text" — xác nhận qua get_metadata node 42:4973.
const SELECT_VALUE_PATH = "Combobox > Content > Text";

// emitInputField: input_type text/number/phone VÀ search box toolbar.
// hideLayers=["Mandatory","Conditions"]: "Mandatory" (dấu * bắt buộc bake sẵn
// trong component) bị ẩn luôn — required hiển thị qua hậu tố " *" tự thêm
// vào label text thay vì bật lại layer này (renderer chỉ hỗ trợ ẨN, không hỗ
// trợ HIỆN LẠI 1 layer đang ẩn mặc định — xem node.hideLayers trong
// ghn-figma-renderer.js). "Conditions" là block demo/hint phụ không cần cho
// MVP tĩnh này — đã có tiền lệ dùng đúng cách này trong chính ví dụ mẫu nhúng
// sẵn trong ghn-figma-renderer.js (tìm "Filter row" trong file đó).
function emitInputField(label, valueText, opts) {
  opts = opts || {};
  const overrides = {};
  if (label != null) overrides[INPUT_LABEL_PATH] = label;
  if (valueText != null) overrides[INPUT_VALUE_PATH] = valueText;
  const node = {
    type: "INSTANCE",
    component: INPUT_COMPONENT,
    _compiler_note: "INSTANCE Input organism thật (xác nhận live Figma 2026-09-07, xem phase1-compiler-notes.md Mục 10) — thay placeholder FRAME cũ",
    specId: opts.specId,
    props: {
      Size: opts.size || "md",
      Type: opts.dsType || "Default",
      Destructive: opts.destructive ? "True" : "False",
      State: opts.disabled ? "Disabled" : (opts.state || "Default"),
    },
    hideLayers: opts.hideLabel ? ["Mandatory", "Conditions", "Label"] : ["Mandatory", "Conditions"],
    overrides,
  };
  if (opts.width != null) node.width = opts.width;
  if (opts.fillContainer) node.fillContainer = true;
  return node;
}

// emitTextareaField: input_type textarea.
// hideLayers "Textarea / Textarea helper text (Base)" — tương đương
// "Conditions" của Input organism, block hint phụ không cần cho MVP tĩnh.
function emitTextareaField(label, valueText, opts) {
  opts = opts || {};
  const overrides = {};
  if (label != null) overrides[TEXTAREA_LABEL_PATH] = label;
  if (valueText != null) overrides[TEXTAREA_VALUE_PATH] = valueText;
  return {
    type: "INSTANCE",
    component: TEXTAREA_COMPONENT,
    _compiler_note: "INSTANCE Textarea organism thật (xác nhận live Figma 2026-09-07, xem phase1-compiler-notes.md Mục 10) — thay placeholder FRAME cũ",
    specId: opts.specId,
    props: { State: opts.disabled ? "Disabled" : (opts.state || "Default") },
    hideLayers: ["Mandatory", "Textarea / Textarea helper text (Base)"],
    overrides,
    fillContainer: opts.fillContainer ? true : undefined,
  };
}

// emitSelectField: input_type select. LƯU Ý: đây là component "↳ Select ::
// Select" — CHỈ vẽ trạng thái ĐÓNG (trigger), không phải menu mở (khác
// "SelectMenu"/"Parts/selectItem", cũng đã có trong keymap nhưng chưa dùng —
// MVP chưa cần demo tương tác mở dropdown, chỉ cần field tĩnh trên form).
function emitSelectField(label, valueText, opts) {
  opts = opts || {};
  const overrides = {};
  if (label != null) overrides[SELECT_LABEL_PATH] = label;
  if (valueText != null) overrides[SELECT_VALUE_PATH] = valueText;
  return {
    type: "INSTANCE",
    component: SELECT_COMPONENT,
    _compiler_note: "INSTANCE Select thật, component_set '↳ Select :: Select' (xác nhận live Figma 2026-09-07, xem phase1-compiler-notes.md Mục 10) — thay placeholder FRAME cũ. Trạng thái ĐÓNG, chưa vẽ menu mở.",
    specId: opts.specId,
    props: {
      Size: opts.size || "sm",
      Type: opts.dsType || "Default",
      Destructive: opts.destructive ? "True" : "False",
      State: opts.disabled ? "Disabled" : (opts.state || "Default"),
    },
    hideLayers: ["Mandatory"],
    overrides,
    fillContainer: opts.fillContainer ? true : undefined,
  };
}

function textNode(content, fontSize, fontWeight) {
  const n = { type: "TEXT", content: String(content) };
  if (fontSize) n.fontSize = fontSize;
  if (fontWeight) n.fontWeight = fontWeight;
  return n;
}

function frame(name, layout, children, opts) {
  opts = opts || {};
  return Object.assign(
    { type: "FRAME", name, layout: layout || "VERTICAL", gap: opts.gap || 0, children: children || [] },
    opts
  );
}

function whiteCard(name, children, opts) {
  opts = opts || {};
  return frame(name, "VERTICAL", children, Object.assign({
    cornerRadius: 12,
    fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
    strokes: [{ type: "SOLID", color: { r: 0.8314, g: 0.8314, b: 0.8471 } }],
    strokeWeight: 1,
    padding: [16, 16, 16, 16],
    fillContainer: true,
  }, opts));
}

// ---- mock data màn #06 (dữ liệu minh hoạ, KHÔNG phải data thật) ----
const MOCK_ROWS = [
  {
    khach_hang: ["Công ty CP Wilmar CLV", "Mã chuyến: FTL02931"],
    loai_diem: ["Kho Bình Dương", "Điểm lấy"],
    trang_thai: "Chờ duyệt",
    loai_chi_phi: "Phí bốc xếp",
    nguoi_chi_tra: "Khách hàng",
    tai_xe: ["Nguyễn Văn Bình", "NV00231"],
    so_tien_ghi_nhan: "350.000 ₫",
    so_tien_da_duyet: "-",
    nguoi_chi_tra_da_duyet: "-",
    kho: "KVT01 - Kho Bình Dương",
  },
  {
    khach_hang: ["Công ty TNHH Thức Ăn CJ", "Mã chuyến: FTL02988"],
    loai_diem: ["Kho Long An", "Điểm giao"],
    trang_thai: "Đã duyệt",
    loai_chi_phi: "Phí cầu đường",
    nguoi_chi_tra: "GHN",
    tai_xe: ["Trần Thị Mai", "NV00456"],
    so_tien_ghi_nhan: "120.000 ₫",
    so_tien_da_duyet: "120.000 ₫",
    nguoi_chi_tra_da_duyet: "GHN",
    kho: "KVT02 - Kho Long An",
  },
  {
    khach_hang: ["Công ty CP Sữa TH", "Mã chuyến: FTL03012"],
    loai_diem: ["Kho Củ Chi", "Điểm lấy"],
    trang_thai: "Từ chối",
    loai_chi_phi: "Phí lưu kho",
    nguoi_chi_tra: "Khách hàng",
    tai_xe: ["Lê Văn Hùng", "NV00789"],
    so_tien_ghi_nhan: "500.000 ₫",
    so_tien_da_duyet: "-",
    nguoi_chi_tra_da_duyet: "-",
    kho: "KVT03 - Kho Củ Chi",
  },
];

function buildToolbar(secId, section, buttonSemantics) {
  const left = [];
  (section.left || []).forEach((it) => {
    if (it.control === "filter_button") {
      left.push(emitButton(it.label, "cancel", "Outline", buttonSemantics, {
        icon: "filter", specId: `${secId}__btn__${slugify(it.label)}`,
      }));
    } else if (it.control === "search") {
      // Search box toolbar KHÔNG cần label nổi phía trên — ẩn cả "Label"
      // (hideLabel: true) để chỉ còn ô nhập + icon, giống thanh tìm kiếm
      // thông thường.
      left.push(
        emitInputField(null, it.placeholder, {
          width: 340,
          hideLabel: true,
          specId: `${secId}__search`,
        })
      );
    }
  });
  const right = (section.right_actions || []).map((b) =>
    emitButton(b.label, b.button_role, b.style_override, buttonSemantics, {
      disabled: b.default_state === "disabled",
      specId: `${secId}__btn__${slugify(b.label)}`,
    })
  );
  return frame(
    "Toolbar",
    "HORIZONTAL",
    [
      frame("Toolbar left", "HORIZONTAL", left, { gap: 12, align: "CENTER" }),
      frame("Toolbar right", "HORIZONTAL", right, { gap: 12, align: "CENTER" }),
    ],
    { gap: 16, justify: "SPACE_BETWEEN", align: "CENTER", fillContainer: true, specId: secId }
  );
}

function buildStatusTabs(section) {
  const children = (section.tabs || []).map((t) =>
    textNode(t.label, 14, t.filter_value === section.default_active ? "SemiBold" : "Regular")
  );
  return frame(
    "Status tabs (placeholder — chưa dùng INSTANCE Tabs thật, xem header file compiler)",
    "HORIZONTAL",
    children,
    { gap: 24 }
  );
}

function buildTableCard(secId, section) {
  const colDef = [
    { key: "khach_hang", label: "Khách hàng", width: 190 },
    { key: "loai_diem", label: "Loại điểm", width: 160 },
    { key: "trang_thai", label: "Trạng thái", width: 130, type: "badge", align: "Center" },
    { key: "loai_chi_phi", label: "Loại chi phí", width: 140 },
    { key: "nguoi_chi_tra", label: "Người chi trả", width: 130 },
    { key: "tai_xe", label: "Tài xế", width: 160 },
    { key: "so_tien_ghi_nhan", label: "Số tiền ghi nhận", width: 150 },
    { key: "so_tien_da_duyet", label: "Số tiền đã duyệt", width: 150 },
    { key: "nguoi_chi_tra_da_duyet", label: "Người chi trả đã duyệt", width: 170 },
    { key: "kho", label: "Kho vận tải", width: 190 },
    { key: "thao_tac", label: "Thao tác", width: 130, type: "actions" },
  ];
  const columns = colDef.map((c) => ({
    label: c.label,
    width: c.width,
    type: c.type || "text",
    align: c.align || "Left",
  }));
  const rows = MOCK_ROWS.map((r) => {
    const row = colDef.map((c) => {
      if (c.key === "trang_thai") {
        return { badge: r.trang_thai, color: BADGE_TYPE[badgeColorForStatus(r.trang_thai)] };
      }
      if (c.key === "thao_tac") {
        const disabled = r.trang_thai !== "Chờ duyệt";
        // [XÁC NHẬN — Williams 07/09] Trước là variant "outline" (Grey) — SAI theo
        // rule mới trong engine/design-system/rules/_composition.rules.yaml (CMP-ROW-02,
        // alias cũ BTN-E-02-b — xem manifest.yaml § rule_id_aliases): "Phê duyệt"
        // KHÔNG thuộc 3 nút chuẩn Xem/Sửa/Xoá, phải đánh giá mức ưu tiên qua Bước 1+2
        // thay vì mặc định Ghost/Outline. Đây là hành động CHÍNH của dòng đang "Chờ
        // duyệt" (đúng mục đích của tab mặc định trên màn này) và không có nút Fill
        // nào khác cạnh tranh trong cùng ô thao tác → Type=Primary, Style=Fill.
        return { buttons: [{ label: "Phê duyệt", variant: "primary", size: "xs" }] , _note: disabled ? "conditional_disable: status != Chờ duyệt (chưa mô hình hoá state disabled trong cell actions ở MVP này)" : undefined };
      }
      return r[c.key];
    });
    return row;
  });
  // Lưu ý: "table" là PARTIAL — expandSpec() CHỈ đọc "name"/"overrideNode" từ
  // node PARTIAL gốc (mọi field khác bị bỏ qua sau khi bung), nên "specId"
  // phải đi qua "overrideNode" mới sống sót tới renderNode. Field top-level
  // "specId" ở INSTANCE/FRAME/TEXT do compiler tự dựng (không qua PARTIAL)
  // thì KHÔNG cần overrideNode, đi thẳng qua nhánh clone chung của expandSpec.
  return {
    type: "PARTIAL", use: "table", name: section.name || "Bảng chi phí phát sinh",
    columns, rows, overrideNode: { specId: secId },
  };
}

function badgeColorForStatus(statusLabel) {
  const map = { "Chờ duyệt": "grey", "Đã duyệt": "green", "Từ chối": "red" };
  return map[statusLabel] || "grey";
}

function buildMainScreen(screenId, screen, global_) {
  const buttonSemantics = global_.button_color_semantics;
  const skipped = [];
  const bodyChildren = [];

  bodyChildren.push(
    frame("Page header", "HORIZONTAL", [
      frame("Title group", "VERTICAL", [textNode(screen.name, 20, "Bold")], { gap: 4 }),
    ], { justify: "SPACE_BETWEEN", align: "CENTER", fillContainer: true, gap: 16 })
  );

  const orderedSections = Object.entries(screen.sections || {}).sort(
    (a, b) => (a[1].order || 0) - (b[1].order || 0)
  );

  const cardChildren = [];
  for (const [secId, sec] of orderedSections) {
    if (sec.type === "toolbar_standard") {
      cardChildren.push(buildToolbar(secId, sec, buttonSemantics));
    } else if (sec.type === "table_card") {
      cardChildren.push(buildStatusTabs(sec.status_filter_tabs || {}));
      cardChildren.push(buildTableCard(secId, sec));
    } else if (sec.type === "filter_panel" || sec.type === "column_visibility_panel") {
      skipped.push(`${secId} (${sec.type}) — popover, chưa xác nhận component DS`);
    } else if (sec.type === "bulk_action_bar") {
      skipped.push(`${secId} (bulk_action_bar) — visible_when có chọn dòng, mặc định ẩn nên bỏ qua`);
    } else {
      skipped.push(`${secId} (${sec.type}) — chưa có mapping trong compiler MVP này`);
    }
  }
  bodyChildren.push(whiteCard("Table card", cardChildren, { gap: 16 }));

  const root = frame(screen.name, "HORIZONTAL", [
    { type: "PARTIAL", use: "sidebar",
      active: screen.module || "Quản lí chi phí FTL",
      items: [{ label: screen.module || "Quản lí chi phí FTL", icon: "file-invoice-dollar" }],
      logout: "Đăng xuất",
      _compiler_note: "PLACEHOLDER — B2B portal module list CHƯA khảo sát (MENU-THEO-HE-THONG.md tự ghi 'chưa khảo sát'), không tự bịa. Cần Williams/Figma MCP khảo sát trước khi push Figma thật.",
    },
    frame("Content", "VERTICAL", [
      { type: "PARTIAL", use: "globalActionHome", breadcrumb: (screen.page_header || {}).breadcrumb || [screen.name],
        user: { name: "GSVT Demo", sub: (global_.usage_scenario || "").slice(0, 40) } },
      frame("Body", "VERTICAL", bodyChildren, { gap: 16, padding: [16, 24, 16, 24], fillContainer: true }),
    ], { width: 1428, fills: [{ type: "SOLID", color: { r: 0.9569, g: 0.9569, b: 0.9608 } }] }),
  ], { width: 1728, specId: screenId });

  return { root, skipped };
}

function buildModalScreen(screenId, screen, global_) {
  const buttonSemantics = global_.button_color_semantics;
  const children = [];
  const title = (screen.header_dynamic || screen.name).replace("{n}", "3");
  children.push(textNode(title, 18, "Bold"));

  const orderedSections = Object.entries(screen.sections || {}).sort(
    (a, b) => (a[1].order || 0) - (b[1].order || 0)
  );
  for (const [, sec] of orderedSections) {
    if (sec.type !== "form_section") continue;
    if (sec.style === "read_only_block" || sec.style === "summary") {
      (sec.fields || []).forEach((f) => {
        children.push(
          frame(`Field: ${f.label}`, "HORIZONTAL", [
            textNode(f.label, 13, "SemiBold"),
            textNode("(dữ liệu dòng đã chọn — placeholder)", 13),
          ], { gap: 8, justify: "SPACE_BETWEEN", fillContainer: true })
        );
      });
    } else if (sec.style === "numbered_list_readonly") {
      children.push(
        frame("Danh sách (placeholder 2 dòng mock)", "VERTICAL", [
          textNode(`1. ${(sec.row_fields || []).join(" · ")} — (dữ liệu mock)`, 13),
          textNode(`2. ${(sec.row_fields || []).join(" · ")} — (dữ liệu mock)`, 13),
        ], { gap: 6 })
      );
    } else {
      (sec.fields || []).forEach((f) => {
        const label = f.label + (f.required ? " *" : "");
        const valueText = f.placeholder || "";
        if (f.input_type === "text" || f.input_type === "number" || f.input_type === "phone") {
          children.push(emitInputField(label, valueText, {
            disabled: !!f.readonly, fillContainer: true,
          }));
        } else if (f.input_type === "textarea") {
          children.push(emitTextareaField(label, valueText, {
            disabled: !!f.readonly, fillContainer: true,
          }));
        } else if (f.input_type === "select") {
          children.push(emitSelectField(label, f.default || valueText || "Chọn...", {
            disabled: !!f.readonly, fillContainer: true,
          }));
        } else {
          // attachment / date_range / các input_type khác — CHƯA xác nhận
          // component DS thật (xem header file), vẫn giữ khung placeholder
          // cũ để không vẽ giả một thứ chưa xác nhận.
          children.push(
            frame(`Field: ${f.label}`, "VERTICAL", [
              textNode(label, 13, "SemiBold"),
              frame(
                `Input placeholder (${f.input_type}) — CHƯA xác nhận INSTANCE DS thật`,
                "VERTICAL",
                [textNode(valueText, 13)],
                {
                  padding: [8, 12, 8, 12],
                  cornerRadius: 8,
                  strokes: [{ type: "SOLID", color: { r: 0.83, g: 0.83, b: 0.85 } }],
                  strokeWeight: 1,
                  fillContainer: true,
                }
              ),
            ], { gap: 6, fillContainer: true })
          );
        }
      });
    }
  }

  const footerButtons = ((screen.footer || {}).buttons || []).map((b) =>
    emitButton(b.label, b.button_role, b.style_override, buttonSemantics, {
      specId: `${screenId}__btn__${slugify(b.label)}`,
    })
  );
  children.push(
    frame("Footer", "HORIZONTAL", footerButtons, { gap: 12, justify: "MAX", padding: [16, 0, 0, 0] })
  );

  return whiteCard(screen.name, children, {
    width: 560, gap: 20, padding: [24, 24, 24, 24], specId: screenId,
  });
}

function collectTransitions(screens, idToIndex) {
  const transitions = [];
  const push = (fromId, toId, trigger) => {
    if (idToIndex[fromId] != null && idToIndex[toId] != null) {
      transitions.push({ from: idToIndex[fromId], to: idToIndex[toId], trigger });
    }
  };
  for (const [screenId, screen] of Object.entries(screens)) {
    for (const sec of Object.values(screen.sections || {})) {
      (sec.row_actions || []).forEach((ra) => {
        (ra.menu_items || []).forEach((mi) => {
          if (mi.opens_screen) push(screenId, mi.opens_screen, `Bấm "${ra.label}" > "${mi.label}"`);
        });
        if (ra.opens_screen) push(screenId, ra.opens_screen, `Bấm "${ra.label}"`);
      });
      (sec.buttons || []).forEach((b) => {
        if (b.opens_screen) push(screenId, b.opens_screen, `Bấm "${b.label}"`);
      });
    }
  }
  return transitions;
}

function main() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath || !outputPath) {
    console.error("Cách dùng: node compile-v1-to-render-dsl.js <input.json> <output.json>");
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const global_ = spec.global || {};
  const screenEntries = Object.entries(spec.screens || {}).sort(
    (a, b) => (a[1].order || 0) - (b[1].order || 0)
  );

  const idToIndex = {};
  screenEntries.forEach(([id], i) => (idToIndex[id] = i));

  const allSkipped = [];
  const screensOut = screenEntries.map(([id, screen]) => {
    if (screen.screen_type === "modal") {
      return buildModalScreen(id, screen, global_);
    }
    const { root, skipped } = buildMainScreen(id, screen, global_);
    skipped.forEach((s) => allSkipped.push(`[${id}] ${s}`));
    return root;
  });

  const transitions = collectTransitions(spec.screens || {}, idToIndex);

  const out = { flowName: spec.feature, screens: screensOut, transitions };
  fs.writeFileSync(outputPath, JSON.stringify(out, null, 2), "utf-8");

  console.log(`✅ Compiled ${screenEntries.length} screens, ${transitions.length} transitions -> ${outputPath}`);
  if (allSkipped.length) {
    console.log(`\n⚠️  ${allSkipped.length} section BỊ BỎ QUA (chưa có mapping trong MVP này):`);
    allSkipped.forEach((s) => console.log("  • " + s));
  }
}

main();
