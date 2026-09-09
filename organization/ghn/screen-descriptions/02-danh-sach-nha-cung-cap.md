# Mô tả màn hình: Danh sách nhà cung cấp — Portal B2B

**Trạng thái: DRAFT — chờ Williams confirm trước khi lưu chính thức.**
**Module:** Quản lý nhà cung cấp — Portal B2B
**Loại khuôn:** List có filter
**Mục đích (theo mô tả gốc):** Quản lý danh sách các nhà cung cấp (NCC) đang hợp tác với GHN.
**Nguồn:** Figma `fileKey s2NE6ikwLnsZSUp97RBfof`, node `23140:48584` ("List filter" — chứa 3 trạng thái: Filter/Không có thông tin/Có thông tin + 1 bảng tham chiếu đầy đủ cột), đọc trực tiếp qua Figma MCP ngày 2026-09-05.
**Đối chiếu component:** `organization/ghn/reference/ghn-ds-keymap-flat.json` + `role-to-component-mapping.md`.

## 1. Context (6 dimensions)

| Dimension | Nội dung |
|---|---|
| WHAT | Trang danh sách toàn bộ nhà cung cấp (nhà xe/doanh nghiệp vận tải) đang hợp tác — xem, lọc, tìm kiếm, tạo mới, xem chi tiết/chỉnh sửa từng NCC. |
| WHY | Nơi tra cứu tổng hợp toàn bộ đối tác vận chuyển GHN đang làm việc cùng — phục vụ tìm nhanh 1 NCC cụ thể (theo tên/mã/MST) hoặc lọc theo nhóm (loại hình, loại dịch vụ, khu vực, trạng thái) khi cần xử lý hàng loạt. |
| WHO | Chưa xác nhận rõ role nào dùng — cần hỏi Williams (xem Open Questions). |
| HOW | 1 trang danh sách chuẩn: toolbar (Bộ lọc + Search + nút Tạo mới) → bảng dữ liệu (pinned 3 cột trái + scroll 8 cột phải, do tổng 11 cột > 10 → áp đúng quy tắc gộp cột trong style guide mục 4) → mỗi dòng có 2 nút Thao tác (Xem chi tiết/Chỉnh sửa) dẫn sang màn khác (trang chi tiết NCC — chưa có, xem Open Questions). |
| EDGES | 2 loại trạng thái rỗng khác nhau, cả 2 đã xác nhận: (a) chưa từng có NCC nào — text **"Chưa có thông tin NCC. Vui lòng tạo mới NCC"** (ảnh Williams cung cấp 2026-09-05); (b) lọc/tìm kiếm không ra kết quả — text **"Không tìm thấy NCC phù hợp"**. 2 câu chữ khác nhau cho 2 tình huống rỗng khác nhau — không dùng lẫn. Cột "Khu vực phục vụ" có overflow dạng "+2" khi nhiều hơn 2 tag; cột "Loại dịch vụ" hiện chưa cần overflow (tối đa 3 giá trị) nhưng nguyên tắc quyết định overflow đã có (xem mục 5 Open Questions). |
| HISTORY | Chưa có version trước — màn thứ 2 trong `screen-descriptions/` (sau "Trang chi tiết khách hàng"). |

## 2. Flow Mapping

**1 màn hình, nhiều trạng thái hiển thị** (không phải nhiều bước tuần tự):

```
Flow: Xem/lọc/tìm danh sách nhà cung cấp
  Screen 1: Danh sách nhà cung cấp
    - Trạng thái A: mặc định (node 23140:48588 "Filter" — có kèm panel Bộ lọc đang mở làm chú thích)
    - Trạng thái B: lọc/tìm không ra kết quả (node 23140:49174 "Không có thông tin")
    - Trạng thái C: có dữ liệu, đã áp dụng filter Trạng thái=Dừng hoạt động (node 23140:49250 "Có thông tin" — chỉ hiện đúng 2 dòng NCC dừng hoạt động, khớp với 4 lựa chọn trong panel Bộ lọc bên cạnh)
  (Ngoài luồng): "Filter" (node 23140:49430) — panel dropdown mở ra khi bấm nút "Bộ lọc", không phải 1 trạng thái trang riêng mà là popup nổi trên trang.
  (Ngoài luồng): "List full data danh sách" (node 23140:50795) — bảng tham chiếu gộp đủ 11 cột không pin/scroll, dùng để xác nhận tên + thứ tự cột đầy đủ, không phải UI thật trên trang.
```

## 3. Khu vực (theo thứ tự trên xuống)

### Khu vực A — Header trang (Global action home)

- 1 instance `Global action home` — bên phải hiện Avatar + tên (`Title/Title 1`) + dòng "id - SĐT" (`Content/Body 3`), vd "Ngô Đức Huy" / "3028551 - 0778848489". Khớp đúng quy chuẩn `headerTrang_GlobalActionHome` đã có trong `ghn-spacing-tokens.json`.
- **Ghi chú của Williams (2026-09):** bên trái header hiện đang TRỐNG (không có breadcrumb) — SAU NÀY cần bổ sung breadcrumb bên trái cho đồng nhất về design với các màn khác (quy chuẩn `headerTrang_GlobalActionHome` vốn quy định phải có breadcrumb bên trái). Chưa áp dụng ngay ở bản mô tả này — ghi nhận để xử lý khi build spec.json/render thật.
- Node bằng chứng: `23140:49253`.

### Khu vực B — Tiêu đề trang + Toolbar

- Tiêu đề trang: "Danh sách nhà cung cấp" — dùng `Accordin / Accordin header (Base)`, tương tự block heading pattern đã biết (không phải Page Header 2 cấp như trang chi tiết — màn list chỉ có 1 cấp tiêu đề, không có nút Trở về/status badge). Đúng theo quy chuẩn đã có trong `role-to-component-mapping.md`: **đây là trang chính (top-level trong sidebar), không phải trang con/xem chi tiết** — nên KHÔNG có nút Trở về và status badge (2 thứ đó chỉ xuất hiện ở trang con/chi tiết, xác nhận theo Williams).
- Toolbar 1 hàng, đúng pattern nhóm nút đã biết trong `role-to-component-mapping.md`:
  - Trái: nút **"Bộ lọc"** (Outline, icon phễu — khớp quy chuẩn `nutBoLoc`) + ô search **"Tìm kiếm theo tên nhà xe, mã NCC hoặc mã số thuế"**.
  - Phải: nút chính **"+ Tạo mới NCC"** (Fill cam, icon +).
- Node bằng chứng: `23140:49270`–`23140:49276`.

### Khu vực C — Bảng dữ liệu (11 cột, pin 3 + scroll 8 — áp quy tắc gộp cột)

**Quy tắc pin cột thật (chỉnh lại theo Williams — không phải chỉ đơn thuần ">10 cột"):** pin khi thoả 2 điều kiện — (1) bảng quá dài để fit trong 1 màn hình, VÀ (2) chỉ pin thông tin chung (tên/mã định danh) mà người dùng cần nhớ/đối chiếu lại khi xem các cột dữ liệu khác. Trước khi tách cột, luôn cân nhắc GỘP các thông tin liên quan nhau vào 1 cột trước — ưu tiên bảng fit gọn trong 1 màn hơn là pin nhiều cột. **Ghi chú UX (Williams, 2026-09):** mục tiêu khi thiết kế bảng là tối giản số cột, giúp người dùng dễ tìm chứ không phải phải nhớ thông tin — nhưng cũng không được gom quá nhiều thông tin vào 1 cột vì gây cognitive load ngược lại. Ở màn NÀY, Williams tự nhận đã làm CHƯA TỐT: tách "Mã NCC" và "Tên nhà xe" thành 2 cột riêng trong khi có thể gộp lại 1 cột (dạng "[Mã NCC] — [Tên nhà xe]", giống pattern "Người phụ trách" đã dùng) để tiết kiệm và tối giản bảng — ghi nhận làm bài học, chưa sửa lại cấu trúc cột bên dưới (vẫn ghi đúng theo hiện trạng thật trên Figma để đối chiếu, việc gộp lại để cân nhắc khi build/redesign sau).

3 cột đầu PIN (không cuộn ngang theo bảng), 8 cột sau nằm trong vùng scroll riêng:

**Pin (trái, không cuộn):**

| # | Cột | Nội dung/Format |
|---|---|---|
| 1 | # | Số thứ tự dòng |
| 2 | Mã NCC | Số (vd `850869`) |
| 3 | Tên nhà xe | Text, có thể 2 dòng (vd "Công ty TNHH Vận Tải Đông Nam") |

**Scroll (phải):**

| # | Cột | Nội dung/Format |
|---|---|---|
| 4 | Trạng thái | Badge — `Đang hoạt động` (xanh lá) / `Dừng hoạt động` (đỏ) |
| 5 | Loại hình | Text — vd "Doanh nghiệp vận tải" / "Hộ kinh doanh" |
| 6 | Mã số thuế | Số |
| 7 | Loại dịch vụ | Chips nhiều tag — vd `Xe khô` `Xe lạnh` `Xe mát` (0-3 tag, không thấy overflow "+N" ở cột này) |
| 8 | Khu vực phục vụ | Chips nhiều tag — vd `LFHCM` `LFHN` `+2` (CÓ overflow "+N" khi nhiều hơn 2 tag hiển thị trực tiếp) |
| 9 | Người phụ trách | Text dạng `[id] - [tên]`, vd "3182821 - Trương Văn Bình" |
| 10 | Ngày cập nhật | `DD/MM/YYYY HH:MM:SS` (có giây, khác định dạng "Ngày thay đổi" ở màn khách hàng chỉ có DD/MM/YYYY HH:MM) |
| 11 | Thao tác | 2 nút: **"Xem chi tiết"** (Outline, 125px) + **"Chỉnh sửa"** (Outline, 112px) — luôn hiện trực tiếp, KHÔNG gói trong overflow "..." (khác cách làm ở bảng phụ phí màn khách hàng — có thể vì đây là bảng cấp cao nhất, đủ chỗ ngang) |

- Node bằng chứng: header row `23140:49279`–`23140:49287`, data row mẫu `23140:49288`, bảng tham chiếu đầy đủ cột `23140:50795`.

### Khu vực D — Panel "Bộ lọc" (popup nổi khi bấm nút Bộ lọc)

4 field, tất cả dạng dropdown, footer 2 nút:

| Field | Loại | Ví dụ giá trị đã chọn |
|---|---|---|
| Loại hình | Multi-select dropdown | "2 loại hình" (hiện dạng đếm số lượng đã chọn, không liệt kê tên) |
| Loại dịch vụ | Multi-select dropdown | "3 loại dịch vụ" |
| Khu vực phục vụ | Multi-select dropdown | "2 khu vực phục vụ" |
| Trạng thái | Single-select dropdown | "Dừng hoạt động" |

Footer: **[Hủy]** (Outline) + **[Áp dụng]** (Fill cam). Sau khi Áp dụng, bảng lọc đúng theo tiêu chí đã chọn (xác nhận qua node "Có thông tin" — đúng 2/10 dòng NCC "Dừng hoạt động" hiển thị, khớp filter đang mở bên cạnh).

- Node bằng chứng: `23140:49430`.

## 4. Vai trò nút/text áp dụng được từ `role-to-component-mapping.md`

*(Mục này KHÔNG phải câu hỏi cần Williams trả lời — chỉ là ghi chú kỹ thuật nội bộ. Câu hỏi thật cần confirm nằm ở mục 5.)*

Khớp tốt, không cần thêm rule mới: nút "Bộ lọc" (icon phễu, Outline), toolbar trái/phải, nút chính Fill cam duy nhất, table header/row pattern, Global action home header, pattern "Xem chi tiết"/"Chỉnh sửa" như 1 cặp hành động chuẩn (đã thấy tương tự ở màn khách hàng, dùng lại được).

Cần BỔ SUNG vào `role-to-component-mapping.md`:
- Quy tắc pin cột CHỈNH LẠI (quan trọng, thay thế cách hiểu cũ chỉ dựa số cột): pin khi (1) bảng quá dài không fit 1 màn hình VÀ (2) chỉ pin thông tin định danh chung cần nhớ/đối chiếu — không phải hễ >10 cột là tự động pin 3 cột đầu. Luôn cân nhắc GỘP cột liên quan trước khi tách riêng (xem ghi chú UX ở Khu vực C — ví dụ tự phê bình của Williams: "Mã NCC"+"Tên nhà xe" đáng lẽ gộp 1 cột).
- Panel "Bộ lọc" dạng popup 4 field (3 multi-select + 1 single-select) + footer Hủy/Áp dụng — pattern mới, style guide cũ chưa có mục filter-panel content cụ thể (chỉ có mục nút "Bộ lọc", chưa có mục "bên trong panel Bộ lọc gồm gì").
- Nguyên tắc quyết định overflow "+N" cho cột dạng multi-chips (mới, Williams xác nhận 2026-09-05): xét 2 yếu tố — (a) mức độ quan trọng/tần suất xem: thông tin cần xem THƯỜNG XUYÊN thì KHÔNG overflow (tăng cognitive load, bắt nhớ/bấm thêm); (b) độ dài nội dung: thông tin nhiều ký tự/khó kiểm soát độ dài (vd địa chỉ) thì BẮT BUỘC overflow để tránh đẩy chiều cao dòng bảng. Mục tiêu: bảng hiển thị ĐỦ thông tin để tra cứu/đối chiếu, không quá ít không quá nhiều. Ví dụ tại màn này: "Loại dịch vụ" hiện tối đa 3 giá trị nên chưa cần overflow, nhưng rule áp dụng khi số lượng tăng lên. Xem mục 5 câu 5 để biết nguyên văn xác nhận.
- 2 loại empty-state của bảng — CẢ 2 nay đã xác nhận là thật (không còn là giả định), và có câu chữ khác nhau, KHÔNG được dùng lẫn: (1) "chưa từng có dữ liệu" — màn NCC dùng **"Chưa có thông tin NCC. Vui lòng tạo mới NCC"**, còn màn khách hàng dùng **"Chưa có [X] — Chọn '[nút]' để bắt đầu thiết lập"** (2 pattern viết khác nhau cho cùng 1 loại tình huống — có thể là điểm chưa nhất quán UX writing giữa các màn, cần Williams lưu ý/thống nhất sau, xem mục 5 câu 4); (2) "lọc/tìm không ra kết quả" — dùng **"Không tìm thấy NCC phù hợp"**. Khi build: giữ đúng câu chữ riêng theo từng màn, không tự ý đồng nhất 2 loại rỗng này.

## 5. Open Questions — cần Williams xác nhận trước khi build spec.json

1. ~~WHO~~ — ĐÃ TRẢ LỜI (Williams xác nhận): **Admin vận tải** — tạo/sửa profile NCC, đăng ký xe & tài xế/GSVT, xem danh sách NCC/xe/tài xế.
2. ~~Nút "Xem chi tiết"~~ — ĐÃ TRẢ LỜI (Williams xác nhận): CÓ trang chi tiết NCC riêng, giống ~70% "Trang chi tiết khách hàng" (`01-khach-hang-chi-tiet.md`). **Quyết định: KHÔNG document đầy đủ lại** — 70% trùng nghĩa là phần lớn giá trị học schema/role-mapping đã có sẵn, viết lại toàn bộ chỉ phí công cho Phase 0. Nếu sau này Williams thấy phần nào trong 30% khác biệt đáng ghi lại (field/khu vực riêng của NCC không giống khách hàng), chỉ cần mô tả đúng phần đó, không cần link Figma/đọc lại từ đầu.
3. ~~Nút "Chỉnh sửa"~~ — ĐÃ TRẢ LỜI (Williams xác nhận): chuyển sang trang chi tiết NCC ở chế độ edit (không phải modal tại chỗ) — cùng cơ chế Footer [Huỷ]/[Lưu thông tin] đã xác nhận ở màn khách hàng, áp dụng lại cho trang chi tiết NCC (thuộc phần 70% dùng chung, xem mục 2).
4. ~~Trạng thái rỗng "chưa từng có"~~ — ĐÃ TRẢ LỜI (Williams cung cấp ảnh chụp thật 2026-09-05): CÓ thiết kế riêng, khác hẳn "Không tìm thấy NCC phù hợp" — text thật: **"Chưa có thông tin NCC. Vui lòng tạo mới NCC"** (giữ nguyên header bảng, vùng dữ liệu hiện đúng 1 dòng text này, canh giữa). Lưu ý: khác cách viết với empty-state đã ghi ở màn khách hàng ("Chưa có [X] — Chọn '[nút]' để bắt đầu thiết lập") — 2 câu chữ khác nhau cho cùng loại tình huống (rỗng lần đầu), có thể là điểm chưa nhất quán UX writing giữa 2 màn, cần lưu ý khi build (dùng đúng câu chữ riêng của từng màn, không tự đồng nhất).
5. ~~Overflow "+N"~~ — ĐÃ TRẢ LỜI (Williams xác nhận, kèm nguyên tắc UX chung): hiện tại "Loại dịch vụ" tối đa 3 giá trị nên chưa cần overflow — nhưng quyết định CÓ overflow hay không phải xét 2 yếu tố: **(a) mức độ quan trọng** — nếu thông tin đó user cần xem THƯỜNG XUYÊN thì KHÔNG nên overflow (ẩn đi bắt user phải nhớ/bấm thêm = tăng cognitive load); **(b) độ dài nội dung** — nếu thông tin nhiều ký tự hoặc khó kiểm soát độ dài (vd địa chỉ) thì BẮT BUỘC overflow để tránh đẩy chiều cao dòng bảng quá mức. Mục tiêu chung: bảng hiển thị ĐỦ thông tin để tra cứu/đối chiếu — không quá ít (phải scroll xuống) cũng không quá nhiều (rối mắt, khó quét).
6. ~~Nút "+ Tạo mới NCC"~~ — ĐÃ TRẢ LỜI (Williams xác nhận): chuyển sang 1 trang/form tạo mới riêng (không phải modal). Lưu ý: Williams sẽ dùng 1 form tạo-mới KHÁC (không phải form này) cho ô "form tạo-mới" còn trống trong checklist Phase 0 — form NCC này không tính vào slot đó.
