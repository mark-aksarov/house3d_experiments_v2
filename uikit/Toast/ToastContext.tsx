"use client"

import { ToastColor, ToastSize } from './Toast';
import { createContext, useContext } from 'react';

interface ToastContextType {
  size: ToastSize;
  color: ToastColor;
  onClose?: () => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}