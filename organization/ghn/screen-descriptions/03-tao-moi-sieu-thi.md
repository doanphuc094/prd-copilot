# Tạo mới siêu thị (đã xong — 9/9 Open Questions đã trả lời/confirm, 2026-09-05)

Loại khuôn: **form tạo-mới** (đáp ứng slot #3 trong `00-checklist.md`).
Hệ thống: **TMS** (khác file Figma với 2 màn trước — 2 màn trước thuộc
"B2B-PORTAL"). fileKey: `5R1vKrzrKXz4abfo9fdK3y`, tên file "TMS".
Node gốc: `23630:13183` ("Tạo danh sách siêu thị" — đây là 1 flow-overview
frame chứa nhiều state, không phải 1 màn hình đơn; đã tách state cần dùng
bên dưới theo từng node con).
Link Figma: https://www.figma.com/design/5R1vKrzrKXz4abfo9fdK3y/TMS?node-id=23630-13183

**Lưu ý quan trọng về đa dạng hoá**: sidebar hiển thị module "Xếp tuyến FTL"
> "Cấu hình xếp tuyến" — đây là hệ thống nội bộ vận hành (Ops), không phải
Portal B2B khách hàng dùng như 2 màn trước. Màn này đáp ứng loại khuôn
"form tạo-mới" (slot #3). **SỬA 2026-09-05 (Williams xác nhận lần 2)**:
màn này KHÔNG tính luôn cho slot #5 ("khác — Ops/vận hành") nữa — chỉ khác
hệ thống (TMS vs Portal B2B) không có nghĩa là khác tính năng; slot #3 và
#5 (nếu đều là "Tạo mới siêu thị") thực chất là CÙNG 1 tính năng, không
phải 2 màn khác nhau. Slot #5 cần 1 màn THẬT SỰ khác (xem Open Question
#1 đã cập nhật).

## 1. Bảng ngữ cảnh (6 chiều)

| Chiều | Nội dung |
|---|---|
| WHAT | Form tạo mới 1 "siêu thị" — 1 điểm giao hàng/dừng xe cụ thể trong hệ thống xếp tuyến FTL, có toạ độ, đặc điểm mặt bằng, khung giờ nhận hàng, các ràng buộc vận hành (cấm tải/cấm dừng/cấm đổ...). |
| WHY | **ĐÃ TRẢ LỜI (Williams, 2026-09-05)**: dữ liệu "siêu thị" dùng để ghi nhận thông tin điểm giao đó cho cấu hình xếp tuyến. Dựa trên lịch trình cấm tải, cấm dừng và khung giờ nhận hàng, hệ thống tính toán tối ưu xe tải sẽ giao như thế nào — xếp hàng nào đi giao tại điểm siêu thị nào trước. |
| WHO | **ĐÃ TRẢ LỜI (Williams, 2026-09-05)**: Nhân viên điều phối vận tải (Transportation Dispatcher) — muốn xem, tìm kiếm, thêm mới và cập nhật thông tin các siêu thị (điểm giao/nhận hàng) trong hệ thống TMS. KHÔNG phải khách hàng/đối tác ngoài như 2 màn trước. |
| HOW | Vào từ menu "Xếp tuyến FTL" > "Cấu hình xếp tuyến" → bấm nút tạo mới (chưa thấy trong node này, giả định có 1 nút "+ Tạo mới siêu thị" ở màn danh sách trước đó, ngoài phạm vi node được cung cấp) → điền form 2 khối "Thông tin chung" + "Thông tin vận hành" → bấm "Tạo siêu thị". |
| EDGES | (1) Trùng tên/mã siêu thị → lỗi "đã tồn tại". (2) Thiếu field bắt buộc → lỗi "Vui lòng nhập/chọn ...". (3) Khung giờ nhận hàng hoặc khung giờ cấm tải chồng lấn nhau → lỗi "Khung thời gian bị chồng lấn". (4) Tick "Cấm tải" → xuất hiện thêm 1 khối bắt buộc "Chọn thời gian cấm tải" — vì đây là data phụ thuộc checkbox "Cấm tải": khi siêu thị bị cấm tải, hệ thống cần biết chính xác khung giờ cấm để lưu lịch trình cấm tải phục vụ tính toán xếp tuyến (Williams xác nhận 2026-09-05). |
| HISTORY | Không thấy trong node này (không có vùng lịch sử chỉnh sửa như màn khách hàng) — có thể vì đây là tạo mới, chưa có gì để xem lịch sử. |

## 2. Flow Mapping — các state đã thấy trong node được cung cấp

| State (tên node gốc) | Node ID | Mô tả |
|---|---|---|
| `[Tạo mới siêu thị] - Chưa điền thông tin` | `23630:14642` | Form rỗng, chưa nhập gì — dùng làm ảnh tham chiếu chính cho layout/field. |
| `[Tạo mới siêu thị] - Điền thông tin` | `23630:14755` | Form đã điền đầy đủ + hợp lệ — lộ thêm khối điều kiện "Chọn thời gian cấm tải" (vì đã tick "Cấm tải"). |
| `[Tạo mới siêu thị] - Lỗi thiếu TT bắt buộc/trùng TT` | `23630:15098` | Trạng thái lỗi validate — có đủ 2 loại lỗi: field-rỗng-bắt-buộc và business-rule (trùng tên/mã, khung giờ chồng lấn). |
| `Popup điền địa chỉ - Địa chỉ cũ` | `23630:15232` | Modal chọn địa chỉ, dạng 3 cấp (Tỉnh/Thành phố + Quận/Huyện + Phường/Xã). |
| `Popup điền địa chỉ - Địa chỉ mới` | `23630:15252` | Modal chọn địa chỉ, dạng 2 cấp (Tỉnh/Thành phố + Phường/Xã, KHÔNG có Quận/Huyện). |
| `[Tạo mới siêu thị] - Điền địa chỉ` | `23630:15274` | Form chính sau khi đã chọn xong địa chỉ từ modal — field "Địa chỉ" hiển thị text địa chỉ đầy đủ đã ghép, vẫn giữ chevron `>` để mở lại modal. |

## 3. Khu vực trên màn hình

### Khu vực A — Sidebar TMS + Header phải

- Sidebar trái (`Left Menu Freight`): Logo GHN (biến thể logo khác "Portal B2B" — cần xác nhận đây là logo con TMS hay chung, xem Open Question #2), menu: "Danh sách booking", "Xếp tuyến FTL" (đang mở, có icon), con: "Phiên xếp tuyến", "**Cấu hình xếp tuyến**" (đang active — cam), "Đăng xuất". → xác nhận đúng theo `ghn-figma-pipeline/MENU-THEO-HE-THONG.md`: **module TMS khác module B2B**, không copy nhầm menu giữa 2 hệ thống (rule này role-to-component-mapping.md đã ghi sẵn, đúng như dự đoán).
- Header phải: instance component "Global action home" (cùng tên component với 2 màn B2B trước) nhưng hiển thị KHÁC — chỉ có Avatar + Tên ("Ngô Đức Huy") + dòng phụ "mã nhân viên - SĐT" (`Content/Body 3`), KHÔNG thấy icon chuông/thông báo, và **KHÔNG có breadcrumb bên trái** (khoảng trắng trống). **ĐÃ CONFIRM (Williams, 2026-09-05): PHẢI LUÔN có breadcrumb bên trái** — đây là gap thật (thiếu so với chuẩn), lặp lại ở cả màn TMS này lẫn màn Danh sách nhà cung cấp (Portal B2B) trước đó. Không phải biến thể cố ý — khi build spec.json LUÔN thêm breadcrumb bất kể Figma tham chiếu hiện có thiếu hay không (khớp đúng rule đã có sẵn trong `role-to-component-mapping.md` mục Header trang, không cần sửa gì thêm ở đó).

### Khu vực B — Page Heading

- Nút "← Trở về" (`⚫ Button :: Button / Button organism`, kích thước 93×32 — ĐÃ SỬA, Williams xác nhận 2026-09-05: KHÔNG phải Text link, khớp đúng size/component với nút Trở về đã confirm ở màn Trang chi tiết khách hàng `01-khach-hang-chi-tiet.md`) + tiêu đề "Tạo mới siêu thị" (`Heading/Bold/H5`) — trang con/tạo-mới có nút Trở về, không phải trang chính. Rule cũ trong `role-to-component-mapping.md` ghi "Text link không viền" là SAI, đã sửa lại (xem mục 4).

### Khu vực C — Section "Thông tin chung"

Tiêu đề block "Thông tin chung" (`Title/Title 1`).

**Bố cục: lưới 4 cột/hàng — ĐÃ CONFIRM (Williams, 2026-09-05), đây là layout CHUNG cho mọi form tạo-mới, không riêng màn này.** Mỗi hàng tối đa 4 "đơn vị cột" (unit), nhưng số component thực tế trên 1 hàng biến thiên tùy 2 yếu tố: (1) mức độ liên quan giữa các field — field liên quan gom gần nhau cùng 1 hàng; (2) độ dài dự kiến nội dung nhập — field cần nhập dài chiếm 2 unit (nửa hàng), field ngắn chiếm 1 unit (1/4 hàng). Khớp đúng dữ liệu Figma của màn này:

| Hàng | Field (unit) | Tổng unit | Số component/hàng |
|---|---|---|---|
| 1 | Tên siêu thị (2 unit, text dài) + Mã siêu thị (1 unit) + Ngày khai trương (1 unit) | 4 | 3 |
| 2 | Địa chỉ (2 unit) + Vĩ độ (1 unit) + Kinh độ (1 unit) | 4 | 3 |
| 3 | Tên quản lý siêu thị (2 unit) + Số điện thoại quản lý (2 unit) | 4 | 2 |

→ Hàng 3 chỉ có 2 component dù tổng vẫn đúng 4 unit, vì cả 2 field đều cần độ rộng lớn hơn (2 unit) thay vì 1 unit như hàng 1-2.

| Field | Bắt buộc? | Loại input | Ghi chú |
|---|---|---|---|
| Tên siêu thị | Có (*) | Input text | Lỗi bỏ trống: "Vui lòng nhập tên siêu thị". Lỗi trùng: "Tên siêu thị đã tồn tại". |
| Mã siêu thị | Có (*) | Input text | Lỗi bỏ trống: "Vui lòng nhập mã siêu thị". Lỗi trùng: "Mã siêu thị đã tồn tại". |
| Ngày khai trương | Không | Datepicker | icon lịch, placeholder "Chọn ngày khai trương" |
| Địa chỉ | Có (*) | Input + chevron `>` mở Modal (xem Khu vực E) | Lỗi bỏ trống: "Vui lòng nhập địa chỉ". Sau khi chọn xong, field hiển thị text địa chỉ đầy đủ ghép sẵn, vẫn bấm được để mở lại modal sửa. **Lưu ý (Williams xác nhận 2026-09-05): đây là pattern CHUNG áp dụng cho MỌI field địa chỉ về sau, không riêng màn này** — mục tiêu là ngăn user nhập địa chỉ dạng freetext tự do, bắt buộc chọn qua modal có cấu trúc (Tỉnh/Quận-Huyện/Phường-Xã + địa chỉ chi tiết) để giảm sai sót nhập sai hoặc địa chỉ không đúng thực tế. |
| Vĩ độ (Lat) | Có (*) | Input số | Lỗi bỏ trống: "Vui lòng nhập vĩ độ". |
| Kinh độ (Long) | Có (*) | Input số | Lỗi bỏ trống: "Vui lòng nhập kinh độ". |
| Tên quản lý siêu thị | Không | Input text | |
| Số điện thoại quản lý | Không | Input số thường (KHÔNG có dropdown mã quốc gia, dù Figma hiện đang vẽ có "VN") | **ĐÃ CONFIRM (Williams, 2026-09-05)**: bỏ dropdown mã quốc gia trong Figma — chỉ dùng Input số, giới hạn 9–11 chữ số + tự chuẩn hoá về định dạng số điện thoại Việt Nam, không cho phép ký tự đặc biệt (đúng theo PRD FT-3911, field "SĐT SM" = Text field). Đã propagate thành rule chung trong `role-to-component-mapping.md`. |

### Khu vực D — Section "Thông tin vận hành"

Tiêu đề block "Thông tin vận hành" (`Title/Title 1`). Gồm:

1. **Loại mặt bằng*** — nhóm 2 lựa chọn dạng radio (Mặt phố / Chung cư), bắt buộc chọn 1. Lỗi khi chưa chọn: "Vui lòng chọn loại mặt bằng". **ĐÃ CONFIRM (Williams, 2026-09-05): KHÔNG default sẵn 1 trong 2 lựa chọn — giữ nguyên như Figma hiện tại (cả 2 radio đều trống lúc đầu).** Căn cứ: (1) PRD FT-3911 ghi field này "Yes" (bắt buộc) và KHÔNG nói mặc định giá trị nào — khác hẳn 4 checkbox "Cấm dừng/Cấm đỗ/Điểm giao khó/Không người nhận ca tối" đều được PRD ghi rõ "mặc định No"; (2) giá trị này ảnh hưởng trực tiếp tới thuật toán xếp tuyến (mặt phố và chung cư có ràng buộc giao hàng vật lý khác hẳn nhau) — nếu default sai mà user không để ý sửa lại, dữ liệu sai sẽ lặng lẽ lọt vào hệ thống xếp tuyến, hậu quả nặng hơn nhiều so với việc bắt user phải chọn tay; (3) không có căn cứ nào cho thấy 1 trong 2 loại mặt bằng là đa số áp đảo để chọn làm default hợp lý. Nguyên tắc chung đã propagate vào `role-to-component-mapping.md`: field bắt buộc ảnh hưởng trực tiếp business logic quan trọng (routing, giá, quyền...) mà không có giá trị đa số rõ ràng thì KHÔNG default, bắt buộc user chọn tay; field optional có giá trị "an toàn/phổ biến" rõ ràng (như các checkbox ràng buộc ở trên, mặc định "không có ràng buộc" là lựa chọn an toàn) thì NÊN default.
2. **Khoảng cách kéo hàng (mét)** — Input số, không bắt buộc. **ĐÃ CONFIRM (Williams, 2026-09-05), là giải pháp TẠM THỜI áp dụng CHUNG cho MỌI input có đơn vị đo phía sau (mét, CBM, kg, VNĐ...)**: hiện GHN DS CHƯA có component input với unit-suffix gắn liền bên trong ô nhập — nên cách xử lý tạm thời là ghi chú đơn vị trong ngoặc đơn ngay sau label, KHÔNG in đậm (label chính in đậm, phần "(đơn vị)" thường). Khi DS có component unit-suffix thật thì đổi lại theo component đó.
3. **Phí giao hàng (VNĐ)** — Input số, không bắt buộc, giá trị mặc định "0", định dạng hiển thị có dấu chấm phân cách nghìn khi có giá trị (vd "100.000") — cùng pattern ghi chú đơn vị tạm thời như mục 2.
4. **Khối "Chọn thời gian nhận hàng"** — tiêu đề bold + helper text "Các khung thời gian không được chồng lấn nhau." + N dòng lặp lại (Từ giờ / Đến giờ, mỗi ô là Datepicker dạng chỉ giờ, icon đồng hồ/lịch) + icon thùng rác xoá dòng + nút "+ Thêm khung giờ" (Outline, icon plus) để thêm dòng mới. Lỗi khi 2 dòng chồng giờ nhau: "Khung thời gian bị chồng lấn. Vui lòng chọn lại khung thời gian" — hiện dưới CẢ HAI dòng liên quan. **Quy tắc xoá dòng — ĐÃ CONFIRM (Williams, 2026-09-05), áp dụng CHUNG cho mọi bảng/danh sách có thể xoá dòng, không riêng khối này**: xoá là xoá hết thông tin dòng đó, TRỪ KHI bảng/khối đó bắt buộc phải có tối thiểu 1 dòng — khi đó, xoá tới khi chỉ còn đúng 1 dòng thì nút xoá của dòng cuối cùng này **DISABLE (làm mờ) kèm tooltip giải thích lý do** (vd "Phải giữ lại ít nhất 1 khung giờ"), KHÔNG ẩn hẳn — vì: (1) ẩn hẳn làm layout dòng cuối bị lệch/thiếu nhất quán so với các dòng phía trên (mất icon ở đúng vị trí đó), (2) disable + tooltip giúp user hiểu RÕ đây là 1 ràng buộc hệ thống chủ động chặn, không phải lỗi UI hay bug.
5. **5 checkbox ràng buộc vận hành** (2 hàng, không bắt buộc, multi-select độc lập): "Cấm tải", "Cấm dừng", "Cấm đồ" (hàng 1) — "Điểm giao khó", "Không người nhận ca tối" (hàng 2).
6. **Khối điều kiện "Chọn thời gian cấm tải"*** — CHỈ xuất hiện khi tick "Cấm tải" ở mục 5, cùng quy tắc xoá dòng tối thiểu 1 dòng như mục 4 ở trên. Bắt buộc khi xuất hiện. Cùng pattern lặp-dòng-giờ y hệt mục 4 (title + helper + N dòng Từ giờ/Đến giờ + xoá + "+ Thêm khung giờ"), nhưng validate ràng buộc chồng giờ riêng cho khối này. **ĐÃ TRẢ LỜI lý do nghiệp vụ (Williams, 2026-09-05)**: thời gian cấm tải là data phụ thuộc checkbox "Cấm tải" — khi siêu thị chọn cấm tải, hệ thống cần biết khung giờ cấm tải cụ thể để lưu lịch trình cấm tải phục vụ xếp tuyến. 4 checkbox còn lại (Cấm dừng/Cấm đỗ/Điểm giao khó/Không người nhận ca tối) là thuộc tính nhị phân đơn thuần, không có granularity theo giờ nên không cần field phụ.
7. **Ghi chú thêm** — Input text tự do, không bắt buộc, full-width.

### Khu vực E — Modal "Nhập thông tin địa chỉ"

- Tiêu đề modal "Nhập thông tin địa chỉ" + nút đóng (X).
- Toggle switch "Địa chỉ mới" (mặc định tắt trong cả 2 state đã thấy).
- Field "Địa chỉ chi tiết*" — Input text, bắt buộc.
- Nhóm dropdown địa chỉ — **2 biến thể khác nhau tuỳ trạng thái toggle**:
  - "Địa chỉ cũ" (`23630:15232`): 3 dropdown — Tỉnh/Thành phố*, Quận/Huyện*, Phường/Xã*.
  - "Địa chỉ mới" (`23630:15252`): 2 dropdown — Tỉnh/Thành phố*, Phường/Xã* (KHÔNG có Quận/Huyện).
  - **ĐÃ CONFIRM (Williams, 2026-09-05)**: đúng, đây là do sáp nhập đơn vị hành chính VN (bỏ cấp Quận/Huyện, chỉ còn Tỉnh/Thành phố + Phường/Xã).
- Footer modal: [Huỷ] (Outline) + [Lưu thay đổi] (Fill cam) — nút "Lưu thay đổi" **bị disable (xám) cho tới khi đủ field hợp lệ** trong cả 2 screenshot đã thấy (chưa thấy state đã điền đủ). Đây là pattern KHÁC với nút chính ở form ngoài ("Tạo siêu thị" luôn active, validate khi bấm — Williams xác nhận field trùng tên/mã CHỈ check khi bấm "Tạo siêu thị", không real-time). **ĐÃ CONFIRM + CHỐT (Williams, 2026-09-05): đây LÀ điểm chưa nhất quán, đã thống nhất theo hướng nút chính form ngoài đang dùng — luôn active, validate khi bấm, hiện lỗi inline sau — áp dụng CHUNG cho mọi nút primary/submit kể cả trong modal, KHÔNG dùng disable-until-valid nữa.** Lý do: (1) nhất quán với cách hệ thống check trùng tên/mã ở form chính (chỉ check khi bấm, không real-time); (2) disable-until-valid đôi khi khiến user không rõ TẠI SAO nút chưa bấm được (đặc biệt khi lỗi nằm ở field chưa nhìn thấy ngay), trong khi validate-on-submit + hiện lỗi rõ ràng giúp user biết chính xác cần sửa gì.

### Khu vực F — Footer form chính

- Figma hiện vẽ [Hủy bỏ] (Outline **destructive** — viền/chữ đỏ) + [Tạo siêu thị] (Fill cam, label = "Tạo " + tên entity). **ĐÃ SỬA (Williams, 2026-09-05): nút Huỷ đang dùng style Outline destructive tạo contrast quá cao, cạnh tranh với nút chính cam — HẠ xuống Outline GREY (viền/chữ xám, trung tính)** để tăng mức độ nổi bật tương đối cho nút primary "Lưu thông tin". Outline destructive (đỏ) CHỈ dành cho hành động thật sự phá huỷ dữ liệu (vd Xoá), KHÔNG dùng cho Huỷ/Đóng/Cancel (hành động trung tính, có thể quay lại được).
- **ĐÃ SỬA/THỐNG NHẤT (Williams, 2026-09-05): KHÔNG dùng label riêng theo loại khuôn nữa** — gộp chung 1 pattern "footer form" duy nhất cho cả tạo-mới lẫn chỉnh-sửa: **[Huỷ] / [Lưu thông tin]**. Lý do Williams đưa ra: page heading phía trên đã nói rõ đang ở context nào ("Tạo mới siêu thị"), nên nút Lưu không cần lặp lại tên entity — tránh sinh ra quá nhiều tên gọi khác nhau cho cùng 1 chức năng (lưu form). Việc này cũng khớp với PRD FT-3911 — PRD gọi hành động này là "Lưu" xuyên suốt cả acceptance criteria của Tạo mới lẫn Cập nhật, không phải "Tạo siêu thị" như Figma hiện vẽ (điểm mâu thuẫn đã flag trước đó ở mục "Chưa rõ/cần verify" — nay coi như đã giải quyết theo hướng này).
- **Mình không phản bác hướng này** — hợp lý và nhất quán hơn. Có 1 điều mình lưu ý thêm chứ không phải phản đối: nút hành động cụ thể (vd "Tạo siêu thị") thường được xem là microcopy tốt hơn nút chung chung (vd "Lưu") theo 1 số nguyên tắc UX writing phổ biến (NN/g, Google) — vì nó xác nhận rõ hậu quả hành động trước khi user bấm, đặc biệt quan trọng cho hành động có side-effect thật (tạo siêu thị ở đây đồng thời tự động tạo thêm 1 địa điểm bên B2B Portal). Nhưng vì heading trang đã đủ rõ ngữ cảnh và PRD cũng dùng "Lưu" nhất quán, mình đồng ý hướng gộp chung là hợp lý cho trường hợp full-page form thế này.
- **Phát hiện thêm khi rà lại**: nút Huỷ hiện đang có 2 cách viết khác nhau giữa 2 màn — "Hủy bỏ" (Figma màn Tạo mới siêu thị) vs "Huỷ" (Figma màn khách hàng, edit-mode). Đề xuất của mình: thống nhất theo "Huỷ" (bản đã ghi nhận trước, ngắn gọn hơn) — **cần Williams confirm cách viết nào là chuẩn** trước khi propagate.

## 4. Vai trò nút/text áp dụng được từ `role-to-component-mapping.md` (ghi chú nội bộ, không phải câu hỏi)

Khớp tốt, dùng lại được: nút Trở về (text link), Page Header H5, Title/Title 1 cho tên block, Input/Datepicker/Selection theo bảng "Input theo loại" đã có, Button organism Fill cam cho hành động chính.

Cần bổ sung/xác nhận (mới, chưa có trong bảng — TẤT CẢ đợi Williams confirm ở mục 5 trước khi đưa vào role-to-component-mapping.md):
- Footer tạo-mới: [Hủy bỏ]/[Tạo + tên entity] — bổ sung song song với footer chỉnh-sửa đã có.
- Inline validation error: icon cảnh báo tam giác đỏ + text đỏ ngay dưới field, border field đỏ. 2 loại: field-rỗng-bắt-buộc ("Vui lòng ...") vs business-rule conflict ("... đã tồn tại", "... bị chồng lấn").
- Khối lặp-dòng-giờ (schedule builder): title + helper + N dòng Từ giờ/Đến giờ + icon xoá + nút "+ Thêm khung giờ" — pattern tái dùng được cho mọi field dạng "nhiều khung giờ không chồng lấn".
- Field phụ thuộc điều kiện (conditional required): 1 checkbox cụ thể được tick → hiện thêm 1 khối bắt buộc điền.
- Ghi chú đơn vị đo trong ngoặc đơn cạnh label (không bắt buộc phải là rule riêng nếu style guide đã có, cần kiểm tra).
- Dropdown mã vùng + input số điện thoại ghép chung 1 field.
- Modal địa chỉ 2 cấp/3 cấp tuỳ toggle "Địa chỉ mới".
- Nút primary trong modal disable-until-valid, khác nút primary form chính (luôn active) — cần hỏi có phải cố ý.

## 5. Open Questions — cần Williams xác nhận trước khi build spec.json

1. ~~Màn này có tính luôn cho cả slot #3 VÀ slot #5~~ — ĐÃ TRẢ LỜI, sau đó **SỬA LẠI 2026-09-05 (Williams xác nhận lần 2)**: KHÔNG tính luôn cho cả 2 slot nữa. Lý do sửa: khác hệ thống (TMS vs Portal B2B) không đồng nghĩa với khác tính năng — "Tạo mới siêu thị" ở đây là CÙNG 1 tính năng dù nằm ở hệ thống nào. Màn này CHỈ đáp ứng slot #3 (loại khuôn "form tạo-mới"). Slot #5 ("khác — Ops/vận hành") vẫn còn mở, cần tìm 1 màn thật sự khác — xem `00-checklist.md`.
2. ~~Header thiếu breadcrumb bên trái~~ — ĐÃ TRẢ LỜI (Williams, 2026-09-05): PHẢI LUÔN có breadcrumb bên trái — gap thật, lặp lại ở nhiều màn/hệ thống, không phải biến thể cố ý. Khi build luôn thêm breadcrumb bất kể Figma tham chiếu thiếu hay không.
3. ~~WHO thật sự~~ — ĐÃ TRẢ LỜI (Williams, 2026-09-05): Nhân viên điều phối vận tải (Transportation Dispatcher) — xem, tìm kiếm, thêm mới, cập nhật thông tin siêu thị trong TMS.
4. ~~Icon xoá dòng có luôn hiện dù chỉ 1 dòng~~ — ĐÃ TRẢ LỜI + CONFIRM (Williams, 2026-09-05), kèm quy tắc chung: xoá là xoá hết thông tin dòng, TRỪ KHI khối đó bắt buộc tối thiểu 1 dòng — khi đó nút xoá dòng cuối cùng **DISABLE (làm mờ) kèm tooltip giải thích**, KHÔNG ẩn hẳn (xem chi tiết + lý do ở mục 3, Khu vực D, mục 4). Đã propagate vào `role-to-component-mapping.md`.
5. ~~Vì sao chỉ "Cấm tải" có field phụ~~ — ĐÃ TRẢ LỜI (Williams, 2026-09-05): thời gian cấm tải là data phụ thuộc checkbox Cấm tải, hệ thống cần biết khung giờ cụ thể để lưu lịch trình phục vụ xếp tuyến; 4 checkbox còn lại là thuộc tính nhị phân đơn thuần không cần granularity theo giờ.
6. ~~Toggle "Địa chỉ mới" có phải do sáp nhập hành chính VN~~ — ĐÃ TRẢ LỜI (Williams, 2026-09-05): Đúng.
7. ~~Nút Lưu thay đổi disable-until-valid vs nút Tạo siêu thị luôn active~~ — ĐÃ TRẢ LỜI + CHỐT (Williams, 2026-09-05): đây LÀ điểm chưa nhất quán, đã thống nhất theo hướng nút chính form ngoài (luôn active, validate-on-submit, hiện lỗi inline sau khi bấm) — áp dụng CHUNG cho mọi nút primary/submit kể cả trong modal, KHÔNG dùng disable-until-valid nữa. Đã propagate vào `role-to-component-mapping.md`.

**Tất cả Open Questions của màn này đã được trả lời/confirm — hết mở.**
8. ~~Lỗi trùng tên/mã check real-time hay chỉ khi bấm Lưu~~ — ĐÃ TRẢ LỜI (Williams, 2026-09-05): chỉ bấm khi tạo siêu thị (validate-on-submit, không real-time/on-blur).
9. ~~WHY thật của "siêu thị" trong xếp tuyến FTL~~ — ĐÃ TRẢ LỜI (Williams, 2026-09-05): ghi nhận thông tin điểm giao cho cấu hình xếp tuyến — dựa trên lịch trình cấm tải, cấm dừng, khung giờ nhận hàng, hệ thống tính toán tối ưu xe tải giao hàng nào tại điểm siêu thị nào trước.

**Còn lại cần Williams confirm thêm** (2 đề xuất của mình ở câu #4 và #7 trên) trước khi propagate rule cuối cùng vào `role-to-component-mapping.md`.
