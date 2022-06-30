import router from "../../router";
import { removeAuthDataFromStorage } from "./useAuth.api";

export function useSignOut() {
  const signOut = () => {
    removeAuthDataFromStorage();
    router.push({ name: "Sign_in" });
  };
  return { signOut };
}
