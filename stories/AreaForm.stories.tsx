import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react";
import AreaForm from "../components/AreaForm";
import { action } from "@storybook/addon-actions";

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
  setIsOpen: action("Form closed"),
};
