# 生日礼物网站 - 使用说明

## 在手机上访问的方法

### 方法1：使用本地服务器（推荐）
1. 确保电脑和手机连接在同一个WiFi网络下
2. 在电脑上运行本地服务器：
   ```bash
   # 使用Python（如果已安装）
   python -m http.server 8000
   
   # 或者使用Node.js（如果已安装）
   npx http-server -p 8000
   ```
3. 查看电脑的IP地址：
   - Windows: 在命令提示符输入 `ipconfig`
   - 找到"无线局域网适配器 WLAN"下的IPv4地址
4. 在手机浏览器输入：`http://[电脑IP地址]:8000/001/index.html`

### 方法2：使用GitHub Pages（免费）
1. 将整个项目上传到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 访问生成的网址：`https://[用户名].github.io/[仓库名]/001/index.html`

### 方法3：使用Netlify（免费）
1. 访问 [netlify.com](https://netlify.com)
2. 将整个001文件夹拖拽到部署区域
3. 获得一个免费的域名，可以直接在手机上访问

### 方法4：使用Vercel（免费）
1. 访问 [vercel.com](https://vercel.com)
2. 连接GitHub仓库或直接上传文件
3. 获得部署链接

## 快速本地测试
如果你只是想快速测试，可以使用以下命令在电脑上启动服务器：

```bash
cd 001
# 使用Python
python -m http.server 8080

# 或者使用Node.js
npx http-server -p 8080
```

然后在电脑浏览器访问：`http://localhost:8080`

## 文件结构
```
001/
├── index.html          # 首页
├── memories.html       # 回忆相册
├── messages.html       # 爱情留言
├── main.js            # JavaScript功能
├── design.md          # 设计文档
├── outline.md         # 项目大纲
├── interaction.md     # 交互说明
└── resources/         # 图片资源
    ├── birthday-cake.png
    ├── hero-background.png
    └── memory-collage.png
```

## 功能特点
- 💝 浪漫的生日祝福网站
- 📱 完全响应式设计，支持手机访问
- 🎨 精美的动画效果
- 📸 回忆相册功能
- 💌 爱情留言板
- 🎂 生日倒计时

选择最适合你的方法来在手机上访问这个特别的生日礼物！
