import useMediaQuery from "./useMediaQuery";

export default function useIsTablet() {
  return useMediaQuery("(min-width: 480px) and (max-width: 767px)");
}