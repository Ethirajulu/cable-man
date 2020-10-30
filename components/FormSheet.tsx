import React, { FC } from "react";
import DynamicSheet from "react-dynamic-sheet";

export interface FormSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FormSheet: FC<FormSheetProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <DynamicSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {children}
    </DynamicSheet>
  );
};

export default FormSheet;
