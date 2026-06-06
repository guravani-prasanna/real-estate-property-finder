import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { PropertyContext } from "../context/PropertyContext";
import { createRoot } from "react-dom/client";
import { MapPin } from "lucide-react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function PopupContent({ property }) {
  const fmt = (n) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}K`;
  return (
    <div className="bg-card rounded-2xl overflow-hidden w-56 border border-line">
      <img src={property.image} alt={property.title} className="w-full h-32 object-cover" />
      <div className="p-3">
        <p className="text-head text-xs font-semibold leading-tight mb-1">{property.title}</p>
        <p className="text-muted text-[10px] mb-2">{property.city}</p>
        <span className="text-sm font-bold text-price">{fmt(property.price)}</span>
      </div>
    </div>
  );
}

export default function Map({ properties }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  const markersRef = useRef([]);
  const popupRef = useRef(null);
  const rootsRef = useRef([]);
  const { state, dispatch } = useContext(PropertyContext);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    rootsRef.current.forEach((r) => {
      try { r.unmount(); } catch (_) { }
    });
    rootsRef.current = [];
  }, []);

  useEffect(() => {
    if (mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: state.mapCenter,
      zoom: state.mapZoom,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
    });
    map.addControl(draw, "top-left");
    drawRef.current = draw;

    map.on("draw.create", (e) => {
      const coords = e.features[0]?.geometry?.coordinates[0];
      if (coords) dispatch({ type: "SET_POLYGON", payload: coords });
    });
    map.on("draw.delete", () => dispatch({ type: "SET_POLYGON", payload: null }));
    map.on("moveend", () => {
      const c = map.getCenter();
      dispatch({ type: "SET_MAP_VIEW", payload: { center: [c.lng, c.lat], zoom: map.getZoom() } });
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Draw mode toggle
  useEffect(() => {
    const draw = drawRef.current;
    if (!draw) return;
    if (state.drawMode) {
      draw.changeMode("draw_polygon");
      dispatch({ type: "SET_DRAW_MODE", payload: false });
    }
  }, [state.drawMode, dispatch]);

  // Re‑render markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const doRender = () => {
      clearMarkers();
      if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }

      properties.forEach((prop) => {
        const el = document.createElement("div");
        el.className = "nexus-marker";
        el.style.cssText = `
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #8b5cf6; border: 2px solid #080808;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.3), 0 4px 12px rgba(0,0,0,0.5);
          cursor: pointer; transition: transform 0.2s;
        `;
        el.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
        el.addEventListener("mouseenter", () => (el.style.transform = "scale(1.2)"));
        el.addEventListener("mouseleave", () => (el.style.transform = "scale(1)"));

        const popup = new mapboxgl.Popup({ offset: 20, closeButton: false, maxWidth: "none" });
        const popupNode = document.createElement("div");
        const root = createRoot(popupNode);
        root.render(<PopupContent property={prop} />);
        rootsRef.current.push(root);
        popup.setDOMContent(popupNode);

        el.addEventListener("click", () => {
          dispatch({ type: "HIGHLIGHT_PROPERTY", payload: prop.id });
          if (popupRef.current) popupRef.current.remove();
          popup.setLngLat([prop.longitude, prop.latitude]).addTo(map);
          popupRef.current = popup;
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat([prop.longitude, prop.latitude])
          .addTo(map);
        markersRef.current.push(marker);
      });
    };

    if (map.isStyleLoaded()) doRender();
    else map.once("load", doRender);
  }, [properties, clearMarkers, dispatch]);

  // Fly to highlighted property
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !state.highlightedPropertyId) return;
    const prop = properties.find((p) => p.id === state.highlightedPropertyId);
    if (prop) {
      map.flyTo({ center: [prop.longitude, prop.latitude], zoom: 14, duration: 1200 });
    }
  }, [state.highlightedPropertyId, properties]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[480px] rounded-3xl overflow-hidden"
      data-testid="map-container"
    />
  );
}
