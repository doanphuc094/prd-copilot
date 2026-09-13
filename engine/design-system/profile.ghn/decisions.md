# decisions.md — Nhật ký quyết định (lớp D)

Xuất xứ của mọi quyết định trong `profile.ghn/`. Giữ lại để người kế nhiệm
không tranh luận lại những gì đã chốt.

**Quy tắc của file này:**

- Chỉ THÊM, không sửa mục cũ. Mục bị thay thế thì ghi `Superseded by`, KHÔNG xoá.
- `Quote` phải NGUYÊN VĂN lời người quyết. Diễn giải lại làm mất thông tin và mất khả năng đối chiếu.
- Mỗi mục phải ghi `Affects` để biết sửa mục này thì phải kiểm lại đâu.

Nguồn gốc: tách từ `decision_log` trong `button.rules.yaml` v0.2-draft (07/09/2026).

---

## 07/09 — Type của lối ra là Grey, không phải Secondary

- **By:** Williams
- **Decision:** Hủy / Quay lại / Đóng / Lưu nháp = intent `Grey`, KHÔNG phải `Secondary`
- **Rationale:** Secondary dành cho đường thay thế TƯƠNG ĐƯƠNG về mục đích với Primary, chỉ khác tần suất dùng. Các nút trên không dẫn tới mục đích nào.
- **Affects:** `BTN-T-02`, `BTN-T-03`, `BTN-T-04`

---

## 07/09 — Loại Loading khỏi phạm vi agent

- **By:** Williams
- **Decision:** Bỏ `Loading` khỏi trục intent
- **Rationale:** Ít dùng trong sản phẩm thật.
- **Side effects:**
  - Gỡ luôn mâu thuẫn mô hình: Loading vốn là STATE bị đặt nhầm vào trục intent.
  - Gỡ luôn lỗ hổng thiếu variant: mức nhấn thấp nhất không có Loading (chỉ 46/48 tổ hợp tồn tại). Bỏ Loading thì không còn khoảng trống.
- **Affects:** `policy.excluded.pseudo_axis`, `BTN-INV-9`

---

## 07/09 — Loại Info / Success / Warning khỏi phạm vi agent

- **By:** Williams
- **Decision:** Đưa 3 intent này vào backlog
- **Rationale:** Không dùng trong sản phẩm thật.
- **Side effects:**
  - Trục intent còn 4 vai: Primary · Secondary · Destructive · Grey.
  - Không gian lựa chọn: 960 → 240 tổ hợp (4 × 6 × 5 × 2). Giảm 75%.
  - Cả 4 vai còn lại đều tồn tại đủ ở cả 6 Style — renderer không thể gặp tổ hợp thiếu.
- **Reopen condition:** Nếu cần intent mang màu trạng thái, mở lại và viết luật guard TRƯỚC.
- **Affects:** `policy.excluded.intents`, `BTN-INV-9`

---

## 07/09 — Hình dạng bo tròn hai đầu chỉ dùng cho nút Trở về

- **By:** Williams
- **Decision:** `shape.exception` (Circle) CHỈ dùng cho nút Trở về trên top navigation / Detail Header
- **Rationale:** Ít khi dùng. Trong sản phẩm chỉ có đúng một chỗ này.
- **Correction of:** Claude hiểu sai ban đầu — tưởng Round = có nhãn chữ, Circle = nút tròn chỉ icon. Đã kiểm chứng bằng ảnh render từ library (`814:46117` vs `814:46121`): Round = bo góc vừa phải, Circle = bo tròn hoàn toàn hai đầu (viên thuốc). **Cả hai đều chứa nhãn chữ bình thường.**
- **Affects:** `BTN-S-01`, `BTN-S-02`, `BTN-INV-5`, `policy.shape_exception`, `binding.shape`

---

## 07/09 — Quy trình 3 tầng xác định tần suất

- **By:** Claude (Williams duyệt)
- **Trigger:** Williams hỏi: *"Làm sao mày xác định được đây là đường người dùng đi nhiều nhất"*
- **Finding:** Luật cũ ghi "lấy tần suất từ PRD § WHO" — sai nguyên tắc, vì PRD thường không nêu tần suất. Đây đúng là lỗi "khoá rule vào thứ không suy ra được" mà chính hướng dẫn viết rule đã cấm.
- **Resolution:** 3 tầng — tài liệu nêu tường minh → tiền lệ trong file thiết kế → escalate. Không tầng nào cho ra thì CẤM đoán.
- **Status:** `[XÁC NHẬN — Williams 07/09]` *"Tao xác nhận đề xuất của mày cho button rule"*
- **Affects:** `BTN-T-02`, `BTN-T-03` → nay ở `_core.discipline.evidence_tiers`
- **Note khi tách lớp 08/09:** Quy trình này là suy luận PHỔ QUÁT (không chứa giá trị GHN nào) nên đã chuyển lên `_core.rules.yaml` để mọi component dùng chung, không riêng button.

---

## 07/09 — Định nghĩa mức nhấn thấp nhất trên trục MỨC NHẤN, không phải trục intent

- **By:** Claude (Williams duyệt)
- **Rationale:** Ghost nằm trong property Style cùng Fill/Outline, nên nó trả lời câu "to nhỏ thế nào", không phải "loại hành động gì".
- **Ba dấu hiệu kích hoạt:** lặp lại theo bản ghi · nằm trong container nội dung · icon-only trong toolbar
- **Status:** `[XÁC NHẬN — Williams 07/09]` — lưu ý dấu hiệu thứ nhất (`BTN-E-03-a`) sau đó bị THU HẸP rồi BỎ HẲN (xem 2 mục dưới). Định nghĩa + 2 dấu hiệu còn lại vẫn nguyên.
- **Affects:** `BTN-E-03`, `BTN-INV-10`, `BTN-INV-11`

---

## 07/09 — Thêm Bước 6: logic dùng icon

- **By:** Claude (Williams duyệt)
- **Trigger:** Williams: *"Vẫn còn 1 logic nữa là sử dụng icon cho button? tao chưa define"*
- **Finding (Figma):** Đọc metadata 3 node khác Type/Style/Size (`814:46117`, `814:46471`, `814:46667`) — cả 3 có CÙNG cấu trúc: 1 instance icon trước nhãn, 1 instance nội dung, 1 instance icon sau nhãn. Icon KHÔNG phải giá trị trong Style/Type/Size/State — nó là 2 chỗ trống bật/tắt được. Trang thư viện hiển thị icon chevron placeholder ở cả hai bên cho MỌI variant — đó là icon demo, KHÔNG phải gợi ý rằng nút thật nên có icon hai bên.
- **Finding (nghiệp vụ):** Phần "khi nào dùng icon, dùng icon nào, đặt bên nào" là phán đoán nghiệp vụ, Figma không trả lời được.
- **Status:** `[XÁC NHẬN — Williams 07/09]`
- **Affects:** `step_6_icon`, `decision_pipeline`, `spec_json_shape`

---

## 07/09 — Icon "Xuất file / Xuất dữ liệu" = mũi tên xuống

- **By:** Williams
- **Decision:** `arrow-down-to-line`, không phải `file-export`
- **Correction of:** Claude tự gắn cờ `[CẦN QUYẾT]` sai — tưởng hành động này mâu thuẫn với "Tạo đơn bằng Excel" trong ví dụ. Đó là hai hành động khác nhau hoàn toàn (một cái xuất dữ liệu ra, một cái là đường tạo đơn qua Excel). Không có mâu thuẫn thật, chỉ do Claude đọc nhầm tên giống nhau.
- **Affects:** `policy.icon_policy.export_icon`, `binding.icon_names`

---

## 07/09 — Ngưỡng gom hành động dòng bảng vào menu = 3

- **By:** Williams
- **Quote:** *"Có dùng - thường là ô thao tác có >2 hoặc 3 action tao mới gom thành dạng đó. Nếu ô thao tác chứa đủ 3 nút thì không cần làm dạng này"*
- **Decision:** ≤3 hành động hiện thẳng, >3 mới gom
- **Affects:** `policy.row_action_inline_max`, `BTN-E-03-c`, `BTN-INV-13`

---

## 07/09 — Mức nhấn thấp nhất KHÔNG phải mặc định cho mọi nút trong dòng bảng

- **By:** Williams
- **Quote:** *"Tao confirm là đúng. Xóa nằm trong ô thao tác chuẩn là grey/ outline"*
- **Correction of:** Claude viết `BTN-E-03-a` (bản trước) và `BTN-INV-10` sai — bắt MỌI nút lặp theo dòng bảng phải Ghost. Đã sửa: ô thao tác chuẩn (Sửa/Xoá/Xem — cố định ở mọi dòng) = Outline, intent thường Grey (kể cả "Xoá" thường quy — chỉ lên Destructive khi tài liệu gọi đích danh xoá vĩnh viễn/diện rộng).
- **Superseded by:** mục 07/09 tiếp theo — lý do (a) của mục này (hành động phụ mặc định Ghost) đến lượt nó cũng bị sửa. Lý do (b) (nút gom menu) KHÔNG đổi.
- **Affects:** `BTN-E-02-a`, `BTN-E-03-a`, `BTN-INV-10`, `policy.delete_in_standard_cell`

---

## 07/09 — Icon "Gửi duyệt" = con dấu

- **By:** Williams
- **Decision:** `stamp`, không phải `paper-plane`
- **Rationale:** "Gửi duyệt" là gửi đi để XIN DUYỆT — biểu tượng con dấu đúng nghĩa hơn gửi thông thường. Tách riêng khỏi "Gửi" (gửi tin nhắn/email thông thường) — action đó chưa có bằng chứng, để `[ĐỀ XUẤT]` riêng.
- **Affects:** `policy.icon_policy.submit_for_approval_is_distinct`, `binding.icon_names`

---

## 07/09 — Tìm ra trang Icons thật trong file GHN DS

- **By:** Claude (Williams duyệt)
- **Trigger:** Williams hỏi: *"xài font awesome, tích hợp tra icon nào hợp ngữ cảnh nếu phát sinh icon mới"*
- **Finding (Figma):** Trang "Icons (Use fontawesome 6 Pro)" nodeId `12:2` — ~36 icon đã xác nhận dùng. Đã sửa 6 tên cho khớp chính xác: `trash-can`→`trash`, `pen-to-square`→`pen`, `filter`→`filter-list`, `arrow-rotate-right`→`arrows-rotate`, `arrow-up-from-bracket`→`file-arrow-up`, `arrow-left`→`arrow-left-long`.
- **Finding (giới hạn thật):** Đã thử tích hợp tra cứu sống và THẤT BẠI: (1) fetch trang search fontawesome.com — không được, đó là web app JS; (2) `search_design_system` trong Figma — chỉ tìm component/style đã publish, không tìm được icon instance lẻ. **Kết luận: KHÔNG tự động hoá được việc tra-và-dùng-luôn icon mới một cách đáng tin cậy.** Vẫn cần 1 người mở plugin FA6 Pro xác nhận trước khi renderer dùng thật.
- **Status:** `[XÁC NHẬN — Williams 07/09]`
- **Affects:** `binding.icon_set`, `binding.icon_names`, `policy.icon_policy.new_icon_requires_human`

---

## 07/09 — Hành động ngoài 3 nút chuẩn: mức ưu tiên quyết định dạng nút

- **By:** Williams
- **Quote (phát biểu ban đầu):** *"Trong ô thao tác: các button như Xem/Xóa/Sửa sẽ là outline grey. Nếu button ngoài 3 button đó xem mức độ là primary hay secondary, fill hoặc outline"*
- **Quote (Williams tự sửa lại ngay sau đó):** *"Tao phát biểu sai tao muốn chỉnh lại: Nếu button ngoài 3 button đó xem mức độ ưu tiên thế nào mới quyết định button đó là dạng gì"*
- **Decision:** 3 hành động chuẩn Xem/Sửa/Xoá TIẾP TỤC cố định Outline + Grey. Nhưng bất kỳ nút NÀO KHÁC trong CÙNG ô thao tác (kể cả khi chỉ hiện ở một số dòng) KHÔNG còn tự động gán Ghost. Thay vào đó: đánh giá MỨC ĐỘ ƯU TIÊN thật của hành động đó trong ngữ cảnh dòng/card này — mức độ ưu tiên đó QUYẾT ĐỊNH dạng button, chứ không phải suy ngược lại.
- **Điểm quan trọng của lần tự sửa:** mức độ ưu tiên là NGUYÊN NHÂN, dạng button (intent + emphasis) là KẾT QUẢ suy ra từ đó — **không phải 2 việc đánh giá song song, độc lập nhau.** Về mặt vận hành, "đánh giá mức ưu tiên rồi suy ra dạng" chính là chạy Bước 1 + Bước 2 của pipeline chuẩn.
- **Correction of:** `BTN-E-03-a` ép MỌI hành động ngoài 3 nút chuẩn phải Ghost, bất kể mức quan trọng thật. SAI — vd "Phê duyệt" trên dòng chờ duyệt có thể là hành động chính, xứng đáng Primary + Fill.
- **Affects:** `BTN-E-02-a`, `BTN-E-02-b` (mới), `BTN-E-03-a` (bỏ), `BTN-INV-10`

---

## 07/09 — Áp rule mới vào nút "Phê duyệt" thật

- **By:** Williams
- **Quote:** *"Okay giờ sửa lại nút phê duyệt thử xem sao"*
- **Decision:** Áp `BTN-E-02-b` vào nút "Phê duyệt" thật trong màn `scr_a1` (#06 Chi phí phát sinh) → `Fill Round` + `Primary` (trước là `Outline Round` + `Grey`)
- **Reasoning:** Bước 1 — "Phê duyệt" là hành động GSVT cần làm với mọi dòng đang "Chờ duyệt", đúng mục đích màn → Primary. Bước 2 — trong ô thao tác của mỗi dòng, đây là nút duy nhất, không có nút Fill nào cạnh tranh → Fill.
- **Verified:** compile lại + validate 0 lỗi (27 component instance, khớp baseline) + render thật vào file test, đọc lại property của cả 3 instance → đúng `Fill Round` / `Primary`; chụp ảnh xác nhận trực quan.
- **Note:** Phát hiện nút này bị **hardcode trong compiler** (`buildTableCard()`), không đọc role từ `row_actions` của spec-v1 — nên phải sửa ở compiler, không sửa spec JSON.
- **Affects:** `compile-v1-to-render-dsl.js`, `phase1-compiler-notes.md` Mục 12

---

## 08/09-A — Tách lớp: luật portable riêng, giá trị riêng

- **By:** Williams
- **Quote:** *"cái button.rules này đang viết lẫn lộn giữa rules và cấu hình button (color, value..) đúng không. Nếu đúng như vậy, thì nên có cách nào để giữ bộ luật rule riêng, giá trị button riêng để nếu sau này có đổi công ty thì bộ luật rule cũng có thể giữ lại. Khác là giá trị button"*
- **Decision:** Tách `button.rules.yaml` v0.2 thành 4 lớp:
  - **A** `rules/_core.rules.yaml` + `rules/button.rules.yaml` — suy luận phổ quát, portable
  - **B** `profile.ghn/policy.yaml` — quyết định của công ty
  - **C** `profile.ghn/ds-binding.yaml` — giá trị design system
  - **D** `profile.ghn/decisions.md` — file này
- **Đường cắt:** một luật là portable khi phát biểu được mà KHÔNG gọi tên giá trị cụ thể nào — chỉ gọi VAI mà giá trị đó đóng.
- **Bằng chứng cho việc tách là cần thiết (không phải mỹ phẩm):** câu trả lời cho "phân biệt Secondary với Grey thế nào" đã được chốt ở `BTN-T-03/T-04` ngày 07/09, nhưng `semantic.json` vẫn ghi câu đó là TODO chưa giải — vì không có nguồn duy nhất, câu trả lời không lan được.
- **Yêu cầu thiết kế phát sinh:** profile phải TẮT được luật (không chỉ đổi giá trị), vì có luật mô tả cơ chế mà DS khác không có (vd hình dạng ngoại lệ). Không có cơ chế này thì lớp portable sẽ dần đầy điều kiện "nếu là công ty X".
- **Chi phí đã ghi nhận:** đọc 1 quyết định giờ cần 2-3 file → compiler phải in được bản đã resolve để soi lỗi.
- **Affects:** toàn bộ cấu trúc file; `AGENTS.md` (thứ tự đọc file cần cập nhật)

---

## 08/09-B — Từ vựng vai: theo Type của button.rules, không theo semantic.json

- **By:** Williams
- **Quote:** *"Không giữ theo semantic follow đúng với type của button rules"*
- **Decision:** Vai trên trục intent dùng NGUYÊN từ vựng Type: `Primary` / `Secondary` / `Destructive` / `Grey`
- **Rejected:**
  - `cancel` (tên role của `semantic.json`) — mô tả được nửa nghĩa, vì `BTN-T-04` gom cả lối ra *và* tiện ích phụ trợ
  - `no_path` (Claude đề xuất) — thêm phương ngữ thứ ba, không cần thiết
- **Hệ quả:** binding của trục intent hôm nay là ĐỒNG NHẤT (tên vai trùng chuỗi DS). Lớp indirection vẫn giữ vì nó là chỗ soi khi migrate.
- **Rủi ro đã ghi nhận (chấp nhận):** `Grey` là một từ chỉ MÀU, không mô tả ý nghĩa hành động. Ở DS khác gọi trục này là Neutral/Tertiary thì chỉ cần sửa 1 dòng ở `binding.intent`, không phải sửa `rules/`. Đã ghi tại `binding.intent.why_indirection_still_needed`.
- **Việc phát sinh:** `semantic.json` cần cập nhật bỏ role `cancel` và trỏ về từ vựng này — nếu không sẽ tồn tại 2 phương ngữ song song, đúng vấn đề mục 08/09-A phát hiện. **CHƯA LÀM.**
- **Affects:** `_core.vocabulary.intent`, `binding.intent`, `semantic.json` (chờ cập nhật)

---

## 08/09-C — Size theo loại con trỏ (web responsive) — ⚠️ CHỜ XÁC NHẬN

- **By:** Claude đề xuất, Williams chưa duyệt
- **Trigger:** Williams: *"Tao vừa nhớ ra tao chưa quy định xài size button cho bản mobile và desktop. Có principles nào cụ thể cho việc này không"* → sau đó chốt phạm vi: *"Tao cần cho web responsive trước"*
- **Finding (Figma, đo thật 08/09):** chiều cao thật của thang size — xs 32 · sm 40 · **md 44** · **lg 48** · xl 52. `md` và `lg` trùng khít 2 ngưỡng cảm ứng (44 = WCAG 2.5.5 AAA + Apple HIG; 48 = Material Design 3). DS này được xây có tính tới cảm ứng.
- **Finding (Figma):** collection `Breakpoints` dùng đúng scale Tailwind (640/768/1024/1280/1536). Collection `Dimensions` chỉ có 1 mode → **DS KHÔNG có cơ chế đổi size theo thiết bị qua variable mode**, sàn phải do compiler áp.
- **Đề xuất:**
  - Loại con trỏ là SÀN áp lên bảng size-theo-vị-trí đã có, KHÔNG phải thang size thứ hai (tránh nhân đôi bảng, tránh phải quyết 2 lần cho mỗi vị trí mới)
  - Sàn nút có nhãn = 44 · sàn nút icon-only = 48 (vì icon-only gần vuông, chiều rộng vỡ cùng chiều cao)
  - Trên cảm ứng, size KHÔNG mang thứ bậc — thứ bậc do emphasis và vị trí gánh
  - Sàn không đạt được = lỗi layout, không phải lỗi nút → escalate đổi pattern
  - Luật mới: `BTN-Z-05` · `BTN-Z-06` · `BTN-Z-07` · `BTN-Z-08` · `BTN-INV-14` · `BTN-INV-15`
- **Giới hạn thật đã ghi:**
  1. Vùng bấm mở rộng (hit-slop) hợp lệ về chuẩn nhưng công cụ thiết kế KHÔNG biểu diễn được → chỉ ghi được thành note handoff cho dev
  2. Breakpoint là PROXY của loại con trỏ, không phải điều kiện đúng — laptop cảm ứng 1280px là ca proxy sai theo hướng thiếu sàn
  3. Tên `md` đụng nhau: `size.md` = 44px vs `breakpoints.md` = 768px → luôn viết đủ tiền tố
- **⚠️ CẦN WILLIAMS QUYẾT:** dưới breakpoint proxy, bảng nhiều cột dày xử lý thế nào — card list / bottom sheet / trượt ngang? Xem `policy.touch.dense_table_below_breakpoint`. `BTN-Z-08` sẽ escalate mỗi lần gặp ca này cho tới khi được quyết.
- **Status:** `[ĐỀ XUẤT — chưa duyệt]`
- **Affects:** `step_4_size`, `policy.touch`, `binding.size`, `binding.breakpoints`, `_core.touch_input`

---

## 08/09-D — Luật gắn vào LOẠI, giá trị gắn vào COMPONENT (kiến trúc kind)

- **By:** Williams
- **Quote:** *"Vậy làm sao tao có thể build giá trị cho từng component design system và rule chung cho từng loại 1 cách scalable và tối ưu"*
- **Trigger:** Williams phát hiện `ds-binding.yaml` sẽ vỡ khi thêm Toast/Dialog: *"khi tao add thêm lớp mới như toast/dialog thì nó vẫn nằm chung với ds-biding đúng không"*

### Bằng chứng đo được (không phải suy đoán)

Phân loại 40 nhóm luật của `button.rules.yaml` v0.2 theo tầng sở hữu đúng nhất:

| Tầng | Số nhóm |
|---|---|
| `_core` — kiểu trục / a11y phổ quát | 6 |
| `kinds/interactive_control` | 7 |
| `kinds/action_trigger` | 2 |
| `_composition` — liên component | 6 |
| **Chỉ riêng Button** | **0** |

**Không có luật nào là độc quyền của Button.** Hai thứ từng bị coi là "riêng Button" hoá ra là dữ kiện DS (quirk property `Style` gộp 2 trục) và một luật đã bỏ.

Thêm nữa, đo `ds-binding.yaml` v1: **43% nội dung là thứ dùng chung mọi component** (`breakpoints` ~196, `icon_set` ~331, `icon_names` ~446, `cross_component_traps` ~140 token) đang bị nhét trong binding của Button. Triệu chứng rõ nhất: bản v1 phải nhét bẫy của **Badge** vào `ds-binding` của **Button** vì không có chỗ nào khác để đặt.

### Quyết định

Luật gắn vào **LOẠI**, giá trị gắn vào **COMPONENT**. Hai trục tái sử dụng độc lập:

- **axis kind** → luật CẤU TRÚC (giá trị nào hợp lệ, resolve thế nào, ràng buộc đơn vị)
- **component kind** → luật HÀNH VI/UX (cạnh tranh sự chú ý, focus, thời lượng)

Thêm component mới = **khai** nó thuộc loại nào + điền giá trị. Gần như không viết luật.

### Cấu trúc

```
manifest.yaml                    ← sổ đăng ký: component → kinds → file. Máy đọc được.
compile.js                       ← sinh build/<component>.resolved.yaml
rules/
  _core.rules.yaml               ← thư viện KIỂU TRỤC + kỷ luật + a11y + ngưỡng cảm ứng
  _composition.rules.yaml         ← luật liên component (mỗi luật khai `involves`)
  kinds/interactive_control.rules.yaml
  kinds/action_trigger.rules.yaml
  components/button.rules.yaml   ← RỖNG (0 luật) — đây là kết quả đúng
profile.ghn/
  policy.yaml                    ← `shared` + scope theo component
  ds/_shared.binding.yaml        ← breakpoints, bộ icon, quirk cấp file, bẫy liên component
  ds/button.binding.yaml         ← componentKey, property names, px thật, quirk riêng
examples/button.examples.yaml    ← 8 trace đã chạy đủ pipeline
build/button.resolved.yaml       ← AGENT ĐỌC ĐÚNG FILE NÀY
```

### Kết quả đo sau khi làm

- `build/button.resolved.yaml` ~16.500 token — **nhỏ hơn v0.2 (~23.700) 30%**, và agent đọc **1 file** thay vì tự gom 8 file
- 40/40 rule id cũ vẫn truy vết được qua `manifest.rule_id_aliases` (cần thiết vì id cũ đang được trích trong `compile-v1-to-render-dsl.js`, `phase1-compiler-notes.md` Mục 12, và field `rule_ids` của spec đã sinh)
- Lớp luật SẠCH: 0 chuỗi variant, 0 componentKey, 0 node-id, 0 tên icon, 0 px của thang, 0 breakpoint, 0 ngưỡng số, 0 tên công ty
- 16 invariant xuất được thành `build/button.invariants.json` — đây là **hàm chấm máy chạy được**, dùng cho việc sinh trace về sau
- `CMP-FTR-02` (involves: `screen`) tự động KHÔNG nạp vào bản của Button — chứng tỏ `_composition` dài ra cũng không làm bản resolved của từng component phình theo

### 5 lằn ranh chống lạm dụng — compiler kiểm, không phải lời khuyên

1. Một kind phải có >= 3 thành viên thật (cảnh báo) — đã bắt được `feedback_transient` mới có 2
2. Kind phẳng, cấm khai kind cha (lỗi cứng)
3. Hai kind cùng khai một rule id với nội dung khác nhau = **lỗi cứng**, không im lặng chọn bên
4. File luật riêng của component > 5 rule = cảnh báo kind sai
5. Không tạo component_kind vì lý do cấu trúc — cấu trúc thuộc axis_kind, kind chỉ nói về hành vi

### Việc còn lại

- `semantic.json` → `ds/_shared.binding.yaml` (bước 3, **CHƯA LÀM** — chỗ dành sẵn đã ghi trong file, kèm danh sách item cần chuyển và item cần bỏ)
- `AGENTS.md` § thứ tự đọc file vẫn trỏ tới cấu trúc cũ — **CHƯA CẬP NHẬT**
- `policy.shared.touch.dense_table_below_breakpoint` vẫn `null` — chờ Williams quyết, `ICTL-Z-08` escalate tới khi có
- Sàn cảm ứng 44/48 vẫn `[ĐỀ XUẤT]` — chờ Williams xác nhận

### Ghi nhận một lỗi của chính quy trình

Lần tách lớp đầu (08/09-A) làm **mất 7 `worked_examples`** mà verify không bắt được, vì verify chỉ kiểm rule id — tức là kiểm sai thứ. Đã phục hồi vào `examples/button.examples.yaml` và thêm mục thứ 8: một ca **escalate** làm nhãn dương, vì nếu tập trace này về sau dùng làm dữ liệu huấn luyện mà thiếu ca escalate thì model sẽ học cách luôn có đáp án — tức là học đoán.

- **Affects:** toàn bộ cấu trúc; `manifest.yaml`, `compile.js` (mới); `AGENTS.md` (chờ cập nhật); `semantic.json` (chờ di chuyển)

## 09/09-A — Sàn cảm ứng cho icon-only: từ 1 sàn cứng sang thang 3 bậc theo emphasis

**by**: Williams, xác nhận qua chat với Claude
**affects**: `rules/kinds/interactive_control.rules.yaml` (ICTL-Z-06, ICTL-INV-14, ICTL-INV-15), `profile.ghn/policy.yaml` (touch.floor_px, touch.floor_px_icon_only, touch.floor_px_icon_only_default, touch.dense_table_below_breakpoint), `profile.ghn/ds/button.binding.yaml` (icon_only_default)

**Bối cảnh**: Đang chốt `policy.yaml § shared.touch` (3 mục `[ĐỀ XUẤT]` từ 08/09).
Trả lời câu hỏi `floor_px_icon_only`, Williams cho số thật đang dùng ("icon 16,
nút viền ngoài 40, grey/outline") rồi mô tả thực tế "size icon button dao động
từ 24-48px tuỳ mức ưu tiên và kích thước frame" — lộ ra đề xuất ban đầu của
Claude (1 sàn cứng 48 cho MỌI icon-only) không khớp thực tế.

**Bằng chứng** — Claude đọc trực tiếp 2 file Figma app mobile thật theo yêu cầu
Williams (screenshot + metadata, không suy đoán):
- `App Truck` (fileKey 7urnQBIkHJX7AmiWWpMDnl), màn "Bên trong cabin xe"
  (node 1:11366): nút chụp ảnh (rank1, hành động duy nhất màn hình) ≈ 64px;
  nút bật/tắt flash (tiện ích phụ, đứng riêng lẻ) = 40px (đo từ metadata,
  instance "Flash icon" 40×40).
- Cùng file, header mọi màn (vd node 1:12263 "Chi tiết phiếu"): icon back/home
  = 24px (metadata "24px/Previous"), đứng riêng 1 mình ở góc header, xa các
  phần tử khác.
- Màn "Bottom sheet xem/ xoá ảnh" (node 1:12046): thay vì nhiều icon-only nhỏ
  cạnh nhau cho Xem/Xoá, DS dồn vào 1 icon "..." overflow, mở bottom sheet có
  nhãn chữ đầy đủ — xác nhận thêm quyết định `dense_table_below_breakpoint`
  bên dưới.
- Chưa đào file `App B2B-DRIVER` (2RLeRDt6tLCZrfCFqyMZUi) — đủ bằng chứng từ
  App Truck để quyết, để dành đối chiếu sau nếu cần.

**Quyết định**:
1. `touch.floor_px` = 44 — giữ nguyên đề xuất 08/09, xác nhận.
2. `touch.floor_px_icon_only` = 48 — GIỮ giá trị, nhưng đổi phạm vi áp dụng:
   chỉ áp cho icon-only ở bậc **emphasis.rank1**, không phải mọi icon-only.
3. `touch.floor_px_icon_only_default` = 40 — MỚI, áp cho icon-only không phải
   rank1 và không đứng riêng lẻ đủ điều kiện spacing exception. Khớp đúng
   default Williams đang dùng (icon 16/nút 40).
4. Icon-only không phải rank1 NHƯNG đứng riêng lẻ, đạt điều kiện spacing
   exception của TOUCH-24 (đã viết sẵn ở `_core.rules.yaml` từ 08/09 nhưng
   CHƯA từng được dùng tới cho tới quyết định này) → được phép xuống 24px.
   Đây chính là cách header back/home 24px hợp lệ mà không cần ngoại lệ mới.
5. Nút chụp ảnh 64px KHÔNG đưa vào thang size Button (thang hiện tại dừng ở
   xl=52) — ghi nhận là bằng chứng cho tier rank1, không model thành 1 bước
   Button mới. Đây có thể là 1 component/pattern khác (FAB) — để dành quyết
   khi thật sự cần, KHÔNG tự thêm bước size mới cho Button hôm nay.
6. `touch.dense_table_below_breakpoint` = **card_list** (không phải
   `bottom_sheet` như Claude đề xuất ban đầu). Quote Williams: "Trên mobile
   không sử dụng bảng table dạng dữ liệu" — rộng hơn phạm vi ICTL-Z-08 (đổi cả
   layout màn hình, không chỉ đổi cách hiển thị hành động trong ô thao tác).

**Lưu ý provenance**: bằng chứng mục 64px/40px/24px đến từ 1 app mobile
NATIVE riêng (App Truck), có thể dùng library component khác với "Button /
Button organism" (web GHN DS) mà `button.binding.yaml` đang mô tả — không
cùng 1 component set. Dùng làm bằng chứng cho QUY LUẬT chung (sàn cảm ứng theo
mức ưu tiên) là hợp lý vì đây là hành vi vật lý/UX phổ quát, không phải giá
trị riêng của 1 component — nhưng nếu sau này cần biết CHÍNH XÁC component
nào tạo ra 3 con số này, phải tra lại đúng 2 file Figma trên, không suy từ
`button.binding.yaml`.

**Guardrail**: `ICTL-Z-06` giữ nguyên cờ `undisableable: true` — thang 3 bậc
vẫn là sàn a11y bắt buộc, không phải gợi ý.

## 09/09-B — Migrate semantic.json (badge/surface/text_style/spacing.density) vào _shared.binding.yaml

**by**: Williams ("Migrate đi")
**affects**: `profile.ghn/ds/_shared.binding.yaml`, `claude/agentic-ds-drafts/semantic.json` (Claude Project, đánh dấu superseded)

**Đã di chuyển** (theo đúng `_pending_migration.items_to_move` đã ghi sẵn từ 08/09):
badge (3 màu + no_color_borrowing_rule), surface.table_header, text_style
(table_header_label, diff_view_old_value, diff_view_new_value), spacing.density.
Giữ nguyên `confirmed_source` gốc của từng mục để không mất truy vết.

**KHÔNG di chuyển** (đúng theo `items_to_drop` đã quyết từ trước):
- `button.*` của semantic.json — đã thay hoàn toàn bằng
  `ds/button.binding.yaml` + `policy.yaml` + `rules/`.
- Role name `"cancel"` — bỏ theo decisions.md 08/09-B, dùng từ vựng Type
  (Grey) thay vì đặt tên semantic riêng.
- `spacing.grid_units_per_row`, base spacing scale px, `typography.*` — CHƯA
  migrate vì CHƯA có số liệu thật (vẫn là TODO trong semantic.json gốc), migrate
  giờ sẽ tạo cảm giác "đã xong" cho dữ liệu thật ra chưa tồn tại.

**semantic.json ở Claude Project**: đánh dấu `_superseded` ở đầu file, KHÔNG
xoá nội dung (nguyên tắc provenance: giữ lại, không xoá — xem
`_core.rules.yaml § provenance.never_delete`) — các mục `_todo`/`TODO_chua_lam`
còn lại trong đó vẫn là việc thật cần làm, chỉ là không còn là nơi CHỨA giá
trị đã chốt nữa.

## 12/09-A — Sửa icon "Bộ lọc": filter-list → filter (đối chiếu dữ liệu FA6 thật)

**by**: Williams ("Okay dùng filter đi")
**affects**: `profile.ghn/ds/_shared.binding.yaml` (`icon_set.confirmed_icons`, `icon_names."Bộ lọc"`)

**Bối cảnh**: Trước đây `icon_names."Bộ lọc"` ghi `filter-list`, đánh dấu
`[FIGMA]` (đọc từ trang Icons 12:2 ngày 07/09). Lúc rà lại toàn bộ rule để
chuẩn bị thêm component mới, Claude cài gói npm chính thức
`@fortawesome/fontawesome-free@6.7.2` và đối chiếu `metadata/icon-families.json`
đi kèm (dữ liệu tên icon CHÍNH THỨC của Font Awesome, không phải scrape
website JS đã thất bại trước đây) với 14 icon trong bảng `icon_names`.

**Phát hiện**: 13/14 icon khớp thật. Riêng `filter-list` KHÔNG tồn tại trong
catalog FA6 — chỉ có `filter`, `filter-circle-dollar`, `filter-circle-xmark`.

**Quyết định**: Đổi thành `filter`. Cập nhật cả 2 chỗ: `icon_set.confirmed_icons`
(danh sách đọc từ trang 12:2) và `icon_names."Bộ lọc"`.

**Giới hạn thật (ghi lại để không lặp lại nhầm lẫn)**: gói Free chỉ phủ ~1895
icon tầng Free của FA6, không có icon riêng của Pro (GHN dùng FA6 Pro,
~3000+ icon theo `icon_set.full_catalog_size`). Một icon không có trong dữ
liệu Free KHÔNG tự động sai — có thể là icon Pro thật, chỉ là nguồn này không
xác nhận được. Trường hợp `filter-list` bị loại vì không khớp bất kỳ biến thể
nào hợp lý trong họ "filter", không phải chỉ vì "không có trong Free".

---

## 12/09-B — Kind split Toast/Alert/Dialog: viết `rules/kinds/feedback_transient.rules.yaml` + `rules/kinds/overlay.rules.yaml`

**by**: Williams (xác nhận nhiều điểm qua chat) + Claude (đọc trực tiếp Figma qua connector `mcp__Figma__*`)
**affects**: `manifest.yaml` (`component_kinds.overlay`, `component_kinds.feedback_transient`), `rules/kinds/feedback_transient.rules.yaml` (MỚI), `rules/kinds/overlay.rules.yaml` (MỚI)

**Bối cảnh**: Williams paste 1 draft "FEEDBACK GROUP — Toast/Dialog/Alert" gộp
cả 3 component vào chung 1 cấu trúc phẳng (FB-01/02/03). Đối chiếu với
`manifest.yaml` đã có sẵn từ 08/09: Toast+Alert thuộc `feedback_transient`,
Dialog thuộc `overlay` — 2 kind TÁCH BIỆT, không gộp. `_composition.rules.yaml
§ CMP-DLG-01` (`involves: [action_trigger, overlay]`) cũng ngầm xác nhận Dialog
đã ở `overlay` từ trước. Quyết định giữ đúng kiến trúc gốc, không theo draft
gộp — draft được dùng làm NGUỒN NỘI DUNG (content_patterns, invariants), không
làm nguồn CẤU TRÚC.

**Phát hiện qua Figma (đọc trực tiếp, fileKey `zECOR8UK45lmZcpMG9aOR7`)**:
- Toast desktop (node `1023:5898`, symbol `Type=Primary` = `1023:5881`) có sẵn
  header + 2 Button organism + 1 icon dismiss trong 1 frame — **xác nhận là
  demo "kitchen sink"** (Williams 12/09: "đúng là demo chưa có UI trên 1
  context thực nào cả"), KHÔNG phải pattern thật.
- Toast MOBILE (app tài xế, node `3569:33454` "Toast Message (Mobile App)")
  có định nghĩa CHÍNH THỨC bằng chữ trong docs: *"Toast message là thành phần
  UI dùng để thông báo tạm thời đến người dùng về một hành động vừa xảy ra...
  toast không can thiệp vào trải nghiệm chính và sẽ tự biến mất sau một
  khoảng thời gian ngắn (3s đối với các hành động đơn giản)"* — và hướng dẫn
  UX writing: *"Nếu có hành động (button): ghi rõ hành động như 'Thử lại',
  'Hoàn tác'"* (số ít → pattern action thật là 1 nút, không phải 2).
- Toast mobile dùng trục `Status` riêng, chỉ 4 giá trị: Success/Failed/
  Info/Warning — sạch hơn hẳn `Type` 9 giá trị của Toast desktop.
- `search_design_system` (lọc `libraryName == "GHN DS"`) xác nhận
  `Dialog / Dialog oragism` (componentKey
  `8b04f4f411eda928c14075725b148bb6a9e5590b`) là component THẬT, tách biệt
  khỏi `Alert / Alert organism` — không phải cùng 1 thứ bị đặt 2 tên.
- Node `112:11396` (Williams trỏ tới khi nói "alert modal") có tên CANVAS là
  "⚫ Alert Dialog" nhưng bên trong chỉ chứa instance `Alert / Alert organism`
  (12 biến thể Type×Style) đặt trong mockup docs — không có layer
  backdrop/overlay riêng nào tách biệt.

**Quyết định (Williams xác nhận từng phần qua chat 12/09)**:
1. Toast có 2 content pattern: `status` (icon+tiêu đề, tự biến mất ~3s,
   KHÔNG dismiss) và `action` (icon+tiêu đề+1 nút+dismiss — dismiss chỉ xuất
   hiện cùng action). Quote: *"dismiss icon chỉ thuộc pattern nào có action
   -> đúng"*.
2. 7/9 giá trị Type của Toast desktop (Warning, Info, Primary, Secondary,
   Grey, White, Disable) đưa vào backlog, chưa có giá trị thực — cùng cách xử
   lý với Info/Success/Warning bị loại khỏi Type của Button (07/09). Quote:
   *"Hiện tại chưa có giá trị thực cho 7 giá trị đó của toast đưa vào backlog
   giống button"*.
3. Banner "Có 2 điểm giao không thể xếp tuyến" (ảnh Williams gửi) là component
   **Alert** (không phải Toast) — Alert là banner tĩnh, KHÔNG tự biến mất theo
   thời gian. Quote: *"Okay tách nó thành alert đi"*.
4. **AlertDialog** định nghĩa lại theo NGHIỆP VỤ, không theo cấu trúc Figma:
   modal LUÔN chặn nền, dùng cho thao tác CRITICAL — không thể khôi phục, HOẶC
   khôi phục được nhưng hậu quả rất nghiêm trọng. Ví dụ thật Williams cho:
   *"kích hoạt bảng giá, tại thời điểm kích hoạt bảng giá các đơn hàng sẽ theo
   bảng giá mới. Nếu bảng giá mới kích hoạt bị sai việc tính doanh thu cũng bị
   sai ảnh hưởng đến toàn hệ thống"*. Williams chủ động bỏ hướng "Alert thuộc
   cả 2 kind tuỳ cách dùng" vì use case Alert-không-chặn-nền "rất ít" — không
   cần mô hình hoá phức tạp thêm.

**⚠️ Việc còn mở (chưa tự quyết, ghi trong `_pending_confirmation` của từng
file)**:
- Ví dụ "bảng giá" KHÔNG khớp định nghĩa `intent.destructive` hiện tại của
  `ATRG-T-01` (không mất dữ liệu, có thể khôi phục) — nhưng vẫn cần chặn nền
  như CMP-DLG-01. Cần Williams quyết: mở rộng CMP-DLG-01 hay thêm rule
  composition mới song song (CMP-DLG-01 đang `undisableable`, dùng chung cho
  cả Button — KHÔNG tự sửa khi chưa xác nhận).
- Node-id thật của Dialog (generic, không phải AlertDialog) — vẫn thiếu, chưa
  đọc được anatomy.
- Recipe "form" của Dialog — chưa có bằng chứng Figma.
- Ý nghĩa nghiệp vụ 7 giá trị Type backlog của Toast desktop — mở lại khi có
  màn hình thật cần dùng.

---

## 12/09-C — Toast + Alert đăng ký thành component thật; vòng xác nhận thứ 2

**by**: Williams (xác nhận qua chat) + Claude (viết binding từ Figma đã đọc)
**affects**: `manifest.yaml` (§ components.Toast, components.Alert), `rules/components/toast.rules.yaml`, `rules/components/alert.rules.yaml` (MỚI), `profile.ghn/ds/toast.binding.yaml`, `profile.ghn/ds/alert.binding.yaml`, `profile.ghn/ds/toast-mobile.binding.yaml` (MỚI), `rules/kinds/overlay.rules.yaml`

**Quyết định kiến trúc mới — binding theo platform**: Toast có 2 bản thật sự
khác nhau trong Figma (desktop: trục `Type` 9 giá trị, 850×76px; mobile app
tài xế: trục `Status` 4 giá trị, 361×48px, tên chuỗi status khác — `Failed`
thay vì `Error`). Quote Williams: *"làm một bản riêng đánh dấu chỉ xài ở
mobile only"*. Giải pháp: `manifest.yaml § components.Toast` giữ `binding`
mặc định (web/desktop) + thêm `binding_by_platform.mobile` trỏ tới
`toast-mobile.binding.yaml` — đây là component/binding platform-scoped ĐẦU
TIÊN của hệ thống, đặt tiền lệ cho các component sau này có nhiều nền tảng.

**Các xác nhận khác (12/09, vòng 2)**:
- Toast pattern `action` KHÔNG tự đóng — chờ người dùng tự thao tác. Quote:
  *"nếu có pattern action thì không tự đóng"*.
- `OVL-INV-01` (Dialog phải có lối thoát tường minh) áp cho **MỌI** Dialog,
  không riêng recipe nào. Quote: *"Áp cho mọi dialog"*.
- Alert có nút đóng thủ công (dismiss) thật — Williams gửi link file Figma
  làm bằng chứng nhưng KHÔNG kèm node-id (`?node-id=` thiếu trong URL), nên
  chưa đọc được cấu trúc chi tiết của nút đó.
- 7 giá trị Type backlog của Toast desktop và ý nghĩa Default/Disable/Info/
  Warning của Alert — tái xác nhận giữ nguyên trạng thái backlog.

**⚠️ Việc còn mở SAU vòng 2 (chưa tự sửa file, chờ Williams trả lời rõ hơn)**:
- `content_pattern: inline_link` của Alert — Williams nói *"do cái này tao tự
  chế nên remove không cần ghi vào"*, nhưng CHƯA RÕ nghĩa: ảnh ví dụ "Có 2
  điểm giao không thể xếp tuyến" là do Williams tự dựng minh hoạ (không phải
  chụp từ màn hình GHN thật) hay ý khác. Nếu là vế đầu, `inline_link` phải rút
  khỏi danh sách đã xác nhận. Đang hỏi lại, CHƯA sửa `alert.rules.yaml`.
- Style Fill/Outline của Alert — Williams hỏi lại "là button hay cái gì", đã
  giải thích đây là trục Style riêng của Alert (không liên quan Button),
  đang chờ câu trả lời khi nào dùng Fill/Outline.
- `Alert button container (Base)` (atom Figma) — Williams chưa hiểu, đã giải
  thích lại là khung chứa nút bên trong Alert, đang chờ xác nhận có use case
  thật nào cần tới không.
- Link Dialog Williams gửi (`?m=dev`, không có `?node-id=`) chưa dùng đọc được
  — cần link trỏ đúng 1 frame cụ thể (copy link to selection trong Figma).
- Recipe "form" của Dialog — Williams hỏi "là cái gì", đã giải thích đây là
  Dialog chứa 1 form nhập liệu ngắn (từ draft Williams tự paste 08/09, không
  phải Claude bịa) — đang chờ xác nhận có ví dụ thật hay bỏ khỏi known_recipes.

---

## 12/09-D — Vòng xác nhận thứ 3: 4 câu trả lời batch của Williams

**by**: Williams (xác nhận qua chat)
**affects**: `manifest.yaml` (§ component_kinds.feedback_transient.about), `rules/components/toast.rules.yaml`, `rules/components/alert.rules.yaml`, `profile.ghn/ds/alert.binding.yaml`, `rules/kinds/overlay.rules.yaml`

**1. `about` của kind `feedback_transient` — ĐÃ SỬA.** Williams: *"Okay tao ủng
hộ"* (chấp nhận đề xuất từ vòng 2). `manifest.yaml § component_kinds.
feedback_transient.about` đổi từ "Xuất hiện rồi tự biến mất" thành "Phản hồi
không chiếm quyền tương tác — không backdrop, không chặn nền, không bẫy
focus". `about_note` (đề xuất) đã rút, thay bằng `about_source` (đã áp dụng).

**2. Toast pattern `action` — bằng chứng gián tiếp, ĐÃ ĐÓNG dạng backlog.**
Williams: *"Tạm chưa có đưa vào backlog keep track nếu có context dùng thì
đề xuất cho tao"* — pattern `action` (suy từ hướng dẫn UX writing, chưa có
node Figma vẽ trực tiếp 1-button) giữ nguyên như đang mô tả, không chặn tiến
độ. Claude có trách nhiệm chủ động đề xuất lại khi gặp context/màn hình thật.

**3. `content_pattern: inline_link` của Alert — ĐÃ XOÁ.** Williams: *"Do
trong design system không có mẫu template này, nó không thuộc phạm vi
template của design system, nên tao muốn remove để bám sát theo template mẫu
của design system"* — nghĩa là ảnh minh hoạ "Có 2 điểm giao không thể xếp
tuyến" KHÔNG phải 1 template thật trong GHN DS. `rules/components/
alert.rules.yaml § content_pattern.values` nay RỖNG — chờ 1 template thật
trước khi ghi lại giá trị nào. `alert.binding.yaml § sub_parts.button_
container.note` cũng cập nhật theo (câu hỏi "Alert có cần button không" nay
lại hoàn toàn mở, vì cơ sở cũ "content_pattern xác nhận là inline_link/text
link" không còn đúng).

**4. Style Fill/Outline của Alert — CÂU TRẢ LỜI KHÔNG KHỚP CÂU HỎI, CHƯA ÁP
DỤNG.** Williams trả lời chi tiết: *"Dùng fill cho các tác vụ chính quan
trọng... Đối với outline tao muốn sử dụng trong trường hợp có 3 nút... còn
trong trường hợp 2 nút... mày auto chuyển nút outline về grey giúp tao"* —
nội dung này mô tả rõ ràng cấu hình NÚT CỦA DIALOG FOOTER (3-nút/2-nút), chứ
không rõ có phải trả lời cho background Style (Fill/Outline) của chính
component Alert hay không. Claude KHÔNG tự áp câu trả lời này vào
`alert.binding.yaml § style.meaning` (vẫn `[cần verify]`) — thay vào đó ghi
tạm thành dự thảo ở `rules/kinds/overlay.rules.yaml § dialog_footer_emphasis_
draft`, đánh dấu CHƯA XÁC NHẬN PHẠM VI, chờ Williams trả lời rõ: đây có đúng
là rule cho Dialog footer không, và Alert Style Fill/Outline có còn là câu
hỏi riêng, tách biệt không.

**⚠️ Việc còn mở sau vòng 3**:
- Xác nhận phạm vi câu trả lời Fill/Outline/Grey (Dialog footer hay Alert
  Style — xem mục 4 ở trên).
- Nếu là Dialog footer: chuyển `dialog_footer_emphasis_draft` thành invariant/
  behavioural_limit chính thức của `overlay.rules.yaml`.
- Nếu Alert Style vẫn là câu hỏi riêng: hỏi lại Williams, tách biệt rõ khỏi
  câu hỏi Dialog.
- Node-id thật của Dialog (generic), recipe "form", và "Alert button
  container (Base)" — vẫn mở, chưa có câu trả lời mới.

---

## 12/09-E — Dialog footer emphasis chốt phạm vi; Alert Style chốt (Outline only)

**by**: Williams (xác nhận qua chat)
**affects**: `rules/kinds/overlay.rules.yaml` (§ behavioural_limits, invariants), `rules/components/alert.rules.yaml` (§ invariants, MỚI), `profile.ghn/ds/alert.binding.yaml` (§ style), `profile.ghn/policy.yaml` (§ alert.excluded, MỚI)

**Dialog footer Fill/Outline/Grey — xác nhận đúng là rule cho NÚT (Dialog),
không phải Alert Style.** Williams: *"Cái đó là tao nói button đúng"*. Nội
dung dự thảo ở `12/09-D` (mục 4) nay chính thức hoá thành:
- `OVL-B-03` — Fill = tác vụ chính; Outline chỉ hợp lệ khi footer có ĐÚNG 3
  nút (vai trò gần Fill, ưu tiên thấp hơn); Grey = ưu tiên thấp nhất. Tham
  khảo rule emphasis của Button theo đúng ý Williams.
- `OVL-INV-02` — footer 2 nút: nút vốn Outline TỰ ĐỘNG chuyển Grey (tăng
  contrast về phía nút Fill/primary).

**Alert Style (Fill/Outline) — câu hỏi RIÊNG, trả lời gọn ngay sau đó.**
Quote nguyên văn: *"Còn alert dialog tất cả dùng dạng outline không dùng
fill"* — Alert LUÔN render Outline, KHÔNG BAO GIỜ Fill, dù Figma có đủ 12
biến thể Type×Style (6 cái Fill). Ghi thành:
- `alert.rules.yaml § ALERT-INV-01` (style == Outline luôn luôn)
- `alert.binding.yaml § style` (`active_value: Outline`, `excluded: [Fill]`)
- `policy.yaml § alert.excluded.style` (Fill loại khỏi Alert — cùng khuôn với
  Button loại Info/Success/Warning khỏi intent ở `12/09` gốc)

**Bài học ghi nhận**: batch câu hỏi trước đó (`12/09-D`) đã gộp 2 câu hỏi
KHÁC NHAU (Alert Style vs Dialog footer button) mà không tách rõ, khiến câu
trả lời đầu tiên của Williams trông như trả lời nhầm câu. Từ giờ khi 2 câu
hỏi có thể dễ nhầm lẫn (cùng nói "Fill/Outline"), nên hỏi tách riêng từng
component thay vì gộp chung 1 batch.

**⚠️ Việc còn mở**: Node-id thật của Dialog (generic), recipe "form" của
Dialog, "Alert button container (Base)" — vẫn chưa có câu trả lời mới.

---

## 12/09-F — Nghiên cứu Dialog generic thật trong Figma; đề xuất anatomy + recipe

**by**: Claude (đọc trực tiếp Figma theo yêu cầu Williams) — CHỜ Williams duyệt
**affects**: `rules/kinds/overlay.rules.yaml` (§ anatomy MỚI, § content_pattern.known_recipes.form), `rules/components/alert.rules.yaml` (§ _pending_confirmation, mục button_container)

Williams gửi link kèm node-id thật cho Dialog generic (957:16562, trang
"Documentation") kèm yêu cầu: *"Đây là dialog generic - tuy nhiên mỗi dialog
đều có cấu tạo khác nhau mày cần phải nghiên cứu kĩ và đề xuất cho tao"*.
Claude đọc trực tiếp bảng anatomy chính thức của GHN DS:

- **Header** (4 phần, [FIGMA] độ tin cậy cao): Left icon (show icon), Header
  (show tiêu đề), Content (show mô tả), Right icon (Trigger — nút đóng X).
- **Footer** (2 phần, [FIGMA]): Secondary CTA (Trigger), Primary CTA
  (Trigger) — khớp đúng với OVL-B-03/OVL-INV-02 đã xác nhận trước đó
  (Outline ↔ Secondary, Fill ↔ Primary).
- **Body**: docs không cho anatomy cố định (khớp draft gốc Williams 08/09:
  "Dialog không có fixed anatomy"), nhưng ví dụ chính thức "Edit profile"
  (node 957:16612, có bản Light/Dark) cho thấy body CÓ THỂ chứa Input
  organism thật (2 field "Email") — **ĐỀ XUẤT** nâng recipe `form` từ "chưa có
  bằng chứng" lên "có ví dụ Figma thật", nhưng CHƯA coi là xác nhận, chờ
  Williams duyệt lại (đây là ví dụ docs, chưa chắc là cách dùng thật trong
  sản phẩm GHN).
- **Artifact chưa rõ**: ví dụ "Edit profile" có 1 dòng chữ đỏ gạch ngang
  "EXCLAMATION"/"TRIANGLE-EXCLAMATION" — nhìn giống icon bị vỡ tham chiếu,
  KHÔNG rõ có đại diện 1 pattern cảnh báo lỗi input thật hay không. Hỏi lại
  Williams, chưa tự kết luận.

**"Alert button container (Base)" — đã xem ảnh thật (node 773:7518)**: là 1
hàng 2 nút Outline + Fill, giống hệt khối footer Dialog — gợi ý đây là atom
dùng chung/demo, không phải cấu trúc riêng của Alert. Câu hỏi "Alert có use
case thật nào cần nút không" VẪN CÒN MỞ — ảnh chỉ xác nhận HÌNH DÁNG atom,
không xác nhận có dùng thật hay không.

**Lưu ý phương pháp**: Do sandbox Claude không tải được ảnh Figma qua curl
(egress bị chặn), Claude mô tả lại nội dung ảnh bằng chữ thay vì gửi file ảnh
trực tiếp cho Williams — nếu cần xem tận mắt, Williams tự mở link Figma
(node-id đã ghi rõ trong từng mục trên).

**⚠️ Việc còn mở**: Williams duyệt lại toàn bộ đề xuất anatomy + recipe form ở
trên; xác nhận artifact "EXCLAMATION"; xác nhận use case thật của Alert
button container.

---

## 12/09-G — Williams duyệt đề xuất Dialog anatomy: Footer Grey mặc định, Body = dynamic slot, validation ở Input

**by**: Williams (xác nhận qua chat)
**affects**: `rules/kinds/overlay.rules.yaml` (§ anatomy, § content_pattern)

Williams duyệt cả 3 điểm đề xuất ở `12/09-F`, với 1 điều chỉnh quan trọng:

1. **Footer 2-nút mặc định KHÔNG phải Secondary=Outline như bảng docs vẽ, mà
   là Secondary=Grey.** Quote: *"Phần này nút secondary CTA chuyển thành nút
   grey cho đồng bộ với alert dialog"* — khớp đúng OVL-INV-02 đã có (footer 2
   nút → auto-downgrade Outline thành Grey). Bảng docs gốc chỉ vẽ atom demo,
   không phải giá trị mặc định thật.

2. **Body là dynamic SLOT, không phải anatomy cố định** — xác nhận rõ hơn
   draft gốc 08/09 ("Dialog không có fixed anatomy"). Quote: *"Mày có thể tạo
   một phần slot cho body để customize có thể layout các component vào ô slot
   này để hình thành một nội dung hoàn chỉnh. Đối với component gì để ghép
   vào dynamic slot này cần define từ PRD hoặc designer quyết định."* → recipe
   (`confirmation`, `form`) là catalogue THAM KHẢO, không phải danh sách đóng;
   PRD/designer có quyền lấp slot bằng tổ hợp khác, agent không tự suy luận
   thay.

3. **Validation lỗi input KHÔNG phải rule riêng của Dialog.** Quote: *"Đúng
   đây là icon bị vỡ tham chiếu và đó là pattern cảnh báo lỗi input. Tuy
   nhiên tao không làm theo kiểu này vì mỗi input đều có 1 dạng [Destructive =
   on] thì sẽ hiện báo lỗi nên nếu user nhập sai input nào thì destructive bật
   lên và ghi nội dung báo lỗi bên dưới chính input đó"* — validation là STATE
   của chính Input organism (Destructive=on → Helper message/icon, đã có sẵn
   trong anatomy Input phần 7/8), không phải pattern mới ở cấp Dialog.

Recipe `form` chuyển từ ĐỀ XUẤT sang XÁC NHẬN thật. `overlay.rules.yaml`
status tổng thể chuyển từ "[ĐỀ XUẤT]" sang "[XÁC NHẬN]" cho phần anatomy.

**⚠️ Việc còn mở**: use case thật của "Alert button container (Base)" (Alert
có cần nút thật không) — vẫn chưa có câu trả lời mới.

---

## 12/09-H — Sửa lỗi mô hình: "Grey" là Type (màu), không phải 1 emphasis riêng

**by**: Williams (sửa lỗi qua chat)
**affects**: `rules/kinds/overlay.rules.yaml` (§ OVL-B-03, § OVL-INV-02, § anatomy.footer)

Williams sửa lại `12/09-G`: *"không phải secondary grey mà nó là grey/
outline"*. Claude đã mô hình sai: viết "Grey" như 1 mức emphasis thứ 3 độc
lập, ngang hàng Fill/Outline trong 1 thang 3 bậc. Nhưng theo đúng model Button
đã có sẵn (`profile.ghn/ds/button.binding.yaml`): DS tách 2 property độc lập
— **Type** (màu/intent: Primary/Secondary/Destructive/Grey...) và **Style**
(emphasis×shape: Fill/Outline/Ghost × Round/Circle). "Grey" LUÔN là giá trị
Type (intent = no_path), và theo quy ước đã xác nhận trước đó (Williams 09/09:
*"nút icon grey button có viền"*), nút Grey luôn đi kèm emphasis Outline —
không bao giờ đứng một mình như 1 emphasis riêng.

**Sửa lại đúng**: Footer Dialog 2 nút → Secondary CTA đổi INTENT thành
no_path (Type=Grey), emphasis GIỮ NGUYÊN Outline — không đổi mức nhấn, chỉ
đổi màu. Đã sửa `OVL-B-03`, `OVL-INV-02`, và `anatomy.footer` cho khớp.

---

## 12/09-I — RÚT LẠI rule auto-downgrade Grey cho footer 2 nút (bằng chứng thật mâu thuẫn)

**by**: Williams (gửi bằng chứng thật + quyết định qua chat)
**affects**: `rules/kinds/overlay.rules.yaml` (§ OVL-B-03 sửa lại, § OVL-INV-02 RÚT LẠI, § anatomy.footer sửa lại, § content_pattern.known_recipes.form sửa lại)

Ngay sau khi `12/09-H` sửa xong cách GỌI TÊN rule Grey/Outline, Williams gửi
ảnh thật 1 màn hình "Chưa lưu thay đổi": footer 2 nút — "Huỷ lưu" (Outline,
**MÀU CAM**, không phải Grey) + "Tiếp tục chỉnh sửa" (Fill cam) — và nói:
*"Thôi cho tao sửa lại rule dùng đúng system đưa ra đi"*. Ảnh này MÂU THUẪN
trực tiếp với `OVL-INV-02` (đã xác nhận 2 lần trước đó: footer 2 nút → auto
chuyển Secondary sang Grey).

Được hỏi lại nên sửa theo hướng nào (Grey chỉ áp AlertDialog / bỏ hẳn rule /
đây là ngoại lệ riêng), Williams chọn: **bỏ hẳn rule auto-downgrade Grey**.

**Kết quả áp dụng**:
- `OVL-INV-02` — đánh dấu RÚT LẠI (không xoá, giữ nguyên bản gốc + lý do rút
  lại, đúng nguyên tắc provenance của dự án).
- `OVL-B-03` — sửa lại: Outline (màu bình thường) là mức mặc định cho Secondary
  CTA ở CẢ footer 2 nút LẪN bậc giữa của footer 3 nút. Grey (intent no_path,
  vẫn kèm emphasis Outline) CHỈ còn áp dụng cho bậc THẤP NHẤT của footer 3 nút
  — không còn áp dụng cho trường hợp 2 nút.
- `anatomy.footer.default_2_button_style` và recipe `form` (ví dụ Edit
  profile) — sửa lại khớp: Secondary=Outline màu, không phải Grey.

**Bài học ghi nhận**: 1 rule được Williams xác nhận bằng lời tới 2 lần vẫn có
thể bị bằng chứng ảnh thật sau đó phủ quyết — ưu tiên bằng chứng cụ thể
(screenshot màn hình thật) hơn mô tả bằng lời khi có mâu thuẫn, và LUÔN hỏi
lại rõ ràng thay vì tự chọn hướng sửa khi 2 nguồn xung đột.

---

## 12/09-J — Ảnh atom docs gốc của Footer (Grey/Fill) là ví dụ CŨ; thống nhất 1 rule cho MỌI Dialog theo AlertDialog

**by**: Williams (gửi ảnh thật + quyết định qua chat, sau 2 vòng `AskUserQuestion` để làm rõ)
**affects**: `rules/kinds/overlay.rules.yaml` (§ anatomy.footer.note, § anatomy.footer.outdated_docs_example MỚI)

Ngay sau `12/09-I` (rút rule auto-downgrade Grey), Williams gửi tiếp một correction
nữa, ban đầu khó xác định phạm vi — tự sửa lại chính lời mình giữa chừng
("nút secondary/outline" → "nút primary/outline"). Mất 2 vòng `AskUserQuestion`
mới xác định đúng ý, cả 2 lần Williams đều trả lời bằng free-text (chọn
"Khác") thay vì chọn option Claude đưa ra. Câu trả lời làm rõ cuối cùng:

**Quote (làm rõ cuối cùng)**: *"Đây là hình ảnh của dialog generic trong design
system nè. Footer button đang được định dạng khác so với dạng button của
alert dialog. Tao muốn đồng bộ cái này giống rule của alert dialog cho
consistency"*

**Cách hiểu đã áp dụng**: Williams đang nói về chính ảnh atom docs GỐC (node
957:16887/957:16900, đã đọc ở `12/09-F`) — ảnh đó vẽ Secondary CTA bằng
**Grey/Fill** (nền xám nhạt, KHÔNG viền), khác hẳn quy ước AlertDialog thật đã
xác nhận bằng ảnh "Chưa lưu thay đổi" ở `12/09-I` (Outline, MÀU cam). Williams
muốn ảnh atom docs gốc này được coi là **ví dụ CŨ/lỗi thời**, không dùng làm
chuẩn, và **THỐNG NHẤT chỉ 1 rule cho MỌI Dialog** (kể cả AlertDialog) theo
đúng quy ước đã chốt ở `default_2_button_style` (`12/09-I`) — không tồn tại 2
quy ước riêng biệt cho "Dialog thường" và "AlertDialog".

**Đã áp dụng vào file**: `anatomy.footer.note` cập nhật thêm cảnh báo về ảnh
atom docs gốc; thêm trường mới `anatomy.footer.outdated_docs_example` ghi lại
đầy đủ quote + cách hiểu ở trên. KHÔNG có invariant/behavioural_limit nào bị
đổi nội dung — `OVL-B-03` và `default_2_button_style` (đã chốt ở `12/09-I`)
vẫn giữ nguyên, vì bản thân 2 mục đó ĐÃ thống nhất theo đúng quy ước
AlertDialog rồi. Thay đổi ở đây chỉ là: đánh dấu rõ ảnh atom docs gốc không
còn là nguồn tham chiếu, để tránh agent sau này đọc nhầm ảnh đó thành quy ước
đang dùng.

**⚠️ Chưa re-confirm với Williams**: đây là lần sửa thứ 4 liên tiếp về cùng 1
chủ đề (footer button styling), và cách hiểu ở trên rút ra từ 1 câu trả lời
free-text sau 2 vòng hỏi không trúng — CẦN gửi lại tóm tắt cho Williams xác
nhận rõ ràng "đúng ý chưa" trước khi coi đây là chốt cuối cùng, thay vì tự tin
xác nhận `[XÁC NHẬN]` như các mục trước.

---

## 12/09-K — "Alert button container (Base)" có use case thật: dùng chung quy ước 2-nút với Dialog footer

**by**: Williams (xác nhận qua chat)
**affects**: `profile.ghn/ds/alert.binding.yaml` (§ sub_parts.button_container, § _pending_confirmation), `rules/components/alert.rules.yaml` (§ content_pattern, thêm recipe MỚI `action_row`; § _pending_confirmation; § meta.status)

Câu hỏi mở lâu nhất của Alert (treo từ `12/09-C`, nhắc lại nhiều vòng): atom
"Alert button container (Base)" (node 773:7518, 1 hàng 2 nút Outline+Fill) có
use case thật nào không, hay chỉ là atom để dành trong thư viện, chưa từng
dùng? Williams đưa link node, Williams trả lời gọn:

**Quote**: *"Thì đó giống với nút tao define cho alert xuyên suốt mà chỉ
không dùng khi có case 3 nút"*

**Quyết định**: CÓ use case thật. Alert dùng hàng 2 nút này XUYÊN SUỐT (nhất
quán) — Secondary (Outline, màu bình thường) + Primary (Fill) — đúng CÙNG 1
quy ước với footer 2-nút mặc định của Dialog (`OVL-B-03` /
`anatomy.footer.default_2_button_style`, đã chốt ở `12/09-I`/`12/09-J`). Ghi
thành recipe mới `action_row` ở `alert.rules.yaml § content_pattern`, đóng
luôn mục `_pending_confirmation` cuối cùng còn treo của Alert.

**Còn mở**: trường hợp Alert cần 3 nút — atom `action_row` KHÔNG áp dụng, và
CHƯA có quy ước riêng nào được xác nhận cho case đó. KHÔNG tự suy ra theo mẫu
3-nút của Dialog (Fill/Outline/Grey-Outline) cho Alert — để dành hỏi Williams
khi có màn hình thật cần tới.

**Ghi chú kiến trúc**: đây là ví dụ thứ 2 (sau Dialog↔AlertDialog ở `12/09-J`)
về 1 quy ước visual (2-nút Outline+Fill) được TÁI SỬ DỤNG nguyên vẹn giữa 2
component khác kind (`overlay` và `feedback_transient`) — củng cố thêm lý do
nên cân nhắc rút quy ước "2-nút mặc định = Secondary Outline + Primary Fill"
lên thành 1 rule dùng chung (vd `_composition.rules.yaml` hoặc 1 kind mới) nếu
sau này còn gặp thêm component thứ 3 lặp lại đúng mẫu này — hiện tại (2 lần)
CHƯA đủ ngưỡng để tách (xem 08/09-D § "5 lằn ranh chống lạm dụng", mục 1: cần
>= 3 thành viên thật).

---

## 12/09-L — Sửa lỗi vocab: nút Outline trong footer 2-nút là Type=Primary, không phải Type=Secondary

**by**: Williams (phát hiện qua chat) + Claude (verify trực tiếp bằng Figma metadata/screenshot)
**affects**: `rules/kinds/overlay.rules.yaml` (§ OVL-B-03, § anatomy.footer — thêm `naming_trap`, sửa `note`/`default_2_button_style`/`outdated_docs_example`, § content_pattern.known_recipes.form), `rules/components/alert.rules.yaml` (§ content_pattern.known_recipes.action_row), `profile.ghn/ds/alert.binding.yaml` (§ sub_parts.button_container.note)

Ngay sau `12/09-K`, Williams hỏi lại: *"Mày gọi nút đó là secondary (outline)
do mày đang quy ước hay như thế nào? vì tao check định dạng nút đó là primary
(outline) mà. Secondary (outline) là nút màu xanh"*.

**Truy nguồn gốc lỗi (Claude tự nhận, không đổ cho Figma)**: Bảng anatomy
Footer của Dialog trong docs Figma đặt tên 2 vị trí là "Secondary CTA"/
"Primary CTA" — đây LÀ tên thật từ Figma, nhưng chỉ là tên VỊ TRÍ (layout).
Claude đã tự suy nhãn vị trí này sang Type=Secondary của Button mà KHÔNG mở
property Type thật lên kiểm — đúng dạng lỗi đã gặp ở `12/09-H` (Grey-as-
emphasis): lấy nhãn Figma rồi tự map sang giá trị DS mà không verify.

**Verify trực tiếp (không hỏi thêm Williams, tự kiểm bằng Figma MCP)**:
- Screenshot thật node `773:7518` (Alert button container): cả 2 nút đều màu
  **CAM** — 1 Outline viền cam + 1 Fill đặc cam. Không có nút xanh nào.
- Screenshot node `966:17457` ("Edit profile", ví dụ Dialog cho recipe
  `form`): nút vị trí "Secondary CTA" ở ĐÂY lại vẽ Grey/Fill (xám nhạt,
  không viền) — xác nhận thêm đây đúng là ví dụ CŨ (đã đánh dấu
  `outdated_docs_example` từ `12/09-J`), không dùng để xác định Type được.
- Bằng chứng "Chưa lưu thay đổi" (từ `12/09-I`, Williams gửi): Outline cam +
  Fill cam — cùng tông màu cam, khớp Type=Primary cho cả 2 nút.

**Quyết định**: Trong pattern 2-nút (Dialog footer VÀ Alert action_row), CẢ
2 nút đều Type=Primary — chỉ khác Style/emphasis (Outline vs Fill). Tên vị
trí "Secondary CTA"/"Primary CTA" GIỮ NGUYÊN (đúng tên Figma), nhưng KHÔNG
còn map sang Type=Secondary — Type=Secondary (màu xanh) không dùng trong
pattern này. Áp dụng sửa cho CẢ Dialog lẫn Alert vì cả 2 dùng chung 1 quy ước
(đã chốt ở `12/09-J`/`12/09-K`).

**Bài học ghi nhận (lặp lại lần 2 trong cùng khu vực)**: nhãn vị trí/layout
trong bảng anatomy Figma (vd "Secondary CTA") và giá trị Type/Style thật của
component (Primary/Secondary/Grey × Fill/Outline/Ghost) là 2 tầng THÔNG TIN
KHÁC NHAU — không được tự động map 1-1 mà không verify property thật. Đã xảy
ra 2 lần ở đúng khu vực Dialog footer/Alert (Grey-as-emphasis ở `12/09-H`,
Secondary-vs-Primary ở đây) — cần chủ động kiểm bằng screenshot/metadata
TRƯỚC khi viết rule liên quan tới tên Type, không chỉ dựa vào tên nhãn anatomy.

---

## 12/09-M — Alert 3-nút: đưa vào backlog, chờ use case cụ thể

**by**: Williams (xác nhận qua chat)
**affects**: `rules/components/alert.rules.yaml` (§ content_pattern.known_recipes.action_row.not_applicable_when, § _pending_confirmation)

Trả lời câu hỏi còn mở cuối cùng của round `12/09-L` (Alert cần 3 nút xử lý
thế nào — atom `action_row` chỉ định nghĩa cho 2 nút). Williams:

**Quote**: *"Hiện tại tao chưa define trường hợp đó nhưng sẽ có usecase 1
dialog cần xử lý maximum 3 thao tác khác nhau nên đặt nó vào backlog đến khi
có usecase cụ thể"*

**Quyết định**: CHỦ ĐỘNG hoãn — không phải bỏ quên. Xác nhận: sẽ có use case
thật cần tới (tối đa 3 thao tác khác nhau trên 1 overlay), nhưng CHƯA định
nghĩa chi tiết quy ước 3-nút riêng cho Alert tới khi có 1 màn hình/PRD cụ thể
cần dùng. Đưa vào backlog theo đúng khuôn đã dùng cho các mục backlog khác
của dự án (7 Type Toast desktop, `dense_table_below_breakpoint`...) — không
tự suy ra theo mẫu 3-nút đã có của Dialog (`OVL-B-03`: Fill/Outline/
Grey-Outline) cho Alert khi chưa có xác nhận riêng.

**Ghi chú**: đây là lần thứ 2 Williams nhắc tới "tối đa 3 thao tác" trong bối
cảnh 1 overlay/dialog (Dialog footer 3-nút cũng dừng ở 3) — có thể là 1 ngưỡng
nghiệp vụ chung ("không quá 3 hành động trong 1 khối quyết định"), tương tự
ngưỡng đã có ở Button cho hành động dòng bảng (`policy.row_action_inline_max`
= 3, xem decisions.md mục 07/09). CHƯA đủ bằng chứng để khái quát hoá thành 1
rule dùng chung — chỉ ghi nhận làm quan sát, không tự áp dụng.

---

## 12/09-N — form_input kind: luật icon trái/phải cho Input, phát sinh từ phiên kiểm chứng UI render thật

**by**: Williams (sửa lỗi + xác nhận qua chat, sau khi Claude render thử Dialog/form dùng Input organism thật vào Figma)
**affects**: `manifest.yaml` (§ component_kinds.form_input — status đổi từ "CHƯA VIẾT"), `rules/kinds/form_input.rules.yaml` (MỚI — FRMIN-B-01, FRMIN-B-02)

**Bối cảnh**: Trong phiên kiểm chứng UI (Williams yêu cầu render 1 demo Table+
Button/Dialog+form/Toast trực tiếp vào Figma để đánh giá mức độ tuân thủ rule
đã có), Claude dựng 2 field Input ("Số tiền"/"Diễn giải") nhưng giữ nguyên icon
leftover từ ví dụ gốc "Edit profile" (icon phong bì + chevron) — không khớp
ngữ cảnh field thật. Phản hồi đầu tiên của Williams: *"Tao thấy mày xử lý chưa
tốt phần icon nhỉ"*.

**Correction quan trọng**: phản ứng đầu tiên của Claude là ẨN 2 icon sai đó.
Williams sửa ngay: *"Không phải tao kêu mày ẩn nhưng mà mày đã có npm của FA6
rồi mày không thể dự đoán được context với icon như thế nào để matching sao?"*
— nghĩa là hướng đúng là TRA CỨU + THAY icon context-matched bằng catalog FA6
đã cài (không phải xoá/ẩn). Claude sửa lại bằng cách tra `icon-families.json`
(gói `@fortawesome/fontawesome-free` đã cài từ trước) và áp `money-bill` (Số
tiền) / `align-left` (Diễn giải) — khớp đúng yêu cầu.

**Rule mới Williams dictate ngay sau đó**:

**Quote**: *"Đối với icon cho vùng input quy luật (thêm diễn giải ý nghĩa bên
trái / đối với icon bên phải chỉ có thể là clear khi ở trạng thái pressed hoặc
chevron-down nếu nó là dropdown đang đóng, chevron-up nếu nó là dropdown đang
mở) hiểu chưa"* — xác nhận hiểu đúng qua `AskUserQuestion`: **"Đúng"**.

Hỏi thêm để làm rõ ánh xạ "trạng thái pressed" sang State thật của Input
component (Default/Filled/Focused/Disabled) — Williams chọn: **"Filled"**
(không phải Focused) — nghĩa là icon "clear" hiện khi field ĐANG CÓ GIÁ TRỊ,
không cần đang thao tác trực tiếp.

**Quyết định — 2 behavioural_limit mới, ghi ở `rules/kinds/form_input.rules.yaml`**:
- `FRMIN-B-01` — Icon TRÁI luôn mang nghĩa ngữ cảnh nghiệp vụ của field cụ thể
  (không phải icon trang trí cố định, không phải leftover từ ví dụ khác). Kỷ
  luật tra cứu icon mới giống hệt Button (decisions.md 07/09 § "Tìm ra trang
  Icons thật") — dùng FA6 catalog thật, không đoán tên từ trí nhớ, icon MỚI vẫn
  cần người xác nhận qua plugin FA6 Pro.
- `FRMIN-B-02` — Icon PHẢI CHỈ 1 trong 3 giá trị loại trừ lẫn nhau: "clear"
  (State=Filled) / "chevron-down" (dropdown đóng) / "chevron-up" (dropdown mở)
  — ngoài 3 case này thì KHÔNG icon phải.

**Còn mở, CHƯA hỏi Williams (ghi trong `_pending_confirmation` của file mới,
không tự suy đoán)**:
- Icon phải ở State=Default (chưa nhập, không phải dropdown) — suy luận hợp lý
  theo FRMIN-B-02 là "không icon", nhưng chưa xác nhận tường minh.
- Icon phải ở State=Disabled — chưa hỏi.
- Field vừa là dropdown vừa Filled (có giá trị đã chọn) — ưu tiên chevron hay
  clear khi 2 điều kiện cùng đúng — chưa rõ thứ tự ưu tiên, chưa hỏi.

**Ghi chú kiến trúc**: đây là rule ĐẦU TIÊN của kind `form_input` (trước đó
`manifest.yaml § component_kinds.form_input.status` ghi "CHƯA VIẾT") — kind
này hiện có 0 `members_active` (Input chưa đăng ký thành `components:` chính
thức, chỉ nằm trong `members_planned`) — việc có nên đăng ký `Input` thành
component đầy đủ (binding riêng, axes riêng) hay chưa vẫn là câu hỏi kiến trúc
mở, chưa hỏi Williams.

---

## 12/09-O — Input đăng ký thành `components:` chính thức

**by**: Claude đề xuất qua `AskUserQuestion` (2 lựa chọn), Williams chọn
**affects**: `manifest.yaml` (§ component_kinds.form_input.members_active,
§ components.Input MỚI), `rules/components/input.rules.yaml` (MỚI, gần rỗng
— cùng khuôn `button.rules.yaml`), `profile.ghn/ds/input.binding.yaml` (MỚI)

**Bối cảnh**: Ngay sau `12/09-N`, Claude nêu câu hỏi kiến trúc còn mở (Input
có nên đăng ký `components:` đầy đủ hay để nguyên `members_planned`) và đề
xuất cụ thể: đăng ký ngay, vì đã có dữ liệu Figma thật verify được trong chính
session này (không phải suy đoán) — cùng tier bằng chứng đã dùng để đăng ký
Button/Toast/Alert.

**Williams**: chọn "Đăng ký ngay (Recommended)".

**Xác minh lại dữ liệu trước khi ghi binding** (Claude tự kiểm, không dùng lại
số liệu nhớ từ trước khi bị mất context): gọi `search_design_system` xác nhận
`componentKey 9c400e1d93884025583c2cf3bbcaea263301cde1` ("Input / Input
organism") thật, thuộc library "GHN DS" — khớp đúng dữ liệu phiên trước. Sau
đó chạy `figma.importComponentSetByKeyAsync(componentKey)` qua `use_figma` để
đọc trực tiếp `variantGroupProperties` (Size: sm/md/lg — Type: Default/Combo/
Leading dropdown/Trailing dropdown/w Chips — Destructive: True/False — State:
Default/Filled/Focused/Disabled) và `componentPropertyDefinitions` boolean
(Label#40:0, error message#67:0, Condition#725:86) — khớp 100% với dữ liệu đã
ghi trong summary phiên trước, xác nhận không có sai lệch do trí nhớ.

**Giới hạn ghi nhận thật (không che giấu)**: `component_set_id` ghi trong
`input.binding.yaml` (`49:2577`) là id QUAN SÁT ĐƯỢC qua import trong file
TEST (`uFbbdvWYC1dg3AjdnHCgxk`), KHÁC với cách Button/Alert lấy id (đọc trực
tiếp trong 1 file docs GHN DS thật, node-id ổn định) — vì `get_metadata` thử
trên node "46:6228" (id ghi trong summary phiên trước) trả về "not found"
trong file `zECOR8UK45lmZcpMG9aOR7`, nghĩa là số đó không dùng lại được / hoặc
thuộc ngữ cảnh khác. Đã ghi rõ giới hạn này trong `input.binding.yaml §
component.note` và `_pending_confirmation`, KHÔNG che giấu bằng cách xoá field
hay giả vờ chắc chắn.

**Kết quả áp dụng**:
- `manifest.yaml § component_kinds.form_input.members_active`: `[]` → `[Input]`
- `manifest.yaml § components.Input` (MỚI): kinds `[form_input]`, rules/binding
  path, axes (size/type/destructive/state/icon)
- `rules/components/input.rules.yaml` (MỚI): gần rỗng, chỉ `rules_live_at` trỏ
  về `kinds/form_input.rules.yaml` (FRMIN-B-01/02) — đúng khuôn
  `button.rules.yaml`, không nhân bản luật
- `profile.ghn/ds/input.binding.yaml` (MỚI): ghi đầy đủ property thật (Size/
  Type/Destructive/State + 3 boolean), đánh dấu rõ những gì CHƯA xác nhận
  (ý nghĩa nghiệp vụ của Type, size px thật, boolean `Condition`, ưu tiên
  chevron/clear khi vừa dropdown vừa Filled) trong `_pending_confirmation` —
  KHÔNG tự suy đoán để lấp cho đầy

**Còn mở, chưa tự trả lời**: xem `input.binding.yaml § _pending_confirmation`
— 6 mục, trong đó đáng chú ý nhất là liệu 2 giá trị Type ("Leading dropdown"/
"Trailing dropdown") có chính là điều kiện "field là dropdown" mà FRMIN-B-02
nhắc tới hay không — CHƯA hỏi Williams, không tự map.

---

## 12/09-P — Tự audit lại demo Figma theo FRMIN-B-01/02: phát hiện 1 claim SAI của chính Claude, đã sửa

**by**: Claude (tự phát hiện qua kiểm tra trực tiếp componentProperties bằng use_figma, không phải Williams báo)
**affects**: file test Figma (`uFbbdvWYC1dg3AjdnHCgxk`, node `51:211`/`51:212` — 2 Input field "Số tiền"/"Diễn giải" trong Dialog demo), `rules/kinds/form_input.rules.yaml` (§ FRMIN-B-02, sửa `verified_against_render`, thêm `icon_literal_mapping`)

**Bối cảnh**: Sau khi đăng ký Input thành component (`12/09-O`), Claude quay
lại làm việc #2 Williams đã đồng ý ("Okay") — kiểm chứng lại demo Figma theo
rubric 5 tiêu chí. Trong lúc soát lại, Claude tự đối chiếu `form_input.rules.
yaml § FRMIN-B-02.verified_against_render` (claim viết lúc trước: "áp thử 2
field demo Số tiền/Diễn giải... khớp đúng rule: hiện clear (X), ẩn chevron")
với ẢNH THẬT của chính 2 field đó ngay lúc này — và với đọc trực tiếp
`componentProperties` qua `use_figma` — thay vì tin lại claim cũ.

**Phát hiện**: Claim cũ SAI. 2 field "Số tiền"/"Diễn giải" đang hiện icon
"money-bill"/"align-left" ở PHÍA PHẢI (không phải icon "clear" như claim viết)
— vì icon ngữ cảnh đó bị gán NHẦM vào slot `iconClear#489:0` (slot riêng, đặt
tên đúng cho icon "clear", theo cấu trúc thật của nested component "Input /
Input filed type (Base)": 3 boolean độc lập `iconLeft#705:0` / `iconRight#
158:149` / `iconClear#489:0`), trong khi slot `iconLeft#705:0` (đúng chỗ cho
icon mang nghĩa ngữ cảnh) đang TẮT. Vi phạm trực tiếp CẢ HAI rule vừa chốt
(`12/09-N`): FRMIN-B-01 (chưa có icon trái mang nghĩa) và FRMIN-B-02 (icon
phải không phải giá trị hợp lệ nào trong 3 case).

**Nguồn gốc lỗi**: Khi sửa icon lúc trước (đợt Williams yêu cầu tra FA6 thay
vì ẩn icon), Claude tìm đúng glyph ngữ cảnh (money-bill/align-left) nhưng gán
nó vào slot ĐANG BẬT SẴN (`iconClear`, vì lúc đó đây là slot duy nhất hiển thị
trên field) thay vì bật slot đúng vai trò (`iconLeft`) — tức là sửa ĐÚNG GLYPH
nhưng SAI SLOT. Rồi khi viết `form_input.rules.yaml` (sau khi rule FRMIN-B-02
mới được chốt), Claude ghi "verified_against_render" mà KHÔNG thật sự mở lại
Figma đối chiếu — lặp đúng loại lỗi mà nguyên tắc dự án cấm ("luôn verify bằng
chứng thật, không suy đoán/tự tin ghi đã xác nhận").

**Đã sửa (Figma + rule file)**:
- Node `51:211` ("Số tiền"): bật `iconLeft#705:0`, gán glyph `money-bill`; sửa
  `iconClear#489:0` từ glyph `money-bill` (sai) → `xmark`; `iconRight#158:149`
  giữ tắt (không phải dropdown).
- Node `51:212` ("Diễn giải"): bật `iconLeft#705:0`, gán glyph `align-left`;
  sửa `iconClear#489:0` từ `align-left` (sai) → `xmark`; `iconRight` giữ tắt.
- Ảnh chụp lại sau sửa: cả 2 field đều đúng — icon trái mang nghĩa ngữ cảnh,
  icon phải là dấu X (clear), đúng State=Filled.
- `form_input.rules.yaml § FRMIN-B-02`: xoá claim sai, ghi lại đúng sự thật +
  cách sửa; thêm mục mới `icon_literal_mapping` — "clear" là tên VAI, ligature
  FA6 thật dùng là `xmark` (đối chiếu `icon-families.json`, cùng phương pháp
  06/09-A dùng cho "Bộ lọc"→`filter`) — **[cần verify — chưa qua plugin FA6
  Pro]**, chưa coi là chuẩn cuối cùng.

**Ý nghĩa với rubric đánh giá (tiêu chí "Regression check")**: đây đúng là ví
dụ thật của tiêu chí #5 trong rubric Claude đề xuất trước đó ("không âm thầm
phục hồi lỗi đã sửa, không tự tin ghi đã xác nhận mà chưa đối chiếu lại") —
khác với các lần trước lỗi do WILLIAMS phát hiện, lần này Claude tự bắt lỗi
của chính mình trong lúc audit, đúng vai trò mà việc "kiểm chứng UI" ban đầu
Williams yêu cầu hướng tới.

---

## 12/09-Q — Icon trái header Dialog vẫn là leftover "Edit profile", đổi sang icon khớp ngữ cảnh (ĐỀ XUẤT, chưa Williams xác nhận)

**by**: Claude (tự phát hiện tiếp trong cùng đợt audit `12/09-P`) — **[ĐỀ XUẤT — CHƯA Williams xác nhận]**
**affects**: file test Figma (node `51:209`, Dialog header của Card B)

**Phát hiện**: Icon TRÁI của Dialog header (Card B "Thêm phiếu chi phí") vẫn
là glyph mặc định để lại từ ví dụ gốc "Edit profile" — do dùng font "Font
Awesome 6 Pro" (không có trên máy chủ render) nên hiện ra thành 1 glyph fallback
trông như icon mặt cười, không phải icon nào có chủ đích. Đây là icon LEFTOVER
chưa từng được thay, cùng loại lỗi Williams đã sửa cho 2 field Input trước đó
("không dự đoán context với icon").

**Đã sửa (tạm, chưa xác nhận)**: đổi thành `receipt` (đối chiếu có thật trong
`icon-families.json` gói FA6 Free) — khớp ngữ cảnh "phiếu chi phí". Chưa có
rule chính thức nào ở cấp Dialog/overlay quy định icon header chọn theo gì —
đây chỉ là áp dụng lại tinh thần chung "tra FA6 theo ngữ cảnh, không để
leftover demo" đã có ở Button (07/09) và Input (12/09-N), KHÔNG phải 1 rule
mới được xác nhận.

**Cần Williams xác nhận**: `receipt` có đúng ý muốn không, hay icon khác hợp
hơn (vd `file-invoice-dollar`, `circle-plus`). Nếu xác nhận, cân nhắc có nên
viết thành 1 rule chính thức ở `rules/kinds/overlay.rules.yaml` (icon header
Dialog luôn phải khớp ngữ cảnh, không giữ leftover từ ví dụ docs) hay để mỗi
lần escalate riêng — CHƯA tự quyết định phạm vi rule ở đây.

**[ĐÃ ĐÓNG — 13/09]**: Williams xác nhận dùng `receipt`. Đây là lựa chọn NỘI
DUNG cho riêng ví dụ "Thêm phiếu chi phí" (icon đại diện đối tượng nghiệp vụ
cụ thể, giống cách chọn icon trái cho từng field Input ở FRMIN-B-01) — KHÔNG
khái quát hoá thành 1 rule chung cho mọi Dialog (mỗi Dialog khác sẽ cần icon
khác theo đúng nội dung của nó, escalate từng lần khi gặp, không đoán trước).
`receipt` VẪN cần qua bước xác nhận FA6 Pro (step_2_human_confirm) trước khi
coi là chuẩn cuối cùng — xem mục icon verification bên dưới.

---

## 12/09-R — Dialog đăng ký thành `components:` chính thức; xác nhận lại quirk Button cũ trong bản mặc định

**by**: Williams ("Vậy mày đăng kí cho dialog luôn đi check xem dialog có thiếu gì không")
**affects**: `manifest.yaml` (§ component_kinds.overlay.members_active, §
components.Dialog MỚI), `rules/components/dialog.rules.yaml` (MỚI, gần rỗng —
cùng khuôn button/input), `profile.ghn/ds/dialog.binding.yaml` (MỚI)

**Bối cảnh**: Sau round 12/09-O (đăng ký Input), Williams hỏi tổng quan còn
bao nhiêu component cần viết rule (và có tính color/typography/spacing
không). Claude trả lời: kiến trúc kind làm việc đăng ký thêm component RẺ
(không cần viết rule mới trừ khi hành vi mới), và chỉ ra Dialog là gap đáng
chú ý nhất — đã có rule đầy đủ ở `overlay.rules.yaml` (anatomy Header/Body
slot/Footer, recipe `form`, đã Williams duyệt từ 12/09-F/G/I/J/L), đã dùng
thật trong demo, nhưng CHƯA từng đăng ký `components:` — giống tình trạng cũ
của Input. Williams yêu cầu đăng ký ngay + kiểm tra thiếu gì.

**Verify lại dữ liệu Figma (không dùng lại số cũ từ trí nhớ)**: `search_design_
system` xác nhận `componentKey 8b04f4f411eda928c14075725b148bb6a9e5590b`
("Dialog / Dialog oragism") thật, khớp đúng dữ liệu đã ghi ở `12/09-F`.
`figma.importComponentByKeyAsync` (không phải ComponentSet — Dialog là 1
COMPONENT đơn, không có variant, chỉ có 5 boolean: Error message/Header/
Button container/Primary button/Secondary button) xác nhận đúng
`componentPropertyDefinitions`. Dump cây con xác nhận LẠI (re-verify, không
chỉ tin ghi chú cũ) phát hiện đã biết ở `12/09-J`: 2 nút Footer mặc định của
CHÍNH component gốc dùng bộ Button CŨ/legacy (`Stype=Round` — lỗi chính tả),
nút vị trí "Secondary CTA" mặc định là **Type=Grey** — khớp lại đúng bằng
chứng cũ, không lệch.

**3 điều "thiếu" tìm được, ghi vào `_pending_confirmation`, CHƯA tự trả lời**:
1. Khối "Error message" cấp DIALOG (khác hẳn per-field validation của Input,
   đã xác nhận ở `12/09-G`) — có công dụng thật nào không (vd banner lỗi
   submit/network, khác lỗi từng field), hay luôn luôn tắt? Williams mới xác
   nhận ví dụ docs cũ (icon vỡ) KHÔNG phải cách dùng thật CHO CASE ĐÓ cụ thể —
   chưa xác nhận liệu khối này có công dụng khác nào không.
2. Width/kích thước Dialog theo recipe/màn hình — 431px hiện chỉ là 1 điểm dữ
   liệu từ ví dụ mặc định, chưa đo thêm, chưa có mapping theo loại nội dung.
3. Quan hệ Dialog (desktop) ↔ BottomSheet (planned member khác, cùng kind
   overlay) trên mobile — có phải Dialog tự đổi thành BottomSheet dưới 1
   breakpoint nào không? Chưa khảo sát, chưa hỏi.

**Kết quả áp dụng**: `manifest.yaml § component_kinds.overlay.members_active`
`[]` → `[Dialog]`; `components.Dialog` (MỚI) đăng ký với `kinds: [overlay]`,
`axes: {content_pattern}`; `rules/components/dialog.rules.yaml` (MỚI, gần
rỗng, trỏ về `overlay.rules.yaml`); `profile.ghn/ds/dialog.binding.yaml`
(MỚI) ghi đầy đủ componentKey/sub_parts (header, error-message block, đều có
componentKey riêng)/quirk Button cũ (cảnh báo rõ: KHÔNG dùng bản mặc định của
component gốc làm chuẩn footer).

**Ghi chú**: AlertDialog VẪN CHƯA có binding riêng — đúng theo quyết định cũ
(`12/09-B`/overlay.rules.yaml): AlertDialog định nghĩa theo NGHIỆP VỤ, không
phải theo 1 component Figma khác, nên chưa cần node/binding riêng cho tới khi
có màn hình thật cần phân biệt.

---

## 13/09-A — Trả lời 3 câu hỏi mở của Dialog (12/09-R): submit-error banner, size responsive, quan hệ BottomSheet

**by**: Williams (xác nhận qua chat, sau khi được hỏi 3 câu ở round 12/09-R)
**affects**: `rules/kinds/overlay.rules.yaml` (§ content_pattern.known_recipes.
form.submit_error_pattern MỚI, § OVL-B-04 MỚI), `profile.ghn/ds/dialog.binding.
yaml` (§ sub_parts.error_message_block xác nhận, § size MỚI — ĐỀ XUẤT)

**1. Khối "Error message" cấp Dialog — XÁC NHẬN có công dụng thật.** Quote:
*"ĐÚNG mày chỉ ra được chỗ tao còn thiếu là có công dụng khi submit lỗi, lỗi
hệ thống mà không submit được chứ không phải lỗi từng input"* — dùng cho lỗi
SUBMIT/HỆ THỐNG (network, server), KHÁC HẲN validation từng field của Input
(Destructive=on, đã xác nhận từ 12/09-G). Ghi thành `submit_error_pattern` ở
recipe `form` (overlay.rules.yaml) + cập nhật status trong dialog.binding.yaml.

**2. Size responsive — height xác nhận ý tưởng, CHƯA chốt cách hiểu chính
xác; width là ĐỀ XUẤT của Claude, CHƯA xác nhận.** Williams: *"mày có thể set
dynamic range chiếm khoảng 60-80% kích thước chiều dọc 1 màn hình (ví dụ...
desktop... 1728x1080, còn mobile là 375x812) mày có thể đề xuất phần chiều
ngang như thế nào cho hợp lý"*. Claude đề xuất:
- Height: đọc 60-80% là max-height=80vh (trần cứng, cuộn nội bộ khi vượt),
  60% là quan sát thực tế chứ không phải sàn ép buộc — **CHƯA xác nhận đây có
  đúng ý Williams không** (khác với việc 60% là sàn cứng bắt mọi Dialog kể cả
  confirmation ngắn cũng phải cao tối thiểu 60%).
- Width: đề xuất thang CỐ ĐỊNH theo px (không theo %/vw) — sm≈400/md≈480/
  lg≈640 — vì modal không nên scale tuyến tính theo chiều rộng viewport rất
  rộng (vd 80% của 1728px ~1382px là quá khổ cho 1 form thường). Map đề xuất:
  AlertDialog/confirmation→sm, recipe form mặc định→md (gần khớp 431px thật
  của component gốc), phức tạp hơn→lg.
- **TOÀN BỘ mục size này là ĐỀ XUẤT, chưa qua xác nhận của Williams** — xem
  `dialog.binding.yaml § size`.

---

## 13/09-B — Xác nhận toàn bộ đề xuất size Dialog (height 80vh cap + width 3 bậc cố định)

**by**: Williams ("Okay hoàn toàn hợp lý")
**affects**: `profile.ghn/ds/dialog.binding.yaml` (§ size — chuyển từ ĐỀ XUẤT
sang XÁC NHẬN)

Xác nhận toàn bộ đề xuất ở `13/09-A`, không sửa gì thêm:
- **Height**: max-height = 80% viewport (trần cứng, cuộn nội bộ khi vượt);
  60% chỉ là quan sát thực tế (form nhiều field tự nhiên rơi vào khoảng đó),
  KHÔNG phải sàn ép buộc mọi Dialog.
- **Width**: thang cố định theo px, không theo %/vw — sm=400px (confirmation/
  AlertDialog), md=480px (recipe form mặc định), lg=640px (nội dung phức tạp
  hơn).

**Còn mở, KHÔNG nằm trong xác nhận này** (chưa hỏi lại riêng, không tự suy ra
là đã chốt): ngưỡng breakpoint cụ thể để Dialog tự đổi sang BottomSheet
(`OVL-B-04.threshold`, tạm đề xuất dùng `_shared.binding.yaml § breakpoints.
sm`=640, chưa xác nhận riêng) và số liệu width/margin của chính BottomSheet
(chưa đăng ký component).

---

## 13/09-C — Xác nhận ngưỡng breakpoint 640px cho Dialog↔BottomSheet

**by**: Williams (sau khi hỏi lại "375px chiều rộng thôi mà?" — Claude giải
thích 640 là NGƯỠNG CẮT cho cả dải hẹp, không phải mô tả 1 thiết bị cụ thể,
mobile 375px vẫn rơi đúng vào nhóm hẹp vì 375 < 640 — Williams: "Okay vậy
update thôi")
**affects**: `rules/kinds/overlay.rules.yaml` (§ OVL-B-04.threshold, chuyển
ĐỀ XUẤT → XÁC NHẬN), `profile.ghn/ds/dialog.binding.yaml` (§ _pending_
confirmation, đóng mục breakpoint)

Xác nhận dùng `_shared.binding.yaml § breakpoints.sm` (640px, có sẵn, khớp
chuẩn Tailwind, dùng chung mọi component) làm ngưỡng: viewport width < 640px
→ BottomSheet (trừ AlertDialog, luôn giữ Dialog); >= 640px → Dialog. Không
thêm số breakpoint mới, tái dùng giá trị đã có.

**Còn mở**: số liệu width/margin cụ thể của chính BottomSheet khi render (full
viewport trừ margin bao nhiêu) — chưa đăng ký BottomSheet thành component,
chưa có số.

**3. Dialog↔BottomSheet trên mobile — XÁC NHẬN có tự động đổi, TRỪ
AlertDialog.** Quote: *"Có tự động đổi qua lại cho consistency, đối với alert
dialog thì vẫn giữ nguyên là dialog bên bản mobile"*. Lý do (Claude viết,
chưa hỏi lại Williams xác nhận lý do, chỉ ghi để dễ hiểu): BottomSheet dễ bị
dismiss ngoài ý muốn (vuốt xuống/chạm ra ngoài) — không chấp nhận được cho
thao tác critical mà AlertDialog đại diện. Ghi thành `OVL-B-04`. Ngưỡng
breakpoint cụ thể để chuyển đổi CHƯA xác nhận — tạm đề xuất dùng
`_shared.binding.yaml § breakpoints.sm` (640px) làm mặc định, cần Williams
duyệt lại. BottomSheet bản thân vẫn CHƯA đăng ký component/binding riêng.

---

## 13/09-D — Đổi icon "clear" sang circle-xmark + đề xuất rule FRMIN-B-03 (icon trái khi nào dùng/không dùng)

**by**: Williams — quote nguyên văn: *"Okay đúng (có một điểm nhỏ là icon
xmark có thể thay bằng icon xmark-circle được không?). Tuy nhiên input có
thể có lúc xài icon có lúc không cần xài tao cần mày đề xuất tạo ra được quy
tắc nào có thể xài icon, khi nào không cần xài icon"*
**affects**: `rules/kinds/form_input.rules.yaml` (§ FRMIN-B-02.icon_literal_
mapping, § FRMIN-B-02.verified_against_render, thêm mới § FRMIN-B-03),
`profile.ghn/ds/input.binding.yaml` (§ icon.verified_examples)

**1. Icon "clear" — XÁC NHẬN đổi ligature literal từ `xmark` sang
`circle-xmark`.** Tên VAI ("clear") không đổi, chỉ đổi tên ligature FA6 thật
đứng sau vai đó. Đối chiếu `metadata/icon-families.json` gói
`@fortawesome/fontawesome-free@6.7.2` — `circle-xmark` tồn tại thật trong
catalog Free (cùng phương pháp đã dùng để xác nhận `filter`, `receipt`, v.v.
không phải tên bịa). Đã áp dụng trực tiếp lên 2 field demo ("Số tiền", "Diễn
giải") qua `use_figma` (sửa `characters` của text node trong slot
`iconClear#489:0`). **Vẫn cần bước 2 (con người)**: Williams tự mở đúng
plugin FA6 Pro trong Figma để xác nhận `circle-xmark` có thật trong bộ Pro đã
import vào file GHN DS thật và đúng ngữ cảnh — Claude chỉ xác nhận được tên
này tồn tại trong catalog Free, không thay được bước xác nhận này.

**2. FRMIN-B-03 (MỚI, ĐỀ XUẤT — CHƯA XÁC NHẬN) — quy tắc khi nào field nên/
không nên có icon trái.** Bối cảnh: rule cũ FRMIN-B-01 (12/09) viết theo
kiểu "LUÔN dùng" icon trái, ngụ ý mọi field đều cần — Williams chỉ ra thực tế
không phải field nào cũng cần icon, cần 1 quy tắc rõ ràng để quyết định.

Đề xuất (viết trong `form_input.rules.yaml § FRMIN-B-03`, trạng thái
`[ĐỀ XUẤT 13/09 — CHƯA Williams xác nhận]`):
- Chỉ dùng icon trái khi field đại diện cho 1 KIỂU DỮ LIỆU có icon quy ước,
  được nhận diện rộng rãi (tiền, ngày tháng, số điện thoại, email, phần
  trăm, địa điểm...).
- Field văn bản tự do/mô tả chung chung (không gắn với 1 kiểu dữ liệu cụ
  thể) → KHÔNG dùng icon trái.
- **Phép thử quyết định**: che nhãn field lại, chỉ nhìn icon — icon đó có
  giúp đoán ĐÚNG kiểu dữ liệu CỤ THỂ field đang hỏi không? Đạt → dùng icon.
  Icon chỉ nói được "đây là ô nhập text" một cách chung chung (không chỉ ra
  kiểu dữ liệu cụ thể) → không dùng icon.
- FRMIN-B-01 được sửa lại tương ứng: bỏ chữ "LUÔN dùng", đổi thành "KHI ĐƯỢC
  DÙNG (xem FRMIN-B-03)... phải mang nghĩa thật".

**Hệ quả trực tiếp lên demo hiện tại (CHƯA áp dụng, chỉ mới ghi nhận)**:
- "Số tiền" — ĐẠT phép thử (money-bill đoán đúng ra field tiền) → giữ icon
  trái.
- "Diễn giải" — KHÔNG đạt phép thử (align-left chỉ nói chung chung "đây là ô
  text", không nói được đây là trường mô tả/diễn giải gì cụ thể) → theo rule
  đề xuất này thì NÊN bỏ icon trái của field "Diễn giải".

Hệ quả này CHƯA được áp vào render Figma thật — chờ Williams xác nhận (hoặc
chỉnh sửa) rule FRMIN-B-03 trước khi Claude sửa field "Diễn giải".

**Còn mở**: FRMIN-B-03 là ĐỀ XUẤT, chưa xác nhận. Nếu Williams đồng ý, cần
báo lại để: (a) đổi status trong file thành XÁC NHẬN, (b) áp dụng thật lên
Figma (tắt icon trái của "Diễn giải").

---

## 13/09-E — Xác nhận FRMIN-B-03 + FA6 Pro confirm circle-xmark, áp dụng thật lên demo

**by**: Williams — "Okay sửa đi rồi tao chạy git push một lần luôn" (xác nhận
rule FRMIN-B-03) và "Icon xmark-circle đã có thật" (xác nhận `circle-xmark`
tồn tại thật trong plugin FA6 Pro, đã tự kiểm tra trong Figma)
**affects**: `rules/kinds/form_input.rules.yaml` (§ FRMIN-B-03, chuyển ĐỀ
XUẤT → XÁC NHẬN), `profile.ghn/ds/input.binding.yaml` (§ icon.verified_
examples, cả 2 field)

**1. `circle-xmark` — ĐÃ QUA BƯỚC 2 (xác nhận người)**. Williams tự mở đúng
plugin FA6 Pro trong Figma và xác nhận icon `circle-xmark` (Williams gọi là
"xmark-circle") có thật, đã import vào file GHN DS. Vậy quy trình 2 bước xác
nhận icon (1. Claude tự tra catalog FA6 Free để loại tên bịa, 2. người tự mở
FA6 Pro xác nhận đúng bộ + đúng ngữ cảnh) đã ĐÓNG cho icon này.

**2. FRMIN-B-03 — XÁC NHẬN, đã áp dụng thật lên demo.** Williams đồng ý rule
đề xuất ở 13/09-D (phép thử: che nhãn, chỉ nhìn icon — đoán được kiểu dữ
liệu cụ thể thì dùng, không thì bỏ). Đã thực thi trên file test
(`uFbbdvWYC1dg3AjdnHCgxk`, page "Page 1"):
- Field "Số tiền" (instance `51:211`): GIỮ nguyên icon trái `money-bill`
  (đạt phép thử).
- Field "Diễn giải" (instance `51:212`): TẮT `iconLeft#705:0` trên nested
  instance `I51:212;67:17577` (trước đó icon là `align-left`, không đạt
  phép thử) — qua `use_figma`, đã chụp screenshot xác nhận field giờ chỉ còn
  label + icon phải `circle-xmark`, không còn icon trái.

**Còn mở**: FRMIN-B-03 mới áp dụng cho 2 field demo hiện có (form_input mới
có 1 thành viên: Input). Khi Textarea/Select/Combobox/Datepicker được đăng
ký sau này, cần áp lại đúng phép thử này cho field cụ thể của từng loại,
không tự suy rộng ra business logic khác.

---

## 13/09-F — Đăng ký BottomSheet thành component, đóng gap "số liệu width/margin"

**by**: Williams — "Đóng nốt các gap này đi" (trả lời câu hỏi mở về BottomSheet
width/margin numbers và color/typography/spacing chưa khảo sát)
**affects**: `manifest.yaml` (thêm `components.BottomSheet`, chuyển
`overlay.members_active` → `[Dialog, BottomSheet]`), `rules/components/
bottomsheet.rules.yaml` (MỚI), `profile.ghn/ds/bottomsheet.binding.yaml`
(MỚI), `profile.ghn/ds/dialog.binding.yaml` (đóng 2 mục `_pending_
confirmation` liên quan BottomSheet), `rules/kinds/overlay.rules.yaml` (§
OVL-B-04.still_open cập nhật)

**Quy trình**: search_design_system tìm "Bottom sheet / Bottom sheet organism"
trong GHN DS (componentKey `4c05d3f58bd53f249633c0af34153b91ab849735`), import
qua `use_figma` (`figma.importComponentSetByKeyAsync`), đọc trực tiếp cả 5
variant, tạo 1 instance thật trên canvas + chụp screenshot để xác nhận hình
ảnh khớp cấu trúc đọc được — cùng phương pháp/kỷ luật đã dùng cho Input và
Dialog.

**Số liệu THẬT đóng gap còn treo**:
- **Width = 375px CỐ ĐỊNH** trên cả 5/5 variant — trùng khớp chính xác mobile
  viewport reference Williams cho ở 13/09-A (375×812). Xác nhận BottomSheet
  chiếm TRỌN chiều rộng màn hình mobile, không có margin 2 bên ngoài mép
  sheet — chỉ có padding NỘI DUNG 16px trái/phải bên trong.
- **Height = AUTO/hug theo nội dung**, quan sát thật trên 5 variant: 210px
  (w Button, ngắn nhất) đến 812px (w Checkbox, dài nhất — TRÙNG KHỚP CHÍNH
  XÁC chiều cao viewport mobile reference). Khác Dialog (đã có cap cứng
  80vh) — BottomSheet trong Figma KHÔNG có cơ chế cap, tự nhiên hug hết nội
  dung. Đây là quan sát thật, CHƯA hỏi Williams có nên thêm cap tương tự
  Dialog hay không.
- Góc trên bo 24px, góc dưới vuông (sát đáy màn hình) — hình dạng bottom-sheet
  kinh điển. Nền trắng, bound vào 1 variable thật (chưa tra được tên, chỉ có
  id thô) — 1 điểm dữ liệu thật đầu tiên cho khối "Surface" còn
  `not_yet_surveyed`.
- Kiểm tra lại quirk Button: BottomSheet KHÔNG dính lỗi giống Dialog (Dialog
  dùng nhầm Button set cũ "Stype=Round" làm mặc định) — 2 nút footer của
  BottomSheet đều trỏ đúng Button organism thật (`4e004e9d80a82cf3b0ec50e3b8cb9c6fb8eeb210`).
  Tuy nhiên phát hiện 1 điểm CHƯA rõ: mặc định demo dùng Type=Secondary +
  Type=Primary (khác quy ước Primary+Primary đã xác nhận cho Dialog ở
  OVL-B-03) — ghi lại làm `_pending_confirmation`, KHÔNG tự quyết đây là quy
  ước riêng hay lỗi demo default.

**Còn mở (CHƯA hỏi Williams, ghi rõ trong bottomsheet.binding.yaml)**:
ý nghĩa nghiệp vụ của 5 recipe (Action item/w Textfield/w Button/
w Illustration/w Checkbox); có nên áp cap height giống Dialog hay không; quy
ước Type nút footer (Secondary+Primary hay lỗi demo); tên biến thật của màu
nền.

**Về khảo sát foundational token (color/typography/spacing) nói chung**: vòng
này CHỈ tìm được 1-2 điểm dữ liệu thật phát sinh TỰ NHIÊN từ việc đăng ký
BottomSheet (1 biến màu nền, 16px padding nội dung) — KHÔNG phải 1 khảo sát
đầy đủ toàn hệ thống. Khảo sát đầy đủ (cần đọc toàn bộ collection Variables
của GHN DS, hoặc file `ghn-spacing-tokens.json` gốc chưa từng đọc trong phiên
này) vẫn là việc RIÊNG, CHƯA làm — xem `_shared.binding.yaml` cho danh sách
đầy đủ các mục `not_yet_surveyed`.

---

## 13/09-G — BottomSheet: cap height 80vh + đồng bộ footer button với Dialog

**by**: Williams — quote nguyên văn: *"Bottom sheet cũng có cap cứng 80%
viewport mobile"* và *"Thay secondary button của bottom sheet thành primary/
outline cho đồng bộ với dialog của desktop"*
**affects**: `profile.ghn/ds/bottomsheet.binding.yaml` (§ size.height.cap MỚI,
§ quirks.footer_button_type_variance đóng), `rules/kinds/overlay.rules.yaml`
(§ OVL-B-03 thêm `applies_to`, § OVL-B-04.still_open cập nhật)

**1. Height cap 80vh.** Ở 13/09-F, ghi nhận component gốc Figma của
BottomSheet KHÔNG có cơ chế cap chiều cao (chỉ tự nhiên hug tới hết nội
dung, quan sát thật tới 812px). Williams xác nhận: áp CÙNG max-height cap
80% viewport như Dialog (dialog.binding.yaml § size.height.interpretation).
Đây là quyết định THIẾT KẾ thêm ở lớp DS/renderer (không phải giá trị đọc
trực tiếp từ component) — trên 80vh, nội dung cuộn bên trong sheet, cùng cơ
chế với Dialog. Mục đích: đảm bảo Dialog↔BottomSheet (OVL-B-04) nhất quán cả
về hành vi kích thước, không chỉ hình thức.

**2. Đồng bộ nút footer với Dialog.** Ở 13/09-F, phát hiện BottomSheet có
cùng LOẠI quirk như Dialog: bản mặc định của component gốc (variant "w
Button") dùng 2 nút Type=Secondary + Type=Primary — không khớp rule OVL-B-03
đã xác nhận cho Dialog (cả 2 nút Type=Primary, khác Style Outline/Fill).
Williams xác nhận đây KHÔNG phải 1 convention riêng của BottomSheet — sửa
để dùng đúng 1 rule OVL-B-03 chung cho cả kind `overlay`. Đã áp dụng:

- Đọc `Button / Button organism` (componentKey
  `4e004e9d80a82cf3b0ec50e3b8cb9c6fb8eeb210`) xác nhận giá trị Style thật có
  sẵn: `Outline Round` (song song `Fill Round` đã dùng).
- Sửa trực tiếp instance demo BottomSheet trong file test
  (`uFbbdvWYC1dg3AjdnHCgxk`, node `I69:4911;1128:71416`, nút vị trí
  "Secondary CTA"): `Type` Secondary→Primary, `Style` Fill Round→Outline
  Round — qua `use_figma`.
- Chụp screenshot xác nhận: cả 2 nút cùng màu cam (Primary), khác nhau ở
  Style (1 viền/1 nền đặc) — khớp visual 100% với quy ước Dialog đã xác
  nhận ("Chưa lưu thay đổi").

OVL-B-03 nay ghi rõ (`§ applies_to`): rule này ở cấp KIND, áp cho MỌI thành
viên overlay có footer 2-nút — không tách riêng theo từng component.

**Còn mở**: ý nghĩa nghiệp vụ của 5 recipe BottomSheet (Action item/
w Textfield/w Button/w Illustration/w Checkbox), tên biến thật của màu nền,
chi tiết property con của header — chưa hỏi Williams, không nằm trong 2 yêu
cầu round này.

---

## 13/09-H — Khảo sát nền tảng color/typography/spacing bằng dữ liệu Figma THẬT

**by**: Williams — chọn tiếp tục khảo sát đầy đủ color/typography/spacing sau
khi được hỏi "làm tiếp khảo sát token đầy đủ đó luôn... hay để dành sau"
**affects**: `profile.ghn/ds/_shared.binding.yaml` (thêm mới `color_tokens`,
`typography_ramp`; viết lại `surface`, `text_style`, `spacing`),
`profile.ghn/ds/input.binding.yaml` (§ size.height_px, § state.color_tokens_by_state),
`profile.ghn/ds/bottomsheet.binding.yaml` (đóng mục tên biến nền)

**Phương pháp**: KHÔNG dùng file `ghn-spacing-tokens.json` gốc (chưa từng tìm
thấy/đọc trong toàn bộ phiên làm việc) — thay vào đó đọc TRỰC TIẾP file GHN DS
thật (fileKey `zECOR8UK45lmZcpMG9aOR7`, khác file test hay dùng để import
component) qua `use_figma`, gọi thẳng
`figma.variables.getLocalVariableCollectionsAsync()` — đây là nguồn thật
CHÍNH XÁC NHẤT có thể có, không phải suy đoán hay đọc lại tài liệu cũ chưa rõ
còn cập nhật hay không.

**Phát hiện kiến trúc token 2 lớp của GHN DS** (trước đây hoàn toàn chưa biết
tồn tại cấu trúc này):
- `Primitives` (288 biến, TOÀN BỘ là màu — palette thô, vd Colors/Zinc/600)
- `Color Mode` (247 biến, 2 mode Light/Dark, alias vào Primitives) — đặt tên
  THEO VAI TRÒ: `{bg|border|icon|text}/{app|primary|secondary|magic|
  interactive|grey|info|success|warning|error}/{default|hover|active|
  disabled|focusRing|muted|...}`. Component THẬT bind vào lớp Color Mode
  này (đã xác nhận bằng get_variable_defs trên node Input/BottomSheet thật).
- `Dimensions` (82 biến, 1 mode) — Spacing (47 giá trị), Radius (23), Opacity
  (11) — KHÔNG cần ghn-spacing-tokens.json nữa, đọc thẳng ra số thật.
- `Breakpoints` (5 biến) — đã có sẵn từ 08/09, không đổi.
- Typography: KHÔNG phải variable — là 27 Text Style thật đã publish
  (`figma.getLocalTextStylesAsync()`), toàn bộ dùng font Inter.

**Số liệu THẬT đã đóng vào file**:
- Spacing scale đầy đủ: -12 đến 256, bước 2px (0-28) rồi 8px (32-128) rồi
  4-8px không đều (132-256) — KHÔNG phải 1 grid đơn giản 4px/8px như từng
  đoán. Phát hiện thêm: biến `Spacing/S258` giá trị THẬT là 256 (lệch tên/
  giá trị) — ghi rõ để không tự suy giá trị từ tên biến sau này.
- Radius scale đầy đủ (23 giá trị, tên khớp đúng giá trị).
- Opacity scale (11 mức, đơn vị %, 0-100).
- Typography ramp đầy đủ 27 style (Heading H1-H6 Bold/Regular, Title 1-3,
  Subtitle 1-3, Body 1-3 + Caption, Button L/M/S, Price) — đóng hoàn toàn gap
  "heading H1/H2/H3, body text mặc định" từng ghi `not_yet_surveyed`.
- Màu: resolve hex thật cho các token hay dùng nhất — text-default #09090b,
  text-muted #52525b, text-disabled #a1a1aa, text-placeholder #71717a,
  text-error #ef4444, bg/app/baseWhite #ffffff (Light)/#000000 (Dark),
  bg/app/subtle #fafafa — TRÙNG KHỚP CHÍNH XÁC với surface.table_header.background
  đã xác nhận từ trước (2 nguồn độc lập, củng cố độ tin cậy).
- Xác nhận thật (không suy đoán) 2 component binding cụ thể: BottomSheet nền
  = `bg/app/baseWhite` (đóng gap tên biến còn treo từ 13/09-F); Input
  (State=Filled, Destructive=False) dùng border=`border/app/default`
  (#d4d4d8), nền=`bg/app/baseWhite`, chữ=`text/text-default` font "Content/
  Body 2", label font "Sub Title/Subtitle 2". Input size=sm đo được chiều cao
  thật 36px (biến `Size/size-input-sm`, thuộc 1 collection KHÔNG nằm trong 4
  collection local của file GHN DS gốc — có thể từ 1 library Size riêng chưa
  xác định được, giá trị vẫn resolve đúng).

**Còn mở (KHÔNG tự đoán, ghi rõ trong file)**:
- Token cho modal/backdrop overlay (lớp phủ mờ sau Dialog/BottomSheet) —
  search hết 247 tên biến Color Mode, KHÔNG có token nào tên overlay/backdrop/
  scrim/modal. Có thể ghép từ `bg/app/inverse` + 1 mức `Opacity/O*`, nhưng
  CHƯA thấy component thật nào dùng tổ hợp này — không tự áp.
- card_background, sidebar_background — chưa có component Card/Sidebar thật
  để đọc get_variable_defs, không tự đoán token nào "nên" dùng.
- Input ở State=Focused/Disabled/Destructive=True — chỉ mới đọc được
  State=Filled/Destructive=False (do demo hiện tại chỉ có field ở state đó).
- Input size=md/lg — chưa đo (demo chỉ có field size=sm).
- grid_units_per_row — khái niệm nhắc ở schema-v1-draft.md, chưa rõ có map
  vào base_scale_px mới tìm được hay là khái niệm riêng, chưa hỏi Williams.

**Kết luận về mức độ đóng gap**: đây là khảo sát THẬT, SÂU hơn nhiều so với
"1-2 điểm dữ liệu phát sinh tự nhiên" ở 13/09-F — đã đóng hoàn toàn phần
NỀN TẢNG (toàn bộ scale số + toàn bộ ramp chữ + kiến trúc màu semantic), chỉ
còn thiếu phần MAP cụ thể (component X dùng đúng token nào ở state Y) cho
những component/state chưa có ví dụ thật để đọc — đây là việc làm DẦN khi có
màn hình/component thật, không phải làm 1 lần cho xong.

---

## 13/09-I — Xác nhận Input có 3 size + màu backdrop overlay

**by**: Williams — "xác nhận giúp tao input có 3 size=sm/md/lg đúng không" và
"Lớp phủ mờ cho dialog lấy màu bg/app/baseBlack cho opacity=50%"
**affects**: `profile.ghn/ds/input.binding.yaml` (§ size.scale_confirmed),
`rules/kinds/overlay.rules.yaml` (§ OVL-B-01.backdrop_color MỚI),
`profile.ghn/ds/_shared.binding.yaml` (§ color_tokens đóng mục backdrop)

**1. Input — xác nhận 3 size.** Trả lời trực tiếp bằng dữ liệu đã đọc thật từ
trước (không cần đọc lại Figma): `variantGroupProperties.Size` của chính
component_set Input (componentKey `9c400e1d93884025583c2cf3bbcaea263301cde1`)
CHỈ có đúng 3 giá trị `[sm, md, lg]` — không có giá trị nào khác. Đã có sẵn
trong input.binding.yaml từ lúc đăng ký Input (12/09-N), nay ghi thêm dòng
xác nhận rõ ràng vì Williams hỏi lại.

**2. Backdrop overlay — màu + opacity.** Williams xác nhận công thức:
`bg/app/baseBlack` @ `Opacity/O5` (50%). Đã resolve giá trị hex thật qua
use_figma (file GHN DS gốc): `bg/app/baseBlack` = #000000 (Light) / #ffffff
(Dark) — ĐẢO NGƯỢC giống `bg/app/baseWhite` (baseWhite Light=trắng/
Dark=đen ↔ baseBlack Light=đen/Dark=trắng), khớp đúng kiến trúc "nền cơ bản
đối lập" đã ghi nhận ở 13/09-H. Kết hợp `Opacity/O5`=50% (đã có số thật từ
13/09-H) → backdrop = rgba(0,0,0,0.5) ở Light, rgba(255,255,255,0.5) ở Dark.

Ghi ở cấp KIND (`OVL-B-01.backdrop_color`), áp dụng CHUNG cho mọi thành viên
overlay có backdrop (Dialog, BottomSheet) — không tách riêng theo component,
cùng cách tiếp cận đã dùng cho OVL-B-03. Đóng hẳn mục "modal_overlay_
background/backdrop" từng ghi `still_not_verified` ở 13/09-H.

---

## 13/09-J — Card/Sidebar background + khảo sát Sidebar (NGHIÊN CỨU, chưa đăng ký)

**by**: Williams — "Card-background/sidebar-background đều dùng bg/app/
baseWhite"; "tụi tao có sidebar component... do Giao Hàng Nặng là nhánh mới
tụi tao customize sidebar riêng dựa trên atom của sidebar design system...
đưa ra đề xuất chung cho sử dụng sidebar"; link GHN DS sidebar (node
1103:18352) + link B2B Portal (node 22894:77039, logo Giao Hàng Nặng); mô tả
hành vi module/chevron/state của sidebar.
**affects**: `profile.ghn/ds/_shared.binding.yaml` (§ surface: đóng
card_background, sidebar_background), file MỚI
`profile.ghn/ds/sidebar-research-notes.md` (nghiên cứu, KHÔNG đăng ký).
Không đổi `manifest.yaml`.

**1. Card/Sidebar background.** Williams xác nhận trực tiếp, không cần đo
thêm: cả hai đều dùng `bg/app/baseWhite` (#ffffff Light / #000000 Dark) —
cùng token đã dùng cho BottomSheet/Input background. Đóng 2 mục
`not_yet_surveyed` còn treo từ 13/09-H trong `_shared.binding.yaml § surface`.

**2. Khảo sát Sidebar — CHỈ nghiên cứu, KHÔNG đăng ký component.** Theo đúng
yêu cầu của Williams ("đưa ra đề xuất chung... để sau này"), đã khảo sát THẬT
(không đoán) 2 nguồn Figma:

- GHN DS gốc (generic): component "Left Menu" (componentKey
  `a9dabbc7e2f8b7a636175adf12016dad23645d71`, variant Type=[Mobile, Web] —
  khung toàn bộ sidebar) và component con "Left menu items (Base)"
  (componentKey `dbf4cf146de9387afd495867be9e17dc2a20d9cb` — atom "module",
  variant Type=[main menu, sub menu, collapse, expand] × State=[Default,
  Active], cùng boolean numberBadge/Menu name/Active/Right icon).
- B2B Portal (thật, Freight custom): frame "Left Menu Freight" →
  "SidebarMenu" (node 22894:77037) — đọc thật 10 module chính + các sub-menu,
  đối chiếu từng điểm với mô tả của Williams.

**Phát hiện quan trọng**: "collapse"/"expand" KHÔNG PHẢI là chevron của từng
module — đó là 1 nút toggle DUY NHẤT thu gọn/mở rộng CẢ sidebar, nằm ngay
dưới logo. Chevron mở/đóng sub-menu của TỪNG module là 1 khái niệm khác:
boolean `Right icon` trên variant `main menu`.

**Đối chiếu với sidebar Freight thật**: khớp đúng phần lớn mô tả của
Williams (module đang xem = State Active; module có sub-menu = Right
icon=true; sub-menu không icon chỉ có text; user ở sub-menu nào thì
State=Active tại chính sub-menu đó).

**2 điểm CHƯA khớp — cố tình để ngỏ, không tự đoán** (chi tiết đầy đủ trong
`sidebar-research-notes.md § 4`):
(a) Chevron luôn hiển thị `chevron-down` ở MỌI module có sub-menu, kể cả khi
sub-menu đang hiển thị (mở) ngay bên dưới — không đổi thành chevron-up như
Williams mô tả. Chưa rõ đây là quirk (leftover default, giống các quirk
Dialog/BottomSheet trước đây) hay là hành vi thật (chevron cố định, trạng
thái mở/đóng thể hiện bằng việc sub-menu CÓ xuất hiện hay không).
(b) Boolean `Active#4109:93` không khớp trục `State` — có node State=Active
lại có Active=false, và ngược lại. Chưa rõ ý nghĩa thật của property này.

**Logo Giao Hàng Nặng**: đã xem + xác nhận đúng nội dung (logo "GHN" +
wordmark "GiaoHang NẶNG" + tagline "Hàng Nặng Ký, Giá Nhẹ Vi"), node
22894:77039 file B2B Portal. KHÔNG tải được file ảnh về trong phiên này —
mạng ra ngoài của môi trường cloud bị egress policy chặn domain figma.com
(xác nhận qua log proxy, không phải lỗi Figma) — đã KHÔNG thử bypass, chỉ ghi
lại tham chiếu (file key + node id) để tải trong phiên khác có quyền mạng
khác, hoặc Williams tải trực tiếp từ link Figma.

**Kết luận**: toàn bộ nghiên cứu lưu tại `profile.ghn/ds/sidebar-research-
notes.md`, KHÔNG có entry trong `manifest.yaml`, KHÔNG tạo
`sidebar.rules.yaml`/`sidebar.binding.yaml` — cố tình chưa đăng ký vì nghiệp
vụ chưa chốt hết (2 điểm ở trên) và Williams tự nói đây là việc "để sau này".
Đề xuất tạm (CHƯA tạo): nếu đăng ký, Sidebar có thể cần 1 `component_kind`
mới tên `navigation` (không kind nào hiện tại khớp hành vi menu điều hướng +
expand/collapse) — chờ Williams quyết định.

---

## 13/09-K — Input Focused/Disabled/Destructive real colors + size md/lg + Condition default; BottomSheet recipe links; Sidebar chevron discrepancy resolved

**by**: Williams — đưa 2 demo Figma thật để đo Input (node 23309:3544 —
Focused/Disabled/Destructive; node 23309:4068 — size sm/md/lg), yêu cầu auto
ẩn "Condition" chips bên dưới field, yêu cầu link 5 recipe BottomSheet để
check, và xác nhận hành vi chevron sidebar.
**affects**: `profile.ghn/ds/input.binding.yaml`, `rules/kinds/form_input.rules.yaml`
(§ FRMIN-B-04 MỚI), `profile.ghn/ds/_shared.binding.yaml` (§ color_tokens),
`profile.ghn/ds/bottomsheet.binding.yaml` (§ type_variant.preview_links_13_09_J),
`profile.ghn/ds/sidebar-research-notes.md` (§ 4 đóng 1 phần).

**1. Input — State=Focused/Disabled/Destructive=True, số liệu THẬT (không còn
[cần verify]).** Đọc get_variable_defs trên đúng 3 instance trong demo
Williams đưa (file B2B Portal s2NE6ikwLnsZSUp97RBfof, node 23309:3544):
- Focused: border=`border/info/default` (#3b82f6, xanh dương) — LƯU Ý:
  KHÔNG có token "focus" riêng, dùng chung màu info. Williams giải thích: state
  này hầu như không dùng khi thiết kế Figma, chỉ dùng khi build prototype HTML
  cho PO review (mô phỏng hành vi hover thật).
- Disabled: border=`border/app/disabled` (#e4e4e7), nền=`bg/app/elevated`
  (#f4f4f5, KHÔNG phải baseWhite), text/icon=`text-disabled`/`icon-disabled`
  (#a1a1aa).
- Destructive=True: border=`border/error/default`, text=`text-error`,
  icon=`icon-error` (cả 3 #ef4444), nền vẫn baseWhite, "Error message" dùng
  font "Content/Body 3".

**2. Input — size md/lg, số đo THẬT.** Từ demo node 23309:4068 (label sẵn
SM/MD/LG): đo trực tiếp bounding box field — sm=36px (đã biết), md=40px,
lg=44px — cấp số cộng đều +4px.

**3. Input — boolean "Condition" (hàng chip nhỏ dưới field), ý nghĩa + default
MỚI.** Williams: "cái condition bên dưới vùng input hầu như tao không dùng
tới — nên khi tạo input mày có thể auto ẩn nó đi giúp tao". → Rule mới
FRMIN-B-04: mặc định Condition=False (ẩn) khi dựng field Input mới qua
pipeline, chỉ bật khi có yêu cầu tường minh.

**4. BottomSheet — link xem 5 recipe (Action item/w Textfield/w Button/w
Illustration/w Checkbox).** Tạo lại 1 instance/variant trong file TEST
(uFbbdvWYC1dg3AjdnHCgxk) để có node id thật, đưa link cho Williams tự xem +
xác nhận ý nghĩa nghiệp vụ — xem bottomsheet.binding.yaml §
type_variant.preview_links_13_09_J.

**5. Sidebar — đóng 1 trong 2 điểm chưa khớp (mục 13/09-J).** Williams xác
nhận: "Tao xác nhận là nó có đổi hướng xuống và lên. Chắc trong quá trình làm
có sự nhầm lẫn" + "Chắc do tao tự chỉnh sửa component bằng cách đổi màu nên
nó có sự sai này" — hành vi ĐÚNG là chevron đổi chiều down↔up theo trạng thái
đóng/mở thật (đúng như Williams mô tả ban đầu); hiện tượng "luôn down" quan
sát được là do chính Williams tự chỉnh sửa (đổi màu) component, không phải
lỗi/hành vi thiết kế. Điểm còn lại (boolean `Active#4109:93` không khớp trục
`State`) CHƯA được xác nhận rõ ràng — để ngỏ, sẽ hỏi lại.

**Còn mở, KHÔNG tự đoán**: ý nghĩa boolean `Active#4109:93` trên sidebar
(mục 4b, sidebar-research-notes.md); ý nghĩa nghiệp vụ cụ thể của 5 recipe
BottomSheet (đã gửi link, chờ Williams xem + trả lời); mapping size Input
theo vị trí sử dụng (không critical).

---

## 13/09-L — Ý nghĩa nghiệp vụ 4/5 recipe BottomSheet + tái xác nhận footer 2-nút

**by**: Williams — xem 5 link preview ở 13/09-K, trả lời ý nghĩa nghiệp vụ
từng recipe.
**affects**: `profile.ghn/ds/bottomsheet.binding.yaml` (§ type_variant.business_meaning MỚI, § footer_note_13_09_L MỚI)

**Ý nghĩa nghiệp vụ từng recipe** (nguyên văn Williams):
- **Action item**: "chưa có usecase — cũng hầu như ít dùng tới usecase này."
  Giữ nguyên trong hệ thống nhưng không gán business rule cụ thể.
- **w Textfield**: "Dùng cho form tạo/filter.. Phần body là dynamic slot để
  mày có thể customize component input cho hợp lý tùy yêu cầu PRD của PO."
- **w Illustration**: "Cho onboarding/trạng thái trống chưa có data (dùng
  icon no-data màu xám) — lưu ý không có nút skip."
- **w Checkbox**: "lựa chọn filter/thêm khách hàng vào danh sách (action
  nhiều lần thêm)."
- **w Button**: KHÔNG được nhắc tới trong câu trả lời — còn để ngỏ, chưa hỏi
  lại.

**Footer 2-nút**: Williams tái xác nhận "bottom sheet chỉ có 2 nút là primary
chỉ khác style filled/outline" — khớp đúng 100% với rule đã chốt trước đó ở
OVL-B-03 (13/09-G), không cần sửa gì, chỉ củng cố thêm bằng dữ liệu Williams
tự xem lại.

**Còn mở**: ý nghĩa nghiệp vụ của recipe "w Button" — chưa hỏi Williams.

---

## 13/09-M — Đóng ý nghĩa recipe "w Button"; gửi link cho Williams tự kiểm boolean Active của sidebar

**by**: Williams — "Ý nghĩa nghiệp vụ của button hiện chưa có usecase nào" +
"Cho tao link" (yêu cầu link để tự kiểm tra boolean `Active#4109:93` đang hỏi
dở từ 13/09-J/K).
**affects**: `profile.ghn/ds/bottomsheet.binding.yaml` (đóng hẳn §
type_variant.business_meaning — 5/5 recipe), `profile.ghn/ds/sidebar-research-notes.md`
(§ 4b — thêm link + phát hiện mới về `hidden`).

**1. Recipe "w Button" — đóng.** Giống "Action item": chưa có usecase thật,
giữ trong hệ thống nhưng không gán business rule. Vậy 5/5 recipe BottomSheet
đã có câu trả lời đầy đủ (2 chưa có usecase, 3 có ý nghĩa cụ thể).

**2. Sidebar boolean `Active#4109:93` — gửi link, CHƯA đóng.** Đọc lại kỹ
metadata thật của frame SidebarMenu (node 22894:77037) khi chuẩn bị link,
phát hiện thêm: các node từng dùng làm "bằng chứng" cho vế "State=Default mà
Active=true" (77045/77046/77052/77053) đều có `hidden=true` — tức không hiển
thị thật trên canvas, có thể là biến thể dự phòng chưa dọn. Ví dụ rõ nhất còn
lại là node `22894:77043` (đang hiển thị thật, State=Active nhưng
Active=false). Đã gửi 2 link cho Williams tự mở Figma kiểm tra (node cụ thể +
cả frame) — CHƯA tự kết luận ý nghĩa property này, chờ Williams xem trực tiếp
rồi trả lời.

---

## 13/09-N — Đóng nốt boolean Active của sidebar — cùng nguyên nhân với chevron

**by**: Williams — "Okay là do tao làm ẩu không bấm active mà đổi màu đè lên
component nên nó mất đi bản chất của component gốc" (sau khi tự mở link kiểm
tra node `22894:77043`).
**affects**: `profile.ghn/ds/sidebar-research-notes.md` (§ 4b đóng hẳn, § 7
cập nhật).

Đóng nốt điểm chưa khớp cuối cùng của khảo sát Sidebar (mục 13/09-J § 4b).
Williams xác nhận: property `Active#4109:93` LÀ đúng ý nghĩa "module đang
active" như tên gọi — sự lệch quan sát được là do Williams tự thao tác thủ
công (đổi màu đè trực tiếp lên fill của instance thay vì bật đúng property
Active có sẵn), làm mất đi binding gốc của component. Cùng nguyên nhân gốc
rễ với điểm (a) đã đóng ở 13/09-K (chevron luôn hiện down) — cả 2 đều do thói
quen "đổi màu đè lên component" thay vì dùng property/variant chuẩn, KHÔNG
PHẢI lỗi/hành vi bất thường của chính component DS gốc.

**Kết luận toàn bộ khảo sát Sidebar**: component DS gốc ("Left Menu" +
"Left menu items (Base)") hành xử ĐÚNG 100% theo mô tả ban đầu của Williams
(module active = State=Active + Active=true; module có sub-menu = Right
icon=true + chevron đổi hướng theo đóng/mở; sub-menu không icon chỉ text).
Sai lệch quan sát được trong bản Freight thật đều là do Williams tự
customize thủ công, không phải vấn đề của hệ thống thiết kế. Không còn điểm
nào chưa khớp — sẵn sàng để Williams quyết định đăng ký Sidebar thành
component chính thức khi cần.
