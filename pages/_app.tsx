import Head from "next/head";
import type { AppProps } from "next/app";
import { FC } from "react";
import { wrapper } from "../redux/store";

import "antd/dist/antd.css";
import "../styles/globals.css";
import "../styles/general.css";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
