import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import MonthButton from "./monthButton";
import { Heading } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";

interface Props {
  nowMonth: number;
  nowYear: number;
  clickShowOtherMonth: Function;
  clickShowCurrentMonth: VoidFunction;
}

const MonthButtonList: NextPage<Props> = ({
  clickShowOtherMonth,
  clickShowCurrentMonth,
  nowMonth,
  nowYear,
}) => {
  return (
    <HStack
      spacing={{ base: "10px", md: "20px" }}
      position="relative"
      justify="center"
      m="20px auto"
      w={{ base: "350px", md: "80%", lg: "700px" }}
    >
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowYear, nowMonth - 1)}
      >
        &lt;&lt;
      </MonthButton>
      <Text fontSize={{ base: "24px", md: "28px" }} fontWeight="bold" m={2}>
        {nowYear}年{nowMonth}月
      </Text>
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowYear, nowMonth + 1)}
      >
        &gt;&gt;
      </MonthButton>
      <Button
        position="absolute"
        borderRadius="3px"
        right="0"
        bg="gray.300"
        fontSize={{ base: "12px", md: "18px" }}
        w={{ base: "40px", md: "80px" }}
        h={{ base: "30px", md: "45px" }}
        onClick={clickShowCurrentMonth}
      >
        今月
      </Button>
    </HStack>
  );
};

export default MonthButtonList;
