import { Box, HStack, ListItem, UnorderedList, Text } from "@chakra-ui/layout";
import { Button, Divider, Icon } from "@chakra-ui/react";
import { BsCardImage } from "react-icons/bs";

import dayjs from "dayjs";
import { NextPage } from "next";
import { useContext } from "react";
import { DataContext } from "../../hooks/dataProvider";
import { InputData } from "../../models/interface";
import PageLink from "../common/pageLink";

interface Props {
  detailData: InputData[];
  clickDelete: (id: string) => void;
}

const InputDataList: NextPage<Props> = ({ detailData, clickDelete }) => {
  const { isLarger } = useContext(DataContext);
  return (
    <Box>
      <UnorderedList w="85%" m="0 auto 10px auto" listStyleType="none">
        {detailData.map((data) => (
          <Box key={data.id}>
            <ListItem>
              {isLarger ? (
                <>
                  <HStack justify="space-between" fontSize="22px">
                    <HStack spacing={4}>
                      <Text as="span">
                        {" "}
                        {dayjs(data.date).format("MM/DD(ddd)")}{" "}
                      </Text>
                      <Text as="span"> {data.title} </Text>
                      <Text as="span"> ({data.category})</Text>
                    </HStack>
                    <Box>
                      {data.files && (
                        <Icon as={BsCardImage} mr="20px" fontSize="27px" />
                      )}
                      <Text as="span"> {data.price}円 </Text>
                      <PageLink
                        href={{
                          pathname: `/edit/${data.id}`,
                          query: { dataId: data.id },
                        }}
                      >
                        <Button m={1.5} fontSize="14px" h="32px" w="50px">
                          詳細
                        </Button>
                      </PageLink>
                      <Button
                        m={1.5}
                        fontSize="14px"
                        h="32px"
                        w="50px"
                        onClick={() => clickDelete(data.id)}
                      >
                        削除
                      </Button>
                    </Box>
                  </HStack>
                </>
              ) : (
                <>
                  <HStack justify="flex-start">
                    <Text fontSize="16px">
                      <Text as="span">
                        {" "}
                        {dayjs(data.date).format("MM/DD(ddd)")}{" "}
                      </Text>
                      <Text as="span"> {data.title} </Text>
                      <Text as="span"> ({data.category})</Text>
                    </Text>
                    {data.files && <Icon as={BsCardImage} />}
                  </HStack>
                  <HStack justify="flex-end">
                    <Box fontSize="16px">
                      <Text as="span"> {data.price}円 </Text>
                      <PageLink
                        href={{
                          pathname: `/edit/${data.id}`,
                          query: { dataId: data.id },
                        }}
                      >
                        <Button m={1} fontSize="12px" h="22px" w="40px">
                          詳細
                        </Button>
                      </PageLink>
                      <Button
                        m={1}
                        fontSize="12px"
                        h="22px"
                        w="40px"
                        onClick={() => clickDelete(data.id)}
                      >
                        削除
                      </Button>
                    </Box>
                  </HStack>
                </>
              )}
            </ListItem>
            <Divider borderColor="black" />
          </Box>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default InputDataList;
