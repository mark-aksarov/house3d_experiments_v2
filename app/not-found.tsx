import ErrorContent from '@/components/ErrorContent';
import BackToHomeButton from '@/components/BackToHomeButton';

export default function NotFound() {
  return (
    <ErrorContent
      title="404"
      subTitle="Page Not Found"
      message="Sorry, the page you're looking for doesn't exist."
      children={<BackToHomeButton />}
    />
  )
}