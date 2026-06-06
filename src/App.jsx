import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, X, Layers, ArrowRight } from "lucide-react";
import { PropertyContext } from "./context/PropertyContext";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import SavedProperties from "./pages/SavedProperties";
import SavedSearches from "./pages/SavedSearches";

/* ── Scroll‑to‑top on route change ── */
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

/* ── Navbar ── */
function Navbar() {
  const { state } = useContext(PropertyContext);
  const saved = state.savedProperties.length;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { label: "Discover",  to: "/properties" },
    { label: "Saved",     to: "/saved-properties" },
    { label: "Searches",  to: "/saved-searches" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/85 backdrop-blur-2xl border-b border-line shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="shell h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-panel border border-line flex items-center justify-center group-hover:border-violet-500/50 transition-colors">
              <Layers size={18} className="text-violet-400" />
            </div>
            <span
              className="font-display text-[1.15rem] font-bold text-head tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Nexus<span className="text-violet-400">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={({ isActive }) =>
              `text-sm font-medium px-3 py-2 rounded-lg transition-colors ${isActive ? "text-head" : "text-dim hover:text-body"}`
            }>Home</NavLink>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) =>
                `text-sm font-medium px-3 py-2 rounded-lg transition-colors ${isActive ? "text-head" : "text-dim hover:text-body"}`
              }>{l.label}</NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Saved heart */}
            <Link to="/saved-properties" className="relative btn-icon hidden md:flex">
              <Heart size={17} className={saved > 0 ? "fill-violet-400 text-violet-400" : ""} />
              {saved > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {saved}
                </span>
              )}
            </Link>

            <Link to="/properties" className="btn-white hidden md:inline-flex text-sm px-4 py-2">
              Browse <ArrowRight size={14} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="btn-icon md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-bg/95 backdrop-blur-2xl border-b border-line md:hidden"
          >
            <div className="shell py-6 flex flex-col gap-1">
              {[{ label: "Home", to: "/", end: true }, ...links].map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                      isActive ? "text-head bg-panel" : "text-dim hover:text-body hover:bg-panel/50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="sep mt-3 mb-2" />
              <Link to="/properties" className="btn-white w-full justify-center py-3">
                Browse Properties <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-line bg-panel/50 mt-auto">
      <div className="shell py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Layers size={16} className="text-violet-400" />
          <span className="font-display font-bold text-head" style={{ fontFamily: "'Syne', sans-serif" }}>
            Nexus<span className="text-violet-400">.</span>
          </span>
          <span className="text-muted text-sm">© 2026 All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-sm text-dim">
          {["Privacy", "Terms", "Status", "Contact"].map((t) => (
            <a key={t} href="#" className="hover:text-body transition-colors">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <div className="flex flex-col min-h-screen bg-bg">
        <Navbar />
        <main className="flex-1 flex flex-col pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/saved-properties" element={<SavedProperties />} />
            <Route path="/saved-searches" element={<SavedSearches />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
