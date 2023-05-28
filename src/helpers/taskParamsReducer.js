const randomizeOrder = (array) => {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const chunckify = (array, parts) => {
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
};

const shuffle = () => {
  const rows = randomizeOrder([1, 2, 3]);
  const cols = randomizeOrder([1, 2, 3]);
  const array = [];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      array.push(rows[i].toString() + cols[j].toString());
    }
  }
  const cells = chunckify(array, 3);
  return { rows, cols, cells };
};

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

export { taskParamsReducer };

function taskParamsReducer(taskParams, action) {
  switch (action.type) {    
    case "updateCurrentDecision": {
      return taskParams.map((param) => {
        if (param.name === "currentDecision") {
          return {
            ...param,
            value: action.value,
          };
        } else {
          return param;
        }
      });
    }
    case "resetCurrentDecision": {
      return taskParams.map((param) => {
        if (param.name === "currentDecision") {
          return {
            ...param,
            value: "",
          };
        } else {
          return param;
        }
      });
    }    
    case "setGameData": {
      return taskParams.map((param) => {
        if (param.name === "gameData") {
          return {
            ...param,
            value: action.value,
          };
        } else {
          return param;
        }
      });
    }
    case "reshuffle": {
      return taskParams.map((param) => {
        if (param.name === "shuffle") {
          return {
            ...param,
            value: shuffle(),
          };
        } else {
          return param;
        }
      });
    }
    case "resetLikelihoodFields": {
      return taskParams.map((param) => {
        if (param.name === "likelihoodFields") {
          return {
            ...param,
            value: [
              { name: "input1", id: 1, value: "", isError: false },
              { name: "input2", id: 2, value: "", isError: false },
              { name: "input3", id: 3, value: "", isError: false },
            ],
          };
        } else {
          return param;
        }
      });
    }
    case "updateLikelihoodFields": {
      return taskParams.map((param) => {
        if (param.name === "likelihoodFields") {
          return {
            ...param,
            value: action.payload,
          };
          
        } else {
          return param;
        }
      });
    }
    case "resetTaskParams": {
      return initialTaskParams;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
