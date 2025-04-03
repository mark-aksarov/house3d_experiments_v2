import classNames from 'classnames';
import { HTMLAttributes } from "react";
import styles from './Toast.module.scss';

interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> { }

export default function ToastContainer({
  className,
  children
}: ToastContainerProps) {
  const classes = classNames(styles.toastContainer, className);

  return (
    <div className={classes}>
      {children}
    </div>
  )
}