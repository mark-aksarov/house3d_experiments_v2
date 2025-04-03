import classNames from "classnames";
import styles from './Modal.module.scss';

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function ModalBody({
  className,
  children,
  ...props
}: ModalBodyProps) {
  const classes = classNames(styles.modalBody, className);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}