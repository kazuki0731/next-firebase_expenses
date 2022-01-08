import { Box, Text, HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Bar } from "react-chartjs-2";
import SelectButton from "../total/selectButton";

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
    maintainAspectRatio: false,
    responsive: true,
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
  return (
    <Box
      w={{ base: "300px", md: "670px" }}
      h={{ base: "200px", md: "500px" }}
      pt="10px"
      pb="50px"
      m="0 auto"
      bg={"white"}
      boxShadow="dark-lg"
      rounded="xl"
    >
      <Text>推移（年間）</Text>
      <HStack
        spacing="10px"
        justifyContent="flex-end"
        m="0 auto"
        w="100%"
        position="absolute"
        top="25px"
        right="20px"
      >
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
