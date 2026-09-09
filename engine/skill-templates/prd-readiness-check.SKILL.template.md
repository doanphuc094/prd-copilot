---
name: prd-readiness-check
description: Chấm điểm PRD theo rubric 6 chiều trước khi chuyển sang bước thiết kế. Dùng khi PO/BA muốn kiểm tra PRD của mình đã đủ chín chưa trước khi giao cho designer.
---

# PRD Readiness Check — Template (điền {{...}} bằng dữ liệu của organization/<ten-to-chuc>/ trước khi dùng)

## Rubric chấm điểm

Xem `../pipeline/readiness-gate-rubric.md` — 6 chiều WHAT/WHY/WHO/HOW/EDGES/HISTORY.

## Ngưỡng điểm

{{NẠP TỪ organization/<ten-to-chuc>/readiness-thresholds.md}}

## Quy trình khi được gọi

1. Đọc PRD (đính kèm, dán trực tiếp, hoặc đọc từ nguồn được chỉ định — ví dụ trang Confluence nếu có kết nối Atlassian).
2. Chấm điểm theo 6 chiều, liệt kê rõ điểm mạnh/điểm thiếu từng chiều.
3. Nếu có tính năng tương tự trước đó, kiểm tra mâu thuẫn với chiều HISTORY.
4. Nếu điểm dưới ngưỡng: liệt kê câu hỏi cụ thể cho từng chỗ thiếu — kèm 2-3 phương án gợi ý nếu có tính năng tương tự để tham khảo, giảm công sức người viết phải tự nghĩ từ đầu.
5. Nếu người viết muốn bỏ qua ngưỡng (override): PHẢI hỏi và ghi lại lý do — không cho override âm thầm không lý do.
6. Nếu có kết nối tới nguồn PRD gốc (ví dụ Confluence): post kết quả thành comment ngay trên trang đó, để mọi người liên quan cùng thấy — không chỉ trả lời riêng trong khung chat.

## Nguyên tắc chống bịa

Chỉ nêu CÂU HỎI về chỗ thiếu, không tự suy ra CÂU TRẢ LỜI về nghiệp vụ khi PRD không nói rõ. Đánh dấu rõ chỗ "cần xác nhận với người viết", không tự điền giả định.
