# Modal kết quả xử lý khi upload file Excel (đã xong — 3/3 Open Questions đã trả lời/confirm, 2026-09-05)

Loại khuôn: **Modal độc lập** (đáp ứng slot #4 trong `00-checklist.md`).
Hệ thống: **Portal B2B** (cùng file Figma với màn 1-2 — "B2B-PORTAL").
fileKey: `s2NE6ikwLnsZSUp97RBfof`. Node gốc: `23148:61911` ("Section 1" —
1 frame tổng hợp chứa 5 state modal khác nhau, chia làm 2 nhóm theo loại
import).
Link Figma: https://www.figma.com/design/s2NE6ikwLnsZSUp97RBfof/B2B-PORTAL?node-id=23148-61911

**Lưu ý nghiệp vụ QUAN TRỌNG (Williams, 2026-09-05) — áp dụng cho MỌI tính
năng upload Excel về sau, không riêng modal này**: khi hệ thống cho phép
upload file Excel để nhập dữ liệu hàng loạt, luôn tồn tại 2 cơ chế xử lý
khác nhau, PHẢI xác định rõ cái nào trước khi thiết kế/build:

1. **Import dữ liệu MỘT PHẦN (partial import)**: nếu file có dòng lỗi,
   CHỈ báo lỗi các dòng đó — các dòng hợp lệ vẫn được lưu vào hệ thống
   bình thường.
2. **Import dữ liệu TOÀN PHẦN (all-or-nothing import)**: chỉ cần file có
   TỐI THIỂU 1 dòng lỗi, TOÀN BỘ file bị từ chối — không dòng nào được
   lưu. Hệ thống chỉ lưu khi 100% dữ liệu hợp lệ.

**Quy tắc bắt buộc khi phân tích PRD (áp dụng vào skill `prd-analysis`)**:
nếu PRD có tính năng upload Excel mà KHÔNG ghi rõ là loại nào trong 2 loại
trên, PHẢI hỏi lại PO — không được tự đoán/mặc định 1 loại. Nếu PO không
hiểu câu hỏi, giải thích rõ 2 khái niệm trên bằng ví dụ cụ thể để họ tự
quyết định loại nào phù hợp với nghiệp vụ của tính năng đó.

## 1. Bảng ngữ cảnh (6 chiều)

| Chiều | Nội dung |
|---|---|
| WHAT | Modal thông báo kết quả xử lý sau khi user upload 1 file Excel — cho biết file có bao nhiêu dòng hợp lệ, bao nhiêu dòng lỗi, và dữ liệu có được lưu vào hệ thống hay không. |
| WHY | User cần biết NGAY kết quả xử lý và biết chắc dữ liệu (nếu có) đã được lưu hay chưa, để quyết định bước tiếp theo (tải file lỗi về sửa rồi upload lại, hay không cần làm gì thêm). |
| WHO | Modal dùng CHUNG cho nhiều feature khác nhau, KHÔNG gắn WHO riêng theo từng feature — xác nhận theo Williams 2026-09-05: modal này là pattern chung cho MỌI tính năng có upload file Excel trong hệ thống (ví dụ ở đây là "Danh sách thuê xe NCC" và "Bảng giá"), vai trò người dùng cụ thể tuỳ thuộc feature nào đang gọi modal, không cần document lại riêng ở đây. |
| HOW | Sau khi user chọn file Excel và bấm upload → hệ thống validate từng dòng → hiện modal "Kết quả xử lý" với 1 trong 5 trạng thái (xem mục 2), tuỳ theo loại import (một phần/toàn phần) và kết quả validate. |
| EDGES | Xem quy tắc nghiệp vụ 2 loại import ở trên — đây chính là nguồn gốc của toàn bộ các trạng thái khác nhau trong modal này. |
| HISTORY | Không có trong node này. |

## 2. Các trạng thái modal (5 state, chia 2 nhóm theo loại import)

### Nhóm A — Import dữ liệu MỘT PHẦN (dữ liệu hợp lệ luôn được lưu)

Ví dụ file dùng trong Figma: `DS_thuexeNCC.xlsx` (Danh sách thuê xe NCC).

| State | Node ID | Icon | Tiêu đề | Stat: hợp lệ / lỗi | Footer |
|---|---|---|---|---|---|
| Có lỗi 1 phần | `23148:61914` | ⚠️ vàng | "File có dữ liệu lỗi cần chỉnh sửa" | 23 "đã lưu" (xanh) / 12 "lỗi, chưa lưu" (đỏ) | [Xác nhận] (Outline) + [Tải file xử lý] (Fill cam) |
| Lỗi hoàn toàn | `23148:61943` | ❗ đỏ (tròn) | "Không có dữ liệu hợp lệ" | 0 "đã lưu" (xanh) / 35 "lỗi, chưa lưu" (đỏ) | [Xác nhận] (Outline) + [Tải file xử lý] (Fill cam) |
| Hợp lệ hoàn toàn | `23148:61973` | ✅ xanh | "Tất cả dữ liệu hợp lệ" | 35 "đã lưu" (xanh) / 0 "lỗi, chưa lưu" (đỏ) | [Xác nhận] (Fill cam) — CHỈ 1 nút, không có [Đóng]/[Tải file xử lý] vì không có gì cần sửa |

Cấu trúc chung cả 3 state: Header "Kết quả xử lý" + nút đóng (X) → Icon
tròn to (64×64) → Tiêu đề (Bold) → "Tên file: [tên file dạng chip nền màu]"
→ đoạn mô tả (2 dòng, màu xám) → 2 stat box cạnh nhau (số lớn + label nhỏ
bên dưới: **"đã lưu"** / **"lỗi, chưa lưu"** — wording đã chốt 2026-09-05,
xem mục 3) → footer.

Đoạn mô tả nguyên văn (2 state đầu, giống hệt nhau) — **GIỮ NGUYÊN, KHÔNG
đảo thứ tự** (Williams xác nhận 2026-09-05 chỉ cần đổi wording stat box,
không cần đảo đoạn mô tả): *"Tải file xử lý để xem kết quả, chỉnh sửa và
tải lên lại. Chỉ các dữ liệu hợp lệ mới được lưu vào hệ thống"*. Đoạn mô tả
state "Hợp lệ hoàn toàn": *"Toàn bộ dữ liệu hợp lệ đã được lưu vào hệ
thống"*.

**Wording stat box đã chốt — xem mục 3 bên dưới.**

### Nhóm B — Import dữ liệu TOÀN PHẦN (1 dòng lỗi = huỷ toàn bộ)

Ví dụ file dùng trong Figma: `Concung_banggiaLTL.xlsx` (Bảng giá LTL).

| State | Node ID | Icon | Tiêu đề | Mô tả | Footer |
|---|---|---|---|---|---|
| Thành công | `23148:69411` | ✅ xanh | "Bảng giá tạo thành công" | "Dữ liệu đã nhập vào hệ thống" | [Xác nhận] (Fill cam) — CHỈ 1 nút |
| Thất bại | `23148:69395` | ⚠️ vàng | "File xử lý thất bại" | "Dữ liệu trong file không hợp lệ hoặc sai định dạng mẫu. Hệ thống chỉ nhập dữ liệu khi tất cả tuyến hợp lệ. Vui lòng kiểm tra lại dữ liệu." | [Xác nhận] (Outline) + [Tải file xử lý] (Fill cam) |

Khác biệt quan trọng so với Nhóm A: **KHÔNG có 2 stat box (hợp lệ/lỗi)** —
vì với import toàn phần, kết quả chỉ có đúng 2 khả năng (thành công 100%
hoặc thất bại 100%), không có khái niệm "một phần" nên không cần đếm số
dòng hợp lệ/lỗi riêng.

## 3. UX Writing cho stat box "hợp lệ/lỗi" (Nhóm A) — ĐÃ CONFIRM 2026-09-05

**Vấn đề Williams nêu**: text hiện tại ("X dữ liệu hợp lệ" / "Y dữ liệu
lỗi") chỉ nói SỐ LƯỢNG và LOẠI, không nói TRẠNG THÁI LƯU — user không đọc
đoạn mô tả phía trên (dễ bị bỏ qua) nên không biết chắc X dòng hợp lệ đó
đã được lưu vào hệ thống chưa. Bản Williams tự thử ("X dữ liệu hợp lệ đã
lưu" / "Y dữ liệu lỗi không ghi nhận") vẫn dài và "không ghi nhận" mơ hồ
(không rõ là cần làm gì tiếp).

**Đề xuất của mình** — áp dụng nguyên tắc front-loading (đưa thông tin
quan trọng nhất lên đầu) + Plain Language (dùng từ quen thuộc, tránh thuật
ngữ mơ hồ như "ghi nhận"):

| Vị trí | Text cũ | Text mới (ĐÃ ÁP DỤNG) |
|---|---|---|
| Stat box hợp lệ (số + label) | "dữ liệu hợp lệ" | **"đã lưu"** |
| Stat box lỗi (số + label) | "dữ liệu lỗi" | **"lỗi, chưa lưu"** |
| Đoạn mô tả (2 state đầu) | "Tải file xử lý để xem kết quả, chỉnh sửa và tải lên lại. Chỉ các dữ liệu hợp lệ mới được lưu vào hệ thống" | **GIỮ NGUYÊN — Williams xác nhận 2026-09-05 KHÔNG cần đảo thứ tự, chỉ cần đổi wording stat box là đủ giải quyết vấn đề.** |

Lý do chọn "đã lưu" / "lỗi, chưa lưu" thay vì bản Williams tự thử:
- Ngắn hơn, vẫn đủ 2 lớp thông tin cần thiết ngay tại chỗ user chắc chắn
  nhìn thấy (con số to, khó bỏ qua) thay vì chỉ nằm ở đoạn mô tả dễ bị
  lướt qua — giải quyết đúng gốc vấn đề Williams nêu (không phụ thuộc
  user phải đọc caption).
- "chưa lưu" rõ nghĩa và quen thuộc hơn "không ghi nhận" — "không ghi
  nhận" dễ hiểu nhầm thành "hệ thống không xử lý gì cả" hoặc "cần làm gì
  đó khác", trong khi "chưa lưu" nói thẳng đúng 1 sự thật: dữ liệu này
  CHƯA được lưu, cần sửa rồi lưu lại (hành động cụ thể đã có sẵn ở nút
  "Tải file xử lý" ngay dưới).
- Ban đầu có đề xuất thêm việc đảo thứ tự đoạn mô tả (xác nhận trạng thái
  lưu trước, hướng dẫn thao tác sau) — Williams xác nhận 2026-09-05 KHÔNG
  cần thiết, vì bản thân việc đổi wording 2 stat box đã đủ giải quyết đúng
  gốc vấn đề (user không cần đọc đoạn mô tả mới biết trạng thái lưu).

**Đã confirm 2026-09-05 — đã propagate vào `role-to-component-mapping.md`
(xem mục 4 bên dưới).**

## 4. Vai trò nút/text áp dụng được từ `role-to-component-mapping.md` (ghi chú nội bộ)

Khớp tốt: Button organism Fill cam cho hành động chính, Outline cho hành
động phụ, Title/Title 1 cho tiêu đề modal.

Đã bổ sung vào `role-to-component-mapping.md` (mới, xác nhận theo Williams
2026-09-05):
- Pattern "Modal kết quả xử lý hàng loạt" (bulk result modal): icon tròn
  to (64×64, màu theo trạng thái: xanh=thành công/vàng=cảnh báo/đỏ=lỗi
  hoàn toàn) + tiêu đề Bold + "Tên file: [chip]" + đoạn mô tả + (tuỳ
  import một phần/toàn phần) 2 stat box hoặc không + footer 1-2 nút tuỳ
  còn việc cần làm hay không.
- Quy tắc: khi TOÀN BỘ dữ liệu hợp lệ (không còn gì cần sửa) → footer CHỈ
  1 nút [Xác nhận]; khi CÒN dữ liệu lỗi cần xử lý → footer 2 nút [Xác nhận
  (Outline)] + [Tải file xử lý (Fill cam)] — KHÔNG dùng [Đóng].
- Wording stat box hợp lệ/lỗi khi import một phần: "đã lưu" / "lỗi, chưa
  lưu" — xem mục 3.

## 5. Open Questions — ĐÃ TRẢ LỜI/CONFIRM (2026-09-05)

1. ~~Đề xuất wording ở mục 3...~~ → **Đồng ý dùng "đã lưu" / "lỗi, chưa
   lưu" cho 2 stat box; KHÔNG cần đảo thứ tự đoạn mô tả** — chỉ đổi wording
   là đủ.
2. ~~WHO cụ thể...~~ → **Modal dùng chung cho nhiều feature khác nhau, chủ
   yếu là mọi tính năng có upload file Excel — không gắn WHO riêng theo
   từng feature.**
3. ~~Khi nào dùng MỘT PHẦN, khi nào dùng TOÀN PHẦN...~~ → **Do nghiệp vụ PO
   đề xuất + ràng buộc kỹ thuật (technical constraint) của hệ thống quyết
   định riêng từng feature — KHÔNG có quy tắc chung cố định.** Đây chính
   là lý do quy tắc bắt buộc ở đầu file này (hỏi lại PO nếu PRD không ghi
   rõ) phải luôn được áp dụng — không có công thức chung để tự suy đoán.
