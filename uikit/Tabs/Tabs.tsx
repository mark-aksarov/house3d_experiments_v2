"use client"

import classNames from 'classnames';
import styles from './Tabs.module.scss';
import { TabsContext } from "./TabsContext";
import { HTMLAttributes, useMemo } from "react";

interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string,
  onChange: (tab: string) => void,
}

export default function Tabs({
  value,
  onChange,
  children,
  className,
  ...props
}: TabsProps) {
  const classes = classNames(styles.tabs, className);

  const contextValue = useMemo(() => ({
    value,
    onChange
  }), [value, onChange]);

  return (
    <div
      {...props}
      role="tablist"
      className={classes}
    >
      <TabsContext.Provider value={contextValue}>
        {children}
      </TabsContext.Provider>
    </div>
  )
}