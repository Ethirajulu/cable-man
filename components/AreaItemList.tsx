import { List } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { FC } from "react";
import { Area } from "../redux/types";
import AreaItem from "./AreaItem";

export interface AreaItemListProps {
  areas: Area[];
  isMobile: boolean;
}

export const AreaItemList: FC<AreaItemListProps> = ({ areas, isMobile }) => {
  return (
    <List
      dataSource={areas}
      renderItem={(item) => <AreaItem area={item} isMobile={isMobile} />}
    />
  );
};

export default AreaItemList;
