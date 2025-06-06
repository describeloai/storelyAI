'use client';

import { useState, useEffect } from 'react';

export function useIsEmbedded(): boolean {
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsEmbedded(window.top !== window.self);
    }
  }, []);

  return isEmbedded;
}
