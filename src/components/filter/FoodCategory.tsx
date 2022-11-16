import css from "./FoodCategory.module.css";

interface FoodCategoryProps {
  currentCategory: string;
  setCurrentCategory: (value: string) => void;
}

export default function FoodCategory({ currentCategory, setCurrentCategory}: FoodCategoryProps) {
  const foodCategories: string[] = [
    "전체",
    "치킨",
    "피자",
    "햄버거",
    "한식",
    "중식",
    "일식",
    "양식",
    "카페",
  ];

  return (
    <ul className={css.foodCategory}>
      {foodCategories.map((category) => (
        <li key={category} className={`${css.item} ${category === currentCategory ? css["currCategory"] : ""}`} onClick={() => setCurrentCategory(category)}>
          <div className={css.label}>{category}</div>
        </li>
      ))}
    </ul>
  );
}
