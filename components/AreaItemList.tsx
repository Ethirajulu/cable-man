import { List } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { FC } from "react";
import { Area } from "../redux/types";
import AreaItem from "./AreaItem";

export interface AreaItemListProps {
  areas: Area[];
}

export const AreaItemList: FC<AreaItemListProps> = ({ areas }) => {
  const screen = useBreakpoint();
  return (
    <List
      dataSource={areas}
      renderItem={(item) => <AreaItem area={item} isMobile={screen.xs} />}
    />
  );
};

export default AreaItemList;
