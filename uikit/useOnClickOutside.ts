import { useEffect } from "react";

export interface UseOnClickOutsideProps<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  callback: (event: MouseEvent) => void
}

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>({
  ref,
  callback
}: UseOnClickOutsideProps<T>) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, { capture: true });
    }
  }, [ref, callback])
}