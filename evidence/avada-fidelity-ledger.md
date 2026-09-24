# Avada 封面横幅复刻差异账本

- 参考页：`https://avada.com/`。ThemeForest 全屏预览只作为入口，实际页面为 Avada 官网。
- 参考证据：`evidence/reference/avada-current-full-desktop.png`（1440×900 视口，整页截图）、`evidence/reference/avada-current-full-mobile.png`（390×844 视口，整页截图），以及各区块 `avada-*-detail.png`。
- 实现证据：`evidence/rendered/avada-final-desktop.png`、`evidence/rendered/avada-final-mobile.png`。
- 范围：只保留首页封面横幅，包括导航、动态标题、Hero 描述、首屏 CTA、统计数字、Hero 图片和右侧快捷入口；下方内容区不在本次范围内。

| 维度 | 参考 | 实现与差异 |
| --- | --- | --- |
| 布局 | 桌面 Header 约 108px，Hero 从 y=108 开始，封面横幅延伸至首屏右侧图片底部 | 当前实现仅渲染 Header + Hero；下方区块未挂载，页面高度由封面内容决定。 |
| 字体 | Basier Square 正常/半粗体，标题和菜单均沿用官网字体 | 使用本地 `basier-*.woff2`，移动/桌面标题换行已逐视口核对。 |
| 颜色 | 白底、深灰文字、黄/绿/蓝卡片、浅绿 CTA、黄色证言 | 对应原站公开色和图片区；信任区保持白底。 |
| 间距 | 桌面内容左侧约 80px，Hero 图片从右侧约 658px 开始；移动端内容左右约 30px | 保留封面栅格和移动端纵向排列；已移除下方内容带来的额外高度。 |
| 图标与资源 | 官网公开 Logo、Hero 图像、分隔线和右侧快捷入口 | 资源本地化至 `public/assets/avada/`；导航和快捷入口图标使用 Lucide。 |
| 响应式 | 桌面双栏 Hero；移动端标题、统计与图片纵向排列，汉堡菜单替代桌面导航 | 已保留 1440×900 与 390×844 两个视口的封面状态，并检查无横向溢出。 |
| 交互 | 动态标题、导航菜单、首屏 CTA 与右侧快捷入口 | 动态标题按时间切换；移动菜单可开关；CTA 和快捷入口只在封面内回到顶部，不跳转原网站。 |

当前交付是“封面横幅范围”的高保真复刻，不包含首页下方区块及其业务路由。原站导航下拉内容、登录和购买等外部业务行为不在范围内；本地 CTA 与快捷入口保持页内行为，避免跳出复刻页面。
