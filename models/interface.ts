import { FieldError } from "react-hook-form";

export interface Children {
  children: React.ReactNode;
}

export interface SubmitFormData {
  price: number;
  title: string;
  category: string;
  memo: string;
  date: Date;
  files?: File[];
}

export interface InputData {
  id: string;
  category: string;
  title: string;
  date: string;
  price: number;
  memo: string;
  name: string;
  isExpense: boolean;
  files?: File[];
}

export interface AllCategoryData {
  daily: number;
  food: number;
  traffic: number;
  enter: number;
  fixed: number;
  otherExpense: number;
  salary: number;
  otherIncome: number;
  totalExpensePrice: number;
  totalIncomePrice: number;
  totalBalancePrice: number;
}

export interface ExpenseData {
  daily: number;
  food: number;
  traffic: number;
  enter: number;
  fixed: number;
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

export interface BalanceChart {
  expense: Chart;
  income: Chart;
}

export interface Filter {
  category: string;
  number: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  email: string;
  password: string;
  name: string;
}

export interface Errors {
  price?: FieldError | undefined;
  title?: FieldError | undefined;
  category?: FieldError | undefined;
  memo?: FieldError | undefined;
  date?: FieldError | undefined;
}
