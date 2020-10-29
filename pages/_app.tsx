import type { AppProps } from "next/app";
import { FC } from "react";
import Header from "../components/Header";
import { wrapper } from "../redux/store";

import "antd/dist/antd.css";
import "../styles/globals.css";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header
        title="Collector"
        back={false}
        filter={() => {}}
        loading={false}
      />
      <div className="main">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
