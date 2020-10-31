import { Col, Row } from "antd";
import React, { FC } from "react";

export interface AreaFooterProps {
  totalAmount: number;
}

const AreaFooter: FC<AreaFooterProps> = ({ totalAmount }) => {
  return (
    <Row>
      <Col></Col>
    </Row>
  );
};

export default AreaFooter;
