import { Button, PageHeader } from "antd";
import React, { FC, useState } from "react";
import Search from "antd/lib/input/Search";
import { Spring } from "react-spring/renderprops.cjs";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import styles from "../styles/Header.module.css";

export interface HeaderProps {
  title: string;
  back: boolean;
  showAdd: boolean;
  loading: boolean;
  isMobile: boolean;
  filter: (value: string) => void;
  onAddClick?: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  back,
  showAdd,
  loading,
  isMobile,
  filter,
  onAddClick,
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

  const shouldShowAdd = () => {
    let show = false;
    if (showAdd) {
      if (!open) {
        show = true;
      }
    }
    return show;
  };

  const addButton = (
    <Button
      key="add"
      shape="circle"
      icon={<PlusOutlined />}
      size={isMobile ? "small" : "middle"}
      className={styles.extras_margin}
      style={{ display: !shouldShowAdd() && "none" }}
      onClick={onAddClick}
    />
  );

  return (
    <>
      {back ? (
        <PageHeader
          className={styles.sticky}
          ghost={false}
          onBack={() => window.history.back()}
          title={title}
          extra={[open ? SearchInput : SearchIcon, addButton]}
        />
      ) : (
        <PageHeader
          className={styles.sticky}
          ghost={false}
          title={title}
          extra={[open ? SearchInput : SearchIcon, addButton]}
        />
      )}
    </>
  );
};

export default Header;
