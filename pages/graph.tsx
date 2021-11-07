import Head from "next/head";
import { NextPage } from "next";
import TitleText from "../components/titleText";
import Container from "../components/container";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoIosBasket } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { BsFillLightbulbFill } from "react-icons/bs";
import { RiPsychotherapyFill } from "react-icons/ri";
import { Button } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  Box,
  HStack,
  VStack,
  List,
  ListIcon,
  ListItem,
  Text,
  Divider,
} from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../src/firebase";
import ExpenseForm from "../components/expenseForm";
import IncomeForm from "../components/incomeForm";
import BalancePrice from "../components/balancePrice";
import { useRecoilState } from "recoil";
import { monthState } from "../hooks/userState";
import MonthButton from "../components/monthButton";
import { AuthContext } from "../hooks/authProvider";

interface FormData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  otherExpense: number;
  salary: number;
  otherIncome: number;
  [key: string]: number;
}

interface ExpenseData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  otherExpense: number;
  [key: string]: number;
}

interface IncomeData {
  salary: number;
  otherIncome: number;
  [key: string]: number;
}

interface ExpenseDetailData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  otherExpense: number;
  totalPrice: number;
}

interface AllData {
  id: string;
  category: string;
  date: Date;
  price: number;
  text: string;
}

interface BalanceDetail {
  dailyBalance: number;
  foodBalance: number;
  rentBalance: number;
  utilBalance: number;
  otherBalance: number;
}

const Expense: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { currentUser } = useContext<any>(AuthContext);

  const [nowMonth, setNowMonth] = useRecoilState(monthState);
  // 目標金額の合計（num）
  const [goalExpenses, setGoalExpenses] = useState(0);

  // 収入の合計（num）
  const [goalIncomes, setGoalIncomes] = useState(0);

  // 収支計算の合計（num）
  const [totalBalance, setTotalBalanse] = useState(0);

  // 目標金額の合計から実際の支出合計を引いたもの
  const [allBalance, setAllBalance] = useState<number>(0);

  // 実際に入力した支出金額（obj）
  const [expenseDetail, setExpenseDetail] = useState<ExpenseDetailData>({
    daily: 0,
    food: 0,
    rent: 0,
    util: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

  // 目標金額（expenses）から実際の現在支出（expenseData）を引いた金額（obj）
  const [balanceDetail, setBalanceDetail] = useState<BalanceDetail>({
    dailyBalance: 0,
    foodBalance: 0,
    rentBalance: 0,
    utilBalance: 0,
    otherBalance: 0,
  });
  const [isExpense, setIsExpense] = useState(true);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const getAllData = async (month: string | string[] | number | undefined) => {
    const expenseData: AllData[] = [];
    let expenseTotal = 0;
    let incomeTotal = 0;
    let allexpenseData = {
      daily: 0,
      food: 0,
      rent: 0,
      util: 0,
      otherExpense: 0,
      totalPrice: 0,
    };
    month = Number(("0" + month).slice(-2));

    try {
      const q = query(
        collection(db, "spendings"),
        where("date", ">=", `2021-${month}-01`),
        where("date", "<=", `2021-${month}-31`)
      );
      const snapShot = await getDocs(q);
      const res = await getDoc(doc(db, "balances", `${month}`));
      const monthlyData: any = res.data();

      for (let key in monthlyData) {
        if (key === "salary" || key === "otherIncome") {
          incomeTotal = incomeTotal + monthlyData[key];
        } else {
          expenseTotal = expenseTotal + monthlyData[key];
        }
      }

      snapShot.forEach((doc) => {
        expenseData.push({
          id: doc.id,
          category: doc.data().category,
          date: doc.data().date,
          price: doc.data().price,
          text: doc.data().text,
        });
      });

      expenseData.forEach((item) => {
        switch (item.category) {
          case "食費":
            allexpenseData.food += item.price;
            break;
          case "日用品":
            allexpenseData.daily += item.price;
            break;
          case "家賃":
            allexpenseData.rent += item.price;
            break;
          case "光熱費":
            allexpenseData.util += item.price;
            break;
          case "その他":
            allexpenseData.otherExpense += item.price;
            break;
        }
        allexpenseData.totalPrice += item.price;
      });

      setGoalIncomes(incomeTotal);
      setGoalExpenses(expenseTotal);
      setExpenseDetail(allexpenseData);
      setTotalBalanse(incomeTotal - allexpenseData.totalPrice);
      setAllBalance(expenseTotal - allexpenseData.totalPrice);

      const dailyBalance = monthlyData.daily - allexpenseData.daily;
      const foodBalance = monthlyData.food - allexpenseData.food;
      const rentBalance = monthlyData.rent - allexpenseData.rent;
      const utilBalance = monthlyData.util - allexpenseData.util;
      const otherBalance =
        monthlyData.otherExpense - allexpenseData.otherExpense;

      const balanceData = {
        dailyBalance,
        foodBalance,
        rentBalance,
        utilBalance,
        otherBalance,
      };

      reset(monthlyData);
      setBalanceDetail(balanceData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAllData(nowMonth);
    }
  }, [nowMonth, currentUser]);

  const submitData = async (data: FormData, month: number) => {
    let expenseTotal = 0;
    let incomeTotal = 0;

    for (let key in data) {
      if (!data[key]) {
        data[key] = 0;
      }

      data[key] = Number(data[key]);
      if (key === "salary" || key === "otherIncome") {
        incomeTotal = incomeTotal + data[key];
      } else {
        expenseTotal = expenseTotal + data[key];
      }
    }
    console.log(expenseTotal);

    const { daily, food, rent, util, otherExpense, salary, otherIncome } = data;

    const expenseGoalData: ExpenseData = {
      daily: daily | 0,
      food: food | 0,
      rent: rent | 0,
      util: util | 0,
      otherExpense: otherExpense | 0,
    };

    const incomeGoalData: IncomeData = {
      salary: salary | 0,
      otherIncome: otherIncome | 0,
    };

    try {
      await setDoc(doc(db, "balances", `${month}`), {
        daily: expenseGoalData.daily,
        food: expenseGoalData.food,
        rent: expenseGoalData.rent,
        util: expenseGoalData.util,
        otherExpense: expenseGoalData.otherExpense,
        salary: incomeGoalData.salary,
        otherIncome: incomeGoalData.otherIncome,
      });

      const dailyBalance = expenseGoalData.daily - expenseDetail.daily;
      const foodBalance = expenseGoalData.food - expenseDetail.food;
      const rentBalance = expenseGoalData.rent - expenseDetail.rent;
      const utilBalance = expenseGoalData.util - expenseDetail.util;
      const otherBalance =
        expenseGoalData.otherExpense - expenseDetail.otherExpense;

      const balanceData = {
        dailyBalance,
        foodBalance,
        rentBalance,
        utilBalance,
        otherBalance,
      };

      setGoalExpenses(expenseTotal);
      setGoalIncomes(incomeTotal);
      setTotalBalanse(incomeTotal - expenseDetail.totalPrice);
      setBalanceDetail(balanceData);
      setAllBalance(expenseTotal - expenseDetail.totalPrice);
      reset({ ...expenseGoalData, ...incomeGoalData });
    } catch (e: any) {
      console.log(e);
    }
  };

  const clickShowOtherMonth = (otherMonth: number) => {
    if (otherMonth <= 0) {
      otherMonth = 12;
    } else if (otherMonth > 12) {
      otherMonth = 1;
    }
    setNowMonth(otherMonth);
    getAllData(otherMonth);
  };

  return (
    <>
      <Head>
        <title>graph</title>
      </Head>
      <TitleText>{nowMonth}月</TitleText>
      <Container>
        <BalancePrice
          incomes={goalIncomes}
          expenses={expenseDetail.totalPrice}
          balance={totalBalance}
        />
        <HStack mt={3} alignItems="flex-start">
          <Box w="50%">
            <Text mb={2}>{isExpense ? "目標支出" : "収入"}</Text>
            <form>
              {isExpense ? (
                <ExpenseForm register={register} />
              ) : (
                <IncomeForm register={register} />
              )}
            </form>
            <Text fontSize="25px" mt={2}>
              合計: {isExpense ? goalExpenses : goalIncomes}円
            </Text>
          </Box>
          <Box w="50%">
            <Text mb={3}>現在の支出</Text>
            <List spacing={3}>
              <Box>
                <Divider w="80%" m="0 auto 7px auto" borderColor="black" />
                <ListItem fontSize="22px">
                  <ListIcon as={IoIosBasket} color="green.500" />
                  {expenseDetail.daily}円 (
                  <Text
                    display="inline"
                    color={balanceDetail.dailyBalance >= 0 ? "black" : "red"}
                  >
                    {balanceDetail.dailyBalance >= 0 && "あと"}
                    {balanceDetail.dailyBalance}円
                  </Text>
                  )
                </ListItem>
                <Divider w="80%" m="0 auto" borderColor="black" />
              </Box>
              <Box>
                <ListItem fontSize="22px">
                  <ListIcon as={IoFastFoodOutline} color="green.500" />
                  {expenseDetail.food}円 (
                  <Text
                    display="inline"
                    color={balanceDetail.foodBalance >= 0 ? "black" : "red"}
                  >
                    {balanceDetail.foodBalance >= 0 && "あと"}
                    {balanceDetail.foodBalance}円
                  </Text>
                  )
                </ListItem>
                <Divider w="80%" m="0 auto" borderColor="black" />
              </Box>
              <Box>
                <ListItem fontSize="22px">
                  <ListIcon as={ImHome} color="green.500" />
                  {expenseDetail.rent}円 (
                  <Text
                    display="inline"
                    color={balanceDetail.rentBalance >= 0 ? "black" : "red"}
                  >
                    {balanceDetail.rentBalance >= 0 && "あと"}
                    {balanceDetail.rentBalance}
                  </Text>
                  円)
                </ListItem>
                <Divider w="80%" m="0 auto" borderColor="black" />
              </Box>
              <Box>
                <ListItem fontSize="22px">
                  <ListIcon as={BsFillLightbulbFill} color="green.500" />
                  {expenseDetail.util}円 (
                  <Text
                    display="inline"
                    color={balanceDetail.utilBalance >= 0 ? "black" : "red"}
                  >
                    {balanceDetail.utilBalance >= 0 && "あと"}
                    {balanceDetail.utilBalance}円
                  </Text>
                  )
                </ListItem>
                <Divider w="80%" m="0 auto" borderColor="black" />
              </Box>
              <Box>
                <ListItem fontSize="22px">
                  <ListIcon as={RiPsychotherapyFill} color="green.500" />
                  {expenseDetail.otherExpense}円 (
                  <Text
                    display="inline"
                    color={balanceDetail.otherBalance >= 0 ? "black" : "red"}
                  >
                    {balanceDetail.otherBalance >= 0 && "あと"}
                    {balanceDetail.otherBalance}円
                  </Text>
                  )
                </ListItem>
                <Divider w="80%" m="0 auto" borderColor="black" />
              </Box>
            </List>
            <Box mt={3} fontSize="25px">
              合計: {expenseDetail.totalPrice}円（
              <Text display="inline" color={allBalance >= 0 ? "black" : "red"}>
                {allBalance >= 0 && "あと"}
                {allBalance}円
              </Text>
              ）
            </Box>
          </Box>
        </HStack>
        <HStack mt={5} spacing={2} justify="center">
          <Button
            type="submit"
            onClick={handleSubmit((data) => submitData(data, nowMonth))}
          >
            目標変更
          </Button>
          <Button onClick={() => setIsExpense(!isExpense)}>支出/収入</Button>
        </HStack>
      </Container>
      <MonthButton
        clickShowOtherMonth={clickShowOtherMonth}
        nowMonth={nowMonth}
      />
    </>
  );
};

export default Expense;
