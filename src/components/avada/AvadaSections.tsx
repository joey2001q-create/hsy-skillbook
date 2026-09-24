import { useState } from 'react'
import { ArrowRight, ChevronDown, LayoutGrid, Plus, X } from 'lucide-react'
import { audience, benefits, builders, features, questions } from './content'

export function AvadaAudience() {
  return <section className="avada-audience avada-container" id="avada-for" aria-label="Avada for everyone">
    {audience.map((item) => <article className={`avada-audience-card avada-audience-${item.theme}`} key={item.label}>
      <p>{item.label}</p><h2>{item.title}</h2>
      <img src={item.image} alt="" loading="lazy" />
      <div className="avada-audience-tags">{item.links.map((link) => <a href="#builders" key={link}>{link}</a>)}</div>
      <a className="avada-card-arrow" href="#builders" aria-label={`Explore ${item.label}`}><ArrowRight size={22} /></a>
    </article>)}
  </section>
}

export function AvadaBuilder() {
  const [selected, setSelected] = useState(0)
  return <section className="avada-builder-section" id="builders">
    <div className="avada-container">
      <div className="avada-section-intro"><img className="avada-section-mark" src="/assets/avada/avada-logo.svg" alt="" /><h2>Design Anything, Build Everything</h2><p>Design and launch your website fast &amp; no coding knowledge is required.</p></div>
      <div className="avada-builder-layout"><div className="avada-builder-tabs" role="tablist" aria-label="Website builder features">
        {builders.map((item, index) => <button type="button" role="tab" aria-selected={index === selected} aria-controls="avada-builder-panel" id={`avada-builder-tab-${index}`} className={index === selected ? 'is-active' : ''} onClick={() => setSelected(index)} key={item.name}><LayoutGrid size={17} aria-hidden="true" />{item.name}</button>)}
      </div>
      <div className="avada-builder-panel" role="tabpanel" id="avada-builder-panel" aria-labelledby={`avada-builder-tab-${selected}`} key={builders[selected].name}>
        <img src={builders[selected].image} alt={`${builders[selected].name} interface`} loading="lazy" />
      </div>
      </div>
    </div>
  </section>
}

export function AvadaFeatures() {
  return <section className="avada-features avada-container" id="features">
    <div className="avada-section-intro"><h2>All-In-One Website Builder</h2><p>Design &amp; Build World-Class Professional Websites With Ease.</p></div>
    <div className="avada-feature-grid">{features.map((item) => <article className="avada-feature" key={item.title}><div className="avada-feature-image"><img src={item.image} alt="" loading="lazy" /></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    <a className="avada-primary-button avada-feature-cta" href="#faq">Discover More <ArrowRight size={18} /></a>
  </section>
}

export function AvadaTrust() {
  return <><section className="avada-trust" id="about"><div className="avada-container avada-trust-inner"><h2>1,071,879 Website Owners<br />Trust Avada</h2><p>The #1 selling Website Builder on Themeforest for 13+ years.</p></div></section>
    <section className="avada-benefits avada-container" id="support">{benefits.map((item) => <article key={item.title}><div className="avada-benefit-image"><img src={item.image} alt="" loading="lazy" /></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</section></>
}

export function AvadaTestimonial() {
  return <section className="avada-testimonial"><img className="avada-testimonial-photo" src="/assets/avada/full/testimonial.jpg" alt="Squarebird design team" loading="lazy" /><div className="avada-testimonial-quote"><blockquote>“We choose to specialise in Avada because it is both functional and practical, and our clients simply love it! It has stood the test of time and continues to evolve – an excellent solution for our talented design team, who continue to push the boundaries.”</blockquote><div className="avada-testimonial-credit"><img src="/assets/avada/full/squarebird-logo.png" alt="" /><span>Squarebird</span></div><span className="avada-testimonial-address">squarebird.co.uk</span></div></section>
}

export function AvadaFaq() {
  const [open, setOpen] = useState<number | null>(null)
  return <section className="avada-faq avada-container" id="faq"><h2>Frequently Asked Questions</h2><div className="avada-faq-list">{questions.map((item, index) => <div className="avada-faq-item" key={item.question}><h3><button type="button" aria-expanded={open === index} aria-controls={`avada-faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>{item.question}{open === index ? <X size={21} /> : <Plus size={21} />}</button></h3><div id={`avada-faq-answer-${index}`} hidden={open !== index}><p>{item.answer}</p></div></div>)}</div></section>
}

export function AvadaFooter() {
  const [subscribed, setSubscribed] = useState(false)
  return <footer className="avada-footer" id="contact"><div className="avada-container avada-footer-cta"><div><h2>Build Successful Websites With Avada</h2><p>Whether you are a beginner, marketer, or professional, Avada has the tools &amp; resources you can rely on to succeed.</p><a className="avada-primary-button" href="#top">Buy Avada For $69 <ArrowRight size={19} /></a></div><img src="/assets/avada/full/footer-cta.png" alt="Avada website design preview" loading="lazy" /></div>
    <div className="avada-footer-main"><div className="avada-container"><div className="avada-footer-grid"><div className="avada-footer-brand"><img src="/assets/avada/full/avada-logo-light-svg.svg" alt="Avada" /><img src="/assets/avada/full/avada-million-sales-milestone-ribbon-small.png" alt="One million sales milestone" /></div><div><a href="#support">Help Center</a><a href="#builders">Avada Studio</a><a href="#features">Prebuilt Websites</a><a href="#about">Reviews</a><a href="#faq">Submit A Ticket</a></div><div><a href="#about">About Us</a><a href="#contact">Careers</a><a href="#support">Support Policy</a><a href="#faq">Terms And Conditions</a><a href="#faq">Privacy Policy</a></div><div><p>Sign up to our newsletter and get all of the latest news and updates.</p><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}><label className="avada-sr-only" htmlFor="avada-email">Your email</label><input id="avada-email" type="email" required placeholder="Your email *" disabled={subscribed} /><button type="submit" disabled={subscribed}>Subscribe</button></form>{subscribed && <p role="status">Thank you for subscribing to our newsletter.</p>}</div></div><div className="avada-footer-bottom"><p>© Copyright 2012 - 2026 • Avada is a Website Builder for WordPress and eCommerce • All Rights Reserved • Developed by ThemeFusion</p><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ChevronDown size={16} /></button></div></div></div>
  </footer>
}
