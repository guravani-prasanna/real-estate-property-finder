import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Star, Home } from "lucide-react";

// Used only on the /properties page as a sub-header strip
export default function HeroBanner() {
  const scrollToFilters = () => {
    const el = document.getElementById("filters-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative py-8 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(245,158,11,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {[
                { icon: Home,   val: "450+",   label: "Listings" },
                { icon: MapPin, val: "38",     label: "Cities" },
                { icon: Star,   val: "4.9",    label: "Rating" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm">
                  <s.icon size={14} className="text-amber-500" />
                  <span className="font-bold text-white">{s.val}</span>
                  <span className="text-slate-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollToFilters}
            className="btn-gold px-6 py-3 text-sm uppercase tracking-wider inline-flex items-center gap-2 w-max"
          >
            Refine Search <ArrowDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
