import { useRef } from "react";
import RangeInput from "@/uikit/RangeInput";
import { RangeInputProps } from "@/uikit/RangeInput/RangeInput";
import { UndoRedoCallback, useUndo } from "@/context/UndoContext";

interface UndoableRangeInputProps extends Omit<RangeInputProps, "onChange"> {
  onChange: (value: number) => void;
}

export default function UndoableRangeInput({
  value,
  onChange,
  ...props
}: UndoableRangeInputProps) {
  const { addAction } = useUndo();
  const actionUndoRef = useRef<UndoRedoCallback | null>(null);
  const actionRedoRef = useRef<UndoRedoCallback | null>(null);

  function handleChange(newValue: number) {
    onChange(newValue);

    if (!actionUndoRef.current) {
      actionUndoRef.current = () => onChange(value);
    }

    actionRedoRef.current = () => onChange(newValue);
  }

  function handleActionEnd() {
    if (!actionUndoRef.current || !actionRedoRef.current) return;
    addAction(actionUndoRef.current, actionRedoRef.current);
    actionUndoRef.current = null;
    actionRedoRef.current = null;
  }

  return (
    <RangeInput
      {...props}
      value={value}
      onChange={(e) => handleChange(parseFloat(e.target.value))}
      onMouseUp={handleActionEnd}
      onTouchEnd={handleActionEnd}
    />
  )
}