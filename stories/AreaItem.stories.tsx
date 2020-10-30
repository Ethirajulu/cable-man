import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react";
import AreaItem from "../components/AreaItem";
import { action } from "@storybook/addon-actions";

export default {
  title: "Area/AreaItem",
  component: AreaItem,
} as Meta;

const Template: Story<ComponentProps<typeof AreaItem>> = (args) => (
  <AreaItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  area: { id: "123", name: "Kumar" },
  isMobile: true,
  onEditClick: action("Click action called"),
  onDeleteClick: action("Delete action called"),
};
