import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import MonthButton from "./monthButton";
import { Heading } from "@chakra-ui/layout";

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
      justify="center"
      mt={7}
      mb={7}
    >
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowYear, nowMonth - 1)}
      >
        &lt;&lt;前の月
      </MonthButton>
      <MonthButton clickHandle={() => clickShowCurrentMonth()}>
        今月へ
      </MonthButton>
      <Heading as="h2" m={2}>
        {nowYear}年{nowMonth}月
      </Heading>
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowYear, nowMonth + 1)}
      >
        次の月&gt;&gt;
      </MonthButton>
    </HStack>
  );
};

export default MonthButtonList;
