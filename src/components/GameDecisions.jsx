import { useContext, useReducer } from "react";
import { GameRenderer, FeedbackGameRenderer } from "../components";
import {
  useLocalStorageState,
  SessionParamsContext,
  TaskParamsContext,
  DataCollectorContext,
} from "../helpers";
import { alertService } from "../services";

export { GameDecisions };

function GameDecisions({ setStage }) {
  const [bucketSessionParams, sessionDispatch] =
    useContext(SessionParamsContext);
  const [bucketTaskParams, taskDispatch] = useContext(TaskParamsContext);
  const [bucketDataCollector, dataCollectorDispatch] =
    useContext(DataCollectorContext);

  const sessionParams = Object.fromEntries(
    bucketSessionParams.map((item) => Object.values(item))
  );
  const taskParams = Object.fromEntries(
    bucketTaskParams.map((item) => Object.values(item))
  );
  const dataCollector = Object.fromEntries(
    bucketDataCollector.map((item) => Object.values(item))
  );  
  const [showFeedback, setShowFeedback] = useLocalStorageState(
    "showFeedback",
    true
  );

  const updateShowFeedback = (show) => {
    setShowFeedback(show);
  };

  const isNotEmptyAction = () => {
    let isValid = true;
    let message = "";
    if (taskParams.currentDecision === "") {
      isValid = false;
      message = "Select an action to continue.";
    }
    return { isValid, message };
  };

  const isNotEmptyLikelihood = () => {
    let isValid = true;
    let message = "";
    taskParams.likelihoodFields.map((field) => {
      if (field.value === "") {
        isValid = false;
        message = "Indicate likelihood points for all actions.";
      }
    });
    return { isValid, message };
  };

  const isValidSum = () => {
    let isValid = true;
    let message = "";
    if (isNotEmptyLikelihood().isValid) {
      let sum = 0;
      taskParams.likelihoodFields.map((field) => {
        sum = sum + Number(field.value);
      });
      if (sum !== 100) {
        isValid = false;
        message = "Likelihood points must sum up to 100.";
      }
    }
    return { isValid, message };
  };

  const accuracy = (likelihoodFields, eqIdx) => {
    return (
      20000 -
      likelihoodFields
        .map((item, index) =>
          index === eqIdx
            ? Math.pow(100 - item.value, 2)
            : Math.pow(item.value, 2)
        )
        .reduce((a, b) => a + b, 0)
    );
  };

  const storeData = () => {
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
    const computerAction = taskParams.shuffle.cols.indexOf(
      taskParams.gameData[sessionParams.partCount][sessionParams.trialCount]
        .EqIdx
    );
    const selectedCell =
      taskParams.shuffle.cells[taskParams.currentDecision - 1][computerAction];
    const eqColPoints = cells
      .filter(
        (cell) =>
          cell.id.toString()[1] ===
          taskParams.gameData[sessionParams.partCount][
            sessionParams.trialCount
          ].EqIdx.toString()
      )
      .map((item) => item.value[0]);

    dataCollectorDispatch({
      type: "storeEarnedPoints",
      value: cells.find((item) => item.id === Number(selectedCell)).value[0],
    });
    dataCollectorDispatch({
      type: "storeEqPoints",
      value: Math.max(...eqColPoints),
    });
    dataCollectorDispatch({
      type: "storeIsEqDecision",
      value:
        Math.max(...eqColPoints) ===
        cells.find((item) => item.id === Number(selectedCell)).value[0]
          ? true
          : false,
    });
    dataCollectorDispatch({
      type: "storeDecision",
      value: taskParams.shuffle.rows[taskParams.currentDecision - 1],
    });
    dataCollectorDispatch({
      type: "storeDecisionLabel",
      value: taskParams.currentDecision,
    });
    dataCollectorDispatch({
      type: "storeAccuracy",
      value: accuracy(
        taskParams.likelihoodFields,
        taskParams.shuffle.cols.indexOf(
          taskParams.gameData[sessionParams.partCount][sessionParams.trialCount]
            .EqIdx
        )
      ),
    });
    dataCollectorDispatch({
      type: "storeLikelihoodFields",
      value: taskParams.likelihoodFields.map((item) => Number(item.value)),
    });
    dataCollectorDispatch({
      type: "storeGamePayoffs",
      value:
        taskParams.gameData[sessionParams.partCount][sessionParams.trialCount]
          .Payoffs,
    });
    dataCollectorDispatch({
      type: "storeGameId",
      value:
        taskParams.gameData[sessionParams.partCount][sessionParams.trialCount]
          .id,
    });
    dataCollectorDispatch({
      type: "storeTrial",
      value: sessionParams.trialCount + 1,
    });
    dataCollectorDispatch({
      type: "storePart",
      value: sessionParams.partCount + 1,
    });
  };

  const nextGame = (event) => {
    event.preventDefault();
    if (
      isNotEmptyAction().isValid &&
      isNotEmptyLikelihood().isValid &&
      isValidSum().isValid
    ) {
      // Store data in dataCollector
      storeData();
      // Update order of actions for next game and reset likelihoodFields
      taskDispatch({ type: "reshuffle" });
      taskDispatch({ type: "resetLikelihoodFields" });
      taskDispatch({ type: "resetCurrentDecision" });
      // Update session parameters
      sessionDispatch({ type: "updateTrialCount" });
      updateShowFeedback(true);
    } else {
      let message = "";
      if (isValidSum().message !== "") message = isValidSum().message;
      if (isNotEmptyLikelihood().message !== "")
        message = isNotEmptyLikelihood().message;
      if (isNotEmptyAction().message !== "")
        message = isNotEmptyAction().message;
      alertService.error(message);
    }
  };

  const getFeedback = (event) => {
    event.preventDefault();
    if (
      isNotEmptyAction().isValid &&
      isNotEmptyLikelihood().isValid &&
      isValidSum().isValid
    ) {
      updateShowFeedback(false);
    } else {
      let message = "";
      if (isValidSum().message !== "") message = isValidSum().message;
      if (isNotEmptyLikelihood().message !== "")
        message = isNotEmptyLikelihood().message;
      if (isNotEmptyAction().message !== "")
        message = isNotEmptyAction().message;
      alertService.error(message);
    }
  };

  const nextPart = (event, nextStage) => {
    event.preventDefault();
    if (
      isNotEmptyAction().isValid &&
      isNotEmptyLikelihood().isValid &&
      isValidSum().isValid
    ) {
      // Store data in dataCollector
      storeData();
      // Update order of actions for next game and reset likelihoodFields
      taskDispatch({ type: "reshuffle" });
      taskDispatch({ type: "resetLikelihoodFields" });
      taskDispatch({ type: "resetCurrentDecision" });
      // Update session parameters
      sessionDispatch({ type: "resetTrialCount" });
      sessionDispatch({ type: "updatePartCount" });
      sessionDispatch({ type: "updateProgressStatus", value: sessionParams.partCount });
      updateShowFeedback(true);
      setStage(nextStage);
    } else {
      let message = "";
      if (isValidSum().message !== "") message = isValidSum().message;
      if (isNotEmptyLikelihood().message !== "")
        message = isNotEmptyLikelihood().message;
      if (isNotEmptyAction().message !== "")
        message = isNotEmptyAction().message;
      alertService.error(message);
    }
  };

  return (
    <main className="lg:relative">
      <div className="relative overflow-hidden bg-white py-6">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div
            className="relative mx-auto h-screen max-w-prose text-lg"
            aria-hidden="true"
          >            
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              {/*<span className="block text-center text-lg font-semibold text-indigo-600">Part {partCount + 1}</span>*/}
              {/*<span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">*/}
              {/*    The training starts here!*/}
              {/*</span>*/}
            </h1>
            <div className="mt-8 text-xl leading-8 text-gray-500">
              {sessionParams.partsWithFeedback.includes(
                sessionParams.partCount
              ) && !showFeedback ? (
                <FeedbackGameRenderer />
              ) : (
                <GameRenderer />
              )}
            </div>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-center">
              <div className="rounded-md shadow-lg">
                {sessionParams.partsWithFeedback.includes(
                  sessionParams.partCount
                ) && showFeedback ? (
                  <button
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                    onClick={(event) => getFeedback(event)}
                  >
                    Get Feedback
                  </button>
                ) : sessionParams.trialCount <
                  taskParams.gameData[0].length - 1 ? (
                  <button
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                    onClick={(event) => nextGame(event)}
                  >
                    Next Game
                  </button>
                ) : (
                  <button
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                    onClick={(event) =>
                      nextPart(
                        event,
                        sessionParams.partCount < taskParams.gameData.length - 1
                          ? "MainTask"
                          : "Summary"
                      )
                    }
                  >
                    Next Part
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
