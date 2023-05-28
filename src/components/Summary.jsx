import { Fragment } from "react";
import Router from "next/router";
import { useContext } from "react";
import { DataCollectorContext, SessionParamsContext } from "../helpers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export { Summary };

function Summary() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bucketDataCollector] = useContext(DataCollectorContext);
  const [bucketSessionParams, sessionDispatch] =
    useContext(SessionParamsContext);
  const sessionParams = Object.fromEntries(
    bucketSessionParams.map((item) => Object.values(item))
  );
  const dataCollector = Object.fromEntries(
    bucketDataCollector.map((item) => Object.values(item))
  );

  const trialsPerPart = dataCollector.part.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  const performanceByPart = [];
  performanceByPart.push(dataCollector.earnedPoints.slice(0, trialsPerPart[1]));
  performanceByPart.push(
    dataCollector.earnedPoints.slice(
      trialsPerPart[1],
      trialsPerPart[1] + trialsPerPart[2]
    )
  );
  performanceByPart.push(
    dataCollector.earnedPoints.slice(
      trialsPerPart[1] + trialsPerPart[2],
      trialsPerPart[1] + trialsPerPart[2] + trialsPerPart[3]
    )
  );

  const eqPointsByPart = [];
  eqPointsByPart.push(dataCollector.eqPoints.slice(0, trialsPerPart[1]));
  eqPointsByPart.push(
    dataCollector.eqPoints.slice(
      trialsPerPart[1],
      trialsPerPart[1] + trialsPerPart[2]
    )
  );
  eqPointsByPart.push(
    dataCollector.eqPoints.slice(
      trialsPerPart[1] + trialsPerPart[2],
      trialsPerPart[1] + trialsPerPart[2] + trialsPerPart[3]
    )
  );

  const accuracyByPart = [];
  accuracyByPart.push(dataCollector.accuracy.slice(0, trialsPerPart[1]));
  accuracyByPart.push(
    dataCollector.accuracy.slice(
      trialsPerPart[1],
      trialsPerPart[1] + trialsPerPart[2]
    )
  );
  accuracyByPart.push(
    dataCollector.accuracy.slice(
      trialsPerPart[1] + trialsPerPart[2],
      trialsPerPart[1] + trialsPerPart[2] + trialsPerPart[3]
    )
  );

  const performanceScore = performanceByPart.map((item, index) => {
    return Math.round(
      100 *
        (item.reduce((x, y) => x + y) /
          eqPointsByPart[index].reduce((x, y) => x + y))
    );
  });

  const accuracyScore = accuracyByPart.map((item) => {
    return Math.round(
      100 * (item.reduce((x, y) => x + y) / (20000 * item.length))
    );
  });

  const performanceIndexes = [
    {
      name: "Optimality Score",
      value: [...performanceScore],
    },
    {
      name: "Accuracy Score",
      value: [...accuracyScore],
    },
  ];

  const handleStartOver = () => {
    Router.push("/");
    for (var key in window.localStorage) {
      if (["user"].includes(key)) continue;
      // use your preferred method there - maybe an array of keys to exclude?
      delete window.localStorage[key];
    }
  };

  return (
    <div className="min-h-full">
      <div className="lg:relative">
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
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-lg">
              <h1>
                <span className="block text-center text-lg font-semibold text-indigo-600">
                  Summary
                </span>
                <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  You have completed the
                  <br />
                  training session!
                </span>
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                Here is the summary of your performance.
              </p>

              <div className="mt-12 flex flex-col">
                <div className="-my-2 -mx-2 overflow-x-auto sm:-mx-4 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full">
                        <thead className="bg-white">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Index
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Part 1
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Part 2
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Part 3
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {performanceIndexes.map((score, scoreIdx) => (
                            <Fragment key={score.name}>
                              <tr className="border-t border-gray-200">
                                <th
                                  colSpan={4}
                                  scope="colgroup"
                                  className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                >
                                  {score.name}
                                </th>
                              </tr>

                              <tr
                                key={score.value[0]}
                                className={classNames(
                                  "border-gray-300",
                                  "border-t"
                                )}
                              >
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {score.value[0]}%
                                  {score.value[0] <
                                  (scoreIdx === 0 ? 35 : 50) ? (
                                    <span className="text-red-500"> (Low)</span>
                                  ) : null}
                                  {score.value[0] >=
                                    (scoreIdx === 0 ? 35 : 50) &&
                                  score.value[0] <
                                    (scoreIdx === 0 ? 70 : 75) ? (
                                    <span className="text-yellow-500">
                                      {" "}
                                      (Medium)
                                    </span>
                                  ) : null}
                                  {score.value[0] >=
                                  (scoreIdx === 0 ? 70 : 75) ? (
                                    <span className="text-green-500">
                                      {" "}
                                      (High)
                                    </span>
                                  ) : null}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {score.value[1]}%
                                  {score.value[1] <
                                  (scoreIdx === 0 ? 35 : 50) ? (
                                    <span className="text-red-500"> (Low)</span>
                                  ) : null}
                                  {score.value[1] >=
                                    (scoreIdx === 0 ? 35 : 50) &&
                                  score.value[1] <
                                    (scoreIdx === 0 ? 70 : 75) ? (
                                    <span className="text-yellow-500">
                                      {" "}
                                      (Medium)
                                    </span>
                                  ) : null}
                                  {score.value[1] >=
                                  (scoreIdx === 0 ? 70 : 75) ? (
                                    <span className="text-green-500">
                                      {" "}
                                      (High)
                                    </span>
                                  ) : null}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {score.value[2]}%
                                  {score.value[2] <
                                  (scoreIdx === 0 ? 35 : 50) ? (
                                    <span className="text-red-500"> (Low)</span>
                                  ) : null}
                                  {score.value[2] >=
                                    (scoreIdx === 0 ? 35 : 50) &&
                                  score.value[2] <
                                    (scoreIdx === 0 ? 70 : 75) ? (
                                    <span className="text-yellow-500">
                                      {" "}
                                      (Medium)
                                    </span>
                                  ) : null}
                                  {score.value[2] >=
                                  (scoreIdx === 0 ? 70 : 75) ? (
                                    <span className="text-green-500">
                                      {" "}
                                      (High)
                                    </span>
                                  ) : null}
                                </td>
                              </tr>
                            </Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-center">
              <div className="rounded-md shadow-lg">
                <a
                  href="#"
                  className="flex w-full items-center justify-center shadow-lg rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  onClick={handleStartOver}
                >
                  Start over
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
