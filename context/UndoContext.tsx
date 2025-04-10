"use client"

import { createContext, useContext, ReactNode } from 'react';
import { useImmer } from 'use-immer';

export type UndoRedoCallback = () => void;

type UndoContextType = {
  addAction: (undo: UndoRedoCallback, redo: UndoRedoCallback) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const UndoContext = createContext<UndoContextType | null>(null);

export function UndoProvider({ children }: { children: ReactNode }) {
  const [undoStack, setUndoStack] = useImmer<{ undo: UndoRedoCallback; redo: UndoRedoCallback }[]>([]);
  const [redoStack, setRedoStack] = useImmer<{ undo: UndoRedoCallback; redo: UndoRedoCallback }[]>([]);

  const addAction = (undo: UndoRedoCallback, redo: UndoRedoCallback) => {
    setUndoStack((draft) => {
      draft.push({ undo, redo });
    });
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;

    const lastAction = undoStack[undoStack.length - 1];

    lastAction.undo();

    setRedoStack((draft) => {
      draft.push(lastAction);
    });

    setUndoStack((draft) => {
      draft.pop();
    });
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const lastAction = redoStack[redoStack.length - 1];

    lastAction.redo();

    setUndoStack((draft) => {
      draft.push(lastAction);
    });

    setRedoStack((draft) => {
      draft.pop();
    });
  };

  return (
    <UndoContext.Provider
      value={{
        addAction,
        undo,
        redo,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
      }}
    >
      {children}
    </UndoContext.Provider>
  );
}

export const useUndo = () => {
  const context = useContext(UndoContext);
  if (!context) throw new Error('useUndo must be used within an UndoProvider');
  return context;
};