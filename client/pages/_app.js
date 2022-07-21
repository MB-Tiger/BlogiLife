import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorBoundaryOptions";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFFFFF" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} draggable={false} />
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
