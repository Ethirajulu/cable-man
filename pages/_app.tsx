import type { AppProps } from "next/app";
import { FC } from "react";

import "antd/dist/antd.css";
import "../styles/globals.css";
import { wrapper } from "../redux/store";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <main className="main">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default wrapper.withRedux(WrappedApp);
