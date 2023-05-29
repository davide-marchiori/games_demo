import Head from "next/head";
import { useState, useEffect } from "react";
import { Footer } from "../components";
import "../styles/globals.css";

export default App;

function App({ Component, pageProps }) {
  const [, setUser] = useState(null);

  useEffect(() => {
    // on initial load set default user
    localStorage.setItem("user", JSON.stringify({ username: "John Doe" }));
    setUser({ username: "John Doe" });
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web app for training strategic skills"
        />
        <title>Strategic Training App</title>
        <link
          rel="icon"
          type="image/x-icon"
          sizes="any"
          href="image/favicon.ico"
        />
      </Head>

      <div className="flex flex-col h-screen justify-between">
        <div>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}
