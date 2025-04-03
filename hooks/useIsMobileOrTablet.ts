import useMediaQuery from "./useMediaQuery";

export default function useIsMobileOrTablet() {
  return useMediaQuery("(max-width: 767px)");
}