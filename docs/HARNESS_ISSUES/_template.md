# HI-XXX · <一句话标题>

<!--
新建一条 Issue:
1. cp docs/HARNESS_ISSUES/_template.md docs/HARNESS_ISSUES/<编号>.md
2. 填字段(没有的留空,不要删字段)
3. 在 docs/HARNESS_ISSUES.md 汇总表追加一行
4. 产出规则同步登记到 docs/CHANGELOG-RULES.md
-->

## 元信息

- **状态**:open / triaged / resolved / deferred
- **来源等级**:confirmed / suspected / example / cold-start
- **反馈类型**:A 客观规则违反 / B 专业判断跑偏 / C 个人审美偏好
- **提交人**:伙伴名字 / dogfood / 复盘
- **提交时间**:2026-MM-DD
- **裁判人**:维护者名字
- **裁判时间**:2026-MM-DD
- **GitHub Issue**:#NN(没有就写 N/A)
- **关联产物**:业务项目本地路径(绝对路径或仓库内相对路径)
- **关联对话**:codex/claude conversation id 或飞书消息链接

---

## 一、原始反馈

> 直接贴伙伴的原话,或反馈卡整段。

---

## 二、证据包

伙伴端开工证据(放在业务项目根目录的 `.harness-evidence/` 三件套):

- 开工指令:`<项目路径>/.harness-evidence/input.md`
- 生成完总结:`<项目路径>/.harness-evidence/generation-summary.md`
- 反馈记录:`<项目路径>/.harness-evidence/feedback/<时间戳>.json`

附加截图/链接:

- 截图位置(如有)
- 本地预览路径或线上链接(如有)

---

## 三、维护者裁判

### 是不是真问题

(一句话:这次是不是真的踩了坑、还是需求没说清、还是审美偏好)

### 该不该进 Harness

(对照 confirmed/suspected/example/cold-start 选一个,说明理由)

### 类型归属

(A/B/C 选一个,说明为什么)

---

## 四、规则产出

如果裁判后决定落规则,在这里列出落到哪里:

- [ ] `docs/INPUT_SOURCE_RULES.md` §X.Y 新增/修改:...
- [ ] `docs/COMPONENT_USAGE.md` xxx 字段语义边界:...
- [ ] `docs/DESIGN.md` §X 新增/修改:...
- [ ] `AGENTS.md` §X 新增/修改:...
- [ ] CHANGELOG-RULES.md 追块:HARNESS-XXX-VY.Z

如果决定不落规则(被驳回 / deferred / 审美偏好),在这里说明原因。

---

## 五、对伙伴的最终回复

用业务语言写一段,给伙伴看的版本:**问题是什么、有没有解决、什么时候生效、伙伴下次该怎么办**。

---

## 六、变更历史

- 2026-MM-DD · 提交
- 2026-MM-DD · 裁判:...
- 2026-MM-DD · 规则落地:...
