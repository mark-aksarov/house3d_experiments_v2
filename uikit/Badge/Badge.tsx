import classNames from 'classnames';
import styles from './Badge.module.scss';

type BadgeSize = 'small' | 'regular';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize;
}

export default function Badge({
  size = "regular",
  children,
  ...props
}: BadgeProps) {
  const classes = classNames(styles.badge, styles[size]);

  return (
    <span {...props} className={classes}>
      {children}
    </span>
  )
}