import React from "react";
import { Link } from "react-router-dom";
import { Hexagon, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const links = {
  "Explore": ["Properties", "New Listings", "Luxury Estates", "Map Search"],
  "Company": ["About Us", "Our Agents", "Press", "Careers"],
  "Support": ["Contact", "FAQ", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 text-slate-400">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shadow-lg shadow-amber-500/20">
                <Hexagon className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="text-xl font-bold tracking-widest text-white uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>Aura</h2>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The pinnacle of luxury real estate. Curated properties, white-glove service, and an experience unlike any other.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-amber-500 shrink-0" />
                <span>214 Madison Avenue, New York, NY</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-amber-500 shrink-0" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-amber-500 shrink-0" />
                <span>hello@aura.estate</span>
              </div>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-500 mb-6">{group}</h3>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <Link to="/properties" className="text-sm hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all group">
                      <span className="h-px w-0 bg-amber-500 group-hover:w-3 transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 glass-panel rounded-[2rem]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Exclusive Market Insights</h3>
              <p className="text-sm">Be the first to know about our newest luxury listings and market trends.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="luxury-input px-5 py-3 text-sm flex-1 md:w-72" />
              <button type="submit" className="btn-gold px-6 py-3 text-sm uppercase tracking-wider shrink-0 flex items-center gap-2">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 <span className="text-amber-500 font-semibold">Aura Estate</span>. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            {["Privacy", "Terms", "Cookies"].map(l => (
              <a key={l} href="#" className="hover:text-amber-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
