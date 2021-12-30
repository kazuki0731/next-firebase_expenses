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
  name: string;
  files?: File[];
}

export interface AllGoalData {
  daily: number;
  food: number;
  traffic: number;
  enter: number;
  fixed: number;
  otherExpense: number;
  salary: number;
  otherIncome: number;
  [key: string]: number;
}

export interface ExpenseData {
  daily: number;
  food: number;
  traffic: number;
  enter: number;
  fixed: number;
  otherExpense: number;
  // totalPrice?: number;
  [key: string]: number;
}

export interface IncomeData {
  salary: number;
  otherIncome: number;
}

export interface GroupUserData {
  id: string;
  name: string;
}

export interface BalanceDetail {
  dailyBalance: number;
  foodBalance: number;
  trafficBalance: number;
  enterBalance: number;
  fixedBalance: number;
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
