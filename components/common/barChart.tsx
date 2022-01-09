import { Box, Text, HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Bar } from "react-chartjs-2";
import SelectButton from "../total/selectButton";
import { useMediaQuery } from "@chakra-ui/react";

interface Props {
  barChart: {
    labels: string[];
    datasets:
      | [
          {
            data: number[];
            backgroundColor: string[];
            borderColor?: string[];
            borderWidth: number;
          }
        ]
      | [];
  };
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
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 5,
        left: 15,
        right: 15,
        bottom: 10,
      },
    },
    plugins: {
      title: {
        display: true,
        text: `平均: ${monthlyAvg}円／月（${nowYear}年）`,
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
  };
  const [isLarger] = useMediaQuery("(min-width: 768px)");
  return (
    <Box
      w={{ base: "360px", md: "670px" }}
      h={{ base: "360px", md: "500px" }}
      pt="10px"
      pb="50px"
      m="0 auto"
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
