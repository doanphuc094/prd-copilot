# Checklist 6-8 màn hình mô tả (Phase 0, Ngày 1-2)

Nguyên tắc chọn: cố tình đa dạng nghiệp vụ (không chọn các màn na ná nhau) — mỗi màn nên khác nhau về loại khuôn VÀ về entity nghiệp vụ (đơn hàng, khách hàng, cửa hàng, nhân viên...).

- [x] 1. Trang chi tiết khách hàng (Portal B2B) — loại khuôn: **trang chi tiết** (`01-khach-hang-chi-tiet.md`, xong 2026-09-05, 9/9 Open Questions đã trả lời)
- [x] 2. Danh sách nhà cung cấp (Portal B2B) — loại khuôn: **list có filter** (`02-danh-sach-nha-cung-cap.md`, draft xong 2026-09-05, chờ Williams confirm 6 Open Questions)
- [x] 3. Tạo mới siêu thị (TMS — Xếp tuyến FTL) — loại khuôn: **form tạo-mới** (`03-tao-moi-sieu-thi.md`, HOÀN THÀNH 2026-09-05, 9/9 Open Questions đã trả lời/confirm)
- [x] 4. Modal kết quả xử lý upload file Excel (Portal B2B) — loại khuôn: **dialog/modal độc lập** (`04-modal-ket-qua-upload-excel.md`, HOÀN THÀNH 2026-09-05, 3/3 Open Questions đã trả lời/confirm — gồm 5 state khác nhau tuỳ loại import một phần/toàn phần)
- [x] 5. Tính năng upload file Excel — Chi phí thuê xe NCC (Portal B2B) — loại khuôn: **khác** (`05-upload-chi-phi-thue-xe-ncc.md`, HOÀN THÀNH 2026-09-05, 6/6 Open Questions đã trả lời/confirm — đây cũng là màn "cha" của modal `04-modal-ket-qua-upload-excel.md`)
- [x] 6. Quản lý chi phí phát sinh (Portal B2B) — loại khuôn: **khác** (`06-quan-ly-chi-phi-phat-sinh.md`, 2026-09-05: đã bổ sung PRD FT-3439 [Duyệt/từ chối], 5/9 Open Questions đã confirm — còn mở: 2 điểm PRD-vs-Figma lệch nhau [dòng đã xử lý còn hiện nút hay ẩn hẳn; Lý do từ chối dropdown hay textarea] + 1 câu verify bộ lọc + 1 câu Q&A gốc của PRD chưa có PO trả lời)
- [x] 7. Quản lý POD (Portal B2B, sidebar "Dynamic SOP") — loại khuôn: **khác** (`07-quan-ly-pod.md`, HOÀN THÀNH 2026-09-05, 7/7 Open Questions đã trả lời/confirm — filter "Mã đơn hàng" là gap thật cần thêm khi build spec. Mục đích chính: minh hoạ thêm nhiều style "gộp thông tin 1 cột" khác nhau — text-màu, lightbox nhiều ảnh/video, modal tiến trình tải, toast huỷ, multi-select filter dạng tóm tắt + "toolbar filter" — đã propagate vào role-to-component-mapping.md + org-context.md)
- [x] 8. Tài xế nhập chi phí phát sinh - App Truck (**mobile**, khác Portal B2B web) — loại khuôn: **khác** (`08-tai-xe-nhap-chi-phi-app-truck.md`, HOÀN THÀNH 2026-09-05, 5/5 Open Questions đã trả lời/confirm — màn MOBILE đầu tiên của dự án, đã tách riêng file `role-to-component-mapping-app-truck.md` vì đây là design cũ chưa rõ ngụ ý UX. Đây cũng là nguồn dữ liệu đầu vào của luồng đã ghi ở `06-quan-ly-chi-phi-phat-sinh.md`)

**Phase 0 ĐỦ 8/8 màn (slot #1-8 đều đã HOÀN THÀNH/confirm đầy đủ Open Questions), 2026-09-05.**

Mỗi màn xong thì tách thành file riêng trong thư mục này: `01-ten-man-hinh.md`, `02-ten-man-hinh.md`...

Gợi ý ở dòng 2-6 chỉ để tham khảo hướng đa dạng — Williams chọn màn thật theo đúng hệ thống FTL B2B, không cần đúng y hệt gợi ý.
