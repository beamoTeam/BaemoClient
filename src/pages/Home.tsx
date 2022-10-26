import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import FoodCategory from "../components/filter/FoodCategory";
import SortFilter from "../components/filter/SortFilter";
import groupOrderService from "../lib/api/GroupOrderService";
import { GroupModel } from "../types/group";
import GroupList from "../components/group/GroupList";
import GroupOrderService from "../lib/api/GroupOrderService";
import useLocalStorage from "../hooks/useLocalStorage";
import { useHistory } from "react-router";
import { useModalState } from "../lib/recoil/modalState";
import LogoutModal from "../components/modal/LogoutModal";
import AlertModal from "../components/modal/AlertModal";

const Home: React.FC = () => {
  const history = useHistory();
  const [, setModal] = useModalState();
  const [groupList, setGroupList] = useState<GroupModel[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await groupOrderService.fetchGroupList();
      setGroupList(data);
    })();
  }, []);

  const enterToGroup = async (c_seq: string, restaurant_seq: string) => {
    const chat_seq = window.localStorage.getItem("CHAT_SEQ");
    if (chat_seq) {
      if (String(chat_seq) !== c_seq) {
        setModal(
          <AlertModal
            message="현재 진행중인 주문이 있습니다.
          취소후 다시 이용해 주세요."
          />
        );
        return;
      }
    }
    try {
      const res = await GroupOrderService.enterGroup(c_seq);
      if (res.status === 200 || res.status === 201) {
        useLocalStorage.set("CHAT_SEQ", c_seq);
        history.push(`restaurant/${restaurant_seq}`);
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setModal(<AlertModal message={err.response.data} />);
      } else if (err.response.status === 401) {
        setModal(<LogoutModal />);
      }
    }
  };

  if (!groupList) return <h4>Loading...</h4>;
  if (groupList.length === 0) return <h4>No group</h4>;

  return (
    <IonPage>
      <IonContent fullscreen>
        <FoodCategory />
        <SortFilter />
        <GroupList groupList={groupList} enterToGroup={enterToGroup} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
