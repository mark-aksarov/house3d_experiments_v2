"use client"

import classNames from "classnames";
import { PlusIcon } from "lucide-react";
import styles from "./SpeedDial.module.scss";
import IconButton, { IconButtonProps } from "@/uikit/IconButton";
import React, { Children, ComponentPropsWithRef, useState } from "react";

export interface SpeedDialProps extends ComponentPropsWithRef<"div"> {
  fabProps?: Partial<IconButtonProps>
}

export default function SpeedDial({
  ref,
  children,
  className,
  fabProps: {
    as: fabAs,
    icon: fabIcon = <PlusIcon />,
    rounded: fabRounded = true,
    size: fabSize = "small",
    variant: fabVariant = "solid",
    color: fabColor = "brand",
    className: fabClassName,
    ...fabProps
  } = {},
  ...props
}: SpeedDialProps) {
  const [open, setOpen] = useState(false);

  const classes = classNames(styles.speedDial, className);
  const fabClasses = classNames(styles.fab, fabClassName, { [styles.open]: open });
  const actionsContainerClasses = classNames(styles.actionsContainer, { [styles.open]: open });

  const Component = fabAs || IconButton;

  return (
    <div ref={ref} {...props} className={classes}>
      <Component
        {...fabProps}
        className={fabClasses}
        icon={fabIcon}
        rounded={fabRounded}
        size={fabSize}
        color={fabColor}
        variant={fabVariant}
        onClick={() => setOpen(!open)}
      />

      <div data-testid="actions-container" className={actionsContainerClasses}>
        {
          Children.map(children, (child) =>
            <div className={styles.action}>
              {
                React.isValidElement(child)
                  ? <div className={styles.action}>
                    {React.cloneElement(child)}
                  </div>
                  : null
              }
            </div>
          )
        }
      </div>
    </div>
  )
}