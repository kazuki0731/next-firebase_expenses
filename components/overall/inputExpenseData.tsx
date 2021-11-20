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
import { BsFillLightbulbFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { IoIosBasket } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiPsychotherapyFill } from "react-icons/ri";
import { DataContext } from "../../hooks/provider/dataProvider";
import { BalanceDetail, ExpenseData } from "../../models/interface";

interface Props {
  expenseDetail: ExpenseData;
  balanceDetail: BalanceDetail;
  allBalance: number;   
}

const InputExpenseData: NextPage<Props> = ({
  expenseDetail,
  balanceDetail,
  allBalance,
}) => {
  const { isLarger } = useContext(DataContext);

  return (
    <Box w={isLarger ? "50%" : "100%"}>
      <Text mb={3}>現在の支出</Text>
      <Box w="80%" m="0 auto">
        <List spacing={3}>
          <Box>
            <Divider w="100%" mb="7px" borderColor="black" />
            <ListItem textAlign="right" fontSize={isLarger ? "22px" : "18px"}>
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
            <ListItem textAlign="right" fontSize={isLarger ? "22px" : "18px"}>
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
            <ListItem textAlign="right" fontSize={isLarger ? "22px" : "18px"}>
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
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem textAlign="right" fontSize={isLarger ? "22px" : "18px"}>
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
            <ListItem textAlign="right" fontSize={isLarger ? "22px" : "18px"}>
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
        <Box mt={3} textAlign="right" fontSize={isLarger ? "22px" : "18px"}>
          合計: {expenseDetail.totalPrice}円(
          <Text display="inline" color={allBalance >= 0 ? "black" : "red"}>
            {allBalance >= 0 && "あと"}
            {allBalance}円
          </Text>
          )
        </Box>
      </Box>
    </Box>
  );
};

export default InputExpenseData;
