import { Button, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";
import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { getLoadingSl } from "../../redux/selectors";
import { addAreaThunk, updateAreaThunk } from "../../redux/thunk";
import { Area, EDIT_LABEL } from "../../redux/types";

export interface AreaFormProps {
  area: Area | null;
  type: string;
  isMobile: boolean;
}

const AreaForm: FC<AreaFormProps> = ({ area, type, isMobile }) => {
  const [form] = Form.useForm();
  const loading = useSelector(getLoadingSl);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(area);
  }, [area]);

  const onSubmit = (values) => {
    const areaName = values.name;
    dispatch(setLoading(true));
    if (type === EDIT_LABEL) {
      dispatch(updateAreaThunk(area.id, areaName));
    } else {
      dispatch(addAreaThunk(areaName));
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
      name="area_form"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Area Name"
        name="name"
        rules={[{ required: true, message: "Area name required" }]}
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

export default AreaForm;
