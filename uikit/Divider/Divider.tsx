import classNames from "classnames";
import styles from './Divider.module.scss';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
}

export default function Divider({
  className,
  ...props
}: DividerProps) {
  const classes = classNames(styles.divider, className);

  return (
    <hr
      {...props}
      className={classes}
    />
  )
}