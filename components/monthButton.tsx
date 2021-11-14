import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";

interface Props {
  clickShowOtherMonth: Function;
  nowMonth: number;
  clickShowNowMonth: VoidFunction;
}

const MonthButton: NextPage<Props> = ({
  clickShowOtherMonth,
  nowMonth,
  clickShowNowMonth,
}) => {
  return (
    <HStack spacing={10} justify="center" mt={5} mb={10}>
      <Button
        w="120px"
        bg="blue.300"
        _hover={{ bg: "blue.200" }}
        onClick={() => clickShowOtherMonth(nowMonth - 1)}
      >
        &lt;&lt;前の月
      </Button>
      <Button
        w="120px"
        bg="blue.300"
        _hover={{ bg: "blue.200" }}
        onClick={clickShowNowMonth}
      >
        今月へ
      </Button>
      <Button
        w="120px"
        bg="blue.300"
        _hover={{ bg: "blue.200" }}
        onClick={() => clickShowOtherMonth(nowMonth + 1)}
      >
        次の月&gt;&gt;
      </Button>
    </HStack>
  );
};

export default MonthButton;
