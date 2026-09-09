# Design Style Guide — GHN FTL B2B

Nguồn: học trực tiếp từ file Figma `s2NE6ikwLnsZSUp97RBfof` (B2B - Tạo đơn)
qua Figma MCP (`get_screenshot`, `get_variable_defs`) ngày 2026-08-02, đối
chiếu với context Williams cung cấp trực tiếp trong chat. Đây là quy chuẩn
**bắt buộc tuân thủ 90%+** khi sinh Design Specs / JSON spec cho bất kỳ màn
hình nào — không tự sáng tạo UI style mới nếu đã có pattern tương tự ở đây.

Đọc file này SAU KHI đọc `DESIGN-PIPELINE.md` — file đó nói VỀ QUY TRÌNH,
file này nói VỀ CÁCH MỌI THỨ PHẢI TRÔNG NHƯ THẾ NÀO.

## Nguyên tắc tối thượng: đơn giản hơn là đúng hơn

Khi thiết kế flow hoặc UI nhiều bước, LUÔN ưu tiên phương án ít bước, ít
visual noise nhất có thể mà vẫn đủ chức năng. User không thích flow dài,
không thích thông tin rối. Trước khi thêm 1 step, 1 field, 1 block mới —
tự hỏi: "có cách nào gộp lại, bỏ bớt, hoặc ẩn theo điều kiện không?". Nếu
Design Specs yêu cầu 1 flow phức tạp bất thường, chủ động đề xuất bản rút
gọn hơn cho user chọn, thay vì mặc định vẽ theo đúng số bước liệt kê.

## 1. Design tokens xác nhận trực tiếp từ file (KHÔNG suy đoán, dùng đúng tên)

### Màu nền (bg)
| Token | Hex | Dùng khi nào |
|---|---|---|
| `bg/app/baseWhite` | `#ffffff` | Trang chỉ có 1 component/block, không cần phân biệt |
| `bg/app/elevated` | `#f4f4f5` | Trang có nhiều block cần tăng contrast; cũng dùng cho breadcrumb block |
| `bg/secondary/active` | `#004f7b` | Header của 1 block con (dạng thanh màu) khi trang mẹ ĐÃ nền trắng và cần phân biệt block bằng màu thay vì bằng nền xám (case đặc biệt — xem mục 3) |
| `bg/secondary/default` | `#006fad` | Nút/nhãn nhấn mạnh thứ 2 khi có 2 hành động ngang cấp (xem mục 6) |
| `bg/primary/default` | `#ff5200` | Nút hành động chính (Fill Primary) |
| `bg/grey/muted` | `#f3f3f3` | Nền phụ nhạt hơn elevated 1 chút (badge, ô input disabled...) |
| `bg/app/disabled` | `#e4e4e7` | Trạng thái disabled |
| `bg/success/muted` / `bg/error/muted` | `#ecfdf5` / `#fef2f2` | Nền badge trạng thái thành công/lỗi |

### Màu chữ (text) & icon
| Token | Hex |
|---|---|
| `text/text-default` | `#09090b` |
| `text/text-muted` | `#52525b` |
| `text/text-placeholder` | `#71717a` |
| `text/text-primary` | `#ff5200` |
| `text/text-secondary` | `#006fad` |
| `text/text-error` | `#ef4444` |
| `text/text-success` | `#10b981` |
| `text/text-inverse` | `#fafafa` (chữ trên nền tối) |

### Typography (dùng tên style, không tự chọn font-size rời)
| Style | Font spec |
|---|---|
| `Title/Title 1` | Inter Bold 16/24 — tiêu đề header trang, tiêu đề block heading |
| `Sub Title/Subtitle 1` | Inter SemiBold 16/24 |
| `Sub Title/Subtitle 2` | Inter SemiBold 14/24 — **header row của bảng dữ liệu** |
| `Sub Title/Subtitle 3` | Inter SemiBold 12/20 |
| `Content/Body 1` | Inter Regular 16/24 |
| `Content/Body 2` | Inter Regular 14/24 — nội dung cell bảng, nội dung form phổ biến nhất |
| `Content/Body 3` | Inter Regular 12/20 |
| `Heading/Bold/H4-H6` | dùng cho tiêu đề trang lớn (H6 = 18/28, H5 = 20/32, H4 = 26/36) |
| `Button/Button L` | SemiBold 16, dùng cho button size md/lg |
| `Button/Button S` | SemiBold 12, dùng cho button size sm |

### Spacing & Radius
Dùng đúng thang `Spacing/S0` → `Spacing/S48` (0/2/4/6/8/10/12/16/18/24/32/40/48px)
và `Radius/R0, R2, R4, R8, R16, R64, R128, rounded-full` — không tự đặt số
px rời rạc ngoài thang này trừ khi Design Specs yêu cầu rõ.

## 2. Layout khung trang

**Đã chốt với Williams (2026-08-02):** Frame tổng = **1728×1080**, chia
thành Sidebar trái **300px** + Content **1428px**. 1428 không phải chuẩn
cũ thay bằng 1728 — 2 con số này luôn đi cùng nhau, không mâu thuẫn:
`1728 = 300 (sidebar) + 1428 (content)`.

**Bắt buộc khi sinh JSON cho 1 trang đầy đủ (full page)**: PHẢI vẽ đủ 3
phần dưới đây trong cùng 1 frame, KHÔNG được chỉ vẽ riêng content bên
trong rồi bỏ qua sidebar/breadcrumb — trừ khi user nói rõ chỉ cần
1 block/component riêng lẻ (không phải cả trang):

1. **Sidebar** (300px, bên trái, full height) — menu chính, các mục hiện
   có: Quản lý khách hàng, Quản lý đơn hàng, Cấu hình gác đêm, Quản lý địa
   điểm, Quản lý chứng từ (sub: Quản lý địa điểm nhận chứng từ), Quản lý
   chuyến đi, Quản lý chi phí FTL (sub: Giá xăng dầu, Chi phí lương, Chi
   phí FTL, Chi phí phát sinh), Quản lý SOP (sub: Link hướng dẫn SOP, FTL
   Dynamic SOP). Item đang active tô cam + gạch cam bên phải nếu là
   sub-item. Component menu: `node-id=21581-10578`.
2. **Breadcrumb block** (trong vùng content, 1428px, nằm trên cùng) — nền
   `bg/app/elevated`, có đường dẫn breadcrumb (vd "Quản lí khách hàng >
   Chi tiết khách hàng") + avatar user góc phải.
3. **Header block** (ngay dưới breadcrumb, xem mục 5) — Title + back
   button/status/action button theo ngữ cảnh trang.

Sau đó mới tới nội dung chính của trang (table/form/block...).

## 3. Quy tắc nền trang (background)

| Trường hợp | Nền |
|---|---|
| Trang chỉ có 1 component/block duy nhất (vd bảng Chi phí phát sinh) | `bg/app/baseWhite` |
| Trang có nhiều block cần phân biệt bằng contrast (vd trang Chi tiết khách hàng nhiều card) | `bg/app/elevated` |
| Trang là sub-thông tin của 1 tab | `bg/app/elevated` |
| Trang nhiều block (đã nền xám) NHƯNG bên trong 1 block con lại có sub-tab/nhiều block nữa | Block con đó đổi ngược lại nền TRẮNG, phân biệt bằng heading bar màu `bg/secondary/active` thay vì bằng nền xám (không xám lồng xám) — case này xác nhận qua `node-id=21240-84239`, ví dụ "Danh sách bảng giá FTL", "Danh sách phụ phí" |

## 4. Bảng dữ liệu (Table)

Xác nhận qua nhiều bảng thật: `node-id=17583-166696` (Chi phí phát sinh,
bảng fixed), `node-id=19277-22191` (bảng địa điểm, scrollable), và bảng
trong `node-id=21240-84239`.

**Bảng nhiều cột (>10 cột, sau khi đã cân nhắc gộp cột ở mục dưới) BẮT
BUỘC dựng bằng 2 frame con đặt cạnh nhau** trong 1 frame `HORIZONTAL` cha
— khớp đúng cấu trúc thật `node-id=21636-24994` (Chi phí phát sinh):
- Frame trái **fixed**, width cố định bằng tổng các cột fixed (checkbox +
  1-2 cột định danh quan trọng + Thao tác) — KHÔNG set `scrollable`.
- Frame phải **scroll ngang**, width cố định bằng phần còn lại của trang,
  BẮT BUỘC set `"scrollable": "HORIZONTAL"` (xem field mới trong
  `claude-json-schema-prompt.md` mục 3) nếu tổng bề ngang các cột bên
  trong vượt quá width đã set — nếu không set, frame sẽ phình vượt khung,
  vỡ layout toàn trang (lỗi thật đã gặp 2026-08-02, xem
  `spec-history/chi-phi-phat-sinh-duyet-v2.json` bản đã sửa).

- Header row: chữ **`Sub Title/Subtitle 2` (SemiBold 14/24)**, nền
  `bg/app/elevated` (`#f4f4f5`).
- Nội dung cell: `Content/Body 2` (Regular 14/24), màu `text-default`; cell
  phụ/ít quan trọng dùng `text-muted`.
- Cột **Người cập nhật** luôn đứng NGAY TRƯỚC cột **Ngày cập nhật**, 2 cột
  này luôn liền kề nhau, không xen cột khác ở giữa.
  - Format Người cập nhật: `[ID 6 số] - [Tên người cập nhật]` (vd
    `200300 - Muy 020793`).
  - Format Ngày cập nhật: `DD/MM/YYYY` nếu dữ liệu ít thay đổi;
    `DD/MM/YYYY HH:MM` nếu dữ liệu thay đổi nhiều/tần suất cao.
- Cột **Thao tác** luôn là cột CUỐI CÙNG bên phải, không có ngoại lệ.
- Bảng dài/scroll dọc: dùng phân trang dưới cùng dạng
  `‹ Previous  1 [2] 3 4 … 23  Next ›` + dropdown "10 hàng / Trang" bên
  phải cùng hàng.
- Bảng **fixed trong trang** (không cuộn riêng, cuộn theo cả trang): KHÔNG
  thêm shadow cho cột fixed/sticky. Chỉ thêm shadow khi bảng tự cuộn ngang/
  dọc độc lập với trang (để phân biệt vùng sticky đang che nội dung).
- Trạng thái trong bảng dùng badge màu semantic (badge xanh lá nhạt =
  "Đang hoạt động", badge cam nhạt = "Hoạt động từ [ngày]", badge xám =
  "Lưu nháp", badge đỏ nhạt = "Hết hiệu lực") — không dùng chữ thường
  không có badge cho trạng thái.
- Cột Thao tác: các nút phụ dùng Outline nhỏ (vd "Bật hoạt động", "Sửa
  lịch hoạt động") + nút "..." (more actions) nếu còn hành động khác; hoặc
  bộ icon-only (Xem chi tiết / Sửa / Xoá) tuỳ độ phức tạp — xem ví dụ thêm
  `node-id=21240-84241`.
- **Bảng multi-tab/multi-filter theo trạng thái (vd luồng duyệt/từ chối):
  một số cột CHỈ tồn tại ở tab tương ứng ngữ cảnh đó, KHÔNG mặc định có ở
  mọi tab cùng luồng** — xác nhận `node-id=17583-166696` (Chi phí phát
  sinh): tab "Đã duyệt" có 2 cột riêng "Số tiền đã duyệt" + "Lý do" mà tab
  "Tất cả" không có (khớp đúng schema với bảng "Full data" tham chiếu
  `node-id=21636-24994`, cũng không có 2 cột này). Trước khi giả định 1
  cột có mặt ở tất cả tab của cùng 1 bảng — kể cả khi task chỉ yêu cầu
  "làm giống tab kia" — PHẢI dò cấu trúc cột thật của TỪNG tab liên quan
  trước, không suy đoán theo tab đã biết; nếu 2 tab lệch schema, hỏi lại
  user cách xử lý (bỏ qua tab thiếu cột mốc / thêm luôn cột mốc đó / khác)
  thay vì tự quyết (case thật 2026-08-05).

### Gộp cột khi bảng quá dài (>10 cột)

Xác nhận `node-id=21665-19069`. Khi 1 bảng có **nhiều hơn 10 cột dữ liệu**,
cân nhắc gộp các field CÙNG NHÓM THÔNG TIN vào 1 cột duy nhất (nhiều dòng
xếp chồng trong cùng ô) thay vì mỗi field 1 cột riêng — mục tiêu giảm bề
ngang bảng, đỡ phải cuộn ngang quá dài, giảm visual noise.

Nguyên tắc chọn field để gộp: chỉ gộp khi các field đó **cùng mô tả 1 đối
tượng/nhóm** (vd cùng thuộc về "định danh đơn hàng", cùng thuộc "thông tin
liên hệ người nhận") — KHÔNG gộp field không liên quan nhau chỉ để cho gọn.

Ví dụ đã xác nhận (`node-id=21665-19069`):
- Cột **Mã đơn** gộp 3 dòng: mã đơn (đậm) + badge trạng thái đơn (Chờ bàn
  giao/Đang giao/Đang hoàn hàng/...) + "Ngày tạo: DD/MM/YYYY HH:MM" — cả 3
  đều thuộc nhóm "định danh & trạng thái đơn hàng".
- Cột **Bên nhận** gộp 3 dòng: tên người nhận + SĐT + tỉnh/thành — cả 3
  đều thuộc nhóm "thông tin liên hệ người nhận".
- Cột đơn lẻ như **Thu chứng từ** (badge Có/Không) KHÔNG gộp thêm gì —
  field không thuộc nhóm nào khác trong bảng thì giữ nguyên 1 cột riêng.

Pattern này thực ra ĐÃ được áp dụng sẵn ở bảng Chi phí phát sinh (mục 3
`design-specs/chi-phi-phat-sinh-duyet.md`): cột "Khách hàng" gộp tên +
chip mã chuyến, cột "Loại điểm" gộp tên điểm + chip loại điểm — cùng 1
nguyên tắc, chỉ là chưa được ghi thành quy tắc chính thức tới nay.

Khi quyết định gộp cột nào, LUÔN cân nhắc trước, không tự ý gộp nếu Design
Specs/dữ liệu tham chiếu không gợi ý rõ nhóm nào đi cùng nhau — hỏi lại
user nếu không chắc 2 field có nên gộp chung 1 cột hay không.

## 5. Header trang (Page Header)

Cấu thành từ tối đa 4 nhóm, luôn theo đúng thứ tự trái → phải:

```
[Button trở về — optional] [Title — bắt buộc] [Status badge — optional]  ...  [1-2 Button — optional]
```

- Trang chính (top-level trong sidebar): KHÔNG có nút trở về.
  (`node-id=19138-89278`)
- Trang con/chi tiết: CÓ nút trở về (icon mũi tên trái + "Trở về", dạng
  text link không viền). (`node-id=21240-72804`)
- Trang chi tiết: Title = tên bản ghi (vd `[11465] - Công ty TNHH Vận Tải
  An Phú`) + status badge ngay sau nếu có (vd "Đang hoạt động" nền xanh lá
  nhạt) + button chỉnh sửa Outline cam bên phải nếu trang cho phép sửa
  toàn bộ (vd "Thay đổi thông tin khách hàng"). Xác nhận
  `node-id=21219-13353`. Height thanh header = **72px** (đồng bộ với
  height block heading ở mục 7).
- **Chữ Title trong Page Header dùng `Heading/Bold/H5` (fontSize 20,
  fontWeight Bold)** — khác với Title trong Block heading (mục 7, dùng
  `Title/Title 1` fontSize 16 Bold). Đừng nhầm 2 style này — Page Header
  luôn to hơn 1 bậc so với Block heading bên trong trang. Xác nhận
  2026-08-02 (trước đó dùng nhầm Title 1 16px cho Page Header).

## 6. Quy tắc chỉnh sửa (Edit)

- Trang khi vào chế độ chỉnh sửa đổi tên thành `Chỉnh sửa [tên thông tin]`
  (vd "Chỉnh sửa thông tin khách hàng", "Chỉnh sửa thông tin nhà cung cấp").
- Nút chỉnh sửa (Outline cam) đặt **trên Header trang** → khi bấm, edit
  TOÀN BỘ nội dung trang bên dưới (không chỉ 1 block). Ví dụ
  `node-id=21219-13353`.
- Nút chỉnh sửa (Outline cam) đặt **trên 1 block cụ thể** → khi bấm chỉ
  ảnh hưởng riêng block đó, mở Modal chỉnh sửa (case phức tạp) hoặc chuyển
  trực tiếp sang trạng thái edit tại chỗ (case đơn giản). Ví dụ
  `node-id=21857-106753`.
- Nếu dữ liệu đang sửa có thuộc tính bật/tắt hoạt động (on/off) → control
  on/off đặt bên PHẢI, ngang hàng với tiêu đề thông tin chung (không đặt
  cuối form). Ví dụ `node-id=20717-39764`.

## 7. Block (Card) trong trang

Mọi block LUÔN chia 2 phần: **Block heading** + **Block content**.

- Block heading mặc định (phổ biến nhất): chỉ có TEXT + optional button,
  KHÔNG có nền màu riêng, hoà chung nền block (thường trắng). Chữ dùng
  `Title/Title 1` (Bold 16/24). Height cố định **72px**. Ví dụ
  `node-id=21240-72871` ("Thông tin thanh toán").
- Block heading dạng thanh màu (case đặc biệt — xem mục 3): nền
  `bg/secondary/active` (`#004f7b`), chữ trắng `text-inverse`, dùng khi
  block con nằm trong 1 trang/tab đã có cấu trúc riêng, cần phân biệt rõ
  bằng màu thay vì bằng nền xám lồng nhau.

## 8. Nhóm nút (Button group) trên toolbar

Bố cục 2 nhóm cố định, không đảo vị trí:

```
[Bộ lọc] [Ô Search]  ................  [Tuỳ chỉnh cột] [Xuất dữ liệu] [Hành động chính]
        (luôn bên trái)                              (luôn bên phải)
```

- **Bên trái**: nút "Bộ lọc" (icon phễu, Outline) + ô search (placeholder
  dạng "Tìm kiếm theo ..."). Xác nhận `node-id=21715-50534`.
- **Bên phải**: nút "Tuỳ chỉnh cột" (Outline) → nút "Xuất dữ liệu" (Outline,
  LUÔN kèm icon `arrow-down-to-line`) → nút hành động chính (Fill Primary
  cam). Thứ tự này cố định, hành động chính luôn NGOÀI CÙNG bên phải.
- **CHỈ 1 nút Fill Primary (cam)** trên 1 toolbar. Nếu có 2 hành động
  ngang cấp quan trọng như nhau: hành động user bấm THƯỜNG XUYÊN HƠN giữ
  Fill Primary cam, hành động còn lại đổi màu khác để tạo điểm nhấn riêng
  (đã dùng `bg/secondary/default` #006fad — xanh dương) thay vì Outline
  đơn thuần. Xác nhận `node-id=19446-3079` (nút "+ Tạo địa điểm" xanh dương
  cạnh "+ Tạo nhiều điểm" cam).

## 9. Breadcrumb block

Nằm đầu content area, nền `bg/app/elevated`, chứa đường breadcrumb dẫn
hướng (dạng "Trang cha > Trang hiện tại", cấp hiện tại tô đậm/cam) +
avatar user ở góc phải cùng hàng.

## 10. Upload Excel

Cấu trúc block xác nhận `node-id=21445-27407`:

```
[Block heading: "Tạo đơn LTL bằng Excel"]
┌─────────────────────────────────────────┐
│   Tải [tên file] hoặc kéo thả vào đây     │  ← chữ cam, click được
│   Tải file mẫu (định dạng .xlsx) để...    │  ← chữ xám nhỏ
│                                            │
│        [File mẫu]      [⬆ Tải lên]        │  ← Outline xám round + Outline cam round
└─────────────────────────────────────────┘
```

- Vùng thả file: viền dashed, nền `bg/app/elevated` nhạt.
- Nút "File mẫu" (tải file mẫu xuống): Outline **xám** round, icon
  download.
- Nút "Tải lên": Outline **cam** round, icon upload.

## 11. Popup (thông báo cần confirm nhanh)

Mọi popup đều là **card nền TRẮNG**, nổi giữa màn hình, phía sau có lớp
**overlay tối tiêu chuẩn** (backdrop bán trong suốt đen, che luôn phần nội
dung trang đang edit dở phía dưới — không cần lo phải giữ nguyên/reset lại
background trang gốc khi mở popup, overlay tự lo việc đó). Overlay này dùng
chung cho MỌI popup/modal, không phải style riêng của popup nào.

4 loại xác nhận:

1. **Popup hành động** (xoá / lưu / không lưu thay đổi) —
   `node-id=20755-57687`. Card trắng, cấu trúc: icon tròn màu status ở
   giữa (icon thùng rác đỏ cho xoá) + tiêu đề đậm + mô tả ngắn + 2 button
   cuối (Outline xám "Huỷ" | Fill status màu tương ứng, vd đỏ "Xoá điểm").

2. **Popup upload Excel lỗi 1 phần (import 1 phần)** —
   `node-id=20721-41577`. Header "Kết quả xử lý" + icon cảnh báo vàng +
   tiêu đề "File có dữ liệu lỗi cần chỉnh sửa" + tên file (dạng chip xanh
   nhạt) + mô tả + 2 ô thống kê cạnh nhau (số hợp lệ màu xanh lá | số lỗi
   màu đỏ) + 2 button cuối (Outline "Đóng" | Fill cam "Tải file xử lý").
   Áp dụng khi hệ thống cho phép lưu phần dữ liệu hợp lệ, bỏ qua dữ liệu
   lỗi (import 1 phần).
   - Nếu hệ thống là **import toàn phần** (tất cả phải hợp lệ mới lưu) —
     UI giữ nguyên y hệt, chỉ đổi mô tả thành: "Tải file xử lý để xem kết
     quả, chỉnh sửa và tải lên lại. Chỉ tất cả dữ liệu hợp lệ mới được lưu
     vào hệ thống." PRD không nói rõ import 1 phần hay toàn phần → PHẢI
     hỏi lại user, không tự đoán.

3. **Popup lỗi toàn bộ** — `node-id=18781-99357`. Cùng khung với popup lỗi
   1 phần, khác nội dung: icon cảnh báo ĐỎ (không phải vàng), tiêu đề
   "Không có dữ liệu hợp lệ", 2 ô thống kê vẫn giữ nguyên cặp (hợp lệ = 0,
   lỗi = số thật, vd "0 dữ liệu hợp lệ / 35 dữ liệu lỗi"), 2 button cuối
   giống hệt loại lỗi 1 phần (Outline "Đóng" | Fill cam "Tải file xử lý").
   Áp dụng khi TOÀN BỘ dữ liệu upload đều lỗi, không có dòng nào hợp lệ.

4. **Popup thành công** — `node-id=18786-102648`. Header "Kết quả xử lý" +
   icon check tròn XANH LÁ + tiêu đề "Tất cả dữ liệu hợp lệ" + tên file +
   mô tả "Toàn bộ dữ liệu hợp lệ đã được lưu vào hệ thống" + 2 ô thống kê
   (hợp lệ = tổng số, lỗi = 0) + **CHỈ 1 button** cuối, căn phải: Fill cam
   "Xác nhận" (khác 2 loại kia — không có nút "Đóng" phụ, vì hành động đã
   hoàn tất, không cần huỷ).

## 12. Modal

Dùng khi thao tác cần hành vi phức tạp hơn popup (nhập liệu form, chọn
nhiều thông tin...). Xác nhận `node-id=21708-49803` (modal "Duyệt chi
phí"). Cùng overlay tối tiêu chuẩn như popup (xem mục 11), card modal nền
trắng nổi lên trên.

```
┌───────────────────────────────────────┐
│  [Tiêu đề modal]                    ✕  │  ← header
├───────────────────────────────────────┤
│  [Card nền xám: tóm tắt thông tin      │
│   liên quan, dạng label: value]        │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│  [Form nhập liệu — label + input,      │
│   dấu * đỏ cho field bắt buộc]         │
│                                         │
│                [Huỷ/Từ chối] [Primary] │  ← footer, luôn căn phải
└───────────────────────────────────────┘
```

- Card tóm tắt phía trên (nếu có): nền `bg/app/elevated`, layout
  label:value 1 cột, label màu `text-muted`, value đậm.
- Field bắt buộc: dấu `*` màu đỏ (`text-error`) ngay sau label.
- Phải demo trạng thái báo lỗi khi field bắt buộc chưa nhập hoặc nhập sai
  định dạng (viền đỏ `border/error/default` + text lỗi nhỏ màu đỏ dưới
  field).
- Footer 2 button, LUÔN căn phải:
  - Cặp phổ biến: Outline xám round "Huỷ/Đóng" + Fill cam Primary (hành
    động chính, vd "Xác nhận duyệt").
  - Nếu có hành động từ chối/huỷ mang tính phủ định dữ liệu: dùng Fill
    đỏ (danger) thay cho Fill cam ở vị trí đó, đặt CẠNH TRÁI nút chính (vd
    "Từ chối duyệt" đỏ | "Xác nhận duyệt" cam — xem ảnh modal thật, nút
    đỏ luôn đứng trước nút cam theo thứ tự đọc trái→phải).

## 13. Bảng dữ liệu — số liệu chuẩn (xác nhận qua Figma MCP 2026-08-03)

Nguồn: file `s2NE6ikwLnsZSUp97RBfof` (B2B Tạo đơn), node `19277:22191` —
bảng "danh sách điểm". Mọi số dưới đây đọc trực tiếp từ Figma, không phải ước
lượng. Dùng `PARTIAL use:"table"` là tự áp đúng hết, **không gõ tay lại**.

**Cấu trúc: 1 dòng dữ liệu = NHIỀU ô riêng biệt, không phải 1 khối gộp.**

| Phần | Giá trị |
|---|---|
| Khung bảng | VERTICAL, `cornerRadius 8`, `clipsContent true`, viền `#d4d4d8` 1px |
| Header row | HORIZONTAL gap 0, **không có nền** (nền nằm ở từng ô) |
| Header cell | INSTANCE `🔵 Table :: Table / Table header row (Base)` — nền `#f4f4f5`, padding `[12,16,12,16]`, gap 16, cao **48** |
| Header text | Inter **Bold** 16 / lineHeight 24 / letterSpacing 0.1 / `#09090b` |
| Row | HORIZONTAL gap 0, nền `#ffffff` |
| Ô text | FRAME `row` padding `[16,0,16,0]` → FRAME `Frame 10255` padding `[0,16,0,16]` → TEXT |
| Ô text 2 dòng | FRAME `row` padding `[8,0,8,0]` gap 4 |
| Ô thao tác | FRAME `row` padding `[16,16,16,16]` gap 8, canh **PHẢI**, hug bề ngang |
| Body text | Inter Regular 16 / lineHeight 24 / letterSpacing 0.1 / `#09090b` |
| Nút trong ô thao tác | Button organism `Size: "xs"` (94×32, padding `[8,12,8,12]`) — **không dùng "sm"** |

**Kẻ lưới — hai chiều, không phải chỉ kẻ ngang:**

- **Dọc**: `strokeLeftWeight: 1` màu `#d4d4d8` trên ô từ **cột 2** trở đi
- **Ngang**: `strokeTopWeight: 1` màu `#d4d4d8` trên row từ **dòng 2** trở đi
- Ô cột 1 và dòng 1 **không kẻ** — nếu kẻ sẽ chồng lên viền khung thành viền đôi

**Chiều cao dòng**: hug theo ô có nội dung cao nhất, các ô còn lại
`fillVertical` và canh giữa theo chiều dọc. Design gốc ép cứng 80px nhưng ép
cứng làm text 3+ dòng bị cắt — hug an toàn hơn (dòng 1 ô địa chỉ 2 dòng ra
64px).

**Bề ngang cột mẫu** (tổng 1394, vừa vùng content 1428 trừ padding):
`#` 56 · `Thông tin điểm` 415 · `Loại điểm` 218 · `Địa chỉ` 487 · `Thao tác` 218

⚠️ **BUG THẬT 2026-08-03 (báo cáo bởi Williams — mỗi header cell bị bo góc
riêng, tạo hiệu ứng "khấc tròn" giữa các cột):** master component của variant
`Type=Left`/`Type=Right` trong set `🔵 Table :: Table / Table header row
(Base)` có `topLeftRadius`/`topRightRadius = 8` **bake sẵn trong chính
component gốc** — không phải do spec set. Xác nhận qua Figma MCP: bản thiết
kế gốc override thủ công 2 giá trị này về 0 trên MỌI instance đặt trong bảng
(bảng đã có `cornerRadius 8` ở khung ngoài rồi, từng ô không cần bo riêng).
Renderer đã thêm hỗ trợ `cornerRadius` cho node `INSTANCE` (trước đó chỉ
`FRAME` có) và partial `table` luôn ép `"cornerRadius": 0` trên header cell —
đã render thật lại để xác nhận hết bo góc lem.

## 14. Sidebar / Menu trái — số liệu chuẩn (xác nhận qua Figma MCP 2026-08-03)

Nguồn: master component `View=Expand`, node `14:5319`. Dùng
`PARTIAL use:"sidebar"` là tự áp đúng hết.

| Phần | Giá trị |
|---|---|
| Khung Sidebar | VERTICAL, `width 300`, gap **24**, padding `[18,0,24,0]`, nền `#ffffff` |
| Logo | VERTICAL gap 10, padding `[0,16,0,16]`, justify **CENTER**, FILL ngang |
| Container | VERTICAL gap 8, padding 0, FILL ngang |
| Frame 10246 | VERTICAL gap 0, padding `[2,2,2,2]` → item rộng **296** trong khung 300 |
| Menu item | cao 48, FILL ngang |
| Đăng xuất | nằm **NGOÀI** Frame 10246 → rộng **300** (không bị trừ padding 2) |

⚠️ **PADDING GỐC CỦA VARIANT KHÁC VỚI PADDING FILE DS THẬT DÙNG — phải
override, không được để mặc định** (đo qua Figma MCP 2026-08-03):

| Loại | Variant gốc | DS override thật |
|---|---|---|
| main menu | `[12,16,12,0]` | **`[12,12,12,12]`** + justify CENTER |
| sub menu | `[12,0,12,0]` | `[12,0,12,0]` (giữ nguyên, SPACE_BETWEEN) |
| ↳ `Frame 7547` của sub | `[0,16,0,32]` | **`[0,16,0,42]`** (thụt thêm 10px) |
| logout | `[12,16,12,0]` | **`[12,16,12,16]`** + justify CENTER |

Variant gốc của main menu lệch trái (`paddingLeft 0`, `paddingRight 16`) → để
mặc định thì icon dính sát mép trái và thừa khoảng trống bên phải. Đây là lỗi
"vẫn còn lỗi padding" Williams báo 2026-08-03. Renderer đã thêm hỗ trợ
`padding`/`gap`/`justify`/`align` + `nestedLayout` cho node `INSTANCE` (trước
đó chỉ `FRAME` có), partial `sidebar` áp sẵn đúng bảng trên.

Số liệu kiểm chứng sau khi sửa (khớp DS từng pixel): icon main menu bắt đầu ở
`x=14`, chữ sub menu ở `x=44`, item `296×48`, logout rộng `300`.

**3 property trạng thái — ĐỘC LẬP, đừng gộp chung một cờ:**

| Property | Điều khiển |
|---|---|
| `State: "Active"` | chữ + icon đổi sang **màu cam** `#ff5200` |
| `Active#4109:93` | hiện `Rectangle 1` = **thanh cam bên phải** (đang đứng ở chính mục này) |
| `Right icon#4109:96` | hiện **chevron** mở/đóng nhánh (chỉ có tác dụng ở main menu) |

Tổ hợp đúng theo DS:

- Mục cha của nhánh đang mở → `State "Active"` + `Active FALSE` + `Right icon true`
  (chữ cam + chevron, **không** có thanh cam — thanh cam thuộc về mục con)
- Sub đang chọn → `State "Active"` + `Active TRUE` + `Right icon true`
- Mục thường → `State "Default"` + `Active false` + `Right icon false`

⚠️ **BẪY TÊN PROPERTY ICON — hai vị trí trong CÙNG 1 component đặt tên khác nhau:**

| Vị trí | Nội dung icon | Cỡ |
|---|---|---|
| Icon **trái** (`Frame 7547 > font awesome / Base`) | `↳ Content#5679:21` (C hoa, **có** `↳`) | `Size` (S hoa) |
| Chevron **phải** (`font awesome / base`) | `content#5679:21` (c thường, **không** `↳`) | `size` (s thường) |

Giá trị mặc định của chevron là chuỗi **rỗng** — bật `Right icon` mà quên set
`content#5679:21` thì ô icon trống. DS dùng `"chevron-up"` cho nhánh đang mở.

Cách phân biệt lỗi khi Run trong Scripter:

- `"Could not find a component property with name: ..."` → **gõ sai tên property**
- `"Unable to update this text property because the component uses a font that
  isn't available"` → tên **đúng rồi**, chỉ là máy thiếu font. Máy hiện tại chỉ
  có Font Awesome 5/6 **Free + Brands**, thiếu **6 Pro** → mọi glyph icon đều
  bị chặn ở tầng font cho tới khi cài đúng font Pro GHN cấp.

## 15. Bài học kỹ thuật khi patch trực tiếp qua `use_figma` (xác nhận 2026-08-05)

Nguồn: sửa trực tiếp node thật khi thêm cột "Người chi trả đã duyệt" vào
bảng Chi phí phát sinh (`node-id=17583-166696`, tab Đã duyệt + Tất cả).
Đây là gotcha của Plugin API / component thật — áp dụng khi **viết script
`use_figma` để patch 1 frame đã có sẵn**, khác với quy tắc UI (mục 1-14)
áp dụng khi **sinh Design Specs/JSON spec mới**.

1. **Padding ẩn khi đo content-fit width**: instance
   `Table / Table header row (Base)` có `paddingLeft/paddingRight = 16` ở
   tầng ngoài cùng (các layer con bên trong đều padding 0). Khi đo width
   tự nhiên của label bằng text node tạm (kỹ thuật "đo rồi set width" đã
   dùng cho bảng NCC) — PHẢI cộng thêm `32` (16+16) vào width đo được.
   Thiếu bước này, label dài sẽ không wrap/không bị clip mà bị CỘT KẾ BÊN
   vẽ chồng lên (nhìn như bị cắt chữ, dễ nhầm là lỗi font).
2. **Chip trong `Chips & Tags / Chips & Tags organism` (status pill) render
   ở WIDTH CỐ ĐỊNH, KHÔNG tự hug theo độ dài label** (133px trong context
   bảng Bảng giá NCC — số cụ thể có thể khác theo context khác, nhưng hành
   vi "không hug" là nhất quán). Không giả định width chip scale theo text.
3. **Stroke bake-in theo variant `Type` (Left/Center/Right) của
   `Table / Table header row (Base)` — CÙNG root-cause với bug cornerRadius
   đã ghi ở mục 13**: default stroke của component không nhất quán giữa
   các giá trị `Type`, có thể mất viền ở 1 vài cột dù trông giống cột khác.
   LUÔN set thủ công, trực tiếp trên từng instance sau khi tạo/clone:
   `strokeTopWeight`/`strokeBottomWeight`/`strokeLeftWeight`/
   `strokeRightWeight` + `strokes` + `strokeAlign: "INSIDE"` — không dựa
   vào default của biến thể.
4. **Kỹ thuật thêm cột mirror dữ liệu 1:1 từ cột khác**: `clone()` chính
   xác cell nguồn (không chỉ copy text) để giữ nguyên structure/style/
   stroke đã fix, rồi `insertChild(index, clone)` để dời tới đúng vị trí —
   tìm `index` bằng cách match `id` của cell mốc trong `row.children`,
   không hardcode số thứ tự vì mỗi row có thể lệch id. Chỉ sửa
   `characters` (sau `loadFontAsync`) khi cần đổi LABEL (áp dụng cho ô
   header đổi tên cột) — ô data mirror thì giữ nguyên nội dung clone được.
5. **Resize 1 cột phải cascade thủ công qua nhiều tầng, không tự lan
   truyền**: mỗi cell, row (`HORIZONTAL`, `primaryAxisSizingMode: FIXED`),
   header row, và frame bọc ngoài (`VERTICAL`,
   `counterAxisSizingMode: FIXED`) đều phải `resize()` riêng — vì tất cả
   để sizing mode `FIXED` (không `HUG`), width không tự cộng dồn theo
   children. Thiếu 1 tầng nào cũng làm cột mới bị cắt/che.
6. **`get_screenshot` có thể trả về cache CŨ (đúng pixel content nhưng SAI
   kích thước report) ngay sau khi `use_figma` vừa mutate xong — không
   đáng tin để verify CẤU TRÚC.** Dùng `get_metadata` làm nguồn xác nhận
   chính (đọc thẳng document, luôn đúng ngay lập tức); chỉ dùng
   `get_screenshot` để xem bằng mắt lần cuối cho user, không lặp lại
   nhiều lần để "chờ" ảnh mới nếu `get_metadata` đã xác nhận cấu trúc đúng
   rồi — tốn token vô ích. *(Đo thực tế 2026-08-05: 14 lần gọi lại
   `get_screenshot` trên cùng node vừa xác nhận cấu trúc rồi trong 1
   session ~= 466.471 token quy đổi (weighted), ~1,8% tổng token session —
   xem đây là mức phí cụ thể của việc bỏ qua rule này, không phải ước
   lượng suông.)*
7. **`get_metadata` chỉ gọi trên node con cụ thể cần xem, KHÔNG gọi trên
   node cha chứa nhiều frame/section không liên quan.** Gọi rộng ra cả
   section cha (vd cả 1 trang PRD/Figma section) khi chỉ cần 1 frame con
   sẽ kéo về toàn bộ cây con không cần thiết — chi phí tăng phi tuyến
   theo số node trả về, không phải tuyến tính. *(Đo thực tế 2026-08-05: 1
   lần gọi `get_metadata` rộng ra cả section FT-3911 thay vì chỉ frame
   cần, gây 1 lần cache-creation spike ~1,46 triệu token quy đổi
   (weighted), ~5,8% tổng token session — là khoản lãng phí lớn nhất tìm
   được trong session này.)* Trước khi gọi, xác định rõ `nodeId` của
   đúng frame/child cần — nếu chưa biết `nodeId` con, gọi `get_metadata`
   1 lần ở mức node cha CHỈ để lấy danh sách children/id, rồi gọi lại
   đúng `nodeId` con cần cho lần xem chi tiết tiếp theo (2 lần nhỏ vẫn rẻ
   hơn 1 lần dump nguyên section).
8. **Font "Font Awesome 6 Pro" KHÔNG load được qua `figma.loadFontAsync()`
   trong sandbox `use_figma`** (báo lỗi "does not exist", dù text hiện
   sẵn trong file dùng đúng font này bình thường — có vẻ do license Pro
   không cấp cho plugin execution context). Hệ quả: KHÔNG thể đổi
   `characters` của bất kỳ text node nào đang dùng font này (ví dụ icon
   ligature kiểu "chevron-down" → "chevron-up") — set rotation lên
   node instance cũng không được vì Figma chặn override `rotation` trên
   children của instance ("cannot be overridden in an instance"). Cách
   lách khi cần đổi glyph loại này: (a) nếu có sẵn 1 node khác trong file
   đang hiện ĐÚNG glyph cần — `clone()` node đó (clone không cần load
   font, chỉ copy nguyên trạng) rồi `insertChild` vào vị trí cần, thay vì
   sửa `characters` tại chỗ; (b) nếu bắt buộc phải giữ đúng 1 instance có
   sẵn, đành bỏ qua phần đổi glyph đó và ghi rõ cho user biết để họ tự sửa
   2 click trong Figma thật (Font Awesome Pro hoạt động bình thường ngoài
   sandbox). Xác nhận 2026-08-05 khi sửa sidebar TMS.

## Câu hỏi mở

Không còn câu hỏi mở nào — toàn bộ đã được Williams xác nhận trực tiếp
ngày 2026-08-02 (frame width ở mục 2, popup ở mục 11), bổ sung 2026-08-05
(cột điều kiện theo tab ở mục 4, gotcha Plugin API ở mục 15; điểm 7 mục
15 — scope `get_metadata` đúng node con, kèm số liệu token thực tế đo
được trong session 2026-08-05; điểm 8 mục 15 — font Font Awesome 6 Pro
không load được trong sandbox `use_figma`, xác nhận khi sửa sidebar TMS).
File này coi như bản chuẩn v1, cập nhật tiếp khi có pattern UI hoặc
pattern kỹ thuật mới cần học thêm.

**Lưu ý phạm vi**: file này học từ hệ thống B2B portal. Hệ thống TMS
(sidebar "Danh sách booking / Xếp tuyến FTL / Đăng xuất", sửa ngày
2026-08-05) là 1 hệ thống RIÊNG theo lời Williams — quyết định UX/business
cụ thể của TMS (danh sách module, quy tắc active-state theo trang) chưa
được ghi vào đây để tránh lẫn 2 hệ thống; nếu cần ghi nhớ lâu dài, nên tạo
file riêng (vd `TMS-STYLE-GUIDE.md`) khi Williams xác nhận muốn có.
