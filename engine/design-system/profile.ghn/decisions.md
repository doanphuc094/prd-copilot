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
