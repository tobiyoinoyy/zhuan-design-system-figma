# Harness 规则演进账本 (CHANGELOG-RULES)

> 这份文件记录 **每条 Harness 规则的来源**:
> 哪个 bug、哪次踩坑、哪次评审,导致我们新增/修改了哪条规则。
>
> 目的:让规则不是凭空出现的「最佳实践」,而是有可追溯的事故源头。
> Agent 在自查报错时被引用到这里,可以理解「为什么这条规则存在」。

---

## 用法

新增一条规则时,在文件末尾追加一个块,格式固定:

```text
HARNESS-XXX
来源等级:confirmed / suspected / example / cold-start
反馈来源:GitHub Issue #12 / 团队复盘 2026-MM-DD / cold-start (任选其一,无来源就写 cold-start)
关联 HI:HI-001(如有)
问题:[一句话描述当时踩了什么坑]
判断:[维护者裁判说明:为什么这条值得进 Harness、归属 A/B/C 哪类、是否高频]
规则:[这条规则要 agent 做什么/不做什么]
影响:[受影响的组件/文档/自查清单项]
处理方式:[规则落到了哪里:COMPONENT_USAGE / AGENTS.md / INPUT_SOURCE_RULES / DESIGN.md]
```

字段说明:
- **来源等级**:
  - `confirmed` — 真实发生证据清楚,直接进入 Harness
  - `suspected` — 看着像但证据不够,先观察累计 3 例再进
  - `example` — 单次示例,不当高频问题处理
  - `cold-start` — 冷启动时凭源码梳理 + 历史踩坑推的,不是伙伴反馈
- **反馈来源**:对应的 GitHub Issue 号 / 复盘日期 / cold-start 标记。可追溯。
- **关联 HI**:对应 [`HARNESS_ISSUES.md`](./HARNESS_ISSUES.md) 里的案件编号(如有)。
- **判断**:维护者裁判时为什么决定沉淀这条、属 A(客观)/B(专业)/C(偏好)哪类、规则该落到哪一层。

ID 顺序递增,不复用、不删除。废止的规则把"处理方式"改成"已废止(原因)"即可。

---

## 规则列表

```text
HARNESS-001
来源等级:cold-start
反馈来源:cold-start (基于源码梳理 + 租赁/回收历史踩坑)
问题:agent 在租赁/回收业务场景里,把 ProductCardH 的 price 字段当字符串拼后缀(如 "1299元/月"、"1299-1599"),导致 Price 内部按纯数字加 ¥ 前缀和大字号 styling 时,后缀也被放大,整段版式崩。
判断:A 类(客观规则违反)。字段语义边界,可静态扫描,优先靠 agent 自查 + 反馈回流。冷启动时由维护者从源码 + 历史复盘推出,后续转为伙伴反馈持续迭代。
规则:ProductCardH.price 只允许纯数字(number 或仅含数字的 string)。后缀语义(日租/月租、估价区间)不属于本组件,需要走专用组件(ProductCardRent / ProductCardRecycle,未实现前用 ListRow 兜)。
影响:ProductCardH 在 zhuan-app 单列商品列表里所有调用点;租赁、回收业务线的 agent 生成代码。
处理方式:
  - 文档:docs/COMPONENT_USAGE.md「字段语义边界」段说清楚 ProductCardH.price 的纯数字约束
  - 自查清单:agent 生成完后自检 price 是否含非数字字符
  - 反例对照:docs/COMPONENT_USAGE.md 租赁/回收章节追加「不要硬用 ProductCardH」(待补)
```

```text
HARNESS-002
来源等级:cold-start
反馈来源:cold-start (基于源码梳理 + PDP 促销字段历史踩坑)
问题:agent 在卡片或 PDP 价格场景里,把促销活动详情(「双11全场5折叠加优惠券满200减30」)、链接、装饰节点(<Icon/>)塞进 Price.promo 字段,导致价格右下小字溢出/截断,或 styling 被破坏。
判断:A 类(客观规则违反)。字段长度/类型边界,可静态扫描,优先靠 agent 自查。促销详情属业务文案,该走专用区块,不该污染价格小字。
规则:Price.promo 只允许短文本(建议 ≤ 8 个汉字),只能是字符串、不能是 React 节点。长促销文案、活动详情属于 PDP 「促销说明」区块或专用组件,不是 promo。
影响:Price 直接调用 + ProductCardH/ProductCardFeeds 通过 promo props 间接传入的所有路径。
处理方式:
  - 文档:docs/COMPONENT_USAGE.md「字段语义边界」段说清楚 Price.promo 的短文本约束
  - 自查清单:agent 生成完后自检 promo 长度 ≤ 8 汉字、类型为 string
  - ProductCardH 跨链引用同步追加(待补)
```

```text
HARNESS-003
来源等级:cold-start
反馈来源:cold-start (基于源码梳理 + 二奢/电子频道复盘)
问题:agent 在 ProductCardFeeds 上反复踩三种坑:
  (a) 不传 variant 靠源码推断,二奢卡漏 luxuryTag 数据时退化成 electronics、显出错位的 99A 标签
  (b) electronics 卡传 luxuryTag(被忽略)、luxury 卡传 wear/grade(组合不正确)
  (c) luxury 卡上手动给 sellChips 写 tone="red",违反二奢视觉规范
判断:A 类(客观规则违反)+ B 类(频道语义边界)。variant 显式 + 字段不交叉是客观规则,可自查;sellChips tone 是品牌视觉规范,文档兜底。频道间字段串用是 agent 的高频踩坑,优先级最高。
规则:
  - variant 必须显式写("electronics" / "luxury"),禁止依赖隐式推断
  - electronics 用 wear/grade,luxury 用 luxuryTag,字段不交叉
  - luxury 卡上的 sellChips 不允许显式写 tone="red",默认走 info(灰)
影响:ProductCardFeeds 直接调用 + FeedsGrid 间接调用的所有路径(首页 feeds、分类双列、二奢频道)。
处理方式:
  - 文档:docs/COMPONENT_USAGE.md「ProductCardFeeds variant 选型表」+ 字段不交叉清单
  - 自查清单:agent 生成完后自检 variant 是否显式、字段是否跨频道串用
```

```text
HARNESS-INPUT-V0
来源等级:cold-start
反馈来源:cold-start (基于历史踩坑 + UX 团队多次复盘)
问题:agent 拿到伙伴的输入材料(文字指令/低保真/高保真/PRD/营销描述/混合)直接发挥审美开工——不分类型、不判断权重、不反查组件,导致:
  (a) 模糊文字直接生成,塞 banner/装饰元素"显得丰富"
  (b) 低保真上的占位颜色字号被当成设计规范执行
  (c) 高保真上的 CSS 数值被直接照搬,绕过 tokens 和真组件
  (d) PRD 被跳过 UX Brief 提炼,核心字段丢失或市场材料被当工具页内容
  (e) 营销关键词没命中 §8.1 三条判定就套例外条款,或营销视觉渗透到工具型组件
  (f) 混合输入不分权重,照搬最容易看到的那份输入
  (g) 方向性歧义("做个橱窗模块"可以做出 3 种信息架构完全不同的页面)被当字段性歧义,反问 1 个字段救不回来
判断:B 类(专业判断跑偏)流程层规则。无法静态扫描,只能靠 AGENTS.md 入口接线 + agent 自觉 + 反馈回流迭代。冷启动时一次性铺六类骨架,细则等真实输入分布回流再补。
规则:开工前先按 docs/INPUT_SOURCE_RULES.md 第 0 节判断输入源类型,再按对应章节(§1-§7)的处理路径走。模糊输入再分字段性 vs 方向性:字段性反问 1 个最关键歧义,方向性先出 2-3 个信息架构方向(不出图,文字描述用户焦虑/模块优先级/核心动作),伙伴选定再开工;低保真只取信息架构,视觉回到 tokens;高保真做组件反查,冲突以设计系统为准;PRD 先出 UX Brief 写进 DECISIONS.md;营销必须命中 DESIGN.md §8.1;混合输入按"业务正确性=PRD,视觉正确性=设计系统,结构=低保真,参照=高保真"权重判定。
影响:所有 code agent 的开工流程(伙伴端 + 维护者端)。无运行时校验,靠 agent 自觉 + AGENTS.md 入口接线 + 反馈回流三层机制。
处理方式:
  - 文档:docs/INPUT_SOURCE_RULES.md V0(六类输入源 + 兜底 + 混合判权)
  - AGENTS.md:§2 加 ⓪ 步「先判断输入源」+ §3 必读文档加 INPUT_SOURCE_RULES.md
  - 后续:靠反馈回流迭代,B.confirmed 进文档,B.suspected 进文档但标"待验证"
```

```text
HARNESS-INPUT-V0.1
来源等级:cold-start
反馈来源:cold-start (维护者实测低保真输入污染视觉设计稿 + 与 agent 三轮讨论后达成专业共识)
问题:HARNESS-INPUT-V0 把图片附件粗略归到 §2/§3,但实际开工时 agent 在三件事上跑偏:
  (a) 伙伴上传图片但没说是低保真还是高保真——agent 没有"自己看图判断"的明确规则
  (b) 伙伴说了"高保真"但图明显是灰框线框(或反过来)——agent 盲信伙伴说法,生成结果跑偏
  (c) 高保真处理时如果按"区分图片来源(自家设计系统/竞品/活动稿)给不同处理方式",agent 没法可靠判断来源,容易误判"看着像我们家的→可以照搬"导致污染
判断:B 类(专业判断跑偏)流程层规则。延续 V0 的不可静态扫描特性,加强 agent 看图判断 + 用户冲突仲裁的兜底逻辑。
规则:
  - 图片附件不是默认视觉稿。开工前先看图判断角色(低保真/高保真/判断不出来)
  - 判断依据以图片特征为准,不完全依赖伙伴说法。伙伴说法和图片冲突时优先按图片;仍不确定的,按低保真处理
  - 判断不出来时一律按低保真处理(兜底闸,永远不会污染设计系统)
  - 低保真硬禁止继承的视觉值清单:颜色/字号/间距/留白/圆角/描边/阴影/卡片样式
  - 高保真不再区分来源(设计系统内/竞品/活动稿)——一律按"提取意图、不照搬数值、回到 tokens"处理
  - 高保真允许在设计系统范围内做 polish:层级优化/留白优化/样式 polish/状态补全
  - 高保真组件清单减重:开工前用一句话说明会用到哪些组件、哪些区域是 custom module
  - 多张图分别判断角色;混合附件走 §6
影响:所有上传图片附件的伙伴端开工流程。无运行时校验,延续 V0 三层机制。
处理方式:
  - 文档:docs/INPUT_SOURCE_RULES.md 新增 §0.1「图片附件特别说明」,改写 §2/§3
```

```text
HARNESS-INPUT-V0.2
来源等级:suspected
反馈来源:suspected (维护者上传复杂附件实测 agent 卡在生成前不落文件 + 与 agent 讨论后达成共识 — 待伙伴端复现转 confirmed)
问题:V0.1 解决了"图片该怎么读"(低/高保真识别 + 防污染),但没解决"复杂附件读完后 agent 直接想一口气吐完代码导致卡住"。具体表现:
  (a) 伙伴上传多屏拼接 / 多状态 / 带流程箭头的原型,agent 在内部理解了内容但准备一次性生成完整页面时卡住,伙伴等很久看不到产物
  (b) agent 不知道什么算"复杂"——模糊词会要么每次都触发(伙伴烦)要么从来不触发(继续卡)
  (c) 摘要 + 等回复模式如果没有兜底,会从"卡在生成"变成"卡在等回复"
判断:B 类(专业判断跑偏)流程层规则。复杂附件强制"先理解再生成"两段式,触发条件可执行可判断,无回复有兜底。
规则:
  - 触发条件(任一命中):≥3 张图,或单图 ≥2 屏拼接;图上有流程箭头/状态转移线/跳转关系;同一页面 ≥3 个状态;伙伴明说"以原型为准/严格还原/不能删减";单次输入 ≥4 个独立模块/页面
  - 触发后第一段:先输出附件理解摘要(图角色判断/页面模块清单/必须保留信息/视觉处理引用 §2/§3/组件映射一句话),不进入代码生成
  - 触发后第二段:等伙伴回复
    * 明确确认 → 生成,开工补一句"按摘要执行"
    * 修订意见 → 改摘要再等
    * 一回合无回复 → 默认按摘要继续生成,开工必须主动说"未收到异议,按摘要执行;如有偏差请按 HARNESS_FEEDBACK.md 反馈"
  - 不触发:单图 + 单页面 + 状态 ≤2 + 无严格还原要求 → 直接按 §2/§3,不强制摘要
影响:所有触发复杂附件条件的伙伴端开工流程。摘要这一步不是"问伙伴怎么做",是 agent 自己写明白避免走偏 + 留追溯。无运行时校验,延续三层机制。
处理方式:
  - 文档:docs/INPUT_SOURCE_RULES.md 新增 §0.2「复杂图片输入的执行节奏」
```

```text
HARNESS-INPUT-V0.3
来源等级:confirmed
反馈来源:dogfood 2026-06-04 (codex conversation 019e9262-7631-78e2-b8ae-fca32c3def0b)
关联 HI:HI-001
问题:产物视觉明显偏离转转工具型页面风格——删除分组、特征标签、隐私分类的左侧图标统一刷成 var(--zd-color-link)蓝色(原仓库为 --zz-link),跟低保真稿里的彩色分类图标如出一辙。根因是 token 用对了变量但用错了语义:--zd-color-link 是链接/信息入口色,被当成"分类装饰色"批量使用。
判断:B 类(专业判断跑偏)。"用没用 token / 用没用真组件"是结构层校验,不能覆盖语义层(token 用在对的场景)。语义边界靠 case 列举永远列不完,先把 INPUT_SOURCE_RULES 加一节"token 语义边界",按真实反馈累积——不一次铺死,边搭组件边应用边沉淀。
规则:
  - INPUT_SOURCE_RULES §2.1 新增"低保真图标污染":图标颜色不能继承,工具型页面默认不补彩色分类图标,必须用图标时走 var(--zd-color-text-tertiary) 中性色
  - INPUT_SOURCE_RULES §2.2 新增"token 语义边界",首批沉淀 --zd-color-link / --zd-color-primary / --zd-color-text/-secondary/-tertiary/-muted 的 ✓ 用法和 ✗ 反例;后续每次踩坑追加一条
  - 自查清单:批量出现 --zd-color-link / --zd-color-primary 着色 Icon(≥2 处)需要在 DECISIONS.md 说明理由
影响:
  - INPUT_SOURCE_RULES.md(新增 §2.1 + §2.2)
  - 后续所有低保真为输入源的工具型页面(设置/法务/表单/隐私/我的等)
处理方式:
  - 文档:docs/INPUT_SOURCE_RULES.md §2.1 + §2.2
  - 自查清单:在 docs/COMPONENT_USAGE.md「生成自查清单」加一条
  - 已实测(旧仓库):privacy-personal-info-rights 命中 warning(2 处 Icon 滥用 link);sell-phone-easy 干净放行,未误报
  - 后续:每次出现 token 语义错位,在 §2.2 追加一条
```

```text
HARNESS-COLOR-V0.1
来源等级:cold-start
反馈来源:cold-start (与 HARNESS-INPUT-V0.3 同期,扩展为颜色意图三声明)
问题:V0.3 卡住"低保真彩色分类图标污染"后,实战发现还有更广的色彩使用模糊地带:
  (a) 用户在指令里说"右值标红 / 用蓝色高亮"——这是用户授权,不应该被 agent 一律拒
  (b) 用户交了高保真稿且明确说"按这套颜色走"——这是项目级许可,不应该 case-by-case 解释
  (c) 没说但 agent 觉得"这里应该用蓝色显得有重点"——这才是真该拒的"AI 自由发挥"
原 V0.3 只列白名单 + 反例,没区分"用户授权 vs agent 自作主张",一刀切会误伤合法的用户授权。
判断:B 类(专业判断跑偏)。把"颜色合法性"从静态白名单升级为"白名单 + 三声明":default(全套白名单)/ user-spec(用户当条指令明说)/ hifi-license(高保真稿带项目级颜色许可),每种声明都要落证据,缺证据 = 自查 FAIL。
规则:
  - 默认白名单:--zd-color-text / -secondary / -tertiary / -muted / --zd-color-primary
  - 禁用 token:--zd-color-link 只能用在真链接、真导航位
  - 模式 A · default:全套白名单,无声明
  - 模式 B · user-spec:文件首 5 行 // HARNESS-COLOR-INTENT: user-spec + .harness-evidence/USER-COLOR-SPEC.md(含用户原话 + 命中色值 + scope)
  - 模式 C · hifi-license:文件首 5 行 // HARNESS-COLOR-INTENT: hifi-license + .harness-evidence/PROJECT-COLOR-LICENSE.md(含 hifi-source 路径 + approved-tokens 清单 + reason)+ 高保真稿件本体可访问
  - 判断不准:默认走 --zd-color-text-secondary 或 -tertiary,不切模式
影响:所有使用品牌色 / 链接色 / 用户指定色的产物。
处理方式:
  - 文档:docs/INPUT_SOURCE_RULES.md §2.4「颜色意图三声明」
  - 自查清单:agent 生成完后核 .harness-evidence/ 是否齐
```

```text
HARNESS-ICON-V0.1
来源等级:cold-start
反馈来源:cold-start (与 V0.3 同期,扩展为图标风格规则)
问题:agent 拿到带图标的高保真稿,容易把"面型 / 带底色块"的图标风格直接照搬到工具型页面,违反转转 C 端"线稿、透明底、同页不混搭"的默认风格。
判断:B 类(专业判断跑偏)。图标风格属于设计系统硬约束,但允许"用户明说参考此图标风格 + 输入源是高保真稿"两条同时成立时破例。
规则:
  - 默认:线稿、透明底、同页不混搭(线性 / 面型 / 带底色块 三种里只能用一种,工具型页面默认线性)
  - 例外触发(两条同时成立):输入源是高保真稿 AND 用户在文字指令里明确点出"参考此图标风格 / 图标风格按稿走"
  - 例外触发时落证据:.harness-evidence/ 写一行 "image=<高保真文件名>; instruction=<用户原话>"
  - 只满足其中一条不成立 → 仍按默认规则
影响:所有装饰图标、分类图标、列表前缀图标。
处理方式:
  - 文档:docs/COMPONENT_USAGE.md「图标风格规则」+ docs/INPUT_SOURCE_RULES.md §2.3 / §3 末尾
```

```text
HARNESS-ISSUES-V0.4
来源等级:cold-start
反馈来源:与维护者 + 多 agent 协商,2026-06-05
问题:V0.3 之前,Harness 反馈在 GitHub Issue 提一次后,后续状态只能靠维护者口头记忆 + CHANGELOG-RULES 推断。伙伴回过头问"我提的那个反馈现在怎么样了"时,agent 没法快速给出业务语言的答复(open / triaged / resolved / deferred);维护者裁判过的 case 也没有统一归档,容易丢。
判断:A 类(客观流程缺陷)Harness 案件管理断点。这条不是规则补丁,是反馈管道补丁——给每条反馈一个 HI-XXX 编号,docs/HARNESS_ISSUES/ 归档。优先级高于继续补具体规则。
规则:
  - docs/HARNESS_ISSUES.md 新增,作为案件汇总表 + 评级体系(confirmed/suspected/example/cold-start + A/B/C)+ 状态流转(open/triaged/resolved/deferred)
  - docs/HARNESS_ISSUES/_template.md 新增,六节模板
  - docs/HARNESS_ISSUES/001.md 回填,把 V0.3 的 privacy-personal-info-rights 案件归档为首例样本
  - 补充关系:GitHub Issue 是伙伴提交入口,HARNESS_ISSUES/ 是维护者归档,CHANGELOG-RULES 是规则演进账本——三层互不重叠
影响:
  - docs/HARNESS_ISSUES.md(新增)
  - docs/HARNESS_ISSUES/_template.md(新增)
  - docs/HARNESS_ISSUES/001.md(新增)
处理方式:
  - 文档:docs/HARNESS_ISSUES.md + docs/HARNESS_ISSUES/_template.md + docs/HARNESS_ISSUES/001.md
  - 后续每条 Harness 反馈都先建 HI-XXX,再决定是否产出 CHANGELOG 规则块
```

```text
HARNESS-MIGRATION-V0.1
来源等级:confirmed
反馈来源:仓库迁移,2026-06-08(从 GuoNB666/zhuanzhuan-design-system → tobiyoinoyy/zhuan-design-system-figma)
问题:旧仓库(HTML + 内联 React + Babel + workbench 后台 + bundle 重打)组件代码臃肿、维护成本高,但 Harness 规则体系(AGENTS / DESIGN / COMPONENT_USAGE / INPUT_SOURCE_RULES / 反馈回流)是有效资产,不该被组件代码重构连带丢失。
判断:A 类(客观流程缺陷)。规则与代码载体应该解耦——载体可以换成 Vite + React + TS,规则照样跑。
规则:
  - 只搬规则文档与方法论,不搬旧 workbench / bundle / outputs 业务页生成体系
  - token 命名统一改为 --zd-* 系列(原 --zz-* 不再延续)
  - 路径基准从 packages/design-system/ui_kits/zhuan-app/<Name>.jsx 换成 src/components/<Aggregate>.tsx
  - 首次迁移时,旧 audit 脚本(scripts/audit-generated-project)改成"agent 自查清单 + 反馈回流",未复制脚本本体——脚本依赖旧 workbench 上下文,迁移成本高于价值
  - 2026-06-09 同事补充包并入后,按 HARNESS-SUPPLEMENT-2026-06-09 重新引入"当前工程重写版" `scripts/audit-generated-project`,不是旧脚本原样复制
  - 旧仓库的 DISPATCH / BOOTSTRAP / PULL-RESTORE 三组规则不搬:这些都跟旧仓库的 workbench 后台分发指令绑定,新仓库使用方式是 git clone + npm install + 直接读 docs/,不需要分发管道
  - 价格组件 PriceBlock 统一改名 Price(对齐新仓库 Batch 02 结构)
  - 旧"操作红 #FF0007"显式收敛进 --zd-color-primary #FF0F27,不再独立暴露
  - 反馈回流案件 HI-001 整体迁移,token 名同步改写
影响:
  - 新仓库 AGENTS.md / docs/DESIGN.md / docs/COMPONENT_USAGE.md / docs/INPUT_SOURCE_RULES.md / docs/HARNESS_FEEDBACK.md / docs/HARNESS_ISSUES.md / docs/HARNESS_ISSUES/{_template,001}.md / docs/CHANGELOG-RULES.md(本文)/ docs/MIGRATION_PLAN.md
  - 旧仓库继续保留只读,仍可作为 Harness 历史档案查阅
处理方式:
  - 文档:全套 docs/ + AGENTS.md 一次性新建/重写
  - 自查清单替代 audit:在 docs/COMPONENT_USAGE.md「生成自查清单」段落落地
  - 后续:伙伴端实测,真出现"旧规则没搬干净"或"新仓库需要新规则"时按 CHANGELOG 增量追加
```

```text
HARNESS-SUPPLEMENT-2026-06-09
来源等级:confirmed
反馈来源:同事训练补充包 /Users/zz/Downloads/合并给朱艺权-2026-06-09.zip + 维护者要求"改写谨慎,规则和约束完整性不能剔除"
问题:补充包里包含一套更完整的 Harness / agent 规则,但它基于旧仓库结构(packages/design-system、runtime bundle、outputs、workbench-bootstrap、--zz-* token)。如果直接覆盖当前工程,会把已经适配好的 Vite + React + TS 结构写坏;如果只挑几条复制,又会丢失规则完整性。
判断:A 类(迁移完整性风险)。规则语义必须完整保留,执行载体必须谨慎转译。旧 workbench 命令不适用于当前工程,但其约束目的(开工同步、预览审批、审查证据、反馈回流)必须在当前工程中有等价落点。
规则:
  - 新增 docs/HARNESS_SUPPLEMENT_2026_06_09.md,逐条说明补充包文件、旧概念到当前工程映射、完整保留的约束、未原样复制的旧载体
  - 新增 docs/AI_UI_WORKFLOW.md,固化 GitHub 工程包 → agent 代码预览 → 浏览器审批 → Figma MCP 可编辑交付工作流
  - 新增 CONTRIBUTING.md,保留多人协作、分支、PR、决策权和反馈分流规则,但不硬编码旧仓库路径
  - docs/INPUT_SOURCE_RULES.md §2.4 升级为 HARNESS-COLOR-V0.2:全字段颜色硬拦、user-spec 用户原话颜色词校验、hifi-license 证据校验
  - docs/INPUT_SOURCE_RULES.md 新增 §2.5 跨产物参考规则:复用旧产物必须声明 BASED-ON.md 且 source-audit-status=pass
  - scripts/audit-generated-project 重写为当前工程版:检查真实组件调用、手写替代、图标绕过、价格字段、外部字体、AI slop 效果、颜色证据、跨产物溯源
  - package.json 新增 npm run audit:generated;README.md / AGENTS.md 接入 workflow、补充包说明和审查命令
影响:
  - docs/AI_UI_WORKFLOW.md
  - docs/HARNESS_SUPPLEMENT_2026_06_09.md
  - CONTRIBUTING.md
  - docs/INPUT_SOURCE_RULES.md
  - scripts/audit-generated-project
  - package.json
  - README.md
  - AGENTS.md
处理方式:
  - 不覆盖当前 AGENTS / INPUT_SOURCE_RULES / CHANGELOG-RULES
  - 不复制旧 workbench / runtime / outputs 命令
  - 所有旧 --zz-* 规则转译为 --zd-*;所有旧 packages/design-system 规则转译为 src/components / src/tokens / src/styles / public assets
  - 旧规则完整性通过 HARNESS_SUPPLEMENT_2026_06_09.md 保留可追溯说明
```
