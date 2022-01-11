import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { createDisplayName } from "../apiCaller/authQuery";
import { auth } from "../lib/firebase";
import { Login, Signup } from "../models/interface";
import { AuthContext } from "./provider/authProvider";

export const useAuth = () => {
  const { setLoginUser } = useContext(AuthContext);
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
  });

  const login = async ({ email, password }: Login) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      switch (e.code) {
        case "auth/wrong-password":
          setMsg("パスワードが間違っています");
          break;
        case "auth/user-not-found":
          setMsg("ユーザーが見つかりません");
          break;
        case "auth/too-many-requests":
          setMsg("間違いが多すぎます。ロードし直してください");
          break;
        default:
          setMsg("通信に失敗しました");
      }
    }
  };

  const signup = async ({ email, password, name }: Signup) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      createDisplayName(auth, email, name);
    } catch (e: any) {
      if (auth.currentUser) {
        deleteUser(auth.currentUser);
      }
      console.log(e);
      switch (e.code) {
        case "auth/email-already-in-use":
          setMsg("メールアドレスはすでに使われています");
          break;
        case "auth/weak-password":
          setMsg("パスワードを複雑にしてください");
          break;
        default:
          setMsg("通信に失敗しました");
      }
      return;
    }
    setMsg("登録できました");
    setMemberData({
      name,
      email,
    });
  };

  const logout = async () => {
    signOut(auth);
    setLoginUser(null);
    router.push("/");
  };

  return {
    login,
    signup,
    logout,
    memberData,
    msg,
  };
};

export const useIsLogin = (page: string) => {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (loginUser) {
      router.push(page);
    }
  }, [loginUser]);
};
