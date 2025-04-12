import Tooltip from "@/uikit/Tooltip";
import { Object3D, Vector3 } from "three";
import MarkerButton from "@/uikit/MarkerButton";
import { useThree } from "@/context/ThreeContext";
import { useCallback, useEffect, useState } from "react";

interface MarkersProps {
  isFirstModelRenderingComplete: boolean
}

const positions: Record<string, Vector3> = {
  roof: new Vector3(0, 10, 0),
}

export default function Markers({ isFirstModelRenderingComplete }: MarkersProps) {
  const { getScene, getCamera, getRenderer } = useThree();
  const [nearestPositions, setNearestPositions] = useState<{ x: number; y: number }[] | null>(null);
  const [show, setShow] = useState(true);

  const updateNearestPosition = useCallback(() => {
    const getScreenPosition = (position: Vector3) => {
      const vector = position.clone();
      vector.project(getCamera());

      const canvas = getRenderer().domElement;
      const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
      const y = (1 - (vector.y * 0.5 + 0.5)) * canvas.clientHeight;

      return { x, y };
    };

    const nearestPositions = [
      getScreenPosition(positions.roof),
    ];

    setNearestPositions(nearestPositions);
  }, [getScene, getCamera]);

  useEffect(() => {
    if (isFirstModelRenderingComplete) {
      updateNearestPosition();
    }
  }, [updateNearestPosition, isFirstModelRenderingComplete]);

  useEffect(() => {
    let isPointerDown = false;
    let hasMoved = false;

    const handlePointerDown = () => {
      isPointerDown = true;
      hasMoved = false;
    };

    const handlePointerMove = () => {
      if (isPointerDown && !hasMoved) {
        hasMoved = true;
        setShow(false);
      }
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      if (hasMoved) {
        updateNearestPosition();
        setShow(true);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [updateNearestPosition]);

  return (
    <>
      {show &&
        nearestPositions?.map((position, index) => {
          return (
            <Tooltip key={index} title="Window">
              <MarkerButton
                color="neutral"
                style={{
                  position: "absolute",
                  left: `${position?.x}px`,
                  top: `${position?.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Tooltip>
          );
        })}
    </>
  );
}