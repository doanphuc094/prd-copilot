# Khảo sát kiến trúc component thật — nền tảng cho `rules/_foundation.rules.yaml`

[NGHIÊN CỨU 13/09-U — CHƯA đăng ký] Theo yêu cầu Williams: "Okay mày phải có
rule cho foundation token hãy vào portal b2b xem cách tao dựng kiến trúc
component rồi đề xuất 1 bộ rule cho foundation token". Tài liệu này là bằng
chứng thô (node-id thật, giá trị đọc thật qua `use_figma`/`get_variable_defs`)
— nguồn cho `rules/_foundation.rules.yaml` (đề xuất) và các bổ sung đề xuất
vào `_shared.binding.yaml`.

File khảo sát: B2B Portal (`s2NE6ikwLnsZSUp97RBfof`).

## 1. Trang "🔵 Layout structure" (nodeId `1:2`) — tài liệu DS nội bộ của Williams

Đây là 1 trang Figma Williams tự làm để giải thích quy tắc layout cho chính
đội — đọc annotation text trực tiếp trên trang (không suy diễn):

- **Breadcrumbs**: "Không cần sử dụng trong các trang chỉ có 1 cấp đơn giản
  (VD: Home, Dashboard,...). Các breadcrumb ngoại trừ trang hiện tại nên gắn
  link để quay lại các bước trước. Nếu cấu trúc quá dài, có thể sử dụng ...
  để làm gọn 1 số bước ở đầu. Có hiệu ứng hover để người dùng biết breadcrumb
  có thể click." — trích NGUYÊN VĂN annotation trên trang Figma (giữ nguyên
  vì đây là bằng chứng thô, không tự sửa quote).
  **[SỬA — Williams, review 13/09-U]: "Nên có breadcrumb ở mọi trang"** —
  Williams ĐẢO NGƯỢC lại đúng phần loại trừ trong annotation cũ: annotation
  nói KHÔNG cần breadcrumb ở trang 1 cấp đơn giản (Home/Dashboard), nhưng
  Williams xác nhận thật ra NÊN có breadcrumb ở MỌI trang, không có ngoại lệ
  1-cấp-đơn-giản. Annotation cũ trên trang Layout structure (node 1:2) coi
  như ĐÃ LỖI THỜI ở điểm này — xem decisions.md § 13/09-V. Đây là luật
  breadcrumb/navigation, KHÔNG thuộc phạm vi foundation token (typography/
  color/spacing) của tài liệu này — ghi lại ở đây vì phát sinh cùng lúc khảo
  sát trang Layout structure, nhưng nơi ở CHÍNH THỨC của luật này (rules/
  _composition.rules.yaml hay 1 file kind riêng cho page header/breadcrumb)
  chưa được xác định, cần bàn thêm với Williams.
- **Page & Tab (page header)**:
  - "Page title: Chỉ sử dụng 1 Page Title duy nhất cho mỗi trang. Nếu trong
    card/tab phụ, dùng heading nhỏ hơn."
  - "Sub Page heading: Trong card/tab phụ, dùng heading nhỏ hơn."
  - "CTA: Chỉ nên có tối đa 1 hành động chính, nếu có trên 3+ button sử dụng
    biểu tượng More cho các button ít quan trọng. Sắp xếp từ phải → trái
    theo thứ tự ưu tiên. Chỉ hiển thị button khi người dùng có quyền thao
    tác."
  - "Tab: Số lượng tab tối đa 4–5 tab. Nội dung thuộc cùng 1 trang, cùng cấp
    độ phân cấp. Chỉ hiển thị button khi người dùng có quyền thao tác."
- **Search & Filter cluster**: "Tìm kiếm nhanh bằng keyword hoặc ID, mã đơn
  hàng... Chỉ nên sử dụng 2-3 điều kiện trong khu vực 'Quick filter', các bộ
  lọc nâng cao hoặc chi tiết nên để trong khu vực 'Advanced filter' ở phía
  bên phải. Hỗ trợ Đặt lại/Lưu lại filter. Chỉ thực hiện lọc kết quả sau khi
  bấm nút Áp dụng."
- **Popup (modal)**: "Nếu nội dung dài, cần scroll nhiều → không dùng popup,
  dùng fullpage. Nếu hành động ảnh hưởng đến nhiều đối tượng → dùng
  fullpage. Hạn chế mở nhiều popup liên tiếp (trừ popup confirm thứ 2). Sử
  dụng overlay màu đen, opacity 30% để làm tối nội dung bên dưới popup. Nên
  hỗ trợ đóng bằng ESC hoặc click outside."

Đây là văn bản HƯỚNG DẪN (ý định thiết kế), không phải giá trị đã resolve
thật trên component — xem § 4 để đối chiếu với component THẬT.

## 2. Typography — đối chiếu Page Heading vs Sub Heading (bằng chứng thật)

Đọc `get_variable_defs` trên 1 trang thật đã dựng đầy đủ (section "Sidebar
page", trang danh sách đơn hàng có Sidebar, nodeId gốc `10014:11448`):

| Node | Tên | Style resolve thật |
|---|---|---|
| `10014:15770` | "Page Heading" (tiêu đề DUY NHẤT của trang) | `Heading/Bold/H5 Bold` — size 20, weight Bold, **lineHeight thật = 30** (tên biến ghi "(20, 32, 700)" — **LỆCH TÊN/GIÁ TRỊ**, giống quirk `Spacing/S258` đã ghi ở `_shared.binding.yaml`) |
| `10031:43736` | "Page Sub Heading" | `Heading/Bold/H6 Bold (18, 28, 700)` |
| `10014:13619` | Tiêu đề card "Danh sách đơn hàng" | `Heading/Bold/H6 Bold (18, 28, 700)` — **CÙNG style với Page Sub Heading** |

**Kết luận thật (bản đầu 13/09-U)**: Page Title thật dùng H5 (KHÔNG phải
H1/H2/H3 — ramp có 6 mức Heading, nhưng trang thật chỉ dùng mức thứ 5 trong
6 mức, tức gần cuối thang, không phải đỉnh thang). Sub-heading/card-title
dùng H6 — lệch ĐÚNG 1 bậc so với Page Title, và card-title dùng CHUNG style
với "Page Sub Heading".

**[SỬA 13/09-V — Williams review]**: Williams chỉ ra 1 trang MỚI hơn (Sprint
66 revamp trang quản lý KH) và yêu cầu "Chỉnh lại dùng dạng title 1". Đọc lại
`get_variable_defs` trên 4 node ĐỘC LẬP cùng trang này:

| Node | Nội dung | Style resolve thật |
|---|---|---|
| `17740:214102` | "Thông tin chung" | `Title/Title 1 (16, 24, 700)` |
| `21219:13375` | "Thông tin chung" | `Title/Title 1 (16, 24, 700)` |
| `21219:13407` | "Giấy phép kinh doanh" | `Title/Title 1 (16, 24, 700)` |
| `21219:13417` | "Thông tin thanh toán" | `Title/Title 1 (16, 24, 700)` |

Cả 4 node ĐỘC LẬP đều dùng CHÍNH XÁC 1 style: **Title/Title 1** (16px Bold)
— KHÔNG phải H6 (18px). **Kết luận đã sửa**: `section_title` thật dùng
NHÓM **Title** (Title 1), không phải nhóm Heading lùi 1 bậc. Trang Sprint 62
(cũ hơn) dùng H6 cho cùng vai — nhiều khả năng là pattern CŨ chưa cập nhật
theo chuẩn Sprint 66, nhưng đây là suy đoán hợp lý, KHÔNG khẳng định chắc
chắn 100% (chưa hỏi trực tiếp Williams tại sao 2 sprint khác nhau). Quy tắc
áp dụng khi build MỚI: `section_title` = Title 1.

## 3. Spacing — nhịp độ khoảng cách thật trên 1 trang đầy đủ

Đọc trực tiếp toạ độ (x/y/width/height) qua `get_metadata` trên section
"Sidebar page" (`10014:11448`), khung nội dung chính (không tính Sidebar
300px):

- **Lề trái khối nội dung so với Sidebar**: content bắt đầu tại x=24 trong
  khung `Placeholder` (1428px) — tức lề 24px.
- **Padding bên trong 1 card thông tin** (`Frame 1000002887`, khối 4 ô
  label/value): card rộng 1007, khối nội dung bên trong bắt đầu x=16 rộng
  975 (1007-16-16=975) → **padding trong card = 16px** mỗi bên.
- **Khoảng cách GIỮA 2 card xếp chồng dọc** (card info kết thúc y=108+168=276,
  card bảng bắt đầu y=292): **gap = 16px**.
- **Khoảng cách bên trong 1 card, từ header xuống bảng** (header card kết
  thúc y=16+32=48, bảng bắt đầu y=60, trong cùng card "Danh sách đơn hàng"):
  **gap = 12px** — KHÁC với gap 16px giữa 2 card ở trên, dù cùng là "khoảng
  cách dọc".
- **Nhịp độ xếp dọc trong khối thông tin bên panel phải** (4 khối
  label/value xếp dọc, y = 24, 100, 176, 252): **gap = 24px mỗi khối** — lại
  KHÁC với 2 số 16px/12px ở trên.
- **Khoảng cách 2 cột (nội dung chính ↔ panel phải)**: cột trái kết thúc
  x=1007, cột phải bắt đầu x=1023 → **gutter = 16px**.

→ Ít nhất 4 giá trị khoảng cách khác nhau (24, 16, 12, cũng 24 nhưng vai
khác) cùng xuất hiện trên 1 trang, dùng cho 4 vai cấu trúc khác nhau — xem
`rules/_foundation.rules.yaml § spacing_role` cho đề xuất tách vai.

**[BỔ SUNG 13/09-Y — Williams: "mày khảo sát đi"]** Khảo sát thêm 2 màn thật
khác kiểu để kiểm tra các vai trên có giữ nguyên không:

- **Màn FORM tạo mới** — "🔵 Tạo mới KH - Sprint 55" (`13863:34452`,
  "[Tạo KH mới] - Thêm KH"): Page Heading tại x=24 (khớp lề 24px). Card
  "Thông tin chung" nội dung bắt đầu x=16 (khớp padding 16px). 2 card xếp
  DỌC ("Thông tin chung" cao 642, "Thông tin thanh toán" bắt đầu y=658) →
  gap = 658-642 = **16px** (khớp). Các dòng field bên trong 1 card (input
  rows tại y=17,99,181,263,377,459, mỗi input cao 70/102) → gap giữa các
  dòng liên tiếp đo được ĐỀU = **12px** — TRÙNG với gap header→body đã ghi,
  củng cố đây là 1 vai chung "nhịp độ nội bộ trong khối", không riêng gì
  header→body.
- **Màn CHI TIẾT nhiều khối** — "Sprint 66 - Revamp trang quản lý KH"
  (`21219:13347`): Page Heading tại x=24 (khớp). Card "Thông tin chung"
  (807px) nội dung bắt đầu x=16 (khớp). Các dòng label:value bên trong
  (y=16,52,88,124,160,196,232, mỗi dòng cao 24) → gap giữa các dòng = 36-24
  = **12px** (khớp). Giữa các NHÓM accordion xếp dọc (nhóm "Thông tin
  chung + Giấy phép KD" kết thúc y=692, nhóm "Thông tin thanh toán/bảng
  giá" bắt đầu y=708; nhóm đó kết thúc y=1674, nhóm "Thông tin lịch sử"
  bắt đầu y=1690) → gap = **16px** cả 2 lần (khớp card-to-card).
  **Phát hiện MỚI, CHƯA khớp**: 2 card "Thông tin chung" (807px) và "Giấy
  phép kinh doanh" (561px) xếp CẠNH NHAU cùng 1 hàng ngang (node
  `21219:13372`) → gutter đo được = **12px**, KHÁC với gutter 16px đã ghi
  ở trên cho cặp "nội dung chính ↔ panel phải" của màn order-list. Ghi
  đúng như đo được — CHƯA tự gộp 2 số này thành 1 vai, cần hỏi Williams
  hoặc khảo sát thêm.

**Kết luận sau 3 màn**: 3/4 vai spacing (lề-sidebar 24px, padding-card
16px, gap-card-dọc 16px) giữ NGUYÊN qua cả 3 màn khác kiểu (list, form,
detail) — đủ tin cậy để coi là quy luật hệ thống, không phải đặc thù 1
màn. Vai thứ 4 (nhịp nội bộ 12px) còn RỘNG hơn ghi nhận ban đầu.

**[GIẢI QUYẾT 13/09-Z — theo yêu cầu Williams "đề xuất luật thống nhất dựa
trên UX law đã học"]**: Đọc lại CHÍNH XÁC cây cha-con quanh 2 điểm dữ liệu
tưởng như mâu thuẫn (12px vs 16px), qua `get_metadata` chi tiết trên node
`21227:13923` (wrapper accordion "Thông tin chung" của trang chi tiết):

```
Frame 1000009437 (accordion "Thông tin chung", y=16, cao 676)
├─ Frame 1000009438 (accordion header)         y=0    cao 36
├─ [gap 12px]
├─ Frame 1000009426 (row 2 card cạnh nhau)      y=48   cao 344
│   ├─ Card "Thông tin chung"        x=0   rộng 807
│   ├─ [gutter 12px]
│   └─ Card "Giấy phép kinh doanh"   x=819 rộng 561
├─ [gap 12px]
└─ Frame 1000002966 (card "Thông tin thanh toán", full width) y=404 cao 272
```

Cả 3 khoảng cách bên TRONG accordion "Thông tin chung" này — header→row,
row→card tiếp theo, VÀ gutter ngang giữa 2 card cùng hàng — đều đo được
**12px**, vì tất cả đều là quan hệ giữa các CON của CÙNG 1 accordion. Trong
khi đó, khoảng cách giữa accordion NÀY và accordion TIẾP THEO ("Thông tin
thanh toán/bảng giá", node `21227:19505`, y=708 — accordion "Thông tin
chung" kết thúc y=16+676=692, gap=708-692=16px) — và giữa accordion đó với
accordion "Thông tin lịch sử" tiếp theo nữa (kết thúc y=708+966=1674, tiếp
theo bắt đầu y=1690, gap=16px) — đo được **16px cả 2 lần**, vì đây là 2
NHÓM ĐỘC LẬP khác nhau, không phải con của cùng 1 accordion.

**Kết luận**: đây KHÔNG phải 2 vai ngang mâu thuẫn nhau, mà là 1 quy luật
DUY NHẤT — khoảng cách tỉ lệ với **khoảng cách ngữ nghĩa** (quan hệ
cha-con/anh-em trong cây nội dung), KHÔNG phải với trục bố trí (ngang hay
dọc):
- **`intra_group_gap` = 12px**: giữa 2 phần tử là con của CÙNG 1 nhóm/
  section/accordion — dù xếp cạnh nhau hay xếp chồng.
- **`inter_block_gap` = 16px**: giữa 2 khối/section ĐỘC LẬP không cùng
  nhóm — dù cũng xếp cạnh nhau (nội dung chính ↔ panel phụ trợ, màn
  order-list) hay xếp chồng (2 accordion độc lập, 2 card độc lập).

Đây đúng ứng dụng của **Law of Proximity** ("các phần tử gần nhau được
hiểu là liên quan hơn") kết hợp **Law of Common Region** — khoảng cách là
tín hiệu thị giác cho MỨC ĐỘ LIÊN QUAN, phải đo bằng quan hệ nhóm trong
cây nội dung, không phải bằng hướng vẽ trên màn hình. Rule hoá đầy đủ ở
`rules/_foundation.rules.yaml § spacing_role.rules.FND-SPC-03` — **[ĐỀ
XUẤT, CHƯA duyệt]**.

**[ĐÃ ĐÓNG 14/09-A — Williams]**: giá trị 24px đo ở panel phải màn
order-list (4 khối icon+label+value xếp dọc, TRONG CÙNG 1 panel — theo mô
hình 2 mức ở trên lẽ ra phải là 12px, không phải 24px) — Williams xác
nhận: **"UI này đã outdate bỏ qua"**. Loại khỏi bằng chứng cho
`spacing_role`, KHÔNG áp dụng cho build mới. Đây là phản chứng DUY NHẤT
của mô hình `intra_group_gap`/`inter_block_gap` — sau khi loại bỏ, mô hình
không còn dữ liệu nào mâu thuẫn.

## 4. Overlay/Backdrop — PHÁT HIỆN XUNG ĐỘT 3 NGUỒN, CHƯA TỰ CHỌN

Đọc trực tiếp instance "overlay" thật (`10016:7629`, dùng trong ví dụ Popover
trên trang Layout structure) qua `use_figma`:

- Instance gốc: `opacity=1`, fill riêng của instance là `visible:false`
  (không phải nơi áp dụng overlay thật).
- Con thật bên trong (`I10016:7629;1193:12317`, tên "overlay", RECTANGLE):
  **`opacity=0.5`** (50%), fill màu solid bind vào biến
  `VariableID:508f6c32201f8c78b86eed642829b7508ceb639d/480:499`, resolve tên
  = **`🟣 bg/app/invers`** (nguyên văn Figma ghi thiếu chữ "e" — "invers" chứ
  không phải "inverse") — KHÔNG phải `bg/app/baseBlack`.

**3 nguồn hiện có, KHÔNG khớp nhau:**
1. Annotation text trên trang Layout structure: "overlay màu đen, **opacity
   30%**".
2. Xác nhận bằng lời của Williams trước đó (xem `_shared.binding.yaml` §
   color_tokens.resolved_values.backdrop, ghi "[XÁC NHẬN — Williams 13/09]"):
   **`bg/app/baseBlack` @ `Opacity/O5` (50%)**.
3. Component overlay THẬT đã render trong file: **`bg/app/inverse`
   (#18181b) @ 50%** — khớp opacity với nguồn (2), nhưng KHÁC TÊN MÀU (không
   phải baseBlack/#000000).

Không tự chọn nguồn nào — ghi rõ cả 3, để Williams quyết định nguồn nào là
chuẩn thật (có thể nguồn (1) chỉ là ghi chú cũ chưa cập nhật sau khi đổi màu
từ baseBlack sang inverse, nhưng đây là SUY ĐOÁN, chưa xác nhận).

**[ĐÃ ĐÓNG 13/09-X — Williams]**: Williams review lại đúng đoạn quote nguồn
(3) ở trên và quyết định: *"tao quyết định là nguồn bg/app/baseBlack - 50%
opacity"*. Nguồn CHUẨN CHÍNH THỨC cho overlay/backdrop = **`bg/app/baseBlack`
@ 50% opacity** (nguồn (2)) — KHÔNG phải nguồn (3) (component thật render
`bg/app/invers`) và KHÔNG phải nguồn (1) (annotation "30%"). Xem
`_foundation.rules.yaml § FND-CLR-01.resolved_13_09_X` và
`_shared.binding.yaml § color_tokens.backdrop.resolved_13_09_X`.

**[ĐÃ ĐÓNG 14/09-B — Williams]**: "Không cần sửa lại đâu mày ghi nhớ luật
cho các thiết kế sau là được" — component overlay thật (node `10016:7629`)
GIỮ NGUYÊN (không rework), vẫn render `bg/app/invers`, không khớp quyết
định trên — nhưng rule engine (FND-CLR-01, OVL-B-01) ghi nhớ đúng
`bg/app/baseBlack` cho mọi thiết kế MỚI từ nay. Component cũ không còn là
tiền lệ đúng để tham chiếu.

## 5. Phát hiện thêm — token MỚI chưa từng khảo sát

Qua `get_variable_defs` trên các node thật ở trên, phát hiện thêm nhiều
token Color Mode + 1 loại token hoàn toàn mới (Effect/Shadow) chưa từng có
trong khảo sát nền tảng 13/09-H:

- **Màu thương hiệu chính**: `bg/primary/default` = **#ff5200** (cam GHN) —
  chưa từng ghi trong `_shared.binding.yaml` trước đây dù đây rất có thể là
  màu primary quan trọng nhất hệ thống.
- Màu semantic khác lần đầu thấy: `text-grey` (#6b7280), `text-success`/
  `bg/success/default` (#10b981), `bg/success/muted` (#ecfdf5),
  `text-success-hover`/`icon-success-hover` (#059669), `border/grey/
  muted-active` (#d1d5db), `text-inverse` (#fafafa, KHÁC "invers" ở § 4 —
  đây là text color, không phải bg), `icon-inverse` (#f3f3f3).
- **Effect/Shadow token — LOẠI TOKEN MỚI, CHƯA TỪNG KHẢO SÁT**: `Shadows/md`
  = 2 lớp drop-shadow thật (`#1018281A` offset 0/1 blur 3; `#0000001A` offset
  0/1 blur 2 spread -1) — dùng trên card thật. 13/09-H chỉ khảo sát 4
  collection biến (Primitives/Color Mode/Dimensions/Breakpoints) + Text
  Style — CHƯA khảo sát Effect Style của file GHN DS gốc. Đây là 1 gap thật,
  không phải lỗi đánh máy.

## 6. Nền trang (page background) — 1 khối vs NHIỀU khối nội dung

[MỚI 13/09-V, theo yêu cầu Williams] Williams chỉ ra 2 trang thật đối lập
nhau về cách dùng nền:

- **Nền xám** (nhiều khối): node `21219:13371` — trang chi tiết khách hàng,
  chứa NHIỀU card độc lập ("Thông tin chung", "Giấy phép kinh doanh",
  "Thông tin thanh toán", khối tab "Sprint 66", khối "Thông tin lịch sử").
  Đọc `fills` qua `use_figma`: canvas có fill solid RGB
  `(0.9569, 0.9569, 0.9608)` = **#f4f4f5**, bind vào 1 biến variable — khớp
  CHÍNH XÁC với `bg/app/elevated` đã có trong `color_tokens.resolved_values`
  (đọc từ 13/09-H). 2 card con đã kiểm (`21219:13373` "Thông tin chung",
  `21219:13405` "Giấy phép kinh doanh") đều fill trắng `#ffffff` — nhưng
  **KHÔNG bind vào biến nào** (`boundVariables: {}`) — khác với canvas (có
  bind). Ghi đúng như đọc được, không suy diễn đây là cố ý hay sai sót.
- **Nền trắng** (1 khối): node `16525:73666` ("[Giá xăng dầu] Danh sách") —
  trang chỉ có 1 bảng danh sách duy nhất chiếm toàn bộ nội dung. Đọc `fills`:
  canvas fill trắng `#ffffff`, bind vào variable id
  `7205590b6eedf1f8d158bc77332a5eb9ca0d44f4/3123:923` — ĐÂY LÀ CÙNG variable
  id đã xác nhận là `bg/app/baseWhite` cho nền BottomSheet (13/09-H) — tức
  trang 1-khối dùng THẲNG bg/app/baseWhite cho canvas, không qua lớp xám
  trung gian.

**Kết luận**: khi trang có ≥2 khối nội dung độc lập → canvas = `bg/app/
elevated` (xám nhạt), từng khối = trắng (tạo tương phản). Khi trang chỉ có
1 khối → canvas = `bg/app/baseWhite` (trắng) trực tiếp, không cần lớp xám.
Đây đúng ứng dụng của **Law of Common Region** (Gestalt) — xem § 7.

**[ĐÃ ĐÓNG 13/09-W — Williams]**: "2 khối trở lên là nhiều" — ngưỡng chính
thức, không còn là giả định.

## 7. Nguồn UX Foundation — lawsofux.com

[MỚI 13/09-V, theo yêu cầu Williams: "Bổ sung thêm 1 số UX foundation
knowledge bằng các nguồn học thuật uy tín... tao đề xuất lawsofux.com"]. Đọc
trực tiếp lawsofux.com, trích nguyên văn định nghĩa các nguyên lý liên quan
trực tiếp tới các rule đã viết ở trên — đầy đủ trong
`rules/_foundation.rules.yaml § ux_foundations`:

- **Law of Common Region** (Gestalt): "Elements tend to be perceived into
  groups if they are sharing an area with a clearly defined boundary." —
  nền tảng cho `page_background_role` (§ 6).
- **Law of Proximity**: "Objects that are near, or proximate to each other,
  tend to be grouped together." — nền tảng cho `spacing_role` (§ 3).
- **Chunking**: "A process by which individual pieces of an information set
  are broken down and then grouped together in a meaningful whole." — nền
  tảng cho `spacing_role`.
- **Cognitive Load**: "The amount of mental resources needed to understand
  and interact with an interface." — lý do KHÔNG dùng lẫn spacing giữa các
  vai khác nhau.
- **Law of Prägnanz**: "People will perceive and interpret ambiguous or
  complex images as the simplest form possible..." — nền tảng cho
  `typography_role` (page_title/section_title phải khác biệt rõ để não
  người tự động phân nhóm đúng).
- Ghi lại thêm 4 nguyên lý liên quan nhưng CHƯA gắn vào rule cụ thể nào
  (Law of Similarity, Law of Uniform Connectedness, Aesthetic-Usability
  Effect, Von Restorff Effect) — để dành, xem
  `rules/_foundation.rules.yaml § ux_foundations` cho ghi chú đầy đủ.

## Việc CÒN MỞ, chưa tự kết luận

- **[ĐÃ ĐÓNG 13/09-Y]** Spacing đã khảo sát thêm 2 màn (form tạo mới, chi
  tiết) — 3/4 vai giữ nguyên, coi là quy luật hệ thống. Còn 1 điểm phát
  sinh MỚI chưa đóng: xem bullet gutter ngang bên dưới.
- **[ĐÃ ĐÓNG 13/09-X, 14/09-B]** Xung đột overlay/backdrop (§ 4) — Williams
  chọn `bg/app/baseBlack` @ 50%. Component thật (node `10016:7629`) KHÔNG
  cần sửa lại — Williams: "ghi nhớ luật cho các thiết kế sau là được".
- Effect Style — mới thấy 1 token, chưa khảo sát toàn bộ danh sách effect
  style thật của file GHN DS gốc.
- **[ĐÃ ĐÓNG 13/09-Y]** `bg/primary/default` (#ff5200) — XÁC NHẬN là token
  thương hiệu chính (ramp Primitives riêng + 3 vai bg/icon/text cùng trỏ
  #ff5200).
- **[ĐÃ ĐÓNG 13/09-Y]** `section_title` = Title 1 cho màn build MỚI — màn
  Sprint 62 (H6 cũ) Williams xác nhận KHÔNG cần rework, giữ nguyên.
- **[ĐÃ ĐÓNG 14/09-B]** Gutter ngang 12 vs 16 — mô hình
  `intra_group_gap`(12)/`inter_block_gap`(16) (FND-SPC-03) đã đăng ký chính
  thức cùng toàn bộ `_foundation.rules.yaml`.
- **[ĐÃ ĐÓNG 14/09-A]** Giá trị 24px ở panel phải màn order-list — Williams
  xác nhận UI đó đã outdate, loại khỏi bằng chứng cho spacing_role.
- **[ĐÃ ĐÓNG 14/09-B — Williams: "Okay tao đồng ý"]** Kiến trúc file
  `rules/_foundation.rules.yaml` (layer riêng, portable, always-load) đã
  duyệt — ĐĂNG KÝ CHÍNH THỨC vào `manifest.yaml § rule_layers`.
