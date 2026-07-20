const tickerItems = ['Photography', 'Video Production', 'Design & Branding', 'eCommerce', 'Mobile Application']

function TickerGroup() {
  return (
    <ul aria-hidden="true">
      {tickerItems.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <img src="/assets/osty/star.svg" alt="" />
        </li>
      ))}
    </ul>
  )
}

export function OstyFooter() {
  return (
    <footer className="osty-footer" id="contact">
      <div className="osty-footer-top">
        <h2>Let&apos;s make<br />it happen.</h2>
        <div className="osty-social-block">
          <p>Social Media</p>
          <div className="osty-social-links">
            <a href="https://behance.net/" target="_blank" rel="noreferrer" aria-label="Behance">Be</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">Ig</a>
            <a href="https://pinterest.com/" target="_blank" rel="noreferrer" aria-label="Pinterest">P</a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">X</a>
            <a href="https://dribbble.com/" target="_blank" rel="noreferrer" aria-label="Dribbble">Dr</a>
          </div>
        </div>
        <div className="osty-contact-block">
          <p>Contact</p>
          <a href="mailto:contactmail@osty.com">contactmail@osty.com</a>
        </div>
      </div>

      <div className="osty-ticker">
        <div className="osty-ticker-track">
          <TickerGroup />
          <TickerGroup />
        </div>
      </div>

      <div className="osty-footer-bottom">
        <p>©2025 Mad Sparrow, All Rights Reserved.</p>
        <p>Themeforest Premium WordPress Theme.</p>
      </div>
    </footer>
  )
}
