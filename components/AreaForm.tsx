import { Button, Form, Input } from "antd";
import React, { FC } from "react";

export interface AreaFormProps {
  name?: string;
  setIsOpen: (isOpen: boolean) => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AreaForm: FC<AreaFormProps> = ({ name, setIsOpen }) => {
  const onSubmit = () => {};

  return (
    <Form {...layout} name="area_form" onFinish={onSubmit}>
      <Form.Item
        label="Area Name"
        name="name"
        initialValue={name ? name : ""}
        rules={[{ required: true, message: "Please input a area name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AreaForm;
