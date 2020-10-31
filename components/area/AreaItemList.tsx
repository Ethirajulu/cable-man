import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, List } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Item from "antd/lib/list/Item";
import confirm from "antd/lib/modal/confirm";
import { setLoading } from "../../redux/actions";
import { deleteAreaThunk } from "../../redux/thunk";
import { Area } from "../../redux/types";

import styles from "../../styles/ListItem.module.css";

export interface AreaItemListProps {
  areas: Area[];
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setCurArea: (area: Area) => void;
}

export const AreaItemList: FC<AreaItemListProps> = ({
  areas,
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
    confirm({
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
      renderItem={(area) => (
        <Item
          key={area.id}
          actions={[
            <Button
              key="edit_btn"
              icon={<EditOutlined />}
              onClick={() => onEditClick(area)}
              className={styles.edit_button}
            />,
            <Button
              key="delete_btn"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteClick(area)}
              danger
            />,
          ]}
          className={styles.meta}
        >
          <Link
            href={{
              pathname: `/houses`,
              query: {
                areaId: area.id,
                name: area.name,
              },
            }}
            passHref
          >
            <a className={styles.anchor}>
              <Item.Meta
                avatar={<Avatar src="/images/area.svg" />}
                title={area.name}
              />
            </a>
          </Link>
        </Item>
      )}
    />
  );
};

export default AreaItemList;
