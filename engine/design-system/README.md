# design-system/ — bộ luật design system dạng compile-được (v2, kind-based)

Đây là engine tách "luật portable" khỏi "giá trị của GHN", tổ chức theo 2 trục tái
dùng (`axis_kind` + `component_kind`) thay vì 1 file luật/component. Xem
`manifest.yaml` để hiểu toàn bộ sơ đồ — đó là NGUỒN DUY NHẤT xác định component
nào thuộc kind nào, luật/giá trị nằm ở file nào. Đừng suy ra thứ tự đọc bằng cách
đoán từ tên file; tra ở manifest.

## Đọc gì trước

1. `manifest.yaml` — sổ đăng ký (component → kinds → file).
2. `rules/_core.rules.yaml` — thư viện kiểu trục + kỷ luật suy luận, portable
   100%, không đổi khi đổi công ty.
3. `rules/kinds/*.rules.yaml` — luật hành vi/UX theo LOẠI component
   (interactive_control, action_trigger — sẽ có thêm overlay/feedback_transient/
   form_input khi thêm Dialog/Toast/Input).
4. `rules/components/*.rules.yaml` — luật CHỈ RIÊNG 1 component. Thường gần rỗng
   — xem `button.rules.yaml` làm ví dụ: 0 luật, chỉ có bản đồ trỏ tới nơi luật
   thật nằm.
5. `rules/_composition.rules.yaml` — luật liên component (vd: nút trong ô thao
   tác dòng bảng, thanh hành động chân form).
6. `profile.ghn/policy.yaml` — quyết định CỦA GHN (đổi công ty thì viết lại file
   này, không đụng `rules/`).
7. `profile.ghn/ds/*.binding.yaml` — giá trị DS thật (px, tên icon, breakpoint).
8. `profile.ghn/decisions.md` — nhật ký quyết định, không bao giờ xoá mục cũ.

## Compile

Agent KHÔNG đọc trực tiếp các file nguồn ở trên — đọc bản đã gộp:

```
npm install          # 1 lần, cài js-yaml
node compile.js       # sinh build/<component>.resolved.yaml cho mọi component trong manifest
node compile.js Button
node compile.js --check   # chỉ kiểm guardrail, không ghi file
```

Output: `build/<component>.resolved.yaml` (agent đọc file này) và
`build/<component>.invariants.json` (hàm chấm máy chạy được).

## Rule ID cũ (BTN-*)

`manifest.yaml § rule_id_aliases` map toàn bộ ID cũ (BTN-E-02-b, BTN-Z-01...) sang
ID mới. Alias không bao giờ bị xoá — vì ID cũ vẫn được trích ở nơi khác trong repo
(vd comment trong `engine/pipeline/compile-v1-to-render-dsl.js`). Đổi tên rule mà
không tra bảng này trước là làm chết im lặng chỗ trích dẫn đó.

## Nếu thêm component mới (Toast, Dialog, Chip...)

KHÔNG tạo `rules/components/<x>.rules.yaml` với đầy đủ luật trước. Làm theo thứ
tự: (1) component đó thuộc `component_kind` nào đã có, hay cần kind mới (đọc
`manifest.yaml § guardrails.kind_needs_3_members` trước khi tạo kind mới); (2)
khai vào `manifest.yaml § components`; (3) viết `profile.ghn/ds/<x>.binding.yaml`;
(4) compile thử — nếu `rules/components/<x>.rules.yaml` cần > 5 luật, đó là dấu
hiệu kind sai, không phải component phức tạp (xem
`guardrails.component_file_stays_small`).

## Trạng thái

**Cập nhật 2026-09-12** — 2 mục từng ghi "chờ Williams review" đã CHỐT xong, không
còn treo:

- `touch.floor_px` / `touch.floor_px_icon_only` — đã chốt mô hình 3 tầng theo
  trục `emphasis` (rank1 → 48px; không rank1 nhưng cô lập + đạt ngoại lệ
  TOUCH-24 → có thể xuống 24px; còn lại → `floor_px_icon_only_default` 40px).
  Dựa trên khảo sát Figma thật (App Truck, App B2B-DRIVER) — xem
  `profile.ghn/decisions.md` entry 09/09-A và rule `ICTL-Z-06`.
- `touch.dense_table_below_breakpoint` — đã chốt `card_list` ("Trên mobile
  không sử dụng bảng table dạng dữ liệu") — xem `profile.ghn/policy.yaml` và
  `profile.ghn/decisions.md`.

Còn 1 việc treo khác, chưa phải quyết định nghiệp vụ mà là lựa chọn kỹ thuật:
kind `feedback_transient` hiện chỉ có 2 thành viên, dưới ngưỡng
`guardrails.kind_needs_3_members` — compiler vẫn chạy được nhưng cảnh báo
(warning, không phải lỗi). Sẽ tự hết khi có component thứ 3 thuộc kind này
(ứng viên tự nhiên: Toast).

`AGENTS.md` (checklist đọc-trước-khi-sinh-spec.json cho agent) đã cập nhật để
trỏ về `manifest.yaml` làm nguồn — xem file đó ở gốc repo.
