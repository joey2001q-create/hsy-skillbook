import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { announcements, asset } from "./heybike-data";

type Props = {
  announcement: number;
  menuOpen: boolean;
  onMenuToggle: () => void;
};

const navItems = [
  "Fall Riding",
  "Ebikes",
  "Electric Dirt Bike",
  "Accessories",
  "Explore",
  "Support",
  "Dealer",
];

export function HeybikeHeader({ announcement, menuOpen, onMenuToggle }: Props) {
  return (
    <>
      <div className="hb-announcement">
        <div className="hb-social" aria-label="Social links">
          <span>f</span>
          <span>𝕏</span>
          <span>◎</span>
          <span>▶</span>
          <span>♪</span>
          <span>p</span>
        </div>
        <div className="hb-announcement-copy" aria-live="polite">
          {announcements[announcement]}
        </div>
        <button type="button" className="hb-country">
          United States <ChevronDown size={13} />
        </button>
      </div>
      <header className="hb-header">
        <button
          className="hb-mobile-icon"
          type="button"
          onClick={onMenuToggle}
          aria-expanded={menuOpen}
          aria-controls="heybike-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <a className="hb-logo" href="#top" aria-label="Heybike home">
          <img
            src={asset("heybike-logo_c0d69677-ad00-41d8-940c-f1aeac5cee34.svg")}
            alt="Heybike"
          />
        </a>
        <nav className="hb-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <div className="hb-nav-item" key={item}>
              <button type="button">
                <span>{item}</span>
                {item === "Fall Riding" && <b>Hot</b>}
                {!["Fall Riding", "Electric Dirt Bike"].includes(item) && (
                  <ChevronDown size={13} />
                )}
              </button>
              {["Ebikes", "Accessories", "Explore", "Support"].includes(
                item,
              ) && (
                <div className="hb-mega">
                  <strong>{item}</strong>
                  <a href="#hot-picks">Shop by Model</a>
                  <a href="#smart-tech">Featured Collections</a>
                  <a href="#community">Discover Heybike</a>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hb-tools">
          <button type="button" aria-label="Search">
            <Search />
          </button>
          <button type="button" aria-label="Account" className="hb-account">
            <UserRound />
          </button>
          <button type="button" aria-label="Cart">
            <ShoppingCart />
          </button>
        </div>
      </header>
      <div
        id="heybike-mobile-menu"
        className={`hb-mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <a
            href={`#${item === "Ebikes" ? "hot-picks" : "top"}`}
            onClick={onMenuToggle}
            key={item}
          >
            <span>{item}</span>
            <span>›</span>
          </a>
        ))}
        <div className="hb-mobile-menu-meta">
          <span>United States</span>
          <span>Find a dealer</span>
        </div>
      </div>
    </>
  );
}
