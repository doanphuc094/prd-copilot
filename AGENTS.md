# AGENTS.md — GHN Design System (dành cho agent sinh spec.json / render Figma)

Bản nháp đầu tiên (2026-09-06). Đây là file gốc mà agent (Claude, hoặc bất kỳ
LLM nào tham gia pipeline PRD Copilot) đọc TRƯỚC khi sinh `spec.json` hoặc
tương tác với GHN Design System. Mục đích: gom các rule hiện đang nằm rải rác
trong `schema-v1-draft.md` / `org-context.md` / đầu Williams thành checklist
tường minh — agent không phải tự suy luận hay đoán.

Đặt file này ở gốc repo PRD Copilot, ngang hàng `schema-v1-draft.md`.

> **Cập nhật 2026-09-10:** Mục 1 (thứ tự đọc) và một dòng trong Mục 2 (rule
> `button.role`) bên dưới đã ĐỔI so với bản gốc 07/09 — lý do và nội dung cũ
> được giữ lại inline ngay tại chỗ đổi, không xoá, theo đúng nguyên tắc
> "không xoá lịch sử quyết định" áp dụng cho toàn bộ dự án này (xem cách làm
> tương tự ở `claude/agentic-ds-drafts/semantic.json` và
> `claude/agentic-ds-drafts/button.rules.yaml`).

---

## 0. Vai trò của file này

Agent generate theo kiểu dự đoán token-tiếp-theo, không tự "browse" toàn bộ
hệ thống như người. Không có checklist tường minh, agent sẽ **bịa** ra giá trị
nghe hợp lý nhưng sai (đã xảy ra thật — xem finding #19/#20/#21 trong
`schema-v1-draft.md`: header bảng sai màu nền, chip mượn nhầm màu, badge grey
render thành text trần). File này tồn tại để chặn đúng loại lỗi đó.

---

## 1. Trước khi làm bất cứ gì — đọc theo đúng thứ tự

**[ĐÃ CẬP NHẬT 2026-09-10 — thay thế toàn bộ quy trình 4 bước gốc bên dưới]**

Đọc `manifest.yaml` TRƯỚC TIÊN — đây là NGUỒN DUY NHẤT xác định: component nào
thuộc `kind` nào, luật/giá trị nằm ở file nào, và ID rule cũ (`BTN-*`, v0.2)
map sang ID mới ở đâu (`manifest.yaml § rule_id_aliases`). Vị trí: repo GitHub
`doanphuc094/prd-copilot`, file `engine/design-system/manifest.yaml`.

Đừng tự suy đoán thứ tự đọc bằng cách đoán tên file — tra ở manifest. Từ
manifest, thứ tự đọc tiếp tự nhiên là: `rules/_core.rules.yaml` →
`rules/kinds/*.rules.yaml` → `rules/components/*.rules.yaml` →
`rules/_composition.rules.yaml` → `profile.ghn/policy.yaml` →
`profile.ghn/ds/*.binding.yaml` → `profile.ghn/decisions.md` (chi tiết đầy đủ
nằm trong `engine/design-system/README.md` của repo).

Agent KHÔNG đọc trực tiếp các file rule nguồn nói trên để lấy giá trị cuối
cùng — đọc bản đã compile: `node compile.js` sinh
`build/<component>.resolved.yaml` (agent đọc file này để lấy variant/luật đã
gộp) và `build/<component>.invariants.json` (hàm chấm máy chạy được, dùng cho
validator).

**Lý do đổi:** quy trình 4 bước gốc bên dưới là văn xuôi — tự nó đã lệch thực
tế ít nhất 1 lần trong quá trình dùng (không ai bắt buộc phải sửa danh sách
này khi kiến trúc thật đổi). `manifest.yaml` là file máy đọc được: component
mới/kind mới/rule dời chỗ đều phải khai ở đó để compiler chạy được, nên không
thể lệch âm thầm như văn xuôi.

**Quy trình 4 bước gốc (2026-09-06) — giữ lại để đối chiếu lịch sử, KHÔNG còn
là quy trình thật đang dùng:**

1. `schema-v1-draft.md` — cấu trúc field hợp lệ của spec.json (schema v1).
2. `design-system/tokens/semantic.json` — từ vựng token đã publish (**KHÔNG**
   đọc thẳng `ghn-ds-properties-reference.json`/`ghn-spacing-tokens.json` gốc
   để lấy ý tưởng giá trị — 2 file đó là lớp primitive/kỹ thuật cho
   renderer, không phải từ vựng nghiệp vụ dành cho agent). File này giờ đã
   được đánh dấu `_superseded` — phần dữ liệu còn dùng được (badge, surface,
   text_style, spacing.density) đã migrate sang
   `profile.ghn/ds/_shared.binding.yaml`, xem chính file `semantic.json` để
   biết chi tiết cái gì chuyển đi đâu.
3. `ghn-ds-keymap-flat.json` — để lấy đúng tên `ds_component`. Lọc
   `libraryName === "GHN DS"` (file có nhiều library trùng tên component —
   bản test, Freight, QLNS/QLNL — tra sai library sẽ ra component ảo).
4. `design-system/components/<tên>.rules.md` (nếu component đó đã có file) —
   anti-pattern + variant hợp lệ riêng.

## 2. Rule bất biến (IMPORTANT — không có ngoại lệ)

- Mọi `ds_component` PHẢI khớp tên thật đã publish trong
  `ghn-ds-keymap-flat.json` (lọc đúng `libraryName === "GHN DS"`). KHÔNG tự
  chọn component "gần giống" khi không tìm thấy tên khớp.

- **[SỬA 2026-09-10 — dòng gốc bên dưới đã SAI, xem
  `profile.ghn/decisions.md` entry 08/09-B]**
  ~~Mọi `button.role` PHẢI là 1 trong 4 giá trị đã khai báo ở
  `global.button_color_semantics` (`primary`/`secondary`/`destructive`/`cancel`)~~
  — SAI, đã đổi mô hình. Đúng: Button dùng trục `Type` với đúng 4 giá trị
  `Primary` / `Secondary` / `Destructive` / `Grey` — **KHÔNG có `cancel`**.
  Case "Hủy / Quay lại / Đóng / Lưu nháp" là `Type=Grey` (nhóm
  exit_or_pause), không phải một role riêng tên "cancel". Chi tiết đầy đủ +
  worked examples nằm ở `engine/design-system/rules/kinds/action_trigger.rules.yaml`
  và `profile.ghn/ds/button.binding.yaml`. Cả 4 Type đều được phép đổi
  `emphasis` (Fill/Outline/Ghost) — đây là lựa chọn thị giác độc lập, KHÔNG
  phải đổi Type.

- **[ĐÃ CHUYỂN NHÀ 2026-09-10]** Ba luật bên dưới về badge/table đã được
  migrate và mở rộng đầy đủ hơn (thêm no_color_borrowing_rule, thêm
  not_yet_surveyed list) trong `profile.ghn/ds/_shared.binding.yaml` (mục
  `badge`, `surface.table_header`) — đọc ở đó làm nguồn chính. Giữ nguyên văn
  gốc dưới đây chỉ để không mất finding gốc:
  - Mọi `badge.color` PHẢI là 1 trong 3 giá trị `grey` / `green` / `red`.
    **CẢ 3 màu đều render dạng pill có nền** — không có màu nào là text
    trần, kể cả grey (đã từng làm sai — finding #21).
  - Khi 1 màn có NHIỀU chip/badge cạnh nhau nhưng khác Ý NGHĨA (vd 1 cái là
    loại điểm giao nhận, 1 cái là mã tham chiếu) — mỗi cái lấy màu theo đúng
    ý nghĩa riêng của nó, KHÔNG mượn màu của chip/badge gần đó (đã từng làm
    sai — finding #20).
  - Mọi `table_card` dùng CHUNG 1 `header_style`: nền `#fafafa`, chữ semibold
    14px màu `text-muted`, CÓ viền dọc phân chia cột — áp dụng cho MỌI bảng,
    không riêng màn nào (finding #19).

- Mọi `component.color` / `layout` / `shape` PHẢI nằm trong tập giá trị đã
  khai báo ở `global` — không component nào tự chế giá trị riêng ngoài danh
  sách global cho phép (ràng buộc kế thừa, Mục 7 `schema-v1-draft.md`).
- ID của `screens{}` / `sections{}` / `components{}` là chuỗi 2-3 ký tự ổn
  định, sinh 1 lần — KHÔNG BAO GIỜ đổi sau khi sinh, KHÔNG dùng index mảng.
  Thứ tự hiển thị nằm ở field `order` riêng.

## 3. Khi không chắc — DỪNG LẠI, hỏi thay vì đoán

- Component/section chưa có trong inventory hoặc catalog (`schema-v1-draft.md`
  Mục 3) → hỏi Designer (Williams), không tự bịa loại mới hoặc chọn cái gần
  giống.
- PRD có tính năng upload Excel nhưng KHÔNG ghi rõ import một-phần
  (partial) hay toàn-phần (all-or-nothing) → PHẢI hỏi lại PO, không tự suy
  theo loại dữ liệu hay mức độ quan trọng (không có quy tắc chung để đoán).
- `permission_model.type` của 1 feature mới → LUÔN hỏi lại PO. KHÔNG suy
  theo feature trước — hệ thống dùng song song ít nhất 3 mô hình khác nhau
  (`module` / `entity_scoped` / `none_ui_enforced`), không có cách đoán đúng
  từ context.
- Tính năng upload Excel có cần khối "Lịch sử tải lên" không, và nếu có thì
  cột nào hiển thị kiểu gì (text/link/button...) → hỏi PO, không mặc định.
- Sidebar/module list của 1 hệ thống con (B2B/TMS/Lắp đặt) chưa được khảo
  sát trong `MENU-THEO-HE-THONG.md` → KHÔNG tự bịa danh sách module, khảo
  sát qua Figma MCP hoặc hỏi Williams trước.

## 4. Giới hạn đã biết — đừng hứa quá tay

- Validator (`validate-spec.js`) chỉ xác nhận **tên** component tồn tại
  thật, KHÔNG xác nhận property/path đúng — lỗi property chỉ lộ ra khi
  render thật trên Figma. Không coi "validate-spec.js pass 0 lỗi" là bằng
  chứng render đúng.
- Renderer hiện tại (`ghn-figma-renderer.js`) đọc định dạng
  `{flowName, screens[], transitions[]}` cho 1 flow nhiều màn — KHÔNG tách
  thủ công thành N file gọi renderer N lần (đã có cơ chế tự lo).

## 5. Khi gặp lỗi validate — vòng sửa có giới hạn

Nếu spec.json bị validator từ chối: đọc nguyên context lỗi (error message +
instruction gốc + spec hiện tại), tự sửa, thử lại — **tối đa 3 lần**. Sau 3
lần vẫn lỗi → dừng, báo lại cho người, không lặp vô hạn.

---

## Nguồn tham chiếu đầy đủ (đọc khi cần chi tiết hơn)

- `engine/design-system/manifest.yaml` (repo `prd-copilot` trên GitHub) —
  **nguồn thật cho rule/component/kind**, xem Mục 1 ở trên.
- `schema-v1-draft.md` — schema v1 đầy đủ + toàn bộ finding đã chốt/còn mở.
- `org-context.md` — bối cảnh tổ chức, giới hạn kỹ thuật thật, quy tắc nghiệp
  vụ bắt buộc hỏi lại PO.
- `phase1-compiler-notes.md` — cách compiler map schema v1 → render DSL,
  các bug đã phát hiện + đã sửa (setPluginData, Badge Color alias).
