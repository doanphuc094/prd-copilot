# Quản lý POD (đã xong — 7/7 Open Questions đã trả lời/confirm, 2026-09-05)

Loại khuôn: **khác** (list + nhiều state phụ trợ: rỗng, lọc, lightbox xem
ảnh/video, popup tiến trình tải file, toast huỷ). Đáp ứng slot #7
(optional) trong `00-checklist.md` — Williams chủ động đưa màn này để
minh hoạ thêm 1 KIỂU KHÁC của nguyên tắc "gộp thông tin liên quan vào 1
cột", vì bảng dữ liệu là loại component dùng nhiều nhất hệ thống này.

Hệ thống: **Portal B2B** (cùng file Figma "B2B-PORTAL" với các màn 1,2,4,
5,6). fileKey: `s2NE6ikwLnsZSUp97RBfof`. Node gốc: `22315:242249` (tên
Figma "Quản lý POD"), nằm trong sidebar menu **"Dynamic SOP" > "Quản lý
POD"** (khác nhóm menu với các màn chi phí trước đó — "Quản lí chi phí
FTL").
Link Figma: https://www.figma.com/design/s2NE6ikwLnsZSUp97RBfof/B2B-PORTAL?node-id=22315-242249

Các state con đã research (cùng 1 file, khác node):
- `22315:242250` — "Quản lý POD - Có data" (danh sách mặc định, có dữ liệu)
- `22316:250189` — "DS POD - Trống" (empty state)
- `22316:251341` / `22316:252148` — "Quản lý POD - Lọc có dữ liệu" (đã áp
  dụng filter, 2 node gần như giống nhau)
- `22316:252666` — "Preview ảnh" (lightbox xem ảnh/video toàn màn hình)
- `22316:252745` — "Popup progress" (modal tiến trình tải file zip)
- `22316:253603` — "Huỷ tải về" (toast báo đã huỷ tải xuống)

**Nguồn PRD (2026-09-05)**: [FT-4074 "FTL - Thêm các loại hình POD khác có
thể xem và tải về trên trang Quản lý POD và CTĐH"](https://giaohangnhanh.atlassian.net/wiki/spaces/PM/pages/1693679663)
(Confluence, cập nhật lần cuối 27/08/2026).

**✅ ĐÃ CONFIRM 2026-09-05 (Williams)**: dù PRD gắn nhãn "NOT IN SPRINT 70",
màn này **ĐÃ được triển khai thực tế và Figma hiện tại chính là bản mới
nhất** — nhãn "NOT IN SPRINT 70" trên Confluence đã lỗi thời, không phản
ánh đúng trạng thái triển khai thật. Toàn bộ tài liệu dưới đây coi Figma
là nguồn CHÍNH THỨC/mới nhất khi có mâu thuẫn với câu chữ PRD.

## 1. Bảng ngữ cảnh (6 chiều)

| Chiều | Nội dung |
|---|---|
| WHAT | Trang "Quản lý POD" (sidebar "Dynamic SOP") — cho phép Vận Hành xem TOÀN BỘ chứng cứ giao/nhận hàng (POD: Proof of Delivery) mà tài xế đã chụp/quay khi thực hiện chuyến FTL, lọc theo nhiều tiêu chí, xem ảnh/video phóng to (lightbox), và xuất dữ liệu hàng loạt (zip gồm 1 file Excel tổng hợp + 1 folder media). FT-4074 mở rộng thêm: hiển thị/lọc được nhiều LOẠI POD hơn (không chỉ "chứng từ") và nhiều SỰ KIỆN/workflow hơn (không chỉ lấy/giao thành công). |
| WHY | Trước đây chỉ xem được POD dạng "chứng từ" ở 2 sự kiện (lấy/giao thành công) — nhưng nghiệp vụ "FTL - Dynamic SOP" cho phép cấu hình nhiều loại chụp hình khác (hình địa điểm, hàng hoá, seal xe, vị trí đặt hàng, hình khác, video) ở nhiều mốc sự kiện hơn (đến điểm lấy/rời điểm lấy/đến điểm giao/rời điểm giao). Vận Hành cần xem đủ các loại này để kiểm tra quá trình lấy/giao, gửi khách hàng, hoặc xử lý vấn đề hậu giao hàng — nếu thiếu, phải hỏi tài xế/tra cứu thủ công. |
| WHO | **Vận Hành (SD, OE, …)** — theo PRD ("Là Vận Hành (SD, OE,…), tôi muốn được nhìn thấy và tải về..."). **ĐÃ CONFIRM 2026-09-05 (Williams)**: phân quyền ở màn này là **theo MODULE** (role nào được cấp quyền truy cập module "Dynamic SOP" thì thấy toàn bộ trang này), KHÁC MÔ HÌNH với các màn chi phí trước (`05`, `06`) vốn phân quyền chi tiết hơn theo Kho vận tải/ID nhân viên cho từng dòng dữ liệu. → Xác nhận: hệ thống có ÍT NHẤT 2 mô hình phân quyền khác nhau tuỳ module — "theo module" (toàn quyền xem nếu có role) vs "theo entity con" (kho/khách hàng cụ thể) — xem mục 4. |
| HOW | (1) Vào Portal B2B > "Dynamic SOP" > "Quản lý POD". (2) Lọc theo Khách hàng / Loại POD / Điều kiện (sự kiện) / Thời gian chụp (date range) — filter đa chọn hiện dạng "N khách hàng"/"N loại điều kiện" kèm tooltip liệt kê khi hover, có link "Xoá lọc (N)" xoá hết 1 lần. (3) Xem bảng — mỗi dòng có nút "Xem ảnh (N)" (N = số lượng ảnh/video của dòng đó) → mở lightbox toàn màn hình xem từng ảnh/video, điều hướng prev/next + thumbnail strip, tải về từng file. (4) Bấm "Xuất dữ liệu" → xuất TOÀN BỘ danh sách đang filter thành 1 file .zip (1 Excel tổng hợp + 1 folder ảnh/video) → hiện modal tiến trình có % và nút Huỷ → huỷ giữa chừng thì có toast xác nhận "Đã huỷ tải về". |
| EDGES | (a) Điều kiện hiển thị "Sự kiện"/"Loại POD" phụ thuộc cấu hình Dynamic SOP của khách hàng **tại thời điểm chụp** — nếu cấu hình đổi SAU khi đã chụp, hiển thị đúng data đã có, KHÔNG ẩn đi; (b) nhiều ảnh/video cùng 1 dòng → sắp xếp mới nhất → cũ nhất (latest to oldest); (c) empty state hiện khi không có dữ liệu khớp filter, vẫn giữ nguyên header cột + bộ lọc phía trên; (d) tải xuống là tác vụ chạy nền có thể huỷ giữa chừng (khác các nút tải-về-ngay-lập-tức đã thấy trước đây). |
| HISTORY | FT-4074, cập nhật lần cuối 27/08/2026 — mở rộng từ 1 tính năng MVP cũ hơn (trang "Quản lý POD" đã tồn tại, chỉ hỗ trợ loại "chứng từ" + 2 sự kiện thành công). **Chi tiết thật đã confirm 2026-09-05 (Williams)**: (1) PRD BAN ĐẦU chỉ định user chỉ được xem **1 ảnh/dòng** dù trạng thái là "lấy thành công" hay gì khác — nhưng do **technical constraint** (ràng buộc kỹ thuật), hệ thống phải GỘP TẤT CẢ ảnh vào CÙNG 1 trạng thái cho CÙNG 1 mã đơn hàng thành 1 dòng duy nhất → vì vậy nút đổi thành **"Xem ảnh (N)"** (kèm số lượng) để user phân biệt dòng nào có nhiều ảnh. (2) PRD đề xuất đổi tên cột thành **"POD"** nhưng KHÔNG được áp dụng — vì "POD" là từ viết tắt (Proof of Delivery), người dùng thường sẽ không hiểu nghĩa, nên tên hiển thị thật giữ dạng mô tả rõ nghĩa hơn (vd "Hình chứng từ" cho từng loại POD cụ thể) thay vì dùng thẳng chữ viết tắt "POD" — đây là 1 quyết định UX chủ động ĐI NGƯỢC lại câu chữ literal của PRD, không phải Figma lỗi thời. |

## 2. Cấu trúc màn theo state

### 2.1. Danh sách chính — có dữ liệu (`22315:242250`)

**Khu vực A — Sidebar + Header**: sidebar nhóm "Dynamic SOP" (menu cha) >
"Quản lý POD" (sub-menu, đang active) — cùng pattern "trang chính qua
sub-menu" đã ghi (không có nút Trở về).

**Khu vực B — Page Heading**: "Quản lý POD" (Bold), không action cạnh
tiêu đề.

**Khu vực C — Toolbar filter**: 4 dropdown filter cùng hàng (**Khách
hàng**, **Loại POD**, **Điều kiện**, **Thời gian chụp** — date range
picker) + nút **[Xuất dữ liệu]** (Fill cam) neo phải, tách biệt hẳn khỏi
nhóm filter (khác toolbar `[Bộ lọc][Search]...[Tuỳ chỉnh cột][Xuất dữ
liệu][Hành động chính]` đã chuẩn hoá ở các màn trước — ở đây KHÔNG có nút
"Bộ lọc" gộp chung, KHÔNG có Search text, KHÔNG có "Tuỳ chỉnh cột" — filter
hiện trực tiếp từng dropdown ngoài toolbar). **✅ ĐÃ CONFIRM 2026-09-05
(Williams) — đây là biến thể CHÍNH THỨC, có tên gọi "toolbar filter"**:
dùng khi filter là THÀNH PHẦN TƯƠNG TÁC CHÍNH của trang (ở đây, nhiệm vụ
chính của "Quản lý POD" là lọc để xuất/tải dữ liệu theo khách hàng hoặc
theo mốc thời gian cụ thể) — filter không nên gom vào 1 nút "Bộ lọc" ẩn,
vì sẽ khiến user mất thêm 1 bước để mở VÀ không nhớ được trong đó có
những tiêu chí lọc nào. Xem rule tổng quát ở mục 4.

**Khu vực D — Bảng dữ liệu (7 cột)** — đây là phần Williams muốn ghi lại
kỹ để học kiểu "gộp thông tin liên quan vào 1 cột" theo NHIỀU STYLE khác
nhau đã gặp trong hệ thống:

| Cột | Nội dung / cách gộp |
|---|---|
| **Tên khách hàng** | 2 dòng: Text đậm "[mã KH] - [tên KH]" (vd "35381 - Aqua Vietnam") + **badge nhỏ dưới** "FTL"/"LTL" (loại dịch vụ) — style GIỐNG "Loại điểm" ở màn `06` (text đậm + badge dưới), nhưng ở đây badge là **loại dịch vụ**, không phải trạng thái. |
| Mã đơn hàng | Text đơn, không gộp gì thêm. |
| Mã đơn khách hàng | Text đơn (mã do khách hàng tự đặt, khác mã đơn GHN). |
| **Tên địa điểm** | 2 dòng: dòng 1 "[mã kho] [tên viết tắt]" (vd "13579 VHN_HNO - Kho"), dòng 2 "[tên chi nhánh đầy đủ]" (vd "CN ĐMX Hoài Đức") — biến thể KHÁC của pattern "Mã — Tên" đã ghi (trước đây ghi dạng 1 dòng "Mã - Tên" nối bằng gạch ngang, ở đây lại TÁCH THÀNH 2 DÒNG riêng khi tên đầy đủ quá dài để nối 1 dòng — **cần bổ sung vào rule "Mã — Tên": khi tên dài, tách 2 dòng thay vì nối gạch ngang**). |
| **Loại POD & Điều kiện** | 2 dòng GỘP 2 THÔNG TIN KHÁC HẲN NHAU: dòng 1 = **Loại POD** (text thường, vd "Chứng từ"), dòng 2 = **Điều kiện/Sự kiện** (**TEXT CÓ MÀU**, KHÔNG phải badge/chip — xanh lá cho "Lấy thành công"/"Giao thành công", đỏ cho "Lấy thất bại"/"Giao thất bại") — **style MỚI, khác hẳn `06` (ở đó dùng badge/chip cho phần phụ) — đây dùng TEXT MÀU trần, không có nền/viền bao quanh.** Ví dụ tốt Williams muốn ghi lại: cùng nguyên tắc "gộp 1 cột" nhưng chọn text-màu hay badge tuỳ mức độ nhấn mạnh cần thiết. |
| Thời gian chụp | "[ngày] - [giờ:phút:giây]" 1 dòng. |
| **Thao tác** | nút Outline cam "[icon mắt] Xem ảnh (N)" — N = số lượng ảnh/video của dòng đó, hiện ngay trên nút (không phải cột riêng đếm số lượng). |

Có Pagination chuẩn ở cuối bảng (page 2/23, "10 hàng/Trang").

### 2.2. Danh sách — trống (`22316:250189`)

Không có dòng dữ liệu nào: bảng chỉ còn header cột, phần thân hiện 1 dòng
căn giữa, chữ xám nhạt: **"Chưa có dữ liệu POD"**. Bộ lọc phía trên vẫn
hiển thị đầy đủ, không bị ẩn — cho phép user đổi lại filter ngay tại chỗ.

### 2.3. Danh sách — đã áp dụng filter (`22316:251341`)

Multi-select filter khi chọn ≥1 giá trị hiện dạng tóm tắt **"N [đơn vị]"**
(vd "3 khách hàng", "2 loại điều kiện") thay vì liệt kê hết — hover vào
dropdown hiện tooltip dạng list đen liệt kê đầy đủ giá trị đã chọn (vd
"3 khách hàng: • Aqua Vietnam • CJ Logistics • Bách Hoá Xanh"). Bên cạnh
bộ lọc ngày, xuất hiện thêm link **"✕ Xoá lọc (3)"** màu đỏ/cam — xoá TOÀN
BỘ filter đang áp dụng trong 1 lần bấm, số trong ngoặc = tổng số filter
(không phải số giá trị) đang active.

### 2.4. Lightbox xem ảnh/video (`22316:252666`)

Toàn màn hình, nền đen phủ kín:
- Góc trên-trái: badge trạng thái sự kiện (vd "LẤY THÀNH CÔNG" — nền xanh
  lá nhạt/viền xanh) + text "Chứng từ" (loại POD) + "[ngày] - [giờ]" +
  **"8/10"** (số thứ tự ảnh hiện tại / tổng số ảnh của dòng đó)
- Góc trên-phải: nút [⬇ Tải về] (Fill cam) + nút [X] đóng
- Giữa: ảnh/video phóng to (ảnh chứng từ có thể có overlay timestamp/GPS
  do app chụp bằng "Timemark" đóng dấu sẵn trong ảnh — KHÔNG phải overlay
  do hệ thống Portal vẽ thêm)
- 2 mũi tên trái/phải ở rìa màn hình — điều hướng ảnh trước/sau
- Cuối màn hình: dải thumbnail thu nhỏ (6 ảnh hiện cùng lúc, cuộn được) —
  bấm thumbnail để nhảy nhanh tới ảnh đó

Đây là component **MỚI, chưa từng gặp** trong các màn đã ghi trước (khác
hẳn kiểu modal đơn giản "Xem hình ảnh" 1 ảnh tĩnh ở màn `05`/`06`) — dùng
khi 1 dòng dữ liệu có NHIỀU ảnh/video cần xem tuần tự.

### 2.5. Modal tiến trình tải file (`22316:252745`)

Modal nhỏ, căn giữa, nền tối phủ ngoài:
- Title: "Đang tải file xuống" (Bold)
- Mô tả: "Hệ thống đang thực hiện tải dữ liệu POD. Vui lòng chờ và không
  tắt trang này."
- Thanh progress bar (Fill cam) + % số (vd "40%") cùng hàng bên phải
- Footer: chỉ 1 nút **[Huỷ]** (Outline cam) — không có nút xác nhận nào
  khác vì tác vụ đang tự chạy nền

### 2.6. Toast huỷ tải về (`22316:253603`)

Banner nổi, căn giữa-trên (không phải góc, không phải trong hàng), nền đỏ
nhạt + viền đỏ + icon lỗi tròn đỏ: **"Đã huỷ tải về"** — **ĐÃ CONFIRM
2026-09-05 (Williams)**: tự ẩn sau vài giây, không cần user bấm đóng.

## 3. Business rule (PRD FT-4074 + quan sát Figma)

**Nguồn dữ liệu POD**: chỉ hiện những loại POD mà cấu hình "FTL - Dynamic
SOP" của khách hàng CHO PHÉP tại **thời điểm chụp** hình — đổi cấu hình
sau đó KHÔNG ảnh hưởng dữ liệu đã có (không ẩn/xoá).

**Loại POD (theo PRD, mở rộng)**: Hình địa điểm / Hình hàng hoá / Hình
seal xe / Hình vị trí đặt hàng / Hình chứng từ / Hình khác / Video.

**Sự kiện/Điều kiện (theo PRD, mở rộng)**: Đến điểm lấy / Lấy thành công /
Rời điểm lấy / Đến điểm giao / Giao thành công / Rời điểm giao (khớp cấu
hình workflow Dynamic SOP). Figma hiện tại (state đã research) chỉ thấy
dữ liệu mẫu ở 4 giá trị "Lấy thành công/thất bại", "Giao thành công/thất
bại" — CHƯA thấy dữ liệu mẫu cho "Đến điểm lấy/Rời điểm lấy/Đến điểm
giao/Rời điểm giao" — có thể vì Figma dùng data cũ (trước FT-4074) làm
mẫu, không có nghĩa la field không hỗ trợ.

**Đổi tên — ĐÃ CONFIRM 2026-09-05 (Williams), Figma là bản đúng/cuối
cùng**: PRD đề xuất đổi cột "Hình chứng từ" → "POD" và nút "Xem ảnh" →
"Xem POD", nhưng bản thật KHÔNG theo đúng câu chữ đó:
- Tên "POD" bị bỏ vì là từ viết tắt khó hiểu với người dùng — giữ tên mô
  tả rõ nghĩa (vd "Hình chứng từ" là 1 GIÁ TRỊ của cột "Loại POD", không
  phải tên cột).
- Nút vẫn là **"Xem ảnh (N)"** (không phải "Xem POD") — lý do: PRD ban đầu
  định 1 ảnh/dòng, nhưng ràng buộc kỹ thuật buộc gộp nhiều ảnh cùng trạng
  thái + cùng mã đơn vào 1 dòng, nên cần hiện SỐ LƯỢNG (N) ngay trên nút
  để user phân biệt — ưu tiên rõ ràng hơn là bám sát chữ "POD" của PRD.
→ **Bài học chung**: khi PRD đề xuất 1 tên gọi nhưng tên đó là thuật ngữ
nội bộ/viết tắt khó hiểu với end-user, có thể chủ động đổi sang tên mô tả
dễ hiểu hơn — đây không phải lỗi thời của Figma mà là quyết định UX có chủ
đích, cần ghi lại lý do (xem mục 4).

**Export (Xuất dữ liệu)**: xuất theo đúng filter đang áp dụng (không filter
= xuất tất cả) → 1 file .zip gồm: 1 file `.xlsx` (cột: Tên khách hàng, Mã
đơn hàng, Loại dịch vụ FTL/LTL, Mã đơn khách hàng, Tên địa điểm, Sự kiện,
Thời gian chụp POD, Loại POD, và cột "POD" chứa TÊN FILE tương ứng trong
folder) + 1 folder ảnh/video đặt tên theo cú pháp `[mã đơn hàng]_[số thứ
tự ảnh]` (vd `113022438396141568_1`).

**Filter (theo PRD)**: Khách hàng, Loại POD, Điều kiện/Sự kiện, Thời gian
chụp (đã thấy đủ trong Figma) + **"Mã đơn hàng"** (nhập tay, exact match).
**✅ ĐÃ CONFIRM 2026-09-05 (Williams)**: filter "Mã đơn hàng" **bản hiện
tại (Figma) CHƯA CÓ** — không phải mình bỏ sót node, đây là 1 GAP thật sự
giữa PRD (đề xuất thêm) và bản đã triển khai (chưa làm). → Cần thêm filter
này vào khi build spec.json cho đúng PRD, đánh dấu là phần MỚI cần code
thêm (không có sẵn trong Figma để tham chiếu style — dùng lại style dropdown
filter text-input đã chuẩn hoá, đặt cùng hàng với 4 filter hiện có).

**Sắp xếp**: nhiều ảnh/video cùng 1 dòng → mới nhất trước (latest to
oldest).

**Ra ngoài scope của tài liệu này — ĐÃ CONFIRM 2026-09-05 (Williams: "Bỏ
qua")**: phần "2/ Trang Chi tiết đơn hàng (CTĐH)" trong PRD (tab "POD" ở
màn CTĐH hiển thị thêm loại hình/video theo địa điểm) — PRD gộp chung 1
ticket nhưng Figma Williams gửi CHỈ có node "Quản lý POD". Đã xác nhận:
KHÔNG cần tách thành 1 màn/tài liệu riêng cho phần CTĐH — bỏ qua hẳn phần
này khỏi phạm vi Phase 0.

## 4. Áp dụng được / bổ sung cho `role-to-component-mapping.md`

Khớp tốt: pattern "trang chính qua sub-menu" (không Trở về), Fill cam cho
hành động chính (Xuất dữ liệu), Outline cam cho hành động phụ trên dòng
(Xem ảnh), Pagination chuẩn.

**Mới, cần propagate (đây chính là phần Williams muốn ghi lại kỹ nhất)**:

1. **Biến thể "gộp thông tin liên quan 1 cột" bằng TEXT MÀU** (không phải
   badge/chip): dòng phụ dưới text chính tô màu theo ý nghĩa (xanh lá =
   thành công, đỏ = thất bại) nhưng KHÔNG có nền/viền bao quanh như badge.
   Dùng khi thông tin phụ là 1 TRẠNG THÁI/KẾT QUẢ đơn giản (2-3 giá trị,
   nhị phân dạng thành công/thất bại) và không cần nhấn mạnh bằng khối màu
   — nhẹ nhàng hơn badge. So sánh với style đã ghi ở `06`: dùng BADGE khi
   giá trị mang tính PHÂN LOẠI/NHÃN (Điểm lấy/Điểm giao) hơn là kết quả
   đúng-sai.
2. **Bổ sung rule "Mã — Tên"**: khi tên đầy đủ quá dài để nối 1 dòng bằng
   gạch ngang, tách thành 2 DÒNG riêng (dòng 1: mã + tên viết tắt, dòng 2:
   tên đầy đủ) thay vì ép nối 1 dòng gây tràn chữ.
3. **Component mới: "Lightbox xem nhiều ảnh/video"** — toàn màn hình nền
   đen, góc trên-trái: badge trạng thái + metadata (loại, thời gian) +
   bộ đếm "N/M"; góc trên-phải: [Tải về] (Fill cam) + [Đóng]; giữa: media
   phóng to; 2 rìa: mũi tên prev/next; cuối: dải thumbnail cuộn được. Dùng
   khi 1 dòng dữ liệu có NHIỀU file đính kèm cần xem tuần tự — khác hẳn
   modal "Xem hình ảnh" đơn giản (1 ảnh tĩnh) đã ghi ở màn `05`/`06`.
4. **Component mới: "Modal tiến trình tải file nền" (async export
   progress)**: title + mô tả cảnh báo không tắt trang + progress bar %
   + 1 nút [Huỷ] duy nhất — dùng cho tác vụ xuất/tải file NẶNG, chạy nền,
   có thể mất thời gian (khác hẳn nút Xuất dữ liệu tải ngay lập tức không
   cần progress đã thấy ở các màn trước — phân biệt: dùng progress modal
   khi export bao gồm NHIỀU FILE MEDIA/dung lượng lớn dự kiến chậm).
5. **Pattern mới: "Toast huỷ tác vụ nền"** — banner nổi căn giữa-trên màn
   hình (không phải góc), nền đỏ nhạt + viền đỏ + icon lỗi, tự ẩn sau vài
   giây — khác với banner cảnh báo NẰM TRONG TRANG đã ghi ở `06` (banner
   đó nền xanh dương, cố định trong luồng trang, không tự ẩn).
6. **Pattern mới: "Multi-select filter dạng tóm tắt N + tooltip"** — khi
   filter cho chọn nhiều giá trị, hiện "N [đơn vị]" thay vì liệt kê hết,
   hover/mở dropdown hiện tooltip đen liệt kê đầy đủ giá trị đã chọn. Đi
   kèm link **"Xoá lọc (N)"** xoá toàn bộ filter đang áp dụng 1 lần bấm
   (N = tổng số FILTER field đang active, không phải tổng số giá trị).
7. **✅ ĐÃ CONFIRM — Rule "Toolbar filter" (biến thể CHÍNH THỨC, có tên
   riêng)**: khi filter là THÀNH PHẦN TƯƠNG TÁC CHÍNH của trang (trang tồn
   tại chủ yếu để lọc rồi xuất/tải dữ liệu theo tiêu chí — không phải để
   thao tác CRUD từng dòng), hiện TRỰC TIẾP từng dropdown/date-range filter
   ngay trên bảng — KHÔNG gộp vào 1 nút "Bộ lọc" ẩn — vì gộp lại sẽ khiến
   user mất thêm 1 bước để mở VÀ không nhớ được có sẵn tiêu chí lọc nào.
   Dùng chuẩn `[Bộ lọc][Search]...` (đã ghi) khi trang có nhiệm vụ CHÍNH là
   quản lý/thao tác CRUD từng dòng (lọc chỉ là phụ trợ để tìm nhanh).
8. **Rule phân quyền theo MODULE** (khác mô hình phân quyền theo entity
   con — kho/khách hàng — đã ghi ở các màn chi phí): 1 số trang chỉ cần
   role có quyền truy cập MODULE (vd "Dynamic SOP") là thấy toàn bộ dữ
   liệu trong module đó, không lọc thêm theo kho/khách hàng cụ thể. →
   **Nguyên tắc chung cần thêm vào org-context.md**: khi phân tích PRD 1
   tính năng mới, LUÔN hỏi PO rõ mô hình phân quyền là gì — "theo module"
   hay "theo entity con cụ thể (kho/khách hàng/ID nhân viên)" — không mặc
   định 1 trong 2, vì hệ thống này dùng CẢ HAI tuỳ tính năng.
9. **Bài học UX Writing**: khi PRD đề xuất đổi tên field/nút theo 1 thuật
   ngữ nội bộ/viết tắt (vd "POD"), nhưng thuật ngữ đó end-user không quen
   thuộc, có thể chủ động đổi sang tên mô tả dễ hiểu hơn thay vì bám sát
   chữ PRD — ghi rõ lý do trong tài liệu khi làm vậy (xem mục "Đổi tên" ở
   mục 3, HISTORY ở mục 1).

## 5. Open Questions — TẤT CẢ 7/7 đã trả lời/confirm 2026-09-05

- ~~PRD gắn nhãn "NOT IN SPRINT 70"~~ → Williams confirm: đã triển khai
  thực tế, Figma là bản mới nhất, nhãn PRD lỗi thời.
- ~~Đổi tên "Hình chứng từ"→"POD", "Xem ảnh"→"Xem POD"~~ → Williams
  confirm: KHÔNG đổi theo đúng chữ PRD — giữ tên mô tả dễ hiểu (không dùng
  "POD" trần trụi), giữ "Xem ảnh (N)" vì lý do kỹ thuật gộp nhiều ảnh/dòng.
- ~~Filter "Mã đơn hàng"~~ → Williams confirm: bản hiện tại CHƯA CÓ filter
  này — là 1 gap thật (PRD đề xuất, chưa triển khai), cần thêm khi build
  spec, không phải do research thiếu sót.
- ~~Biến thể toolbar filter~~ → Williams confirm: CHÍNH THỨC, dùng khi
  filter là tương tác chính của trang.
- ~~Phân quyền xem~~ → Williams confirm: theo MODULE (khác mô hình theo
  kho/khách hàng ở màn chi phí).
- ~~Toast "Đã huỷ tải về" tự ẩn~~ → Williams confirm: đúng, tự ẩn sau vài
  giây.
- ~~Trang CTĐH (phần 2 PRD)~~ → Williams confirm: bỏ qua, không tách file
  riêng.
