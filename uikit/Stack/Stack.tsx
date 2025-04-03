import classNames from "classnames";
import styles from './Stack.module.scss';
import { ResponsiveValue } from "../types";
import createResponsiveClasses from "../createResponsiveClasses";
import React, { ComponentPropsWithoutRef, ElementType } from "react";

export type Wrap = "wrap" | "nowrap";
export type Direction = "horizontal" | "vertical";
export type JustifyContent = "start" | "end" | "space-between" | "space-around" | "center";
export type AlignItems = "flex-start" | "flex-end" | "center" | "stretch";
export type Spacing = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type StackProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T,
  wrap?: ResponsiveValue<Wrap>,
  direction?: ResponsiveValue<Direction>,
  justifyContent?: ResponsiveValue<JustifyContent>,
  alignItems?: ResponsiveValue<AlignItems>,
  spacing?: ResponsiveValue<Spacing>,
}

export default function Stack<T extends ElementType = "div">({
  as,
  wrap = "wrap",
  direction = "horizontal",
  justifyContent = "start",
  alignItems = "flex-start",
  spacing,
  className,
  children,
  ...props
}: StackProps<T>) {
  const Component = as || 'div';

  let responsiveClasses: string[] = [];

  if (wrap) {
    responsiveClasses.push(...createResponsiveClasses("wrap", wrap));
  }
  if (direction) {
    responsiveClasses.push(...createResponsiveClasses("direction", direction));
  }
  if (justifyContent) {
    responsiveClasses.push(...createResponsiveClasses("justifyContent", justifyContent));
  }
  if (alignItems) {
    responsiveClasses.push(...createResponsiveClasses("alignItems", alignItems));
  }
  if (spacing) {
    responsiveClasses.push(...createResponsiveClasses("spacing", spacing));
  }

  const classes = classNames(
    className,
    styles.stack,
    ...responsiveClasses.map(c => styles[c]),
  );

  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  )
}