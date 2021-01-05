import {
  CheckOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  FieldNumberOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Link from "next/link";
import React, { FC } from "react";
import { House } from "../../redux/types";

import styles from "../../styles/HouseItem.module.css";

export interface HouseItemProps {
  index: number;
  areaName: string;
  house: House;
  checkIsPaid: (lastPaidDate: string) => boolean;
  onDeleteClick: (house: House) => void;
  onEditClick: (house: House) => void;
  onNotPaidClick: (house: House) => void;
  onPaidClick: (house: House) => void;
  onAddClick?: (index: number) => void;
  filtered: boolean;
}

const HouseItem: FC<HouseItemProps> = ({
  index,
  areaName,
  house,
  checkIsPaid,
  onPaidClick,
  onNotPaidClick,
  onEditClick,
  onDeleteClick,
  onAddClick,
  filtered,
}) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
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
            style={{ color: "green", padding: "0px" }}
          >
            <CheckOutlined /> Paid
          </Button>
        ) : (
          <Button
            type="link"
            danger
            onClick={() => onNotPaidClick(house)}
            style={{ padding: "0px" }}
          >
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
      {!filtered && (
        <Button
          key="add"
          type="text"
          icon={<PlusOutlined />}
          size="small"
          onClick={() => onAddClick(index)}
        />
      )}
    </div>
  );
};

export default HouseItem;
