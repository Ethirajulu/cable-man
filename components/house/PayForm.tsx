import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getLoadingSl } from "../../redux/selectors";
import { House, Log, PAID_FOR_FORMAT, PAID_ON_FORMAT } from "../../redux/types";
import { updatePaymentThunk } from "../../redux/thunk";
import { setLoading } from "../../redux/actions";

export interface PayFormProps {
  house: House;
  areaName: string;
  isMobile: boolean;
  reset: () => void;
}

const PayForm: FC<PayFormProps> = ({ house, areaName, isMobile, reset }) => {
  const [form] = Form.useForm();
  const loading = useSelector(getLoadingSl);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({ ...house, created_on: moment() });
  }, [house]);

  const onSubmit = (values) => {
    const log: Log = {
      area_name: areaName,
      house_id: house.id,
      house_name: house.name,
      box_no: house.box_no,
      paid_amt: values.default_amt,
      paid_for: values.created_on.format(PAID_FOR_FORMAT).toString(),
      paid_on: moment().format(PAID_ON_FORMAT).toString(),
    };
    dispatch(setLoading(true));
    dispatch(updatePaymentThunk(log, house, reset));
  };

  const formItemLayout = isMobile
    ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    : null;

  const buttonItemLayout = isMobile
    ? {
        wrapperCol: { span: 5, offset: 16 },
      }
    : null;

  return (
    <Form
      form={form}
      autoComplete="off"
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
      <Form.Item label="Month" name="created_on">
        <DatePicker picker="month" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Mark Paid
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PayForm;
