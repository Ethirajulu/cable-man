import { List } from "antd";
import React, { FC } from "react";
import { Area } from "../redux/types";
import AreaItem from "./AreaItem";

export interface AreaItemListProps {
  areas: Area[];
  isMobile: boolean;
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const AreaItemList: FC<AreaItemListProps> = ({
  areas,
  isMobile,
  setType,
  setIsOpen,
}) => {
  const onEditClick = (id: string, name: string) => {
    setType("Edit");
    setIsOpen(true);
  };
  const onDeleteClick = (id: string) => {};

  return (
    <List
      dataSource={areas}
      renderItem={(item) => (
        <AreaItem
          area={item}
          isMobile={isMobile}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    />
  );
};

export default AreaItemList;
