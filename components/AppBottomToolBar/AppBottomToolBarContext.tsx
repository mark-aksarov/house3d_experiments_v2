import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

type AppBottomToolBarContextType = {
  toolBarTab: string;
  setToolBarTab: Dispatch<SetStateAction<string>>
};

export const AppBottomToolBarContext = createContext<AppBottomToolBarContextType | null>(null);

export function AppBottomToolBarProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<string>('');

  const contextValue = useMemo(() => ({
    toolBarTab: tab,
    setToolBarTab: setTab
  }), [tab, setTab]);

  return (
    <AppBottomToolBarContext.Provider value={contextValue}>
      {children}
    </AppBottomToolBarContext.Provider>
  );
}

export function useAppBottomToolBar() {
  const context = useContext(AppBottomToolBarContext);
  if (!context) {
    throw new Error("useAppBottomToolBar must be used within a Provider");
  }

  return context;
}