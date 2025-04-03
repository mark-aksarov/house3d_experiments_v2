import useMediaQuery from "./useMediaQuery";

export default function useIsLaptop() {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}