import { Spin } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { loadingIcon } from "../components/UtilComps";
import { getLoadingSl } from "../redux/selectors";

export interface ReportsProps {}

const Reports: NextPage<ReportsProps> = ({}) => {
  const screen = useBreakpoint();
  const loading: boolean = useSelector(getLoadingSl);
  return (
    <>
      <Head>
        <title>Reports</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="header">
        <Header title="Reports" back showAdd isMobile={screen.xs} />
      </div>
      <div className="content">
        <Spin spinning={loading} indicator={loadingIcon}></Spin>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default Reports;
