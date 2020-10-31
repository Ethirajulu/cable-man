import {
  CheckOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FieldNumberOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, List, Row, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Item from "antd/lib/list/Item";
import confirm from "antd/lib/modal/confirm";
import { DateTime } from "luxon";
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
  setPayFormStatus: (isOpen: boolean) => void;
  setCurHouse: (house: House) => void;
}

const HouseItemList: FC<HouseItemListProps> = ({
  houses,
  setType,
  setIsOpen,
  setPayFormStatus,
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

  const onNotPaidClick = (house: House) => {
    setCurHouse(house);
    setPayFormStatus(true);
  };

  const IconText = ({ icon, text, color = null }) => (
    <Space style={color && { color: color }}>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const checkIsPaid = (lastPaidDate: string) => {
    const todaysDate = DateTime.local().toFormat("MMMM-yyyy");
    let isPaid = false;
    if (lastPaidDate === todaysDate) {
      isPaid = true;
    }
    return isPaid;
  };

  return (
    <List
      itemLayout="vertical"
      dataSource={houses}
      renderItem={(house) => (
        <Item
          key={house.id}
          extra={
            <div className={styles.pay_status}>
              {house.last_paid && checkIsPaid(house.last_paid) ? (
                <IconText icon={CheckOutlined} text="Paid" color="green" />
              ) : (
                <Button
                  type="link"
                  danger
                  onClick={() => onNotPaidClick(house)}
                >
                  Not Paid
                </Button>
              )}
            </div>
          }
          className={styles.item}
        >
          <Item.Meta
            avatar={<Avatar src="/images/house.svg" />}
            title={house.name}
            description={
              <Row>
                <Col span={24} className={styles.des_col}>
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
                </Col>
                <Col span={24}>
                  <Row>
                    <Col xs={{ offset: 18 }} md={{ offset: 23 }}>
                      <Space size="small" split={<Divider type="vertical" />}>
                        <EditOutlined
                          onClick={() => onEditClick(house)}
                          className={styles.edit_button}
                        />
                        <DeleteOutlined
                          onClick={() => onDeleteClick(house)}
                          className={styles.delete_button}
                        />
                        <Button icon={<InfoCircleOutlined />} />
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            className={styles.meta}
          />
        </Item>
      )}
    />
  );
};

export default HouseItemList;
