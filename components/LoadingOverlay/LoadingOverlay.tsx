import React from "react";
import Spinner from "../Spinner";
import styles from './LoadingOverlay.module.scss';

const LoadingOverlay = () => {
  return (
    <div
      className={styles.loadingOverlay}
      data-testid="loading-overlay"
    >
      <Spinner />
    </div>
  )
}

export default LoadingOverlay;