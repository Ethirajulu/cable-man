import type { AppProps } from "next/app";
import { FC } from "react";
import { wrapper } from "../redux/store";

import "antd/dist/antd.css";
import "../styles/globals.css";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(WrappedApp);
