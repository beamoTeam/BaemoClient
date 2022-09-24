import { useCallback } from "react";

export default function useLocalStorage() {
  // const LOCAL_STORAGE = useMemo(() => window.localStorage, []);

  const get = useCallback((key: string) => {
    const item = window.localStorage.getItem(key);

    if (!item) {
      throw new Error(`There is no item match with ${key}`);
    }

    return JSON.parse(item);
  }, []);

  const set = useCallback((key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err: any) {
      throw new Error(err);
    }
  }, []);

  return [get, set];
}
