import classNames from "classnames";
import styles from './ListGroup.module.scss';
import { ListItemContext } from "./ListItemContext";
import React, { ComponentPropsWithoutRef, MouseEventHandler } from "react";

export type ListItemSize = "large" | "regular" | "small";

interface ListItemProps extends ComponentPropsWithoutRef<"li"> {
  size?: ListItemSize,
  href?: string;
  onClick?: MouseEventHandler<any>;
};

export default function ListItem({
  size = "regular",
  className,
  href,
  onClick,
  children,
  ...props
}: ListItemProps) {
  const classes = classNames(
    styles.listItem,
    styles[size],
    className,
    {
      [styles.listItemNotAction]: !href && !onClick,
    }
  );

  let content;

  if (href) {
    content = <a href={href} className={styles.listItemButton}>
      {children}
    </a>
  }
  else if (onClick) {
    content = <button onClick={onClick} className={styles.listItemButton}>
      {children}
    </button>
  }
  else {
    content = children;
  }

  return (
    <ListItemContext.Provider value={{ size }}>
      <li {...props} className={classes}>
        {content}
      </li>
    </ListItemContext.Provider>
  )
}