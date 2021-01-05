import { ExclamationCircleOutlined } from "@ant-design/icons";
import { List } from "antd";
import confirm from "antd/lib/modal/confirm";
import React, { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { deleteHouseThunk, markNotPaidThunk } from "../../redux/thunk";
import { EDIT_LABEL, House, Sorted } from "../../redux/types";

import { checkIsPaid } from "../../utils";
import HouseItem from "./HouseItem";
export interface HouseItemListProps {
  sorted: Sorted;
  houses: House[];
  areaName: string;
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPayFormStatus: (isOpen: boolean) => void;
  setCurHouse: (house: House) => void;
  onAddClick?: (index: number) => void;
  filtered: boolean;
}

const HouseItemList: FC<HouseItemListProps> = ({
  sorted,
  houses,
  areaName,
  setType,
  setIsOpen,
  setPayFormStatus,
  setCurHouse,
  onAddClick,
  filtered,
}) => {
  const dispatch = useDispatch();

  const onEditClick = (house: House) => {
    setType(EDIT_LABEL);
    setCurHouse(house);
    setIsOpen(true);
  };

  const onDeleteClick = (house: House) => {
    confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to delete ${house.name}?`,
      okText: "Yes",
      cancelText: "No",
      centered: true,
      onOk: () => {
        dispatch(setLoading(true));
        dispatch(deleteHouseThunk(house.id, sorted));
      },
    });
  };

  const onNotPaidClick = (house: House) => {
    setCurHouse(house);
    setPayFormStatus(true);
  };

  const onPaidClick = (house: House) => {
    confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to mark it not paid?`,
      okText: "Yes",
      cancelText: "No",
      centered: true,
      onOk: () => {
        dispatch(setLoading(true));
        dispatch(markNotPaidThunk(house));
      },
    });
  };

  return (
    <List
      itemLayout="vertical"
      dataSource={sorted ? sorted.house_ids : []}
      renderItem={(houseId, index) => {
        const house = houses.find((house) => house.id === houseId);
        if (house) {
          return (
            <HouseItem
              index={index}
              areaName={areaName}
              house={house}
              checkIsPaid={checkIsPaid}
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
              onNotPaidClick={onNotPaidClick}
              onPaidClick={onPaidClick}
              onAddClick={onAddClick}
              filtered={filtered}
            />
          );
        }
      }}
    />
  );
};

export default HouseItemList;
