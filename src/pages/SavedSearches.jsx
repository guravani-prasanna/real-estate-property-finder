import React, { useContext } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, ArrowRight, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

export default function SavedSearches() {
  const { state, dispatch } = useContext(PropertyContext);
  const navigate = useNavigate();

  const handleLoad = (search) => {
    dispatch({ type: "LOAD_SEARCH", payload: search });
    navigate("/properties");
  };

  const searches = state.savedSearches || [];

  return (
    <div className="min-h-screen bg-bg text-body">
      {/* Header */}
      <div className="border-b border-line relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-tl pointer-events-none opacity-50" />
        <div className="shell relative z-10 py-14">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-panel border border-line flex items-center justify-center">
              <Bookmark size={22} className="text-violet-400" />
            </div>
            <div>
              <p className="section-label mb-1">Your History</p>
              <h1
                className="text-head font-bold"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Saved Searches
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-10">
        {searches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-panel border border-line rounded-3xl py-32 px-8 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-bg border border-line flex items-center justify-center mb-8">
              <Search size={30} className="text-muted" />
            </div>
            <h2
              className="text-head font-bold text-2xl mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              No saved searches
            </h2>
            <p className="text-muted text-sm max-w-sm mb-8 leading-relaxed">
              Filter properties on the browse page and click "Save Search" to bookmark
              your criteria for quick re-use later.
            </p>
            <button
              onClick={() => navigate("/properties")}
              className="btn-grad px-6 py-3 rounded-xl text-sm"
            >
              <Search size={14} /> Explore Properties
            </button>
          </motion.div>
        ) : (
          <>
            <p className="text-sm text-dim mb-8">
              <span className="text-head font-semibold">{searches.length}</span>
              {" "}saved search{searches.length !== 1 ? "es" : ""}
            </p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {searches.map((search, i) => {
                const date = new Date(search.id).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                });
                return (
                  <motion.div
                    key={search.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-card border border-line rounded-3xl p-6 flex flex-col gap-5 hover:border-subtle transition-all"
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3
                          className="text-head font-bold text-base"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          Search #{i + 1}
                        </h3>
                        <div className="flex items-center gap-1.5 text-muted text-xs mt-1">
                          <Calendar size={11} /> {date}
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <Search size={14} className="text-violet-400" />
                      </div>
                    </div>

                    {/* Filter details */}
                    <div className="bg-bg border border-line rounded-2xl p-4 space-y-2.5 text-xs">
                      <div className="flex items-center gap-2 text-body">
                        <MapPin size={12} className="text-violet-400/80 shrink-0" />
                        <span className="text-muted">Location:</span>
                        <span className="text-head font-medium">
                          {search.filters?.location || "Anywhere"}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>
                          Radius:{" "}
                          <span className="text-body font-medium">{search.filters?.radius || "10"} km</span>
                        </span>
                        <span>
                          Max:{" "}
                          <span className="text-body font-medium">
                            {search.filters?.priceMax
                              ? `$${Number(search.filters.priceMax).toLocaleString()}`
                              : "Any"}
                          </span>
                        </span>
                      </div>
                      {search.filters?.bedrooms && (
                        <div className="text-muted">
                          Beds: <span className="text-body font-medium">{search.filters.bedrooms}+</span>
                        </div>
                      )}
                      {search.polygon && (
                        <span className="pill pill-active text-[10px] inline-flex">
                          Custom map boundary
                        </span>
                      )}
                    </div>

                    {/* Load button */}
                    <button
                      onClick={() => handleLoad(search)}
                      className="btn-white w-full py-2.5 rounded-xl text-sm mt-auto flex items-center justify-center gap-2"
                    >
                      Load Search <ArrowRight size={14} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
