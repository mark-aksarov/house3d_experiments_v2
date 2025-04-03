import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './BaseSideSheet.module.scss';
import SideSheet, { SideSheetProps } from "@/uikit/SideSheet/SideSheet";

interface BaseSideSheetProps extends SideSheetProps { }

export default function BaseSideSheet({
  className,
  children,
  ...props
}: BaseSideSheetProps) {
  const classes = classNames(styles.sideSheet, className);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <SideSheet
      {...props}
      className={classes}
    >
      {children}
    </SideSheet>
  )
}