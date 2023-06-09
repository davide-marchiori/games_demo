import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { HomeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export { PageHeader };

function PageHeader(props) {
    return (
        <header className="bg-white border-b border-gray-200">
            <Popover className="relative bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="/">
                                <span className="sr-only">Experiendo</span>
                                <HomeIcon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        </div>
                        <div className="-my-2 -mr-2 md:hidden">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                            {props.isLoggedIn && <a href="/dashboard" className="text-base px-2 font-medium text-gray-500 hover:text-gray-900">
                                Dashboard
                            </a>}
                        </Popover.Group>
                        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                            <a href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                About
                            </a>
                            {props.isLoggedIn
                                ? null
                                : <div>
                                    <a href="/login"
                                        className="ml-8 font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-900 focus:text-indigo-700 focus:outline-none">
                                        Log in
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
                    >
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <a href="/">
                                        <span className="sr-only">Experiendo</span>
                                        <HomeIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                    <div className="-mr-2">
                                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">

                                    </nav>
                                </div>
                            </div>
                            <div className="space-y-6 py-6 px-5">
                                <div className="grid grid-rows-2 gap-y-4 gap-x-8">
                                    {props.isLoggedIn &&
                                        <a href="/dashboard" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                            Dashboard
                                        </a>}
                                    <a href="/about" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        About
                                    </a>
                                </div>

                                {!props.isLoggedIn &&
                                    <div>
                                        <a
                                            href="/login"
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            Login
                                        </a>
                                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                                            Do not have an account?
                                            <a href="/signup" className="text-indigo-600 hover:text-indigo-500">
                                                &nbsp;Sign up
                                            </a>
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </header>
    )
}