import Link from "next/link";

export default Home;

function Home() {
  return (
    <div>
      <div className="px-10 pt-10 lg:px-8"></div>
      <main>
        <div className="px-6 lg:px-8">
          <div className="mx-auto pt-32 pb-32">
            <div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  <span className="block">Test your</span>
                  <span className="block text-indigo-600 xl:inline">
                    strategic skills
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  A training scheme developed by a team of experts on <i>interactive</i> decisions.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <Link
                    href="/dashboard"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Get started
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
