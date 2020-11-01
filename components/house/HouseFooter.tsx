import {
  AlignLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Dropdown, Menu, Row } from "antd";
import React, { FC, useState } from "react";
import { ALL, House, NOT_PAID, PAID } from "../../redux/types";

import styles from "../../styles/ListItem.module.css";

export interface HouseFooterProps {
  houses: House[];
  setHousesFiltered: (house: House[]) => void;
}

const HouseFooter: FC<HouseFooterProps> = ({ houses, setHousesFiltered }) => {
  const [filterOption, setFilterOption] = useState<string>(ALL);
  const onFilterChange = (e: any) => {
    setFilterOption(e.key);
  };

  const menu = (
    <Menu
      className={styles.filter_menu}
      triggerSubMenuAction="click"
      selectedKeys={[filterOption]}
      onClick={onFilterChange}
    >
      <Menu.Item key={PAID} icon={<CheckOutlined style={{ color: "green" }} />}>
        Paid
      </Menu.Item>
      <Menu.Item
        key={NOT_PAID}
        icon={<CloseOutlined style={{ color: "crimson" }} />}
      >
        Not paid
      </Menu.Item>
      <Menu.Item
        key={ALL}
        icon={<AlignLeftOutlined style={{ color: "blue" }} />}
      >
        All
      </Menu.Item>
    </Menu>
  );
  return (
    <Row style={{ backgroundColor: "black" }}>
      <Col offset={18} span={6}>
        <Dropdown overlay={menu} placement="topCenter" trigger={["click"]}>
          <Button
            type="text"
            icon={<FilterOutlined />}
            className={styles.filter_btn}
          >
            Filter
          </Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default HouseFooter;
