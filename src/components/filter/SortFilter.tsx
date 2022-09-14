import css from "./SortFilter.module.css";

export default function SortFilter() {
  const FILTERS = ["마감시간", "모집인원", "할인율"];

  return (
    <ul className={css.filter}>
      {FILTERS.map((filter) => (
        <li key={filter} className={css.item}>
          <div className={css.label}>{filter}</div>
        </li>
      ))}
    </ul>
  );
}
