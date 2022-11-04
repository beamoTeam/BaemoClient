import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.Header}>
      <ul className={css.header}>
        <div className={css.tab}>
          <li>주문 관리</li>
          <li>매장 관리</li>
        </div>
        <div className={css.utils}>
          <li>홍길동</li>
          <li>배모 pay</li>
          <li>내정보</li>
        </div>
      </ul>
    </header>
  );
}
