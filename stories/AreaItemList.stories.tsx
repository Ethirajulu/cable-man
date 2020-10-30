import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react";
import AreaItemList from "../components/AreaItemList";
import { action } from "@storybook/addon-actions";

export default {
  title: "Area/AreaItemList",
  component: AreaItemList,
} as Meta;

const Template: Story<ComponentProps<typeof AreaItemList>> = (args) => (
  <AreaItemList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  areas: [
    { id: "123", name: "Sukumar" },
    { id: "1234", name: "Mallika" },
  ],
  isMobile: true,
  setType: action("Set type"),
  setIsOpen: action("Sheet open / close"),
};
