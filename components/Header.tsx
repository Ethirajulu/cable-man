import { Button, PageHeader } from "antd";
import React, { FC, useState } from "react";
import Search from "antd/lib/input/Search";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import styles from "../styles/Header.module.css";
import { EMPTY_STRING } from "../redux/types";
import { motion } from "framer-motion";

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

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    filter(filterValue);
    if (filterValue === EMPTY_STRING) {
      setOpen(false);
    }
  };

  const onSearchBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    if (filterValue === EMPTY_STRING) {
      setOpen(false);
    }
  };

  const SearchIcon = (
    <SearchOutlined
      key="search_icon"
      onClick={() => setOpen(true)}
      className={`${styles.extras_margin} ${styles.search_icon}`}
    />
  );
  const SearchInput = (
    <motion.div
      initial={{ width: "0vw" }}
      animate={{ width: isMobile ? "30vw" : "40vw" }}
      transition={{ ease: "easeIn" }}
    >
      <Search
        autoFocus
        className={styles.extras_margin}
        loading={loading}
        onChange={onSearchChange}
        onBlur={onSearchBlur}
        allowClear
        size={isMobile ? "middle" : "large"}
      />
    </motion.div>
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
      size={isMobile ? "middle" : "large"}
      className={styles.extras_margin}
      style={{ display: !shouldShowAdd() && "none" }}
      onClick={onAddClick}
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
          className={styles.header}
        />
      ) : (
        <PageHeader
          ghost={false}
          title={title}
          extra={[open ? SearchInput : SearchIcon, addButton]}
          className={styles.header}
        />
      )}
    </>
  );
};

export default Header;
