import { Auth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export const createDisplayName = async (
  auth: Auth,
  email: string,
  name: string
) => {
  if (!auth.currentUser) return;
  await updateProfile(auth.currentUser, {
    displayName: name,
  });

  await setDoc(doc(db, "users", auth.currentUser.uid), {
    name,
    email,
  });
};
