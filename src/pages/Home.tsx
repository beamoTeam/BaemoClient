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
import AlertModal from "../components/modal/AlertModal";
import Spinner from "../components/spinner/Spinner";
import ConfirmModal from "../components/modal/ConfirmModal";
import { KAKAO_LOGIN_LINK } from "../utils/contants";

const Home: React.FC = () => {
  const history = useHistory();
  const [, setModal] = useModalState();
  const [groupList, setGroupList] = useState<GroupModel[] | null>(null);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const currentGroup = window.localStorage.getItem("CHAT_SEQ");

  useEffect(() => {
    (async () => {
      const data = await groupOrderService.fetchGroupList();
      setGroupList(data);
    })();
  }, []);

  const enterToGroup = async (c_seq: number, restaurant_seq: number) => {
    try {
      const res = await GroupOrderService.enterGroup(c_seq);
      if (res.status <= 201) {
        useLocalStorage.set("CHAT_SEQ", JSON.stringify(c_seq));
        history.push(`restaurant/${restaurant_seq}`);
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setModal(<AlertModal message={err.response.data} />);
        return;
      }
      if (err.response.status === 401) {
        setModal(
          <ConfirmModal
            message={"로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?"}
            onCancel={() => setModal(null)}
            onConfirm={() => (window.location.href = KAKAO_LOGIN_LINK)}
          />
        );
        return;
      }
    }
  };

  if (!groupList) return <Spinner />;
  if (groupList.length === 0) return <h4>No group</h4>;

  let test;
  if (currentCategory) {
    if (currentCategory === "전체") {
      test = groupList;
    }
    else {
      test = groupList.filter(x => x.restaurant.category === currentCategory);
    }
  }
  else {
    test = groupList;
  }

  return (
    <IonPage style={{ marginBottom: "55px" }}>
      <IonContent fullscreen>
        <FoodCategory currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        <SortFilter />
        <GroupList
          groupList={test}
          enterToGroup={enterToGroup}
          currentGroup={currentGroup}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
