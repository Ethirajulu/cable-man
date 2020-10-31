import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { wrapper } from "../redux/store";
import { getHousesThunk } from "../redux/thunk";
import { House } from "../redux/types";
import { useSelector, useDispatch } from "react-redux";
import { getHousesSl, getLoadingSl } from "../redux/selectors";
import { setLoading } from "../redux/actions";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FormSheet from "../components/FormSheet";
import HouseItemList from "../components/house/HouseItemList";
import HouseForm from "../components/house/HouseForm";
import PayForm from "../components/house/PayForm";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    if (typeof query.areaId === "string") {
      await store.dispatch(getHousesThunk(query.areaId));
    }
    return {
      props: {
        areaName: query.name,
        areaId: query.areaId,
      },
    };
  }
);

export interface HousesProps {
  areaName: string;
  areaId: string;
}

const Houses: NextPage<HousesProps> = ({ areaName, areaId }) => {
  const houses: House[] = useSelector(getHousesSl);
  const loading: boolean = useSelector(getLoadingSl);
  const dispatch = useDispatch();
  const [housesFiltered, setHousesFiltered] = useState<House[]>(houses);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isPayFormOpen, setPayFormStatus] = useState<boolean>(false);
  const [curHouse, setCurHouse] = useState<House | null>(null);
  const [type, setType] = useState<string>("Add");
  const screen = useBreakpoint();

  const onFilterChange = (value: string) => {
    if (value !== "") {
      dispatch(setLoading(true));
      const filteredHouses = houses.filter(
        (area) => area.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      setHousesFiltered(filteredHouses);
      dispatch(setLoading(false));
    } else {
      setHousesFiltered(houses);
    }
  };

  useEffect(() => {
    reset();
    setHousesFiltered(houses);
    dispatch(setLoading(false));
  }, [houses]);

  useEffect(() => {
    if (!isFormOpen) {
      setCurHouse(null);
    }
  }, [isFormOpen]);

  const reset = () => {
    setIsFormOpen(false);
    setPayFormStatus(false);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Head>
        <title>Houses</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="wrapper">
        <div className="header">
          <Header
            title={areaName}
            back
            filter={onFilterChange}
            loading={loading}
            isMobile={screen.xs}
            setIsOpen={setIsFormOpen}
            setType={setType}
          />
        </div>
        <div className="content">
          <Spin spinning={loading} indicator={antIcon}>
            <HouseItemList
              houses={housesFiltered}
              setType={setType}
              setIsOpen={setIsFormOpen}
              setPayFormStatus={setPayFormStatus}
              setCurHouse={setCurHouse}
            />
          </Spin>
        </div>
        <FormSheet
          title={`${type} House`}
          isOpen={isFormOpen}
          isMobile={screen.xs}
          onClose={reset}
        >
          <HouseForm areaId={areaId} house={curHouse} isMobile={screen.xs} />
        </FormSheet>
        <FormSheet
          title="Pay"
          isMobile={screen.xs}
          isOpen={isPayFormOpen}
          onClose={reset}
        >
          {curHouse && (
            <PayForm
              areaName={areaName}
              house={curHouse}
              isMobile={screen.xs}
            />
          )}
        </FormSheet>
      </div>
    </>
  );
};

export default Houses;
