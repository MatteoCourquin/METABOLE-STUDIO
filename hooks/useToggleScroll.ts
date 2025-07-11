import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useCallback, useState, useEffect } from 'react';

let globalIsLocked = false;
const listeners: Set<(isLocked: boolean) => void> = new Set();

const notifyListeners = (isLocked: boolean) => {
  listeners.forEach((listener) => listener(isLocked));
};

const setElementStyles = (element: HTMLElement, styles: Partial<CSSStyleDeclaration>) => {
  Object.assign(element.style, styles);
};

const scrollLockStyles = {
  overflow: 'hidden',
  height: '100vh',
  touchAction: 'none',
};

const bodyLockStyles = {
  ...scrollLockStyles,
  position: 'fixed',
  width: '100%',
  top: '0',
  left: '0',
};

const defaultStyles = {
  overflow: '',
  height: '',
  touchAction: '',
  position: '',
  width: '',
  top: '',
  left: '',
};

export const useScrollLock = () => {
  const [isLocked, setIsLocked] = useState(globalIsLocked);

  useEffect(() => {
    const listener = (locked: boolean) => {
      setIsLocked(locked);
    };

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const lockScroll = useCallback((shouldLock: boolean) => {
    if (shouldLock) {
      setElementStyles(document.documentElement, scrollLockStyles);
      setElementStyles(document.body, bodyLockStyles);
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    } else {
      setElementStyles(document.documentElement, defaultStyles);
      setElementStyles(document.body, defaultStyles);
    }

    globalIsLocked = shouldLock;
    notifyListeners(shouldLock);
  }, []);

  return { isLocked, lockScroll };
};
