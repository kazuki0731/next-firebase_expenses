export interface Props {
  children: React.ReactNode;
}

export interface InputData {
  id: string;
  category: string;
  date: string;
  price: number;
  text: string;
}

export interface AllGoalData {
  daily: number;
  food: number;
  rent: number;
  util: number;
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
  otherExpense: number;
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
