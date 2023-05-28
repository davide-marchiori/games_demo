import { useState, useContext } from "react";
import { DataCollectorContext } from "../helpers";
import { Alert, ExampleGameRenderer } from "../components";

export { ComprehensionCheck };

function ComprehensionCheck({ setSuccessModal, setFailModal }) {
  const [bucketDataCollector, dataCollectorDispatch] =
    useContext(DataCollectorContext);
  const dataCollector = Object.fromEntries(
    bucketDataCollector.map((item) => Object.values(item))
  );
  //state to hold responses from input
  const [questionState, setQuestionState] = useState({
    options: [
      { name: "question1", selected: "" },
      { name: "question2", selected: "" },
      { name: "question3", selected: "" },
    ],
  });

  //EVENT HANDLERS
  //radio buttons onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionState((prevState) => {
      return {
        ...prevState,
        options: prevState.options.map((opt) => {
          if (opt.name !== name) {
            return { ...opt };
          } else {
            return { ...opt, selected: value };
          }
        }),
      };
    });
  };

  const handleSubmitCheck = (e) => {
    e.preventDefault();
    if (
      questionState.options[0].selected !== "" &&
      questionState.options[1].selected !== "" &&
      questionState.options[2].selected !== ""
    ) {
      // All form questions have been aswered
      if (
        questionState.options[0].selected === "11" &&
        questionState.options[1].selected === "22" &&
        questionState.options[2].selected === "33"
      ) {
        setSuccessModal(true);
      } else {
        setFailModal(true);
        dataCollectorDispatch({ type: "storeFailedAttempts" });
      }
    } else {
      // Not all form questions have been answered
      alertService.error("One or more questions have not been answered.");
    }
  };

  const questions = [
    {
      id: 1,
      name: "question1",
      question: "If you choose Action 3:",
      options: [
        { id: 11, answer: "You get at least 22 points" },
        { id: 12, answer: "You get 38 points if the computer chooses C2" },
        { id: 13, answer: "The Computer always gets 30 points" },
      ],
    },
    {
      id: 2,
      name: "question2",
      question:
        "If you choose Action 1 and the Computer chooses Action 3, then:",
      options: [
        { id: 21, answer: "You get 44 points and the Computer 58" },
        { id: 22, answer: "You get 58 points and the Computer 44" },
        { id: 23, answer: "You get 18 points and the Computer 26" },
      ],
    },
    {
      id: 3,
      name: "question3",
      question:
        'The likelihood points of "10", "70", and "20" indicated in the figure mean that:',
      options: [
        {
          id: 31,
          answer: "You believe that most probably the Computer will choose C1",
        },
        {
          id: 32,
          answer: "You believe that the Computer will certainly choose C2",
        },
        {
          id: 33,
          answer:
            "You believe that the Computer is more likely to choose C3 than C1",
        },
      ],
    },
  ];

  return (
    <main className="lg:relative">
      <div className="relative overflow-hidden bg-white py-8 px-4">
        <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              Comprehension check
            </h2>
            <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Please answer the following
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <svg
              className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="de316486-4a29-4312-bdfc-fbce2132a2c1"
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
                fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
              />
            </svg>
            <div className="relative mb-8 max-w-prose text-base lg:max-w-none bg-white">
              <ExampleGameRenderer />
            </div>
          </div>
          <div className="mt-2 lg:mt-0">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <p className="text-lg font-medium text-gray-900">
                Referring to the example game illustrated:
              </p>
            </div>
            <div className="prose prose-indigo text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
              <ul className="divide-y divide-gray-200">
                {questions.map((item) => (
                  <li key={item.id} className="relative bg-white px-2">
                    <div className="flex justify-between space-x-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-medium text-gray-900">
                          {item.question}
                        </p>
                        <fieldset>
                          <legend className="sr-only">QuestionItem</legend>
                          <div className="space-y-0">
                            {item.options.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center"
                              >
                                <input
                                  id={option.id}
                                  name={item.name}
                                  value={option.id}
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 focus:ring-transparent text-indigo-600"
                                  onChange={(event) => handleChange(event)}
                                />
                                <label
                                  htmlFor={option.id}
                                  className="ml-3 block text-lg text-gray-500"
                                >
                                  {option.answer}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="sm:flex sm:justify-center lg:justify-center">
          <Alert />
        </div>
        <div className="mt-8 sm:flex sm:justify-center lg:justify-center">
          <div className="rounded-md shadow-lg">
            <a
              className="flex w-full shadow-lg items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
              onClick={(event) => handleSubmitCheck(event)}
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
