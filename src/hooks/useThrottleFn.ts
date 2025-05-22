import { useCallback, useRef } from "react";

export function useThrottleFn<T extends (...args: unknown[]) => void>(callback: T, delay: number) {
  const lastCall = useRef(0);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}
