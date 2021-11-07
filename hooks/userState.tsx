import { atom } from "recoil";

export const monthState = atom({
  key: "monthState",
  default: new Date().getMonth() + 1,
});
