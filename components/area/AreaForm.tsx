import { Button, Form, Input } from "antd";
import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { getLoadingSl } from "../../redux/selectors";
import { addAreaThunk, updateAreaThunk } from "../../redux/thunk";
import { Area } from "../../redux/types";

export interface AreaFormProps {
  area: Area | null;
  isMobile: boolean;
}

const AreaForm: FC<AreaFormProps> = ({ area, isMobile }) => {
  const [form] = Form.useForm();
  const loading = useSelector(getLoadingSl);
  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
  }, [area]);

  const onSubmit = (values) => {
    const areaName = values.name;
    dispatch(setLoading(true));
    if (area) {
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
        initialValue={area ? area.name : ""}
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
