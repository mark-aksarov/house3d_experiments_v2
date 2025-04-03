import classNames from "classnames";
import { XIcon } from "lucide-react";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { HTMLAttributes } from "react";
import styles from './Toast.module.scss';
import { useToast } from "./ToastContext";

interface ToastHeaderProps extends HTMLAttributes<HTMLDivElement> { }

export default function ToastHeader({
  children,
  ...props
}: ToastHeaderProps) {
  const {
    size: toastSize,
    color: toastColor,
    onClose: onToastClose
  } = useToast();

  const getCloseButtonVariant = () => {
    if (toastColor === 'default') {
      return 'ghost';
    }
    return "solid";
  }

  const getCloseButtonColor = () => {
    if (toastColor === 'default') {
      return 'brand';
    }
    else if (toastColor === 'danger') {
      return 'danger';
    }
    return 'success';
  }

  const closeButtonClasses = classNames(styles.toastCloseButton, styles[toastSize]);

  return (
    <div {...props} className={styles.toastHeader}>
      <Typography className={styles.toastTitle} variant={toastSize === 'regular' ? "header4" : "header5"}>
        {children}
      </Typography>

      <IconButton
        className={closeButtonClasses}
        size={toastSize}
        variant={getCloseButtonVariant()}
        color={getCloseButtonColor()}
        onClick={onToastClose}
        icon={<XIcon />}
        aria-label="Close"
      />
    </div>
  )
}