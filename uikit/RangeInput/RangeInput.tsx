"use client"

import Stack from '../Stack';
import classNames from 'classnames';
import Typography from '../Typography';
import styles from './RangeInput.module.scss';
import { InputHTMLAttributes, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export type RangeInputSize = 'large' | 'regular' | 'small';

export interface RangeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: RangeInputSize;
  value: number;
  min?: number;
  max?: number;
}

export default function RangeInput({
  size = 'regular',
  value,
  min = 0,
  max = 100,
  disabled,
  className,
  ...props
}: RangeInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  const updateValueElement = useCallback(() => {
    if (!ref.current || !valueRef.current) {
      return;
    }

    const valueNumber = +value;
    const minNumber = +min;
    const maxNumber = +max;

    const inputEl = ref.current;
    const valueEl = valueRef.current;

    const thumbWidth = size === 'large' ? 20 : size === 'regular' ? 18 : 16;
    const availableWidth = inputEl.clientWidth - thumbWidth;
    const percentage = (valueNumber - minNumber) / (maxNumber - minNumber);
    const offsetLeft = inputEl.offsetLeft + thumbWidth / 2 - valueEl.clientWidth / 2;

    if (valueNumber === minNumber) {
      valueEl.style.left = `${offsetLeft}px`;
    } else {
      const leftPosition = offsetLeft + availableWidth * percentage;
      valueEl.style.left = `${leftPosition}px`;
    }
  }, [value, min, max])

  useLayoutEffect(() => {
    updateValueElement();
  }, [updateValueElement])

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      updateValueElement();
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [updateValueElement]);

  const typographyVariant = size === 'large' ? 'body2' : size === 'regular' ? 'body3' : 'body4';

  const containerClasses = classNames(
    styles.rangeInputContainer,
    styles[size],
    {
      [styles.disabled]: disabled
    }
  );
  const classes = classNames(styles.rangeInput, className);

  return (
    <div data-testid="range-input-container" className={containerClasses}>
      <Stack spacing={5} wrap="nowrap" alignItems="center">
        <div ref={valueRef} className={styles.valueWrapper}>
          <Typography variant={typographyVariant} className={styles.value}>
            {value}
          </Typography>
        </div>
        <Typography variant={typographyVariant} className={styles.min}>
          {min}
        </Typography>
        <Typography variant={typographyVariant} className={styles.max}>
          {max}
        </Typography>
        <input
          ref={ref}
          {...props}
          type="range"
          value={value}
          min={min}
          max={max}
          disabled={disabled}
          className={classes}
        />
      </Stack>
    </div>
  )
}