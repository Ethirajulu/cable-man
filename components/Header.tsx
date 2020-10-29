import { PageHeader } from "antd";
import React, { FC, useState } from "react";
import * as Icons from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { Spring } from "react-spring/renderprops.cjs";

import styles from "../styles/Header.module.css";

const SearchOutlined = Icons.SearchOutlined;

export interface HeaderProps {
  title: string;
  back: boolean;
  loading: boolean;
  filter: (value: string) => void;
}

const Header: FC<HeaderProps> = ({ title, back, loading, filter }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onFocusOut = () => {
    setOpen(false);
    filter("");
  };

  const SearchIcon = (
    <SearchOutlined key="search_icon" onClick={() => setOpen(true)} />
  );
  const SearchInput = (
    <Spring key="search" from={{ width: "0vw" }} to={{ width: "40vw" }}>
      {(props) => (
        <Search
          autoFocus
          loading={loading}
          onSearch={filter}
          onBlur={onFocusOut}
          allowClear
          style={props}
        />
      )}
    </Spring>
  );
  return (
    <>
      {back ? (
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={title}
          extra={[open ? SearchInput : SearchIcon]}
          className={styles.header}
        />
      ) : (
        <PageHeader
          ghost={false}
          title={title}
          extra={[open ? SearchInput : SearchIcon]}
          className={styles.header}
        />
      )}
    </>
  );
};

export default Header;
