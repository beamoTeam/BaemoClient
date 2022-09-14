import {
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonNote,
  IonBadge,
} from "@ionic/react";

const ListContainer: React.FC = () => {
  return (
    <IonList>
      <IonItem routerLink="/home">
        <IonCheckbox slot="start" />
        <IonLabel>
          <h1>Home</h1>
          <IonNote>Run Idea by Brandy</IonNote>
        </IonLabel>
        <IonBadge color="success" slot="end">
          5 Days
        </IonBadge>
      </IonItem>
    </IonList>
  );
};

export default ListContainer;
