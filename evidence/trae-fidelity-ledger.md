# TRAE Fidelity Ledger

复刻范围：`https://www.trae.cn/` 首页顶部导航与第一屏横幅，不包含后续产品介绍、隐私、安全和页脚。

| 检查 | 参考证据 | 实现证据 | 结果 |
| --- | --- | --- | --- |
| 桌面布局 | `reference/trae-1440x900.png` | `rendered/trae-route-1440x900.png` | 标题、下载区、64px 导航和 836px 横幅几何一致；相似度 98.21% |
| 截图视口 | `reference/trae-1266x1288.png` | `rendered/trae-1266x1288.png` | 复现窄屏 Logo/菜单模式和底部双栏；相似度 97.24% |
| 移动端 | `reference/trae-390x844.png` | `rendered/trae-390x844.png` | 复现标题置顶、下载区置底和竖排按钮；相似度 95.43% |
| Three.js 像素场 | 三个参考视口及左右鼠标状态 | 三个实现视口及 `pointer-left/right` | 使用流体噪声、5px 方块、2px 间隙、阈值和绿白交换机制重新实现 |
| 字体与文案 | 参考 DOM 与 computed styles | Browser DOM 与 computed styles | 72/56/42px 标题级别、16px 说明和 14/13px 控件级别一致；首屏文案无增删 |
| 颜色与分层 | 参考 Canvas 和 CSS | `src/components/FluidPixelCanvas.tsx`, `src/styles.css` | `#0a0b0d`、`#f5f9fe`、`#a6aab5`、`#32f08c` 及纵向暗层一致 |
| 交互 | 参考鼠标关键帧与菜单 DOM | Browser 回放 | 鼠标像素换色、移动菜单 `aria-expanded`、下载选择状态均已验证 |
| 控制台与工程门禁 | Browser logs | `npm run lint`, `npm run build` | 页面无相关 error/warn；Lint 与生产构建通过 |

## 已知偏差

- 参考页使用 Three.js r176、React Three Fiber 和 postprocessing；本实现使用 Three.js r185 与等价的单 Shader 管线，动态帧相位不会逐帧完全一致。
- 参考 Logo 由 Rive 资源渲染；本实现使用代码原生文字标记，避免引入仅用于 Logo 的 Rive 运行时。
- 下载按钮和导航不会访问目标站或启动真实下载；本地按钮只更新无障碍状态，菜单保留完整展开/关闭行为。
- 数值相似度用于记录同视口截图差异，不代表获得品牌、商标或页面内容的再分发授权。
