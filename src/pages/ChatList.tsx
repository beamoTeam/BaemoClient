import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLoginState } from "../lib/recoil/loginState";
import { useHistory } from "react-router";
import userApis from "../lib/api/User/UserApi";
import Spinner from "../components/spinner/Spinner";

export default function ChatList() {
  const history = useHistory();
  const [isLogin] = useLoginState();
  const [chatList, setChatList] = useState<[] | null>(null);

  useEffect(() => {
    console.log(isLogin);
    if (!isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);

  useEffect(() => {
    (async () => {
      const { data } = await userApis.fetchUserChatList();
      console.log(data);
      setChatList(data);
    })();
  }, []);

  if (!chatList) return <Spinner />;
  if (chatList.length === 0) return <h4>No Chat List</h4>;

  return (
    <IonPage style={{ marginBottom: "55px" }}>
      <IonContent fullscreen>
        <IonListHeader>
          <IonLabel>배달 모임</IonLabel>
        </IonListHeader>

        <IonList>
          {chatList.map((chat) => (
            <IonItem>
              <IonLabel>
                <h2>title</h2>
                <h3>desc</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
