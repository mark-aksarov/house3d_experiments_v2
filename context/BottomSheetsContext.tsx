import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface BottomSheetsContextType {
  openedSheetName?: string,
  openSheet(name: string): void,
  closeSheet(name: string): void
}

export const BottomSheetsContext = createContext<BottomSheetsContextType | null>(null);

export const BottomSheetsProvider = ({
  initialSheetName,
  children
}: {
  initialSheetName?: string,
  children: ReactNode
}) => {
  const [openedSheetName, setOpenedSheetName] = useState(initialSheetName);

  const openSheet = useCallback((name: string) => {
    setOpenedSheetName(name)
  }, [])

  const closeSheet = useCallback((name: string) => {
    if (openedSheetName === name) {
      setOpenedSheetName("");
    }
  }, [openedSheetName])

  return (
    <BottomSheetsContext.Provider value={{
      openedSheetName,
      openSheet,
      closeSheet
    }}>
      {children}
    </BottomSheetsContext.Provider>
  )
}

export const useOpenedBottomSheetName = () => {
  const object = useContext(BottomSheetsContext);
  if (!object) { throw new Error("useOpenedBottomSheetName must be used within a Provider") }

  const { openedSheetName } = object;
  return openedSheetName;
}

export const useOpenBottomSheet = () => {
  const object = useContext(BottomSheetsContext);
  if (!object) { throw new Error("useOpenBottomSheet must be used within a Provider") }

  const { openSheet } = object;
  return openSheet;
}

export const useCloseBottomSheet = () => {
  const object = useContext(BottomSheetsContext);
  if (!object) { throw new Error("useCloseBottomSheet must be used within a Provider") }

  const { closeSheet } = object;
  return closeSheet;
}