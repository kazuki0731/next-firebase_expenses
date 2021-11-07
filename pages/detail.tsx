import Container from "../components/container";
import { NextPage } from "next";
import Head from "next/head";
import TitleText from "../components/titleText";
import { useRecoilState } from "recoil";

import {
  Box,
  HStack,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import { db } from "../src/firebase";

import { Button, Divider } from "@chakra-ui/react";
import dayjs from "dayjs";
import { AuthContext } from "../hooks/authProvider";
import PageLink from "../components/pageLink";
import { monthState } from "../hooks/userState";
import MonthButton from "../components/monthButton";

const pageLimit = 5;

interface AllData {
  id: string;
  category: string;
  date: Date;
  price: number;
  text: string;
}

interface expenseData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  otherExpense: number;
  totalPrice?: number;
}

const Total: NextPage = () => {
  const [nowMonth, setNowMonth] = useRecoilState(monthState);
  const { currentUser } = useContext<any>(AuthContext);
  const [prevtData, setPrevData] = useState({});
  const [nextData, setNextData] = useState({});
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [detailData, setDetailData] = useState<AllData[]>([]);
  const [expenseData, setExpenseData] = useState<expenseData>({
    daily: 0,
    food: 0,
    rent: 0,
    util: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

  const getAllData = async (month: string | string[] | number | undefined) => {
    const data: AllData[] = [];
    month = ("0" + month).slice(-2);

    let allexpenseData = {
      daily: 0,
      food: 0,
      rent: 0,
      util: 0,
      otherExpense: 0,
      totalPrice: 0,
    };
    try {
      const q = query(
        collection(db, "spendings"),
        where("date", ">=", `2021-${month}-01`),
        where("date", "<=", `2021-${month}-31`)
      );
      const snapShot = await getDocs(q);

      snapShot.forEach((doc) => {
        data.push({
          id: doc.id,
          category: doc.data().category,
          date: doc.data().date,
          price: doc.data().price,
          text: doc.data().text,
        });
      });
      const pageLen = Math.ceil(data.length / pageLimit);
      setMaxPage(pageLen);

      data.forEach((item) => {
        switch (item.category) {
          case "食費":
            allexpenseData.food += item.price;
            break;
          case "日用品":
            allexpenseData.daily += item.price;
            break;
          case "家賃":
            allexpenseData.rent += item.price;
            break;
          case "光熱費":
            allexpenseData.util += item.price;
            break;
          case "その他":
            allexpenseData.otherExpense += item.price;
            break;
        }
        allexpenseData.totalPrice += item.price;
      });
      setExpenseData(allexpenseData);
    } catch (e) {
      console.log(e);
    }
  };

  const getDetailData = async (
    month: string | string[] | number | undefined
  ) => {
    const data: AllData[] = [];

    month = ("0" + month).slice(-2);
    try {
      const q = query(
        collection(db, "spendings"),
        where("date", ">=", `2021-${month}-01`),
        where("date", "<=", `2021-${month}-31`),
        orderBy("date", "asc"),
        limit(pageLimit)
      );

      const snapShot = await getDocs(q);
      const nextDoc = snapShot.docs[snapShot.docs.length - 1];

      snapShot.forEach((doc) => {
        data.push({
          id: doc.id,
          category: doc.data().category,
          date: doc.data().date,
          price: doc.data().price,
          text: doc.data().text,
        });
      });
      setDetailData(data);
      setNextData(nextDoc);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAllData(nowMonth);
      getDetailData(nowMonth);
    }
  }, [nowMonth, currentUser]);

  const clickShowOtherMonth = (otherMonth: number) => {
    if (otherMonth <= 0) {
      otherMonth = 12;
    } else if (otherMonth > 12) {
      otherMonth = 1;
    }
    setNowMonth(otherMonth);
    getAllData(otherMonth);
    getDetailData(otherMonth);
    setNextData({});
    setNowPage(1);
  };

  const clickGetNextData = async (
    month: string | string[] | number | undefined
  ) => {
    const data: AllData[] = [];
    month = ("0" + month).slice(-2);

    try {
      const q = query(
        collection(db, "spendings"),
        where("date", ">=", `2021-${month}-01`),
        where("date", "<=", `2021-${month}-31`),
        orderBy("date", "asc"),
        limit(pageLimit),
        startAfter(nextData)
      );

      const snapShot = await getDocs(q);
      const nextDoc = snapShot.docs[snapShot.docs.length - 1];
      const prevDoc = snapShot.docs[0];

      snapShot.forEach((doc) => {
        data.push({
          id: doc.id,
          category: doc.data().category,
          date: doc.data().date,
          price: doc.data().price,
          text: doc.data().text,
        });
      });
      setDetailData(data);
      setNextData(nextDoc);
      setPrevData(prevDoc);
      setNowPage(nowPage + 1);
    } catch (e) {
      console.log(e);
    }
  };
  const clickGetPrevData = async (
    month: string | string[] | number | undefined
  ) => {
    const data: AllData[] = [];
    month = ("0" + month).slice(-2);

    try {
      const q = query(
        collection(db, "spendings"),
        where("date", ">=", `2021-${month}-01`),
        where("date", "<=", `2021-${month}-31`),
        orderBy("date", "asc"),
        limitToLast(pageLimit),
        endBefore(prevtData)
      );

      const snapShot = await getDocs(q);
      const nextDoc = snapShot.docs[snapShot.docs.length - 1];
      const prevDoc = snapShot.docs[0];

      snapShot.forEach((doc) => {
        data.push({
          id: doc.id,
          category: doc.data().category,
          date: doc.data().date,
          price: doc.data().price,
          text: doc.data().text,
        });
      });
      setDetailData(data);
      setNextData(nextDoc);
      setPrevData(prevDoc);
      setNowPage(nowPage - 1);
    } catch (e) {
      console.log(e);
    }
  };

  const clickDelete = async (id: string) => {
    await deleteDoc(doc(db, "spendings", id));
    getAllData(nowMonth);
    getDetailData(nowMonth);
  };

  return (
    <>
      <Head>
        <title>total</title>
      </Head>
      <TitleText>{nowMonth}月</TitleText>
      <Container>
        <Text fontWeight="semibold"> 総計: {expenseData.totalPrice}円</Text>
        {expenseData.totalPrice === 0 || (
          <>
            <UnorderedList mb={5} listStyleType="none">
              {detailData.map((data) => (
                <Box key={data.id}>
                  <ListItem>
                    <span> {data.text} </span>
                    <span> ({data.category})</span>
                    <span> {data.price}円 </span>
                    <span> {dayjs(data.date).format("MM/DD(ddd)")} </span>
                    <PageLink
                      href={{
                        pathname: "/edit",
                        query: { id: data.id },
                      }}
                      url={`/edit`}
                    >
                      <Button m={1.5} fontSize="16px" h="32px" w="50px">
                        編集
                      </Button>
                    </PageLink>
                    <Button
                      m={1.5}
                      fontSize="16px"
                      h="32px"
                      w="50px"
                      onClick={() => clickDelete(data.id)}
                    >
                      削除
                    </Button>
                  </ListItem>
                  <Divider w="80%" m="0 auto" borderColor="black" />
                </Box>
              ))}
            </UnorderedList>
            <HStack w="100%" justify="center" spacing={5}>
              <Button
                disabled={nowPage === 1}
                onClick={() => clickGetPrevData(nowMonth)}
              >
                &lt;&lt;前の5件
              </Button>
              <Button
                disabled={nowPage === maxPage}
                onClick={() => clickGetNextData(nowMonth)}
              >
                次の5件&gt;&gt;
              </Button>
            </HStack>
            {/* <Button onClick={onOpen}>詳細</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>詳細</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <UnorderedList mb={5} listStyleType="none">
                      {detailData.map((data) => (
                        <Box key={data.id}>
                          <ListItem>
                            <span>{data.category} </span>
                            <span>{data.price}円 </span>
                            <span>
                              {dayjs(data.date).format("MM/DD(ddd)")}{" "}
                            </span>
                            <PageLink
                              href={{
                                pathname: "/edit",
                                query: { id: data.id },
                              }}
                              url={`/edit`}
                            >
                              <Button
                                bg="gray.300"
                                m={1.5}
                                fontSize="16px"
                                h="32px"
                                w="50px"
                              >
                                編集
                              </Button>
                            </PageLink>
                            <Button
                              bg="gray.300"
                              m={1.5}
                              fontSize="16px"
                              h="32px"
                              w="50px"
                              onClick={() => clickDelete(data.id)}
                            >
                              削除
                            </Button>
                          </ListItem>
                          <Divider w="80%" m="0 auto" borderColor="black" />
                        </Box>
                      ))}
                    </UnorderedList>
                  </ModalBody>
                  <ModalFooter>
                    <HStack w="100%" justify="space-between">
                      <Button
                        disabled={nowPage === 1}
                        onClick={() => clickGetPrevData(nowMonth)}
                      >
                        &lt;&lt;前の5件
                      </Button>
                      <Button
                        disabled={nowPage === maxPage}
                        onClick={() => clickGetNextData(nowMonth)}
                      >
                        次の5件&gt;&gt;
                      </Button>
                    </HStack>
                  </ModalFooter>
                </ModalContent>
              </Modal> */}
          </>
        )}

        {/* <List spacing={2}>
          <ListItem>
            <ListIcon as={IoIosBasket} color="green.500" />
            日用品: {expenseData.daily}円
          </ListItem>
          <ListItem>
            <ListIcon as={IoFastFoodOutline} color="green.500" />
            食費: {expenseData.food}円
          </ListItem>
          <ListItem>
            <ListIcon as={ImHome} color="green.500" />
            家賃: {expenseData.rent}円
          </ListItem>
          <ListItem>
            <ListIcon as={BsFillLightbulbFill} color="green.500" />
            光熱費: {expenseData.util}円
          </ListItem>
          <ListItem>
            <ListIcon as={RiPsychotherapyFill} color="green.500" />
            その他: {expenseData.other}円
          </ListItem>
        </List> */}
      </Container>
      {/* <HStack spacing={8} justify="space-evenly" mt={3}>
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
      </HStack> */}
      <MonthButton
        clickShowOtherMonth={clickShowOtherMonth}
        nowMonth={nowMonth}
      />
    </>
  );
};

export default Total;
