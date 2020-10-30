import { ExclamationCircleOutlined } from "@ant-design/icons";
import { List, Modal } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/actions";
import { deleteAreaThunk } from "../redux/thunk";
import { Area } from "../redux/types";
import AreaItem from "./AreaItem";

export interface AreaItemListProps {
  areas: Area[];
  isMobile: boolean;
  loading: boolean;
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setCurArea: (area: Area) => void;
}

export const AreaItemList: FC<AreaItemListProps> = ({
  areas,
  isMobile,
  loading,
  setType,
  setIsOpen,
  setCurArea,
}) => {
  const dispatch = useDispatch();
  const onEditClick = (area: Area) => {
    setType("Edit");
    setCurArea(area);
    setIsOpen(true);
  };

  const onDeleteClick = (area: Area) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to delete ${area.name} area?`,
      okText: "Yes",
      cancelText: "No",
      centered: true,
      onOk: () => {
        dispatch(setLoading(true));
        dispatch(deleteAreaThunk(area.id));
      },
    });
  };

  return (
    <List
      dataSource={areas}
      renderItem={(item) => (
        <AreaItem
          area={item}
          isMobile={isMobile}
          loading={loading}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    />
  );
};

export default AreaItemList;
