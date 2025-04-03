import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMatches(true);
      } else {
        setMatches(false);
      }
    }

    if (mql.matches) {
      setMatches(true);
    }

    mql.onchange = handleChange;

    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}