const asset = (name: string) => `/assets/avada/full/${name}`

export const audience = [
  { label: 'For Beginners', title: 'Launch Your First Website', image: asset('for-beginners@2x.jpg'), theme: 'yellow', links: ['Visual Builder', 'Documentation', 'Support', 'Prebuilt Websites'] },
  { label: 'For Marketers', title: 'Generate Leads And Conversions', image: asset('for-marketers@2x.jpg'), theme: 'green', links: ['Design', 'SEO', 'Shop Builder', 'Form Builder'] },
  { label: 'For Professionals', title: 'Take Your Projects To The Next Level', image: asset('for-pro-2@2x.jpg'), theme: 'blue', links: ['All-In-One', 'Freedom', 'WCAG', 'Dynamic Data'] },
]

export const builders = [
  { name: 'Live Visual Builder', title: 'The only limit is your imagination', image: asset('live-visual.jpg'), description: 'Build visually and see every change as you make it. Create unique layouts with complete design freedom.' },
  { name: 'Layout Builder', title: 'Build stylish layouts', image: asset('layout-builder-4.jpg'), description: 'Create custom page layouts and assign them throughout your website.' },
  { name: 'Header Builder', title: 'Build custom header layouts', image: asset('header-builder-5.jpg'), description: 'Design the perfect header for every page of your website.' },
  { name: 'Mega Menu', title: 'Build a custom mega menu', image: asset('mega-menu-feature.jpg'), description: 'Create rich navigation experiences with the visual builder.' },
  { name: 'Footer Builder', title: 'Create a footer from scratch', image: asset('footer-builder-5.jpg'), description: 'Design a footer that is perfectly suited to your brand.' },
  { name: 'Form Builder', title: 'Forms that work effectively', image: asset('form-builder.jpg'), description: 'Build engaging forms to collect leads and connect with visitors.' },
  { name: 'Off-Canvas', title: 'Capture your visitors’ attention', image: asset('off-canvas-feature.jpg'), description: 'Create flexible off-canvas content for promotions and calls to action.' },
  { name: 'Setup Wizard', title: 'Build websites on the fly, and fast', image: asset('setup-wizard-1.jpg'), description: 'Get started quickly with a guided website setup.' },
  { name: 'Performance Wizard', title: 'Optimize your website easily', image: asset('performance-wizard.jpg'), description: 'Fine-tune loading and performance from one place.' },
]

export const features = [
  { title: '113 Prebuilt Websites', body: 'Prebuilt websites are designed to save you time. Import with a few clicks & customize it to suit your requirements.', image: asset('prebuilt-website-2@2x.jpg') },
  { title: '120+ Design Elements', body: 'Packed with options, they are highly flexible for any design & for any purpose. The only limit is your imagination.', image: asset('design-elements.png') },
  { title: 'Built For Performance', body: 'Experience total control of your website’s features that will empower you to make superior performance-related decisions.', image: asset('performance.jpg') },
  { title: 'Mobile Friendly', body: 'Avada is 100% fluid & responsive across all device types, from mobile to desktop & tablets, with no compromise.', image: asset('mobile-friendly.png') },
  { title: 'Dynamic Content', body: 'Build unique pages & post types for your website by harnessing the power of Avada’s dynamic content functionality.', image: asset('dynamic-content.png') },
  { title: 'WooCommerce Builder', body: 'Avada is integrated with WooCommerce, allowing you to build incredible online stores to sell anything imaginable.', image: asset('woo-3.jpg') },
]

export const benefits = [
  { title: 'World-Class Support', body: 'We build long-term professional relationships with our customers that you can rely on & trust.', image: asset('world-class-support.png') },
  { title: 'Documentation & Tutorials', body: 'Over 550 help files & 200 tutorial videos will make building websites with Avada even easier.', image: asset('documentation.png') },
  { title: '100% Built In-House', body: 'Avada is not reliant on 3rd party tools to deliver a reliable & stable website building experience.', image: asset('built-in-house.png') },
  { title: 'Free Lifetime Updates', body: 'Your website will receive free & regular updates, compatible with industry standards & trends, for life.', image: asset('free-updates.png') },
]

export const questions = [
  { question: 'Are there any recurring license fees?', answer: 'No. Your Avada purchase is a one-time payment. It includes lifetime updates and six months of support, with the option to extend support.' },
  { question: 'Are Avada Studio items and prebuilt websites customizable?', answer: 'Yes. Every layout, prebuilt website, and Avada Studio item can be customized using the visual builder.' },
  { question: 'Where can I get Avada support?', answer: 'Avada offers dedicated support, detailed documentation, and video tutorials to help you build your website.' },
  { question: 'What is included with my purchase of Avada?', answer: 'Your purchase includes the Avada Website Builder, prebuilt websites, design elements, lifetime updates, and six months of support.' },
  { question: 'Why should I buy Avada?', answer: 'Avada brings design, content, WooCommerce, and performance tools together in one flexible website builder.' },
]
