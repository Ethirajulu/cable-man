import Head from "next/head";
import type { AppProps } from "next/app";
import { FC } from "react";
import { wrapper } from "../redux/store";

import "antd/dist/antd.css";
import "../styles/globals.css";
import "../styles/general.css";
import { AnimatePresence, motion } from "framer-motion";

const WrappedApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <AnimatePresence>
        <motion.div
          key={router.route}
          className="wrapper"
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          transition={{ duration: 0.2 }}
          variants={{
            pageInitial: {
              x: "100%",
              opacity: 0,
            },
            pageAnimate: {
              x: 0,
              opacity: 1,
            },
            pageExit: {
              x: "-100%",
              opacity: 0,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
