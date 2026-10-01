# 雾岭 · 云上山川

一个使用 Three.js 实时绘制的体素自然景观：多峰山体、两道瀑布、山腰云海、松林与晨光。山体采用程序化高度场和单一合并网格，云、林用实例化网格；瀑布与水潭通过轻量着色器做流动效果。页面打开后会自动缓慢环绕，也支持拖动旋转和滚轮缩放。

## 运行

需要 Node.js 20.19+ 或 22.12+。

```powershell
npm install
npm run dev
```

在终端显示的本机地址打开页面。生成生产版本：

```powershell
npm run build
npm run preview
```

场景不需要图片素材或在线 API。首次安装会从 npm 下载 Three.js 与 Vite；Google Fonts 不可用时，页面会自动回退到本机字体。
