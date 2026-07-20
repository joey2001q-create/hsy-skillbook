# Osty 首页复刻差异账本

## 基准

- 参考页面：`https://theme.madsparrow.me/osty/?storefront=envato-elements`
- 本地路由：`http://127.0.0.1:5174/osty/`
- 桌面基准：名义视口 `1440x900`，浏览器内容截图 `1425x891`
- 移动基准：名义视口 `390x844`，浏览器内容截图 `375x844`
- 桌面首屏像素相似度：`97.5597%`
- 移动首屏像素相似度：`95.3137%`

## 差异账本

| 检查 | 参考证据 | 实现证据 | 结果或修复 |
| --- | --- | --- | --- |
| 布局 | `reference/osty-home-1440x900.png`；文档高 `3307px`，筛选器 `y=985px`，首卡 `y=1086px`，页脚 `y=2687px` | `rendered/osty-home-1440x900.png`；文档高 `3306px`，对应坐标 `985/1086/2686px` | 全页高度差 `1px`；首屏和主要区段坐标已对齐 |
| 字体 | Poppins 标题 `57.6px/700/57.6px`，Inter 正文；移动标题 `28px/28px` | 本地打包 Poppins `400-700` 与 Inter 可变字体；同字号、字重和行高 | 桌面标题容器 `720x115px`，移动标题 `351x56px`，换行一致 |
| 颜色 | 浅色背景 `rgb(245,245,245)`，正文 `rgb(38,38,38)`，强调色 `rgb(252,202,115)`；暗色背景 `rgb(36,35,35)` | `data-theme` 令牌与浏览器 computed style | 浅色、暗色和黄色强调均匹配；切换后无控制台错误 |
| 间距 | 桌面卡片宽 `407px`，三行 `y=1086/1600/2115px`；中列图片上移 `20px` | 卡片宽 `407px`，三行 `y=1086/1600/2114px`；中列 `translateY(-20px)` | 最大可见纵向差 `1px` |
| 图标与资源 | 5 张首屏图、9 张项目图、Osty 星号、搜索/菜单/关闭图标 | `public/assets/osty/` 与 Lucide 控件图标 | 使用公开页面原始图片与本地字体；真实文本仍由 React 渲染 |
| 首屏指针动效 | `reference/osty-hero-pointer-rest.png` 与 `center-immediate/250/950.png`；中心扫过时邻近三张图片先位移、旋转，再弹性回位 | `rendered/osty-hero-pointer-rest-v2.png` 与同名 `center-immediate/250/950.png`；`requestAnimationFrame` 读取指针速度并按图片距离衰减 | 同一轨迹和时间点已回放；基础旋转、邻近影响、速度衰减及约 `700ms` 回弹均已复刻 |
| Categories 动效 | `reference/osty-filter-design-t000/800/1500/3000/5000.png`；选中标记滑动，旧卡降透明度，黑圆黄线加载器持续旋转，内容分段收起并恢复 | `rendered/osty-filter-design-t000/300/750/1250.png` 与 `osty-filter-design-settled.png`；旧卡错开 `60ms` 向上收起，网格高度过渡后两张 Design 卡错开展开 | 复刻真实过渡机制；本地无服务端请求，等待期由参考站约 `5s` 缩短为约 `2s`，避免伪造网络延迟 |
| 其他交互 | `reference/osty-mobile-menu-open.png`、`osty-mobile-filter-open.png`、`osty-mobile-dark.png`、`osty-desktop-search-open.png`、页脚 A/B 帧 | `rendered/` 下同名状态；搜索清除恢复 9 项，字幕 700ms 位移约 `81px` | 菜单、搜索、主题、加载、悬停光标与字幕均完成真实浏览器回放 |
| 响应式 | 移动文档高 `5465px`；标题、首图、首卡标题、加载按钮、页脚分别位于 `y=219/959/1328/4872/4920px` | 移动文档高 `5466px`；Design 完成态 `rendered/osty-mobile-filter-design-settled.png`，`aria-busy=false`，文档宽 `375px`、高 `2442px` | 常态对应坐标一致；移动筛选面板自动关闭，只保留 2 项，无横向溢出 |

## 有意偏差

1. 按用户要求新增固定“原网站”按钮，参考页面没有这段中文控件，因此它会降低首屏差异分数。
2. 参考站 Categories 过渡包含约 `5s` 的服务端等待；本地数据已在浏览器内，因此保留加载器、退场和入场机制，但将总时长缩短到约 `2s`。
3. WordPress 站内搜索依赖服务端；本地版本改为首页项目即时搜索，保持控件可用且不伪造后端结果。
4. 本轮只实现首页；项目详情、商店、新闻和联系页仍指向参考站或当前首页锚点。

## 验证

- `npm run lint`
- `npm run build`
- Chrome：`1440x900`、`390x844`
- 首屏指针回放：静止、即时、`250ms`、`950ms`
- Categories 回放：初始、dimming、closing、opening、settled；桌面与移动完成态
- 控制台：无相关 error 或 warning
- 差异图：`rendered/osty-home-1440x900-diff.png`、`rendered/osty-home-mobile-390x844-diff.png`
