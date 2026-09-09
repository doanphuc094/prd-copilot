# Ngưỡng điểm Readiness Gate — GHN

**CHƯA ĐIỀN — cần chốt cùng PO/team trước khi vận hành thật.**

## Cần quyết định

- Thang điểm: ví dụ 0-100, hay 1-7 mỗi chiều?
- Ngưỡng pass/fail: ví dụ tổng điểm dưới bao nhiêu thì chặn?
- Trọng số từng chiều (WHAT/WHY/WHO/HOW/EDGES/HISTORY có bằng nhau không, hay có chiều quan trọng hơn)?
- Ai được quyền override khi dưới ngưỡng — chỉ PO, hay cần thêm PO lead duyệt?
- Override có cần lý do dạng text tự do, hay chọn từ danh sách lý do có sẵn?

## Gợi ý khởi điểm (điều chỉnh sau khi chạy thật vài tuần đầu)

- Mỗi chiều chấm 1-7, ngưỡng pass: trung bình ≥ 5 VÀ không chiều nào dưới 3.
- Override cho phép nhưng bắt nhập lý do tối thiểu 1 câu, lưu lại kèm PRD để tra cứu sau.

## Ghi chú — 2026-09-05, đối chiếu với pipeline thật đã có

Pipeline `ghn-figma-pipeline` (đã dùng thật, xem `../org-context.md`) KHÔNG
dùng thang điểm số nào — cơ chế thật đang chạy là:

- Nếu Design Specs/PRD thiếu thông tin để quyết định → hỏi lại user ngay,
  không tự đoán, không tính điểm.
- Mỗi Design Specs có mục "Open questions" liệt kê rõ chỗ chưa chắc thay vì
  chặn cứng theo ngưỡng.
- "Pass" thật duy nhất được máy kiểm là tên component tồn tại
  (`validate-spec.js`) — mọi thứ còn lại (đủ edge case, đủ ngữ cảnh...) do
  Williams tự đánh giá bằng mắt, không qua rubric số.

Đây là bằng chứng cơ chế nhị phân "hỏi lại khi thiếu, im lặng khi đủ" chạy
được thật ở quy mô 1 designer. Thang điểm 1-7/Likert (từ rubric SpecifyUI)
vẫn có giá trị RIÊNG cho việc PO tự chấm PRD trước khi gửi (khác mục đích —
đánh giá ĐỘ SẴN SÀNG của PRD, không phải đánh giá UI sinh ra) — nhưng khi
chốt ngưỡng, nên thiết kế sao cho không nặng hơn cơ chế đã chứng minh hiệu
quả này. Cân nhắc: dùng rubric 6 chiều chỉ để SINH RA danh sách câu hỏi cụ
thể cần hỏi lại PO (giống "Open questions"), thay vì dùng để tính điểm rồi
chặn/pass cứng nhắc.
