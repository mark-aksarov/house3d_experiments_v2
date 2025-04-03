import classNames from "classnames";
import styles from './ListGroup.module.scss';
import { ComponentPropsWithoutRef, ReactNode, ElementType } from "react";

type ListGroupProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T,
  children?: ReactNode,
  className?: string,
}

export default function ListGroup<T extends ElementType = "ul">({
  as,
  children,
  className,
  ...props
}: ListGroupProps<T>) {
  const Component = as || "ul";

  const classes = classNames(styles.listGroup, className);

  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  )
}