import { useReducer, createContext, useEffect, useRef } from "react";
import { sessionParamsReducer } from "../helpers/sessionParamsReducer";

const key = "sessionParams";

// Define initial session parameters
const initialSessionParams = [
  { name: "progressStatus", value: ["current", "upcoming", "upcoming"] },
  { name: "trialCount", value: 0 },
  { name: "partCount", value: 0 },
  { name: "partsWithFeedback", value: [1] },
  { name: "dataWriter", value: true },
];

export const SessionParamsContext = createContext(null);

export function SessionParamsContextProvider({ children }) {
  const hasLocalStorage = typeof window !== "undefined";
  let localState = null;
  if (hasLocalStorage) {
    localState = JSON.parse(window.localStorage.getItem(key));
  }
  const [state, dispatch] = useReducer(
    sessionParamsReducer,
    localState || initialSessionParams
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
    <SessionParamsContext.Provider value={[state, dispatch]}>
      {children}
    </SessionParamsContext.Provider>
  );
}
