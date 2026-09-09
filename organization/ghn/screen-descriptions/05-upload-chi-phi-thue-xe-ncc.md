# Tính năng upload file Excel — Chi phí thuê xe NCC (đã xong — 6/6 Open Questions đã trả lời/confirm, 2026-09-05)

Loại khuôn: **khác** (đáp ứng slot #5 trong `00-checklist.md`, ghi đè
chỗ trống trước đó).
Hệ thống: **Portal B2B** (cùng file Figma với màn 1, 2, 4 — "B2B-PORTAL").
fileKey: `s2NE6ikwLnsZSUp97RBfof`. Node gốc: `18764:94824` ("Chi phí thuê
xe NCC").
Link Figma: https://www.figma.com/design/s2NE6ikwLnsZSUp97RBfof/B2B-PORTAL?node-id=18764-94824

**Liên hệ trực tiếp với màn đã document trước**: đây chính là màn hình
"cha" dẫn tới modal `04-modal-ket-qua-upload-excel.md` (Nhóm A — import
MỘT PHẦN) — file ví dụ `DS_thuexeNCC.xlsx` dùng ở cả 2 nơi là CÙNG 1
tính năng. Khi build, 2 file mô tả này nên tham chiếu lẫn nhau.

**Nguồn PRD (2026-09-05)**: [FT-3363 Import chi phí thuê xe NCC chuyến
FTL](https://giaohangnhanh.atlassian.net/wiki/spaces/PM/pages/1546747907)
(Confluence, cập nhật lần cuối 23/07/2026). PRD này cung cấp đầy đủ
business rule thật cho tính năng — mục 1 (bảng ngữ cảnh) bên dưới đã thay
toàn bộ nội dung "suy đoán" bằng fact thật từ PRD.

## 1. Bảng ngữ cảnh (6 chiều)

| Chiều | Nội dung |
|---|---|
| WHAT | Công cụ cho phép **import chi phí thuê xe NCC** (nhà cung cấp xe ướt, thuê theo chuyến FTL B2B) vào hệ thống, làm căn cứ số hoá PnL (lãi/lỗ) cho từng chuyến/đơn FTL. **Scope RÕ theo PRD**: chỉ bao gồm thuê xe NCC theo chuyến (xe ướt) — KHÔNG bao gồm phân bổ chi phí thuê xe khô. Trang gồm 2 phần: (1) khối upload, (2) khối lịch sử import. ~~(3) "bảng tổng hợp hiển thị tổng chi phí theo chuyến, theo NCC, có thể export"~~ — **BỎ (Williams xác nhận 2026-09-05): PRD đã được PO define lại, KHÔNG còn phần này nữa** — không phải gap thiết kế, đây là scope đã bị cắt. |
| WHY | Hiện tại chi phí thuê xe NCC được theo dõi **thủ công trên GSheet** — nhân viên Finance (FIN) phải tự mapping chi phí thủ công. Mục tiêu: số hoá để làm căn cứ PnL chính xác cho chuyến/đơn FTL, giảm xử lý thủ công, hỗ trợ đối soát chính xác hơn. |
| WHO | **ĐÃ XÁC NHẬN qua PRD (User Story FT-3363) — SỬA lại dự đoán trước đó (từng đoán sai là Ops/vận hành)**: **Nhân viên tài chính (Finance)** — "Là Nhân viên tài chính, tôi muốn upload/import thông tin chi phí thuê xe của NCC cho các chuyến FTL trực tiếp vào hệ thống, để hệ thống tự động tổng hợp chi phí theo chuyến, giảm xử lý thủ công và hỗ trợ đối soát/PnL chính xác." |
| HOW | Theo PRD, flow đầy đủ: (1) User (Finance) vào Portal B2B > menu **Chi phí → Chi phí thuê xe NCC** → chọn "Upload file chi phí thuê xe NCC", có thể tải file mẫu (.xlsx) trước. (2) Điền dữ liệu theo template chuẩn (7 cột: Ngày, Nhà thầu, Biển số xe, Dự án sử dụng, Mã chuyến B2B, Số tiền thuê (Không gồm VAT), Ghi chú) → chọn file → bấm Upload. (3) Hệ thống validate CẤU TRÚC file trước (định dạng .xlsx, đủ cột, đúng tên header, đúng thứ tự cột, dung lượng ≤ 5MB) — sai cấu trúc thì TỪ CHỐI TOÀN BỘ, không xử lý tiếp (xem EDGES). (4) Nếu cấu trúc OK, validate TỪNG DÒNG theo rule ở mục 3 bên dưới. (5) Dòng lỗi → không ghi nhận, đưa vào file lỗi (.xlsx, giữ nguyên format template + thêm cột "Thông báo lỗi"); dòng hợp lệ → tiếp tục import, ghi nhận chi phí gắn đúng vào chuyến FTL tương ứng theo Mã chuyến B2B (đây CHÍNH LÀ loại **import MỘT PHẦN**, khớp đúng Nhóm A đã ghi ở `04-modal-ket-qua-upload-excel.md`). (6) Kết quả: hiển thị tóm tắt số dòng thành công/lỗi + link tải file lỗi (nếu có) + ghi lịch sử import (thời gian, người thực hiện, tên file, filter được theo thời gian/người thực hiện). |
| EDGES | Xem bảng validate đầy đủ + rule "trùng mã chuyến"/"replace theo mã chuyến" ở mục 3 (mới, dựa PRD) bên dưới — đây là phần quan trọng nhất PRD bổ sung, khác hẳn suy đoán ban đầu. Ngoài ra: (a) trạng thái rỗng bảng lịch sử "Chưa có thông tin lịch sử" — không có CTA, hợp lý vì là bảng LOG. (b) Màn không có nút Fill cam nào, cả 2 nút đều Outline — ĐÃ GIẢI THÍCH (Williams 2026-09-05, xem Khu vực C + Open Question #1): trade-off cố ý để giữ đồng nhất style giữa biến thể FULL và COMPACT. |
| HISTORY | Feature MỚI — ticket [FT-3363](https://giaohangnhanh.atlassian.net/browse/FT-3363), PRD Confluence cập nhật lần cuối 23/07/2026, chưa có version trước đó. Đây là màn "cha" của modal `04-modal-ket-qua-upload-excel.md` (đã document trước) — 2 file nên đọc cùng nhau khi build. |

## 2. Cấu trúc màn (theo khu vực)

**Khu vực A — Sidebar + Header**: Sidebar Portal B2B, module "Quản lí chi
phí FTL" đang mở rộng (expanded), mục con "Chi phí thuê xe NCC" đang active
(chữ cam + thanh cam bên trái). Header trên cùng: KHÔNG thấy breadcrumb
text (chỉ có icon "<" là nút thu gọn sidebar, không phải breadcrumb) — chỉ
có Avatar + tên + id/SĐT bên phải, giống gap breadcrumb đã phát hiện ở màn
khác (đã có quy tắc chung "PHẢI LUÔN có breadcrumb" trong
`role-to-component-mapping.md`, không cần hỏi lại — áp dụng luôn khi build).

**Khu vực B — Page Heading**: Tiêu đề "Chi phí thuê xe NCC" (Bold), không
có nút action nào cạnh tiêu đề. **SỬA 2026-09-05 (Williams xác nhận)**:
KHÔNG phải trang con — "Quản lí chi phí FTL" là 1 menu có nhiều sub-menu
(Giá xăng dầu, Chi phí lương, Chi phí FTL, Chi phí thuê xe NCC...), nhưng
bấm vào từng sub-menu vẫn điều hướng tới **trang chính** (top-level), KHÔNG
phải drill-down vào trang con/chi tiết. Vì vậy KHÔNG có nút "Trở về" là
ĐÚNG, khớp hoàn toàn với quy tắc đã ghi trong `role-to-component-mapping.md`
("trang chính — top-level trong sidebar — KHÔNG có nút Trở về") — không
phải gap, không cần hỏi lại (Open Question cũ đã gỡ, xem mục 4).

**Khu vực C — Khối "Tải dữ liệu chi phí thuê xe NCC"** (card, tiêu đề
Block heading node `18764:96469`) — **đây là biến thể FULL** của pattern
"khối upload Excel" (xem quy tắc chọn FULL vs COMPACT mới xác nhận bên
dưới, đã propagate vào `role-to-component-mapping.md`; ĐÚNG dùng FULL vì
upload Excel ở màn này là tính năng ĐỘC LẬP, đứng riêng 1 trang, không
phải tính năng bổ trợ của tính năng khác):
- Dropzone viền nét đứt, giữa có: dòng 1 = text link màu cam đậm "**Tải dữ
  liệu chi phí thuê xe**" + text thường " hoặc kéo thả vào đây" (bấm vào
  link cam hoặc kéo-thả file để chọn file từ máy); dòng 2 = text phụ màu
  xám "Tải file mẫu (định dạng .xlsx) để nhập thông tin chi phí thuê xe
  trước khi tải lên".
- 2 nút cạnh nhau, canh giữa dropzone: **[File mẫu]** (Outline, icon
  download, màu trung tính) + **[Tải lên]** (**Outline / Type: Primary**
  — biến thể CHÍNH THỨC trong Design System GHN, viền/chữ màu cam, ĐÃ
  CONFIRM 2026-09-05, xem Open Question #1). **Vì sao KHÔNG dùng Fill cam
  ở đây (trade-off cố ý, Williams giải thích 2026-09-05)**: biến thể
  COMPACT (node `23153:74508`, dùng khi upload Excel là tính năng bổ trợ,
  vd nằm trong dòng "bảng giá") luôn nằm bên trong 1 tính năng khác đã CÓ
  SẴN nút primary (Fill cam) riêng của tính năng đó rồi — nếu nút "Tải lên"
  cũng Fill cam sẽ tạo ra 2 nút Fill cam cạnh tranh nhau trong cùng 1 màn.
  Để tránh phải đổi style qua lại giữa FULL và COMPACT (giữ nhất quán tối
  đa), Williams chọn trade-off: **bản FULL cũng dùng Outline/Primary giống
  bản COMPACT**, chấp nhận không có nút Fill cam trên toàn bộ khối upload
  Excel (kể cả khi đứng 1 mình ở bản FULL) — đây là NGOẠI LỆ có chủ đích
  của quy tắc "1 nút Fill cam duy nhất trên toolbar", không phải thiếu sót.

**Khu vực D — Khối "Lịch sử tải lên"** (card riêng, node `18772:97008` —
trạng thái rỗng; đã tìm thêm được state "có dữ liệu" ở node `18772:98605`
"DS thông tin chi phí thuê xe" trong cùng section Figma "Import chi phí
xe", node `18764:94546`). **Lưu ý quan trọng (Williams 2026-09-05, xem quy
tắc chung mới propagate vào `role-to-component-mapping.md`)**: khối này
là OPTIONAL — tuỳ PRD của PO có yêu cầu lịch sử tải lên hay không, không
phải màn upload Excel nào cũng có. Ở màn này CÓ, vì PRD FT-3363 (bước 6
Workflow) xác nhận rõ: "Ghi nhận lịch sử import: thời gian, người thực
hiện, tên file" — khớp đúng 3/4 cột đã thấy trong Figma (Ngày cập nhật,
Người tải, cột # là số thứ tự tự sinh; PRD không nhắc thêm cột nào khác
ngoài 3 cột này + tên file):
- Bảng 4 cột: `# | Ngày cập nhật | Người tải | File upload` — style header
  row khớp quy chuẩn Table đã ghi (`bg/app/elevated`, Title/Title 1).
- Trạng thái rỗng: 1 dòng text canh giữa **"Chưa có thông tin lịch sử"** —
  không có nút CTA nào kèm theo (khác 2 pattern rỗng "Chưa có [X] — Chọn
  '[nút]' để bắt đầu thiết lập" và "Chưa có thông tin NCC. Vui lòng tạo mới
  NCC" đã ghi ở màn 1, 2 — hợp lý vì đây là bảng LOG lịch sử, không phải
  danh sách entity cần tạo mới bằng tay).
- **ĐÃ TRẢ LỜI Open Question cũ về Pagination** (tìm thấy qua state "có dữ
  liệu" `18772:98605`): CÓ Pagination đầy đủ (`Pagination / Pagination
  oragism`, node `19380:40813`) khi bảng có dữ liệu. Cột "File upload" ở
  state này KHÔNG hiển thị filename tĩnh như suy đoán ban đầu — mỗi dòng
  là 1 nút **"Xem chi tiết"** (Button organism, node vd `19380:40716`).
  Cột "Người tải" hiển thị dạng "[id] - [tên]" (vd "3029444 - Trần Thị
  Thanh"), khớp pattern "Mã — Tên" đã khuyến khích dùng ở
  `role-to-component-mapping.md`. Cột "File upload" cụ thể là 1 nút Button
  (không phải text/link/text-link) — theo quy tắc mới, mỗi cột lịch sử tải
  lên phải define rõ loại (text/link/text-link/button) chứ không mặc định.

## 3. Business rule validate (theo PRD FT-3363) — MỚI, thay hoàn toàn suy đoán

**Cấu trúc file** (kiểm tra trước tiên, sai thì từ chối TOÀN BỘ, không xử
lý từng dòng): định dạng .xlsx, dung lượng ≤ 5MB, đủ cột đúng tên header
đúng thứ tự theo template chuẩn 7 cột. Sai → thông báo **"File không đúng
định dạng hoặc vượt quá dung lượng cho phép"** (sai .xlsx/quá 5MB) hoặc
**"Format file không hợp lệ, vui lòng kiểm tra lại template"** (thiếu
cột/sai tên header).

**Validate từng dòng** (sau khi cấu trúc OK):

| Field | Bắt buộc | Rule | Thông báo lỗi |
|---|---|---|---|
| Mã chuyến B2B | Có | Phải tồn tại trong hệ thống chuyến FTL; trim khoảng trắng 2 đầu, không phân biệt hoa thường; là KEY để map + replace | Trống → "Mã chuyến B2B là bắt buộc"; không tồn tại → "Mã chuyến không tồn tại" |
| Số tiền thuê (Không gồm VAT) | Có | Số nguyên > 0, đơn vị VNĐ | "Giá trị không hợp lệ (phải là số nguyên > 0)" |
| Biển số xe | Có | Tối đa 10 ký tự; PHẢI khớp đúng biển số thực tế trên chuyến (trim, không phân biệt hoa thường) | "Biển số xe không thuộc chuyến" |
| Ngày / Nhà thầu / Dự án sử dụng / Ghi chú | Không | Tối đa 100 ký tự; để trống thì bỏ qua không báo lỗi | "Giá trị vượt quá 100 ký tự" |

**Quy tắc trùng lặp trong CÙNG 1 file**: nếu ≥ 2 dòng trùng Mã chuyến B2B
→ **TẤT CẢ** các dòng trùng đó đều lỗi (không giữ lại dòng nào, kể cả dòng
đầu tiên) → "Trùng mã chuyến trong file".

**Quy tắc REPLACE (ghi đè) giữa các lần import khác nhau**: nếu chuyến đã
có chi phí thuê xe NCC từ lần import trước, import mới chứa cùng Mã chuyến
→ **GHI ĐÈ TOÀN BỘ** giá trị chi phí cũ bằng dữ liệu mới (key replace =
Mã chuyến B2B) — KHÔNG cộng dồn.

**Kết quả import**: dòng hợp lệ → lưu chi phí gắn vào đúng chuyến; dòng
lỗi → không ghi nhận, gom vào file lỗi (.xlsx, giữ nguyên template + thêm
cột "Thông báo lỗi") để user tải về sửa và upload lại. Hệ thống ghi nhận
lịch sử: thời gian, người thực hiện, tên file — filter được theo thời
gian/người thực hiện.

**Out of scope (PRD nói rõ)**: thanh toán công nợ với NCC; tự động hoá
đối soát ngoài phạm vi import.

## 4. Áp dụng được từ `role-to-component-mapping.md`

Khớp tốt: style Table (header `bg/app/elevated` + Title/Title 1), Block
heading `Title/Title 1` cho 2 khối card, breadcrumb-gap là gap đã biết
(không cần hỏi lại), cột "Người tải" dạng "[Mã] — [Tên]" khớp pattern đã
khuyến khích.

Mới propagate (đã confirm 2026-09-05, xem mục 5 Open Questions):
- Biến thể "Outline / Type: Primary" cho nút kích hoạt upload — đã thêm
  vào bảng Nút bấm, kèm ngoại lệ "không cần Fill cam" cho riêng pattern
  upload Excel.
- Trạng thái rỗng bảng KHÔNG có CTA — thêm 1 biến thể empty-state pattern
  mới (bảng log/lịch sử, không phải danh sách entity).

## 5. Open Questions — cần Williams xác nhận trước khi build spec.json

1. ~~Nút "Tải lên" dùng Outline viền/chữ màu CAM...~~ — ĐÃ TRẢ LỜI (Williams
   2026-09-05): CHÍNH THỨC là **"Outline / Type: Primary"** trong Design
   System GHN. Lý do không có Fill cam trong pattern upload Excel: trade-off
   cố ý để bản FULL đồng nhất style với bản COMPACT — bản COMPACT luôn nằm
   trong 1 tính năng khác đã có sẵn nút Fill cam riêng, nên nút "Tải lên"
   không thể cũng là Fill cam (tránh 2 Fill cam cạnh tranh); để khỏi đổi
   style qua lại giữa 2 bản, bản FULL chấp nhận dùng chung Outline/Primary
   dù đứng 1 mình. Xem chi tiết Khu vực C.
2. ~~Trang "Chi phí thuê xe NCC" là trang con...~~ — ĐÃ TRẢ LỜI (Williams
   2026-09-05): KHÔNG phải trang con — sub-menu của "Quản lí chi phí FTL"
   vẫn dẫn tới trang chính (top-level), không phải drill-down. Không có
   nút Trở về là đúng quy tắc đã ghi, không phải gap.
3. ~~Bảng "Lịch sử tải lên" có Pagination...~~ — ĐÃ TRẢ LỜI (tìm thấy qua
   node Figma `18772:98605`, state "có dữ liệu"): CÓ Pagination, xem Khu
   vực D đã cập nhật.
4. ~~WHO thật sự dùng màn này...~~ — ĐÃ TRẢ LỜI qua PRD FT-3363: **Nhân
   viên tài chính (Finance)**, xem mục 1.
5. ~~PRD nhắc tới "Bảng tổng hợp hiển thị tổng chi phí theo chuyến, theo
   NCC..."~~ — ĐÃ TRẢ LỜI (Williams 2026-09-05): **BỎ** — PRD đã được PO
   define lại, không còn phần này nữa. Không phải gap thiết kế, đã cập
   nhật ở mục 1 (WHAT).
6. ~~Phát hiện 1 bộ frame Alert organism khác (`18781:99157`,
   `18781:99172`, `18781:99356`, `18786:102647`) thể hiện kết quả validate
   file, khác với modal lớn ở `04-modal-ket-qua-upload-excel.md`
   (`23148:*`)~~ — ĐÃ TRẢ LỜI (Williams 2026-09-05): các frame Alert
   organism (`18781:*`, `18786:102647`) là **cấu trúc CŨ, đã lỗi thời**.
   Modal lớn ở `04-modal-ket-qua-upload-excel.md` (nodes `23148:*`, icon
   tròn 64×64 + 2 stat box) là cấu trúc **MỚI NHẤT, chính thức** — dùng
   bản này khi build, KHÔNG dùng lại các frame Alert organism cũ.
