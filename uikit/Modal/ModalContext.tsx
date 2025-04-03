"use client"

import { createContext, useContext } from 'react';

interface ModalContextProps {
  headingId: string;
  open: boolean;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};