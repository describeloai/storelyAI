import React, { useRef, useEffect } from 'react';

export function useMessageRefs(length: number) {
  const refs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    refs.current = Array(length)
      .fill(null)
      .map((_, i) => refs.current[i] || React.createRef<HTMLDivElement>());
  }, [length]);

  return refs.current;
}
