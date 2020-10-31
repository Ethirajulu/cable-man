import { Button, Form, Input, InputNumber } from "antd";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/actions";
import { getLoadingSl } from "../../redux/selectors";
import { addHouseThunk, updateHouseThunk } from "../../redux/thunk";
import { House } from "../../redux/types";

export interface HouseFormProps {
  house: House | null;
  areaId: string;
  isMobile: boolean;
}

const HouseForm: FC<HouseFormProps> = ({ house, areaId, isMobile }) => {
  const [form] = Form.useForm();
  const loading = useSelector(getLoadingSl);
  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
  }, [house]);

  const onSubmit = (values) => {
    const newHouse = {
      area_id: areaId,
      name: values.name,
      default_amt: values.amount,
      box_no: values.boxNo,
    };

    dispatch(setLoading(true));
    if (house) {
      dispatch(updateHouseThunk({ id: house.id, ...newHouse }));
    } else {
      dispatch(addHouseThunk(newHouse));
    }
  };

  const formItemLayout = isMobile
    ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    : null;

  const buttonItemLayout = isMobile
    ? {
        wrapperCol: { span: 4, offset: 18 },
      }
    : null;

  return (
    <Form
      {...formItemLayout}
      form={form}
      layout={isMobile ? "horizontal" : "vertical"}
      name="house_form"
      onFinish={onSubmit}
    >
      <Form.Item
        label="House Name"
        name="name"
        initialValue={house ? house.name : ""}
        rules={[{ required: true, message: "House name required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount"
        initialValue={house ? house.default_amt : ""}
        rules={[{ required: true, message: "Amount required" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Box No"
        name="boxNo"
        initialValue={house ? house.box_no : ""}
        rules={[{ required: true, message: "Box number required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HouseForm;
