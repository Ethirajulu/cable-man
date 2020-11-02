import { FileTextOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import { animate } from "framer-motion";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

import styles from "../../styles/AreaFooter.module.css";

export interface AreaFooterProps {
  totalAmount: number;
}

const AreaFooter: FC<AreaFooterProps> = ({ totalAmount }) => {
  const [amount, setAmount] = useState<number>(0);
  useEffect(() => {
    animate(0, totalAmount, {
      duration: 1,
      onUpdate(value) {
        setAmount(Math.floor(value));
      },
    });
  }, []);
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
        <Space direction="vertical" className={styles.statistic}>
          <span className={styles.color_white}>Today' collection</span>
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
      </Col>
    </Row>
  );
};

export default AreaFooter;
