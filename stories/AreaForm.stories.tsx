import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react";
import AreaForm from "../components/area/AreaForm";

export default {
  title: "Area/AreaForm",
  component: AreaForm,
} as Meta;

const Template: Story<ComponentProps<typeof AreaForm>> = (args) => (
  <AreaForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "Ethi",
  isMobile: true,
};
