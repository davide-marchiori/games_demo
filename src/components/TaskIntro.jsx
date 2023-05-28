import { useEffect, useContext } from "react";
import {
  TaskParamsContext,
  SessionParamsContext,
  DataCollectorContext,
} from "../helpers";

export { TaskIntro };

function TaskIntro({ setStage, setSelectedTab }) {
  const [, taskDispatch] = useContext(TaskParamsContext);
  const [, sessionDispatch] = useContext(SessionParamsContext);
  const [, collectorDispatch] = useContext(DataCollectorContext);

  // Import game data
  const gamesDSPart1 = require("../data/DS-Part1.json");
  const gamesDSPart2 = require("../data/DS-Part2.json");
  const gamesDSPart3 = require("../data/DS-Part3.json");  

  const handleClick = () => {
    // Set stage to GameDecisions
    setStage("ComprehensionCheck");
    // Prepare data to be used in GameDecisions
    const selectedGames = [];
    const selectedGames1 = [
      ...gamesDSPart1.sort(() => 0.5 - Math.random()).slice(0, 3),      
    ];
    selectedGames.push(selectedGames1.sort(() => 0.5 - Math.random()));
    const selectedGames2 = [
      ...gamesDSPart2.sort(() => 0.5 - Math.random()).slice(0, 3),      
    ];
    selectedGames.push(selectedGames2.sort(() => 0.5 - Math.random()));
    const selectedGames3 = [
      ...gamesDSPart3.sort(() => 0.5 - Math.random()).slice(0, 3),      
    ];
    selectedGames.push(selectedGames3.sort(() => 0.5 - Math.random()));
    taskDispatch({ type: "setGameData", value: selectedGames });
    taskDispatch({ type: "reshuffle" });
    // Set dataWriter to true to start writing data to database
    // in the Summary component
    sessionDispatch({ type: "setDataWriter", value: true });
  };

  useEffect(() => {
    // Reset all params
    sessionDispatch({ type: "resetSessionParams" });
    collectorDispatch({ type: "resetDataCollector" });
    taskDispatch({ type: "resetTaskParams" });
  }, []);

  return (
    <main className="lg:relative">
      <div className="relative overflow-hidden bg-white py-6">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block h-full lg:w-full lg:[overflow-anchor:none] h-screen">
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
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-lg font-semibold text-indigo-600">
                Introducing
              </span>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Start a training session
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              Each training session is divided into three parts, and in each
              part you will face a sequence of interactive decisions. Your
              partner in all decisions will be a computer algorithm.
            </p>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              Before starting, read the
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setSelectedTab("Instructions")}
              >
                {" "}
                instructions{" "}
              </a>
              on what you need to do to complete the training. Should something
              be unclear to you at any point, you will always be able to get
              back to the instructions page.
            </p>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              The first time you take this training scheme, you will go through
              a comprehension check to make sure instructions were understood as
              well as to become familiar with the decision tasks.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-center">
              <div>
                <button
                  className="flex w-full items-center justify-center shadow-lg rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  onClick={handleClick}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
