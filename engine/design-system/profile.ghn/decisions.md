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
