import { Drawer } from "antd";
import React, { FC } from "react";

export interface FormSheetProps {
  title: string;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const FormSheet: FC<FormSheetProps> = ({
  title,
  isOpen,
  isMobile,
  onClose,
  children,
}) => {
  return (
    <Drawer
      title={title}
      visible={isOpen}
      placement={isMobile ? "bottom" : "right"}
      onClose={onClose}
      height="fit-content"
    >
      {children}
    </Drawer>
  );
};

export default FormSheet;
