export interface Children {
  children: React.ReactNode;
}

export interface InputData {
  id: string;
  category: string;
  title: string;
  date: string;
  price: number;
  memo: string;
  files?: File[];
}

export interface AllGoalData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  traffic: number;
  enter: number;
  tax: number;
  otherExpense: number;
  salary: number;
  otherIncome: number;
  [key: string]: number;
}

export interface ExpenseData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  traffic: number;
  enter: number;
  tax: number;
  otherExpense: number;
  // totalPrice?: number;
  [key: string]: number;
}

export interface IncomeData {
  salary: number;
  otherIncome: number;
}

export interface BalanceDetail {
  dailyBalance: number;
  foodBalance: number;
  rentBalance: number;
  utilBalance: number;
  trafficBalance: number;
  enterBalance: number;
  taxBalance: number;
  otherBalance: number;
}

export interface Chart {
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
