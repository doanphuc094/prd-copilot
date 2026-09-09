# Patch-based editing và vòng validate-retry (portable)

## Chuẩn nền: JSON Patch (RFC 6902)

Dùng chuẩn có sẵn (https://jsonpatch.com/), không tự phát minh cú pháp. 6 operation: `add/remove/replace/move/copy/test`. Path theo cú pháp JSON Pointer (RFC 6901).

Agent xuất ra mảng patch operation thay vì spec.json đầy đủ khi sửa. Dùng `test` operation để xác nhận giá trị hiện tại đúng như agent nghĩ trước khi `replace` — tránh ghi đè khi có người khác vừa sửa tay song song.

## EASE — tránh lỗi lệch index mảng

Lỗi phổ biến nhất khi LLM sinh JSON Patch: tính sai index mảng khi nhiều operation liên tiếp làm lệch vị trí phần tử còn lại. Giải pháp: biến mảng thành object với key ổn định 2 ký tự (`"ax"`, `"cd"`...) cộng field `order`/`display_order` riêng lưu thứ tự hiển thị — path không bao giờ lệch dù áp bao nhiêu patch theo thứ tự nào.
(Nguồn: JSON Whisperer, arxiv 2510.04717 — xem ../research/research-sources.md)

## Vòng validate-retry

Khi patch sai (path không tồn tại, value sai kiểu, vi phạm ràng buộc kế thừa): validator trả về nguyên **error context** (error message + instruction gốc + spec hiện tại) cho agent để tự sửa, giới hạn tối đa **3 lần retry**. Không cố retry vô hạn.

## Thuật toán blast-radius ba nhóm

Trước khi áp một patch, phân loại các node bị ảnh hưởng thành 3 nhóm:
- **Không ảnh hưởng** — không cần làm gì.
- **Tự động sửa được** — áp thẳng, không cần hỏi, nhưng ghi log.
- **Cần người quyết định** — chặn lại, hỏi người duyệt, hiển thị rõ những node nào sẽ bị ảnh hưởng.

Ví dụ cụ thể: sửa một token màu ở tầng `global` ảnh hưởng mọi component đang dùng token đó — validator phải liệt kê hết các node liên quan cho người duyệt thấy trước khi renderer chạy lại, không âm thầm áp dụng hàng loạt.
(Nguồn: "Surgical Editing" — dependency graph + blast radius, xem ../research/research-sources.md)

## Logic áp patch phải khoan dung

Không fail cứng ngay khi patch lệch nhẹ (ví dụ path gần đúng, whitespace khác). Cần vài chiến lược fallback thử khớp lại trước khi từ chối hẳn — tắt hoàn toàn cơ chế khoan dung này làm tỉ lệ lỗi tăng gấp nhiều lần trong thực nghiệm tham khảo (Aider — Unified diffs).

## Giới hạn phạm vi khi mới bắt đầu

Chỉ cho phép scoped edit ở field lá (text, màu, số, spacing) trước — chỗ chắc chắn không lan ra đâu khác. Chưa mở cho thay đổi cấu trúc (thêm/xoá section, đổi component type) cho tới khi thuật toán blast-radius đã chạy ổn định.
