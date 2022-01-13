import { DocumentData } from "@firebase/firestore";
import { ExpenseData, InputData } from "../models/interface";
import { QuerySnapshot } from "@firebase/firestore";
import { initAllCategoryData } from "../const/categoryInitData";

export const divideData = (data: InputData[]) => {
  const initPrice = { ...initAllCategoryData };
  const priceDataByCategory = initPrice;
  data.forEach((item) => {
    switch (item.category) {
      case "日用品":
        priceDataByCategory.daily += item.price;
        break;
      case "食費":
        priceDataByCategory.food += item.price;
        break;
      case "交通費":
        priceDataByCategory.traffic += item.price;
        break;
      case "交際費":
        priceDataByCategory.enter += item.price;
        break;
      case "固定費":
        priceDataByCategory.fixed += item.price;
        break;
      case "その他支出":
        priceDataByCategory.otherExpense += item.price;
        break;
      case "給料":
        priceDataByCategory.salary += item.price;
        break;
      case "その他収入":
        priceDataByCategory.otherIncome += item.price;
        break;
    }
    if (item.category === "給料" || item.category === "その他収入") {
      priceDataByCategory.totalIncomePrice += item.price;
    } else {
      priceDataByCategory.totalExpensePrice += item.price;
    }
  });
  priceDataByCategory.totalBalancePrice =
    priceDataByCategory.totalIncomePrice -
    priceDataByCategory.totalExpensePrice;
  return priceDataByCategory;
};

export const calcBalanceData = (
  goalData: DocumentData,
  inputData: ExpenseData
) => {
  const dailyBalance = goalData.daily - inputData.daily;
  const foodBalance = goalData.food - inputData.food;
  const trafficBalance = goalData.traffic - inputData.traffic;
  const enterBalance = goalData.enter - inputData.enter;
  const fixedBalance = goalData.fixed - inputData.fixed;
  const otherBalance = goalData.otherExpense - inputData.otherExpense;

  const balanceData = {
    dailyBalance,
    foodBalance,
    trafficBalance,
    enterBalance,
    fixedBalance,
    otherBalance,
  };

  return balanceData;
};

export const getInputDataSnap = (
  snapShot: QuerySnapshot,
  data: InputData[]
) => {
  snapShot.forEach((doc) => {
    data.push({
      id: doc.id,
      title: doc.data().title,
      category: doc.data().category,
      date: doc.data().date,
      price: doc.data().price,
      memo: doc.data().memo,
      name: doc.data().name,
      files: doc.data().files,
      isExpense: doc.data().isExpense,
      createdAt: doc.data().createdAt,
    });
  });
  return data;
};

export const yearlyAllData = (
  allExpenseData: InputData[]
): { totalData: number[]; totalAvg: number; barLabel: string[] } => {
  let totalData: number[] = [];
  let barLabel: string[] = [];
  for (let i = 1; i <= 12; i++) {
    totalData.push(0);
    barLabel.push(`${i}月`);
  }

  for (let item of allExpenseData) {
    const month = Number(item.date.split("-")[1]);
    totalData[month - 1] = totalData[month - 1] + item.price;
  }

  const nonZeroTotal = totalData.filter((data) => {
    return data !== 0;
  });

  if (nonZeroTotal.length !== 0) {
    const totalExpense = nonZeroTotal.reduce((a, b) => a + b);
    const totalAvg = Math.round(totalExpense / nonZeroTotal.length);

    return {
      totalData,
      totalAvg,
      barLabel,
    };
  }
  return {
    totalData,
    totalAvg: 0,
    barLabel,
  };
};

export const dateFormat = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const date = `${year}-${month}-${day}`;
  return {
    date,
  };
};

export const chartOptions = (avg: number, year: number) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 5,
        left: 15,
        right: 15,
        bottom: 10,
      },
    },
    plugins: {
      title: {
        display: true,
        text: `平均: ${avg}円／月（${year}年）`,
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return {
    options,
  };
};

export const clickLink = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

export const changeMonthAndYear = (year: number, otherMonth: number) => {
  if (otherMonth <= 0) {
    otherMonth = 12;
    year -= 1;
  } else if (otherMonth > 12) {
    otherMonth = 1;
    year += 1;
  }
  return {
    newMonth: otherMonth,
    newYear: year,
  };
};
