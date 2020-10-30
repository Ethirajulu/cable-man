import { Button, Form, Input } from "antd";
import React, { FC } from "react";

export interface AreaFormProps {
  name?: string;
  isMobile: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const AreaForm: FC<AreaFormProps> = ({ name, isMobile, setIsOpen }) => {
  const [form] = Form.useForm();

  const onSubmit = () => {};

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
      layout={isMobile ? "horizontal" : "vertical"}
      name="area_form"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Area Name"
        name="name"
        initialValue={name ? name : ""}
        rules={[{ required: true, message: "Please input a area name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AreaForm;
