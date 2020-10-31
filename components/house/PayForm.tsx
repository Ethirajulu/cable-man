import { Button, Form, Input, InputNumber } from "antd";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { getLoadingSl } from "../../redux/selectors";
import { House, Log } from "../../redux/types";
import { updatePaymentThunk } from "../../redux/thunk";
import { setLoading } from "../../redux/actions";

export interface PayFormProps {
  house: House;
  areaName: string;
  isMobile: boolean;
}

const PayForm: FC<PayFormProps> = ({ house, areaName, isMobile }) => {
  const [form] = Form.useForm();
  const loading = useSelector(getLoadingSl);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(house);
  }, [house]);

  const onSubmit = (values) => {
    const log: Log = {
      area_name: areaName,
      house_id: house.id,
      house_name: house.name,
      box_no: house.box_no,
      paid_amt: values.default_amt,
      created_on: DateTime.local().toFormat("MMMM-yyyy"),
    };
    dispatch(setLoading(true));
    dispatch(updatePaymentThunk(log, house));
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
      form={form}
      {...formItemLayout}
      layout={isMobile ? "horizontal" : "vertical"}
      name="pay_form"
      onFinish={onSubmit}
    >
      <Form.Item
        label="House Name"
        name="name"
        rules={[{ required: true, message: "House name required" }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Box No"
        name="box_no"
        rules={[{ required: true, message: "Box number required" }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="default_amt"
        rules={[{ required: true, message: "Amount required" }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Paid
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PayForm;
