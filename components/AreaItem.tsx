import { Divider, List, Row, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Button from "antd/lib/button";
import React, { FC, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";
import { Area } from "../redux/types";

import styles from "../styles/AreaItem.module.css";

const Item = List.Item;

export interface AreaItemProps {
  area: Area;
  isMobile: boolean;
  loading: boolean;
  onEditClick: (area: Area) => void;
  onDeleteClick: (area: Area) => void;
}

const AreaItem: FC<AreaItemProps> = ({
  area,
  isMobile,
  loading,
  onEditClick,
  onDeleteClick,
}) => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  const bind = useGesture({
    onDrag: ({ movement: [mx] }) => {
      if (mx < 0) {
        set({ x: mx });
      }
    },
    onDragEnd: ({ movement: [mx] }) => {
      if (mx < -90) {
        if (mx > -190) {
          // shows edit button
          set({ x: -89 });
        } else {
          // shows delete button
          set({ x: isMobile ? -193 : -200 });
        }
      } else {
        set({ x: 0 });
      }
    },
  });

  useEffect(() => {
    set({ x: 0 });
  }, [loading]);

  return (
    <div className={styles.item}>
      <animated.div
        {...bind()}
        style={{
          transform: x.interpolate((x) => `translateX(${x}px)`),
        }}
        className={styles.meta}
      >
        <Item>
          <Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={area.name}
          />
        </Item>
      </animated.div>
      <Row className={styles.option} justify="end">
        <Space
          size={isMobile ? "small" : "middle"}
          split={<Divider type="vertical" />}
        >
          <Button
            type="primary"
            className={styles.delete_button}
            danger
            onClick={() => onDeleteClick(area)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className={styles.edit_button}
            onClick={() => onEditClick(area)}
          >
            Edit
          </Button>
        </Space>
      </Row>
    </div>
  );
};

export default AreaItem;
