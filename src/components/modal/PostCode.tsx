import DaumPostcodeEmbed from "react-daum-postcode";
import { IonLabel } from "@ionic/react";

// interface PostCodeProps {
//   onComplete: () => any;
// }

export default function PostCode({ onComplete }: any) {
  return (
    <div className="ion-margin-top">
      <IonLabel>
        <DaumPostcodeEmbed onComplete={onComplete} />
      </IonLabel>
    </div>
  );
}
