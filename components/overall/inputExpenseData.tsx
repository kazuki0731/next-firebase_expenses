import {
  Box,
  Divider,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import { NextPage } from "next";
import { useContext } from "react";
import { AiFillCar, AiFillInsurance } from "react-icons/ai";
import { BiBeer } from "react-icons/bi";
import { BsFillLightbulbFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { IoIosBasket } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiPsychotherapyFill } from "react-icons/ri";
import { DataContext } from "../../hooks/dataProvider";
import { BalanceDetail, ExpenseData } from "../../models/interface";

interface Props {
  expenseDetail: ExpenseData;
  balanceDetail: BalanceDetail;
  allBalance: number;
  totalbalance: number;
}

const InputExpenseData: NextPage<Props> = ({
  expenseDetail,
  balanceDetail,
  allBalance,
  totalbalance,
}) => {
  const { isLarger } = useContext(DataContext);

  return (
    <Box w={isLarger ? "50%" : "100%"}>
      <Text mb={3}>現在の支出</Text>
      <Box w="80%" m="0 auto">
        <List spacing={3}>
          <Box>
            <Divider w="100%" mb="7px" borderColor="black" />
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
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
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
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
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
              <ListIcon as={ImHome} color="green.500" />
              {expenseDetail.rent}円 (
              <Text
                display="inline"
                color={balanceDetail.rentBalance >= 0 ? "black" : "red"}
              >
                {balanceDetail.rentBalance >= 0 && "あと"}
                {balanceDetail.rentBalance}円
              </Text>
              )
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
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
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
              <ListIcon as={AiFillCar} color="green.500" />
              {expenseDetail.traffic}円 (
              <Text
                display="inline"
                color={balanceDetail.trafficBalance >= 0 ? "black" : "red"}
              >
                {balanceDetail.trafficBalance >= 0 && "あと"}
                {balanceDetail.trafficBalance}円
              </Text>
              )
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
              <ListIcon as={BiBeer} color="green.500" />
              {expenseDetail.enter}円 (
              <Text
                display="inline"
                color={balanceDetail.enterBalance >= 0 ? "black" : "red"}
              >
                {balanceDetail.enterBalance >= 0 && "あと"}
                {balanceDetail.enterBalance}円
              </Text>
              )
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
              <ListIcon as={AiFillInsurance} color="green.500" />
              {expenseDetail.tax}円 (
              <Text
                display="inline"
                color={balanceDetail.taxBalance >= 0 ? "black" : "red"}
              >
                {balanceDetail.taxBalance >= 0 && "あと"}
                {balanceDetail.taxBalance}円
              </Text>
              )
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
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
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
        </List>
        <Box mt={3} textAlign="right" fontSize={{ base: "18px", lg: "22px" }}>
          合計: {expenseDetail.totalPrice}円
        </Box>
        <Text mt="15px" fontSize="25px" fontWeight="semibold" textAlign="right">
          収支:{" "}
          <strong style={{ color: totalbalance >= 0 ? "blue" : "red" }}>
            {totalbalance}
          </strong>{" "}
          円
        </Text>
      </Box>
    </Box>
  );
};

export default InputExpenseData;
