import { ReactNode } from "react";
import styles from './Modal.module.scss';

export default function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className={styles.modalFooter}>
      {children}
    </div>
  );
}