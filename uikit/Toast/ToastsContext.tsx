"use client"

import ToastBody from './ToastBody';
import ToastText from './ToastText';
import ToastHeader from './ToastHeader';
import { useImmerReducer } from 'use-immer';
import ToastContainer from './ToastContainer';
import Toast, { ToastColor, ToastSize, toastTransitionDuration } from './Toast';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from 'react';

export interface Toast {
  id: string;
  title: string,
  message: ReactNode | string;
  color?: ToastColor;
  size?: ToastSize;
  open: boolean;
};

export interface ToastsContextType {
  addToast: (toast: Omit<Toast, "open">) => void;
  closeToast: (id: string) => void;
}

export const ToastsContext = createContext<ToastsContextType | null>(null);

type ToastAction =
  { type: 'Added', toast: Toast } |
  { type: 'Closed', id: string } |
  { type: 'Deleted', id: string };

function toastReducer(draft: Toast[], action: ToastAction) {
  switch (action.type) {
    case 'Added': {
      draft.push(action.toast);
      break;
    }
    case 'Closed': {
      const toast = draft.find((t) => t.id === action.id);
      if (toast) {
        toast.open = false;
      }
      break;
    }
    case 'Deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

export interface ToastsProviderProps {
  autoCloseDuration?: number;
  children: React.ReactNode;
  containerClassName?: string
}

export function ToastsProvider({
  autoCloseDuration = 5000,
  children,
  containerClassName
}: ToastsProviderProps) {
  const [toasts, dispatch] = useImmerReducer(toastReducer, [] as Toast[]);
  const closingToastRef = useRef<Toast | null>(null);

  const closeToast = useCallback((id: string) => {
    dispatch({ type: 'Closed', id });

    setTimeout(() => {
      dispatch({ type: 'Deleted', id });
    }, toastTransitionDuration);
  }, [])

  useEffect(() => {
    if (toasts && toasts.length && toasts[0].open && closingToastRef.current !== toasts[0]) {
      closingToastRef.current = toasts[0];

      setTimeout(() => {
        closeToast(toasts[0].id);
      }, autoCloseDuration)
    }
  }, [toasts, closeToast, autoCloseDuration])

  const addToast = useCallback(({
    id,
    title,
    message,
    color = "default",
    size = "regular"
  }: Omit<Toast, "open">) => {
    const toast = {
      id,
      title,
      message,
      color,
      size,
      open: true
    }
    dispatch({ type: 'Added', toast });
  }, []);

  return (
    <ToastsContext.Provider value={{ addToast, closeToast }}>
      <ToastContainer className={containerClassName}>
        {
          toasts && toasts.map(toast =>
            <Toast
              key={toast.id}
              open={toast.open}
              onClose={() => closeToast(toast.id)}
              color={toast.color}
              size={toast.size}
            >
              <ToastHeader>
                {toast.title}
              </ToastHeader>
              <ToastBody>
                {
                  typeof toast.message === "string"
                    ? <ToastText>{toast.message}</ToastText>
                    : toast.message
                }
              </ToastBody>
            </Toast>
          )}
      </ToastContainer>
      {children}
    </ToastsContext.Provider>
  );
};

export function useToasts(): ToastsContextType {
  const context = useContext(ToastsContext);
  if (!context) {
    throw new Error('useToasts must be used within a ToastsProvider');
  }
  return context;
};