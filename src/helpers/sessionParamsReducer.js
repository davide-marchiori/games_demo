const initialSessionParams = [
  { name: "progressStatus", value: ["current", "upcoming", "upcoming"] },
  { name: "trialCount", value: 0 },
  { name: "partCount", value: 0 },
  { name: "partsWithFeedback", value: [1] },
  { name: "dataWriter", value: true },
];

export { sessionParamsReducer };

function sessionParamsReducer(sessionParams, action) {
  switch (action.type) {
    case "updateTrialCount": {
      return sessionParams.map((param) => {
        if (param.name === "trialCount") {
          return {
            ...param,
            value: param.value + 1,
          };
        } else {
          return param;
        }
      });
    }
    case "resetTrialCount": {
      return sessionParams.map((param) => {
        if (param.name === "trialCount") {
          return {
            ...param,
            value: 0,
          };
        } else {
          return param;
        }
      });
    }
    case "updatePartCount": {
      return sessionParams.map((param) => {
        if (param.name === "partCount") {
          return {
            ...param,
            value: param.value + 1,
          };
        } else {
          return param;
        }
      });
    }
    case "updateProgressStatus": {
      return sessionParams.map((param) => {
        if (param.name === "progressStatus") {
          if (action.value === 0) {
            return {
              ...param,
              value: ["complete", "current", "upcoming"],
            };
          } else {
            return {
              ...param,
              value: ["complete", "complete", "current"],
            };
          }
        } else {
          return param;
        }
      });
    }
    case "setDataWriter": {
      return sessionParams.map((param) => {
        if (param.name === "dataWriter") {
          return {
            ...param,
            value: action.value,
          };
        } else {
          return param;
        }
      });
    }
    case "resetSessionParams": {
      return initialSessionParams;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
