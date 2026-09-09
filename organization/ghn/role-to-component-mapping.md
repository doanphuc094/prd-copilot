# Bảng tra: vai trò → component/style thật (GHN FTL B2B)

**Đã điền — 2026-09-05, chuyển từ pipeline thử nghiệm trước đó của Williams
(`ghn-figma-pipeline/DESIGN-STYLE-GUIDE.md` + `ghn-spacing-tokens.json`).**
Đây là bảng tra CỐ ĐỊNH — mọi spec.json chỉ ghi cột "Vai trò" bên trái, bộ
resolver (code thường, không phải AI đoán) tự điền cột "Component/Style
thật" bên phải trước khi validator/renderer chạy. Mỗi dòng có node-id gốc
làm bằng chứng — giữ lại khi mở rộng bảng, đừng xoá.

Chi tiết đầy đủ + số liệu spacing/màu: xem `reference/DESIGN-STYLE-GUIDE.md`
và `reference/ghn-spacing-tokens.json`. Bảng dưới đây là bản rút gọn để
resolver tra nhanh.

## Nút bấm — theo vai trò

| Vai trò | Component/Style thật | Ghi chú |
|---|---|---|
| hành động chính (primary, đơn nhất trên 1 toolbar) | `⚫ Button :: Button / Button organism`, Style Fill, màu cam (accent) | CHỈ 1 nút Fill cam trên 1 toolbar. Luôn nằm NGOÀI CÙNG bên phải trong nhóm nút. |
| hành động phụ ngang cấp (khi có 2 hành động quan trọng như nhau) | Đổi màu `bg/secondary/default` (#006fad, xanh dương) thay vì Outline | Hành động user bấm THƯỜNG XUYÊN HƠN giữ Fill cam; hành động còn lại đổi xanh dương để tạo điểm nhấn riêng. Xác nhận node `19446-3079` ("+ Tạo địa điểm" xanh dương cạnh "+ Tạo nhiều điểm" cam). |
| phụ (secondary, thường) | `⚫ Button :: Button / Button organism`, Style Outline | |
| hành động HÀNG LOẠT (bulk) khi đã có sẵn nút Fill cam cho hành động ĐƠN LẺ tương ứng | Đổi màu Fill **xanh dương** (bg/secondary/default) thay vì Fill cam | Khác với "hành động phụ ngang cấp" ở trên (2 hành động KHÁC NHAU, quan trọng như nhau) — đây là CÙNG 1 bản chất hành động nhưng khác PHẠM VI TÁC ĐỘNG (1 dòng vs nhiều dòng). Dùng Fill xanh dương cho nút bulk để (a) tránh 2 Fill cam cạnh tranh trên cùng toolbar, (b) giúp phân biệt ngay phạm vi tác động chỉ qua màu. Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/06-quan-ly-chi-phi-phat-sinh.md` (nút "Duyệt hàng loạt" xanh dương cạnh nút "Phê duyệt" đơn lẻ Fill cam trong cột Thao tác). |
| 1 nút đại diện cho ≥2 hành động con LOẠI TRỪ LẪN NHAU trên cùng 1 dòng dữ liệu (vd Duyệt/Từ chối) | Nút chính + chevron mở dropdown/menu liệt kê các hành động con | Dùng khi cột "Thao tác" cần tiết kiệm không gian thay vì hiện nhiều nút riêng cho từng hành động loại trừ nhau. Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/06-quan-ly-chi-phi-phat-sinh.md` (nút "Phê duyệt" + chevron → menu "Duyệt"/"Từ chối"). |
| nút Bộ lọc (filter, luôn xuất hiện đầu toolbar bên trái) | `⚫ Button :: Button / Button organism`, Style "Outline Round", Size md, Type Grey, icon `filter` (font awesome, Type "regular") | iconLeft đặt ngay cấp 1 trong Button, KHÔNG lồng trong "Button / Button Content (Base)". |
| nút Xuất dữ liệu | Outline, LUÔN kèm icon `arrow-down-to-line` | Vị trí cố định: giữa "Tuỳ chỉnh cột" và hành động chính. |
| nút Tuỳ chỉnh cột | Outline, không icon bắt buộc | Đứng đầu tiên trong nhóm nút bên phải. |
| nút chỉnh sửa (edit) đặt trên Header trang | Outline, màu cam | Bấm vào → edit TOÀN BỘ nội dung trang bên dưới. |
| nút chỉnh sửa (edit) đặt trên 1 block cụ thể | Outline, màu cam | Bấm vào → chỉ ảnh hưởng riêng block đó (mở Modal nếu case phức tạp, hoặc chuyển edit tại chỗ nếu case đơn giản). |
| nút trở về (trang con/chi tiết) | `⚫ Button :: Button / Button organism`, kích thước 93×32, icon mũi tên trái + "Trở về" | CHỈ trang con/chi tiết mới có; trang chính (top-level trong sidebar) KHÔNG có. **SỬA 2026-09-05 (Williams xác nhận qua 2 màn thật: `01-khach-hang-chi-tiet.md` + `03-tao-moi-sieu-thi.md`)**: KHÔNG phải Text link như ghi trước đó — đúng là Button organism. | **Lưu ý thêm 2026-09-05 (Williams xác nhận qua `05-upload-chi-phi-thue-xe-ncc.md`)**: 1 menu sidebar có nhiều sub-menu (vd "Quản lí chi phí FTL" > "Chi phí thuê xe NCC", "Chi phí lương"...) — bấm vào từng sub-menu VẪN là điều hướng tới trang chính (top-level), KHÔNG phải drill-down vào trang con. Nhiều cấp sub-menu KHÔNG đồng nghĩa với "trang con/chi tiết" — chỉ tính là trang con khi thật sự drill-down từ 1 trang danh sách/chi tiết khác (vd bấm vào 1 dòng trong bảng để xem chi tiết). |
| footer form (cuối trang, cả tạo-mới lẫn chỉnh-sửa) | [Huỷ] (Outline **Grey**, trung tính) + [Lưu thông tin] (Fill cam, primary) | **CHỈ 1 pattern DUY NHẤT cho mọi form** — KHÔNG đặt label riêng theo loại khuôn (vd KHÔNG dùng "Tạo siêu thị"/"Tạo + tên entity" dù đang ở form tạo-mới). Lý do: page heading phía trên đã nói rõ context, nút Lưu không cần lặp lại tên entity — tránh sinh nhiều tên gọi khác nhau cho cùng 1 chức năng. Khớp với PRD thực tế thường gọi hành động này là "Lưu". Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực F). **Lưu ý**: cách viết "Huỷ" (so với biến thể "Hủy bỏ" cũng từng thấy) CHƯA chốt chính thức — đang tạm dùng "Huỷ", cần Williams xác nhận cách viết chuẩn cuối cùng. |
| nút Huỷ/Cancel/Đóng (không phá huỷ dữ liệu) | Outline **Grey** (viền/chữ xám, trung tính) | **KHÔNG dùng Outline destructive (đỏ)** cho Huỷ/Cancel — destructive CHỈ dành cho hành động thật sự phá huỷ dữ liệu (vd nút Xoá). Dùng Outline destructive cho nút Huỷ tạo contrast quá cao, cạnh tranh không cần thiết với nút primary. Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực F). |
| nút phụ trong Modal kết quả xử lý hàng loạt (bulk result modal, vd sau upload Excel) khi CÒN dữ liệu lỗi cần xử lý | [Xác nhận] (Outline) — KHÔNG dùng [Đóng] | Dù modal này còn việc user cần làm tiếp (tải file lỗi, sửa, upload lại), nút phụ vẫn nên là "Xác nhận" chứ không phải "Đóng": "Đóng" gợi ý chỉ tắt popup, không xác nhận đã đọc/hiểu kết quả (đặc biệt quan trọng khi có dữ liệu hợp lệ đã được lưu 1 phần — user cần xác nhận đã biết trước khi rời modal). Khi TOÀN BỘ dữ liệu hợp lệ (không còn gì cần sửa) → chỉ 1 nút [Xác nhận] (Fill cam). Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/04-modal-ket-qua-upload-excel.md`. |

**Thứ tự nhóm nút toolbar cố định** (không đảo vị trí):
`[Bộ lọc] [Ô Search] ................ [Tuỳ chỉnh cột] [Xuất dữ liệu] [Hành động chính]`
— nhóm trái luôn 2 phần tử trên, nhóm phải tối đa 3, hành động chính luôn ngoài cùng phải.

## Text — theo vai trò xuất hiện trong màn hình

| Vai trò | Component/Style thật | Ghi chú |
|---|---|---|
| tiêu đề màn hình (Page Header — trang chính/trang chi tiết) | `Heading/Bold/H5` — fontSize 20, Bold | To hơn 1 bậc so với Block heading. Kèm status badge ngay sau nếu có, kèm button edit Outline cam bên phải nếu trang cho sửa toàn bộ. Height thanh header 72px. |
| tiêu đề khu vực / block heading (card/table title, vd "Thông tin giá xăng dầu") | `Title/Title 1` — fontSize 16, Bold (700) | Height cố định 72px = 40px nội dung + 16px padding trên/dưới. KHÔNG dùng nhầm H5 20px cho cấp này (đã từng nhầm, đã sửa 2026-08-02). |
| label field / nội dung thường trong bảng | `Content/Body 1` — 16px Regular | |
| body phụ (vd dòng "id - số điện thoại" dưới tên user) | `Content/Body 3` — 12px Regular | |
| subtitle cấp 2 | `Sub Title/Subtitle 2` — 14px SemiBold (600) | |
| màu chữ mặc định | token `text/text-default` (#09090b) | |
| màu chữ nhấn/accent | token `text/text-primary` (#ff5200, cam) | |
| placeholder | token `text/text-placeholder` (#71717a) | |

## Table (bảng dữ liệu) — quy chuẩn bắt buộc

| Phần | Style thật |
|---|---|
| khung ngoài | corner radius 8, stroke 1px `border/app/default` (#d4d4d8), strokeAlign INSIDE, clipsContent true |
| header row | **[ĐÃ SỬA 2 LẦN, xem "Style bảng dữ liệu" bên dưới để lấy bản mới nhất]** — chốt cuối cùng (2026-09-06): nền xám nhạt `#fafafa`, font semibold 14px (không phải 16px Bold), text `text-muted`, CÓ viền dọc (stroke) phân chia giữa các cột, padding [12,16,12,16]. |
| content row | padding hiệu dụng ngang 16 / dọc 16, font `Content/Body 1`, mỗi row (trừ row đầu) có strokeTop 1px `border/app/default` |
| cột Thao tác | mặc định LUÔN ở cuối bảng nếu có hành động sửa/xoá theo dữ liệu — KHÔNG tự thêm nếu PRD/dữ liệu tham chiếu không có hành động nào |
| pin cột (KHÔNG chỉ dựa số cột) | Pin khi thoả CẢ 2 điều kiện: (1) bảng quá dài không fit 1 màn hình, VÀ (2) chỉ pin thông tin định danh chung mà user cần nhớ/đối chiếu (vd tên, mã) — không phải hễ >10 cột là tự pin 3 cột đầu. Trước khi tách cột luôn cân nhắc GỘP thông tin liên quan vào 1 cột trước, ưu tiên bảng fit gọn hơn pin nhiều. Xác nhận theo Williams 2026-09, xem chi tiết mục 4 `reference/DESIGN-STYLE-GUIDE.md` + ví dụ thật `screen-descriptions/02-danh-sach-nha-cung-cap.md`. |
| nguyên tắc UX thiết kế cột | Mục tiêu: tối giản số cột, giúp user DỄ TÌM chứ không phải phải NHỚ thông tin — nhưng KHÔNG gom quá nhiều thông tin vào 1 cột vì gây cognitive load ngược lại. Ví dụ tự phê bình (Williams): "Mã NCC" + "Tên nhà xe" tách 2 cột riêng trong khi đáng lẽ gộp 1 cột dạng "[Mã] — [Tên]" (giống pattern "Người phụ trách" đã dùng). |
| overflow "+N" trong cột multi-chip | Quyết định overflow theo 2 yếu tố (KHÔNG tuỳ tiện): (1) mức độ quan trọng/tần suất xem — nếu user cần xem thông tin đó THƯỜNG XUYÊN thì KHÔNG overflow (tăng cognitive load, bắt nhớ/bấm thêm); (2) độ dài nội dung — nếu nhiều ký tự hoặc khó kiểm soát độ dài (vd địa chỉ) thì BẮT BUỘC overflow để tránh đẩy chiều cao dòng bảng quá mức. Mục tiêu: bảng hiển thị ĐỦ thông tin để tra cứu/đối chiếu, không quá ít không quá nhiều. Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/02-danh-sach-nha-cung-cap.md` (mục 5, câu 5). |
| "gộp thông tin liên quan 1 cột" — chọn TEXT MÀU hay BADGE cho dòng phụ | TEXT MÀU trần (không nền/viền) khi thông tin phụ là 1 TRẠNG THÁI/KẾT QUẢ đơn giản, nhị phân (vd thành công=xanh lá/thất bại=đỏ) và không cần nhấn quá mạnh. BADGE (có nền/viền) khi thông tin phụ mang tính PHÂN LOẠI/NHÃN (vd "Điểm lấy"/"Điểm giao") cần nổi bật hơn. | Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/07-quan-ly-pod.md` (cột "Loại POD & Điều kiện" dùng text màu) so với `screen-descriptions/06-quan-ly-chi-phi-phat-sinh.md` (cột "Loại điểm" dùng badge). |
| pattern "Mã — Tên" khi tên quá dài | Tách thành 2 DÒNG riêng (dòng 1: mã + tên viết tắt, dòng 2: tên đầy đủ) thay vì ép nối 1 dòng bằng gạch ngang gây tràn chữ. | Biến thể bổ sung của pattern "[Mã] — [Tên]" đã ghi ở trên — dùng khi tên đầy đủ dài. Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/07-quan-ly-pod.md` (cột "Tên địa điểm"). |

## Pagination — quy chuẩn bắt buộc

- Layout: 1 hàng, gap 24, canh giữa (justify CENTER).
- Thành phần: `[icon chevron-left + "Đầu trang"] → số trang → ["Cuối trang" + icon chevron-right]`.
- "Đầu trang"/"Cuối trang" là TEXT + icon thường (font awesome), KHÔNG dùng
  Button organism.
- **TUYỆT ĐỐI KHÔNG hiện dropdown chọn số hàng/trang** — ẩn hoàn toàn cho
  mọi trường hợp (quy tắc bắt buộc, không phải tuỳ chọn theo màn hình).
- Component nguyên khối nếu có sẵn: `Pagination / Pagination oragism` (có
  trong `ghn-ds-keymap-full.json` — chưa chắc còn trong bản rút gọn, kiểm
  tra `reference/ghn-ds-keymap-flat.json` trước khi dùng; nếu thiếu, fallback
  compose tay bằng `🔵 Pagination :: Pagination / Pagination number (Base)`
  lặp lại + Button "‹ Trước"/"Sau ›").

## Header trang (Global action / breadcrumb khu vực trên cùng)

- Mặc định: nền `bg/app/elevated`, border-bottom 1px `border/app/disabled`,
  bên trái là BREADCRUMB (không phải ô tìm kiếm) padding ngang 24, bên phải
  Avatar + họ tên (`Title/Title 1`) + dòng "id - số điện thoại" (`Content/Body 3`)
  padding ngang 32 gap 12.
- Áp dụng ngay cả khi UI reference của PRD có dạng khác (vd có ô search) —
  vẫn theo dạng breadcrumb chuẩn, không copy theo reference nếu khác.
- Icon dùng `⚫ Icons (Use fontawesome 6 Pro) :: font awesome / Base`, luôn
  set `Type: "regular"` (KHÔNG dùng "light" — mặc định light gây lỗi hiện
  chữ thường thay vì icon). Size thường dùng: sidebar menu 20, trong
  nút/pagination 16, breadcrumb 14.

## Input theo loại đã ghi trong mẫu mô tả

| Loại đã ghi | Component thật | Ghi chú |
|---|---|---|
| ô text | `⚫ Input :: Input / Input text type (Base)` | |
| ô search | Input, kèm placeholder dạng "Tìm kiếm theo ..." | |
| dropdown/select | `⚫ Select :: Selection / Selection items (Base)` | |
| ngày | `⚫ Datepicker :: Datepicker` | |
| textarea | `⚫ Textarea :: Textarea / Textarea organism` | |
| combobox | `⚫ Combobox :: Combobox / Combobox organism` | |
| số điện thoại (nội địa VN) | Input số THƯỜNG — KHÔNG kèm dropdown chọn mã quốc gia | Đối tác/điểm giao hiện tại đều trong nước. Giới hạn nhập 9–11 chữ số, tự chuẩn hoá về định dạng số điện thoại Việt Nam, không cho phép ký tự đặc biệt (theo PRD FT-3911, field kiểu "Text field"). CHỈ thêm dropdown mã quốc gia khi có PRD khác nói rõ cần hỗ trợ đối tác quốc tế — không mặc định thêm. Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực C). |
| địa chỉ (address) | KHÔNG dùng Input freetext thường — dùng Input hiển thị giá trị đã chọn (readonly, có chevron `>`) mở 1 Modal chọn địa chỉ có cấu trúc (Tỉnh/Thành phố + Quận/Huyện + Phường/Xã dropdown + Địa chỉ chi tiết input) | Áp dụng cho MỌI field địa chỉ về sau, không riêng 1 màn. Mục tiêu: ngăn user nhập tự do → giảm sai sót nhập sai/địa chỉ không đúng thực tế. Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực C + E). |

## Giá trị mặc định (default) cho field — nguyên tắc chọn

| Trường hợp | Có nên default? | Vì sao |
|---|---|---|
| Field BẮT BUỘC, ảnh hưởng trực tiếp business logic quan trọng (routing, giá, quyền...), KHÔNG có giá trị đa số áp đảo rõ ràng | KHÔNG default — để trống, bắt user chọn tay | Default sai mà user lười sửa lại → dữ liệu sai lặng lẽ lọt vào hệ thống, hậu quả nặng hơn việc bắt user tự chọn. Ví dụ thật: "Loại mặt bằng" (radio Mặt phố/Chung cư, bắt buộc, ảnh hưởng thuật toán xếp tuyến) — PRD không nói mặc định, giữ 2 lựa chọn đều trống lúc đầu. |
| Field TUỲ CHỌN (optional), có giá trị "an toàn/phổ biến" rõ ràng | NÊN default theo giá trị an toàn đó | Ví dụ thật: 4 checkbox ràng buộc vận hành (Cấm dừng/Cấm đỗ/Điểm giao khó/Không người nhận ca tối) — PRD ghi rõ mặc định "No" (an toàn = giả định không có ràng buộc đặc biệt trừ khi user chủ động tick). |

Xác nhận theo Williams 2026-09-05, xem ví dụ thật `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực D, mục 1) + nguồn PRD FT-3911.

## Layout form tạo-mới — lưới 4 cột (4 unit/hàng)

Áp dụng cho MỌI form tạo-mới (không riêng 1 màn) — xác nhận theo Williams
2026-09-05. Mỗi hàng field tối đa 4 "đơn vị cột" (unit); số component thực
tế trên 1 hàng KHÔNG cố định, biến thiên theo 2 yếu tố:

1. **Mức độ liên quan giữa các field** — field liên quan nhau (vd toạ độ
   Vĩ độ + Kinh độ, hoặc tên + mã cùng 1 entity) nên gom cùng 1 hàng.
2. **Độ dài dự kiến nội dung nhập** — field cần nhập dài (tên đầy đủ, địa
   chỉ, số điện thoại) chiếm 2 unit (nửa hàng); field ngắn (mã, ngày, số
   nhỏ như toạ độ) chiếm 1 unit (1/4 hàng).

Tổng unit mỗi hàng LUÔN = 4, nhưng số component/hàng có thể là 2, 3, hoặc
4 tuỳ cách chia unit ở trên — KHÔNG mặc định cứng 1 số cột nhất định cho
mọi hàng.

Ví dụ thật (`screen-descriptions/03-tao-moi-sieu-thi.md`, Khu vực C):
- Tên siêu thị (2 unit) + Mã siêu thị (1 unit) + Ngày khai trương (1 unit) = 4 unit / 3 component.
- Địa chỉ (2 unit) + Vĩ độ (1 unit) + Kinh độ (1 unit) = 4 unit / 3 component.
- Tên quản lý siêu thị (2 unit) + Số điện thoại quản lý (2 unit) = 4 unit / 2 component.

## Xoá dòng trong danh sách/bảng lặp (repeatable rows)

Áp dụng CHUNG cho mọi khối có thể thêm/xoá dòng (vd khối lặp-dòng-giờ,
hoặc bất kỳ danh sách con nào cho phép nhiều dòng) — xác nhận theo Williams
2026-09-05.

- Mặc định: xoá 1 dòng là xoá HẾT thông tin dòng đó.
- NGOẠI LỆ: nếu khối/bảng đó bắt buộc phải có tối thiểu 1 dòng, thì khi
  chỉ còn đúng 1 dòng, nút xoá của dòng cuối cùng **DISABLE (làm mờ) kèm
  tooltip giải thích lý do** (vd "Phải giữ lại ít nhất 1 khung giờ") —
  **KHÔNG ẩn hẳn nút xoá**. Lý do chọn disable thay vì ẩn: (1) ẩn hẳn làm
  layout dòng cuối lệch/thiếu nhất quán so với các dòng phía trên; (2)
  disable + tooltip giúp user hiểu đây là ràng buộc hệ thống chủ động
  chặn, không phải lỗi UI.

Ví dụ thật: `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực D, mục 4 —
khối "Chọn thời gian nhận hàng"/"Chọn thời gian cấm tải").

## Nút primary/submit — validate-on-submit, KHÔNG disable-until-valid

Áp dụng CHUNG cho MỌI nút primary/submit (form chính lẫn trong modal) —
xác nhận theo Williams 2026-09-05, thay thế cho pattern disable-until-valid
từng thấy ở 1 modal (đã xác nhận là điểm chưa nhất quán, nay đã thống nhất).

- Nút primary/submit LUÔN active (không disable chờ đủ field hợp lệ).
- Validate chạy KHI BẤM nút (validate-on-submit), KHÔNG real-time/on-blur.
- Lỗi hiện inline ngay dưới từng field sau khi bấm (xem mục "Table" /
  ghi chú inline validation error đã có ở các bảng vai trò khác).
- Lý do chọn hướng này: user biết chính xác cần sửa gì thay vì thắc mắc
  tại sao nút chưa bấm được khi lỗi nằm ở field chưa nhìn thấy ngay.

Ví dụ thật: `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực E, modal
"Nhập thông tin địa chỉ" — trước đó "Lưu thay đổi" disable-until-valid,
nay thống nhất theo nút "Tạo siêu thị" ở form chính).

## Input có đơn vị đo (mét, CBM, kg, VNĐ...) — giải pháp TẠM THỜI

Xác nhận theo Williams 2026-09-05. GHN DS hiện CHƯA có component input với
unit-suffix gắn liền bên trong ô nhập (dạng input có chữ "mét"/"kg" cố định
bên trong/cạnh ô). Giải pháp tạm thời áp dụng CHUNG cho MỌI field input số
có đơn vị đo:

- Ghi chú đơn vị đặt trong ngoặc đơn ngay sau label (vd "Khoảng cách kéo
  hàng (mét)", "Phí giao hàng (VNĐ)").
- Label chính in đậm như bình thường; phần "(đơn vị)" thường, KHÔNG in đậm.
- KHI GHN DS có component unit-suffix thật (input với đơn vị gắn trong ô) —
  đổi lại theo component đó, không dùng pattern tạm này nữa.

Ví dụ thật: `screen-descriptions/03-tao-moi-sieu-thi.md` (Khu vực D, mục 2-3).

## UX Writing — wording cho stat box/caption trong modal kết quả xử lý

Pattern áp dụng cho MỌI modal thông báo kết quả xử lý hàng loạt (bulk
result modal, vd sau upload Excel) khi có 2 stat box "hợp lệ/lỗi" cạnh
nhau: label dưới số phải nói rõ TRẠNG THÁI LƯU, không chỉ nói SỐ LƯỢNG/LOẠI
dữ liệu — vì user thường không đọc đoạn mô tả phía trên (dễ bị bỏ qua) nên
cần biết ngay tại chỗ chắc chắn nhìn thấy (con số to) dữ liệu đã được lưu
hay chưa.

- Stat box hợp lệ: **"đã lưu"** (KHÔNG dùng "dữ liệu hợp lệ" — không nói
  rõ trạng thái lưu).
- Stat box lỗi: **"lỗi, chưa lưu"** (KHÔNG dùng "dữ liệu lỗi" hoặc "không
  ghi nhận" — "không ghi nhận" mơ hồ, dễ hiểu nhầm là hệ thống không xử
  lý gì cả hoặc cần làm thêm việc khác; "chưa lưu" nói thẳng đúng 1 sự
  thật và gợi ý hành động tiếp theo có sẵn ở nút "Tải file xử lý").
- Nguyên tắc áp dụng: front-loading (đưa thông tin quan trọng nhất — trạng
  thái lưu — lên ngay tại vị trí user chắc chắn nhìn thấy) + Plain
  Language (tránh thuật ngữ mơ hồ).
- Đoạn mô tả phía trên 2 stat box KHÔNG bắt buộc phải đảo thứ tự — chỉ
  cần sửa đúng wording 2 stat box là đủ giải quyết vấn đề (Williams xác
  nhận 2026-09-05: đảo thứ tự đoạn mô tả là không cần thiết).

Xác nhận theo Williams 2026-09-05, xem ví dụ thật
`screen-descriptions/04-modal-ket-qua-upload-excel.md` (mục 3).

## Khối "Upload Excel" — 2 biến thể FULL vs COMPACT

Component upload file Excel (dropzone viền nét đứt + text link cam "Tải
[X] hoặc kéo thả vào đây" + text phụ hướng dẫn + 2 nút [File mẫu] (Outline
trung tính) + [Tải lên] (**Outline / Type: Primary** — biến thể CHÍNH THỨC
trong Design System GHN, viền/chữ màu cam, KHÔNG phải Fill)) có 2 biến
thể, chọn theo 1 tiêu chí DUY NHẤT:

- **FULL** (block lớn, text 2 dòng canh giữa phía trên, 2 nút canh giữa
  phía dưới, đứng thành 1 card/section riêng): dùng khi tính năng upload
  Excel là tính năng ĐỘC LẬP, đứng riêng thành 1 trang/1 mục sidebar của
  chính nó — ví dụ trang "Chi phí thuê xe NCC" (xem
  `screen-descriptions/05-upload-chi-phi-thue-xe-ncc.md`, node `18764:96962`).
- **COMPACT** (1 hàng ngang, text 2 dòng bên trái + 2 nút bên phải cùng
  hàng, nhỏ gọn, đặt lồng bên trong 1 khối/dòng khác): dùng khi upload
  Excel chỉ là tính năng BỔ TRỢ cho 1 tính năng khác — ví dụ tính năng
  "Bảng giá" có thêm khả năng upload Excel ngay trong dòng/card bảng giá
  đó, không xứng đáng chiếm hẳn 1 trang riêng (xem ví dụ node `23153:74508`,
  fileKey `s2NE6ikwLnsZSUp97RBfof`).
- Màu nền (background) của biến thể COMPACT linh động theo 2 tông:
  `#FFFFFF` hoặc `#F4F4F5` — chọn tông nào tương phản tốt hơn với màu nền
  ngay bên dưới nó (không cố định 1 màu).
- **NGOẠI LỆ có chủ đích với quy tắc "1 nút Fill cam duy nhất"**: nút
  "Tải lên" của khối upload Excel KHÔNG BAO GIỜ dùng Fill cam, kể cả ở
  biến thể FULL đứng 1 mình — vì biến thể COMPACT luôn nằm lồng bên trong
  1 tính năng khác đã có sẵn nút Fill cam riêng của tính năng đó (2 nút
  Fill cam sẽ cạnh tranh nhau). Để giữ đồng nhất style giữa FULL và
  COMPACT (không đổi qua đổi lại), Williams xác nhận 2026-09-05: CẢ 2 biến
  thể đều dùng Outline/Primary, kể cả khi FULL đứng độc lập không có nút
  Fill cam nào khác cạnh tranh.

Xác nhận theo Williams 2026-09-05, xem ví dụ thật
`screen-descriptions/05-upload-chi-phi-thue-xe-ncc.md`.

## Khối "Lịch sử tải lên" (upload history) trong tính năng upload Excel — OPTIONAL

Khối "Lịch sử tải lên" đi kèm 1 tính năng upload Excel KHÔNG phải lúc nào
cũng có — tuỳ PRD của PO quy định. Khi PO define 1 tính năng upload Excel
(kể cả biến thể FULL hay COMPACT ở trên), PHẢI hỏi PO 2 việc, không mặc
định:

1. Tính năng này có cần khối "Lịch sử tải lên" hay không.
2. Nếu có, bảng lịch sử cần những cột dữ liệu gì.

Bản thân khối lịch sử luôn là 1 Table chuẩn (theo quy tắc Table đã ghi ở
trên) — chỉ khác nhau ở BỘ CỘT theo từng feature. Với MỖI cột, phải define
rõ loại hiển thị (text thường / link / text-link / button...) — KHÔNG mặc
định là text. Ví dụ thật: `screen-descriptions/05-upload-chi-phi-thue-xe-ncc.md`
có cột "File upload" hiển thị dạng nút Button "Xem chi tiết", không phải
text/link.

Xác nhận theo Williams 2026-09-05.

## Thông báo kết quả xử lý HÀNG LOẠT khi có thể thất bại 1 phần (race-condition)

Khi 1 bulk action (duyệt/từ chối/xử lý hàng loạt...) có khả năng 1 phần
dòng đã bị người khác xử lý trước đó (race-condition) giữa lúc user chọn
và lúc xác nhận:
- Hệ thống vẫn xử lý các dòng còn hợp lệ, KHÔNG chặn toàn bộ thao tác chỉ
  vì 1 vài dòng bị lỗi.
- LUÔN báo rõ số lượng thành công/thất bại trong 1 câu, dạng:
  *"\<Hành động\> thành công \<x/n\>. \<n-x\> \<đối tượng\> không thể xử lý
  do đã được xử lý trước đó."*
- **Chọn hình thức thông báo theo mức độ lỗi có thể xảy ra**: dùng TOAST
  ngắn (1 câu) nếu lỗi hiếm và chỉ do race-condition (không cần xem chi
  tiết từng dòng lỗi) — như duyệt/từ chối chi phí phát sinh; dùng MODAL
  kết quả đầy đủ (liệt kê từng dòng lỗi) nếu lỗi có thể xảy ra ở NHIỀU
  dòng và user cần biết CHI TIẾT từng dòng để sửa — như modal kết quả
  import Excel đã ghi ở `screen-descriptions/04-modal-ket-qua-upload-excel.md`.

Xác nhận theo Williams 2026-09-05 (nguồn: PRD FT-3439, AC3/AC6), xem ví dụ
thật `screen-descriptions/06-quan-ly-chi-phi-phat-sinh.md` (mục 3, mục 4).

## Toolbar filter — biến thể khi filter là tương tác chính của trang

Chuẩn mặc định `[Bộ lọc][Search]...[Tuỳ chỉnh cột][Xuất dữ liệu][Hành động
chính]` (đã ghi ở trên) gộp mọi tiêu chí lọc vào 1 nút "Bộ lọc" — dùng khi
trang có nhiệm vụ CHÍNH là quản lý/thao tác CRUD từng dòng (lọc chỉ là phụ
trợ để tìm nhanh).

**Biến thể "toolbar filter"** (CHÍNH THỨC, không phải điểm thiếu nhất
quán): khi filter là THÀNH PHẦN TƯƠNG TÁC CHÍNH của trang — trang tồn tại
chủ yếu để lọc rồi xuất/tải dữ liệu theo tiêu chí cụ thể (khách hàng, mốc
thời gian...) — hiện TRỰC TIẾP từng dropdown/date-range filter ngay trên
bảng, KHÔNG gộp vào 1 nút "Bộ lọc" ẩn. Lý do: gộp lại sẽ khiến user mất
thêm 1 bước để mở VÀ không nhớ được có sẵn tiêu chí lọc nào — trong khi
lọc chính là việc user sẽ làm THƯỜNG XUYÊN NHẤT ở trang này.

Đi kèm 2 pattern phụ trợ khi dùng toolbar filter:
- **Multi-select filter dạng tóm tắt "N [đơn vị]" + tooltip**: khi 1
  filter cho chọn nhiều giá trị, hiện "N khách hàng"/"N loại điều kiện"
  thay vì liệt kê hết — hover/mở dropdown hiện tooltip liệt kê đầy đủ giá
  trị đã chọn.
- **Link "Xoá lọc (N)"**: xoá toàn bộ filter đang áp dụng trong 1 lần bấm,
  N = tổng số FILTER field đang active (không phải tổng số giá trị đã
  chọn).

Xác nhận theo Williams 2026-09-05, xem ví dụ thật
`screen-descriptions/07-quan-ly-pod.md` (mục 2.1, 2.3).

## Quy tắc màu badge/status — CHUNG cho mọi tính năng (2026-09-05, Williams)

Xác nhận trực tiếp bởi Williams — áp dụng cho MỌI badge trạng thái trong
toàn hệ thống, không riêng 1 màn hình nào:

- **Xám (grey)**: trạng thái CHƯA được xử lý / lưu nháp (vd "Chờ duyệt")
  — hoặc trạng thái KHÔNG quan trọng, không cần nổi bật (xem ví dụ ngoại
  lệ bên dưới).
- **Xanh lá (green)**: trạng thái ĐÃ xử lý tích cực / đang hoạt động (vd
  "Đã duyệt", "Đang active").
- **Đỏ (red)**: trạng thái hết hiệu lực / ngừng hoạt động / bị từ chối —
  nhưng **CHỈ dùng đỏ khi trạng thái đó THỰC SỰ quan trọng, cần user chú
  ý ngay** (vd tính năng quản lý siêu thị: số lượng siêu thị active vs
  inactive là con số người dùng cần quan tâm theo dõi → dùng đỏ cho
  inactive).

**Ngoại lệ quan trọng cần nhớ**: không phải cứ "trạng thái phủ định/tắt"
là tự động đỏ. Ví dụ: field "giờ cấm tải" có 2 giá trị (có giờ cấm tải /
không có giờ cấm tải) — "không có giờ cấm tải" dùng **xám**, KHÔNG dùng
đỏ, vì đây không phải thông tin cần nổi bật/cảnh báo, chỉ là 1 trạng thái
trung tính. Tức là: đỏ được QUYẾT ĐỊNH theo **mức độ quan trọng cần chú ý
của trạng thái đó với business**, không suy máy móc theo kiểu "có/không"
hay "tích cực/tiêu cực" ngôn ngữ.

→ Khi gặp 1 badge trạng thái mới, PHẢI hỏi: trạng thái này có phải loại
user cần được cảnh báo/chú ý ngay không? Có → đỏ. Không quan trọng bằng,
chỉ là thông tin trung tính → xám. Không tự suy theo cảm tính "nghe tiêu
cực thì tô đỏ".

## Component dùng lại: Lightbox xem ảnh/chứng từ (2026-09-05, Williams)

Pattern lightbox xem ảnh (mở khi bấm 1 nút "Xem ảnh"/thumbnail bất kỳ ở
bất kỳ màn nào có đính kèm ảnh chứng từ) — cấu trúc CHUNG, dùng lại được
nhiều nơi (xác nhận qua ví dụ thật `screen-descriptions/06-quan-ly-chi-phi-phat-sinh.md`
mục 2.6b, ảnh mẫu từ 1 tính năng khác nhưng cùng 1 component):

| Phần tử | Bắt buộc? |
|---|---|
| Tên file (bên trái) | Bắt buộc |
| Badge trạng thái cạnh tên file | Optional |
| Số lượng ảnh cạnh tên (dạng "x/N") | Optional — chỉ hiện khi cho xem NHIỀU ảnh |
| Nút tải ảnh | Optional — chỉ hiện nếu feature định nghĩa cho phép tải xuống |
| Nút đóng (X) | Bắt buộc |
| Ảnh | Bắt buộc |
| Pagination ảnh (mũi tên trái/phải + dải thumbnail) | Optional — chỉ hiện khi có nhiều ảnh |

Khi gặp 1 nút "Xem ảnh"/mở ảnh chứng từ ở feature mới, dùng lại đúng cấu
trúc này thay vì tự bịa layout khác — chỉ cần xác nhận riêng: (a) 1 ảnh
hay nhiều ảnh mỗi lần mở, (b) có cho tải xuống không, (c) có badge trạng
thái đi kèm không.

## Style bảng dữ liệu (table_card) — CHUNG cho mọi tính năng (2026-09-05, Williams cung cấp ảnh thiết kế thật)

Prototype HTML #06 lần đầu bị Williams chê "layout tệ" nhưng không nói rõ chỗ nào — sau khi Williams gửi
ảnh chụp bảng thật của chính anh làm, mới lộ ra nguyên nhân + đúng style thật:

- **Lỗi kỹ thuật "vỡ layout"**: bản build trước cố định 2 cột đầu (checkbox + Khách hàng) bằng
  `position:sticky` với giá trị `left` gõ tay SAI (220px) không khớp width thật của cột checkbox (~70px)
  → cột Khách hàng bị đẩy lệch, đè lên cột Trạng thái, làm bảng nhìn vỡ. Bài học: KHÔNG tự ý pin/sticky
  nhiều cột đầu bảng nếu design gốc không yêu cầu — chỉ thêm khi có xác nhận, và nếu thêm phải tính đúng
  offset theo width thật, không đoán số.
- **Header bảng** — **[SỬA LẦN 2, 2026-09-06, Williams gửi ảnh thiết kế thật lần nữa]**: nền XÁM NHẠT
  `#fafafa` (bản sửa lần 1 ở đây từng ghi nền TRẮNG — SAI, đã sửa lại), chữ weight 600 (semibold, không
  phải bold 700), cỡ chữ 14px bằng nội dung (không phải 16px), màu chữ xám đậm (text-muted, không phải đen
  text-default), có border-bottom mảnh ngăn với phần dữ liệu, VÀ có viền dọc (border-right/stroke) phân
  chia rõ ràng giữa các cột — cả ở header lẫn các dòng dữ liệu bên dưới, không chỉ đường ngang.
- **Badge "Trạng thái"** — **[ĐẢO NGƯỢC 2026-09-06, Williams xác nhận lại qua ảnh #06 thật]**: theo đúng
  `badge_color_semantics` (grey/green/red), CẢ 3 màu đều hiện dạng PILL có nền (bo tròn, có background) —
  bản ghi trước đây ở dòng này (grey = text thường, không nền) là SAI, đã sửa lại. Grey chỉ khác GREEN/RED
  ở TÔNG MÀU nền/chữ (xám nhạt thay vì xanh lá/đỏ), không khác về CẤU TRÚC hiển thị — không có badge nào
  trong hệ thống hiện dạng text trần không nền.
- **Nút hành động dòng ("Phê duyệt ⌄")**: khi còn actionable (Chờ duyệt) là nút **Fill cam** (role primary),
  KHÔNG phải Outline. Khi disable thì mới là Outline Grey.
- **Nút "Xem ảnh"**: pill bo tròn hoàn toàn (border-radius 999px), viền cam + chữ cam + icon mắt (eye icon)
  đứng trước chữ, nền trắng — không phải nút chữ nhật viền xám như suy đoán ban đầu.
- **Nút "Bộ lọc"**: icon phải là icon filter/funnel thật (3 gạch ngang giảm dần độ dài), KHÔNG dùng icon
  hamburger (☰, 3 gạch bằng nhau) — 2 icon dễ nhầm khi chỉ nhìn nhỏ nhưng khác ý nghĩa.

Quy tắc rút ra: khi build prototype/HTML cho tính năng khác, ưu tiên xin Williams 1 ảnh chụp bảng dữ liệu
thật (nếu có) TRƯỚC khi tự suy ra style từ ghn-spacing-tokens.json — vì token file có thể outdated hoặc
không đủ chi tiết (đã sai ở khoản "header nền xám" lần này).

## Chip "Mã chuyến" ở cột Khách hàng — màu XÁM trung tính, không phải xanh dương (2026-09-06, Williams)

Bản build #06 trước lỡ dùng CHUNG 1 token màu với badge "Điểm giao" (xanh dương) cho
chip phụ "Mã chuyến: [mã]" ở cột Khách hàng — SAI, vì 2 chip mang ý nghĩa khác hẳn
nhau (1 cái là loại điểm giao/lấy, 1 cái chỉ là mã tham chiếu). Chip "Mã chuyến" phải
dùng tông XÁM TRUNG TÍNH (nền xám nhạt, chữ xám đậm — cùng token với
`badge_color_semantics.grey`), không mượn màu của badge khác đứng gần nó trong cùng
bảng. Quy tắc chung: 2 chip/badge khác ý nghĩa trong cùng 1 bảng KHÔNG nên trùng màu,
kể cả khi 1 trong 2 là dạng "grey mặc định" dễ bị gán nhầm sang màu có sẵn gần đó.

## Pagination bảng dữ liệu — ngưỡng hiện/ẩn CHUNG (2026-09-06, Williams)

`table_card.pagination` KHÔNG phải cờ bật/tắt cố định cho cả bảng — chỉ HIỆN khi số
dòng đang hiển thị (sau khi áp filter/tab/search, không phải tổng số dòng gốc trong
DB) đạt tối thiểu **10 dòng**. Dưới 10 dòng thì ẨN HẲN pagination, không vẽ tĩnh cho
có (kể cả khi feature "có phân trang" nói chung).

Áp dụng cho mọi bảng dữ liệu (table_card) trong hệ thống, không riêng 1 feature nào.
Khi build prototype/code thật: tính lại điều kiện hiện pagination MỖI LẦN danh sách
đang hiển thị thay đổi (đổi tab, gõ search, áp filter) — không chỉ tính 1 lần lúc load
trang, vì số dòng hiển thị có thể tụt xuống dưới 10 sau khi lọc dù tổng bảng gốc có
nhiều hơn.

## Màu nút — TẤT CẢ 4 role đều cho phép đổi style (2026-09-06, Williams xác nhận qua #01)

Trước đây chỉ role `secondary` (Xanh dương) được coi là cho phép đổi Fill↔Outline, còn
`primary`/`destructive`/`cancel` bị coi là cố định 1 style. Williams xác nhận: SAI — cả
4 role đều được phép đổi style tuỳ màn (vd nút primary "Thay đổi thông tin khách hàng"
là Outline cam, nút destructive "Dừng hoạt động" là Outline đỏ, đều hợp lệ). Khi build
prototype/code thật: không tự ép 1 role nào đó phải luôn Fill hay luôn Outline — theo
đúng style ghi trong thiết kế/spec.

## Nút "Trở về" (back button) — Button organism thật, có label (2026-09-06, Williams)

Không phải icon-only mũi tên trung tính. Là 1 Button organism thật: màu Grey (role
`cancel`), CÓ label text "Trở về" đứng cạnh icon mũi tên — không chỉ vẽ icon rồi bỏ
trống chữ.

## Độ rộng cột bảng dữ liệu — tránh khoảng trắng thừa (2026-09-06, Williams)

Khi bảng có nhiều cột ngắn (#, số lượng, trạng thái, ngày, thao tác...) cạnh 1-2 cột
text tự do (tên/nội dung dài), trình duyệt có xu hướng dàn đều khoảng trắng thừa vào
CẢ cột ngắn lẫn cột text nếu không có gợi ý độ rộng — nhìn rất trống trải. Khi build
prototype/code thật: gán các cột ngắn/enum một class kiểu `width:1%; white-space:nowrap;`
để chúng co khít theo nội dung, để 1 cột text tự do duy nhất hấp thụ phần rộng còn lại
— không để mặc định `table-layout:auto` tự chia đều.

## Khối nội dung trang không nên giới hạn max-width cứng tuỳ tiện (2026-09-06, Williams)

Từng đặt `max-width:1200px` cho khu vực nội dung chính khiến các block/card bị bó hẹp,
để lại khoảng trắng thừa 2 bên khi màn hình rộng hơn 1200px + sidebar. Yêu cầu chung:
các block phải kéo dài hết chiều rộng khu vực nội dung thật (trừ phần sidebar cố định),
không tự đặt trần cứng nếu không có lý do rõ ràng (vd form 1 cột hẹp có chủ đích).

## ✅ Đã giải quyết — màu nền header bảng dữ liệu (2026-09-06)

Từng ghi nhận đây là "xung đột" giữa #06 (header trắng) và #01 (header xám #fafafa +
viền dọc). Williams xác nhận lại bằng ảnh chụp thật của chính bảng #06: KHÔNG phải 2
loại bảng khác style nhau — bản sửa header-trắng cho #06 (2026-09-05) là CHƯA ĐỦ CHÍNH
XÁC (thiếu viền dọc, sai màu nền). Quy tắc ĐÚNG, áp dụng CHUNG cho mọi bảng dữ liệu:
header nền xám nhạt `#fafafa` + viền dọc (stroke) phân chia rõ giữa các cột (cả header
lẫn dòng dữ liệu). Đã sửa lại prototype #06 và #01 khớp nhau theo quy tắc này.

## Việc còn mở — chưa map, cần hỏi lại khi gặp

- Property TEXT có nhiều property cạnh tranh cùng vị trí (vd Input's
  Description/Money/Phone/URL) — PHẢI dùng path override, không tự chọn 1
  property rồi bỏ qua các property còn lại. Chi tiết path override thật:
  xem `claude-json-schema-prompt.md` trong `ghn-figma-pipeline` (chưa copy
  vào đây — thuộc lớp "cách sinh JSON", không phải "vai trò → component",
  cân nhắc copy khi PRD Copilot thật sự bắt đầu sinh spec.json).
- Menu/sidebar: style dùng chung mọi hệ thống GHN, nhưng DANH SÁCH MODULE
  khác nhau theo từng hệ thống con (B2B/TMS/Lắp đặt) — xem
  `ghn-figma-pipeline/MENU-THEO-HE-THONG.md` khi cần vẽ sidebar cho hệ
  thống khác ngoài FTL B2B, đừng copy nhầm module hệ thống khác sang (lỗi
  đã gặp thật ở TMS 2026-08-05).
