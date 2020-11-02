import { FileTextOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import Link from "next/link";
import React, { FC } from "react";

import styles from "../../styles/AreaFooter.module.css";

export interface AreaFooterProps {
  totalAmount: number;
}

const AreaFooter: FC<AreaFooterProps> = ({ totalAmount }) => {
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
            <span className={styles.color_white}>
              {totalAmount}
            </span>
          </Space>
        </Space>
      </Col>
    </Row>
  );
};

export default AreaFooter;
