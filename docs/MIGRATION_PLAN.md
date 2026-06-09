# 规则迁移计划 (MIGRATION_PLAN)

> 这份文件是从旧仓库 [`GuoNB666/zhuanzhuan-design-system`](https://github.com/GuoNB666/zhuanzhuan-design-system) 把 **规则文档与方法论** 迁移到本仓库 [`tobiyoinoyy/zhuan-design-system-figma`](https://github.com/tobiyoinoyy/zhuan-design-system-figma) 的对照清单。
>
> 不是"把旧仓库整体迁过来"——旧仓库的 HTML+内联 React+Babel 组件、workbench 后台、bundle 重打、outputs 业务页生成体系,**有意不搬**。
>
> 用法:
> - 找一条旧规则在新仓库的位置 → 看「P0 / P1 必搬清单」
> - 知道哪些没搬、为什么 → 看「P2 不搬清单」
> - 看 token / 路径 / 组件名怎么改写的 → 看「改写约定」

---

## 0. 一图看全

```
旧仓库(只读)                                  本仓库
zhuanzhuan-design-system/                       zhuan-design-system-figma/
├── AGENTS.md (382 行)              ──→        ├── AGENTS.md (266 行,精简版)
├── CLAUDE.md (256B)                ──→        ├── CLAUDE.md (待补,#12)
├── docs/
│   ├── DESIGN.md (308 行)          ──→        ├── docs/DESIGN.md (重写,token 名换)
│   ├── COMPONENT_USAGE.md (288)    ──→        ├── docs/COMPONENT_USAGE.md (重写,路径换)
│   ├── INPUT_SOURCE_RULES.md (446) ──→        ├── docs/INPUT_SOURCE_RULES.md (重写,token 换)
│   ├── HARNESS_FEEDBACK.md (113)   ──→        ├── docs/HARNESS_FEEDBACK.md (URL 换仓库)
│   ├── HARNESS_ISSUES.md (92)      ──→        ├── docs/HARNESS_ISSUES.md (汇总表保留)
│   ├── HARNESS_ISSUES/
│   │   ├── _template.md (1958B)    ──→        │   ├── HARNESS_ISSUES/_template.md
│   │   └── 001.md (2965B)          ──→        │   └── HARNESS_ISSUES/001.md (token 换)
│   ├── CHANGELOG-RULES.md (286)    ──→        ├── docs/CHANGELOG-RULES.md (剔除 DISPATCH 系)
│   ├── DISPATCH.md (5157B)         ──✗        │
│   └── COMPONENT_API.md (子目录)   ──部分     │   (语义边界写进 COMPONENT_USAGE.md)
├── packages/design-system/         ──✗        │   (新仓库已有 Vite + TS 实现)
│   └── ui_kits/zhuan-app/*.jsx                │
├── workbench/                      ──✗        │
├── scripts/                        ──✗        │   (audit 改成 agent 自查清单)
│   ├── audit-generated-project                │
│   ├── workbench-bootstrap                    │
│   └── ...                                    │
└── outputs/                        ──✗        │   (业务项目生成不在本仓库)
```

`──→` 已迁移  `──部分` 部分迁移  `──✗` 故意不搬

---

## 1. P0 必搬清单(已完成)

这一档是设计系统的**硬约束 + 流程基础**。没了这些,agent 不知道怎么开工、不知道边界在哪。

| 旧文件 | 新文件 | 状态 | 关键改动 |
|---|---|---|---|
| `AGENTS.md` | `AGENTS.md` | 完成 | 精简到 266 行;删除 §4 工作台命令、§0.5 git pull 流程、scripts/* 引用;新增"开工自查清单"代替 audit |
| `docs/DESIGN.md` | `docs/DESIGN.md` | 完成 | token 名 `--zz-*` → `--zd-*`;"操作红 #FF0007" 显式收敛进 `--zd-color-primary` `#FF0F27`;§3.1-3.7 BrandModelCard / SortDropdown 等抽到 COMPONENT_USAGE.md;§8 营销例外原样保留 |
| `docs/COMPONENT_USAGE.md` | `docs/COMPONENT_USAGE.md` | 完成 | 删除运行时加载段(行 37-50);路径基准换 `src/components/<Aggregate>.tsx`;PriceBlock → Price;45 vs 旧 41 图标不强映射,只保留风格规则 |
| `docs/INPUT_SOURCE_RULES.md` | `docs/INPUT_SOURCE_RULES.md` | 完成 | 6 类输入源 + V0~V0.3 规则保留;§2.1 / §2.2 token 名换;`scripts/audit-generated-project [8]` 改"agent 自查 + 反馈回流";`examples/verified/marketing/` 改"业务项目自建 + DECISIONS.md 登记" |

---

## 2. P1 必搬清单(已完成)

反馈回流闭环。让 agent 不只跑规则,还能在踩坑后把规则迭代回来。

| 旧文件 | 新文件 | 状态 | 关键改动 |
|---|---|---|---|
| `docs/HARNESS_FEEDBACK.md` | `docs/HARNESS_FEEDBACK.md` | 完成 | GitHub URL 换 `tobiyoinoyy/zhuan-design-system-figma`;token 名换 `--zd-*`;引用换 `COMPONENT_USAGE.md` |
| `docs/HARNESS_ISSUES.md` | `docs/HARNESS_ISSUES.md` | 完成 | 汇总表保留 HI-001 行;删旧 audit 引用 |
| `docs/HARNESS_ISSUES/_template.md` | `docs/HARNESS_ISSUES/_template.md` | 完成 | 14 字段保留原样;outputs/ 路径改"业务项目本地路径" |
| `docs/HARNESS_ISSUES/001.md` | `docs/HARNESS_ISSUES/001.md` | 完成 | token `--zz-link` → `--zd-color-link`;关联产物改"旧仓库 dogfood 样本,本仓库不搬具体产物,只搬规则结论";规则产出落点改 INPUT_SOURCE_RULES.md §2.1 / §2.2 + agent 自查清单(audit [8] 移除) |
| `docs/CHANGELOG-RULES.md` | `docs/CHANGELOG-RULES.md` | 完成 | 保留 HARNESS-001/002/003 + INPUT-V0/V0.1/V0.2/V0.3 + COLOR-V0.1/V0.2 + ICON-V0.1 + ISSUES-V0.4;DISPATCH / BOOTSTRAP / PULL-RESTORE 不按旧 workbench 执行,但其"开工同步 / 失败停下 / 不破坏仓库"约束已转译到 `HARNESS_SUPPLEMENT_2026_06_09.md`;新增 HARNESS-MIGRATION-V0.1 + HARNESS-SUPPLEMENT-2026-06-09 |

---

## 3. P2 不搬清单(故意保留旧仓库)

旧仓库这些资产不是"过时",而是**和载体绑死**。新仓库换到 Vite + React + TS 后,它们要么没用、要么得彻底重写,代价远高于收益。需要时直接去旧仓库查。

### 3.1 workbench 后台 + bundle 重打

| 旧资产 | 不搬理由 |
|---|---|
| `workbench/`(整目录) | 旧仓库的运行时是 HTML + Babel inline + 工作台后端,提供"伙伴上传 → 在线渲染 → 下载"的闭环。新仓库是 Vite + TS,启动方式 `npm run dev`,不需要工作台后端 |
| `scripts/workbench-bootstrap` | 同上,bootstrap 是给旧工作台分发管道用的,新仓库 `git clone + npm install + npm run dev` 三步走,不需要 |
| `scripts/audit-generated-project` | 旧脚本不原样复制;2026-06-09 根据同事补充包要求已按当前工程重写为 Vite/React/`--zd-*`/`ZhuanIcon` 版本,用于补充 agent 自查清单 |
| `runtime/zhuan-app.bundle.js` | 旧仓库为了 HTML 内联 React 打的 bundle,新仓库已经是真 TS 模块,不需要 |

### 3.2 分发指令体系

| 旧资产 | 不搬理由 |
|---|---|
| `docs/DISPATCH.md` | 旧仓库 V1.2~V1.4 是为"维护者把仓库拉到伙伴电脑、跑工作台、生成业务项目"这个分发管道服务的。本仓库使用方式更标准(就是个普通 npm 项目),不需要这套指令 |
| `templates/partner-distribution-instructions.md` | 同上,分发管道的模板,新仓库用不到 |
| 对应 CHANGELOG 条目 | 不按旧 workbench 命令执行;其约束语义见 `docs/HARNESS_SUPPLEMENT_2026_06_09.md` 与 `HARNESS-SUPPLEMENT-2026-06-09` |

### 3.3 业务项目生成体系

| 旧资产 | 不搬理由 |
|---|---|
| `outputs/`(业务页) | 旧仓库的 outputs 是 dogfood 样本(privacy-personal-info-rights / sell-phone-easy 等),用来回流反馈。本仓库定位是"设计系统本身",业务项目应该在另外的仓库或本地路径生成,只把规则反馈回来 |
| `examples/verified/marketing/` 模式 | 改写成"业务项目自建 + DECISIONS.md 登记",见 `docs/INPUT_SOURCE_RULES.md` §6 / §7 |
| `.harness-evidence/` 自动生成 | 旧 audit 脚本附带行为,新仓库改成 agent 在 DECISIONS.md 里手工记录 |

### 3.4 旧组件代码

旧 `packages/design-system/ui_kits/zhuan-app/*.jsx` 全部不搬。新仓库已经在 `src/components/` 下用 TS + Vite 重写过(18 个聚合 barrel,见 README Batch 00~07)。两份组件代码并存只会引发"看哪份"的歧义。

如果未来发现某个组件在旧仓库有但新仓库没实现,**单独立 issue / 在 README 里登记**,不要把旧 JSX 复制粘贴进来——风格已经分叉。

### 3.5 子组件 API 文档

| 旧资产 | 处理 |
|---|---|
| `docs/COMPONENT_API/` 子目录 | 不全量搬。规则相关部分(字段语义边界、HARNESS-001/002/003)已写进 `docs/COMPONENT_USAGE.md`;具体每个组件的 props metadata 应该靠 TS 类型定义自动暴露,不需要再维护一份 markdown |

---

## 4. 改写约定(全局生效)

这一节是**所有从旧仓库往新仓库搬的文档**统一的改写约定。后续如果还要补搬规则,继续按这套写。

### 4.1 token 命名

| 旧 | 新 | 备注 |
|---|---|---|
| `--zz-brand-red` | `--zd-color-primary` | `#FF0F27`,操作红 `#FF0007` 显式收敛进来 |
| `--zz-brand-soft` / `#FFF2F2` | `--zd-color-primary-soft` | `#FFF2F2` |
| `--zz-link` | `--zd-color-link` | `#00A3FF` |
| `--zz-fg-1` | `--zd-color-text` | `#111` |
| `--zz-fg-2` | `--zd-color-text-secondary` | `#666` |
| `--zz-fg-3` | `--zd-color-text-tertiary` | `#999` |
| `--zz-fg-4` | `--zd-color-text-muted` | `#BBB` |
| 其它 `--zz-*` | 查 `src/tokens/colors.ts` 里 30 个 token 找对应名 | 找不到的优先用语义最接近的 |

完整 30 个 token 见 `src/styles/tokens.css` + `src/tokens/colors.ts`。

### 4.2 路径基准

| 旧 | 新 |
|---|---|
| `packages/design-system/ui_kits/zhuan-app/<Name>.jsx` | `src/components/<Aggregate>.tsx` |
| `packages/design-system/tokens/zhuan-app/tokens.css` | `src/styles/tokens.css` |
| `packages/design-system/icons/zhuan-app/` | `public/icons/figma-mcp/` |
| `outputs/<项目名>/` | (业务项目本地路径,不在本仓库内) |

聚合 barrel 列表(18 个):Button / Tabs / SearchHeader / Switch / Form / Feedback / Filter / Navigation / Product / Sheet / Dialog / ColorTokens / OrderCard / Device / Brand / Business / Templates。

### 4.3 组件名映射

| 旧 | 新 | 备注 |
|---|---|---|
| `PriceBlock` | `Price` | 新仓库 Batch 02 |
| `BrandModelCard` | (待核对,可能在 `Brand.tsx` 里) | #13 启动 dev 后核对 |
| `SortDropdown` | (待核对,可能在 `Filter.tsx` 里) | #13 启动 dev 后核对 |

### 4.4 工具/脚本引用

| 旧 | 新 |
|---|---|
| `scripts/audit-generated-project` | `scripts/audit-generated-project`(当前工程重写版)+ "生成自查清单"(`docs/COMPONENT_USAGE.md` 末段) |
| `scripts/workbench-bootstrap` | (无替代,新仓库不需要) |
| `audit [N]` 编号 | 改写成"自查清单第 N 条"或直接引规则名 `HARNESS-XXX` |

### 4.5 GitHub 链接

| 旧 | 新 |
|---|---|
| `https://github.com/GuoNB666/zhuanzhuan-design-system` | `https://github.com/tobiyoinoyy/zhuan-design-system-figma` |
| Issue 模板 / 反馈通道 URL | 同步换 |

---

## 5. 还没做的事(后续 todo)

- [ ] **CLAUDE.md 写入口指引**(#12):指向 `AGENTS.md` + `docs/DESIGN.md` + `docs/INPUT_SOURCE_RULES.md` 三入口
- [ ] **README.md 行 19 修订**(#12):"41 icon variants" → 45
- [ ] **README.md 加 docs/ 目录索引**(#12):新增"📚 设计规则"段,链向新搬的 8 份文档
- [ ] **`npm install` + `npm run dev` 验证未改坏**(#13):确保只动 markdown 没破坏构建
- [ ] **`/Users/zz/Documents/杂物/工作md/` 归档**(#14)
- [ ] **列动过文件给用户审**(#15)

未来真发现旧仓库还有规则没搬过来的,按 `docs/CHANGELOG-RULES.md` 的格式追加一条 `HARNESS-MIGRATION-V0.X`,在「关联 HI」字段写上对应 issue 编号。

---

## 6. 维护原则

- **旧仓库保持只读**。不要回去改旧仓库的规则,所有规则迭代都在本仓库做。
- **改组件不动规则,改规则不动组件**。两边解耦的好处就在于此。
- **规则文档之间引用尽量用相对路径**(`./HARNESS_ISSUES.md` / `../AGENTS.md`),不写绝对路径。换仓库地址时不用全量替换。
- **废止旧规则不删除**,在 CHANGELOG-RULES.md 把"处理方式"改成"已废止(原因)"。
