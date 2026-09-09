# Quản lý chi phí phát sinh (5/9 Open Questions đã trả lời/confirm 2026-09-05 — còn 2 điểm PRD-vs-Figma lệch nhau + 2 câu phụ chờ Williams)

Loại khuôn: **khác** (đáp ứng slot #6 trong `00-checklist.md` — list quản
lý dạng duyệt/từ chối, chưa có mẫu này trong các màn trước).
Hệ thống: **Portal B2B** (cùng file Figma với màn 1, 2, 4, 5 — "B2B-PORTAL").
fileKey: `s2NE6ikwLnsZSUp97RBfof`. Node gốc: `17583:166696`, tên section
Figma **"Sprint 67 - Phase 2: Duyệt/ Từ chối chi phí phát sinh"**.
Link Figma: https://www.figma.com/design/s2NE6ikwLnsZSUp97RBfof/B2B-PORTAL?node-id=17583-166696

**✅ Đã tìm được PRD Phase 2 (2026-09-05)**: Williams cung cấp
**FT-3439 "[B2B Portal] Duyệt/từ chối ghi nhận chi phí phát sinh"**
(Confluence, cập nhật lần cuối 22/07/2026) — chính là ticket còn thiếu mà
mình flag ở Open Question #3 trước đó. Đã đọc và dùng làm nguồn chính thức
cho toàn bộ phần Duyệt/Từ chối (thay thế mọi rule trước đây suy đoán từ
Figma). Sau khi đối chiếu PRD FT-3439 với Figma, phát hiện **2 điểm lệch
nhau thật sự** giữa PRD text và UI Figma hiện tại — không tự chọn bên nào
đúng, đã flag rõ ở Open Question #1 và #2 (mục 5) để Williams quyết định.

**Nguồn PRD (2026-09-05)**:
- [FT-3336 [B2B Portal] GSVT xem chi phí phát sinh](https://giaohangnhanh.atlassian.net/wiki/spaces/PM/pages/1536852902)
  (cập nhật lần cuối 25/06/2026) — dùng cho phần XEM/LỌC/XUẤT (Phase 1).
- [FT-3439 [B2B Portal] Duyệt/từ chối ghi nhận chi phí phát sinh](https://giaohangnhanh.atlassian.net/wiki/spaces/PM/pages/1615757348)
  (cập nhật lần cuối 22/07/2026) — dùng cho phần DUYỆT/TỪ CHỐI (Phase 2).
  Bối cảnh nghiệp vụ: hiện GSVT phải tải Excel + xử lý thủ công 2 lần/tháng
  để tổng hợp gửi C&B chi trả lại tài xế và upload lên hệ thống "Chi phí
  Lương" — FT-3439 muốn thay bằng duyệt trực tiếp trên Portal, mục tiêu
  **giảm ≥ 70% thời gian xử lý** so với quy trình thủ công. Bên hưởng lợi:
  GSVT (giảm workload), C&B (có cơ sở chính xác chi trả tài xế), Ban dự án
  B2B/FIN (quản lý chi phí theo ngân sách), PnL pipeline (chỉ ghi nhận chi
  phí đã duyệt).

## 1. Bảng ngữ cảnh (6 chiều)

| Chiều | Nội dung |
|---|---|
| WHAT | Trang "Chi phí phát sinh" (URL `/b2b/ftl-cost/incidental-costs`) trong sidebar "Quản lí chi phí FTL" — cho GSVT xem danh sách chi phí phát sinh (tài xế nhập từ App Truck), lọc/tìm kiếm, xuất dữ liệu Excel, xem hình ảnh chứng từ, và **duyệt/từ chối từng chi phí hoặc hàng loạt** (FT-3439, Phase 2), để chi phí có trạng thái xác nhận trước khi dùng downstream (C&B chi trả tài xế, FIN quản lý ngân sách, PnL pipeline). |
| WHY | Quy trình cũ: GSVT tải Excel + xử lý thủ công 2 lần/tháng để xác nhận chi phí đúng, tổng hợp gửi C&B chi trả tài xế, và upload lên hệ thống "Chi phí Lương" — tốn thời gian, dễ sai sót, PnL chưa có cơ sở phân biệt chi phí đã xác nhận hay chưa. FT-3439 đặt mục tiêu giảm ≥70% thời gian xử lý bằng cách cho duyệt/từ chối trực tiếp trên Portal. |
| WHO | **Giám sát vận tải (GSVT)** — xác nhận chính thức bởi PRD FT-3439 ("Là GSVT, tôi muốn duyệt hoặc từ chối...") VÀ trực tiếp bởi Williams ("Người dùng là Giám sát vận tải duyệt", 2026-09-05) — hết nghi ngờ. Phân quyền theo ID nhân viên + Kho vận tải (chỉ GSVT thuộc kho tương ứng mới thấy/thao tác được dòng chi phí của kho đó — AC1). PRD cũng nhắc Ops/FIN cần dashboard tổng quan riêng theo chuyến/đơn hàng (ngoài scope màn này, theo FT-3336); C&B là bên NHẬN kết quả duyệt (không thao tác trực tiếp trên màn này). |
| HOW | (1) GSVT vào Portal B2B > "Quản lí chi phí FTL" > "Chi phí phát sinh". (2) Mặc định lọc theo trạng thái **"Chờ duyệt"**; có 4 tab: Tất cả/Chờ duyệt/Đã duyệt/Từ chối; lọc thêm theo ngày tạo, kho vận tải, khách hàng, mã chuyến... (3) Với chi phí "Chờ duyệt": bấm **Duyệt** hoặc **Từ chối** trên dòng đó — qua 1 nút "Phê duyệt" + chevron mở menu 2 mục "Duyệt"/"Từ chối" (**ĐÃ CONFIRM 2026-09-05 bởi Williams**) → mở popup xác nhận: Duyệt thì nhập **số tiền được duyệt*** (bắt buộc >0, mặc định = số tài xế nhập, sửa được, có giới hạn tối đa theo loại chi phí ở backend — **đã confirm không có rule % chênh lệch**, xem mục 3) + **người chi trả được duyệt*** (bắt buộc, mặc định = giá trị tài xế nhập, sửa được); Từ chối thì chọn **lý do từ chối*** bắt buộc. (4) Có thể xử lý HÀNG LOẠT: tick ≥2 dòng "Chờ duyệt" → thanh bulk action hiện 2 nút Duyệt/Từ chối → Duyệt hàng loạt dùng LUÔN số tiền tài xế đã nhập (không có form nhập số tiền); Từ chối hàng loạt chọn 1 lý do áp dụng chung cho tất cả dòng đã chọn. (5) Sau xác nhận, trạng thái chuyển 1 chiều **Chờ duyệt → Đã duyệt / Đã từ chối**, ghi nhận người duyệt (ID+họ tên) + thời gian (`dd/mm/yyyy hh:mm:ss`), hiện toast thành công. (6) Có thể "Tuỳ chỉnh cột" và "Xuất dữ liệu" (thêm 5 cột kết quả duyệt vào file export, tên `incidental_costs_<time>.xlsx`). |
| EDGES | Xem đầy đủ mục 3 — quan trọng nhất: (a) bulk duyệt/từ chối KHÔNG cho sửa số tiền/người chi trả (chỉ duyệt từng cái mới sửa được — PRD xác nhận rõ AC3); (b) từ chối luôn bắt buộc Lý do, duyệt thì số tiền+người chi trả bắt buộc, Lý do optional; (c) trạng thái CHỈ chuyển 1 chiều, không thể cập nhật lại dòng đã xử lý (AC6); (d) xử lý hàng loạt nếu có dòng bị người khác xử lý trước (race condition) → hệ thống BỎ QUA dòng đó, vẫn xử lý các dòng hợp lệ còn lại, báo rõ số lượng thành công/thất bại kiểu "Duyệt thành công \<x/n\> chi phí. \<n-x\> chi phí không thể duyệt do đã được xử lý trước đó." (AC3/AC6) — **pattern giống hệt "kết quả xử lý một phần" đã ghi ở `04-modal-ket-qua-upload-excel.md`**, nên propagate thành nguyên tắc chung; (e) chỉ chi phí "Đã duyệt" mới ghi nhận vào PnL (theo 4 nhóm: bốc xếp đầu lấy/đầu giao, chi phí khác đầu lấy/đầu giao), số tiền ghi PnL = số tiền GSVT đã duyệt, KHÔNG phải số tài xế nhập (AC9). |
| HISTORY | FT-3336 (Phase 1, xem/lọc/xuất) cập nhật lần cuối 25/06/2026 → FT-3439 (Phase 2, duyệt/từ chối) cập nhật lần cuối 22/07/2026, tiếp nối trực tiếp FT-3336 (cùng nhắc lại FT-3267 App Truck nhập chi phí, và FT-3366 xem danh sách trên Portal — coi như chuỗi 3 ticket: nhập → xem → duyệt). |

## 2. Cấu trúc màn theo state (nhiều state — loại khuôn "khác")

### 2.1. Danh sách chính (`17583:166698` — state "Default")

**Khu vực A — Sidebar + Header**: giống pattern đã biết (mục con "Chi phí
phát sinh" trong menu "Quản lí chi phí FTL", tương tự
`05-upload-chi-phi-thue-xe-ncc.md`) — cũng là trang chính (top-level qua
sub-menu), không phải trang con, không có nút Trở về (đúng quy tắc đã ghi).

**Khu vực B — Page Heading**: "Chi phí phát sinh" (Bold), không có action
cạnh tiêu đề.

**Khu vực C — Tabs lọc trạng thái**: `Tabs / Tabs oragism` — 4 tab: **Tất
cả** (mặc định active) | **Chờ duyệt** | **Đã duyệt** | **Từ chối**.

**Khu vực D — Toolbar**: `[Bộ lọc] [Search: "Tìm kiếm theo mã đơn, mã
chuyến hoặc tên tài xế"] ... [Tuỳ chỉnh cột] [Xuất dữ liệu] [Duyệt hàng
loạt]` — khớp đúng thứ tự toolbar cố định đã ghi trong
`role-to-component-mapping.md`. **Duyệt hàng loạt** hiện màu **XANH DƯƠNG
Fill** chứ không phải Fill cam — **ĐÃ CONFIRM 2026-09-05 (Williams)**: đây
là biến thể CỐ Ý, vì nút "Phê duyệt" đơn lẻ (cột Thao tác) đã dùng Fill
cam rồi, nên nút Duyệt-hàng-loạt cần 1 màu Fill khác để người dùng phân
biệt rõ 2 hành động khác phạm vi (xử lý 1 dòng vs xử lý nhiều dòng) — Fill
xanh dương đóng vai trò "action chính tương đương nhưng khác phạm vi", KHÔNG
phải action ngang hàng/thứ cấp. → **Rule mới cần propagate**: khi 1 toolbar/
màn đã có sẵn 1 nút Fill cam cho hành động ĐƠN LẺ, nút hành động HÀNG LOẠT
tương ứng (cùng bản chất nhưng khác phạm vi tác động) dùng Fill xanh dương
để tránh 2 Fill cam cạnh tranh nhau và giúp phân biệt phạm vi tác động —
xem mục 4. Nút mặc định DISABLE kèm tooltip "Tích chọn ít nhất 1 chi phí ở
cột đầu bảng để xử lý hàng loạt" — pattern giống hệt nút Xoá-dòng-cuối
(disable + tooltip giải thích) đã ghi trong `role-to-component-mapping.md`.

**Khu vực E — Bảng dữ liệu** (11 cột, 2 cột đầu PIN — Khách hàng + Loại
điểm):
- Checkbox (chọn dòng để xử lý hàng loạt)
- **Khách hàng**: tên KH (bold) + chip xanh dương "Mã chuyến: [mã]"
- **Loại điểm**: gộp 2 thông tin trong 1 cột — Địa điểm (bold, text chính,
  vd "KFM_HCM_BCH-TMDV2 Mizuki Park") + badge nhỏ bên dưới ("Điểm lấy"
  cam / "Điểm giao" xanh dương) — **ví dụ tốt cho nguyên tắc "gộp thông
  tin liên quan vào 1 cột" đã ghi trong `role-to-component-mapping.md`**
- **Trạng thái**: badge — "Chờ duyệt" (xám/vàng nhạt), "Đã duyệt" (xanh
  lá), "Từ chối" (đỏ)
- **Loại chi phí**: text thường (vd "Phí giữ xe", "Phí bốc xếp") — KHÔNG
  phải badge như suy đoán ban đầu
- **Người chi trả**: text ("Tài xế" / "Giám sát vận tải" / có thể "Admin"
  theo PRD)
- **Tài xế**: 2 dòng — Họ tên (bold) + ID nhân viên bên dưới (vd "Trần
  Ngọc Dũng" / "13121344") — khớp PRD field "Người tạo" nhưng header đặt
  tên cụ thể hơn là "Tài xế"
- **Số tiền ghi nhận**: số tiền tài xế nhập (vd "30.000đ") + nút [Xem ảnh]
  (Outline cam, icon mắt) ngay dưới — đây chính là field "Hình ảnh" của
  PRD, gộp luôn vào cột số tiền thay vì tách cột riêng
- **Số tiền đã duyệt**: "-" nếu Chờ duyệt; số tiền GSVT xác nhận (có thể
  khác số ghi nhận, vd dòng "Tiền phí bốc xếp" 70.000đ khác amount gốc)
  nếu Đã duyệt; vẫn "-" nếu Từ chối (đã xác nhận — hàng Từ chối không có
  số tiền đã duyệt)
- **Người chi trả đã duyệt**: tương tự — "-" nếu chưa xử lý, giá trị GSVT
  xác nhận nếu Đã duyệt (có thể khác Người chi trả gốc)
- **Kho vận tải**: format "[Code] - [tên]" (vd "LFHCM - Linehaul Freight
  HCM") — khớp pattern "Mã — Tên" đã khuyến khích
- **Thao tác**: nút "Phê duyệt" kèm chevron dropdown — Fill cam khi dòng
  "Chờ duyệt" (còn xử lý được), Outline xám mờ/disable khi đã "Đã duyệt"
  hoặc "Từ chối" (không xử lý lại được). **⚠️ LỆCH với PRD FT-3439 (AC1)**:
  Figma hiện vẫn HIỂN THỊ checkbox + nút "Phê duyệt" (chỉ disable) trên
  dòng đã xử lý, nhưng PRD ghi rõ dòng "Đã duyệt"/"Từ chối" **KHÔNG hiển
  thị checkbox và button hành động** (ẩn hẳn, không phải disable) — xem
  Open Question #1 (mục 5).

Có Pagination chuẩn ở cuối bảng.

### 2.2. Xử lý hàng loạt — state "Chọn nhiều dòng" (`21640:31587`)

Khi tick chọn ≥1 dòng "Chờ duyệt" (ở tab "Chờ duyệt"): dòng được chọn có
nền cam nhạt + checkbox tô cam; header checkbox chuyển icon
"trừ"/indeterminate (cam) khi chọn 1 phần; nút "Duyệt hàng loạt" chuyển
active (Fill xanh dương). Xuất hiện thêm **banner cảnh báo** (nền xanh
dương nhạt, icon info): *"Duyệt hàng loạt sẽ không cho phép chỉnh sửa số
tiền và người chi trả. Muốn chỉnh sửa, vui lòng duyệt từng chi phí."* —
đây là rule nghiệp vụ QUAN TRỌNG cần propagate.

### 2.3. Modal "Phê duyệt chi phí" — Duyệt từng chi phí (`17634:177925`, `17634:179731` lỗi, `17634:179934`)

- Header: "Phê duyệt chi phí" + nút đóng (X)
- Block thông tin read-only (nền xám nhạt): Khách hàng, Mã chuyến, Loại
  điểm (badge + địa điểm), [Tên loại chi phí]: số tiền ghi nhận, Người
  chi trả, Hình ảnh: [Xem hình ảnh]
- Divider nét đứt
- Form:
  - **"Nhập số tiền được duyệt (VNĐ)" \*** — bắt buộc, prefill = số tiền
    ghi nhận nhưng CHO PHÉP sửa khác (chỉ nhận số, có ghi chú validate
    "Chỉ cho nhập số, không kí tự khác"). **ĐÃ CONFIRM 2026-09-05
    (Williams)**: KHÔNG có rule giới hạn % chênh lệch giữa "số tiền được
    duyệt" và "số tiền ghi nhận", nhưng CÓ define giới hạn SỐ TIỀN TỐI ĐA
    riêng cho từng loại chi phí ở tầng backend (khớp đúng câu PRD "Follow
    quy tắc số tiền tối đa theo loại phí" ở AC2) — validate lỗi nếu vượt
    ngưỡng tối đa của loại chi phí đó là 1 case cần có trong spec, nhưng
    con số ngưỡng cụ thể không cần thể hiện trong design spec (nằm ở cấu
    hình backend).
  - **"Người chi trả" \*** — bắt buộc, dropdown, prefill = người chi trả
    gốc nhưng CHO PHÉP đổi khác
  - **"Lý do"** — optional, textarea, placeholder "Nhập lý do duyệt"
- Footer: [Đóng] (Outline Grey) + [Duyệt] (Fill cam)
- Validate-on-submit: để trống số tiền rồi bấm Duyệt → viền đỏ + text
  "⚠ Vui lòng nhập số tiền được duyệt" — khớp đúng quy tắc primary
  button validate-on-submit đã ghi.

### 2.4. Modal "Phê duyệt chi phí" — Từ chối từng chi phí (`17634:182894`, `17634:182936`)

- Giống hệt block thông tin read-only ở trên (title modal DÙNG CHUNG
  "Phê duyệt chi phí", không đổi thành "Từ chối chi phí")
- Form: CHỈ 1 field — **"Lý do" \*** — bắt buộc, textarea, placeholder
  "Nhập lý do từ chối" (đã confirm lại bằng screenshot trực tiếp node
  `17634:182894`).
  **⚠️ LỆCH với PRD FT-3439 (AC4/AC5)**: PRD ghi rõ Lý do từ chối phải là
  **chọn từ danh sách lý do được cấu hình sẵn** (dropdown/select), không
  phải nhập tự do — PRD liệt kê danh sách lý do gợi ý: "Sai chi phí",
  "Chi phí không thuộc phạm vi dự án", "Thiếu chứng từ", "Trùng lặp",
  "…(updating)" (danh sách CHƯA đầy đủ, PO còn đang cập nhật). Nhưng Figma
  hiện tại là 1 textarea nhập tự do, không phải dropdown. 2 cách hiểu khác
  hẳn nhau về component (Input text vs Select) — xem Open Question #2
  (mục 5), cần Williams xác nhận bản nào là mới nhất trước khi build spec.
- Footer: [Đóng] (Outline Grey) + [Từ chối] (**Fill ĐỎ/destructive** —
  dùng đúng vì đây là hành động thật sự chặn/từ chối tiền, khớp quy tắc
  "Outline/Fill destructive chỉ dành cho hành động phá huỷ dữ liệu")

### 2.5. Modal xử lý hàng loạt — Duyệt (`17657:190182`) và Từ chối (`17659:195032`)

- Header động theo số lượng đã chọn: "Duyệt 5 chi phí" / "Từ chối duyệt 5
  chi phí"
- "Tổng tiền: [tổng số tiền các dòng đã chọn]đ"
- Danh sách các chi phí đã chọn (scroll được), mỗi dòng đánh số thứ tự
  (badge tròn xanh dương "1", "2"...) + block thông tin read-only y hệt
  modal đơn lẻ NHƯNG **KHÔNG có nút Xem ảnh, KHÔNG có field sửa số
  tiền/người chi trả** — khớp đúng banner cảnh báo ở mục 2.2
- Form: "Lý do" — optional khi Duyệt hàng loạt, **bắt buộc (\*)** khi Từ
  chối hàng loạt (nhất quán với bản đơn lẻ)
- Footer: [Đóng] (Outline Grey) + [Duyệt] (Fill cam) hoặc [Từ chối]
  (Fill đỏ)

### 2.6. Panel "Tuỳ chỉnh cột" (`21640:38899`)

Dropdown panel (không phải modal) mở từ nút "Tuỳ chỉnh cột", căn phải
ngay dưới nút:
- Checkbox tổng "Hiển thị tất cả" (indeterminate khi chỉ chọn 1 phần)
- Danh sách cột optional: Người chi trả ✓, Tài xế ✓, Mã đơn hàng ☐, Nhà
  cung cấp ☐, Ghi chú ✓, Cập nhật lúc ☐ (mặc định 1 số cột ẩn sẵn)
- Footer: [↺ Đặt lại] (Outline) + [Huỷ] (Outline Grey) + [Áp dụng] (Fill
  cam)
- Khớp PRD AC1: "Cho phép bật/tắt cột (column visibility) nhưng không
  làm mất dữ liệu."

## 3. Business rule (PRD FT-3336 + FT-3439, đã đối chiếu Figma)

**Bộ lọc** (theo PRD text — vẫn CHƯA verify hết bằng Figma panel "Bộ lọc"
thật, xem Open Question #4): Trạng thái (Tất cả/Chờ duyệt/Đã duyệt/Từ
chối, **mặc định "Chờ duyệt"** — xác nhận bởi AC8), Ngày tạo, Kho vận tải,
Khách hàng, Mã chuyến. Áp dụng filter tức thời.

**Export**: theo đúng bộ lọc hiện tại, tên file `incidental_costs_<time>.xlsx`,
sau FT-3439 export bổ sung thêm 5 cột: Số tiền được duyệt, Người chi trả
được duyệt, Trạng thái (kèm lý do từ chối nếu có), Cập nhật bởi, Ngày cập
nhật (AC7).

**Phân quyền xem/thao tác**: theo ID nhân viên + Kho vận tải — chỉ GSVT
thuộc kho vận tải tương ứng mới thấy và duyệt/từ chối được dòng chi phí
của kho đó (AC1).

**Rule chọn dòng xử lý (AC1)**: mỗi dòng "Chờ duyệt" có checkbox + action
Duyệt/Từ chối. Chọn ≥2 dòng "Chờ duyệt" → hiện bulk action bar 2 nút Duyệt/
Từ chối. Checkbox "Chọn tất cả" CHỈ chọn các dòng "Chờ duyệt" đang có trên
trang hiện tại, không chọn dòng đã xử lý. Dòng đã "Đã duyệt"/"Từ chối"
theo PRD **không hiển thị checkbox/action** (xem lệch với Figma ở mục 2.1
và Open Question #1).

**Rule Duyệt đơn lẻ (AC2)**: Số tiền được duyệt bắt buộc, chỉ nhận số
dương >0, định dạng phân tách hàng nghìn, mặc định = số tài xế nhập, GSVT
sửa được nhưng phải theo "quy tắc số tiền tối đa theo loại phí" — **ĐÃ
CONFIRM 2026-09-05 (Williams)**: không có rule % chênh lệch so với số ghi
nhận, nhưng CÓ define giới hạn tối đa riêng cho từng loại chi phí ở tầng
backend (validate lỗi khi vượt ngưỡng là 1 case cần có trong spec; ngưỡng
cụ thể không cần thể hiện ở design spec). Người chi trả được duyệt bắt buộc chọn,
mặc định = giá trị tài xế nhập, sửa được. Xác nhận xong: trạng thái → Đã
duyệt, ghi Cập nhật bởi (ID+họ tên) + Ngày cập nhật (`dd/mm/yyyy hh:mm:ss`),
toast "Duyệt chi phí thành công".

**Rule Duyệt hàng loạt (AC3)**: KHÔNG hiển thị form nhập số tiền — số tiền
được duyệt LUÔN LUÔN = số tiền tài xế đã nhập cho từng dòng tương ứng
(không cho sửa khác, khác hẳn duyệt đơn lẻ). Popup xác nhận nội dung
"Bạn đang duyệt N chi phí phát sinh. Số tiền được duyệt sẽ bằng số tiền
tài xế đã nhập. Xác nhận?". Toast thành công: "Duyệt thành công \<n\> chi
phí". Nếu có dòng lỗi do đã bị xử lý bởi người khác giữa lúc chọn và lúc
xác nhận: vẫn xử lý các dòng hợp lệ còn lại, toast "Duyệt thành công
\<x/n\> chi phí. \<n-x\> chi phí không thể duyệt do đã được xử lý trước
đó." — **nên propagate thành pattern chung cho MỌI bulk-action có khả năng
race-condition, không riêng màn này** (xem mục 4).

**Rule Từ chối đơn lẻ (AC4)**: chỉ 1 field Lý do từ chối, bắt buộc, PRD
mô tả là CHỌN từ danh sách cấu hình sẵn (Figma hiện là textarea tự do —
lệch, xem Open Question #2). Xác nhận xong: trạng thái → Đã từ chối, ghi
Lý do + Cập nhật bởi + Ngày cập nhật, toast "Từ chối chi phí thành công".

**Rule Từ chối hàng loạt (AC5)**: 1 Lý do áp dụng chung cho TẤT CẢ dòng đã
chọn (không cho mỗi dòng 1 lý do khác nhau). Toast thành công "Từ chối
thành công N chi phí"; xử lý lỗi race-condition tương tự AC3.

**Rule chuyển trạng thái 1 chiều (AC6)**: chỉ Chờ duyệt → Đã duyệt hoặc
Chờ duyệt → Đã từ chối; dòng đã Đã duyệt/Đã từ chối KHÔNG thể cập nhật lại
dưới bất kỳ hình thức nào (kể cả sửa số tiền sau duyệt) — đây cũng là 1
trong các mục Out of scope tường minh.

**Rule ghi nhận PnL (AC9)**: CHỈ chi phí "Đã duyệt" được tính vào PnL
chuyến đi, số tiền ghi PnL = số tiền GSVT đã duyệt (không phải số tài xế
nhập), phân theo 4 nhóm: Chi phí bốc xếp đầu lấy / Chi phí phát sinh khác
đầu lấy / Chi phí bốc xếp đầu giao / Chi phí phát sinh khác đầu giao.
Chi phí "Chờ duyệt" và "Đã từ chối" KHÔNG ghi PnL.

**Danh sách lý do từ chối (PRD, đang cập nhật — chưa chốt)**: Sai chi phí;
Chi phí không thuộc phạm vi dự án; Thiếu chứng từ; Trùng lặp; …

**Out of scope (theo PRD FT-3336 + FT-3439)**: quy trình phê duyệt NHIỀU
CẤP (multi-level workflow); chỉnh sửa chi phí đã duyệt/đã từ chối (revert
trạng thái, sửa số tiền sau duyệt); thông báo (notification) cho tài xế
khi bị từ chối; cấu hình danh sách lý do từ chối (thêm/sửa/xoá lý do trên
Portal); quy trình chi trả tài xế qua kỳ lương; sửa/thêm chi phí phát sinh
(khác với sửa số tiền KHI DUYỆT); dashboard tổng quan cho Ops/FIN theo
chuyến/đơn hàng.

**Q&A còn mở trong chính PRD FT-3439 (chưa có câu trả lời từ PO)**: "Hạn
duyệt chi phí này bao lâu kể từ ngày tạo, hoặc cutoff time để tự động
duyệt/từ chối? (Có follow theo hạn chốt PnL của tháng T-1 không?)" — đây
KHÔNG phải câu hỏi của mình, mà là câu hỏi mở sẵn có trong PRD, note lại để
Williams biết khi build spec cần chờ PO trả lời câu này trước (có thể ảnh
hưởng tới việc có cần thêm 1 rule auto-expire hay không).

## 4. Áp dụng được / bổ sung cho `role-to-component-mapping.md`

Khớp tốt: Table pattern (pin cột định danh, gộp thông tin liên quan 1
cột, format "Mã — Tên"), disable+tooltip cho hành động cần điều kiện tối
thiểu (giống rule xoá-dòng-cuối), Outline Grey cho Đóng, Fill đỏ ĐÚNG chỗ
cho hành động destructive thật (Từ chối), validate-on-submit cho primary
button.

Mới, cần propagate (đã confirm 2026-09-05, sẵn sàng đưa vào
`role-to-component-mapping.md`):
- **Rule "Fill xanh dương cho hành động hàng loạt khi đã có Fill cam cho
  hành động đơn lẻ tương ứng"**: khi 1 màn/toolbar đã có sẵn nút Fill cam
  cho hành động xử lý ĐƠN LẺ (ví dụ "Phê duyệt" trên từng dòng), nút hành
  động HÀNG LOẠT cùng bản chất (ví dụ "Duyệt hàng loạt") dùng **Fill xanh
  dương** thay vì Fill cam — để (a) tránh 2 nút Fill cam cạnh tranh nhau
  trên cùng màn, (b) giúp người dùng phân biệt ngay phạm vi tác động (1
  dòng vs nhiều dòng) chỉ qua màu sắc. Khác với rule "Outline/Fill
  destructive" (dựa trên MỨC ĐỘ NGUY HIỂM của hành động) — rule này dựa
  trên PHẠM VI TÁC ĐỘNG (đơn lẻ vs hàng loạt).
- **Pattern "chevron mở menu 2 hành động trên 1 nút"**: nút hành động
  chính (ví dụ "Phê duyệt") kèm chevron, bấm mở dropdown/menu gồm các
  hành động con liên quan (ví dụ "Duyệt" / "Từ chối") — dùng khi 1 dòng dữ
  liệu có ≥2 hành động xử lý loại trừ lẫn nhau (chỉ chọn 1 trong 2) và
  muốn tiết kiệm không gian cột thay vì hiện 2 nút riêng.

Mới, cần propagate (sau khi Williams confirm ở mục 5):
- Pattern "Panel Tuỳ chỉnh cột" (column visibility dropdown) — chưa có
  trong bảng.
- Pattern "Modal xử lý hàng loạt" (numbered list + tổng tiền + rule ẩn
  field sửa) — tương tự nhưng khác mục đích so với "Modal kết quả xử lý
  hàng loạt" (upload Excel) đã ghi — đây là modal XÁC NHẬN TRƯỚC hành
  động, không phải modal kết quả SAU hành động.
- Banner cảnh báo trong luồng bulk-action (nền xanh dương nhạt + icon
  info, giải thích giới hạn của thao tác hàng loạt) — pattern mới.
- Rule: bulk action luôn giới hạn khả năng chỉnh sửa so với xử lý từng
  dòng riêng lẻ — có thể là nguyên tắc chung cho MỌI tính năng bulk-action
  tương lai, không riêng màn này (cần Williams xác nhận có generalize
  được không).
- **MỚI, xác nhận bởi PRD FT-3439 (không chỉ suy đoán Figma nữa)**: pattern
  "toast báo kết quả xử lý hàng loạt một phần khi có race-condition" —
  "Duyệt thành công \<x/n\>. \<n-x\> không thể xử lý do đã được xử lý
  trước đó." Đây là bản RÚT GỌN (chỉ 1 dòng toast, không phải modal riêng)
  của nguyên tắc "kết quả xử lý một phần" đã ghi ở
  `04-modal-ket-qua-upload-excel.md` (ở đó dùng modal đầy đủ vì import
  Excel có nhiều dòng lỗi cần liệt kê chi tiết; ở đây chỉ cần 1 câu toast
  vì lỗi RẤT hiếm — do race-condition, không phải lỗi dữ liệu hàng loạt).
  → Đề xuất rule chung: "khi bulk action có thể có 1 phần thất bại, luôn
  báo rõ số lượng thành công/thất bại trong 1 câu — dùng modal chi tiết
  nếu số dòng lỗi có thể nhiều/cần xem từng dòng (như import Excel), dùng
  toast ngắn nếu lỗi hiếm và chỉ cần biết số lượng (như race-condition
  duyệt/từ chối)."

## 5. Open Questions — cần Williams xác nhận trước khi build spec.json

**Đã trả lời/confirm 2026-09-05 (không còn mở)**:
- ~~Nút "Duyệt hàng loạt" màu xanh dương~~ → Williams confirm: cố ý, xem
  mục 2.1/4.
- ~~Chevron "Phê duyệt" mở menu Duyệt/Từ chối~~ → Williams confirm: đúng.
- ~~PRD nào cho phần Duyệt/Từ chối~~ → đã tìm ra: FT-3439.
- ~~WHO thực hiện Duyệt/Từ chối~~ → Williams confirm: Giám sát vận tải.
- ~~Giới hạn chênh lệch "Số tiền được duyệt" vs "Số tiền ghi nhận"~~ →
  Williams confirm: không có rule %, nhưng có giới hạn tối đa theo loại
  chi phí ở backend.

**Còn mở**:

1. **PRD-vs-Figma lệch nhau, dòng đã xử lý (Đã duyệt/Từ chối)**: PRD
   FT-3439 (AC1) nói KHÔNG hiển thị checkbox/nút hành động trên dòng đã
   xử lý (ẩn hẳn), nhưng Figma hiện tại (đã screenshot lại, node
   `17583:166698`) vẫn hiển thị checkbox + nút "Phê duyệt" chỉ ở dạng
   DISABLE/xám mờ, không ẩn. Bản nào là đúng/mới nhất — build theo PRD
   (ẩn hẳn) hay theo Figma (disable)?
2. **PRD-vs-Figma lệch nhau, field Lý do từ chối**: PRD FT-3439 (AC4/AC5)
   mô tả Lý do từ chối là CHỌN từ danh sách cấu hình sẵn (dropdown/select
   — PRD gợi ý: "Sai chi phí", "Chi phí không thuộc phạm vi dự án",
   "Thiếu chứng từ", "Trùng lặp", "…(updating)"), nhưng Figma hiện tại
   (đã screenshot lại, node `17634:182894`) là 1 ô textarea nhập tự do,
   placeholder "Nhập lý do từ chối". Build theo PRD (dropdown, cần danh
   sách lý do đầy đủ từ PO) hay theo Figma (textarea tự do)?
3. Bộ lọc chi tiết (Ngày tạo, Kho vận tải, Khách hàng, Mã chuyến...) lấy
   từ text PRD, chưa verify từng field bằng Figma panel "Bộ lọc" thật —
   cần verify kỹ hơn hay tin PRD là đủ?
4. (Ghi chú, không phải câu hỏi của mình) PRD FT-3439 tự có 1 Q&A còn bỏ
   ngỏ: "Hạn duyệt chi phí bao lâu kể từ ngày tạo, hoặc cutoff time để tự
   động duyệt/từ chối? (Có follow hạn chốt PnL tháng T-1 không?)" — PO
   chưa trả lời trong PRD. Williams có cần hỏi lại PO câu này trước khi
   chốt spec không, hay coi như chưa cần auto-expire ở bản đầu?
