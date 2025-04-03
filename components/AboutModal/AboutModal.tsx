import AboutContent from "../AboutContent";
import styles from './AboutModal.module.scss';
import Modal, { ModalBody, ModalHeader } from "@/uikit/Modal";

interface AboutModalProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
}

export default function AboutModal({
  open,
  onOpenChange
}: AboutModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} fullscreen>
      <ModalHeader
        titleVariant="header2"
        className={styles.aboutModalHeader}
      >
        About
      </ModalHeader>
      <ModalBody className={styles.aboutModalBody}>
        <AboutContent />
      </ModalBody>
    </Modal>
  )
}