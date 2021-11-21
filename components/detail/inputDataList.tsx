import { Box, HStack, ListItem, UnorderedList } from "@chakra-ui/layout";
import { Button, Divider } from "@chakra-ui/react";

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
      <UnorderedList w="90%" m="0 auto 10px auto" listStyleType="none">
        {detailData.map((data) => (
          <Box key={data.id}>
            <ListItem>
              {isLarger ? (
                <>
                  <HStack justify="space-between" fontSize="22px">
                    <Box>
                      <span> {dayjs(data.date).format("MM/DD(ddd)")} </span>
                      <span> {data.text} </span>
                      <span> ({data.category})</span>
                    </Box>
                    <Box>
                      <span> {data.price}円 </span>
                      <PageLink
                        href={{
                          pathname: "/edit/[id]",
                          query: { dataId: data.id },
                        }}
                        url={`/edit/${data.text}`}
                      >
                        <Button m={1.5} fontSize="14px" h="32px" w="50px">
                          編集
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
                  <HStack justify="center">
                    <Box fontSize="16px">
                      <span> {dayjs(data.date).format("MM/DD(ddd)")} </span>
                      <span> {data.text} </span>
                      <span> ({data.category})</span>
                    </Box>
                  </HStack>
                  <HStack justify="center">
                    <Box fontSize="16px">
                      <span> {data.price}円 </span>
                      <PageLink
                        href={{
                          pathname: "/edit/[id]",
                          query: { dataId: data.id },
                        }}
                        url={`/edit/${data.text}`}
                      >
                        <Button m={1} fontSize="12px" h="22px" w="40px">
                          編集
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
