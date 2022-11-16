import { IonButton, useIonPicker } from "@ionic/react";
import { range } from "../../utils/range";

export default function TimePicker({ setTime }: any) {
  const [present] = useIonPicker();

  const current = new Date();
  const currentHour = current.getHours();
  const currentMinute = current.getMinutes();

  const hours = range(currentHour, 24).map((x) => {
    return { text: x, value: x };
  });

  const minutes = range(0, 60, 5).map((x) => {
    return {
      text: x,
      value: x,
    };
  });

  const openPicker = async () => {
    present({
      columns: [
        {
          name: "hours",
          options: hours,
        },
        {
          name: "minutes",
          options: minutes,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Confirm",
          handler: (value) => {
            const hh = value.hours.text;
            const mm = value.minutes.text;
            if (currentHour === hh) {
              console.log(mm, currentMinute);
              if (mm < currentMinute) {
                return;
              } else {
                setTime(hh, mm);
              }
            } else {
              setTime(hh, mm);
            }
          },
        },
      ],
    });
  };

  return <IonButton style={{padding: "0 5px"}} onClick={openPicker}>선택</IonButton>;
}
