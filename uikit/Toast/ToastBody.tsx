import { HTMLAttributes } from "react";
import styles from './Toast.module.scss';

interface ToastBodyProps extends HTMLAttributes<HTMLDivElement> { }

export default function ToastBody({
  children,
  ...props
}: ToastBodyProps) {
  return (
    <div {...props} className={styles.toastBody}>
      {children}
    </div>
  )
}