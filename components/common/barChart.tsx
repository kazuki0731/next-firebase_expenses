import { Box, Text, HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Bar } from "react-chartjs-2";
import { Chart } from "../../models/interface";
import { chartOptions } from "../../util/function";
import SelectButton from "../total/selectButton";

interface Props {
  barChart: Chart;
  nowYear: number;
  monthlyAvg: number;
  selectedBalance: string;
  changeBalance: (text: string) => void;
}

const BarChart: NextPage<Props> = ({
  barChart,
  nowYear,
  monthlyAvg,
  selectedBalance,
  changeBalance,
}) => {
  const { options } = chartOptions(monthlyAvg, nowYear);
  return (
    <Box
      w={{ base: "350px", md: "670px" }}
      h={{ base: "340px", md: "400px" }}
      pt="10px"
      pb={{ base: "30px", md: "50px" }}
      m="20px auto 30px"
      bg={"white"}
      boxShadow="dark-lg"
      position="relative"
    >
      <Text textAlign={{ base: "left", md: "center" }} w="80%" m="0 auto">
        推移（年間）
      </Text>
      <HStack spacing="10px" position="absolute" top="10px" right="20px">
        <SelectButton
          selectedBalance={selectedBalance}
          text="支出"
          changeBalance={changeBalance}
        >
          支出
        </SelectButton>
        <SelectButton
          selectedBalance={selectedBalance}
          text="収入"
          changeBalance={changeBalance}
        >
          収入
        </SelectButton>
        <SelectButton
          selectedBalance={selectedBalance}
          text="収支"
          changeBalance={changeBalance}
        >
          収支
        </SelectButton>
      </HStack>
      <Bar data={barChart} options={options} />
    </Box>
  );
};

export default BarChart;
