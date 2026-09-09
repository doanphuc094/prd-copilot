# Mô tả màn hình: Trang chi tiết khách hàng — Portal B2B

**Trạng thái: 9/9 Open Questions đã trả lời (2026-09-05) — còn 2 việc nhỏ để làm khi build spec.json (layout Modal đối chiếu lịch sử, câu chữ chính xác text rỗng), và 1 việc kỹ thuật (bổ sung module "Quản lý khách hàng" vào `MENU-THEO-HE-THONG.md`). Sẵn sàng dùng làm input cho bước sinh spec.json.**
**Module:** Quản lý khách hàng — Portal B2B
**Loại khuôn:** Trang chi tiết (Detail page), có edit tại chỗ, không phải modal
**Mục đích (theo mô tả gốc):** BD tạo/quản lý {cấu hình bảng giá, phụ phí}; Ops điều chỉnh thông tin vận hành của khách hàng đối tác.
**Nguồn:** Figma `fileKey s2NE6ikwLnsZSUp97RBfof`, node `21219:13346` ("Trang chi tiết khách hàng FTL"), đọc trực tiếp qua Figma MCP (`get_metadata`, `get_screenshot`) ngày 2026-09-05.
**Đối chiếu component:** dùng `organization/ghn/reference/ghn-ds-keymap-flat.json` + `role-to-component-mapping.md` (vừa dựng từ `ghn-figma-pipeline`).

## 1. Context (6 dimensions)

| Dimension | Nội dung |
|---|---|
| WHAT | Trang chi tiết 1 khách hàng B2B (công ty vận tải đối tác) — xem/sửa thông tin doanh nghiệp, giấy phép kinh doanh, thông tin thanh toán; quản lý bảng giá + phụ phí theo loại dịch vụ (FTL/LTL); cấu hình cách hệ thống tự động gửi yêu cầu vận hành cho GSVT; xem lịch sử thay đổi. |
| WHY | Đây là hồ sơ trung tâm của 1 khách hàng — nơi BD nhập/duyệt điều kiện thương mại (giá, phụ phí) và Ops cấu hình cách vận hành đơn hàng của khách hàng đó, tránh phải tra nhiều màn hình rời. |
| WHO | Xác nhận theo Williams: BD quản lý khối Danh sách bảng giá + Danh sách phụ phí; Ops quản lý khối Thông tin vận hành. Chưa có cơ chế phân quyền ẩn/hiện theo role trên UI — mọi role đều thấy và bấm được hết, chỉ phân công theo quy ước nghiệp vụ. Ai sửa "Thông tin chung"/"Thông tin thanh toán" chưa rõ (không nằm trong câu trả lời). |
| HOW | 1 trang, không phải flow nhiều bước — mọi thao tác (sửa thông tin, tạo bảng giá, tạo phụ phí, đổi cấu hình vận hành) đều thực hiện tại chỗ trên cùng 1 trang, có khối riêng biệt theo từng nhóm dữ liệu. |
| EDGES | Trạng thái rỗng cho GPKD ("Chưa có tài liệu giấy phép kinh doanh") và rỗng cho bảng giá/phụ phí (xác nhận theo Williams: "Chưa có [bảng giá/phụ phí] — Chọn '[tạo bảng giá/tạo phí bốc xếp]' để bắt đầu thiết lập", xem mục 5) đã có thiết kế riêng — không phải chỉ có 1 trạng thái "đầy đủ dữ liệu". |
| HISTORY | Chưa có version trước trong `organization/ghn/screen-descriptions/` — đây là màn hình đầu tiên mô tả thật theo template PRD Copilot. |

## 2. Flow Mapping

**1 màn hình duy nhất, nhiều trạng thái hiển thị khác nhau** (không phải nhiều bước tuần tự):

```
Flow: Xem/sửa chi tiết khách hàng
  Screen 1: Chi tiết khách hàng
    - Trạng thái A: chưa có GPKD (node 21219:13346 nhánh "Thông tin chung")
    - Trạng thái B: đã có GPKD (node 21240:72798 "Tải GPKD")
    - Trạng thái C: đã có bảng giá + phụ phí (node 21240:84139 "Có bảng giá và phụ phí")
```

Lưu ý: 3 nhãn "Chi tiết KH" / "Có GPKD" / "Bảng giá & Phụ phí" thấy trên canvas Figma là **thanh chú thích do designer tự thêm để phân biệt 3 trạng thái khi xem trên canvas** — không phải UI thật, không đưa vào spec khi render.

## 3. Khu vực (theo thứ tự trên xuống)

### Khu vực A — Header trang (Page Header)

- Bên trái: nút Trở về + Title (tên khách hàng, dạng `[mã KH] - Tên công ty`, vd `[14651] - Công ty TNHH Vận Tải An Phú`) + status badge ngay sau (vd "Đang hoạt động").
- Bên phải: 1 nút hành động chính "Thay đổi thông tin khách hàng" (Outline cam).
- **Sai khác so với `role-to-component-mapping.md` hiện tại — ĐÃ XÁC NHẬN**: style guide cũ ghi nút "Trở về" là *text link không viền*, nhưng Williams xác nhận màn này đúng là dùng `⚫ Button :: Button / Button organism` (93×32) làm nút Trở về. Rule cũ trong `role-to-component-mapping.md` cần sửa lại theo thực tế này (xem mục 4).
- Khi bấm nút chính "Thay đổi thông tin khách hàng" → vào chế độ chỉnh sửa, xuất hiện **Footer action bar cố định cuối trang** gồm 2 nút **[Huỷ] [Lưu thông tin]** (xác nhận theo Williams). Footer này chưa có trên canvas Figma đã đọc — cần Williams xác nhận thêm khi build (vị trí, có che nội dung bảng bên dưới không, style Footer theo pattern nào).
- Header CHỈ CÓ DUY NHẤT 1 chức năng nút: "Chỉnh sửa thông tin" (xác nhận theo Williams). 2 nhóm nút `hidden="true"` thấy cạnh nút chính trong metadata Figma là **layer nháp/thừa, không đại diện chức năng thật nào** — bỏ qua, không đưa vào spec.json.
- Node bằng chứng: `21219:13353`.

### Khu vực B — Block "Thông tin chung" + "Giấy phép kinh doanh" (2 cột cùng hàng)

- Cột trái "Thông tin chung" — 6 dòng label/value: Tên doanh nghiệp, Tên thương hiệu, Client ID, Mã số thuế, Số giấy phép KD, Địa chỉ công ty, Ghi chú. Đúng pattern label(204px)+value trong `role-to-component-mapping.md`.
- Cột phải "Giấy phép kinh doanh" — 1 dòng "Số giấy phép kinh doanh" + widget upload file:
  - Trạng thái rỗng: icon + text "Chưa có tài liệu giấy phép kinh doanh".
  - Trạng thái đã có file: tên file + "Ngày cập nhật: [ngày]" + 1 nút nhỏ (125×40, nhãn chưa xác nhận — có thể "Xem file"/"Tải xuống").
- Cả 2 cột dùng chung Block heading pattern (title + content, height 72px cho phần title) — khớp `role-to-component-mapping.md`.
- Node bằng chứng: `21219:13372` (khối), `21219:13405`/`21240:72858` (GPKD 2 trạng thái).

### Khu vực C — Block "Thông tin thanh toán"

- 4 dòng label/value full-width: Địa chỉ xuất hoá đơn, Email nhận hoá đơn, SĐT liên hệ thanh toán, Người liên hệ thanh toán, Ghi chú thanh toán. Cùng pattern label/value như Khu vực B.
- Node bằng chứng: `21219:13415`.

### Khu vực D — Block "Cấu hình theo loại dịch vụ" (khối lớn nhất, có Tabs)

- Tabs cấp 1: **FTL / LTL** (`🔵 Tabs :: Tabs / Tabs oragism`) — chọn loại dịch vụ, nội dung bên dưới đổi theo tab.
- Trong mỗi tab, 3 khối con xếp dọc:
  1. **Danh sách bảng giá** — nút "Tạo bảng giá mới FTL" (Fill cam, góc phải) + bảng: `# | Tên bảng giá | Số lượng | Trạng thái (Badge) | Ngày thay đổi | Thao tác`. Cột Thao tác = **"Dừng hoạt động"** (Outline đỏ) + **"Lên lịch hoạt động"** (Outline — disable khi trạng thái bảng giá là "Đang áp dụng" hoặc "Hết hiệu lực", chỉ enable ở trạng thái khác, xác nhận theo Williams) + nút **"..."** (overflow menu, gồm 2 mục: **[icon eye + "Xem chi tiết"]** và **[icon bút chì + "Chỉnh sửa"]** — xác nhận theo Williams — đọc được bằng zoom screenshot node `21240:85087` ngày 2026-09-05). Có phân trang `Pagination / Pagination oragism`. Trạng thái rỗng (chưa có bảng giá nào): **"Chưa có bảng giá — Chọn 'Tạo bảng giá mới FTL' để bắt đầu thiết lập"** (xác nhận theo Williams).
  2. **Danh sách phụ phí** — có Tabs cấp 2 lồng bên trong (**Phí bốc xếp / Phí khác**), nút "Tạo phí bốc xếp mới FTL" + bảng: `# | Tên phí bốc xếp | Loại | Trạng thái (Switch + Badge cùng ô) | Ngày thay đổi | Người thay đổi | Thao tác`. Cột Thao tác = **"Xem chi tiết"** (Outline có chữ) + icon **bút chì** (sửa) + icon **thùng rác đỏ** (xoá) — đọc được bằng zoom screenshot node `21253:88162` ngày 2026-09-05. **Ghi chú của Williams (2026-09):** icon thùng rác hiện đang nổi bật hơn icon bút chì (do màu đỏ) — dự định SAU NÀY sẽ giảm cấp thị giác icon xoá xuống ngang hàng với icon sửa (cùng mức nhấn, không tô đỏ nổi hơn). Chưa áp dụng ngay ở bản mô tả này — ghi nhận để xử lý khi build spec.json/render thật. Cột Trạng thái ở đây khác Khu vực D.1 — có thêm `Switch` (bật/tắt phụ phí) đứng cạnh Badge, không chỉ Badge đơn thuần. Trạng thái rỗng (chưa có phụ phí nào): **"Chưa có phụ phí — Chọn 'Tạo phí bốc xếp mới FTL' để bắt đầu thiết lập"** (xác nhận theo Williams).
     ⚠️ Lưu ý: 2 bảng KHÔNG dùng chung 1 bộ nút Thao tác như suy đoán ban đầu — mỗi bảng có bộ hành động riêng theo đúng nghiệp vụ của nó, không phải pattern "Xem/Sửa/Xoá" cố định dùng lại được.
  3. **Thông tin vận hành** — 2 lựa chọn dạng chọn 1 trong 2 (`Organism/Checkbox/sm` — cần xác nhận đây là radio hay checkbox thật, tên component có chữ Checkbox nhưng hành vi mô tả là loại trừ lẫn nhau):
     - "Tự động": hệ thống tự gửi yêu cầu cho GSVT theo đúng tải trọng khách đặt, không cần Ops can thiệp.
     - "Thủ công": hệ thống chờ Ops sắp xếp trước, sau đó mới gửi yêu cầu xuống GSVT.
- Có 1 khối "Success Message" xuất hiện lặp lại ở đầu mỗi khối con (D.1, D.2) — nhiều khả năng là vùng đặt banner thông báo thành công sau khi thao tác (ẩn mặc định), KHÔNG phải text hiển thị thường trực — cần xác nhận.
- Node bằng chứng: `21240:84236` (khối cha), `21240:84240`/`21261:89294` (2 cấp tabs), `21253:88143` (row phụ phí có Switch).

### Khu vực E — Block "Thông tin lịch sử"

- Bảng: `# | Log ID | Người cập nhật | Ngày cập nhật | Thay đổi` (cột cuối hiện text dạng "N cập nhật", là link — bấm vào mở **Modal đối chiếu giá trị cũ – giá trị mới**, cho user biết chính xác thông tin nào đã thay đổi — xác nhận theo Williams). Có phân trang.
  - Modal này chưa có trong node đã đọc (chưa thấy trạng thái mở trên canvas) — khi build cần thêm 1 Modal riêng theo pattern Modal trong `role-to-component-mapping.md`/`DESIGN-STYLE-GUIDE.md` mục 12, nội dung dạng bảng/list 2 cột "Giá trị cũ" vs "Giá trị mới" theo từng field đã đổi.
- Node bằng chứng: `21240:84327`.

### Khu vực F — Sidebar

- Instance `Left Menu Freight` — xác nhận theo Williams: đây là module **"Quản lý khách hàng"** thuộc hệ thống **Portal B2B** (tên layer "Freight" chỉ là tên nội bộ trong Figma, không phải hệ thống riêng khác B2B). Module "Quản lý khách hàng" hiện chưa có trong bảng module ở `MENU-THEO-HE-THONG.md` (mục B2B portal đang để trống "chưa khảo sát") — cần bổ sung dòng module này vào bảng đó, active state highlight đúng "Quản lý khách hàng" khi ở màn này.

## 4. Vai trò nút/text áp dụng được từ `role-to-component-mapping.md`

*(Mục này KHÔNG phải câu hỏi cần Williams trả lời — chỉ là ghi chú kỹ thuật nội bộ để cập nhật `role-to-component-mapping.md` sau. Câu hỏi thật cần confirm nằm ở mục 5 bên dưới.)*

Khớp tốt, không cần thêm rule mới: nút hành động chính (Fill cam, 1 nút/khối), block heading pattern, table header/row pattern, input label/value pattern.

Cần BỔ SUNG vào `role-to-component-mapping.md` sau khi Williams confirm màn này (chưa có trong bảng cũ):
- Nút "Trở về" thật dùng Button organism kích thước nhỏ (93×32), KHÔNG phải text link — xác nhận, cần sửa lại rule cũ trong style guide (đang ghi text link).
- Cột "Trạng thái" trong bảng có thể kết hợp `Switch` (bật/tắt) + `Badge` (mô tả trạng thái) cùng lúc, không chỉ 1 trong 2.
- Pattern "2 lựa chọn loại trừ lẫn nhau, mỗi lựa chọn có mô tả dài bên dưới" (radio-với-mô tả) — component thật dùng là `Organism/Checkbox/sm/...`, xác nhận đúng hành vi radio (chọn 1, loại trừ lẫn nhau) dù tên gọi "Checkbox" — cần ghi chú rõ để không lẫn với multi-select thật.
- Widget upload 1 file đơn (không phải Excel hàng loạt như mục 10 style guide) với 2 trạng thái rỗng/đã có — style guide cũ chỉ có mục Upload Excel, chưa có mục cho upload 1 file đơn kèm ngày cập nhật.
- Footer action bar cố định cuối trang [Huỷ] [Lưu thông tin] khi vào chế độ chỉnh sửa toàn trang — pattern mới, style guide cũ chưa có mục Footer action riêng (khác Modal footer đã có ở mục 12).
- Trạng thái rỗng bảng dữ liệu theo mẫu "Chưa có [X] — Chọn '[nút tạo]' để bắt đầu thiết lập" — pattern mới, style guide cũ chưa có mục quy chuẩn cho empty-state text của bảng.

## 5. Open Questions — cần Williams xác nhận trước khi build spec.json

1. ~~WHO chính xác~~ — ĐÃ TRẢ LỜI (Williams xác nhận): **hiện tại chưa có cơ chế phân quyền bấm nút** (mọi role đều thấy và bấm được hết trên UI) — chỉ phân công theo quy ước nghiệp vụ: BD quản lý Danh sách bảng giá + Danh sách phụ phí; Ops quản lý khối Thông tin vận hành. Không cần thiết kế ẩn/hiện khối theo role.
2. ~~Nút "Trở về"~~ — ĐÃ TRẢ LỜI (Williams xác nhận): **đúng là Button organism nhỏ**, không phải text link. Đây là điểm khác với rule cũ trong `role-to-component-mapping.md`/style guide (đang ghi "text link không viền") — cần sửa lại rule đó cho khớp thực tế màn này (xem mục 4).
3. ~~Khu vực A (Page Header) — 2 nhóm nút ẩn~~ — ĐÃ TRẢ LỜI (Williams xác nhận): **hiện tại KHÔNG có nút ẩn nào ở header là thật** — header chỉ có DUY NHẤT 1 chức năng: nút "Chỉnh sửa thông tin" (mở chế độ edit → Footer [Huỷ]/[Lưu thông tin] ở cuối trang, xem mục 3 Khu vực A). 2 nhóm nút `hidden="true"` thấy trong Figma là **layer nháp/thừa, không dùng** — bỏ qua khi build spec.json, không đưa vào spec.
4. ~~3 nút "Thao tác"~~ — ĐÃ TRẢ LỜI HOÀN TOÀN (zoom screenshot 2026-09-05 + Williams xác nhận): bảng giá dùng "Dừng hoạt động"/"Lên lịch hoạt động"/"..." (nội dung "..." = [eye + "Xem chi tiết"] + [bút chì + "Chỉnh sửa"]), bảng phụ phí dùng "Xem chi tiết"/bút chì/thùng rác. Nút "Lên lịch hoạt động" **disable tuỳ trạng thái**: khi bảng giá đó đang ở trạng thái **"Đang áp dụng" (active)** hoặc **"Hết hiệu lực" (expired)** thì KHÔNG thể bấm "Lên lịch hoạt động" — chỉ bấm được khi bảng giá ở trạng thái khác (vd chưa áp dụng/nháp).
5. ~~"Success Message"~~ — ĐÃ TRẢ LỜI (Williams xác nhận: đúng): banner ẩn mặc định, chỉ hiện sau khi tạo/sửa thành công.
6. ~~Cột "N cập nhật"~~ — ĐÃ TRẢ LỜI (Williams xác nhận): bấm vào mở Modal đối chiếu giá trị cũ – giá trị mới. Còn lại: Modal này chưa thiết kế trên canvas Figma, cần Williams mô tả thêm layout cụ thể (mỗi field đổi hiện 1 dòng? hay chỉ hiện field nào có thay đổi, ẩn field không đổi?) khi tới bước build spec.json.
7. ~~Sidebar "Left Menu Freight"~~ — ĐÃ TRẢ LỜI (Williams xác nhận): thuộc module "Quản lý khách hàng", hệ thống Portal B2B. Việc còn lại (không phải hỏi lại Williams, là việc kỹ thuật của Claude/pipeline): bổ sung dòng module "Quản lý khách hàng" vào bảng B2B portal trong `MENU-THEO-HE-THONG.md` khi cập nhật file đó (hiện đang để trống).
8. ~~`Organism/Checkbox/sm/...`~~ — ĐÃ TRẢ LỜI (Williams xác nhận): đúng hành vi **radio** — chọn 1 trong 2, loại trừ lẫn nhau (dù tên component là "Checkbox", hành vi thật dùng cho case chọn 1). Cần ghi chú lại điểm này khi thêm vào `role-to-component-mapping.md` để không nhầm component "Checkbox" luôn cho phép multi-select.
9. ~~Trạng thái rỗng~~ — ĐÃ TRẢ LỜI (Williams xác nhận): theo mẫu "Chưa có [bảng giá / phụ phí] — Chọn '[tạo bảng giá / tạo phí bốc xếp]' để bắt đầu thiết lập". Cụ thể: bảng giá → "Chưa có bảng giá — Chọn 'Tạo bảng giá mới FTL' để bắt đầu thiết lập"; phụ phí → "Chưa có phụ phí — Chọn 'Tạo phí bốc xếp mới FTL' để bắt đầu thiết lập" (tên nút suy theo đúng nhãn nút đã xác nhận ở Khu vực D, cần Williams soát lại chữ chính xác 1 lần nữa khi build).
