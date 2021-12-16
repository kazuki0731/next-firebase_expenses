import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const numState = atom<number>({
  key: "num",
  default: 0,
});

export function useFnc() {
  const [num, setNum] = useRecoilState(numState);
  useEffect(() => {
    console.log(num);
  }, []);

  return {
    num,
  };
}
