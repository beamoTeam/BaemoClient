import { IonContent, IonPage } from "@ionic/react";
import FoodCategory from "../components/foods/FoodCategory";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonContent>
          <FoodCategory />
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
