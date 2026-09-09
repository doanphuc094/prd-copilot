# Danh sách component thật — GHN Design System

**Đã điền — 2026-09-05.** Không copy tay danh sách component vào đây nữa
(rủi ro gõ sai tên/ký hiệu, và sẽ lệch bản mỗi khi Design System đổi).
Nguồn thật là file `reference/ghn-ds-keymap-flat.json` (copy byte-exact từ
pipeline thử nghiệm trước đó của Williams, `ghn-figma-pipeline/ghn-ds-keymap-flat.json`,
138 dòng, tên component → key Figma thật, sinh bằng script gọi
`GET /v1/files/{fileKey}/components`).

## Cách dùng

- Validator (`ds_component` trong spec.json) phải khớp CHÍNH XÁC 1 key
  trong `reference/ghn-ds-keymap-flat.json` — copy y hệt cả ký hiệu đầu
  dòng (`⚫` = component set thường, `🔵` = nested trong 1 file khác,
  `↳` = biến thể lồng, `🟢` = library con khác). Đây không phải trang trí,
  là 1 phần của tên thật.
- Không tự bịa tên. Nếu 1 khối UI không rõ map vào key nào trong file này
  — tra sống bằng Figma MCP (`search_design_system`), **luôn lọc
  `libraryName === "GHN DS"`** (có nhiều library trùng tên component: bản
  test, bản Freight, bản QLNS/QLNL — dễ nhầm nếu không lọc).
- File chỉ chứa 1 `base_key` đại diện mỗi component set (không phải mọi
  variant riêng) — sau khi `importComponentByKeyAsync(key)` tạo instance,
  đổi variant bằng `setProperties()` bình thường, không cần key riêng cho
  từng variant.

## Khi Design System GHN đổi (thêm/sửa component trong Figma)

Quy trình regenerate (đã làm 1 lần, xem lại nếu cần lặp): chạy lại lệnh gọi
`/v1/files/{key}/components`, lọc/group theo tên, ghi đè
`reference/ghn-ds-keymap-flat.json`. Không sửa tay từng dòng.

## Giới hạn đã biết

File này CHỈ xác nhận tên component có tồn tại thật (đúng vai trò của
`validate-spec.js` trong pipeline gốc) — KHÔNG xác nhận property/path có
đúng hay không. Property/path sai chỉ lộ ra khi render thật (Figma
Scripter hoặc `use_figma`) — không tin được test offline. Property tham
khảo chi tiết theo variant nằm trong pipeline gốc (`ghn-ds-properties-reference.json`,
chưa copy vào đây vì dung lượng lớn và chưa cần cho giai đoạn viết mô tả
màn hình — chỉ cần khi thật sự sinh spec.json).

## Ưu tiên Code Connect

Chưa khảo sát lại trong lần đọc này — giữ nguyên việc cần làm: liệt kê
10-15 component dùng nhiều nhất để set up Code Connect khi tới bước đó.
