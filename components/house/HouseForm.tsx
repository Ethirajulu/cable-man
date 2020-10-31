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
  type: string;
  isMobile: boolean;
}

const HouseForm: FC<HouseFormProps> = ({ house, areaId, type, isMobile }) => {
  const [form] = Form.useForm();
  const loading = useSelector(getLoadingSl);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(house);
  }, [house]);

  const onSubmit = (values) => {
    const newHouse = {
      area_id: areaId,
      name: values.name,
      phone_no: values.phone_no,
      default_amt: values.default_amt,
      box_no: values.box_no,
    };

    dispatch(setLoading(true));
    if (type === "Edit") {
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
        rules={[{ required: true, message: "House name required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Phone Number" name="phone_no">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="default_amt"
        rules={[{ required: true, message: "Amount required" }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Box No"
        name="box_no"
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
