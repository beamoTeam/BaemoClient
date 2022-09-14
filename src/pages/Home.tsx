import { IonContent, IonPage } from "@ionic/react";
import FoodCategory from "../components/filter/FoodCategory";
import SortFilter from "../components/filter/SortFilter";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FoodCategory />
        <SortFilter />
      </IonContent>
    </IonPage>
  );
};

export default Home;
