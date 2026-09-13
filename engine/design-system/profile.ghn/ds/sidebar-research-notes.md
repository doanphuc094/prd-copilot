# Sidebar — ghi chú nghiên cứu (CHƯA đăng ký component chính thức)

**Trạng thái**: [NGHIÊN CỨU 13/09 — CHƯA ĐĂNG KÝ] Williams: "tụi tao có sidebar
component... do Giao Hàng Nặng là nhánh mới tụi tao customize sidebar riêng
dựa trên atom của sidebar design system... đưa ra đề xuất chung cho sử dụng
sidebar". File này CHỈ lưu lại bằng chứng thật đã khảo sát để dùng khi
Williams quyết định đăng ký Sidebar thành component chính thức — KHÔNG có
mục trong `manifest.yaml`, KHÔNG có `rules/components/sidebar.rules.yaml`
hay `profile.ghn/ds/sidebar.binding.yaml` — cố tình chưa tạo, tránh đăng ký
nửa vời khi nghiệp vụ chưa chốt hết.

## 1. Component DS gốc (generic, dùng chung mọi công ty/brand)

- **"Left Menu"** — component_set, componentKey
  `a9dabbc7e2f8b7a636175adf12016dad23645d71`, library GHN DS. Trục variant:
  `Type = [Mobile, Web]`. Đây là khung TOÀN BỘ sidebar (logo + list module +
  social links), không phải atom từng dòng menu.
- **"Left menu /Left menu items (Base)"** — component_set con, componentKey
  `dbf4cf146de9387afd495867be9e17dc2a20d9cb`. Đây MỚI là atom "module" mà
  Williams mô tả. Trục variant:
  - `Type = [main menu, sub menu, collapse, expand]`
  - `State = [Default, Active]` (chỉ áp cho `main menu`/`sub menu` — 2 variant
    `collapse`/`expand` chỉ có State=Default, không có bản Active)
  - boolean props: `numberBadge#1128:50`, `Menu name#1128:62`,
    `Active#4109:93`, `Right icon#4109:96`
  - source: `[FIGMA — ĐỌC THẬT 13/09]` `search_design_system` +
    `figma.importComponentSetByKeyAsync` qua `use_figma`, đọc trực tiếp
    `variantGroupProperties`/`componentPropertyDefinitions`.

## 2. PHÁT HIỆN QUAN TRỌNG: "collapse"/"expand" KHÔNG PHẢI chevron của từng
   module — mà là 1 nút TOGGLE DUY NHẤT cho CẢ SIDEBAR

Tạo instance thật + chụp screenshot (`Type=collapse`/`Type=expand`): cả 2 đều
là 1 thanh ngang MỎNG (250×16px, không có text/label riêng), có 1 icon tròn
nhỏ ở giữa — đây là nút thu gọn/mở rộng TOÀN BỘ sidebar (về dạng chỉ-icon hay
đầy đủ icon+text), xuất hiện NGAY DƯỚI logo, chỉ 1 lần cho cả sidebar — KHÔNG
lặp lại theo từng module.

Điều này KHÁC với mô tả ban đầu của Williams ("module có nhiều sub-module hơn
thì có thêm icon chevron-down/up phía bên phải") — cái ĐÓ hoá ra là 1 khái
niệm RIÊNG, dùng property `Right icon#4109:96` ngay trên chính variant
`main menu` (xem mục 3), không phải variant `collapse`/`expand`. Ghi lại rõ
để không lẫn 2 khái niệm: (a) toggle thu gọn CẢ sidebar = variant
collapse/expand; (b) chevron mở/đóng submenu của 1 module = boolean
Right icon trên variant main menu.

## 3. Xác nhận thật hành vi module + chevron trên sidebar THẬT của Freight

Khảo sát trực tiếp file **B2B Portal**
(fileKey `s2NE6ikwLnsZSUp97RBfof`, frame **"Left Menu Freight"** → con
**"SidebarMenu"**, node `22894:77037`) — đây là bản CUSTOM thật GHN đang dùng,
không phải trang docs chung:

| Node id | Type/State | Icon | Text | Right icon (bool) | Chevron glyph |
|---|---|---|---|---|---|
| 77043 | main menu / **Active** | user | Quản lí khách hàng | false | (không có) |
| 77044 | main menu / Default | boxes-stacked | Quản lý đơn hàng | **true** | `chevron-down` |
| 77045 | sub menu / **Active** | — | (con của 77044) | true | — |
| 77046 | sub menu / Default | — | (con của 77044) | true | — |
| 77047 | main menu / Default | house-night | Cấu hình gác đêm | false | (không có) |
| 77048 | main menu / Default | map-location-dot | Quản lý địa điểm | false | (không có) |
| 77049 | main menu / Default | truck-field | Quản lý chuyến đi | false | (không có) |
| 77051 | main menu / Default | file-lines | Quản lý chứng từ | **true** | `chevron-down` |
| 77052-53 | sub menu / Default x2 | — | (con của 77051) | true | — |
| 77054 | main menu / Default | file-invoice-dollar | Quản lý chi phí FTL | **true** | `chevron-down` |
| 77056 | main menu / Default | clipboard-list-check | Dynamic SOP | **true** | `chevron-down` |
| 77059 | main menu / Default | square-fragile | Hàng dễ vỡ - giá trị cao | **true** | `chevron-down` |
| 77060 | main menu / Default | arrow-right-from-bracket | Đăng xuất | false | (không có) |

Xác nhận ĐÚNG với mô tả Williams:
- Module ĐANG được chọn (đang xem) → `Type=main menu, State=Active` (vd
  "Quản lí khách hàng").
- Module có sub-module → `Right icon#4109:96 = true`, module KHÔNG có
  sub-module → `Right icon = false` (không hiện chevron nào).
- Sub-menu item → `Type=sub menu`, KHÔNG có icon trái, chỉ có text — khớp
  đúng "sub-menu (sub-menu) không có icon chỉ có text".
- User đang ở 1 sub-menu → `State=Active` trên chính item sub menu đó (vd
  node 77045).

## 4. HAI ĐIỂM CHƯA KHỚP — 1 đã đóng, 1 còn mở

**[ĐÃ ĐÓNG — Williams 13/09-K]** Williams xác nhận: "Tao xác nhận là nó có đổi
hướng xuống và lên. Chắc trong quá trình làm có sự nhầm lẫn" — hành vi ĐÚNG
là chevron ĐỔI chiều (down↔up) theo trạng thái đóng/mở thật (khả năng 2 ở dưới
là SAI, khả năng 1 mới đúng). Cái "luôn hiện chevron-down" quan sát được trong
sidebar Freight thật là 1 lỗi phát sinh trong lúc Williams tự chỉnh sửa
component (đổi màu), không phải hành vi thiết kế chủ ý — Williams tự nhận:
"Chắc do tao tự chỉnh sửa component bằng cách đổi màu nên nó có sự sai này."
→ Rule áp dụng khi đăng ký Sidebar sau này: chevron-down = sub-menu ĐÓNG,
chevron-up = sub-menu MỞ, đúng như mô tả ban đầu của Williams.

**(a) [ĐÃ ĐÓNG, xem trên] Chevron luôn hiện "chevron-down", kể cả khi sub-menu đang MỞ — trong sidebar Freight thật.**
Node 77044 ("Quản lý đơn hàng") có glyph `chevron-down` — theo mô tả của
Williams, chevron-down nghĩa là "đóng, chỉ hiển thị module chính". NHƯNG ngay
sau nó trong cùng frame là 2 sub-menu (77045 Active + 77046 Default) — tức
sub-menu ĐANG HIỂN THỊ (mở), không phải đóng. Tương tự cho 77051, 77054,
77056, 77059 — TẤT CẢ đều hiện `chevron-down`, kể cả khi không có sub-menu
nào theo ngay sau (77054/77056/77059 không thấy sub-menu con trong data đã
đọc). Có 2 khả năng, KHÔNG tự chọn:
  1. Đây là 1 frame ví dụ/mockup tĩnh, designer đặt sẵn `chevron-down` cho
     MỌI module có sub-menu bất kể trạng thái đóng/mở thật (tức là leftover/
     chưa chỉnh đúng theo từng case) — giống các quirk default-sai đã gặp ở
     Dialog/BottomSheet trước đây.
  2. Đây THẬT SỰ là hành vi đúng: `chevron-down` là icon MẶC ĐỊNH/tĩnh cho
     MỌI module có sub-menu (không đổi thành chevron-up khi mở) — và trạng
     thái "mở" được thể hiện bằng việc sub-menu CÓ xuất hiện hay không trong
     layer list, không phải bằng icon.
**→ Cần Williams xác nhận: chevron có ĐỔI chiều (down↔up) theo trạng thái
đóng/mở thật không, hay luôn cố định là down?**

**(b) Boolean `Active#4109:93` KHÔNG khớp trục `State`.**
Đọc thật: node 77043 (`State=Active`) có `Active#4109:93 = false`; ngược lại
nhiều node `State=Default` (77046, 77052, 77053) lại có `Active#4109:93 =
true`. Tên property trùng với tên trục State nhưng GIÁ TRỊ không tương ứng —
có thể đây là 1 property THỪA/legacy không còn dùng, hoặc mang ý nghĩa khác
hoàn toàn (không phải "module này đang active"). **Chưa rõ ý nghĩa thật —
chưa hỏi Williams.**

## 5. Icon thật đã dùng trong sidebar Freight (chưa qua bước xác nhận FA6 Pro
   — mới chỉ đọc tên từ Figma, CHƯA chạy quy trình 2 bước icon đầy đủ)
user, boxes-stacked, house-night, map-location-dot, truck-field, file-lines,
file-invoice-dollar, clipboard-list-check, square-fragile,
arrow-right-from-bracket, chevron-down.

## 6. Logo "Giao Hàng Nặng" — lưu tham chiếu cho sau này

- Instance: node `22894:77039` ("Logo"), file B2B Portal
  (`s2NE6ikwLnsZSUp97RBfof`), nằm trong "Left Menu Freight" → "Logo" frame,
  ngay phía trên "SidebarMenu".
- Nội dung: logo "GHN" + wordmark "GiaoHang NẶNG" + tagline "Hàng Nặng Ký,
  Giá Nhẹ Vi" — đúng như Williams gửi.
- **[GIỚI HẠN THẬT]** Không tải được file ảnh về máy Claude trong phiên này —
  mạng ra ngoài của môi trường cloud bị chặn domain `figma.com` theo chính
  sách tổ chức (đã thử `download_assets` + `curl`, cả hai đều bị chặn ở tầng
  egress proxy, không phải lỗi Figma). Muốn có file ảnh thật, tải trực tiếp
  từ Figma (link + node-id ở trên) hoặc qua `download_assets`/`get_screenshot`
  ở 1 phiên có quyền mạng khác.
- Dùng lại đúng `node 22894:77039` khi thật sự bắt đầu đăng ký Sidebar/xây
  header sidebar riêng cho Freight.

## 7. Việc còn lại khi quyết định đăng ký Sidebar chính thức

- Trả lời 2 điểm chưa khớp ở Mục 4.
- Quyết định: Sidebar có nên là 1 `component_kind` MỚI, hay xếp vào 1 kind đã
  có (không có kind nào hiện tại khớp hành vi "menu điều hướng + expand/
  collapse")? Đề xuất tạm: kind mới `navigation` — CHƯA tạo, chờ Williams.
  - Nếu tạo: cần thêm entry `component_kinds.navigation` vào `manifest.yaml`
    (lưu ý guardrail `kind_needs_3_members` — Sidebar sẽ là kind chỉ có 1
    thành viên lúc đầu, giống form_input/overlay khi mới bắt đầu, chấp nhận
    tạm theo tiền lệ 08/09-D).
- Đo số liệu THẬT: width sidebar (đã thấy 300px trong cả 2 file — GHN DS
  generic VÀ Freight thật, trùng khớp), height mỗi module (48px main menu,
  56px 1 vài sub-menu — có 1 vài sub-menu 48px và 1 vài 56px, CHƯA rõ do
  đâu, chưa hỏi), màu sắc theo State=Active (đã thấy cam, khớp accent color
  hệ thống — chưa resolve token thật).
- Ý nghĩa "numberBadge" boolean (badge số, có thể là số lượng thông báo/item
  chờ xử lý trong menu đó?) — chưa hỏi.
