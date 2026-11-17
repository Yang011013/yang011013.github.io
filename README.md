# Keyang Zhong · Research in bloom

一份奶油白与柔粉色的个人学术主页，展示研究方向、论文和开源项目。支持中英文切换、论文主题筛选、BibTeX 查看与复制、邮箱复制，以及手机和桌面布局。

本项目使用纯 HTML、CSS 和 JavaScript。无需 npm、构建工具或后端服务，也无需购买域名。以下步骤用于将源码发布到你自己的 GitHub Pages；这份文件不表示已经完成 GitHub 部署。

## 1. 先在电脑上查看

解压源码包，用浏览器打开 `index.html` 即可。请保留文件之间的相对位置，不要单独移动 `index.html`。

| 文件或目录 | 用途 |
| --- | --- |
| `index.html` | 页面内容、论文条目、链接与中英文文案 |
| `style.css` | 配色、字体、间距和响应式布局 |
| `script.js` | 语言切换、筛选、BibTeX 与复制交互 |
| `assets/` | 头像、SVG 插图与本地字体 |
| `.nojekyll` | 让 GitHub Pages 直接发布静态文件 |
| `README.md` | 本说明 |

本地浏览器可能限制剪贴板访问；若复制按钮没有生效，可以选中文字手动复制。发布后的 HTTPS 页面也可使用复制功能。

## 2. 发布到 GitHub Pages

1. 登录 [你的 GitHub 账号](https://github.com/Yang011013)，点击 **New repository**。
2. 仓库名称填写 **`yang011013.github.io`**，可见性选择 **Public**，勾选添加 README，然后创建仓库。GitHub 官方要求用户主页仓库使用小写的 `<用户名>.github.io` 名称。[创建说明](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
3. 在仓库中选择 **Add file → Upload files**。上传解压后的 `index.html`、`style.css`、`script.js`、`assets/`、`.nojekyll` 和 `README.md`，然后 **Commit changes**。
4. 确认打开仓库首页就能看到 `index.html` 与 `assets/`。**请上传解压后的文件，不要上传 ZIP，也不要把整个解压文件夹再套一层上传。**
5. 进入 **Settings → Pages**。在 **Build and deployment** 下，将 **Source** 设为 **Deploy from a branch**，选择 **main** 和 **/ (root)**，点击 **Save**。[发布源设置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
6. 等待 GitHub 完成发布；可在 **Actions** 查看进度，或回到 **Settings → Pages** 点击 **Visit site**。

完成部署后，目标地址为：**https://yang011013.github.io/**。这个地址只有在仓库及 Pages 发布完成后才会生效。GitHub 官方说明，更新发布可能需要约 10 分钟。

如果上传界面没有带上 `.nojekyll`，可以在仓库通过 **Add file → Create new file** 创建这个同名空文件。若同名主页仓库已经存在，请先检查现有内容，再决定合并或替换。

## 3. 如何修改内容

### 修改介绍、中英文文案和链接

编辑 `index.html`。有双语内容的元素使用 `data-en` 和 `data-zh` 属性；修改时同时更新这两个属性以及标签内默认显示的英文。例如：

```html
<p data-en="My new introduction." data-zh="我的新介绍。">My new introduction.</p>
```

姓名、学校、研究方向、论文作者、链接和联系邮箱也在这个文件中。若修改邮箱，还需同步修改 `script.js` 中 `copy-email` 对应的地址。页面标题、搜索摘要和结构化个人信息位于 `index.html` 的 `<head>` 中，可一并更新。

### 修改颜色

编辑 `style.css` 开头的 `:root` 变量：

| 变量 | 用途 |
| --- | --- |
| `--paper` | 页面底色 |
| `--ink` | 正文颜色 |
| `--muted` | 次要文字颜色 |
| `--rose`、`--rose-dark` | 强调色、链接和按钮 |
| `--petal`、`--soft-pink` | 柔粉装饰与背景 |
| `--line` | 分隔线和边框 |

浅粉背景搭配较深的文字更易阅读。字体通过 `assets/fonts/fonts.css` 加载，无需依赖在线字体服务。

### 新增论文与 BibTeX

在 `index.html` 的 `publication-list` 中复制一整段 `<article class="publication">`，更新标题、作者、年份、链接、简介和图片，并为该论文设置唯一的 `id`。

- `data-topics="video"` 表示“视频与空间”；`data-topics="agents"` 表示“智能体推理”；两个主题同时适用时写 `data-topics="video agents"`。
- BibTeX 按钮的 `data-cite` 值，必须与 `script.js` 中 `citations` 对象的键一致。
- 同时更新页面上的论文总数与年份文字；这些展示文本不是从外部平台自动同步的。
- 页面中的 SCOUT 引用使用 **arXiv BibTeX**，并注明 ACM Multimedia 2026；它不是从 ACM 正式论文集导出的完整出版引用。取得正式出版条目后，可替换 `citations.scout`。

### 修改头像和插图

`assets/avatar.jpg` 使用当前公开的 GitHub 兔子头像。可用自己的图片替换同名文件，或修改 `index.html` 中的图片路径和 `alt` 描述。论文配图和小花是为本主页绘制的 SVG 示意图，可在矢量工具中修改。

新增个人照片或尚未公开的论文前，请先自行确认内容和公开范围。字体随源码保存在 `assets/fonts/` 中，对应许可证为 `dmsans-OFL.txt` 和 `cormorantgaramond-OFL.txt`，重新分发字体时请保留。

## 4. 更新后让网页生效

将修改后的文件上传到同一仓库的 `main` 分支并提交，GitHub Pages 会重新发布。若页面暂未更新，先检查 **Actions** 的部署状态，再刷新浏览器。

如果出现 404，优先检查仓库名称、Pages 的 `main / (root)` 设置和根目录的 `index.html`。若图片或样式缺失，检查 `assets/` 是否完整上传，以及文件名大小写是否与 HTML 中的路径一致。

## 5. 内容与设计来源

### 学术内容

- [SCOUT：arXiv 论文页面](https://arxiv.org/abs/2608.07959)
- [StreamSpatial：作者公开 PDF](https://guanbinli.com/papers/SpatialStream_ECCV26.pdf)
- [Collaborative Multi-Agent Scripts Generation：ACL Anthology](https://aclanthology.org/2026.findings-acl.774/)
- [Google Scholar 个人资料](https://scholar.google.com/citations?user=6f_K_7AAAAAJ)

### 公开项目

- [Awesome Streaming Video Understanding](https://github.com/Yang011013/Awesome-Streaming-Video-Understanding)
- [StreamSpatial：代码与数据](https://github.com/OPPO-Mente-Lab/StreamSpatial)
- [Yang011013 的 GitHub 主页](https://github.com/Yang011013)

### 视觉参考与部署文档

- [Pixel Bloom](https://www.framer.com/marketplace/templates/72625/)：柔和粉色、淡紫色和少量俏皮细节的参考。
- [Scholar](https://www.framer.com/marketplace/templates/scholar/)：研究介绍、论文与学术档案的信息结构参考。
- [GitHub 官方：创建 Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [GitHub 官方：设置 Pages 发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

本主页为原创静态实现，设计参考未使用上述付费模板的源码或素材。
