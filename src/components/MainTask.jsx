import { useContext, useReducer } from "react";
import { SessionParamsContext } from "../helpers";

export { MainTask };

function MainTask({ setStage }) {
  const [bucketSessionParams] = useContext(SessionParamsContext);
  const sessionParams = Object.fromEntries(
    bucketSessionParams.map((item) => Object.values(item))
  );

  return (
    <main className="relative overflow-hidden bg-white py-6">
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
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Upcoming decisions
            </span>
          </h1>
        </div>
        <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
          <p>Please remember:</p>
          <ul>
            <li>
              You will play as the <b>row player</b>;
            </li>
            <li>
              After each trial, you{" "}
              {sessionParams.partsWithFeedback.includes(
                sessionParams.partCount
              ) ? (
                <b>will</b>
              ) : (
                <b>will not</b>
              )}{" "}
              receive feedback about the Computer's actions and payoffs.
            </li>
          </ul>
        </div>
        <div className="mt-8 sm:flex sm:justify-center lg:justify-center">
          <div className="rounded-md shadow-lg">
            <a
              href="#"
              className="flex w-full items-center justify-center shadow-lg rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
              onClick={() => setStage("GameDecisions")}
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
