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

export { dataCollectorReducer };

function dataCollectorReducer(dataCollector, action) {
  switch (action.type) {
    case "storeDecision": {
      return dataCollector.map((param) => {
        if (param.name === "decision") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeDecisionLabel": {
      return dataCollector.map((param) => {
        if (param.name === "decisionLabel") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeEarnedPoints": {
      return dataCollector.map((param) => {
        if (param.name === "earnedPoints") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeEqPoints": {
      return dataCollector.map((param) => {
        if (param.name === "eqPoints") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeAccuracy": {
      return dataCollector.map((param) => {
        if (param.name === "accuracy") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeIsEqDecision": {
      return dataCollector.map((param) => {
        if (param.name === "isEqDecision") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeLikelihoodFields": {
      return dataCollector.map((param) => {
        if (param.name === "likelihoodFields") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeGamePayoffs": {
      return dataCollector.map((param) => {
        if (param.name === "gamePayoffs") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeGameId": {
      return dataCollector.map((param) => {
        if (param.name === "gameId") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeTrial": {
      return dataCollector.map((param) => {
        if (param.name === "trial") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storePart": {
      return dataCollector.map((param) => {
        if (param.name === "part") {
          return {
            ...param,
            value: [...param.value, action.value],
          };
        } else {
          return param;
        }
      });
    }
    case "storeFailedAttempts": {
      return dataCollector.map((param) => {
        if (param.name === "failedAttempts") {
          return {
            ...param,
            value: param.value + 1,
          };
        } else {
          return param;
        }
      });
    }
    case "resetDataCollector": {
      return initialDataCollectorParams;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
