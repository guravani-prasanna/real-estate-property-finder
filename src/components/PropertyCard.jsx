import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { PropertyContext } from "../context/PropertyContext";

const fmt = (n) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${(n / 1_000).toFixed(0)}K`;

export default function PropertyCard({ property, index = 0 }) {
  const { state, dispatch } = useContext(PropertyContext);
  const isSaved = state.savedProperties.includes(property.id);
  const isHighlighted = state.highlightedPropertyId === property.id;

  const toggleSave = (e) => {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_SAVE_PROPERTY", payload: property.id });
  };

  const highlight = () =>
    dispatch({ type: "HIGHLIGHT_PROPERTY", payload: property.id });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={highlight}
      data-testid={`property-card-${property.id}`}
      className={`prop-card group relative ${
        isHighlighted
          ? "border-violet-500/60 shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_20px_60px_rgba(0,0,0,0.6)]"
          : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56 rounded-t-3xl">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Top row badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
          <span className="pill text-[10px] font-bold uppercase tracking-wider bg-bg/80 backdrop-blur border-white/10 text-body">
            {property.city}
          </span>
          <button
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
            data-testid={`save-button-${property.id}`}
            className={`w-9 h-9 rounded-xl backdrop-blur flex items-center justify-center border transition-all duration-200 ${
              isSaved
                ? "bg-violet-500 border-violet-400 text-white shadow-glow-v"
                : "bg-bg/70 border-white/10 text-dim hover:border-violet-500/50 hover:text-violet-400"
            }`}
          >
            <Heart size={15} className={isSaved ? "fill-white" : ""} />
          </button>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3.5 left-3.5">
          <span className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            {fmt(property.price)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3
          className="text-head font-semibold text-base mb-1 leading-snug line-clamp-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {property.title}
        </h3>
        <p className="flex items-center gap-1.5 text-muted text-xs mb-4">
          <MapPin size={11} />
          {property.address}
        </p>

        {/* Separator */}
        <div className="sep mb-4" />

        {/* Stats row */}
        <div className="flex items-center gap-4 text-dim text-xs">
          <span className="flex items-center gap-1.5">
            <BedDouble size={13} className="text-violet-400/80" />
            <span className="font-semibold text-body">{property.bedrooms}</span> bd
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} className="text-cyan-400/80" />
            <span className="font-semibold text-body">{property.bathrooms}</span> ba
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={12} className="text-emerald-400/70" />
            <span className="font-semibold text-body">{property.sqft?.toLocaleString()}</span> ft²
          </span>
        </div>
      </div>
    </motion.div>
  );
}
