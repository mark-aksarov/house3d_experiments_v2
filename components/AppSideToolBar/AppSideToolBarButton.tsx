import classNames from 'classnames';
import IconButton from '@/uikit/IconButton';
import styles from './AppSideToolBar.module.scss';
import React, { ButtonHTMLAttributes, ElementType, forwardRef, ReactElement } from 'react';

interface AppSideToolBarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType,
  href?: string | undefined;
  target?: string | undefined;
  icon: ReactElement
}

const AppSideToolBarButton = forwardRef<HTMLButtonElement, AppSideToolBarButtonProps>(function ({
  icon,
  className,
  ...props
}, ref) {
  const classes = classNames(styles.sideToolBarButton, className);

  return (
    <IconButton
      {...props}
      ref={ref}
      size="large"
      variant='ghost'
      color='neutral'
      className={classes}
      icon={icon}
    />
  )
});

export default AppSideToolBarButton;