import { GLOBAL } from "@/const/global";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true only on client
  }, []);

  return (
    <>
      <Head>
        <title>{GLOBAL.NAME}</title>
      </Head>
      {isClient && <Component {...pageProps} />}
    </>
  );
}
