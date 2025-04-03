"use client"

import classNames from 'classnames';
import { CheckIcon } from 'lucide-react';
import styles from './Checkbox.module.scss';
import { InputHTMLAttributes } from 'react';

export type CheckboxSize = 'large' | 'regular' | 'small';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  size?: CheckboxSize,
  label: string
}

export default function Checkbox({
  id,
  checked,
  disabled,
  onChange,
  size = "regular",
  label,
  ...props
}: CheckboxProps) {
  const containerClasses = classNames(
    styles.checkboxContainer,
    styles[size],
    {
      [styles.disabled]: disabled
    }
  );

  return (
    <div className={containerClasses}>
      <div className={styles.checkbox}>
        {checked &&
          <CheckIcon
            data-testid="checkmark"
            className={styles.checkmark}
            size={size === "large" ? 22 : size === "regular" ? 20 : 18}
          />
        }
        <input
          {...props}
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  )
}