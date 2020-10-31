import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import LogItemList from "../components/log/LogItemList";
import { getLogsSl } from "../redux/selectors";
import { wrapper } from "../redux/store";
import { getLogsThunk } from "../redux/thunk";
import { House, Log } from "../redux/types";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    if (typeof query.id === "string") {
      await store.dispatch(getLogsThunk(query.id));
    }
    const { areaName, ...house } = query;
    return {
      props: {
        house,
        areaName,
      },
    };
  }
);

export interface LogsProps {
  areaName: string;
  house: House;
}

const Logs: NextPage<LogsProps> = ({ areaName, house }) => {
  const logs: Log[] = useSelector(getLogsSl);
  const screen = useBreakpoint();
  const [filteredLogs, setFilteredLogs] = useState<Log[]>(logs);

  useEffect(() => {
    setFilteredLogs(logs);
  }, [logs]);

  const onFilterChange = (value: string) => {
    if (value !== "") {
      const logsFiltered = logs.filter(
        (log) => log.paid_for.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      setFilteredLogs(logsFiltered);
    } else {
      setFilteredLogs(logs);
    }
  };

  return (
    <>
      <Head>
        <title>Logs</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="wrapper">
        <div className="header">
          <Header
            title={house.name}
            back
            showAdd={false}
            filter={onFilterChange}
            loading={false}
            isMobile={screen.xs}
          />
        </div>
        <div className="content_log">
          <LogItemList
            areaName={areaName}
            house={house}
            logs={filteredLogs}
            isMobile={screen.xs}
          />
        </div>
      </div>
    </>
  );
};

export default Logs;
