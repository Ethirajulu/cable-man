import {
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import { Button, Col, List, Row, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Item from "antd/lib/list/Item";
import confirm from "antd/lib/modal/confirm";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { deleteHouseThunk } from "../../redux/thunk";
import { House } from "../../redux/types";

import styles from "../../styles/ListItem.module.css";

export interface HouseItemListProps {
  houses: House[];
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setCurHouse: (house: House) => void;
}

const HouseItemList: FC<HouseItemListProps> = ({
  houses,
  setType,
  setIsOpen,
  setCurHouse,
}) => {
  const dispatch = useDispatch();

  const onEditClick = (house: House) => {
    setType("Edit");
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
        dispatch(deleteHouseThunk(house.id));
      },
    });
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
      itemLayout="vertical"
      dataSource={houses}
      renderItem={(house) => (
        <Item
          key={house.id}
          actions={[
            <Button
              icon={<EditOutlined />}
              onClick={() => onEditClick(house)}
              className={styles.edit_button}
            />,
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDeleteClick(house)}
              danger
            />,
          ]}
          className={styles.meta}
        >
          <Item.Meta
            avatar={<Avatar src="/images/house.svg" />}
            title={house.name}
            description={
              <Row gutter={16}>
                <Col>
                  <IconText
                    icon={DollarCircleOutlined}
                    text={house.default_amt}
                    key="box_no"
                  />
                </Col>
                <Col>
                  <IconText
                    icon={FieldNumberOutlined}
                    text={house.box_no}
                    key="amount"
                  />
                </Col>
              </Row>
            }
          />
        </Item>
      )}
    />
  );
};

export default HouseItemList;
