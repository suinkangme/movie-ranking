/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";

export const useDebounceEffect = (func: any, delay: any, deps: any) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(func, deps);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        callback();
      }, delay);
  
      return () => {
        clearTimeout(timer);
      };
    }, [callback, delay]);
  };