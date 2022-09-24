import { useMemo, useCallback } from "react";

export default function useLocalStorage() {
  const LOCAL_STORAGE = useMemo(() => window.localStorage, []);

  const get = useCallback(
    (key: string) => {
      const item = LOCAL_STORAGE.getItem(key);

      if (!item) {
        throw new Error(`There is no item match with ${key}`);
      }

      return JSON.parse(item);
    },
    [LOCAL_STORAGE]
  );

  const set = useCallback(
    (key: string, value: unknown) => {
      try {
        LOCAL_STORAGE.setItem(key, JSON.stringify(value));
      } catch (err: any) {
        throw new Error(err);
      }
    },
    [LOCAL_STORAGE]
  );

  return [get, set];
}
