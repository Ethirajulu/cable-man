import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { wrapper } from "../redux/store";
import { getHousesThunk } from "../redux/thunk";
import {
  ADD_LABEL,
  ALL,
  COMMON_AMOUNT,
  EMPTY_STRING,
  House,
} from "../redux/types";
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
import HouseFooter from "../components/house/HouseFooter";
import { getHousesByStatus, sortHouses } from "../utils";

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

const EMPTY_HOUSE: House = {
  area_id: null,
  box_no: null,
  default_amt: COMMON_AMOUNT,
  name: null,
  last_paid: null,
  phone_no: null,
};

const Houses: NextPage<HousesProps> = ({ areaName, areaId }) => {
  const houses: House[] = useSelector(getHousesSl);
  const loading: boolean = useSelector(getLoadingSl);
  const dispatch = useDispatch();
  const [housesFiltered, setHousesFiltered] = useState<House[]>(houses);
  const [searchFilter, setSearchFilter] = useState<string>(EMPTY_STRING);
  const [statusFilter, setStatusFilter] = useState<string>(ALL);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isPayFormOpen, setPayFormStatus] = useState<boolean>(false);
  const [curHouse, setCurHouse] = useState<House>(EMPTY_HOUSE);
  const [type, setType] = useState<string>(ADD_LABEL);
  const screen = useBreakpoint();

  const onSearchFilterChange = (value: string) => {
    setSearchFilter(value);
    onFilterChange(value, statusFilter);
  };

  const onStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    onFilterChange(searchFilter, value);
  };

  const onFilterChange = (searchFilter: string, statusFilter: string) => {
    dispatch(setLoading(true));
    const filteredHousesByStatus = getHousesByStatus(houses, statusFilter);
    if (searchFilter !== EMPTY_STRING) {
      const filteredHouses = filteredHousesByStatus.filter(
        (area) =>
          area.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
      );
      setHousesFiltered(sortHouses(filteredHouses));
    } else {
      setHousesFiltered(sortHouses(filteredHousesByStatus));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    reset();
    setHousesFiltered(sortHouses(houses));
    dispatch(setLoading(false));
  }, [houses]);

  const onAddClick = () => {
    setCurHouse({ ...EMPTY_HOUSE });
    setIsFormOpen(true);
    setType(ADD_LABEL);
  };

  const reset = () => {
    setCurHouse(EMPTY_HOUSE);
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
      <div className="header">
        <Header
          title={areaName}
          back
          showAdd
          filter={onSearchFilterChange}
          loading={loading}
          isMobile={screen.xs}
          onAddClick={onAddClick}
        />
      </div>
      <div className="content">
        <Spin spinning={loading} indicator={antIcon}>
          <HouseItemList
            areaName={areaName}
            houses={housesFiltered}
            setType={setType}
            setIsOpen={setIsFormOpen}
            setPayFormStatus={setPayFormStatus}
            setCurHouse={setCurHouse}
          />
        </Spin>
      </div>
      <div className="footer">
        <HouseFooter onFilterChange={onStatusFilterChange} />
      </div>
      <FormSheet
        title={`${type} House`}
        isOpen={isFormOpen}
        isMobile={screen.xs}
        onClose={reset}
      >
        <HouseForm
          areaId={areaId}
          house={curHouse}
          isMobile={screen.xs}
          type={type}
        />
      </FormSheet>
      <FormSheet
        title="Pay"
        isMobile={screen.xs}
        isOpen={isPayFormOpen}
        onClose={reset}
      >
        <PayForm
          areaName={areaName}
          house={curHouse}
          isMobile={screen.xs}
          reset={reset}
        />
      </FormSheet>
    </>
  );
};

export default Houses;
