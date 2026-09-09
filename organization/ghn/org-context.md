# Bối cảnh tổ chức — GHN / Freight Tech (Giao Hàng Nặng)

## Dữ kiện đã xác nhận

- FE codebase đã có component library trong code khớp khá tốt với GHN Design System trên Figma — nên đích render "code scaffold" (Phase 4) là khả thi, không chỉ lý thuyết.
- Renderer (spec.json → Figma frames) đã chạy được, dựng bằng đúng component đã publish trong library.
- GHN Design System đã publish đủ variants cần thiết.
- Bộ skill phân tích PRD và viết design specs (prd-analysis, design-specs-writer) đang dùng thật hằng ngày.
- PO tại GHN đã có tài khoản Cowork/Claude Code riêng (tổ chức đã cấp seat) — nghĩa là các skill có thể phân phối trực tiếp cho PO dùng, không cần xây portal riêng ở giai đoạn đầu.
- Session làm việc có kết nối Atlassian (Confluence/Jira) — Readiness Gate có thể post comment trực tiếp lên trang PRD thật, cần xác nhận seat của PO cũng có kết nối này.

## Phát hiện quan trọng — 2026-09-05: đã có 1 pipeline thật (`ghn-figma-pipeline`)

Williams đã tự xây và dùng thật trước đó (folder local riêng, độc lập với
PRD Copilot) một pipeline PRD → Design Specs → `spec.json` → Figma → handoff,
với schema, renderer, validator, và registry component đều đã chạy được —
không phải giả định. Đã đọc read-only, copy phần dữ liệu tổ chức (không
copy code renderer/schema — thuộc câu hỏi kiến trúc khác, xem
`README.md` gốc PRD Copilot) vào `design-system-components.md` và
`role-to-component-mapping.md` trong folder này, cộng bản copy nguyên gốc
tại `reference/` (keymap, spacing tokens, style guide).

Vài điểm rút ra cần nhớ khi tiếp tục:

- Format mô tả màn hình (6-dimension WHAT/WHY/WHO/HOW/EDGES/HISTORY) đã
  được dùng thật trong `design-specs/*.md` của pipeline đó — trùng khớp
  độc lập với rubric mình tự thiết kế cho Readiness Gate. Mỗi khẳng định
  về style trong đó đều trích node-id Figma thật làm bằng chứng, và có
  mục "Open questions" riêng khi gặp thứ không chắc thay vì tự đoán — nên
  áp cùng 2 thói quen này (trích bằng chứng + mục Open Questions) vào
  `screen-descriptions/` của PRD Copilot.
- Validator (`validate-spec.js` bên đó) chỉ xác nhận tên component tồn
  tại thật, KHÔNG xác nhận property/path đúng — property/path sai chỉ lộ
  ra khi render thật trong Figma. Đây là giới hạn kỹ thuật thật, không
  phải thiếu sót của mình — cần phản ánh đúng giới hạn này khi thiết kế
  `patch-and-validator.md` (đừng hứa validator sẽ bắt được lỗi property).
- Menu/sidebar: style dùng chung mọi hệ thống nội bộ GHN, nhưng danh sách
  module khác theo từng hệ thống con (B2B / TMS / Lắp đặt) — nếu PRD
  Copilot mở rộng ra ngoài FTL B2B sau này, cần thêm bảng module-theo-hệ-thống
  tương tự (xem `role-to-component-mapping.md` mục cuối).
- Component registry (`ghn-ds-keymap-flat.json`) là sinh tự động từ Figma
  API, không phải danh sách gõ tay — và có bẫy thật: nhiều library trùng
  tên component (bản test, Freight, QLNS/QLNL) nên mọi tra cứu sống qua
  Figma MCP phải lọc `libraryName === "GHN DS"`.

## Quy tắc nghiệp vụ bắt buộc kiểm tra — Upload Excel (2026-09-05)

Xác nhận theo Williams, phát hiện khi document `screen-descriptions/04-modal-ket-qua-upload-excel.md`.
Bất kỳ tính năng nào trong PRD có upload file Excel để nhập dữ liệu hàng
loạt đều rơi vào 1 trong 2 cơ chế xử lý, PHẢI xác định trước khi build:

1. **Import dữ liệu MỘT PHẦN (partial import)**: file có dòng lỗi → chỉ
   báo lỗi các dòng đó, dòng hợp lệ vẫn được lưu vào hệ thống.
2. **Import dữ liệu TOÀN PHẦN (all-or-nothing)**: file có TỐI THIỂU 1
   dòng lỗi → TOÀN BỘ file bị từ chối, không dòng nào được lưu. Chỉ lưu
   khi 100% dữ liệu hợp lệ.

**Quy tắc bắt buộc khi dùng skill `prd-analysis`**: nếu PRD có tính năng
upload Excel mà KHÔNG ghi rõ thuộc loại nào trong 2 loại trên, PHẢI hỏi
lại PO — không tự đoán/mặc định. Nếu PO không hiểu câu hỏi, giải thích rõ
2 khái niệm bằng ví dụ cụ thể để họ tự quyết định.

**Vì sao PHẢI hỏi chứ không được tự suy ra**: xác nhận theo Williams
2026-09-05 — việc chọn loại nào (một phần hay toàn phần) do NGHIỆP VỤ PO
đề xuất + RÀNG BUỘC KỸ THUẬT (technical constraint) của hệ thống quyết
định riêng cho từng feature, KHÔNG có quy tắc chung cố định (không thể suy
theo loại dữ liệu hay mức độ quan trọng để đoán). Do đó không có cách nào
tự suy đoán đúng — luôn phải hỏi lại PO.

Modal UI kết quả xử lý cho cả 2 loại đã document đầy đủ (5 state, node-id
thật) tại `screen-descriptions/04-modal-ket-qua-upload-excel.md` — dùng
làm tham khảo khi build modal tương tự cho feature khác.

**Quy tắc bắt buộc bổ sung (2026-09-05, phát hiện khi document
`screen-descriptions/05-upload-chi-phi-thue-xe-ncc.md`)**: khối "Lịch sử
tải lên" đi kèm tính năng upload Excel là OPTIONAL, không mặc định luôn
có. Khi PO define 1 tính năng upload Excel, PHẢI hỏi thêm 2 việc: (1) tính
năng này có cần khối "Lịch sử tải lên" không; (2) nếu có, cần những cột
dữ liệu gì, và MỖI cột phải define rõ loại hiển thị (text/link/text-link/
button...) — không mặc định là text. Xem quy tắc DS tương ứng ở
`role-to-component-mapping.md`.

## Mô hình phân quyền — LUÔN hỏi PO, không mặc định (2026-09-05)

Hệ thống GHN FTL B2B dùng **ÍT NHẤT 2 mô hình phân quyền khác nhau** tuỳ
tính năng — không có 1 mô hình chung áp dụng cho mọi màn:
- **Theo entity con cụ thể**: user chỉ xem/thao tác được dữ liệu thuộc
  kho vận tải/khách hàng/ID nhân viên gắn với họ (vd GSVT chỉ xem chi phí
  phát sinh của kho mình phụ trách — `screen-descriptions/06-quan-ly-chi-phi-phat-sinh.md`).
- **Theo module**: chỉ cần role có quyền truy cập MODULE đó là xem được
  TOÀN BỘ dữ liệu trong module, không lọc thêm theo entity con (vd Vận
  Hành có quyền module "Dynamic SOP" thì xem toàn bộ "Quản lý POD" —
  `screen-descriptions/07-quan-ly-pod.md`).

→ **Khi phân tích PRD 1 tính năng mới, LUÔN hỏi PO rõ mô hình phân quyền
là gì** (theo module hay theo entity con cụ thể) — KHÔNG tự suy đoán theo
mô hình đã gặp ở tính năng trước, vì 2 mô hình cùng tồn tại song song
trong hệ thống này.

## PRD dùng thuật ngữ/viết tắt nội bộ — không bắt buộc giữ nguyên khi build UI (2026-09-05)

PRD đôi khi đề xuất đổi tên field/nút theo 1 thuật ngữ nội bộ hoặc chữ
viết tắt (vd "POD" = Proof of Delivery) mà end-user thường KHÔNG quen
thuộc. Khi gặp trường hợp này, được phép chủ động đổi sang tên mô tả dễ
hiểu hơn thay vì bám sát chữ PRD — nhưng PHẢI ghi rõ lý do trong tài liệu
screen-description (coi đây là 1 quyết định UX có chủ đích, không phải bỏ
qua PRD). Ví dụ thật: `screen-descriptions/07-quan-ly-pod.md` (PRD đề xuất
đổi tên cột thành "POD", nhưng giữ tên mô tả rõ nghĩa hơn vì "POD" là viết
tắt khó hiểu với người dùng).

## Cam kết nhân sự (lộ trình 8 tuần ban đầu)

- 1 PO đưa toàn bộ PRD qua hệ thống từ Tuần 3, mục tiêu 2-3 PO từ Tuần 6.
- 1 tech lead nhận Handoff Pack thay specs viết tay ở ít nhất 3 feature; mục tiêu 4-6 dev.

## Việc cần điền thêm

- [x] Danh sách component thật + tên chuẩn trong Design System → điền xong, xem `design-system-components.md` + `reference/ghn-ds-keymap-flat.json`.
- [x] Bảng vai trò → component thật (nút, text, table, pagination, header) → điền xong, xem `role-to-component-mapping.md`.
- [ ] Ngưỡng điểm Readiness Gate cụ thể GHN muốn áp dụng → vẫn CHƯA ĐIỀN, xem `readiness-thresholds.md` (lưu ý: pipeline thật kia dùng cơ chế khác — "hỏi lại khi thiếu/mâu thuẫn" + Open Questions — không dùng thang điểm Likert; cân nhắc khi chốt).
- [ ] Danh sách 10-15 component dùng nhiều nhất để set up Code Connect — chưa khảo sát lại.
- [ ] Xác nhận seat Cowork của PO có kết nối Atlassian giống session này không.
- [ ] Quyết định kiến trúc: có build thêm phần mới (readiness gate, JSON-patch scoped editing, PO skill) thẳng vào `ghn-figma-pipeline` luôn, hay giữ 2 folder tách biệt như hiện tại — Williams đã chọn "copy dữ liệu tổ chức, không gộp code engine" cho lần này (2026-09-05), có thể xem lại khi Phase 0 xong.
