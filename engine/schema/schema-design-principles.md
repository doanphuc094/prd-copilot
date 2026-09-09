# Nguyên tắc thiết kế schema spec.json (portable — dùng cho mọi tổ chức)

## Bốn nguyên tắc bắt buộc

1. **ID ổn định, không dùng index mảng.** Mỗi node có ID 2-3 ký tự sinh ngẫu nhiên, không bao giờ đổi; thứ tự hiển thị để ở field `order` riêng. Thiếu bước này thì patch (sửa từng phần) sẽ trỏ nhầm component sau vài lần sửa.
2. **Hai lớp**: `global` (áp cho toàn feature: layout, density, usage scenario, các token dùng chung) + cây phân cấp `screens → sections → components`.
3. **Mỗi field mang cả giá trị lẫn nhãn ngữ nghĩa**: `value` cho renderer dùng trực tiếp, `semantic` cho LLM hiểu ý định khi cần suy luận/sửa.
4. **Ràng buộc kế thừa**: mọi giá trị `color`/`layout`/`shape` ở cấp component/section phải nằm trong tập giá trị đã khai báo ở `global` — không node nào được tự chế giá trị riêng ngoài danh sách global cho phép. Validator kiểm bằng so trực tiếp, không cần suy luận.
   (Nguồn: công thức (5) trong SpecifyUI, arxiv 2509.07334 — xem `../research/research-sources.md`)

## Nguyên tắc field-descriptor (cho form/list có nội dung nghiệp vụ khác nhau mỗi lần)

**Không cố định TÊN field nghiệp vụ** — không thể, vì mỗi tổ chức/mỗi yêu cầu cần field khác nhau (ví dụ: "họ tên, số điện thoại" ở form này, "tên khách hàng, mã cửa hàng" ở form khác). Chỉ cố định HÌNH DẠNG mô tả một field: một mảng các object cùng cấu trúc:

```json
{ "key": "...", "label": "...", "ds_component": "...", "type": "string|number|date|enum|boolean", "required": true, "validation": "..." }
```

Tên field, số lượng field, giá trị — hoàn toàn tự do theo từng yêu cầu cụ thể. Chỉ có cấu trúc mô tả MỘT field là lặp lại. Đây là pattern chuẩn của mọi công cụ CRUD form/admin-panel (không phải vấn đề mới phát minh).

## Cách xây schema: bottom-up từ màn hình có thật, không top-down từ lý thuyết

1. Chọn 6-8 màn hình đại diện — **cố tình chọn đa dạng nghiệp vụ** (không chọn các màn tương tự nhau, để tránh vô tình để lọt tên field cụ thể vào schema chung).
2. Với mỗi màn, viết mô tả bằng lời theo mẫu bên dưới — không viết JSON ở bước này.
3. Gộp 6-8 mô tả lại: field nào màn nào cũng cần → bắt buộc; field chỉ 1-2 màn cần → optional.
4. Viết tay 1 spec.json hoàn chỉnh cho 1 màn. Test ngược: đưa cho người khác dựng lại màn hình chỉ từ spec, không nhìn bản gốc — chỗ họ phải đoán = thiếu field.
5. Test với LLM trong hội thoại (chưa cần code): dán schema + ví dụ + một yêu cầu mới → xem kết quả. Sai thường nằm ở schema, không phải ở prompt.

## Mẫu viết mô tả màn hình (Ngày 1-2)

```
## [Tên màn hình]

Loại khuôn: [list có filter / form tạo-sửa / trang chi tiết / dialog / khác]
Mục đích một câu: [màn này dùng để làm gì]

### Khu vực: [tên khu vực]
Mô tả ngắn: [khu vực này làm gì]

- [Tên hiển thị] | [loại: ô text / số điện thoại / dropdown / ngày / nút / cột bảng...] | bắt buộc: [có/không] | ghi chú: [validate gì, mặc định gì, component thật nếu biết]
- ...

### Khu vực: [khu vực tiếp theo — lặp lại như trên]

### Hành động cấp màn hình (không thuộc riêng khu vực nào)
- [Tên nút] | vị trí: [góc trên phải / cuối form...] | khi bấm: [chuyện gì xảy ra]

### Trạng thái khác (bỏ qua nếu chưa rõ)
- Rỗng: ...
- Lỗi: ...
```

## Cách suy JSON Schema chính thức từ 6-8 ví dụ (không cần biết viết cú pháp tay)

1. Đưa 6-8 spec.json (đã nhất quán quy ước) cho một LLM, yêu cầu: suy JSON Schema + với mỗi field giải thích lý do required/optional + liệt kê rõ giá trị enum đã thấy và hỏi còn giá trị nào có thể thiếu.
2. Review qua phần giải thích, không cần đọc cú pháp: field có thật sự bắt buộc? enum có "học vẹt" theo đúng 8 ví dụ không (rủi ro thiếu giá trị tương lai)?
3. Test thực dụng: viết thêm 1 spec.json đúng-nhưng-khác-biệt + 1 sai-có-chủ-đích (thiếu field/sai kiểu), nhờ LLM dùng schema validate cả hai. Chấp nhận đúng cái đúng, từ chối đúng cái sai kèm lý do khớp = schema dùng được.
4. Lặp tới khi 3 lần liên tiếp không phát hiện lỗi.

## KHÔNG làm ở giai đoạn đầu (bất kể tổ chức nào)

- Không tái tạo pipeline trích SPEC từ ẢNH (segmentation model, MLLM vision) — chỉ cần nếu input là ảnh tham chiếu, không cần nếu input là văn bản (PRD/Design Specs).
- Không tự xây RAG database ngay — theo ablation study của SpecifyUI, đây là phần đóng góp nhỏ nhất so với việc có schema chặt. Để dành cho sau khi có dữ liệu tích luỹ tự nhiên (spec.json đã được duyệt + dùng thật).
