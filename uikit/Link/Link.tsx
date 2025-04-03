import classNames from "classnames";
import styles from './Link.module.scss';
import { ComponentPropsWithRef } from "react";

export type LinkSize = "regular" | "small";

type LinkProps<T extends React.ElementType> = ComponentPropsWithRef<T> & {
  as?: T,
  href: string;
  size: LinkSize;
}

export default function Link<T extends React.ElementType>({
  as,
  size = "regular",
  className,
  children,
  ...props
}: LinkProps<T>) {
  const classes = classNames(styles.link, className, styles[size]);

  const Component = as || "a";

  return (
    <Component
      {...props}
      className={classes}
    >
      {children}
    </Component>
  )
}