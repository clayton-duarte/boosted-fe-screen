import React from "react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-size: 16px;
          background: #282828;
          color: #eeeeee;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        body * {
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

export default MyApp;
