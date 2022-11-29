import React, { useEffect, useState, useRef, useCallback } from "react";
import { IonContent, IonPage } from "@ionic/react";
import FoodCategory from "../components/filter/FoodCategory";
import groupOrderService from "../lib/api/GroupOrderService";
import { GroupModel } from "../types/group";
import GroupList from "../components/group/GroupList";
import GroupOrderService from "../lib/api/GroupOrderService";
import useLocalStorage from "../hooks/useLocalStorage";
import { useHistory, useLocation } from "react-router";
import { useModalState } from "../lib/recoil/modalState";
import AlertModal from "../components/modal/AlertModal";
import Spinner from "../components/spinner/Spinner";
import ConfirmModal from "../components/modal/ConfirmModal";
import { KAKAO_LOGIN_LINK } from "../utils/contants";

const Home: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [, setModal] = useModalState();
  const [groupList, setGroupList] = useState<GroupModel[] | null>(null);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const currentGroup = window.localStorage.getItem("CHAT_SEQ");
  const groupRef = useRef<any>(null);
  const savedCallback = useRef<any>();

  const intervalTest = useCallback(async () => {
    try {
      const data = await groupOrderService.fetchGroupList();
      console.log("*** :: ", { data });
      if (groupRef.current === JSON.stringify(data)) {
        return;
      }

      groupRef.current = JSON.stringify(data);
      setGroupList(data);
    } catch (err: any) {
      console.error(err);
      alert("배달 모임을 불러오는데 실패했습니다. 새로고침 후 다시 시도해주세요.");
    }
  }, []);

  useEffect(() => {
    // savedCallback.current = intervalTest;
    intervalTest();
  }, [intervalTest]);

  // useEffect(() => {
  //   const tick = savedCallback.current;
  //   const timerId = setInterval(tick, 5000);

  //   return () => clearInterval(timerId);
  // }, []);

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
    <IonPage style={{ marginBottom: "55px", background: "white" }}>
      <IonContent fullscreen>
        <FoodCategory currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        {/* <SortFilter /> */}
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
