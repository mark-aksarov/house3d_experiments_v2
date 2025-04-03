import classNames from 'classnames';
import styles from './Typography.module.scss';
import React, { ElementType, HTMLAttributes } from 'react';

export type TypographyVariant =
  | 'display1'
  | 'display2'
  | 'header1'
  | 'header2'
  | 'header3'
  | 'header4'
  | 'header5'
  | 'header6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'code';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  as?: ElementType,
  className?: string;
}

function Typography({
  variant,
  as: Component = 'span',
  className,
  children,
  ...props
}: TypographyProps) {
  const classes = classNames(styles.typography, styles[variant], className);

  return (
    <Component
      {...props}
      className={classes}
    >
      {children}
    </Component>
  );
};

export default Typography;