import React, { ComponentProps } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Header from "../components/Header";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Collector",
  back: false,
  loading: false,
  filter: action("filter called"),
};
