import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, List, Modal, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { deleteAreaThunk } from "../../redux/thunk";
import { Area } from "../../redux/types";

import styles from "../../styles/AreaItem.module.css";

export interface AreaItemListProps {
  areas: Area[];
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setCurArea: (area: Area) => void;
}

const Item = List.Item;

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
        <Item
          key={item.id}
          actions={[
            <Button
              icon={<EditOutlined />}
              onClick={() => onEditClick(item)}
              className={styles.edit_button}
            />,
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDeleteClick(item)}
              danger
            />,
          ]}
          className={styles.meta}
        >
          <Item.Meta
            avatar={<Avatar src="/images/area.svg" />}
            title={item.name}
          />
        </Item>
      )}
    />
  );
};

export default AreaItemList;
