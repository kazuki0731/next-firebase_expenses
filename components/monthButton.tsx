import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";

interface Props {
  clickShowOtherMonth: Function
  nowMonth: number
}

const MonthButton: NextPage<Props> = ({ clickShowOtherMonth, nowMonth }) => {
  
  return (
    <HStack spacing={8} justify="space-evenly" mt={3}>
      <Button
        w="120px"
        bg="blue.300"
        onClick={() => clickShowOtherMonth(nowMonth - 1)}
      >
        &lt;&lt;前の月
      </Button>
      <Button
        w="120px"
        bg="blue.300"
        onClick={() => clickShowOtherMonth(nowMonth + 1)}
      >
        次の月&gt;&gt;
      </Button>
    </HStack>
  );
};

export default MonthButton;
