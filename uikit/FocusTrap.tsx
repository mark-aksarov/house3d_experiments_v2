"use client"

import { ReactNode, useCallback, useEffect, useRef } from "react";

const nodeSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

export interface FocusTrapProps {
  autoFocus?: boolean,
  restoreFocus?: boolean,
  children?: ReactNode
}

export default function FocusTrap({
  autoFocus = true,
  restoreFocus = true,
  children
}: FocusTrapProps) {
  const previousFocusRef = useRef<HTMLElement | null>();
  const containerRef = useRef<HTMLDivElement>(null);
  const focusableNodesRef = useRef<HTMLElement[]>([]);

  const updateFocusableNodes = useCallback(() => {
    if (!containerRef.current) {
      throw new Error('containerRef.current is null');
    }

    const focusableNodes = containerRef.current.querySelectorAll<HTMLElement>(nodeSelectors);

    focusableNodesRef.current = [];

    focusableNodes.forEach(node => {
      const style = getComputedStyle(node);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        focusableNodesRef.current.push(node);
      }
    })
  }, [])

  //update nodes initially
  useEffect(updateFocusableNodes, []);

  //restore focus
  useEffect(() => {
    if (restoreFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [restoreFocus])

  //auto focus
  useEffect(() => {
    if (autoFocus) {
      if (!focusableNodesRef.current.length) {
        return;
      }

      focusableNodesRef.current[0].focus();
    }
  }, [autoFocus])

  //nodes can changes, so we need to watch for changes
  useEffect(() => {
    const mutationObserver = new MutationObserver(updateFocusableNodes);

    const options = {
      childList: true,
      subtree: true,
      attributes: true
    };

    mutationObserver.observe(containerRef.current!, options);

    return () => {
      mutationObserver.disconnect();
    }
  }, [updateFocusableNodes])

  //handle focus trapping
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (!focusableNodesRef.current.length) {
        return false;
      }

      const firstElement = focusableNodesRef.current[0];
      const lastElement = focusableNodesRef.current.at(-1)!;

      const nodeIndex = focusableNodesRef.current.findIndex(node => node === event.target);
      const lastNodeIndex = focusableNodesRef.current.length - 1;

      if (nodeIndex === -1) {
        if (!event.shiftKey) {
          event.preventDefault();
          firstElement.focus();
        }
        else {
          event.preventDefault();
          lastElement.focus();
        }
      }
      else if (event.shiftKey && nodeIndex === 0) {
        event.preventDefault();
        lastElement.focus();
      }
      else if (!event.shiftKey && nodeIndex === lastNodeIndex) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (restoreFocus) {
        previousFocusRef.current!.focus();
      }
    }
  }, [restoreFocus])

  return (
    <div ref={containerRef} tabIndex={-1}>
      {children}
    </div>
  )
}