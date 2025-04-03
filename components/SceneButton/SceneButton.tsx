import classNames from 'classnames';
import styles from './SceneButton.module.scss';
import IconButton, { IconButtonProps } from "@/uikit/IconButton";

interface SceneButtonProps extends Omit<IconButtonProps, "variant"> { }

export default function SceneButton({
  color = "neutral",
  size = "regular",
  icon,
  className,
  ...props
}: SceneButtonProps) {
  const classes = classNames(styles.sceneButton, className);

  return (
    <IconButton
      {...props}
      variant="solid"
      color={color}
      size={size}
      icon={icon}
      className={classes}
    />
  )
}