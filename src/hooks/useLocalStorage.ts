import { useEffect, useState } from "react";

type ValueSetter<T> = (value: T | ((currentValue: T) => T)) => void;

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, ValueSetter<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  const setValue: ValueSetter<T> = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
