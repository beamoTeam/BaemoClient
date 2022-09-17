import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import FoodCategory from "../components/filter/FoodCategory";
import SortFilter from "../components/filter/SortFilter";
import Test from "../lib/api/GroupOrderService";
import { GroupModel } from "../types/group";
import GroupList from "../components/group/GroupList";
import FloatButton from "../components/button/FloatButton";

const Home: React.FC = () => {
  const [groupList, setGroupList] = useState<GroupModel[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await Test.fetchGroupList();
      setGroupList(data);
    })();
  }, []);

  if (!groupList) return <h4>Loading...</h4>;
  if (groupList.length === 0) return <h4>No group</h4>;

  return (
    <IonPage>
      <IonContent fullscreen>
        <FoodCategory />
        <SortFilter />
        {/* <Banner /> */}
        <GroupList groupList={groupList} />
      </IonContent>
      <FloatButton />
    </IonPage>
  );
};

export default Home;
