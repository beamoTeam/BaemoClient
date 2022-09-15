import css from "./FoodCategory.module.css";

export default function FoodCategory() {
  const foodCategories: string[] = [
    "치킨",
    "피자",
    "중식",
    "한식",
    "카페",
    "일식",
    "분식",
    "양식",
    "괴식",
  ];

  return (
    <ul className={css.foodCategory}>
      {foodCategories.map((category) => (
        <li key={category} className={css.item}>
          <div className={css.label}>{category}</div>
        </li>
      ))}
    </ul>
  );
}
