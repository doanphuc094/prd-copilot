---
name: spec-json-generator
description: Sinh spec.json từ Design Specs.md theo schema đã chốt. Dùng sau khi Design Specs đã được duyệt, trước khi renderer dựng frame.
---

# Spec.json Generator — Template (điền {{...}} bằng dữ liệu của organization/<ten-to-chuc>/ trước khi dùng)

## Schema

Xem `../schema/schema-design-principles.md` và `../schema/spec-schema.example.json` cho hình dạng chung. Danh sách component thật hợp lệ (`ds_component`): {{NẠP TỪ organization/<ten-to-chuc>/design-system-components.md}}.

## Few-shot

Dùng 2-3 cặp ví dụ (Design Specs.md → spec.json đã được duyệt/dùng thật) làm khuôn — tích luỹ dần từ các feature đã chạy thành công, lưu tại `{{organization/<ten-to-chuc>/examples/}}`.

## Quy trình khi được gọi

1. Đọc Design Specs.md của feature đang xử lý.
2. Sinh spec.json theo đúng schema — mọi ID phải ổn định (không dùng index mảng), mọi `ds_component` phải nằm trong danh sách hợp lệ.
3. Tự kiểm trước khi xuất: mọi ID unique? mọi `ds_component` có trong danh sách? mọi giá trị color/layout/shape ở cấp component có nằm trong tập `global` đã khai báo không (ràng buộc kế thừa)?
4. Nếu có lỗi từ validator thật (renderer báo component không tồn tại, hoặc patch không áp được): nhận lại error context đầy đủ (lỗi + yêu cầu gốc + spec hiện tại), tự sửa, thử lại tối đa 3 lần — xem `../pipeline/patch-and-validator.md`.
5. Khi sửa một spec.json đã có (không phải tạo mới): xuất patch operation (JSON Patch) thay vì viết lại toàn bộ file — xem cùng tài liệu trên.

## Nguyên tắc chống bịa

Nếu Design Specs không nói rõ một quyết định UX cụ thể (ví dụ: có bao nhiêu field, field nào bắt buộc), KHÔNG tự suy đoán — đánh dấu field đó cần xác nhận, hỏi lại người duyệt thay vì điền giá trị đoán.
