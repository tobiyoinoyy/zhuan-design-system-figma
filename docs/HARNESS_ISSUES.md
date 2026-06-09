# Harness Issues · 反馈案件汇总

> 这份文件是 **Harness 反馈的轻量案件管理**:每条独立反馈分配一个三位序号(`HI-001`、`HI-002`...),归档到 `docs/HARNESS_ISSUES/<编号>.md`,本文件做总览。
>
> 与 [`CHANGELOG-RULES.md`](./CHANGELOG-RULES.md) 的分工:
> - `HARNESS_ISSUES/` 记录 **每一条反馈案件本身**:发生了什么、证据在哪、维护者怎么裁判
> - `CHANGELOG-RULES.md` 记录 **裁判后产生的规则**:哪条规则、改了哪个文档、影响范围
> - 一条 issue 可能产出 0~N 条规则;一条规则可能合并多条 issue。两边互相 link。
>
> 与 GitHub Issue 的分工:
> - GitHub Issue 是 **伙伴提交入口**:伙伴在那边填模板、贴截图
> - `HARNESS_ISSUES/` 是 **维护者归档**:裁判后从 GitHub Issue 复制核心字段过来,加上证据包路径、规则产出、最终判定
> - 即使没有 GitHub Issue(比如 dogfood、复盘当场发现),也可以直接在这里建条目

---

## 用法

### 新建一条 Issue

1. 看本文件最后一个序号,加 1 拿到新编号(如最后是 `HI-003`,新的就是 `HI-004`)
2. 复制 `docs/HARNESS_ISSUES/_template.md` → `docs/HARNESS_ISSUES/<编号>.md`
3. 填模板字段
4. 在本文件汇总表追加一行
5. 如果产出规则,同步在 [`CHANGELOG-RULES.md`](./CHANGELOG-RULES.md) 末尾追块,两边互相引用

### 收到伙伴说 "问题序号 X" 时

伙伴在飞书/对话里说 "去看下 HI-002 是怎么处理的" 或 "我提的那个反馈到 HI 几号了":

- 先在本文件汇总表里搜编号,定位到 `docs/HARNESS_ISSUES/<编号>.md`
- 读完案件页 + 规则产出(如有),用业务语言告诉伙伴:**问题是什么、有没有处理、处理到哪一步、什么时候生效**
- 伙伴不需要知道 token 语义、规则文件路径,只需要听到结论

---

## 评级体系

每条 issue 在归档时打两个标:

### 来源等级(沿用 CHANGELOG 那套)

| 等级 | 含义 |
|-|-|
| `confirmed` | 真实发生证据清楚,直接进入 Harness |
| `suspected` | 看着像但证据不够,先观察累计 3 例再进 |
| `example` | 单次示例,不当高频问题处理 |
| `cold-start` | 维护者预判,等真实反馈撞上来再升级 |

### 反馈类型(沿用伙伴 issue 模板那套)

| 类型 | 含义 | 进 Harness? |
|-|-|-|
| A · 客观规则违反 | 组件用错/字段格式违规/颜色不在 tokens 内 | 是,优先 |
| B · 专业判断跑偏 | 信息层级/营销视觉边界/语义识别 | 是,需累计样本 |
| C · 个人审美偏好 | "我觉得这颜色不好看"、"我喜欢另一种字体" | 否,关 issue |

---

## 状态流转

```text
open(待裁判) → triaged(已裁判,等动作) → resolved(规则已落 / 已驳回)
                                       └─ deferred(等更多样本)
```

| 状态 | 含义 |
|-|-|
| `open` | 刚归档,维护者还没裁判 |
| `triaged` | 维护者裁判完,标了来源等级和类型,但规则还没落 |
| `resolved` | 终态。规则已落 / 被驳回 / 是审美偏好不进 Harness |
| `deferred` | 证据不够,等累计 3 例再说;每次新例子在原 issue 追加 evidence |

---

## 汇总表

| 编号 | 标题 | 状态 | 来源等级 | 类型 | 产物 | 规则产出 | 备注 |
|-|-|-|-|-|-|-|-|
| HI-001 | 工具型页面图标被批量刷成 var(--zd-color-link) | resolved | confirmed | B | privacy-personal-info-rights(旧仓库 dogfood 样本) | HARNESS-INPUT-V0.3 | 迁移自旧仓库,V0.3 已落 |

---

## 相关文档

- 反馈说明(给伙伴看):[`HARNESS_FEEDBACK.md`](./HARNESS_FEEDBACK.md)
- 规则演进账本:[`CHANGELOG-RULES.md`](./CHANGELOG-RULES.md)
- 组件字段语义边界:[`COMPONENT_USAGE.md`](./COMPONENT_USAGE.md)
- 输入源处理路径:[`INPUT_SOURCE_RULES.md`](./INPUT_SOURCE_RULES.md)
- 维护者交接:[`../AGENTS.md`](../AGENTS.md)
