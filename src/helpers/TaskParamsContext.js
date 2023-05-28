import { useReducer, createContext, useEffect, useRef } from "react";
import { taskParamsReducer } from "./taskParamsReducer";

const key = "taskParams";

// Define Context for game parameters
const initialTaskParams = [
  { name: "currentDecision", value: "" },
  { name: "gameData", value: {} },
  { name: "shuffle", value: {} },
  {
    name: "likelihoodFields",
    value: [
      { name: "input1", id: 1, value: "", isError: false },
      { name: "input2", id: 2, value: "", isError: false },
      { name: "input3", id: 3, value: "", isError: false },
    ],
  },
];

export const TaskParamsContext = createContext(null);

export function TaskParamsContextProvider({ children }) {
  const hasLocalStorage = typeof window !== "undefined";
  let localState = null;
  if (hasLocalStorage) {
    localState = JSON.parse(window.localStorage.getItem(key));
  }
  const [state, dispatch] = useReducer(
    taskParamsReducer,
    localState || initialTaskParams
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
    <TaskParamsContext.Provider value={[state, dispatch]}>
      {children}
    </TaskParamsContext.Provider>
  );
}
