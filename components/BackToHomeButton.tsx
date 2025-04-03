"use client"

import Link from 'next/link';
import Button from "@/uikit/Button";
import { ArrowLeftIcon } from "lucide-react";
import useIsMobileOrTablet from "@/hooks/useIsMobileOrTablet";

export default function BackToHomeButton() {
  const isMobileOrTablet = useIsMobileOrTablet();

  return (
    <Button
      as={Link}
      iconStart={<ArrowLeftIcon />}
      size={isMobileOrTablet ? "regular" : "large"}
      variant="outlined"
      color="success"
      href='/'
    >
      Back to home
    </Button>
  )
}