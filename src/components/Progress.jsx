import { useContext } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { SessionParamsContext } from "../helpers/SessionParamsContext";

export { Progress };

function Progress() {
  const [vars] = useContext(SessionParamsContext);
  const progressStatus = vars[0].value;

  const steps = [
    { id: "01", name: "Part 1", status: progressStatus[0] },
    { id: "02", name: "Part 2", status: progressStatus[1] },
    { id: "03", name: "Part 3", status: progressStatus[2] },
  ];

  return (
    <nav aria-label="Progress">
      <ol className="bg-white divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === "complete" ? (
              <a href={step.href} className="group flex w-full items-center">
                <span className="flex items-center px-6 py-1 md:py-3 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {step.name}
                  </span>
                </span>
              </a>
            ) : step.status === "current" ? (
              <a
                href={step.href}
                className="flex items-center px-6 py-1 md:py-3 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">
                  {step.name}
                </span>
              </a>
            ) : (
              <a href={step.href} className="group flex items-center">
                <span className="flex items-center px-6 py-1 md:py-3 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                    <span className="text-gray-500 ">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 ">
                    {step.name}
                  </span>
                </span>
              </a>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
