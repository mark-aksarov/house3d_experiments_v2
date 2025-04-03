import useWalls from "@/hooks/useWalls";
import WallsSideSheet from "./WallsSideSheet";
import WallsBottomSheet from "./WallsBottomSheet";

export default function Walls() {
  useWalls();

  return (
    <>
      <WallsSideSheet />
      <WallsBottomSheet />
    </>
  )
}