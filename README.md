# Keyang Zhong · 粉色学术主页

这是一套部署到 GitHub Pages 的静态个人主页，采用 HTML、CSS 和少量 JavaScript。当前使用带有 SCOUT、StreamSpatial 论文 overview 图的侧栏模板，并保留 Awesome Streaming Video Understanding 与 StreamSpatial 两个独立的 GitHub 仓库分享卡片。无需安装 npm、Jekyll 或数据库。

本文件说明源码的发布与修改方法。源码包和预览页面并不代表已经向你的 GitHub 账户上传文件；GitHub 上的实际发布状态，以对应仓库的 Pages 设置和部署结果为准。

## 1. 发布到你的 GitHub 账户

目标账户为 **Yang011013**。根据 GitHub 官方命名规则，用户名包含大写字母时，用户站仓库名使用小写：[官方创建指南](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。

| 设置项 | 填写内容 |
| --- | --- |
| Owner | `Yang011013` |
| Repository name | `yang011013.github.io` |
| 仓库完整名称 | `Yang011013/yang011013.github.io` |
| 发布后的目标网址 | `https://yang011013.github.io/` |
| 发布分支 | `main` |
| 发布目录 | `/(root)` |

### 上传源码

1. 登录 `Yang011013` 账户，新建上述名称的仓库。GitHub Free 账户使用公开仓库。若该仓库已存在，先检查已有内容，再将这版主页作为更新提交。
2. 解压源码包，把里面的 **文件和 `assets` 文件夹** 上传至仓库根目录。打开仓库时应能直接看到 `index.html`，不要让它藏在一层额外的压缩包文件夹里。
3. 一并保留根目录下的 `.nojekyll`。它是一个空文件，用于关闭默认的 Jekyll 处理；若上传时被文件管理器隐藏，可在 GitHub 用 **Add file → Create new file** 补建 `.nojekyll`。
4. 将文件提交到 `main` 分支。

### 启用 Pages

进入仓库 **Settings → Pages → Build and deployment**，设置：

- **Source：Deploy from a branch**
- **Branch：main**
- **Folder：/(root)**

点击 **Save**。等待 GitHub 的部署任务完成后，在 Pages 页面点击 **Visit site**。如未显示成功，查看仓库 **Actions** 页的部署任务与报错。此项目不需要另写构建 workflow，也不需要配置自定义域名。

上传内容需要该账户或仓库的写入权限；修改 Pages 发布源需要仓库管理员或维护者权限。仅提供 GitHub 公开主页链接，不会自动授予这些权限。[官方发布源说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 2. 后续编辑哪些文件

| 文件 | 用途 |
| --- | --- |
| `index.html` | 姓名、简介、研究方向、论文、经历、联系链接及页面元信息 |
| `assets/styles.css` | 粉色配色、字体、间距、圆角、桌面与手机布局 |
| `assets/main.js` | 页面已有的菜单与交互行为 |
| `assets/images/` | 头像、论文缩略图和页面图像 |
| `.nojekyll` | 保持为空，部署时保留 |
| `LICENSE` | 模板许可说明，保留 |

### 修改文字、头像与经历

在 `index.html` 中搜索页面上对应的现有文字，替换文字部分；保留周围的 HTML 标签、`id`、`class` 和 `data-*` 属性。调整身份、学校或姓名时，也同步查看 `<title>` 与 `<meta name="description">`。

更换头像时，将新图片放入 `assets/images/`，然后更新对应 `<img>` 的 `src` 和 `alt`。建议使用清晰、便于裁切的方形照片。文件名使用英文、数字和连字符，大小写与路径完全一致。

新增经历时，复制一条现有经历的完整 HTML 区块，替换时间、机构、职位和描述，并按页面现有顺序排列。

### 新增论文

复制一篇现有论文的完整条目，替换论文标题、作者、会议或期刊、年份、简介、缩略图以及 Paper / Code 等链接。将自己的姓名继续用现有的加粗格式标出；只有论文原文或官方页面确认共同一作时才保留相应标记。

若条目带有分类属性、折叠摘要、引用内容或唯一 `id`，同步更新这些内容，避免复制后产生重复 ID 或分类错误。没有公开代码或 PDF 时，删除相应按钮；不填写猜测链接，也不使用 `#` 冒充可访问资源。

### 调整粉色主题

优先修改 `assets/styles.css` 中已有的颜色变量或颜色值，保持整个站点的一致性。浅粉适合背景与装饰，正文和主要链接使用较深颜色，确保手机上也容易阅读。修改后同时检查桌面与窄屏布局。

## 3. 本地预览与更新

可以直接用浏览器打开 `index.html`。如需通过本地 HTTP 预览，在源码根目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/`。这个命令仅用于本地预览，GitHub Pages 发布时不需要 Python。

每次修改后，检查姓名与日期、论文作者顺序、所有按钮和链接、图片加载、手机排版。将修改提交到 `main` 后，GitHub 会按已配置的发布源更新网站；发布进度以 Actions / Pages 的实际状态为准。

## 4. 学术信息的核对原则

主页依据已取得的个人资料与公开学术来源整理；它不是实时同步的学术档案。论文状态、作者顺序、会议年份、机构与经历日期，应以你确认的记录以及论文、会议或机构的官方页面为准。

未核实的教育起止年月、导师、奖项、个人邮箱和经历细节不应自行补写。尚未公开的研究工作应在你确认可以公开后再加入；投稿中、已接收和正式发表需分别准确标注。若添加审稿经历，使用与你实际身份一致的描述，不把协助导师审稿自动写成独立受邀审稿。

## 5. 模板来源与许可

本主页以 [Yaoyao Liu 的 Minimal Light](https://github.com/yaoyao-liu/minimal-light) 为主要模板参考，针对粉色学术主页重新调整配色、排版和内容。Minimal Light 官方提供可直接编辑的 `html_source_file` 静态版本，并采用 **CC0 1.0 Universal** 许可。

- [模板演示](https://minimal-light-theme.yliu.me/)
- [模板使用说明](https://github.com/yaoyao-liu/minimal-light/blob/main/README.md)
- [原始许可证](https://github.com/yaoyao-liu/minimal-light/blob/main/LICENSE)

原模板的 CC0 许可不表示个人照片、论文插图和其他第三方素材也自动适用同一许可；这些素材仍归各自权利人所有。

部署步骤依据 2026 年 11 月 17 日查阅的 GitHub 官方文档整理。
