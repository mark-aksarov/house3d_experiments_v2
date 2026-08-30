'use client'

import Button from 'uikit/Button';
import { RefreshCcwIcon } from 'lucide-react';
import ErrorContent from 'components/ErrorContent';
import useIsMobileOrTablet from 'hooks/useIsMobileOrTablet';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isMobileOrTablet = useIsMobileOrTablet();

  return (
    <ErrorContent
      title="500"
      subTitle="Internal Server Error"
      message={error.message}
    >
      <Button
        iconStart={<RefreshCcwIcon />}
        size={isMobileOrTablet ? "regular" : "large"}
        variant="outlined"
        color="success"
        onClick={() => reset()}
      >
        Reload
      </Button>
    </ErrorContent>
  )
}