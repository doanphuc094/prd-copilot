# Nguồn nghiên cứu tham khảo (portable — không gắn với tổ chức nào)

## Học thuật

- **SpecifyUI** — https://arxiv.org/html/2509.07334v1 (2025). Schema hai lớp (Global Specification + Page Composition), edit operation dạng bộ ba, vòng validate-retry cap 3, ràng buộc kế thừa (công thức 5), ablation study (chỉ riêng cấu trúc SPEC đã ăn gần hết phần cải thiện chất lượng — RAG đóng góp không đáng kể, xem chi tiết bảng bên dưới).
- **JSON Whisperer: Efficient JSON Editing with LLMs** — https://arxiv.org/html/2510.04717v1 (2025). Kỹ thuật EASE (key ổn định thay vì index mảng), pipeline sinh few-shot tự động từ diff.
- **Surgical Editing: Component-Level AI Code Edits Without Full Regeneration** — https://www.rocket.new/blog/surgical-editing-dependency-graph. Thuật toán blast-radius 3 nhóm dựa trên dependency graph.
- **Towards Human-AI Synergy in UI Design / PrototypeFlow** — https://arxiv.org/html/2412.20071v3 (ACM TOCHI). Cơ chế "editable checkpoint" — hệ thống đề xuất chiều còn thiếu trước khi generate, người thấy và sửa suy luận AI trước khi commit.
- **Generative UI / PAGEN** — https://arxiv.org/html/2604.09577v1 (Google Research, 2026). Phương pháp benchmark bằng ELO score so sánh AI với chuyên gia thật.
- **AI Agents Push Humans Out of the Loop** — https://arxiv.org/abs/2608.23642 (2026). Cảnh báo "approval fatigue"; đề xuất pre-commitment, batch review, role rotation.
- **JSON Patch — RFC 6902** — https://jsonpatch.com/. Chuẩn kỹ thuật gốc cho patch-based editing.
- **Aider — Unified diffs** — https://aider.chat/docs/unified-diffs.html. Bài học về format diff và logic áp patch khoan dung.

## Ngành công nghiệp

- **Figma Config 2026 recap** — https://www.figma.com/blog/config-2026-recap/
- **Figma Gave Agents Your Design System. Not Your Brand** — https://www.sameness.co/blog/figma-config-brand-context. Khoảng trống giữa "design system" (trông như thế nào) và "brand/product context" (tại sao làm vậy) — đáng cân nhắc thêm một lớp validator riêng cho lý do nghiệp vụ, không chỉ đúng component.

## Case study / thực chiến

- TEDxHKDI — Humanity by Design: Creativity in the Age of AI — https://www.youtube.com/watch?v=kgX0ijX3cuU
- Here's How AI Completely Changed My Workflow as a UX Designer — https://www.youtube.com/watch?v=lnkhMDX-fvg

## Ablation study của SpecifyUI (Table 2) — bằng chứng cho thứ tự ưu tiên khi xây dựng

| Biến thể | MSE↓ | Cải thiện |
|---|---|---|
| Direct Prompt (baseline, không SPEC) | 57.42 | — |
| Chỉ SPEC | 45.14 | −21.4% |
| SPEC + RAG | 44.89 | thêm ~0.5% |
| SPEC + Region Crop (trích từ ảnh) | 42.12 | thêm ~7% |
| Tích hợp đầy đủ | 40.99 | −11.4% so với baseline mạnh nhất |

Đọc kỹ: chỉ riêng cấu trúc SPEC đã ăn gần hết phần cải thiện; thêm RAG gần như không đổi. Kết luận: xây schema chặt là nơi giá trị nằm nhiều nhất — ưu tiên đúng, có bằng chứng thực nghiệm, không chỉ suy luận.

## Ghi chú — không cần train LLM

Câu trả lời cho "AI hiểu/vẽ đúng bằng cách nào" là ba cơ chế, không phải fine-tune:
1. **Retrieval** — agent chỉ chọn component từ danh mục đọc trực tiếp từ library đã publish.
2. **Few-shot** — vài ví dụ mẫu (yêu cầu → spec.json đúng) làm khuôn.
3. **Validator làm vòng phản hồi tự sửa** — spec sai bị từ chối kèm lý do, agent sửa và thử lại (cap 3 lần).

Rẻ hơn train rất nhiều: không cần dataset lớn, không cần hạ tầng ML, chạy được ngay bằng cách đưa đúng cấu trúc + ví dụ vào ngữ cảnh mỗi lần dùng.
