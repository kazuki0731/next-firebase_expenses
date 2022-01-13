import {
  Box,
  Divider,
  List,
  ListIcon,
  ListItem,
  Text,
  HStack,
} from "@chakra-ui/layout";
import { NextPage } from "next";
import { AiFillCar, AiFillInsurance } from "react-icons/ai";
import { BiBeer } from "react-icons/bi";
import { IoIosBasket } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiPsychotherapyFill } from "react-icons/ri";
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
  return (
    <Box
      border="1px solid #aaa"
      bg="#fff"
      h="435px"
      m="0 auto"
      w={{ base: "85%", sm: "350px", md: "50%", lg: "50%" }}
    >
      <Text mt="10px" fontSize={{ base: "18px", md: "20px", lg: "22px" }}>
        現在の支出
      </Text>
      <Box w={{ base: "80%", md: "90%", lg: "85%" }} m="15px auto">
        <List
          spacing={{ base: "22px", md: "21px", lg: "13px" }}
          fontSize={{ base: "15px", md: "18px", lg: "22px" }}
        >
          <Box>
            <ListItem>
              <HStack justify="space-between" px="10px">
                <HStack>
                  <ListIcon as={IoIosBasket} color="green.500" />
                  <Text>{expenseDetail.daily}円</Text>
                </HStack>
                <Text
                  display="inline"
                  color={balanceDetail.dailyBalance >= 0 ? "black" : "red"}
                >
                  ({balanceDetail.dailyBalance >= 0 && "あと"}
                  {balanceDetail.dailyBalance}円 )
                </Text>
              </HStack>
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem>
              <HStack justify="space-between" px="10px">
                <HStack>
                  <ListIcon as={IoFastFoodOutline} color="green.500" />
                  <Text>{expenseDetail.food}円</Text>
                </HStack>
                <Text
                  display="inline"
                  color={balanceDetail.foodBalance >= 0 ? "black" : "red"}
                >
                  ({balanceDetail.foodBalance >= 0 && "あと"}
                  {balanceDetail.foodBalance}円 )
                </Text>
              </HStack>
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem>
              <HStack justify="space-between" px="10px">
                <HStack>
                  <ListIcon as={AiFillCar} color="green.500" />
                  <Text>{expenseDetail.traffic}円</Text>
                </HStack>
                <Text
                  display="inline"
                  color={balanceDetail.trafficBalance >= 0 ? "black" : "red"}
                >
                  ({balanceDetail.trafficBalance >= 0 && "あと"}
                  {balanceDetail.trafficBalance}円 )
                </Text>
              </HStack>
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem>
              <HStack justify="space-between" px="10px">
                <HStack>
                  <ListIcon as={BiBeer} color="green.500" />
                  <Text>{expenseDetail.enter}円</Text>
                </HStack>
                <Text
                  display="inline"
                  color={balanceDetail.enterBalance >= 0 ? "black" : "red"}
                >
                  ({balanceDetail.enterBalance >= 0 && "あと"}
                  {balanceDetail.enterBalance}円 )
                </Text>
              </HStack>
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem>
              <HStack justify="space-between" px="10px">
                <HStack>
                  <ListIcon as={AiFillInsurance} color="green.500" />
                  <Text>{expenseDetail.fixed}円</Text>
                </HStack>
                <Text
                  display="inline"
                  color={balanceDetail.fixedBalance >= 0 ? "black" : "red"}
                >
                  ({balanceDetail.fixedBalance >= 0 && "あと"}
                  {balanceDetail.fixedBalance}円 )
                </Text>
              </HStack>
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
          <Box>
            <ListItem>
              <HStack justify="space-between" px="10px">
                <HStack>
                  <ListIcon as={RiPsychotherapyFill} color="green.500" />
                  <Text>{expenseDetail.otherExpense}円</Text>
                </HStack>
                <Text
                  display="inline"
                  color={balanceDetail.otherBalance >= 0 ? "black" : "red"}
                >
                  ({balanceDetail.otherBalance >= 0 && "あと"}
                  {balanceDetail.otherBalance}円 )
                </Text>
              </HStack>
            </ListItem>
            <Divider w="100%" mb="7px" borderColor="black" />
          </Box>
        </List>
        <Box
          mt={3}
          fontSize={{ base: "18px", md: "19px", lg: "22px" }}
          textAlign="right"
        >
          合計: {expenseDetail.totalExpensePrice}円
        </Box>
        <Text
          mt="15px"
          fontSize={{ base: "18px", md: "20px", lg: "22px" }}
          fontWeight="semibold"
          textAlign="right"
        >
          目標までの残り:{" "}
          <strong style={{ color: allBalance >= 0 ? "blue" : "red" }}>
            {allBalance}
          </strong>{" "}
          円
        </Text>
      </Box>
    </Box>
  );
};

export default InputExpenseData;
