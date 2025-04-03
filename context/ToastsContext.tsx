"use client"

import { ToastsProviderProps } from '@/uikit/Toast/ToastsContext';
import { ToastsProvider as BaseToastsProvider, ToastsContext } from '@/uikit/Toast';
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';

interface ShowToastsContext {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ShowToastsContext = createContext<ShowToastsContext | null>(null);

export function ToastsProvider({
  autoCloseDuration = 5000,
  children,
  containerClassName
}: ToastsProviderProps) {
  const [show, setShow] = useState(true);

  return (
    <ShowToastsContext.Provider value={{ show, setShow }}>
      <BaseToastsProvider
        autoCloseDuration={autoCloseDuration}
        containerClassName={containerClassName}
      >
        {children}
      </BaseToastsProvider>
    </ShowToastsContext.Provider>
  )
}

export function useToasts() {
  const showToastContext = useContext(ShowToastsContext);
  if (!showToastContext) {
    throw new Error('useToasts must be used within a ShowToastsContext.Provider');
  }

  const toastsContext = useContext(ToastsContext);
  if (!toastsContext) {
    throw new Error('useToasts must be used within a ToastsProvider');
  }

  const { show: showToasts, setShow: setShowToasts } = showToastContext;
  const { addToast: addToastBase, closeToast: closeToastBase } = toastsContext;

  const addToast = useCallback((...params: Parameters<typeof addToastBase>) => {
    if (showToasts) {
      addToastBase(...params);
    }
  }, [showToasts, addToastBase])

  const closeToast = useCallback((...params: Parameters<typeof closeToastBase>) => {
    if (showToasts) {
      toastsContext.closeToast(...params);
    }
  }, [showToasts, closeToastBase])

  return useMemo(() => ({
    addToast,
    closeToast,
    showToasts,
    setShowToasts
  }), [addToast, closeToast])
}