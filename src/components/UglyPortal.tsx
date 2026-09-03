import {
  BarChart3,
  CloudSun,
  Globe2,
  Landmark,
  Newspaper,
  Radio,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import '../ugly-portal-tokens.css'
import '../ugly-portal.css'

const headlineItems = [
  ['置顶', '本市互联网边角料交易会今日隆重开幕'],
  ['快讯', '专家建议：网页导航至少应该拥有十二种颜色'],
  ['科技', '新型键盘增加“随便写写”专用按键'],
  ['生活', '社区旧显示器改造计划进入第二阶段'],
  ['文化', '全国民间表格排版大赛开始征集作品'],
  ['观察', '年轻人重新爱上会闪烁的个人主页'],
]

const hotWords = ['复古网页', '今日天气', '桌面宠物', '像素字体', '本地论坛', '免费壁纸', '拨号上网', '神秘代码']

const infoColumns = [
  {
    title: '科技传真',
    icon: <BarChart3 size={20} aria-hidden="true" />,
    image: '/assets/trae/value-01.png',
    lead: 'AI 助手学会制作财务仪表盘，但坚持使用绿色虚线',
    items: ['开源社区发布第 999 个待办应用', '程序员尝试用表格管理所有人生', '新浏览器承诺兼容 2005 年网页'],
  },
  {
    title: '城市生活',
    icon: <Landmark size={20} aria-hidden="true" />,
    image: '/assets/trae/ide-agent.png',
    lead: '老商场顶楼出现全天候互联网文化展览',
    items: ['周末旧物市场新增电子产品专区', '社区课程教居民制作动态签名档', '公园免费无线网络更换醒目标牌'],
  },
  {
    title: '奇闻广角',
    icon: <Sparkles size={20} aria-hidden="true" />,
    image: '/assets/trae/value-04.png',
    lead: '失踪多年的网页计数器在旧硬盘中重新出现',
    items: ['收藏家拥有三千张“建设中”图片', '网友为一段滚动字幕写下长篇评论', '研究发现高饱和按钮更容易被记住'],
  },
]

export function UglyPortal() {
  return (
    <main className="ugly-portal-page">
      <div className="ugly-portal-utility">
        <span>2026年7月30日 星期四</span>
        <span>设为首页 · 加入收藏 · 门户地图 · 旧版入口</span>
        <strong>简体中文 ▼</strong>
      </div>

      <header className="ugly-portal-header">
        <div className="ugly-portal-logo">
          <Globe2 size={66} strokeWidth={2.7} aria-hidden="true" />
          <div>
            <strong>破浪门户网</strong>
            <small>WWW.POLANG-2005.EXAMPLE</small>
          </div>
        </div>

        <div className="ugly-portal-search" aria-label="静态搜索展示">
          <Search size={24} aria-hidden="true" />
          <span>输入关键词，寻找互联网边角料……</span>
          <b>全站检索</b>
        </div>

        <div className="ugly-portal-weather">
          <CloudSun size={43} aria-hidden="true" />
          <span>本地</span>
          <strong>31℃</strong>
          <small>多云转网页</small>
        </div>
      </header>

      <nav className="ugly-portal-nav" aria-label="静态频道导航">
        {['首页', '新闻', '科技', '财经', '生活', '文化', '社区', '图片', '软件下载', '本地论坛'].map((item, index) => (
          <span className={index === 0 ? 'is-current' : ''} key={item}>{item}</span>
        ))}
      </nav>

      <div className="ugly-portal-breaking">
        <strong><Radio size={18} aria-hidden="true" /> 即时播报</strong>
        <div className="ugly-portal-breaking-window">
          <p>滚动消息：本门户所有栏目均为静态展示 · 今日推荐：把每个模块都加上不同颜色的边框 · 友情提示：请勿在同一页面寻找视觉秩序</p>
        </div>
        <time>11:28</time>
      </div>

      <div className="ugly-portal-layout">
        <section className="ugly-portal-module ugly-portal-headlines" aria-labelledby="portal-headlines-title">
          <div className="ugly-portal-module-title">
            <Newspaper size={21} aria-hidden="true" />
            <h1 id="portal-headlines-title">今日要闻</h1>
            <span>NEWS</span>
          </div>
          <div className="ugly-portal-main-headline">
            <p>今日头条</p>
            <h2>互联网门户重新流行，专家称“信息越挤越显得内容丰富”</h2>
            <span>页面设计师正在重新研究蓝色表格、黄色提示条与无法忽略的红色标题。</span>
          </div>
          <ul className="ugly-portal-news-list">
            {headlineItems.map(([tag, text], index) => (
              <li key={text}>
                <b className={`tag-${index % 4}`}>{tag}</b>
                <span>{text}</span>
                <time>{index < 2 ? '11:2' + index : '09:' + (48 - index)}</time>
              </li>
            ))}
          </ul>
        </section>

        <section className="ugly-portal-module ugly-portal-lead" aria-labelledby="portal-lead-title">
          <div className="ugly-portal-module-title ugly-portal-module-title-orange">
            <TrendingUp size={21} aria-hidden="true" />
            <h2 id="portal-lead-title">焦点图文</h2>
            <span>FOCUS</span>
          </div>
          <figure className="ugly-portal-lead-figure">
            <img src="/assets/trae/value-01.png" alt="AI 财务分析仪表盘流程示意图" />
            <figcaption>
              <strong>技术专题：从一句话到一整套复杂工作流</strong>
              <span>本周最受关注的生产力实验，配图来自真实技术演示。</span>
            </figcaption>
          </figure>
          <div className="ugly-portal-photo-dots" aria-hidden="true">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </section>

        <aside className="ugly-portal-sidebar" aria-label="门户辅助信息">
          <section className="ugly-portal-mini ugly-portal-markets">
            <div className="ugly-portal-mini-title">今日指数</div>
            <dl>
              <div><dt>网页热度</dt><dd className="up">↑ 88.88</dd></div>
              <div><dt>像素指数</dt><dd className="down">↓ 20.05</dd></div>
              <div><dt>边框价格</dt><dd className="up">↑ 11.06</dd></div>
            </dl>
          </section>
          <section className="ugly-portal-mini ugly-portal-hot">
            <div className="ugly-portal-mini-title">热门关键词</div>
            <div className="ugly-portal-hot-cloud">
              {hotWords.map((word, index) => <span className={`hot-${index % 5}`} key={word}>{word}</span>)}
            </div>
          </section>
          <section className="ugly-portal-mini ugly-portal-notice">
            <div className="ugly-portal-mini-title">站务公告</div>
            <p>本站为单页静态门户展示，没有可点击链接，不收集任何数据。</p>
            <strong>今日访问：001328</strong>
          </section>
        </aside>
      </div>

      <section className="ugly-portal-columns" aria-label="频道精选">
        {infoColumns.map((column, index) => (
          <article className={`ugly-portal-channel channel-${index + 1}`} key={column.title}>
            <header>
              {column.icon}
              <h2>{column.title}</h2>
              <span>更多 &gt;&gt;</span>
            </header>
            <img src={column.image} alt="" />
            <h3>{column.lead}</h3>
            <ul>
              {column.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="ugly-portal-directory" aria-labelledby="portal-directory-title">
        <h2 id="portal-directory-title">网站分类目录</h2>
        <div>
          <strong>常用服务：</strong>
          <span>天气预报</span><span>列车时刻</span><span>电视节目</span><span>号码查询</span><span>在线翻译</span><span>万年历</span>
        </div>
        <div>
          <strong>地方频道：</strong>
          <span>东城区</span><span>西城区</span><span>南城区</span><span>北城区</span><span>开发区</span><span>旧城区</span>
        </div>
        <div>
          <strong>友情链接：</strong>
          <span>城市之窗</span><span>科技在线</span><span>生活大全</span><span>图片中心</span><span>网友家园</span><span>下载基地</span>
        </div>
      </section>

      <footer className="ugly-portal-footer">
        <p>关于本站 | 内容说明 | 广告服务 | 联系我们 | 网站地图</p>
        <p>破浪门户网静态展示页面 · 页面内容均为虚构 · 不提供真实新闻与服务</p>
        <strong>建议分辨率：1024×768 或任何现代移动设备</strong>
      </footer>
    </main>
  )
}
