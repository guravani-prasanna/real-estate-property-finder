import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Search, Layers } from "lucide-react";
import { PropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";

export default function SavedProperties() {
  const { state } = useContext(PropertyContext);
  const saved = state.properties.filter((p) =>
    state.savedProperties.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-bg text-body">
      {/* Header */}
      <div className="border-b border-line relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-tl pointer-events-none opacity-50" />
        <div className="shell relative z-10 py-14">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-panel border border-line flex items-center justify-center">
              <Heart
                size={24}
                className={
                  saved.length > 0
                    ? "fill-violet-400 text-violet-400"
                    : "text-muted"
                }
              />
            </div>
            <div>
              <p className="section-label mb-1">Your Collection</p>
              <h1
                className="text-head font-bold"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Saved Properties
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-10">
        {saved.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-panel border border-line rounded-3xl py-32 px-8 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-bg border border-line flex items-center justify-center mb-8">
              <Heart size={32} className="text-muted" />
            </div>
            <h2
              className="text-head font-bold text-2xl mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Nothing saved yet
            </h2>
            <p className="text-muted text-sm max-w-sm mb-8 leading-relaxed">
              Browse our curated listings and tap the heart icon on any property
              to add it to your personal collection.
            </p>
            <Link to="/properties" className="btn-grad px-6 py-3 rounded-xl text-sm">
              <Search size={14} /> Browse Listings
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-dim">
                <span className="text-head font-semibold text-lg">{saved.length}</span>
                {" "}saved propert{saved.length !== 1 ? "ies" : "y"}
              </p>
              <Link to="/properties" className="btn-ghost text-sm">
                + Add more
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {saved.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
