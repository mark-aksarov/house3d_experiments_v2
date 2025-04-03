import classNames from "classnames";
import { SheetBody } from "@/uikit/Sheet";
import styles from './BaseSideSheet.module.scss';
import { ComponentPropsWithoutRef } from "react";

export default function BaseSideSheetBody({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const classes = classNames(styles.sideSheetBody, className);

  return (
    <SheetBody
      {...props}
      className={classes}
    >
      {children}
    </SheetBody>
  );
}