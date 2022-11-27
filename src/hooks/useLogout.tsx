import { useLoginState } from "../lib/recoil/loginState";
import useLocalStorage from "./useLocalStorage";
import AccessToken from "./useToken";
import { useChatMenuState } from "../lib/recoil/chatMenuState";


export default function useLogout() {
  const [isLogin, setIsLogin] = useLoginState();
  const [, setChatMenu] = useChatMenuState();

  const logout = async () => {
      if (isLogin) {
        // reset localStorage
        AccessToken.remove();
        useLocalStorage.remove("ADDR");
        useLocalStorage.remove("CHAT_SEQ");
        useLocalStorage.remove("CHAT_SENDER");

        // reset global State
        setIsLogin(false);
        setChatMenu([]);
        //
        window.location.replace("/");
        window.location.href = "/home";

      }
  };

  return logout;
}