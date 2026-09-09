# PRD Copilot — Workspace cá nhân

Thư mục này là bản sao đầy đủ, độc lập với bất kỳ tài khoản/tổ chức nào, của toàn bộ phương pháp luận PRD Copilot: tự động hoá quy trình từ PRD tới màn hình Figma, với con người kiểm soát ở đúng những điểm cần thiết.

## Cấu trúc

- `engine/` — **PHẦN MANG THEO ĐƯỢC**. Schema, rubric, kiến trúc pipeline, nguồn nghiên cứu, mẫu skill. Không nhắc tên công ty nào trừ khi làm ví dụ minh hoạ (đánh dấu rõ). Đổi công ty vẫn dùng nguyên, không phải viết lại.
- `organization/<tên-tổ-chức>/` — **PHẦN RIÊNG CỦA MỘT TỔ CHỨC CỤ THỂ**. Danh sách component Design System thật, ngưỡng điểm Readiness Gate, bối cảnh nghiệp vụ. Đổi công ty thì tạo `organization/<công-ty-mới>/` mới, viết lại các file trong đó — không đụng `engine/`.

## Nguyên tắc tách bạch

`engine/` không bao giờ chứa: tên component thật, nội dung PRD thật, số liệu vận hành nội bộ của một công ty cụ thể. Chỉ có cấu trúc/khuôn/nguyên tắc.

`organization/<tên>/` là nơi DUY NHẤT chứa nội dung thật của một công ty — đây là phần đứng lại khi đổi chỗ làm, không mang theo (vì là tài sản/dữ liệu của công ty đó).

Khi xây Skill hay validator thật, luôn nạp cả hai nguồn: `engine/` cho logic chung, `organization/<tên>/` cho dữ liệu cụ thể của công ty đang làm.

## Trạng thái hiện tại (2026-09-05)

Đang ở Phase 0 của lộ trình — xem `engine/pipeline/pipeline-architecture.md` mục "Lộ trình theo phase". Việc tiếp theo: viết 6-8 mô tả màn hình thật bằng lời (mẫu ở `engine/schema/schema-design-principles.md`), sau đó gộp thành schema v1.

## Nguồn gốc

Nội dung `engine/` là phương pháp tự tổng hợp từ nghiên cứu học thuật công khai (SpecifyUI — arxiv 2509.07334, JSON Whisperer — arxiv 2510.04717, và các nguồn khác liệt kê trong `engine/research/research-sources.md`), không phải tài liệu độc quyền của công ty nào — có thể mang theo và tuỳ chỉnh ở bất kỳ tổ chức nào áp dụng được mô hình "PRD → thiết kế UI có kiểm soát bởi AI".
