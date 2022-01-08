import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import MonthButton from "./monthButton";
import { Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

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
      w="85%"
    >
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowYear, nowMonth - 1)}
      >
        &lt;&lt;
      </MonthButton>
      <Heading as="h2" m={2}>
        {nowYear}年{nowMonth}月
      </Heading>
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowYear, nowMonth + 1)}
      >
        &gt;&gt;
      </MonthButton>
      <Button
        position="absolute"
        borderRadius="3px"
        right="10%"
        bg="gray.300"
        w={{ base: "80px", md: "80px" }}
        h={{ base: "30px", md: "45px" }}
        onClick={clickShowCurrentMonth}
      >
        今月へ
      </Button>
    </HStack>
  );
};

export default MonthButtonList;
