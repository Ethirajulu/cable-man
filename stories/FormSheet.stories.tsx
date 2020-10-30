import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react";
import FormSheet from "../components/FormSheet";
import { action } from "@storybook/addon-actions";

export default {
  title: "Common/FormSheet",
  component: FormSheet,
} as Meta;

const Template: Story<ComponentProps<typeof FormSheet>> = (args) => (
  <FormSheet {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Add Area",
  isOpen: true,
  isMobile: true,
  setIsOpen: action("Close action called"),
  children: <p>Hello</p>,
};
