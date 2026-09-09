# Bảng tra: vai trò → component/style thật (GHN FTL — App Truck, MOBILE)

**Tạo mới 2026-09-05.** File này TÁCH RIÊNG khỏi `role-to-component-mapping.md`
(vốn chỉ dành cho **Portal B2B, web**) — vì App Truck là 1 hệ thống khác
hẳn: **mobile app** của tài xế, fileKey Figma khác (`2RLeRDt6tLCZrfCFqyMZUi`,
"App-B2B-Driver"), và theo xác nhận của Williams (2026-09-05): **đây là
design của 1 Designer CŨ trước đây, Williams không rõ ngụ ý UX đằng sau
nhiều lựa chọn style** — khác hẳn Portal B2B, nơi mọi rule trong
`role-to-component-mapping.md` đều đã được Williams (designer hiện tại)
xác nhận có chủ đích.

**Nguyên tắc dùng file này**: các pattern dưới đây là QUAN SÁT + xác nhận
rời rạc theo từng câu hỏi cụ thể — KHÔNG coi toàn bộ style App Truck hiện
tại là "chuẩn đã chốt" như Portal B2B. Khi build spec.json cho 1 màn App
Truck mới, vẫn nên hỏi lại Williams/PO nếu gặp style KHÔNG nằm trong danh
sách đã confirm dưới đây — đừng suy rộng từ 1 màn đã thấy sang màn khác.

Ví dụ thật đầu tiên: `screen-descriptions/08-tai-xe-nhap-chi-phi-app-truck.md`.

## ⚠️ Màu nút primary — CHƯA có quy tắc xác nhận (khác Portal B2B)

Quan sát được 3 nút primary khác màu nhau trong CÙNG hệ thống App Truck,
KHÔNG rõ có chủ đích hay không (design cũ, Williams không chắc ngụ ý gốc):

| Màn / hành động | Màu quan sát được |
|---|---|
| "Thực hiện giao hàng" (Lộ trình — chuyển trạng thái chuyến) | Fill XANH DƯƠNG |
| "Lưu thông tin" (form nhập/sửa chi phí phát sinh) | Fill CAM |
| "Xác nhận" (modal xoá — hành động phá huỷ dữ liệu) | Fill CAM/ĐỎ-CAM |

→ **KHÔNG dùng bảng trên như 1 rule khi build spec mới** — chỉ ghi lại để
tham khảo. Nếu cần 1 màn mới có nút primary, hỏi lại Williams/dev phụ
trách App Truck xem có muốn chuẩn hoá lại theo 1 màu duy nhất hay giữ
nguyên logic theo ngữ cảnh (điều hướng/lưu dữ liệu/phá huỷ) — CHƯA CÓ CÂU
TRẢ LỜI, đây là việc còn mở thật sự (không phải câu hỏi đã bị bỏ qua).

## UX Writing — ngôi xưng hô

Trong App Truck (app 1-người-dùng-tự-thao-tác — chỉ chính tài xế đó dùng),
khi 1 field đại diện cho CHÍNH người đang dùng app, dùng ngôi thứ NHẤT
("Tôi") thay vì gọi tên vai trò ("Tài xế"). Ví dụ: radio "Người chi trả"
có 2 lựa chọn "Tôi" (mặc định) / "Giám sát vận tải" — KHÔNG dùng "Tài
xế"/"Giám sát vận tải".

**Khác Portal B2B** (web): ở đó LUÔN gọi vai trò rõ ràng ở ngôi thứ ba
(GSVT, Tài xế, Vận Hành...) vì 1 nhân viên có thể xem/thao tác dữ liệu của
NHIỀU người khác, không phải chỉ của chính mình.

Xác nhận theo Williams 2026-09-05 (quan sát từ Figma, chưa hỏi riêng
nhưng là hệ quả tự nhiên của ngữ cảnh 1-người-dùng — nếu gặp trường hợp
mơ hồ, vẫn nên hỏi lại).

## Modal xoá — không thể hoàn tác

Cấu trúc chuẩn: title Bold dạng câu hỏi (vd "Xoá phí phát sinh?") + mô tả
cảnh báo rõ ràng tính KHÔNG THỂ HOÀN TÁC (vd "Nếu xác nhận, phí phát sinh
sẽ bị xoá và không thể khôi phục lại.") + footer [Đóng] (Outline Grey) +
**[Xác nhận]** (Fill cam/đỏ-cam) — label nút là **"Xác nhận"**, KHÔNG dùng
tên hành động trần trụi như "Xoá". Nhất quán với UX Writing "Xác nhận"
thay vì "Xoá"/"Đóng" đã ghi 1 phần bên Portal B2B (`04-modal-ket-qua-upload-excel.md`).

Xác nhận theo Williams 2026-09-05, xem ví dụ thật
`screen-descriptions/08-tai-xe-nhap-chi-phi-app-truck.md` (mục 2.4).

## Input chọn 1 giá trị (dropdown/radio) — dùng Bottom-sheet

Thay vì dropdown mở tại chỗ như web, App Truck dùng **bottom-sheet** trượt
lên từ đáy màn hình: title + (nếu cần) 1 dòng hint giải thích rule ngay
tại điểm quyết định (vd "Mỗi loại phí chỉ được nhập 1 lần cho mỗi điểm")
+ danh sách radio. Ưu điểm: nhắc rule NGAY LÚC user đang chọn, thay vì chỉ
báo lỗi sau khi submit.

Xác nhận theo Williams 2026-09-05, xem ví dụ thật
`screen-descriptions/08-tai-xe-nhap-chi-phi-app-truck.md` (mục 2.2 — bottom-sheet "Loại phí phát sinh", "Người chi trả").

## Cấu trúc 2 tầng cho dữ liệu có 2 cấp phân nhóm (chuyến > điểm)

Khi dữ liệu tự nhiên có 2 cấp (vd: 1 chuyến gồm nhiều điểm, mỗi điểm có
nhiều chi phí), và màn hình mobile không đủ chỗ hiện hết chi tiết ở 1 màn:
- 1 màn **TỔNG HỢP** cấp cao (toàn chuyến) — gộp hiển thị theo nhóm con
  (điểm), mỗi nhóm chỉ hiện tóm tắt (loại phí + số tiền) + tổng phụ
  (subtotal), có thể thao tác (sửa/xoá) — nhưng ĐƠN VỊ THAO TÁC vẫn là
  từng dòng con (từng loại phí), không phải cả nhóm.
- 1 màn **CHI TIẾT** cấp thấp (từng điểm riêng) — read-only, hiện ĐẦY ĐỦ
  thông tin từng dòng (ảnh đầy đủ, ghi chú không rút gọn) — truy cập từ
  link "Xem chi tiết" gắn với từng điểm ở màn danh sách cấp cao hơn (Lộ
  trình).

Xác nhận theo Williams 2026-09-05, xem ví dụ thật
`screen-descriptions/08-tai-xe-nhap-chi-phi-app-truck.md` (mục 2.3 vs 2.5).

## Rule nghiệp vụ — mất quyền xem lại sau khi kết thúc chuyến

Sau khi tài xế bấm "Kết thúc chuyến", KHÔNG chỉ các nút Thêm/Sửa/Xoá bị
chặn — TOÀN BỘ thông tin của chuyến đó (kể cả chi phí phát sinh đã nhập)
KHÔNG còn xem lại được qua tab "Chuyến đi" nữa (màn hình trống). Hệ quả:
mọi thay đổi trạng thái xảy ra SAU khi chuyến kết thúc (vd GSVT duyệt/từ
chối chi phí phát sinh ở Portal B2B) sẽ KHÔNG BAO GIỜ hiển thị ngược lại
cho tài xế qua đường thông thường.

→ **Áp dụng khi thiết kế bất kỳ tính năng App Truck nào khác liên quan
"xem lại lịch sử chuyến"**: KHÔNG mặc định tài xế có thể tra cứu chuyến cũ
— cần hỏi riêng có tính năng "lịch sử chuyến" nào khác phục vụ việc này
không, nếu tính năng mới yêu cầu tra cứu ngược.

Xác nhận theo Williams 2026-09-05, xem ví dụ thật
`screen-descriptions/08-tai-xe-nhap-chi-phi-app-truck.md` (mục 1 EDGES, mục 3).

## Việc còn mở — chưa map, cần hỏi lại khi gặp

- Quy tắc màu nút primary (xem cảnh báo đầu file) — CHƯA có câu trả lời,
  không phải đã hỏi và bị bỏ qua.
- Toàn bộ layout/component chi tiết khác (header, spacing, typography,
  icon set...) của App Truck CHƯA được đối chiếu với 1 design system
  chính thức nào (không có file tương đương `ghn-ds-keymap-flat.json` cho
  mobile) — mọi mô tả trong `screen-descriptions/08-*.md` là quan sát trực
  tiếp từ ảnh chụp Figma, chưa verify qua token/component thật.
