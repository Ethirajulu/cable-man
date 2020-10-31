import { Drawer } from "antd";
import React, { FC } from "react";

export interface FormSheetProps {
  title: string;
  isOpen: boolean;
  isMobile: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FormSheet: FC<FormSheetProps> = ({
  title,
  isOpen,
  isMobile,
  setIsOpen,
  children,
}) => {
  return (
    <Drawer
      title={title}
      visible={isOpen}
      placement={isMobile ? "bottom" : "right"}
      onClose={() => setIsOpen(false)}
      height="fit-content"
    >
      {children}
    </Drawer>
  );
};

export default FormSheet;
