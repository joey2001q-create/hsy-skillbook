# Fidelity Ledger

复刻范围：`https://www.jufcloud.com/` 顶部横幅，不包含横幅以下内容。

桌面基准：`1440x900`，截图有效内容 `1425x891`。鼠标视差分别在 `(100, 450)` 和 `(1340, 180)` 回放。

| 检查 | 参考证据 | 实现证据 | 结果 |
| --- | --- | --- | --- |
| 横幅布局与资产 | `reference/jufcloud-mouse-left.png` | `rendered/jufcloud-mouse-left.png` | 角色、标题、PCB、斜面和按钮采用同一几何；相似度 94.46% |
| 鼠标 3D 视差 | `reference/jufcloud-mouse-right.png` | `rendered/jufcloud-mouse-right.png` | 同坐标回放；`rotateX/rotateY` 矩阵与参考一致；相似度 94.67% |
| 导航与按钮 | 同上 | 同上 | 导航宽度 696.24px 与参考一致；开始按钮宽度误差小于 1px |
| 颜色与分层 | 同上 | 同上 | 主色 `#2f7ddb`、白色斜面、PCB、角色、阴影和光效分层一致 |
| 移动端裁切 | `reference/jufcloud-mobile-390x844.png` | `rendered/jufcloud-mobile-390x844.png` | 复现目标固定宽度横幅裁切，不擅自改为响应式；相似度 91.13% |
| 控制台与构建 | Browser logs | `npm run lint`, `npm run build` | 无相关 error/warn，Lint 与生产构建通过 |

## 已知偏差

- 角色 7 秒浮动动画会使非同步截图出现最多约 4px 的垂直相位差。
- 导航和“开始使用”均保留视觉与 hover 行为，但样例不会跳转目标站的登录、注册或购买页面。
- 目标站在移动端为固定宽度裁切，本实现按参考复现，因此不将其描述为移动端友好布局。
- 第三方公开页面资产仅用于验证，发布或商用前需要确认授权或替换。
