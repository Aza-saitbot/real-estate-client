import "@/styles/globals.css";
import { AppProps } from 'next/app';
import React from "react";

import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
