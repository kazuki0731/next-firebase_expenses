import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const MenuContext = createContext(
  {} as {
    currentMenu: string;
    setCurrentMenu: Dispatch<SetStateAction<string>>;
  }
);

const MenuProvider: NextPage = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    setCurrentMenu(router.asPath);
    router.events.on("routeChangeComplete", handleChangeRoute);
  }, []);

  // 現在表示されているヘッダーのメニューにアンダーラインを追加する
  const handleChangeRoute = (path: string) => {
    const isEdit = /\/edit/;
    if (isEdit.test(path)) {
      path = "/list";
    }
    console.log(path);
    setCurrentMenu(path);
  };

  const value = {
    currentMenu,
    setCurrentMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
