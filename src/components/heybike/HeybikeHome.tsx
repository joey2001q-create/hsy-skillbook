import { useEffect, useState } from "react";
import { HeybikeHeader } from "./HeybikeHeader";
import {
  BlogPreview,
  CompareBanner,
  EventsAndCommunity,
  GuaranteeStrip,
  HeybikeFooter,
  HeybikeHero,
  PressReviews,
  ProductShowcase,
  PromoTiles,
  RiderStories,
  SmartSupport,
} from "./HeybikeSections";
import "./heybike.css";

export function HeybikeHome() {
  const [announcement, setAnnouncement] = useState(2);
  const [promo, setPromo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const announcementTimer = window.setInterval(
      () => setAnnouncement((value) => (value + 1) % 3),
      5000,
    );
    const promoTimer = window.setInterval(
      () => setPromo((value) => (value + 1) % 2),
      5000,
    );
    return () => {
      window.clearInterval(announcementTimer);
      window.clearInterval(promoTimer);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("hb-lock", menuOpen);
    return () => document.body.classList.remove("hb-lock");
  }, [menuOpen]);

  return (
    <div className="heybike-page">
      <HeybikeHeader
        announcement={announcement}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
      />
      <HeybikeHero />
      <PromoTiles active={promo} onChange={setPromo} />
      <ProductShowcase />
      <CompareBanner />
      <SmartSupport />
      <PressReviews />
      <RiderStories />
      <GuaranteeStrip />
      <EventsAndCommunity />
      <BlogPreview />
      <HeybikeFooter />
    </div>
  );
}

export default HeybikeHome;
