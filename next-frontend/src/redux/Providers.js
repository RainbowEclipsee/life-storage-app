"use client";

import { Provider } from "react-redux";
import store from "./store";
import { WeeksContext } from "../context/WeeksContext";

export function Providers({ children }) {
  const weeksValue = {
    future: [], 
    past: [],
  };

  return (
    <Provider store={store}>
      <WeeksContext.Provider value={weeksValue}>
        {children}
      </WeeksContext.Provider>
    </Provider>
  );
}
