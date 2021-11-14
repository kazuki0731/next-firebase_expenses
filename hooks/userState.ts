import { atom } from "recoil";

interface Chart {
  labels: string[];
  datasets:
    | [
        {
          data: number[];
          backgroundColor: string[];
          borderColor?: string[];
          borderWidth: number;
        }
      ]
    | [];
}

export const monthState = atom<number>({
  key: "monthState",
  default: new Date().getMonth() + 1,
});

export const pieChartState = atom<Chart>({
  key: "pieCartState",
  default: {
    labels: [],
    datasets: [],
  },
});

export const barChartState = atom<Chart>({
  key: "barCartState",
  default: {
    labels: [],
    datasets: [],
  },
});
