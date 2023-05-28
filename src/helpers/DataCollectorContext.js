import { useReducer, createContext, useEffect, useRef } from "react";
import { dataCollectorReducer } from "./dataCollectorReducer";

const key = "dataCollector";

// Define Context for user parameters
const initialDataCollectorParams = [
  { name: "decision", value: [] },
  { name: "decisionLabel", value: [] },
  { name: "earnedPoints", value: [] },
  { name: "eqPoints", value: [] },
  { name: "accuracy", value: [] },
  { name: "isEqDecision", value: [] },
  { name: "likelihoodFields", value: [] },
  { name: "gamePayoffs", value: [] },
  { name: "gameId", value: [] },
  { name: "trial", value: [] },
  { name: "part", value: [] },
  { name: "failedAttempts", value: 0 },
];

export const DataCollectorContext = createContext(null);

export function DataCollectorContextProvider({ children }) {
  const hasLocalStorage = typeof window !== "undefined";
  let localState = null;
  if (hasLocalStorage) {
    localState = JSON.parse(window.localStorage.getItem(key));
  }
  const [state, dispatch] = useReducer(
    dataCollectorReducer,
    localState || initialDataCollectorParams
  );
  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state, JSON.stringify(state)]);

  return (
    <DataCollectorContext.Provider value={[state, dispatch]}>
      {children}
    </DataCollectorContext.Provider>
  );
}
