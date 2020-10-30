import React, { ComponentProps } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Header from "../components/Header";

export default {
  title: "Common/Header",
  component: Header,
} as Meta;

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Cable Man",
  back: false,
  loading: false,
  isMobile: true,
  setIsFormOpen: action("form open/closed"),
  filter: action("filter called"),
};
