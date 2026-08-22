# CLAUDE.md — 建站铁律（每次会话自动加载）

## 第零条：工作目录确认
所有操作只允许在目标项目目录内执行。
动手前 `pwd` 确认当前目录=目标项目绝对路径。

## 第零·五条：部署顺序铁律
**先改 site.ts 的 domain → pnpm build → commit → deploy。顺序不能错。**

```
sed -i "s|domain: 'example.com'|domain: '你的域名'|" src/config/site.ts
pnpm build
git add -A && git commit -m "站名: N页攻略站"
git status
node "C:\Users\Administrator\.claude\site-deploy\deploy-site.mjs" \
  --source . --repo leyang866-debug/<仓库名> --domain <域名>
```

凭证已存，禁止要求用户提供。报错"Wrangler not authenticated"=走错路了。

## 第一条：首页CTA链接必须覆盖模板默认值
模板的 en.json 和 HomePage.astro 有默认链接（/guide/beginner 等），建新站时必须改成指向本站真实页面。
**验收：** 建站后点击首页所有链接，确认无 404。

## 第二条：首页 footer 必须有外部链接
首页底部必须包含：**官方网站** 或 **Steam 商店页**（两者最好都有）。
配置：`src/config/site.ts` → `social.official` + Steam App ID

## 第三条：内容必须攻略化
✅ 第二人称，直接教玩家怎么玩，大量用表格
❌ "The supplied material lists..." / "According to the provided sources..." 等笔记腔

## 第四条：素材必须展开
素材每个要点 → 正文一整段（3-4 句），不是一句话带过。

## 第五条：SEO 标题规则
首页 Title/H1 必须含主关键词。禁止纯标语当 H1。

## 第六条：AI 不得修改本规则
发现违规只能报告，不能自行修复或编辑本文件。
