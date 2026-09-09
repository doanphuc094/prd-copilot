# Kiến trúc pipeline: một nguồn, nhiều đích render (portable)

## Quyết định kiến trúc cốt lõi

Công cụ vẽ (Figma hoặc tương đương) gánh 3 vai lẫn nhau trong quy trình cũ: nơi **vẽ**, nơi **lưu**, nơi **bàn giao**. Kiến trúc spec-driven lấy mất vai "nơi lưu" và "nơi bàn giao" — công cụ vẽ chỉ còn vai **nơi nhìn và duyệt** (vai này không thay được, vì con người không duyệt UI bằng cách đọc JSON).

```
PRD (nguồn bất kỳ: Confluence/Notion/...)
  → Readiness Gate (xem readiness-gate-rubric.md)
  → Design Specs (.md — người đọc)
  → spec.json  ← SOURCE OF TRUTH (versioned, in git)
       ├─→ Frames trong công cụ vẽ   (đích render 1: để NGƯỜI nhìn & duyệt)
       ├─→ Handoff Pack               (đích render 2: để dev đọc)
       └─→ Code scaffold              (đích render 3: nếu component library trong code đã khớp design system)
```

Dev không lấy UI từ công cụ vẽ nữa — lấy từ spec.json (qua Handoff Pack, sau này qua scaffold code nếu khả thi).

## Quyết định bắt buộc: vùng khoá / vùng tự do

Nếu spec.json là nguồn sự thật mà người dùng vẫn polish thẳng trên bản vẽ → hai bên lệch nhau từ tuần thứ hai. Rủi ro chết người, phải quyết trước khi code.

**Phương án**: mỗi node do renderer dựng được ghi kèm ID của node tương ứng trong spec.json (metadata gắn vào node). Renderer chạy lại **chỉ ghi đè node có ID đó**, không đụng node người dùng tự thêm. Mapping ID hai chiều này là mấu chốt kỹ thuật của toàn hệ thống — không có nó thì không round-trip được, không blast-radius được, không map được comment duyệt về đúng node spec.

## Luận điểm chính: patch-based editing và vòng duyệt của người không tách rời

Regenerate toàn bộ mỗi lần sửa → người duyệt phải review lại cả màn hình từ đầu → approval fatigue (mệt mỏi vì duyệt, dẫn tới duyệt cho có). Patch (sửa từng phần, xem patch-and-validator.md) → người duyệt chỉ review đúng phần thay đổi → nhanh, ít mệt hơn nhiều lần.

Patch-based editing không chỉ là tối ưu kỹ thuật — nó là **điều kiện tiên quyết** để vòng duyệt của người khả thi ở quy mô nhiều người dùng cùng lúc.

## Lộ trình theo phase (khung tham khảo, điều chỉnh theo quy mô thực tế)

**Phase 0 — chốt hợp đồng dữ liệu. KHÔNG cần AI, không cần code.**
Xem schema/schema-design-principles.md. Deliverable: schema spec.json v1 + 1 spec.json mẫu viết tay + quy ước vùng khoá/tự do.

**Phase 1 — spec.json thành source of truth thật.**
spec.json vào git, mỗi feature một file có lịch sử. Renderer ghi spec-node-ID vào metadata khi dựng frame; chạy lại chỉ ghi đè node có ID của agent.
Kết thúc phase: truy vết được hai chiều giữa spec và bản vẽ.

**Phase 2 — patch-based editing.**
Xem patch-and-validator.md.

**Phase 3 — lớp duyệt của người.**
Portal/nơi hiển thị patch dưới dạng người đọc được + link thẳng tới frame tương ứng. Duyệt theo lô, không theo từng màn hình một. Readiness Gate cho phép override nhưng bắt ghi lý do.

**Phase 4 — đích render code (nếu component library trong code đã khớp design system).**
Sinh scaffold code từ chính spec.json. Bản vẽ (Figma...) chính thức chỉ còn là review surface.

## Chỉ số theo dõi

- **Tỉ lệ duyệt-mà-không-sửa-gì**: nếu người duyệt chấp nhận gần như 100% patch không chỉnh gì → không phải AI giỏi, mà là dấu hiệu rubber-stamp (duyệt cho có).
- **Thời gian trung bình mỗi lần duyệt**: tụt xuống còn vài giây = đang bấm cho xong, không thật sự xem.
- **Tỉ lệ node bị sửa tay ngoài spec**: đo mức độ kỷ luật "mọi thay đổi đi qua spec" có giữ được không — chỉ số càng cao càng cho thấy nguyên tắc "spec là nguồn" đang bị xói mòn.

## Rủi ro lớn nhất — nói trước khi bị hỏi

Kiến trúc "spec là nguồn, bản vẽ là view" đòi kỷ luật cao: mọi thay đổi phải đi qua spec. Một người tự làm tự dùng thì giữ được; khi nhiều người (nhiều PO, nhiều designer) cùng vào thì kỷ luật rất dễ vỡ. Vùng khoá/vùng tự do là cách giảm thiểu, không phải triệt tiêu rủi ro này. Đo được tỉ lệ node bị sửa tay ngoài spec là bằng chứng đang kiểm soát rủi ro đó, không phải phớt lờ nó.

## Kiến trúc thực thi: phần nào là code thường, phần nào cần LLM

- **Renderer** (spec.json → frame) và **Validator** (kiểm schema/business rule): luôn là code xác định (deterministic script), không phải "AI Agent". Không cần gọi LLM để chạy, trừ khi validator cần LLM sửa lỗi trong vòng retry (xem patch-and-validator.md).
- **Bước sinh spec.json từ Design Specs** và **Readiness Gate chấm PRD**: đây là phần cần LLM đọc/hiểu nội dung. Có thể triển khai bằng công cụ chat AI có sẵn (skill/plugin) thay vì tự viết code gọi API riêng — rẻ hơn nhiều, không cần hạ tầng, phù hợp quy mô một người.
- Chỉ cân nhắc tự viết Agent gọi thẳng API (thay vì dùng skill trong công cụ chat có sẵn) khi cần chạy hoàn toàn tự động không cần ai bấm gì (ví dụ: theo dõi liên tục một nguồn PRD và tự xử lý) — đây là nâng cấp sau, không phải bước đầu.
