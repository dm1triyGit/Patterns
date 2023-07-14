import { useEffect, useState } from 'react';

interface HookProps<T> {
  value: T;
  delay: number;
}

export const useDebounce = <T>({ value, delay }: HookProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
