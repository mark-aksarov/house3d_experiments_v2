"use client"

import classNames from "classnames";
import styles from './Tabs.module.scss';
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useGetTabPanelContainerRef } from "./TabPanelContainerContext";

interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  activeTabId: string,
  tabId: string
}

type TabPanelState = "shown" | "hidden";

export default function TabPanel({
  id,
  activeTabId,
  tabId,
  className,
  children,
  ...props
}: TabPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const getContainerRef = useGetTabPanelContainerRef();
  const [state, setState] = useState<TabPanelState>(activeTabId === tabId ? "shown" : "hidden");

  //change container height
  useEffect(() => {
    const container = getContainerRef().current;
    const panel = ref.current;

    if (container && panel && activeTabId === tabId && state === "shown") {
      container.style.height = panel.clientHeight + "px";
    }
  }, [activeTabId, tabId, state, getContainerRef])

  //show/hide panel on tab change
  useEffect(() => {
    if (activeTabId === tabId && state === "hidden") {
      setState("shown");
    }
    else if (activeTabId !== tabId && state === "shown") {
      setState("hidden");
    }
  }, [activeTabId, tabId, state])

  let classes = classNames(styles.tabPanel, className);

  if (state === "hidden") {
    classes = classNames(classes, styles.tabPanelHidden);
  }

  return (
    <div
      {...props}
      ref={ref}
      id={id}
      role="tabpanel"
      aria-labelledby={tabId}
      className={classes}
    >
      {children}
    </div>
  )
}