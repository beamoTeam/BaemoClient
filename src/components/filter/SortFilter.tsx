import { IonChip } from "@ionic/react";
import css from "./SortFilter.module.css";

export default function SortFilter() {
  const FILTERS = ["마감시간", "모집인원", "할인율"];

  return (
    <div className={css.filter}>
      {FILTERS.map((filter) => (
        <IonChip key={filter} outline={true}>
          {filter}
        </IonChip>
      ))}
    </div>
  );
}
