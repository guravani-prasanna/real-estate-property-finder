import React, { useContext, useState } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { Search, SlidersHorizontal, X, Save, ChevronDown, PenLine } from "lucide-react";

const DEFAULTS = {
  location: "", priceMin: "", priceMax: "", bedrooms: "",
  radius: "10", type: "", bathrooms: "", sort: "",
};

const QUICK = ["San Francisco", "Los Angeles", "New York"];
const BEDS = [1, 2, 3, 4, 5];
const TYPES = ["House", "Condo", "Studio", "Villa", "Penthouse"];

export default function SearchFilters() {
  const { state, dispatch } = useContext(PropertyContext);
  const [local, setLocal] = useState(state.filters || DEFAULTS);
  const [showAdv, setShowAdv] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setLocal((p) => ({ ...p, [k]: v }));
  const onChange = (e) => set(e.target.name, e.target.value);

  const apply = () => dispatch({ type: "SET_FILTERS", payload: local });

  const clear = () => {
    setLocal(DEFAULTS);
    dispatch({ type: "SET_FILTERS", payload: DEFAULTS });
  };

  const saveSearch = () => {
    dispatch({ type: "SAVE_SEARCH" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const applyTag = (tag) => {
    const next = { ...local, location: tag };
    setLocal(next);
    dispatch({ type: "SET_FILTERS", payload: next });
  };

  return (
    <div id="filters-section" className="bg-panel border border-line rounded-3xl p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="section-label mb-0.5">Smart Search</p>
          <p className="text-head font-semibold text-base">Filter Properties</p>
        </div>
        {/* Quick city tags */}
        <div className="flex flex-wrap gap-2">
          {QUICK.map((t) => (
            <button
              key={t}
              onClick={() => applyTag(t)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                local.location === t
                  ? "bg-violet-500/15 border-violet-500/40 text-violet-400"
                  : "border-line text-muted hover:border-subtle hover:text-body"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main row */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto_auto]">
        {/* Location */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={15} />
          <input
            data-testid="location-autocomplete"
            name="location"
            value={local.location}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            placeholder="City, neighborhood, address…"
            className="field pl-10 text-sm"
          />
        </div>

        {/* Price Min */}
        <input
          data-testid="price-min-input"
          name="priceMin"
          value={local.priceMin}
          onChange={onChange}
          type="number"
          placeholder="Min $"
          className="field text-sm w-28"
        />

        {/* Price Max */}
        <input
          data-testid="price-max-input"
          name="priceMax"
          value={local.priceMax}
          onChange={onChange}
          type="number"
          placeholder="Max $"
          className="field text-sm w-28"
        />

        {/* Beds */}
        <div className="relative">
          <select
            data-testid="bedrooms-select"
            name="bedrooms"
            value={local.bedrooms}
            onChange={onChange}
            className="field-select text-sm w-32 pr-8"
            style={{ backgroundImage: "none" }}
          >
            <option value="">Any beds</option>
            {BEDS.map((n) => (
              <option key={n} value={n}>{n}+ beds</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>

        {/* Search button */}
        <button
          data-testid="apply-filters-button"
          onClick={apply}
          className="btn-white text-sm px-5 py-3 rounded-xl font-semibold whitespace-nowrap"
        >
          Search
        </button>
      </div>

      {/* Action row */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setShowAdv((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
            showAdv
              ? "bg-violet-500/10 border-violet-500/30 text-violet-400"
              : "border-line text-muted hover:border-subtle hover:text-body"
          }`}
        >
          <SlidersHorizontal size={13} /> Advanced
          <ChevronDown size={12} className={`transition-transform ${showAdv ? "rotate-180" : ""}`} />
        </button>

        <button
          onClick={clear}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-line text-muted hover:border-subtle hover:text-body transition-all"
        >
          <X size={13} /> Clear
        </button>

        <button
          onClick={() => dispatch({ type: "SET_DRAW_MODE", payload: true })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-line text-muted hover:border-subtle hover:text-body transition-all"
        >
          <PenLine size={13} /> Draw Area
        </button>

        <button
          onClick={saveSearch}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ml-auto ${
            saved
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "border-line text-muted hover:border-subtle hover:text-body"
          }`}
        >
          <Save size={13} /> {saved ? "Saved!" : "Save Search"}
        </button>
      </div>

      {/* Advanced panel */}
      {showAdv && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 bg-bg border border-line rounded-2xl p-5">
          {/* Radius */}
          <div>
            <label className="section-label block mb-2">
              Radius · {local.radius || 10}km
            </label>
            <input
              data-testid="search-radius-slider"
              name="radius"
              type="range"
              min="1"
              max="50"
              value={local.radius || 10}
              onChange={onChange}
            />
          </div>

          {/* Type */}
          <div>
            <label className="section-label block mb-2">Property Type</label>
            <div className="relative">
              <select
                name="type"
                value={local.type}
                onChange={onChange}
                className="field-select text-sm w-full pr-8"
                style={{ backgroundImage: "none" }}
              >
                <option value="">Any type</option>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="section-label block mb-2">Bathrooms</label>
            <div className="relative">
              <select
                name="bathrooms"
                value={local.bathrooms}
                onChange={onChange}
                className="field-select text-sm w-full pr-8"
                style={{ backgroundImage: "none" }}
              >
                <option value="">Any</option>
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="section-label block mb-2">Sort By</label>
            <div className="relative">
              <select
                name="sort"
                value={local.sort}
                onChange={onChange}
                className="field-select text-sm w-full pr-8"
                style={{ backgroundImage: "none" }}
              >
                <option value="">Recommended</option>
                <option value="priceLow">Price: Low → High</option>
                <option value="priceHigh">Price: High → Low</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Footer result count */}
      <div className="flex items-center gap-3 pt-1">
        <span className="pill pill-active">{state.filteredProperties.length} results</span>
        <span className="text-muted text-xs">Instant live filtering</span>
      </div>
    </div>
  );
}
