import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getSessionJSON, setSessionJSON } from "../lib/storage";

const STORAGE_KEY = "exhibition:v1";

const ExhibitionContext = createContext(null);

const initialState = {
  items: [], // array of normalized artworks
  meta: { title: "", description: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.payload };
    case "add":
      if (state.items.some((i) => i.id === action.item.id)) return state;
      return { ...state, items: [...state.items, action.item] };
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "move": {
      const next = [...state.items];
      const [moved] = next.splice(action.from, 1);
      next.splice(action.to, 0, moved);
      return { ...state, items: next };
    }
    case "clear":
      return { ...state, items: [] };
    case "meta":
      return { ...state, meta: { ...state.meta, ...action.meta } };
    default:
      return state;
  }
}

export function ExhibitionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // hydrate on mount
  useEffect(() => {
    const saved = getSessionJSON(STORAGE_KEY);
    if (saved) {
      dispatch({ type: "hydrate", payload: saved });
    }
  }, []);

  // persist on change
  useEffect(() => {
    setSessionJSON(STORAGE_KEY, { items: state.items, meta: state.meta });
  }, [state.items, state.meta]);

  const value = { state, dispatch };
  return (
    <ExhibitionContext.Provider value={value}>
      {children}
    </ExhibitionContext.Provider>
  );
}

export function useExhibition() {
  const ctx = useContext(ExhibitionContext);
  if (!ctx)
    throw new Error("useExhibition must be used within ExhibitionProvider");
  return ctx;
}
