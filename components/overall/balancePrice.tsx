import { Box, Text } from "@chakra-ui/layout";
import { NextPage } from "next";

interface Props {
  incomes: number;
  expenses: number;
  balance: number;
}

const BalancePrice: NextPage<Props> = ({ incomes, expenses, balance }) => {
  return (
    <Box m={2}>
            <Text fontSize="25px">
              収入: <strong>{incomes}</strong> 円
            </Text>
            <Text fontSize="25px">
              支出: <strong>-{expenses}</strong> 円
            </Text>
            <Text fontSize="25px">
              収支:{" "}
              <strong style={{ color: balance >= 0 ? "blue" : "red" }}>
                {balance}
              </strong>{" "}
              円
            </Text>
          </Box>
  );
};

export default BalancePrice;
