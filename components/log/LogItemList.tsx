import { DollarCircleOutlined } from "@ant-design/icons";
import { Avatar, Descriptions, List, Space } from "antd";
import Item from "antd/lib/list/Item";
import React, { FC } from "react";
import { House, Log } from "../../redux/types";

import styles from "../../styles/ListItem.module.css";

export interface LogItemListProps {
  areaName: string;
  house: House;
  logs: Log[];
  isMobile: boolean;
}

const LogItemList: FC<LogItemListProps> = ({
  areaName,
  house,
  logs,
  isMobile,
}) => {
  return (
    <>
      <Descriptions
        title="Customer Information"
        bordered
        size={isMobile ? "small" : "middle"}
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        className={styles.descriptions}
      >
        <Descriptions.Item label="Area">{areaName}</Descriptions.Item>
        <Descriptions.Item label="Name">{house.name}</Descriptions.Item>
        {house.phone_no && (
          <Descriptions.Item label="Phone No">
            {house.phone_no}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Box No">{house.box_no}</Descriptions.Item>
        <Descriptions.Item label="Amount">
          {house.default_amt}
        </Descriptions.Item>
      </Descriptions>
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={logs}
        renderItem={(log: Log) => (
          <Item
            actions={[
              <Space key="amount_paid" className={styles.paid_amt}>
                <DollarCircleOutlined />
                {log.paid_amt}
              </Space>,
            ]}
          >
            <Item.Meta
              title={log.paid_for}
              avatar={<Avatar src="/images/calendar.svg" />}
              description={`Paid on ${log.paid_on}`}
            />
          </Item>
        )}
        className={styles.list}
      />
    </>
  );
};

export default LogItemList;
