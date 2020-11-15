import {
  CheckOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FieldNumberOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Divider, List, Row, Space } from "antd";
import Item from "antd/lib/list/Item";
import confirm from "antd/lib/modal/confirm";
import Link from "next/link";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { deleteHouseThunk, markNotPaidThunk } from "../../redux/thunk";
import { EDIT_LABEL, House } from "../../redux/types";

// import styles from "../../styles/ListItem.module.css";
import styles from "../../styles/HouseItem.module.css";
import { checkIsPaid } from "../../utils";

export interface HouseItemListProps {
  houses: House[];
  areaName: string;
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPayFormStatus: (isOpen: boolean) => void;
  setCurHouse: (house: House) => void;
}

const HouseItemList: FC<HouseItemListProps> = ({
  houses,
  areaName,
  setType,
  setIsOpen,
  setPayFormStatus,
  setCurHouse,
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
        dispatch(deleteHouseThunk(house.id));
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
        <div className={styles.house_grid}>
          <div className={styles.avatar_grid}>
            <Avatar src="/images/house.svg" />
          </div>
          <h4 className={styles.name_grid}>{house.name}</h4>
          <div className={styles.status_grid}>
            {house.last_paid && checkIsPaid(house.last_paid) ? (
              <Button
                type="link"
                onClick={() => onPaidClick(house)}
                style={{ color: "green" }}
              >
                <CheckOutlined /> Paid
              </Button>
            ) : (
              <Button type="link" danger onClick={() => onNotPaidClick(house)}>
                Not Paid
              </Button>
            )}
          </div>
          <div className={styles.details_grid}>
            <Space split={<Divider type="vertical" />}>
              <IconText
                icon={DollarCircleOutlined}
                text={house.default_amt}
                key="box_no"
              />
              <IconText
                icon={FieldNumberOutlined}
                text={house.box_no}
                key="amount"
              />
            </Space>
          </div>
          <div className={styles.actions_grid}>
            <Space size="small" split={<Divider type="vertical" />}>
              <EditOutlined
                onClick={() => onEditClick(house)}
                className={styles.edit_button}
              />
              <DeleteOutlined
                onClick={() => onDeleteClick(house)}
                className={styles.delete_button}
              />
              <Link
                href={{
                  pathname: `/logs`,
                  query: {
                    ...house,
                    areaName,
                  },
                }}
                passHref
              >
                <a>
                  <Button icon={<InfoCircleOutlined />} />
                </a>
              </Link>
            </Space>
          </div>
        </div>
      )}
    />
  );
};

export default HouseItemList;
