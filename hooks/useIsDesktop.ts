import useMediaQuery from "./useMediaQuery";

export default function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}