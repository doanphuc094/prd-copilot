# Readiness Gate — Rubric 6 chiều (portable)

Mục đích: chặn PRD chưa đủ chín xuống các bước sau (thiết kế, code) — sửa lúc PO đang viết rẻ hơn nhiều lần so với sửa sau khi đã code/lên production.

## 6 chiều chấm điểm

1. **WHAT** — Tính năng làm gì, cụ thể tới mức nào? (không chấp nhận mô tả chung chung)
2. **WHY** — Lý do nghiệp vụ, giá trị mang lại, đo bằng chỉ số nào?
3. **WHO** — Ai dùng, vai trò/quyền hạn khác nhau có được phân biệt rõ không?
4. **HOW** — Luồng thao tác cụ thể, từng bước, có đủ để vẽ màn hình chưa?
5. **EDGES** — Trường hợp biên, lỗi, rỗng, xung đột dữ liệu đã tính chưa?
6. **HISTORY** — Có mâu thuẫn với tính năng cũ đã có không? Có phá vỡ hành vi cũ không?

## Cơ chế

- Đọc PRD trực tiếp (Confluence hoặc nguồn tương đương), chấm điểm theo rubric, trả comment ngay trên trang: điểm hoàn chỉnh, chỗ thiếu, câu hỏi edge case, mâu thuẫn với tính năng cũ.
- Dưới ngưỡng thì chặn — nhưng **phải có đường thoát**: cho phép người viết override nhưng bắt ghi lý do. Gate không có đường thoát sẽ bị né hoàn toàn (không ai dùng).
- Để giảm chi phí sửa PRD cho người viết: kèm câu hỏi thiếu bằng 2-3 phương án gợi ý từ tính năng tương tự trước đó (nếu có), để chọn thay vì phải tự viết từ đầu.

## Rubric duyệt chất lượng đầu ra (mượn từ SpecifyUI, dùng cho bước duyệt thiết kế sau này)

Thay vì chỉ "chấp nhận/không chấp nhận" nhị phân, chấm 4 chiều riêng theo thang Likert 1-7:
- style consistency
- layout consistency
- component correctness
- task relevance

Nếu có hơn 1 người chấm, đo thêm độ đồng thuận giữa người chấm (nghiên cứu tham khảo báo Cohen's κ ≈ 0.72 với 3 người đánh giá) — tăng độ tin cậy khi trình bày số liệu.

## Ngưỡng điểm cụ thể

Ngưỡng điểm pass/fail và trọng số từng chiều là **dữ liệu riêng của từng tổ chức** — xem `../../organization/<ten-to-chuc>/readiness-thresholds.md`.
