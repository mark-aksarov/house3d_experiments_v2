import useRoof from "@/hooks/useRoof";
import RoofSideSheet from "./RoofSideSheet";
import RoofBottomSheet from "./RoofBottomSheet";

export default function Roof() {
  useRoof();

  return (
    <>
      <RoofSideSheet />
      <RoofBottomSheet />
    </>
  )
}