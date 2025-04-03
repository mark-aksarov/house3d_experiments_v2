import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

type AppSideToolBarContextType = {
  selectedValue?: string | number
  setSelectedValue: Dispatch<SetStateAction<string | number>>
};

export const AppSideToolBarContext = createContext<AppSideToolBarContextType | null>(null);

export function AppSideToolBarProvider({ children }: { children: ReactNode }) {
  const [selectedValue, setSelectedValue] = useState<string | number>('');

  const contextValue = useMemo(() => ({
    selectedValue,
    setSelectedValue
  }), [selectedValue, setSelectedValue]);

  return (
    <AppSideToolBarContext.Provider value={contextValue}>
      {children}
    </AppSideToolBarContext.Provider>
  );
}

export function useAppSideToolBar() {
  const context = useContext(AppSideToolBarContext);
  if (!context) {
    throw new Error("useAppSideToolBar must be used within a Provider");
  }

  return context;
}