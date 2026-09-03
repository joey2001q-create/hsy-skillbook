# New API 首页复刻差异账本

## 参考证据

- 原站：`https://www.newapi.ai/`
- 桌面参考：`evidence/reference/newapi-desktop-initial-1440x900.png`、`newapi-desktop-scroll-0780-current-1440x900.png`、`newapi-desktop-scroll-1560-current-1440x900.png`、`newapi-desktop-scroll-2340-current-1440x900.png`、`newapi-desktop-scroll-3120-current-1440x900.png`、`newapi-desktop-bottom-current-1440x900.png`
- 移动参考：`evidence/reference/newapi-mobile-initial-390x844.png`、`newapi-mobile-current-390x844.png`、`newapi-mobile-partners-390x844.png`
- 实现路径：`/newapi/`

## 核对项

| 项目 | 实现与证据 | 状态 |
| --- | --- | --- |
| 布局 | 900px 黑洞首屏、应用带、伙伴 3x2 矩阵、能力卡、三步流程、页尾描边字 | 已实现 |
| 字体 | 使用本地采集 WOFF2，中文回退到系统无衬线字体 | 已实现 |
| 颜色 | 黑洞首屏黑底与蓝/粉吸积盘，内容区白底、蓝色标签与按钮 | 已实现 |
| 间距 | 桌面内容最大宽度约 1135px，移动端 22px 边距 | 已实现 |
| 资源 | 应用、合作伙伴 Logo 使用 `public/assets/newapi/` 本地公开资源 | 已实现 |
| 响应式 | 已在 1440x900 与 390x844 视口检查；桌面 4590px、移动 5578px，分区起点与参考一致 | 已验证 |
| 交互 | WebGL 指针左右移动与恢复、主题 system/light/dark 循环、语言菜单、移动菜单锁滚动、月历前后月、卡片 hover/leave、Logo 带 hover 暂停、返回顶部 | 已验证 |
| 黑洞机制 | 移植原站公开运行资源中的 WebGL fragment shader，以 Three.js `RawShaderMaterial` 驱动，保留光线弯曲、吸积盘、星场、品牌色和鼠标平滑跟随 | 已验证 |
| 有意偏差 | Shader 的 `uSeed` 每次加载随机，因此星尘与湍流纹理不会逐帧固定；卡片内部仍使用语义化 CSS 预览 | 已说明 |

## 实现证据

- `evidence/rendered/newapi-desktop-final-1440x900.png`
- `evidence/rendered/newapi-mobile-final-390x844.png`
- `evidence/rendered/newapi-desktop-scroll-0780-current-1440x900.png`
- `evidence/rendered/newapi-desktop-scroll-1560-current-1440x900.png`
- `evidence/rendered/newapi-desktop-scroll-2340-current-1440x900.png`
- `evidence/rendered/newapi-desktop-scroll-3120-current-1440x900.png`
- `evidence/rendered/newapi-desktop-bottom-current-1440x900.png`
- `evidence/rendered/newapi-mobile-current-390x844.png`
- `evidence/rendered/newapi-mobile-partners-390x844.png`
- `evidence/rendered/newapi-footer-final-1440x900.png`
- `evidence/rendered/newapi-desktop-shader-1440x900.png`
- `evidence/rendered/newapi-mobile-shader-390x844.png`
