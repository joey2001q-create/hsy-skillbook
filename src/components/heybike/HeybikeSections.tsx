import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { useState } from "react";
import {
  articles,
  asset,
  communityImages,
  events,
  guarantees,
  products,
  reviews,
} from "./heybike-data";

type PromoProps = { active: number; onChange: (index: number) => void };

export function HeybikeHero() {
  return (
    <a
      id="top"
      className="hb-hero"
      href="#hot-picks"
      aria-label="Ride with the Spurs promotion"
    >
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={asset("US_KV_mob_75214a84-5316-4bdb-81f3-f6455ef841ee.jpg")}
        />
        <img
          src={asset("US_KV_PC_f13248c8-3679-4420-bc79-b7a543ad5e07.jpg")}
          alt="Ride with the Spurs. Free gifts with select e-bikes."
        />
      </picture>
    </a>
  );
}

const promos = [
  {
    desktop: "PC___01_3e85c10a-cf3a-47bd-bad5-46d99cfb3aa8.jpg",
    mobile: "mob___02_f0680d94-1eed-47cf-b9a9-2e19fb6e730e.jpg",
    tag: "RIDE INTO FALL",
    title: "Titan: Up to 80 Miles.",
    copy: "Full suspension. Dual-battery option.",
    button: "Explore Titan",
  },
  {
    desktop: "Ebike-PC-1.png",
    mobile: "Ebike-Mob-1.png",
    tag: "BUY 2, SAVE $200",
    title: "Ride Better Together.",
    copy: "The Stoke Twins Take On Titan.",
    button: "Shop Now",
  },
];

export function PromoTiles({ active, onChange }: PromoProps) {
  return (
    <section className="hb-promos" aria-label="Seasonal promotions">
      {promos.map((promo, index) => (
        <article
          className={`hb-promo ${active === index ? "is-active" : ""}`}
          key={promo.title}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={asset(promo.mobile)} />
            <img src={asset(promo.desktop)} alt="" />
          </picture>
          <div className="hb-promo-copy">
            <span>{promo.tag}</span>
            <h2>{promo.title}</h2>
            <p>{promo.copy}</p>
            <a href="#hot-picks">{promo.button}</a>
          </div>
        </article>
      ))}
      <div className="hb-promo-dots">
        {promos.map((promo, index) => (
          <button
            type="button"
            onClick={() => onChange(index)}
            aria-label={`Show ${promo.title}`}
            aria-pressed={active === index}
            key={promo.title}
          />
        ))}
      </div>
    </section>
  );
}

export function ProductShowcase() {
  const [offset, setOffset] = useState(0);
  const max = Math.max(0, products.length - 4);
  return (
    <section className="hb-section hb-products" id="hot-picks">
      <div className="hb-heading-row">
        <h2>Hot Picks</h2>
        <div>
          <button
            type="button"
            onClick={() => setOffset(Math.max(0, offset - 1))}
            disabled={offset === 0}
            aria-label="Previous products"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => setOffset(Math.min(max, offset + 1))}
            disabled={offset === max}
            aria-label="Next products"
          >
            <ArrowRight />
          </button>
          <a href="#all-ebikes">
            Shop All Ebikes <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="hb-product-viewport">
        <div
          className="hb-product-track"
          style={{
            transform: `translateX(calc(${offset} * (min(calc((100vw - 74px) / 4), 342px) + 14px) * -1))`,
          }}
        >
          {products.map((product) => (
            <article className="hb-product" key={product.name}>
              <div className="hb-product-media">
                <span>Sale</span>
                <img src={asset(product.image)} alt={product.name} />
              </div>
              <div className="hb-product-copy">
                <div className="hb-rating">
                  ★★★★★ <small>4.9</small>
                </div>
                <h3>{product.name}</h3>
                <div className="hb-prices">
                  <strong>{product.price}</strong>
                  <del>{product.oldPrice}</del>
                </div>
                <div className="hb-swatches">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="hb-specs">
                  {product.specs.map((spec) => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>
                <button type="button">VIEW MORE</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CompareBanner() {
  return (
    <section className="hb-compare">
      <picture>
        <source media="(max-width: 767px)" srcSet={asset("mob_1.jpg")} />
        <img
          src={asset("PC_3840x800_0902532d-9ced-448c-b13e-147a59d7adb0.jpg")}
          alt="Heybike electric bike in the desert"
        />
      </picture>
      <div>
        <h2>Which Ride Fits You?</h2>
        <p>Compare our top models side by side.</p>
        <a href="#hot-picks">
          Compare models <ArrowRight />
        </a>
      </div>
    </section>
  );
}

export function SmartSupport() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <section className="hb-section" id="smart-tech">
      <h2 className="hb-centered-title">Smart Tech. Local Support</h2>
      <div className="hb-smart-grid">
        <article className="hb-smart-item">
          <img
            src={asset("map_d0ce74c2-2143-4eb4-a973-e65461b46366.jpg")}
            alt="Map of Heybike dealers"
          />
          <a href="#community">
            FIND A DEALER <ArrowRight size={15} />
          </a>
        </article>
        <article className="hb-smart-item">
          <img
            src={asset("app_8ceea9b5-7b25-412e-a16b-cc52a44ca0f3.jpg")}
            alt="Heybike mobile app"
          />
          <button type="button" onClick={() => setDialogOpen(true)}>
            Download APP <ArrowRight size={15} />
          </button>
        </article>
      </div>
      {dialogOpen && (
        <div
          className="hb-dialog-backdrop"
          role="presentation"
          onMouseDown={() => setDialogOpen(false)}
        >
          <div
            className="hb-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hb-app-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDialogOpen(false)}
              aria-label="Close app dialog"
            >
              <X />
            </button>
            <h3 id="hb-app-dialog-title">Download the Heybike App</h3>
            <p>
              The Heybike app makes owning your e-bike a better experience.
              Adjust speed limits, join social circles and manage your bike
              settings easily.
            </p>
            <div className="hb-qr">
              HEYBIKE
              <br />
              APP
            </div>
            <strong>Scan to Download for iOS & Android</strong>
          </div>
        </div>
      )}
    </section>
  );
}

export function PressReviews() {
  const [active, setActive] = useState(0);
  return (
    <section className="hb-section hb-press">
      <div className="hb-press-logos">
        {reviews.map((review, index) => (
          <button
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            key={review.logo}
          >
            <img src={asset(review.logo)} alt="Press logo" />
          </button>
        ))}
      </div>
      <p aria-live="polite">“{reviews[active].quote}”</p>
    </section>
  );
}

export function RiderStories() {
  const [category, setCategory] = useState(0);
  const videos = [
    ["5zLyylV8uCU", "Saturn Dual-Battery: Real-World Review"],
    ["ivZosEFOvdc", "Heybike Saturn Review"],
    ["0TCU6pvDl5Q", "Ranger 3 Pro Review"],
  ];
  return (
    <section className="hb-section hb-stories">
      <h2>Professional Reviews</h2>
      <div className="hb-story-tabs" aria-label="Review category">
        {["Industry Experts", "Dealers"].map((label, index) => (
          <button
            type="button"
            aria-pressed={category === index}
            onClick={() => setCategory(index)}
            key={label}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="hb-story-grid">
        {videos.map(([id, title]) => (
          <article key={id}>
            <div>
              <img
                src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                alt=""
              />
              <button type="button" aria-label={`Play ${title}`}>
                <Play fill="currentColor" />
              </button>
            </div>
            <h3>{title}</h3>
            <p>
              {category === 0
                ? "Independent Heybike rider review"
                : "Recommended by Heybike dealers"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GuaranteeStrip() {
  return (
    <section className="hb-section hb-guarantees">
      <h2>Why Choose Heybike?</h2>
      <div>
        {guarantees.map(([image, label]) => (
          <article key={label}>
            <img src={asset(image)} alt="" />
            <h3>{label}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventsAndCommunity() {
  return (
    <>
      <section className="hb-section hb-events">
        <div className="hb-heading-row">
          <h2>Upcoming Events</h2>
          <a href="#community">
            View all <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="hb-event-grid">
          {events.map((event) => (
            <article key={event.name + event.place}>
              <img src={asset(event.image)} alt="" />
              <h3>{event.name}</h3>
              <p>📌 {event.place}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="hb-community" id="community">
        <h2>Our Journey at CES</h2>
        <p>
          Year after year, we proudly present our latest e-bike breakthroughs to
          the world.
        </p>
        <div>
          {communityImages.map((image, index) => (
            <img
              src={asset(image)}
              alt={`Heybike community ${index + 1}`}
              key={image}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogPreview() {
  return (
    <section className="hb-section hb-blog">
      <div className="hb-heading-row">
        <h2>You Might Be Interested In</h2>
        <a href="#top">
          View all <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="hb-blog-grid">
        {articles.map((article) => (
          <article key={article.title}>
            <div className="hb-blog-image">
              <img src={asset(article.image)} alt="" />
              <span>{article.tag}</span>
            </div>
            <small>{article.date}</small>
            <h3>{article.title}</h3>
            <a href="#top">Read more</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HeybikeFooter() {
  return (
    <footer className="hb-footer">
      <section className="hb-assistance">
        <div>
          <h2>We Are Here To Help</h2>
          <p>Please contact us if you have any question.</p>
          <a href="#top">
            Contact us <ArrowRight size={18} />
          </a>
        </div>
        <div>
          <h2>Sign Up And Save</h2>
          <p>Be the first to know Heybike News</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="hb-email">
              Email address
            </label>
            <input id="hb-email" type="email" placeholder="Enter your email" />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight />
            </button>
          </form>
        </div>
      </section>
      <div className="hb-footer-dark">
        <div className="hb-footer-main">
          <img src={asset("heybike-logo-footer.svg")} alt="Heybike" />
          <div>
            <h3>Ebikes</h3>
            <a href="#hot-picks">All Ebikes</a>
            <a href="#hot-picks">Folding Ebikes</a>
            <a href="#hot-picks">Commuter Ebikes</a>
          </div>
          <div>
            <h3>Support</h3>
            <a href="#smart-tech">Support Center</a>
            <a href="#community">Find a Dealer</a>
            <a href="#top">Track Your Order</a>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#community">Our Story</a>
            <a href="#community">Community</a>
            <a href="#top">Contact</a>
          </div>
          <div>
            <h3>Programs</h3>
            <a href="#top">Affiliate Program</a>
            <a href="#top">Dealer Program</a>
            <a href="#top">Student Discount</a>
          </div>
        </div>
        <div className="hb-copyright">
          <span>© 2026 Heybike. All rights reserved.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
