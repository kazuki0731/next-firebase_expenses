import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useMediaQuery } from "@chakra-ui/react";
import MonthButton from "./monthButton";
import { useContext } from "react";
import { DataContext } from "../../hooks/dataProvider";

interface Props {
  clickShowOtherMonth: Function;
  clickShowNowMonth: VoidFunction;
}

const MonthButtonList: NextPage<Props> = ({
  clickShowOtherMonth,
  clickShowNowMonth,
}) => {
  const [isLarger] = useMediaQuery("(min-width: 768px)");
  const { nowMonth } = useContext(DataContext);

  return (
    <HStack spacing={isLarger ? 12 : 4} justify="center" mt={5} mb={10}>
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowMonth - 1)}
      >
        &lt;&lt;前の月
      </MonthButton>
      <MonthButton clickHandle={() => clickShowNowMonth()}>
        今月へ
      </MonthButton>
      <MonthButton
        clickHandle={() => clickShowOtherMonth(nowMonth - 1)}
      >
        次の月&gt;&gt;
      </MonthButton>
    </HStack>
  );
};

export default MonthButtonList;
