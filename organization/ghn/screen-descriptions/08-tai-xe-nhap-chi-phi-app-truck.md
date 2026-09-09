# Tài xế nhập chi phí phát sinh - App Truck (đã xong — 5/5 Open Questions đã trả lời/confirm, 2026-09-05)

Loại khuôn: **khác** (form nhập liệu + danh sách + nhiều state phụ trợ,
trên **MOBILE APP**, không phải Portal B2B web). Đáp ứng slot #8 (optional,
slot cuối) trong `00-checklist.md`.

**⚠️ QUAN TRỌNG — đây là màn ĐẦU TIÊN thuộc 1 HỆ THỐNG KHÁC hẳn**: tất cả
7 màn trước đều thuộc **Portal B2B** (web, fileKey `s2NE6ikwLnsZSUp97RBfof`).
Màn này thuộc **App Truck** (mobile app của tài xế), fileKey KHÁC:
`2RLeRDt6tLCZrfCFqyMZUi` ("App-B2B-Driver"). **✅ ĐÃ CONFIRM 2026-09-05
(Williams)**: tách riêng thành 1 file
[`role-to-component-mapping-app-truck.md`](role-to-component-mapping-app-truck.md)
— KHÔNG gộp chung với bảng tra Portal B2B web. Lý do quan trọng Williams
nêu: đây là **design của 1 Designer CŨ trước đây**, Williams không rõ ngụ
ý UX đằng sau các lựa chọn màu sắc/style — nên các pattern ở màn này (đặc
biệt là quy tắc màu nút primary, xem mục 2) được ghi lại như QUAN SÁT
THUẦN TUÝ, KHÔNG coi là "quy tắc đã xác nhận có chủ đích" như các pattern
Portal B2B — cần thận trọng khi build spec, có thể cần chuẩn hoá lại thay
vì sao chép y nguyên.

Node gốc: `1250:2371`. Link Figma:
https://www.figma.com/design/2RLeRDt6tLCZrfCFqyMZUi/App-B2B-DRIVER?node-id=1250-2371
Ngoài ra Williams gửi thêm 1 file THAM KHẢO tổng quan toàn bộ luồng App
Truck (không phải phạm vi tài liệu này, chỉ để hiểu context lớn hơn):
https://www.figma.com/design/7urnQBIkHJX7AmiWWpMDnl/App-Truck?node-id=1-111
(fileKey `7urnQBIkHJX7AmiWWpMDnl`, CHƯA research chi tiết).

Các node con đã research (fileKey `2RLeRDt6tLCZrfCFqyMZUi`):
- `1250:2372` "Lộ trình" — màn hình chính của chuyến đi (entry point)
- `1250:2748` "Chi tiết phí phát sinh" — xem danh sách đã nhập, gộp theo điểm
- `1250:3536` "Loại phí phát sinh" — form nhập mới + bottom-sheet chọn loại phí
- `1250:3698` "Người chi trả" — bottom-sheet chọn người chi trả
- `1252:5857` "Xác nhận xoá phí" — modal confirm xoá
- Chưa research trực tiếp (suy từ tên node + PRD): `1250:3051`/`1250:3804`/
  `1250:4777` "Chọn điểm có phí phát sinh", `1252:4597` "Chọn điểm giao",
  `1252:4804` "Xác nhận điểm giao", `1252:5277` "Confirm chưa lưu thay
  đổi", `1252:6296` "Xoá phí thành công", `1250:4546`/`1250:4702` "Chi
  tiết đơn hàng_Có phí"/"_Không có phí", `2055:5722` "Popup xoá".

**Nguồn PRD (2026-09-05)**: [FT-3267 "\[App Truck\] Ghi nhận chi phí phát
sinh trên chuyến FTL"](https://giaohangnhanh.atlassian.net/wiki/spaces/PM/pages/1536721100)
(Confluence, cập nhật lần cuối 25/06/2026) — **gộp CHUNG 2 user story/2
Jira ticket khác nhau trong CÙNG 1 page**:
- **FT-3267**: tài xế THÊM MỚI chi phí phát sinh tại điểm lấy/giao.
- **FT-3365**: tài xế XEM/SỬA/XOÁ chi phí đã nhập, trước khi kết thúc chuyến.

**Liên kết ngược quan trọng**: đây chính là NGUỒN DỮ LIỆU ĐẦU VÀO cho toàn
bộ luồng "chi phí phát sinh" đã ghi ở `06-quan-ly-chi-phi-phat-sinh.md`
(GSVT duyệt/từ chối trên Portal B2B) — tài xế nhập ở màn này, GSVT xử lý ở
màn `06`. Cùng 1 khái niệm nghiệp vụ "chi phí phát sinh", nhìn từ 2 phía
(tài xế nhập liệu vs GSVT duyệt) trên 2 hệ thống khác nhau (mobile vs web).

## 1. Bảng ngữ cảnh (6 chiều)

| Chiều | Nội dung |
|---|---|
| WHAT | Cho phép tài xế FTL, ngay trên App Truck, **ghi nhận** (FT-3267) và **xem lại/chỉnh sửa/xoá** (FT-3365) chi phí phát sinh tại từng điểm lấy/giao của chuyến đi hiện tại, kèm ảnh chứng từ — trước khi chuyến kết thúc. |
| WHY | Trước đây các khoản chi phí phát sinh (phí bốc xếp, giữ xe, lobby...) chỉ được ghi nhận thủ công qua group chat + file Excel → thiếu dữ liệu thực tế, không có bằng chứng chuẩn để C&B hoàn ứng tài xế, khó giải trình Internal Audit, GSVT phải tổng hợp thủ công cho FIN tính PnL. Chi phí phát sinh chiếm ~3% tổng chi phí mỗi dự án — đủ lớn để cần chuẩn hoá on-system. Mục tiêu đo: ≥80% chuyến FTL có chi phí phát sinh ghi nhận qua app (thay vì thủ công). |
| WHO | **Tài xế FTL** đang thực hiện chuyến đi (chỉ thao tác được chi phí của CHÍNH chuyến mình đang chạy, gắn theo `TripID`). Không có vai trò khác thao tác trên màn hình mobile này (GSVT chỉ xử lý ở phía Portal B2B, xem `06`). |
| HOW | (1) Từ màn "Lộ trình" (đang thực hiện chuyến), tài xế bấm **"+ Nhập phí"**. (2) Chọn Điểm (dropdown, giới hạn trong các điểm của lộ trình hiện tại) → chọn Loại chi phí (bottom-sheet radio, mỗi loại chỉ nhập 1 lần/điểm) → nhập Số tiền (validate >0 và < định mức tối đa theo loại phí) → chọn Người chi trả (bottom-sheet radio: "Tôi" mặc định / "Giám sát vận tải") → đính kèm 1-2 ảnh chứng từ (chụp hoặc chọn từ gallery) → Ghi chú (optional) → có thể thêm NHIỀU loại phí cùng lúc trước khi lưu, xoá dòng vừa thêm nếu chưa lưu → bấm "Lưu thông tin". (3) Xem lại: vào "Chi tiết phí phát sinh" — danh sách GỘP THEO ĐIỂM, mỗi điểm hiện các dòng chi phí + "Tổng phí" + nút "Sửa phí". (4) Sửa: mở lại đúng form nhập liệu, sửa xong bấm Lưu — validate theo CẤU HÌNH MỚI NHẤT (nếu admin đổi định mức sau khi tài xế đã nhập, dữ liệu cũ giữ nguyên, chỉ áp dụng validate mới khi sửa lại). (5) Xoá: bấm xoá 1 dòng → modal confirm "Xoá phí phát sinh?" → xác nhận → xoá vĩnh viễn (không khôi phục được) → toast/màn "Xoá phí thành công". |
| EDGES | (a) Ràng buộc trùng lặp: 1 LOẠI chi phí tại 1 ĐIỂM chỉ ghi nhận 1 lần (không cho nhập trùng); (b) **ĐÃ CONFIRM 2026-09-05 (Williams)**: khi tài xế bấm **"Kết thúc chuyến"**, KHÔNG chỉ Thêm/Sửa/Xoá bị chặn — toàn bộ chuyến đó BIẾN MẤT khỏi tầm nhìn của tài xế: "màn hình ở tab chuyến đi là màn hình trống" — tức tài xế KHÔNG còn xem lại được BẤT KỲ thông tin gì (kể cả chi phí đã nhập) của chuyến đã kết thúc qua đường thông thường (tab "Chuyến đi") — mạnh hơn "read-only" đơn thuần mà AC3 (FT-3365) mô tả; (c) admin đổi cấu hình loại phí/định mức SAU khi tài xế đã nhập → dữ liệu CŨ giữ nguyên không đổi, nhưng SỬA LẠI thì validate theo cấu hình MỚI; (d) **ĐÃ CONFIRM 2026-09-05 (Williams)**: khi GSVT từ chối 1 chi phí (ở Portal B2B, xem `06`) — tài xế **KHÔNG** nhìn thấy trạng thái "đã từ chối" trên app (nhất quán với (b): sau khi chuyến kết thúc, tài xế không xem lại được thông tin chuyến đó nữa, nên trạng thái duyệt/từ chối — vốn chỉ xảy ra SAU khi chuyến kết thúc — không có cơ hội hiển thị ngược lại phía tài xế); (e) validate số tiền theo định mức tối đa CỤ THỂ TỪNG LOẠI PHÍ (không phải 1 ngưỡng chung) — lỗi "Số tiền vượt định mức vui lòng liên hệ GSVT" — **đây chính là "quy tắc số tiền tối đa theo loại phí" đã nhắc tới ở `06` (AC2 của FT-3439) mà lúc đó chưa rõ nguồn — nay xác nhận: định mức này được set NGAY TỪ ĐẦU VÀO ở màn tài xế nhập, không phải rule riêng của bước GSVT duyệt**. |
| HISTORY | FT-3267 (thêm mới) + FT-3365 (xem/sửa/xoá) — cùng 1 Confluence page, cập nhật lần cuối 25/06/2026, cùng ngày với PRD FT-3336 (GSVT xem chi phí phát sinh, dùng ở `06`) — 3 ticket FT-3267/FT-3336/FT-3439 tạo thành chuỗi: tài xế nhập (mobile) → GSVT xem (web) → GSVT duyệt/từ chối (web). |

## 2. Cấu trúc màn theo state (mobile — layout 375×812, header cam)

**⚠️ Lưu ý màu sắc — quan sát thuần tuý, KHÔNG coi là quy tắc đã xác nhận
(ĐÃ CONFIRM 2026-09-05, Williams: "design của Designer cũ, không rõ ngụ ý
UX")**: quan sát 3 nút primary khác nhau trong cùng hệ thống App Truck:
- "Thực hiện giao hàng" (màn Lộ trình, hành động chính chuyển trạng thái
  chuyến) → **Fill XANH DƯƠNG**.
- "Lưu thông tin" (form nhập phí) → **Fill CAM**.
- "Xác nhận" (modal xoá phí — hành động phá huỷ dữ liệu) → **Fill
  CAM/ĐỎ-CAM** (không rõ token chính xác).
Vì đây là design cũ không rõ chủ đích, KHÔNG suy diễn thành 1 "rule" khi
build spec.json mới — cần Williams (hoặc PO/dev phụ trách App Truck) quyết
định lại quy tắc màu khi thật sự bắt tay build màn hình này, thay vì sao
chép nguyên trạng.

### 2.1. "Lộ trình" — màn chính của chuyến đi (`1250:2372`)

- Header cam: "← Đang thực hiện" (trạng thái chuyến hiện tại)
- Bản đồ (map) thu nhỏ ở trên, hiện vị trí + điểm đến
- Tóm tắt chuyến: "2 điểm | 35 km | 2 giờ 30 phút"
- Hàng "Phí phát sinh:" + [👁 Xem chi tiết] (link) — [+ Nhập phí] (nút
  Outline xanh dương, đây chính là **entry point AC1 của PRD**)
- Divider dạng gạch chéo (striped) — phân tách khu vực trên/dưới
- Danh sách các điểm trong lộ trình: mỗi điểm hiện trạng thái ("Có mặt
  trước 09:00"), tên kho + địa chỉ đầy đủ, link "Xem chi tiết", khung giờ
  tới/rời dự kiến VÀ thực tế (dấu "-" nếu chưa tới)
- Footer cố định: **[Thực hiện giao hàng]** (Fill xanh dương, full-width)

### 2.2. "Nhập phí phát sinh" — form thêm/sửa (`1250:3536` + bottom-sheet con)

- Header cam: "← Nhập phí phát sinh"
- **"Chọn điểm\*"**: dropdown dạng chip xanh dương, đứng riêng NGAY DƯỚI
  header (như sticky) — giới hạn trong các điểm của lộ trình hiện tại
- **"Loại phí phát sinh \*"**: field dạng "Chọn loại phí ›" → mở bottom-
  sheet: title "Loại phí phát sinh" + hint **"Mỗi loại phí chỉ được nhập 1
  lần cho mỗi điểm"** (xác nhận đúng rule AC3 của PRD) + radio list (Phí
  gửi xe, Phí bốc xếp,...)
- **"Số tiền \*"**: text input, placeholder "Nhập số tiền thực tế", suffix
  "VNĐ" cố định bên phải
- **"Người chi trả \*"**: field "Chọn người chi trả ›" → bottom-sheet:
  title "Người chi trả" + radio 2 lựa chọn **"Tôi"** (mặc định, chọn sẵn)
  / **"Giám sát vận tải"** — **lưu ý UX writing: dùng "Tôi" chứ KHÔNG dùng
  "Tài xế"** vì đây là app của chính tài xế (góc nhìn ngôi thứ nhất) —
  khác hẳn Portal B2B web luôn gọi vai trò ở ngôi thứ ba (GSVT, Tài xế) vì
  nhân viên xem dữ liệu của NGƯỜI KHÁC.
- **"Hình ảnh minh chứng \*"**: dropzone icon cloud-upload + text "Chụp
  ảnh hoặc tải từ máy (tối đa 2 ảnh)" + phụ đề UI ghi "kích thước tối đa
  10MB" — **✅ ĐÃ CONFIRM 2026-09-05 (Williams): dùng theo PRD**, giới hạn
  đúng là tối đa **5MB**/ảnh (hệ thống tự động resize nếu ảnh gốc vượt
  dung lượng trước khi upload) — text "10MB" hiện trong Figma là SAI/lỗi
  thời, KHÔNG dùng khi build spec. Sau khi chọn ảnh, mỗi ảnh hiện dạng
  thumbnail nhỏ kèm nút [×] xoá riêng.
- **"Ghi chú"** (optional): textarea, placeholder "Nhập thêm ghi chú (nếu
  có)"
- Footer: **[Quay lại]** (Outline Grey) + **[Lưu thông tin]** (Fill cam)

### 2.3. "Chi tiết phí phát sinh" — xem danh sách đã nhập (`1250:2748`)

- Header cam: "← Chi tiết phí phát sinh"
- Tổng: "Phí phát sinh:" + số tiền tổng TOÀN CHUYẾN (Bold, lớn, vd
  "1.440.000đ")
- Divider striped
- **Danh sách GỘP THEO ĐIỂM** (không phải danh sách phẳng từng dòng chi
  phí): mỗi block = 1 điểm, gồm: [📍 icon pin] + tên điểm, danh sách các
  dòng "[Loại phí]: [số tiền]" (mỗi dòng 1 loại phí đã nhập cho điểm đó),
  "Tổng phí: [tổng của điểm này]" (Bold), nút **[✏ Sửa phí]** (Outline
  xanh dương, full-width) ở cuối mỗi block.
- **✅ ĐÃ CONFIRM 2026-09-05 (Williams: "sửa theo từng loại phí riêng")**:
  dù nút "Sửa phí" trong Figma hiện đặt Ở CẤP ĐIỂM (nhìn như sửa gộp cả
  block), hành vi ĐÚNG khi build spec là sửa TỪNG LOẠI PHÍ RIÊNG LẺ (đúng
  câu chữ PRD AC2 của FT-3365: "click vào MỘT chi phí để chỉnh sửa") —
  Figma ở đây không phản ánh đúng hành vi thật, ưu tiên PRD.
- (Chưa research trực tiếp, suy từ PRD AC1 của FT-3365): mỗi dòng chi phí
  lẽ ra còn hiện thêm "số lượng ảnh (icon)" + "Ghi chú rút gọn nếu dài" —
  KHÔNG thấy 2 chi tiết này trong node đã screenshot (có thể do dữ liệu
  mẫu không có ghi chú, hoặc nằm ở 1 state con khác chưa research).

### 2.4. Modal xoá phí (`1252:5857`, tham chiếu `2055:5722`)

- Modal nhỏ, nền tối phủ ngoài: title Bold **"Xoá phí phát sinh?"**
- Mô tả: **"Nếu xác nhận, phí phát sinh sẽ bị xoá và không thể khôi phục
  lại."** — cảnh báo rõ tính KHÔNG THỂ HOÀN TÁC (khớp chuẩn UX cho hành
  động phá huỷ dữ liệu)
- Footer: **[Đóng]** (Outline Grey) + **[Xác nhận]** (Fill cam/đỏ-cam) —
  lưu ý label là "Xác nhận" chứ KHÔNG phải "Xoá" trần trụi
- (Chưa research trực tiếp) `1252:6296` "Xoá phí thành công" — suy đoán
  là toast/màn xác nhận đã xoá xong.

### 2.5. "Chi tiết điểm đến" — xem chi tiết phí theo TỪNG ĐIỂM (`1250:4546` "Chi tiết đơn hàng_Có phí")

**Đã research trực tiếp, tự làm rõ (không cần hỏi lại Williams)**: tên
node Figma là "Chi tiết đơn hàng_Có phí" nhưng title hiển thị THẬT trên
màn hình là **"← Chi tiết điểm đến"** — đây là màn xem chi tiết 1 ĐIỂM cụ
thể trong lộ trình, đến từ link "Xem chi tiết" cạnh MỖI điểm ở danh sách
màn "Lộ trình" (mục 2.1) — KHÁC với "Chi tiết phí phát sinh" (mục 2.3, là
tổng hợp toàn CHUYẾN). Cấu trúc:
- Tên kho + địa chỉ đầy đủ của điểm
- Khung giờ tới/rời dự kiến VÀ thực tế (giống mục 2.1)
- "Đã lên hàng: 0 kiện" / "Đã xuống hàng: 0/1 kiện" (tiến độ bốc dỡ hàng —
  KHÔNG thuộc phạm vi chi phí phát sinh, nhưng cùng nằm 1 màn)
- **"Phí phát sinh: N loại phí"** — danh sách đầy đủ TỪNG loại phí dạng
  card riêng biệt (KHÁC style tóm tắt ở mục 2.3): mỗi card = badge tên loại
  phí (vd "PHÍ GỬI XE") + "Số tiền (VNĐ):" + "Người chi trả:" + "Hình ảnh
  minh chứng:" (thumbnail đầy đủ, không chỉ icon đếm số lượng) + "Ghi
  chú:" (text đầy đủ, không rút gọn "..."). Đây là màn **READ-ONLY thuần
  tuý** (không thấy nút Sửa/Xoá) — dùng để xem lại chi tiết đầy đủ, khác
  vai trò với "Chi tiết phí phát sinh" (mục 2.3) vốn có thể thao tác sửa.
→ Đã tự trả lời được Open Question ban đầu về "Chi tiết đơn hàng": ĐÂY
KHÔNG PHẢI 1 lối vào khác để NHẬP chi phí — chỉ là 1 màn XEM chi tiết
theo điểm, bổ trợ cho "Chi tiết phí phát sinh" (xem toàn chuyến).

### 2.6. Các state chưa research chi tiết (chỉ có tên node, suy từ PRD)

- "Chọn điểm có phí phát sinh" (3 node khác nhau `1250:3051`/`1250:3804`/
  `1250:4777`) — có thể là danh sách điểm để chọn xem/sửa phí theo điểm.
- "Chọn điểm giao" / "Xác nhận điểm giao" (`1252:4597`/`1252:4804`) — có
  thể thuộc luồng giao hàng chính, KHÔNG chắc liên quan trực tiếp chi phí
  phát sinh — cần verify nếu sau này cần mô tả đầy đủ.
- "Confirm chưa lưu thay đổi" (`1252:5277`) — modal cảnh báo khi thoát form
  đang có dữ liệu chưa lưu (pattern quen thuộc, chưa xem trực tiếp style).
- "Chi tiết đơn hàng_Không có phí" (`1250:4702`) — suy đoán là biến thể
  của mục 2.5 khi điểm đó CHƯA có chi phí phát sinh nào (chỉ hiện phần
  thông tin điểm + bốc dỡ hàng, ẩn hẳn khối "Phí phát sinh").

## 3. Business rule (PRD FT-3267 + FT-3365, đã đối chiếu 1 phần Figma)

**Field bắt buộc khi thêm mới (AC2 của FT-3267)**:

| Field | Loại | Bắt buộc | Rule |
|---|---|---|---|
| Điểm | Dropdown | Có | Chỉ chứa các điểm trong lộ trình hiện tại |
| Loại chi phí | Dropdown (bottom-sheet radio) | Có | Mỗi loại phí chỉ nhập 1 lần/điểm |
| Số tiền | Text input | Có | Số dương >0, < định mức tối đa theo TỪNG loại phí, tự phân tách hàng nghìn, lỗi "Số tiền vượt định mức vui lòng liên hệ GSVT" nếu vượt |
| Người chi trả | Radio (bottom-sheet) | Có | 2 lựa chọn: Tôi/Tài xế (mặc định) hoặc Giám sát vận tải |
| Hình ảnh | Attach | Có | Tối thiểu 1, tối đa 2 ảnh; chụp trực tiếp hoặc gallery; PRD ghi tối đa 5MB (tự resize nếu vượt) — Figma ghi 10MB, xem Open Question #2 |

**Thêm nhiều loại phí 1 lần (AC4)**: cho phép nhập nhiều dòng loại phí
trước khi lưu; xoá được dòng vừa thêm khi CHƯA lưu.

**Chặn theo trạng thái chuyến (AC5 + AC3 của FT-3365) — ĐÃ CONFIRM
2026-09-05, mạnh hơn PRD literal**: chuyến "COMPLETED"/"Kết thúc"/"Đã huỷ"
→ không chỉ ẩn/disable Thêm/Sửa/Xoá — toàn bộ màn hình chuyến đó trở
thành TRỐNG (empty) ở tab "Chuyến đi", tài xế KHÔNG xem lại được thông tin
gì của chuyến đã kết thúc qua đường thông thường nữa (không chỉ riêng phần
chi phí phát sinh).

**Lưu & đồng bộ (AC6)**: validate đủ field bắt buộc, báo lỗi NGAY DƯỚI
field tương ứng nếu thiếu. Lưu thành công ghi nhận: Chuyến đi (TripID),
Điểm, Loại phí, Số tiền, File đính kèm, Ghi chú, Người thanh toán, Ngày
tạo, Người tạo.

**Xem/sửa/xoá (FT-3365)**: danh sách hiện theo điểm, mỗi dòng hiện Loại
chi phí/Số tiền/Tên điểm/số ảnh (icon)/Ghi chú rút gọn. Sửa được TOÀN BỘ
field trừ ID chi phí. Xoá có modal confirm không-thể-hoàn-tác.

**Validate theo cấu hình MỚI khi sửa (AC4 của FT-3365)**: nếu admin đổi
cấu hình loại phí/định mức SAU khi tài xế đã nhập — dữ liệu CŨ giữ nguyên,
nhưng SỬA LẠI thì áp dụng validate theo cấu hình MỚI (không hồi tố dữ liệu
cũ, chỉ áp dụng khi có thao tác sửa mới).

**Edge case liên quan `06` (GSVT từ chối) — ĐÃ CONFIRM 2026-09-05**: GSVT
từ chối 1 chi phí phát sinh (ở Portal B2B) → chỉ ghi nhận trạng thái để
KHÔNG count vào PnL. Tài xế **KHÔNG** nhìn thấy trạng thái "đã từ chối"
trên app — vì việc duyệt/từ chối luôn xảy ra SAU khi chuyến đã kết thúc,
mà sau khi kết thúc chuyến thì tài xế đã mất quyền xem lại chuyến đó rồi
(xem rule ngay trên).

**Out of scope (theo PRD FT-3267/FT-3365)**: cấu hình danh sách loại phí
trên giao diện (dev config sẵn, không có màn cấu hình cho user); quy trình
GSVT duyệt (đã có ở phase sau — chính là FT-3439, đã tài liệu hoá ở `06`);
KHÔNG tự động ghi chi phí này vào PnL của chuyến (việc ghi PnL chỉ xảy ra
SAU khi GSVT duyệt, theo đúng rule AC9 của FT-3439 ở `06`).

## 4. Áp dụng được / bổ sung cho tài liệu tổ chức

**✅ ĐÃ CONFIRM**: tách riêng thành file
[`role-to-component-mapping-app-truck.md`](role-to-component-mapping-app-truck.md)
— KHÔNG gộp vào `role-to-component-mapping.md` (Portal B2B web). Các
pattern dưới đây đã được propagate sang file đó (trừ mục màu sắc, ghi rõ
là "quan sát thuần tuý, chưa xác nhận có chủ đích" vì là design cũ):

1. **UX Writing ngôi thứ nhất trong app của chính người dùng**: dùng "Tôi"
   thay vì gọi tên vai trò (vd "Tài xế") khi field đó đại diện cho CHÍNH
   người đang dùng app — chỉ áp dụng cho app 1-người-dùng-tự-thao-tác
   (khác Portal B2B — nơi 1 nhân viên có thể xem/thao tác dữ liệu của
   NHIỀU người khác nên luôn cần gọi tên vai trò rõ ràng ở ngôi thứ ba).
2. **Danh sách gộp theo NHÓM CHA (điểm) thay vì phẳng theo từng dòng con
   (loại phí)** ở màn TỔNG HỢP (mục 2.3) — mỗi nhóm hiện tổng phụ
   (subtotal); nhưng THAO TÁC SỬA vẫn ở cấp TỪNG LOẠI PHÍ riêng lẻ (đã
   confirm, xem mục 2.3) — nhóm-hiển-thị và đơn-vị-thao-tác KHÔNG nhất
   thiết trùng nhau.
3. **Modal xoá không-thể-hoàn-tác dùng label "Xác nhận"** (không phải
   "Xoá") cho nút hành động phá huỷ — nhất quán với UX Writing "Xác nhận"
   thay vì tên hành động trần trụi đã thấy 1 phần ở Portal B2B (`04`).
4. **Bottom-sheet radio-list cho dropdown chọn 1 giá trị** (thay vì
   dropdown truyền thống mở tại chỗ như web) — pattern mobile chuẩn, có
   hint text giải thích rule ngay trong bottom-sheet (vd "Mỗi loại phí chỉ
   được nhập 1 lần cho mỗi điểm") — cách hay để nhắc rule NGAY TẠI ĐIỂM
   QUYẾT ĐỊNH thay vì chỉ báo lỗi sau khi submit.
5. **2 tầng chi tiết bổ trợ nhau**: 1 màn TỔNG HỢP toàn chuyến, có thể
   thao tác (mục 2.3) + 1 màn CHI TIẾT từng điểm, read-only, hiện đầy đủ
   ảnh/ghi chú không rút gọn (mục 2.5) — dùng khi dữ liệu có 2 cấp phân
   nhóm tự nhiên (chuyến > điểm) và mobile không đủ chỗ hiện hết chi tiết
   ở 1 màn.
6. **Rule nghiệp vụ**: sau khi kết thúc 1 chuyến, tài xế mất quyền xem lại
   TOÀN BỘ thông tin chuyến đó (không riêng chi phí phát sinh) — cần ghi
   nhớ khi thiết kế bất kỳ tính năng nào khác liên quan tới "xem lại lịch
   sử chuyến" trên App Truck, KHÔNG mặc định có thể tra cứu chuyến cũ.

## 5. Open Questions — TẤT CẢ 5/5 đã trả lời/confirm 2026-09-05

1. ~~Tách file riêng cho App Truck? Quy tắc màu 3 nút primary khác nhau?~~
   → Williams confirm: tách riêng file
   `role-to-component-mapping-app-truck.md`; màu sắc là design cũ không rõ
   ngụ ý UX, ghi lại như quan sát thuần tuý, không coi là rule.
2. ~~Giới hạn dung lượng ảnh 5MB (PRD) hay 10MB (Figma)?~~ → Williams
   confirm: theo PRD, 5MB — Figma "10MB" sai/lỗi thời.
3. ~~"Sửa phí" theo cấp điểm hay theo từng loại phí?~~ → Williams confirm:
   theo TỪNG LOẠI PHÍ riêng lẻ (đúng PRD, Figma không phản ánh đúng).
4. ~~Tài xế có thấy trạng thái "đã từ chối" không?~~ → Williams confirm:
   KHÔNG — vì sau khi kết thúc chuyến, tài xế mất quyền xem lại chuyến đó
   hoàn toàn (màn hình trống ở tab Chuyến đi), không riêng gì phần chi phí.
5. ~~"Chi tiết đơn hàng_Có phí/Không có phí" là gì?~~ → Tự làm rõ được qua
   screenshot trực tiếp: đây là màn "Chi tiết điểm đến" — xem chi tiết chi
   phí theo TỪNG ĐIỂM (read-only, đầy đủ ảnh/ghi chú), bổ trợ cho màn
   "Chi tiết phí phát sinh" (tổng hợp toàn chuyến, có thể sửa) — KHÔNG
   phải 1 lối vào khác để nhập chi phí. Xem mục 2.5.
