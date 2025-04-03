import styles from './AboutSheet.module.scss';
import SideSheet from "@/uikit/SideSheet/SideSheet";
import { SheetBody, SheetHeader } from "@/uikit/Sheet";
import AboutContent from '../AboutContent/AboutContent';

interface AboutSheetProps {
  open: boolean,
  onClose: () => void
}

export default function AboutSheet({
  open,
  onClose
}: AboutSheetProps) {
  return (
    <SideSheet
      open={open}
      onClose={onClose}
      className={styles.aboutSheet}
      transitionClassNames={{
        appear: styles.aboutSheetAppear,
        appearActive: styles.aboutSheetAppearActive,
        enter: styles.aboutSheetEnter,
        enterActive: styles.aboutSheetEnterActive,
        exit: styles.aboutSheetExit,
        exitActive: styles.aboutSheetExitActive
      }}
    >
      <SheetHeader
        titleVariant="display2"
        closeButtonSize="large"
        className={styles.aboutSheetHeader}
      >
        About
      </SheetHeader>
      <SheetBody className={styles.aboutSheetBody}>
        <AboutContent />
      </SheetBody>
    </SideSheet>
  )
}