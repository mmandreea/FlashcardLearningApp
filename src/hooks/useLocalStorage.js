import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storageError, setStorageError] = useState(null);

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      setStorageError('Could not read saved data from local storage.');
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      setStorageError(null);
    } catch (error) {
      setStorageError('Could not save changes to local storage.');
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue, storageError];
}