import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, MapPin, BedDouble, Bath, Maximize2,
  Star, Shield, Zap, Globe, TrendingUp, ChevronRight,
} from "lucide-react";
import { properties } from "../data/properties";

const featured = properties.slice(0, 6);
const stats = [
  { val: "450+", label: "Active Listings" },
  { val: "$1.2B", label: "Total Volume" },
  { val: "98%",  label: "Client Satisfaction" },
  { val: "12",   label: "Cities Covered" },
];
const features = [
  { icon: Zap,       title: "Instant Results",     desc: "Live filtering with zero page reloads. Search feels like magic." },
  { icon: MapPin,    title: "Precision Mapping",    desc: "Interactive map with polygon draw to search any custom boundary." },
  { icon: Shield,    title: "Verified Listings",    desc: "Every property is manually reviewed before appearing on the platform." },
  { icon: Globe,     title: "Global Reach",         desc: "Curated properties across San Francisco, LA, and New York." },
  { icon: TrendingUp,title: "Market Intelligence",  desc: "Real-time pricing data and neighborhood trend overlays." },
  { icon: Star,      title: "Saved Collections",    desc: "Build and manage your personal wishlist with one click." },
];

const fmt = (n) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}K`;

function HeroSearch() {
  const [query, setQuery] = useState("");
  return (
    <div className="relative flex items-center gap-3 bg-panel border border-line rounded-2xl p-2 shadow-[0_8px_40px_rgba(0,0,0,0.6)] max-w-2xl">
      <Search size={18} className="text-muted ml-3 shrink-0" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by city, neighborhood, or address…"
        className="flex-1 bg-transparent text-head placeholder:text-muted text-sm outline-none py-2"
      />
      <Link
        to={`/properties${query ? `?q=${encodeURIComponent(query)}` : ""}`}
        className="btn-grad px-5 py-2.5 rounded-xl text-sm shrink-0"
      >
        Search <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function FeaturedCard({ property, index }) {
  const fmt2 = (n) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}K`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to="/properties" className="block prop-card group">
        <div className="relative h-52 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              {fmt2(property.price)}
            </span>
            <span className="pill text-[10px] bg-bg/80 backdrop-blur border-white/10 text-body">
              {property.city}
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-head font-semibold text-sm line-clamp-1 mb-1">{property.title}</p>
          <p className="text-muted text-xs mb-3 flex items-center gap-1"><MapPin size={10} />{property.address}</p>
          <div className="sep mb-3" />
          <div className="flex gap-3 text-xs text-dim">
            <span className="flex items-center gap-1"><BedDouble size={11} className="text-violet-400/70" /><span className="text-body font-medium">{property.bedrooms}</span> bd</span>
            <span className="flex items-center gap-1"><Bath size={11} className="text-cyan-400/70" /><span className="text-body font-medium">{property.bathrooms}</span> ba</span>
            <span className="flex items-center gap-1"><Maximize2 size={10} className="text-emerald-400/70" /><span className="text-body font-medium">{property.sqft?.toLocaleString()}</span> ft²</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="bg-bg text-body overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 bg-glow-tl pointer-events-none" />
        <div className="absolute inset-0 bg-glow-br pointer-events-none" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="shell relative z-10 py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-400 text-xs font-semibold tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-slow" />
              The premier real estate discovery platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-head font-bold leading-[1.08] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Find your next{" "}
              <span className="text-brand">dream home</span>
              {" "}with precision.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body text-lg max-w-xl mx-auto leading-relaxed"
            >
              Search 450+ curated properties across the nation's top cities.
              Interactive maps, smart filters, and zero compromise on quality.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <HeroSearch />
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {["San Francisco", "Los Angeles", "New York", "Penthouse", "Beachfront"].map((t) => (
                <Link
                  key={t}
                  to="/properties"
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-line text-muted hover:border-subtle hover:text-body transition-all"
                >
                  {t}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-panel px-6 py-6 text-center">
                <p
                  className="text-head font-bold text-2xl mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.val}
                </p>
                <p className="text-muted text-xs font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="py-24 border-t border-line">
        <div className="shell">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-label mb-2">Featured</p>
              <h2 className="section-title text-4xl md:text-5xl">Top Listings</h2>
            </div>
            <Link to="/properties" className="btn-ghost text-sm flex items-center gap-2 self-start sm:self-auto">
              View all <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <FeaturedCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24 border-t border-line bg-panel/30">
        <div className="shell">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="section-label mb-3">Why Nexus</p>
            <h2 className="section-title text-4xl md:text-5xl mb-4">
              Built for serious buyers
            </h2>
            <p className="text-body text-base">
              We built the tools we wished existed when searching for a home.
              No gimmicks — just powerful, fast, accurate search.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-card border border-line rounded-2xl p-6 hover:border-subtle transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/15 transition-colors">
                  <f.icon size={18} className="text-violet-400" />
                </div>
                <h3 className="text-head font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP PROMO ── */}
      <section className="py-24 border-t border-line">
        <div className="shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="section-label">Map Explorer</p>
              <h2 className="section-title text-4xl md:text-5xl">
                Search any neighborhood,<br />draw your own boundary.
              </h2>
              <p className="text-body leading-relaxed">
                Our interactive map lets you drop into any city, zoom into exact neighborhoods,
                draw custom polygon areas, and see only the properties that matter to you.
              </p>
              <ul className="space-y-3">
                {["Draw polygon search areas", "Live pin updates as you filter", "Click pins to preview details"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/properties" className="btn-grad inline-flex">
                Open Map Explorer <ArrowRight size={15} />
              </Link>
            </div>

            {/* Decorative map card */}
            <Link to="/properties" className="block group">
              <div className="relative h-96 bg-card border border-line rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1400"
                  alt="Map view"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/15" />
                {/* Fake pins */}
                {[
                  { top: "35%", left: "28%" },
                  { top: "55%", left: "62%" },
                  { top: "70%", left: "40%" },
                ].map((pos, i) => (
                  <div key={i} className="absolute flex items-center justify-center w-10 h-10" style={pos}>
                    <span className="absolute w-10 h-10 bg-violet-500/25 rounded-full animate-ping" />
                    <span className="w-4 h-4 bg-violet-500 rounded-full shadow-glow-v" />
                  </div>
                ))}
                {/* Center CTA */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass rounded-2xl px-8 py-5 text-center group-hover:border-violet-500/30 transition-colors">
                    <MapPin size={28} className="text-violet-400 mx-auto mb-2" />
                    <p className="text-head font-semibold text-sm">Explore the Map</p>
                    <p className="text-muted text-xs mt-1">Click to open full explorer</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-line relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-center pointer-events-none" />
        <div className="shell relative z-10 text-center space-y-8">
          <p className="section-label">Get Started</p>
          <h2
            className="text-head font-bold leading-tight"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Ready to find your next property?
          </h2>
          <p className="text-body text-lg max-w-xl mx-auto">
            Join thousands of buyers who discovered their perfect home on Nexus.
            Start browsing — no account required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/properties" className="btn-grad px-7 py-3.5 text-base rounded-xl">
              Browse All Listings <ArrowRight size={16} />
            </Link>
            <Link to="/properties" className="btn-ghost px-7 py-3.5 text-base rounded-xl">
              Open Map View
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
