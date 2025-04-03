import React, { ComponentPropsWithRef, ReactNode } from "react";

interface MenuItemProps extends ComponentPropsWithRef<"li"> {
  children: ReactNode
}

function MenuItem({
  children,
  ref,
  ...props
}: MenuItemProps) {
  return (
    <li
      {...props}
      ref={ref}
      role="menuitem"
    >
      {children}
    </li>
  );
}

export default MenuItem;