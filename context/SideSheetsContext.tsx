import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface SideSheetsContextType {
  openedSheetName?: string,
  openSheet(name: string): void,
  closeSheet(name: string): void
}

export const SideSheetsContext = createContext<SideSheetsContextType | null>(null);

export const SideSheetsProvider = ({
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
    <SideSheetsContext.Provider value={{
      openedSheetName,
      openSheet,
      closeSheet
    }}>
      {children}
    </SideSheetsContext.Provider>
  )
}

export const useOpenedSideSheetName = () => {
  const object = useContext(SideSheetsContext);
  if (!object) { throw new Error("useOpenedSideSheetName must be used within a Provider") }

  const { openedSheetName } = object;
  return openedSheetName;
}

export const useOpenSideSheet = () => {
  const object = useContext(SideSheetsContext);
  if (!object) { throw new Error("useOpenSideSheet must be used within a Provider") }

  const { openSheet } = object;
  return openSheet;
}

export const useCloseSideSheet = () => {
  const object = useContext(SideSheetsContext);
  if (!object) { throw new Error("useCloseSideSheet must be used within a Provider") }

  const { closeSheet } = object;
  return closeSheet;
}