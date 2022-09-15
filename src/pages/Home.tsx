import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import FoodCategory from "../components/filter/FoodCategory";
import SortFilter from "../components/filter/SortFilter";
import Test from "../lib/api/GroupOrderService";
import { Group } from "../types/group";
import GroupList from "../components/group/GroupList";

const Home: React.FC = () => {
  const [groupList, setGroupList] = useState<Group[] | null>(null);

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

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={cartOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
