import { visibilityState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export function useVisibility() {
  const [visibility, setVisibility] = useRecoilState(visibilityState);

  useEffect(() => {
    setVisibility(false);
    return () => setVisibility(true);
  }, [setVisibility]);

  return visibility;
}
