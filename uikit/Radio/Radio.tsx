"use client"

import classNames from 'classnames';
import styles from './Radio.module.scss';
import { InputHTMLAttributes } from 'react';
import { useRadioGroup } from './RadioGroupContext';

export type RadioSize = 'large' | 'regular' | 'small';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  value: string | number;
  label: string;
  size?: RadioSize;
}

export default function Radio({
  id,
  value,
  label,
  size = "regular",
  disabled,
  ...props
}: RadioProps) {
  const { value: selectedValue, name, onChange } = useRadioGroup();
  const containerClasses = classNames(
    styles.radioContainer,
    styles[size],
    {
      [styles.disabled]: disabled
    }
  );

  return (
    <div data-testid="radio-container" className={containerClasses}>
      <input
        {...props}
        id={id}
        type="radio"
        className={styles.radio}
        checked={value === selectedValue}
        name={name}
        disabled={disabled}
        onChange={() => onChange(value)}
      />
      <label htmlFor={id} className={styles.radioLabel}>
        {label}
      </label>
    </div>
  )
}