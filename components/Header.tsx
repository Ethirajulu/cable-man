import { Button, PageHeader } from "antd";
import React, { FC, useState } from "react";
import Search from "antd/lib/input/Search";
import { Spring } from "react-spring/renderprops.cjs";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import styles from "../styles/Header.module.css";

export interface HeaderProps {
  title: string;
  back: boolean;
  loading: boolean;
  isMobile: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filter: (value: string) => void;
}

const Header: FC<HeaderProps> = ({
  title,
  back,
  loading,
  isMobile,
  setIsOpen,
  filter,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const onFocusOut = () => {
    setOpen(false);
    filter("");
  };

  const SearchIcon = (
    <SearchOutlined
      key="search_icon"
      onClick={() => setOpen(true)}
      className={styles.extras_margin}
    />
  );
  const SearchInput = (
    <Spring
      key="search"
      from={{ width: "5vw" }}
      to={{ width: isMobile ? "30vw" : "40vw" }}
    >
      {(props) => (
        <Search
          autoFocus
          className={styles.extras_margin}
          loading={loading}
          onChange={(e) => filter(e.target.value)}
          onSearch={(value) => filter(value)}
          onBlur={onFocusOut}
          allowClear
          style={props}
          size={isMobile ? "small" : "middle"}
        />
      )}
    </Spring>
  );

  const addButton = (
    <Button
      key="add"
      shape="circle"
      icon={<PlusOutlined />}
      size={isMobile ? "small" : "middle"}
      className={styles.extras_margin}
      onClick={() => setIsOpen(true)}
    />
  );

  return (
    <>
      {back ? (
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={title}
          extra={[open ? SearchInput : SearchIcon, addButton]}
        />
      ) : (
        <PageHeader
          ghost={false}
          title={title}
          extra={[open ? SearchInput : SearchIcon, addButton]}
        />
      )}
    </>
  );
};

export default Header;
