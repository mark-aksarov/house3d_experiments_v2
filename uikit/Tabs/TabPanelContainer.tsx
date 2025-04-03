"use client"

import { useRef } from 'react';
import styles from './Tabs.module.scss';
import { TabPanelContainerContext } from './TabPanelContainerContext';

export default function TabPanelContainer({
  children
}: {
  children: React.ReactNode
}) {
  const ref = useRef(null);

  return (
    <div ref={ref} className={styles.tabPanelContainer}>
      <TabPanelContainerContext.Provider value={ref}>
        {children}
      </TabPanelContainerContext.Provider>
    </div>
  )
}