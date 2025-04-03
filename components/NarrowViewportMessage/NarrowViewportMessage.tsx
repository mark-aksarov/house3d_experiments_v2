import React from 'react';
import styles from './NarrowViewportMessage.module.scss';

export default function NarrowViewportMessage() {
  return (
    <div className={styles.message}>
      App is not supported on a narrow viewport with height of less than 500 pixels.
    </div>
  )
}