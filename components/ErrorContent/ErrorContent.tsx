import Stack from '@/uikit/Stack';
import AppHeader from '@/components/AppHeader';
import styles from './ErrorContent.module.scss';

interface ErrorContentProps {
  title: string;
  subTitle: string;
  message: string;
  children: React.ReactNode;
}

export default function ErrorContent({
  title,
  subTitle,
  message,
  children
}: ErrorContentProps) {
  return (
    <div className={styles.notFound}>
      <AppHeader />

      <Stack
        direction="vertical"
        spacing={5}
        alignItems="center"
      >
        <h1 className={styles.title}>
          {title}
        </h1>

        <h3 className={styles.subTitle}>
          {subTitle}
        </h3>

        <p className={styles.message}>
          {message}
        </p>

        {children}
      </Stack>
    </div >
  )
}