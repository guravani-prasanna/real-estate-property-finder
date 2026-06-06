import React, { createContext, useReducer } from "react";
import { properties } from "../data/properties";
import { haversineDistance } from "../utils/haversine";
import { isPointInPolygon } from "../utils/rayCasting";

export const PropertyContext = createContext();

const loadSavedData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState = {
  properties: properties,
  filteredProperties: properties,
  savedProperties: loadSavedData("savedProperties"),
  filters: {
    location: "",
    radius: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
  },
  polygon: null,
  highlightedPropertyId: null,
  mapCenter: [-122.4194, 37.7749],
  mapZoom: 10,
  savedSearches: loadSavedData("savedSearches"),
  drawMode: false,
};

function propertyReducer(state, action) {
  switch (action.type) {
    case "SET_FILTERS": {
      const newFilters = { ...state.filters, ...action.payload };
      let filtered = state.properties;

      if (newFilters.location) {
        filtered = filtered.filter(
          (p) =>
            p.city.toLowerCase().includes(newFilters.location.toLowerCase()) ||
            p.address.toLowerCase().includes(newFilters.location.toLowerCase()),
        );
      }
      if (newFilters.priceMin) {
        filtered = filtered.filter(
          (p) => p.price >= Number(newFilters.priceMin),
        );
      }
      if (newFilters.priceMax) {
        filtered = filtered.filter(
          (p) => p.price <= Number(newFilters.priceMax),
        );
      }
      if (newFilters.bedrooms) {
        filtered = filtered.filter(
          (p) => p.bedrooms >= Number(newFilters.bedrooms),
        );
      }

      if (newFilters.radius && newFilters.location) {
        const ref = state.properties.find((p) =>
          p.city.toLowerCase().includes(newFilters.location.toLowerCase()),
        );
        if (ref) {
          filtered = filtered.filter((p) => {
            const dist = haversineDistance(
              { lat: ref.latitude, lng: ref.longitude },
              { lat: p.latitude, lng: p.longitude },
            );
            return dist <= Number(newFilters.radius);
          });
        }
      }
      if (state.polygon && state.polygon.length > 0) {
        filtered = filtered.filter((p) =>
          isPointInPolygon([p.longitude, p.latitude], state.polygon),
        );
      }
      return { ...state, filters: newFilters, filteredProperties: filtered };
    }
    case "SET_POLYGON": {
      let filtered = state.properties;
      if (action.payload && action.payload.length > 0) {
        filtered = filtered.filter((p) =>
          isPointInPolygon([p.longitude, p.latitude], action.payload),
        );
      }
      return {
        ...state,
        polygon: action.payload,
        filteredProperties: filtered,
      };
    }
    case "HIGHLIGHT_PROPERTY":
      return { ...state, highlightedPropertyId: action.payload };
    case "TOGGLE_SAVE_PROPERTY": {
      const id = action.payload;
      const isSaved = state.savedProperties.includes(id);
      const nextSaved = isSaved
        ? state.savedProperties.filter((pid) => pid !== id)
        : [...state.savedProperties, id];
      localStorage.setItem("savedProperties", JSON.stringify(nextSaved));
      return { ...state, savedProperties: nextSaved };
    }
    case "SET_DRAW_MODE": {
      return { ...state, drawMode: action.payload };
    }
    case "SET_MAP_VIEW": {
      return {
        ...state,
        mapCenter: action.payload.center,
        mapZoom: action.payload.zoom,
      };
    }
    case "SAVE_SEARCH": {
      const newSearch = {
        filters: state.filters,
        polygon: state.polygon,
        mapCenter: state.mapCenter,
        mapZoom: state.mapZoom,
        id: Date.now(),
      };
      const searches = [...state.savedSearches, newSearch];
      localStorage.setItem("savedSearches", JSON.stringify(searches));
      return { ...state, savedSearches: searches };
    }
    case "LOAD_SEARCH": {
      const loaded = action.payload;
      return propertyReducer(
        {
          ...state,
          filters: loaded.filters,
          polygon: loaded.polygon,
          mapCenter: loaded.mapCenter,
          mapZoom: loaded.mapZoom,
        },
        { type: "SET_FILTERS", payload: loaded.filters },
      );
    }
    default:
      return state;
  }
}

export const PropertyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);
  return (
    <PropertyContext.Provider value={{ state, dispatch }}>
      {children}
    </PropertyContext.Provider>
  );
};
