import {
  Box,
  Divider,
  List,
  ListIcon,
  ListItem,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/layout";
import { NextPage } from "next";
import { AiFillCar, AiFillInsurance } from "react-icons/ai";
import { BiBeer } from "react-icons/bi";
import { IoIosBasket } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiPsychotherapyFill } from "react-icons/ri";
import { AllCategoryData } from "../../models/interface";

interface Props {
  allDataByCategory: AllCategoryData;
}

const TotalDataByCategory: NextPage<Props> = ({ allDataByCategory }) => {
  return (
    <Box>
      <HStack alignItems="flex-start">
        <Box w="50%">
          <Text mb={3}>支出</Text>
          <Box w="90%" m="0 auto">
            <List spacing={3}>
              <Box>
                <Divider w="100%" mb="7px" borderColor="black" />
                <ListItem
                  textAlign="right"
                  fontSize={{ base: "18px", lg: "22px" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <ListIcon as={IoIosBasket} color="green.500" />
                      <Text as="span">日用品 </Text>
                    </Box>
                    <Text as="span">{allDataByCategory.daily}円</Text>
                  </HStack>
                </ListItem>
                <Divider w="100%" mb="7px" borderColor="black" />
              </Box>
              <Box>
                <ListItem
                  textAlign="right"
                  fontSize={{ base: "18px", lg: "22px" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <ListIcon as={IoFastFoodOutline} color="green.500" />
                      <Text as="span">食費 </Text>
                    </Box>
                    <Text as="span">{allDataByCategory.food}円</Text>
                  </HStack>
                </ListItem>
                <Divider w="100%" mb="7px" borderColor="black" />
              </Box>
              <Box>
                <ListItem
                  textAlign="right"
                  fontSize={{ base: "18px", lg: "22px" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <ListIcon as={AiFillCar} color="green.500" />
                      <Text as="span">交通費 </Text>
                    </Box>
                    <Text as="span">{allDataByCategory.traffic}円</Text>
                  </HStack>
                </ListItem>
                <Divider w="100%" mb="7px" borderColor="black" />
              </Box>
              <Box>
                <ListItem
                  textAlign="right"
                  fontSize={{ base: "18px", lg: "22px" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <ListIcon as={BiBeer} color="green.500" />
                      <Text as="span">交際費 </Text>
                    </Box>
                    <Text as="span">{allDataByCategory.enter}円</Text>
                  </HStack>
                </ListItem>
                <Divider w="100%" mb="7px" borderColor="black" />
              </Box>
              <Box>
                <ListItem
                  textAlign="right"
                  fontSize={{ base: "18px", lg: "22px" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <ListIcon as={AiFillInsurance} color="green.500" />
                      <Text as="span">固定費 </Text>
                    </Box>
                    <Text as="span">{allDataByCategory.fixed}円</Text>
                  </HStack>
                </ListItem>
                <Divider w="100%" mb="7px" borderColor="black" />
              </Box>
              <Box>
                <ListItem
                  textAlign="right"
                  fontSize={{ base: "18px", lg: "22px" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <ListIcon as={RiPsychotherapyFill} color="green.500" />
                      <Text as="span">その他 </Text>
                    </Box>
                    <Text as="span">{allDataByCategory.otherExpense}円</Text>
                  </HStack>
                </ListItem>
                <Divider w="100%" mb="7px" borderColor="black" />
              </Box>
            </List>
          </Box>
        </Box>
        <Box w="50%">
          <Text mb={3}>収入</Text>
          <VStack h="273px" justify="space-between">
            <Box w="90%" m="0 auto">
              <Divider w="100%" mb="7px" borderColor="black" />
              <List spacing={3}>
                <Box>
                  <ListItem
                    textAlign="right"
                    fontSize={{ base: "18px", lg: "22px" }}
                  >
                    <HStack justify="space-between">
                      <Box>
                        <ListIcon as={AiFillInsurance} color="green.500" />
                        <Text as="span">給料 </Text>
                      </Box>
                      <Text as="span">{allDataByCategory.salary}円</Text>
                    </HStack>
                  </ListItem>
                  <Divider w="100%" mb="7px" borderColor="black" />
                </Box>
                <Box>
                  <ListItem
                    textAlign="right"
                    fontSize={{ base: "18px", lg: "22px" }}
                  >
                    <HStack justify="space-between">
                      <Box>
                        <ListIcon as={RiPsychotherapyFill} color="green.500" />
                        <Text as="span">その他 </Text>
                      </Box>
                      <Text as="span">{allDataByCategory.otherIncome}円</Text>
                    </HStack>
                  </ListItem>
                  <Divider w="100%" mb="7px" borderColor="black" />
                </Box>
              </List>
            </Box>
            <Box w="90%" border="1px solid #000">
              <Text>当月収入: {allDataByCategory.totalIncomePrice}円</Text>
              <Text>当月支出: {allDataByCategory.totalExpensePrice}円</Text>
              <Text>当月収支: {allDataByCategory.totalBalancePrice}円</Text>
            </Box>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default TotalDataByCategory;
