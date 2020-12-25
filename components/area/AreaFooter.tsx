import { FileTextOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Row, Space } from "antd";
import { animate } from "framer-motion";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

import {
  getTodaysCollectionThunk,
  getMonthsCollectionThunk,
} from "../../utils";

import styles from "../../styles/AreaFooter.module.css";

export interface AreaFooterProps {}

const AreaFooter: FC<AreaFooterProps> = ({}) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"Today" | "Month">("Today");

  useEffect(() => {
    getTodaysTotal();
  }, []);

  useEffect(() => {
    animate(0, totalAmount, {
      duration: 1,
      onUpdate(value) {
        setAmount(Math.floor(value));
      },
    });
  }, [totalAmount]);

  const getTodaysTotal = async () => {
    setType("Today");
    const totalAmount = await getTodaysCollectionThunk();
    setTotalAmount(totalAmount);
  };

  const getMonthsTotal = async () => {
    setType("Month");
    const totalAmount = await getMonthsCollectionThunk();
    setTotalAmount(totalAmount);
  };

  const menu = (
    <Menu
      className={styles.filter_menu}
      triggerSubMenuAction="click"
      selectedKeys={[type]}
      onClick={(e) => (e.key === "Today" ? getTodaysTotal() : getMonthsTotal())}
    >
      <Menu.Item key="Today">Today's</Menu.Item>
      <Menu.Item key="Month">Month's</Menu.Item>
    </Menu>
  );

  return (
    <Row>
      <Col span={12} className={styles.report_col}>
        <Link href="/reports" passHref>
          <a>
            <Button
              type="text"
              icon={<FileTextOutlined />}
              className={styles.report_btn}
            >
              Report
            </Button>
          </a>
        </Link>
      </Col>
      <Col span={12} className={styles.report_col}>
        <Dropdown overlay={menu} placement="topCenter" trigger={["click"]}>
          <Space direction="vertical" className={styles.statistic}>
            <span className={styles.color_white}>{type}'s collection</span>
            <Space>
              <img
                src="/images/rupee.svg"
                alt="rupee"
                height="10px"
                width="10px"
              />
              <span className={styles.color_white}>{amount}</span>
            </Space>
          </Space>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default AreaFooter;
