import { useContext } from "react";
import { SessionParamsContext, TaskParamsContext } from "../helpers";
import { RadioGroup } from "@headlessui/react";
import { Alert } from "../components";
import { alertService } from "../services";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isPositiveInt(value) {
  return /^\d+$/.test(value);
}

export { GameRenderer };

function GameRenderer() {
  const [bucketSessionParams, sessionDispatch] =
    useContext(SessionParamsContext);
  const [bucketTaskParams, taskDispatch] = useContext(TaskParamsContext);

  const sessionParams = Object.fromEntries(
    bucketSessionParams.map((item) => Object.values(item))
  );
  const taskParams = Object.fromEntries(
    bucketTaskParams.map((item) => Object.values(item))
  );

  const gamePayoffs =
    taskParams.gameData[sessionParams.partCount][sessionParams.trialCount]
      .Payoffs;
  const cells = gamePayoffs.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      if (currentIndex % 2 === 1) {
        accumulator.push({
          value: [array[currentIndex - 1], currentValue],
          id: Number(
            "" +
              (Math.floor(Math.floor(currentIndex / 2) / 3) + 1) +
              ((Math.floor(currentIndex / 2) % 3) + 1)
          ),
        });
      }
      return accumulator;
    },
    []
  );

  const updateField = (event) => {
    const newState = taskParams.likelihoodFields.map((field) => {
      // if targeted object, update isError property
      if (field.name === event.target.name) {
        let error;
        if (!isPositiveInt(event.target.value)) {
          error = true;
          alertService.error("Likelihood points must be a positive integer.");
        } else {
          if (event.target.value > 100) {
            error = true;
            alertService.error("Likelihood points must be from 0 to 100.");
          } else {
            alertService.clear();
            error = false;
          }
        }
        return { ...field, value: event.target.value, isError: error };
      }
      // otherwise return object as is
      return field;
    });
    taskDispatch({ type: "updateLikelihoodFields", payload: newState });
  };

  const handleChange = (event) => {
    taskDispatch({ type: "updateCurrentDecision", value: event });
  };

  // Could be dynamically constructed
  const colHeaders = ["C1", "C2", "C3"];
  const actions = [
    { name: "Action 1", value: 1, id: 1 },
    { name: "Action 2", value: 2, id: 2 },
    { name: "Action 3", value: 3, id: 3 },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{`Game ${
            sessionParams.trialCount + 1
          } of ${taskParams.gameData[sessionParams.partCount].length}`}</h1>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 align-middle md:px-6 lg:px-4">
            <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <RadioGroup
                value={taskParams.currentDecision}
                onChange={(event) => handleChange(event)}
                className="mt-2"
              >
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className="">
                      <th
                        rowSpan="2"
                        className="text-center text-md font-semibold"
                      >
                        Your Actions
                      </th>
                      <th
                        colSpan="3"
                        className="text-center text-md font-semibold"
                      >
                        Computer's actions
                      </th>
                    </tr>
                    <tr className="">
                      {colHeaders.map((header) => (
                        <th key={header} scope="col" className="justify-center">
                          <div className="flex justify-center py-2">
                            <div className="px-2 flex justify-center text-md font-medium">
                              {header}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((action, index) => (
                      <tr key={action.name}>
                        <td className="whitespace-nowrap flex flex-row justify-center py-3">
                          <RadioGroup.Option
                            value={action.value}
                            className={({ checked }) =>
                              classNames(
                                checked
                                  ? "ring-2 ring-offset-2 ring-purple-500 bg-purple-600 border-transparent text-white hover:bg-purple-700"
                                  : "bg-indigo-600 border-gray-300 text-white hover:bg-indigo-700",
                                "border shadow-lg rounded-md py-3 px-2 flex justify-center text-md font-medium"
                              )
                            }
                          >
                            <RadioGroup.Label as="span">
                              {action.name}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        </td>
                        {taskParams.shuffle.cells[index].map((cellid) => (
                          <td key={cellid}>
                            <CellRenderer
                              values={
                                cells.find((item) => item.id === Number(cellid))
                                  .value
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr key="likelihood">
                      <td className="rounded-lg text-center text-md font-medium py-2">
                        Likelihood points:
                      </td>
                      {taskParams.likelihoodFields.map((field) => (
                        <td key={field.id}>
                          <div className="flex flex-row justify-center py-2">
                            <input
                              className={
                                field.isError
                                  ? "w-3/4 md:w-2/3 shadow-lg bg-red-50 border border-red-300 text-center text-lg font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  : "w-3/4 md:w-2/3 shadow-lg bg-gray-50 border border-gray-300 text-center text-lg font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              }
                              type="text"
                              name={field.name}
                              value={field.value}
                              onChange={(e) => updateField(e)}
                              maxLength="3"
                              placeholder="..."
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:flex sm:justify-center lg:justify-center">
        <Alert />
      </div>
    </div>
  );
}

function CellRenderer({ values }) {
  return (
    <div className="flex flex-row justify-center py-2">
      <div className="grid grid-cols-2 shadow-lg rounded-lg border border-gray-300 w-3/4">
        <div></div>
        <div className="text-gray-500 text-lg font-medium text-center rounded-lg">
          {values[1]}
        </div>
        <div className="text-green-500 text-lg font-medium text-center rounded-lg">
          {values[0]}
        </div>
        <div></div>
      </div>
    </div>
  );
}
