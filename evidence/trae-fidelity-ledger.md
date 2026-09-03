# TRAE Fidelity Ledger

复刻范围：`https://www.trae.cn/` 完整公开首页。按钮进入后的子页面不在范围内；右下角“原网站”按钮是用户要求的固定偏差。

| 检查 | 参考证据 | 实现证据 | 结果 |
| --- | --- | --- | --- |
| 1440 桌面边界 | Browser 实测 `1440x900`、`scrollHeight=7176` | `rendered/trae-home-final-1440x900.png` | 本地 `scrollHeight=7176`；能力区、IDE、隐私区和页尾起点误差小于 1px |
| 390 移动边界 | `reference/trae-home-mobile-top-390x844.png`，Browser 实测 `scrollHeight=6333` | `rendered/trae-home-mobile-final-390x844.png` | 本地 `scrollHeight=6333`；四个后续区块起点和高度误差小于 1px |
| TRAE Work | 官网 1440 视频 `1376x774.5`，容器另含 80px 底部空间 | `rendered/trae-home-final-1440x900.png` | 标题组、CTA、90px 视频间距、视频宽度和区块总高度按官网规则重建 |
| Header Logo | 官网 `90x30` Rive Canvas、公开 `logo.riv` | `rendered/trae-home-final-1440x900.png` | 使用官网同一 Rive 资源、`State Machine 1` 和 `Scroll` 输入；桌面导航入口起点与官网同为 `x=154` |
| 首屏信息块 | 官网 Browser 几何测量 | `rendered/trae-home-final-1440x900.png` | 文案、按钮和网页链接共用 `370px` 宽度，桌面左边界同为 `x=1014`；两枚按钮宽度约 `184.3/173.7px` |
| 能力横轨 | `reference/trae-home-section-03-possibilities.png`、Browser 位移测量 | `rendered/trae-home-final-possibilities-1440x900.png` | 使用官网公式 `scrollWidth - clientWidth + 155`；`scrollY=3500` 时参考和本地均为 `translateX(-1088px)` |
| IDE 聚焦轮播 | `reference/trae-home-section-05-ide.png`、官网 Embla 运行时 | `rendered/trae-home-final-ide-1440x900.png`、`rendered/trae-home-final-ide-next.png`、`rendered/trae-home-mobile-ide-next.png` | 使用 Embla、首尾占位卡、中心卡 1.0/侧卡 0.8、拖拽惯性、吸附、按钮 disabled 和 0.3s 缩放过渡；按钮还原官网联动滚动，桌面 `4300 -> 4477.5`、移动 `3400 -> 3625.5` |
| IDE 完整文案 | 官网 DOM 快照 | 同上 | 恢复 MCP、Context、Cue 三张卡被删短的完整说明，避免窄桌面高度和换行漂移 |
| 隐私安全 | `reference/trae-home-section-06-security.png` | `rendered/trae-home-final-security-1440x900.png` | 桌面三列与移动三行的标题、说明、卡片高度、间距和区块高度一致 |
| 页尾布局 | `reference/trae-home-section-07-footer.png`、最大滚动位置截图 | `rendered/trae-home-final-footer-bottom-1440x900.png`、`rendered/trae-home-mobile-footer-390x844.png` | 下载区、四列链接、法律信息、两张不同且清晰的 `84x84` 二维码和精确页面底部一致 |
| 页尾 WebGL | 官网公开运行时 `grid=15, mouse=.25, strength=.15, relaxation=.9, minFilter=LinearFilter` | `rendered/trae-home-final-footer-distorted-1440x900.png`、`rendered/trae-home-final-footer-recovered-1440x900.png` | 使用相同 Three.js 数据纹理、Shader 和纹理过滤；相同快速横移轨迹的块状形变、衰减与恢复帧一致 |
| 产品菜单与移动菜单 | 官网 hover、移动折叠态和产品展开态 | `rendered/trae-home-final-product-menu.png`、`rendered/trae-home-mobile-menu-open.png`、`rendered/trae-home-mobile-product-open.png` | 桌面 hover/focus 展开三项产品菜单；移动端为整屏导航，补齐下载、登录、知识库 Hot 和三项产品，滚动锁定与 ARIA 状态已验证 |
| 控制台与工程门禁 | Browser logs | `npm run lint`、`npm run build` | 页面控制台无 error/warn；Lint 与生产构建通过 |

## 已知偏差

- 首屏是持续运行的流体像素场，参考和本地截图的随机相位不会逐帧相同；输入路径、颜色交换、像素化通道和鼠标响应机制保持一致。
- TRAE Work 视频继续读取官网公开 CDN；离线时使用本地封面。
- 下载、登录和导航按钮不进入官网子页面或启动真实下载；本地保留 hover、focus、菜单、轮播和无障碍状态。
- 固定“原网站”按钮是按用户要求增加的有意偏差。
