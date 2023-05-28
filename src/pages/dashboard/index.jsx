import { useState, useEffect } from "react";
import {
  SessionParamsContextProvider,
  DataCollectorContextProvider,
  TaskParamsContextProvider,
} from "../../helpers";
import {
  TaskIntro,
  MainTask,
  Summary,
  GameDecisions,
  Progress,
  ComprehensionCheck,
  Instructions,
  Records,
} from "../../components";
import {
  SuccessComprehensionModal,
  FailedComprehensionModal,
} from "../../modals";
import { Disclosure, Menu } from "@headlessui/react";
import {
  DocumentTextIcon,
  XMarkIcon,
  ComputerDesktopIcon,
  Bars3Icon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "#",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Instructions",
    href: "#",
    icon: DocumentTextIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  // Rendering parameters
  const [stage, setStage] = useState("TaskIntro");
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [showFailedComprehensionModal, setShowFailedComprehensionModal] =
    useState(false);
  const [showSuccessComprehensionModal, setShowSuccessComprehensionModal] =
    useState(false);

  console.log("stage", stage);

  let [username, setUsername] = useState(null);
  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user")).username);
  }, []);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        name={item.name}
                        href={item.href}
                        className={classNames(
                          item.name === selectedTab
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                        onClick={() => setSelectedTab(item.name)}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white p-2 text-sm hover:bg-gray-100">
                        <span className="sr-only">Open user menu</span>
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                        <div className="text-sm font-medium text-gray-700">
                          Hello {` `}
                          {username}!
                        </div>
                      </Menu.Button>
                    </div>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    name={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                      "flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )}
                    onClick={() => setSelectedTab(item.name)}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div>
            {selectedTab === "Instructions" && <Instructions />}
            {selectedTab === "Records" && <Records />}
            {showSuccessComprehensionModal && (
              <SuccessComprehensionModal
                openModal={showSuccessComprehensionModal}
                setOpenModal={setShowSuccessComprehensionModal}
                setStage={setStage}
              />
            )}
            {showFailedComprehensionModal && (
              <FailedComprehensionModal
                openModal={showFailedComprehensionModal}
                setOpenModal={setShowFailedComprehensionModal}
              />
            )}

            <SessionParamsContextProvider>
              {selectedTab === "Dashboard" &&
                (stage === "MainTask" || stage === "GameDecisions") && (
                  <Progress />
                )}
              {selectedTab === "Dashboard" && stage === "MainTask" && (
                <MainTask setStage={setStage} />
              )}

              <DataCollectorContextProvider>
                {selectedTab === "Dashboard" &&
                  stage === "ComprehensionCheck" && (
                    <ComprehensionCheck
                      setSuccessModal={setShowSuccessComprehensionModal}
                      setFailModal={setShowFailedComprehensionModal}
                    />
                  )}
                {selectedTab === "Dashboard" && stage === "Summary" && (
                  <Summary />
                )}

                <TaskParamsContextProvider>
                  {selectedTab === "Dashboard" && stage === "TaskIntro" && (
                    <TaskIntro
                      setStage={setStage}
                      setSelectedTab={setSelectedTab}
                    />
                  )}
                  {selectedTab === "Dashboard" && stage === "GameDecisions" && (
                    <GameDecisions setStage={setStage} />
                  )}
                </TaskParamsContextProvider>
              </DataCollectorContextProvider>
            </SessionParamsContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
