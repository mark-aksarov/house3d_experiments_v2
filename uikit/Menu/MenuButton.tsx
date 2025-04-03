"use client"

import { useMenuContext } from './MenuContext';
import React, { ComponentPropsWithoutRef } from 'react';

type MenuButtonProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T
}

export default function MenuButton<T extends React.ElementType = "button">({ as, children, ...props }: MenuButtonProps<T>) {
  const {
    interactions: {
      getReferenceProps
    },
    data: {
      refs
    }
  } = useMenuContext();

  const Component = as || 'button';

  return (
    <Component
      {...props}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {children}
    </Component>
  );
}