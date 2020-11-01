import { FileTextOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import Link from "next/link";
import React, { FC } from "react";
import { animated, useSpring } from "react-spring";

import styles from "../../styles/AreaFooter.module.css";

export interface AreaFooterProps {
  totalAmount: number;
}

const AreaFooter: FC<AreaFooterProps> = ({ totalAmount }) => {
  const spring = useSpring({
    number: totalAmount,
    from: { number: 0 },
    config: { duration: 1000 },
  });
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
            <animated.span className={styles.color_white}>
              {spring.number.interpolate((number) => Math.floor(number))}
            </animated.span>
          </Space>
        </Space>
      </Col>
    </Row>
  );
};

export default AreaFooter;
