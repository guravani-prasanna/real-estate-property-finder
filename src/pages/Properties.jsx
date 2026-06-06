import React, { useContext, useMemo, useState } from "react";
import { PropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import Map from "../components/Map";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, List, MapIcon, Columns, Home,
  BedDouble, Bath, Maximize2, MapPin, X,
} from "lucide-react";

const VIEW_OPTS = [
  { key: "list",  label: "Grid",  Icon: LayoutGrid },
  { key: "split", label: "Split", Icon: Columns },
  { key: "map",   label: "Map",   Icon: MapIcon },
];

const fmt = (n) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}K`;

export default function Properties() {
  const { state, dispatch } = useContext(PropertyContext);
  const [view, setView] = useState("split");

  const cities = useMemo(
    () => Array.from(new Set(state.properties.map((p) => p.city))).length,
    [state.properties]
  );

  const selected = state.properties.find(
    (p) => p.id === state.highlightedPropertyId
  );

  const clearHighlight = () =>
    dispatch({ type: "HIGHLIGHT_PROPERTY", payload: null });

  return (
    <div className="min-h-screen bg-bg text-body">
      {/* Page header */}
      <div className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 bg-glow-tl pointer-events-none opacity-60" />
        <div className="shell relative z-10 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="section-label mb-2">Browse</p>
              <h1
                className="text-head font-bold leading-none"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                All Properties
              </h1>
              <p className="text-body mt-3 text-sm max-w-lg">
                Explore our curated portfolio of premium properties across the nation's
                most sought-after addresses.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3 shrink-0">
              {[
                { val: cities,                          label: "Cities" },
                { val: state.filteredProperties.length, label: "Listings" },
                { val: "24/7",                          label: "Support" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-panel border border-line rounded-2xl px-5 py-4 text-center min-w-[80px]"
                >
                  <p
                    className="text-head font-bold text-xl"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {s.val}
                  </p>
                  <p className="text-muted text-[10px] font-medium uppercase tracking-wider mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-8 space-y-6">
        {/* Filters */}
        <SearchFilters />

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-dim">
            <span className="text-head font-semibold">{state.filteredProperties.length}</span>
            {" "}properties found
          </p>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-panel border border-line rounded-xl p-1">
            {VIEW_OPTS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  view === key
                    ? "bg-violet-500 text-white"
                    : "text-dim hover:text-body"
                }`}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div
          className={`gap-6 ${
            view === "split"
              ? "grid lg:grid-cols-[1fr_1fr]"
              : "grid"
          }`}
        >
          {/* ── Property list ── */}
          {(view === "list" || view === "split") && (
            <div>
              {state.filteredProperties.length > 0 ? (
                <div
                  className={`grid gap-5 ${
                    view === "list"
                      ? "sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2"
                  }`}
                >
                  {state.filteredProperties.map((prop, i) => (
                    <PropertyCard key={prop.id} property={prop} index={i} />
                  ))}
                </div>
              ) : (
                <div className="bg-panel border border-line rounded-3xl py-24 px-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-bg border border-line flex items-center justify-center mb-6">
                    <Home size={24} className="text-muted" />
                  </div>
                  <h3
                    className="text-head font-bold text-xl mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    No properties found
                  </h3>
                  <p className="text-muted text-sm max-w-sm mb-8">
                    Try adjusting your filters or broadening your search to explore more listings.
                  </p>
                  <button
                    onClick={() =>
                      dispatch({ type: "SET_FILTERS", payload: { location: "", priceMin: "", priceMax: "", bedrooms: "" } })
                    }
                    className="btn-ghost text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Map panel ── */}
          {(view === "map" || view === "split") && (
            <div className="space-y-4">
              {/* Selected property preview */}
              <AnimatePresence>
                {selected ? (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-panel border border-violet-500/30 rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex gap-4 items-center min-w-0">
                        <img
                          src={selected.image}
                          alt={selected.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-head font-semibold text-sm truncate">{selected.title}</p>
                          <p className="text-muted text-xs flex items-center gap-1 mt-0.5">
                            <MapPin size={10} />{selected.city}
                          </p>
                          <div className="flex gap-3 mt-2 text-xs text-dim">
                            <span className="flex items-center gap-1"><BedDouble size={11} className="text-violet-400/70" />{selected.bedrooms}</span>
                            <span className="flex items-center gap-1"><Bath size={11} className="text-cyan-400/70" />{selected.bathrooms}</span>
                            <span className="flex items-center gap-1"><Maximize2 size={10} className="text-emerald-400/70" />{selected.sqft?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="text-xl font-bold text-price"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {fmt(selected.price)}
                        </span>
                        <button
                          onClick={clearHighlight}
                          className="btn-icon w-8 h-8 rounded-lg"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-panel border border-dashed border-line rounded-2xl py-4 px-6 flex items-center gap-3 text-muted text-xs"
                  >
                    <MapPin size={14} />
                    Click a card or map pin to preview property details here
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Map container */}
              <div className="bg-panel border border-line rounded-3xl overflow-hidden relative" style={{ minHeight: "540px" }}>
                <div className="absolute top-4 left-4 z-10">
                  <span className="pill pill-active text-[10px]">
                    {state.filteredProperties.length} Live Pins
                  </span>
                </div>
                <Map properties={state.filteredProperties} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
