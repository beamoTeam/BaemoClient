import css from "./OrderCard.module.css";
import { useCallback, useState } from "react";
import { IonIcon } from "@ionic/react";
import { anonymousName } from "../utils/name";
import { printOutline, chevronDownOutline } from "ionicons/icons";
import { ButtonSpinner } from "../components/spinner/Spinner";

export default function OrderCard({
  order,
  acceptOrder,
  currentTab,
  openReceiptModal,
}: any) {
  const { c_seq, address, userOrderList, totalAmount, payDatetime } = order;
  return (
    <li className={`${css.OrderCard} ${"no-print"}`}>
      <CardTop
        address={address}
        c_seq={c_seq}
        totalAmount={totalAmount}
        payDatetime={payDatetime}
        acceptOrder={acceptOrder}
        currentTab={currentTab}
        openReceiptModal={openReceiptModal}
        len={userOrderList.length}
      />
      <MenuList userOrderList={userOrderList} />
    </li>
  );
}

function CardTop({
  c_seq,
  address,
  len,
  totalAmount,
  payDatetime,
  acceptOrder,
  currentTab,
  openReceiptModal,
}: any) {
  const time = `${payDatetime[3]}:${payDatetime[4]}`;
  const [loading, setLoading] = useState<any>({
    print: false,
    accept: false,
  });

  const requestAccept = async (room_seq: any) => {
    setLoading({ ...loading, accept: true });
    try {
      await acceptOrder(room_seq);
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setLoading({ ...loading, accept: true });
    }
  };

  return (
    <div className={css.orderCardTop}>
      <div className={css.time}>{time}</div>
      <div className={css.orderInfo}>
        <p className={css.orderTop}>
          [ 메뉴 {len}개 ] {totalAmount.toLocaleString()} 원
        </p>
        <p className={css.orderAddr}>{address}</p>
      </div>
      <div className={css.btns}>
        <button className={css.print} onClick={() => openReceiptModal(c_seq)}>
          {loading.print ? (
            <ButtonSpinner />
          ) : (
            <span className={css.printText}>주문표 인쇄</span>
          )}
          <IonIcon icon={printOutline} />
        </button>
        {currentTab === "접수 대기" && (
          <button
            className={css.receiveBtn}
            onClick={() => requestAccept(c_seq)}
          >
            {loading.accept ? <ButtonSpinner /> : <span>주문 접수</span>}
          </button>
        )}
      </div>
    </div>
  );
}

function MenuList({ userOrderList }: any) {
  const [fold, setFold] = useState<boolean>(false);

  const toggleFold = useCallback(() => {
    setFold((prev) => !prev);
  }, []);
  return (
    <>
      <div className={css.Fold} onClick={toggleFold}>
        <IonIcon
          className={fold ? css["foldBtn"] : css["unFoldBtn"]}
          icon={chevronDownOutline}
        ></IonIcon>
        {fold && <span className={css.more}>더보기</span>}
      </div>
      {!fold && (
        <ul className={css.MenuList}>
          {userOrderList.map((userOrder: any) => (
            <MenuCard
              key={userOrder.userName}
              userName={userOrder.userName}
              basketMenuList={userOrder.basketMenuList}
            />
          ))}
        </ul>
      )}
    </>
  );
}

function MenuCard({ userName, basketMenuList }: any) {
  return (
    <li className={css.MenuCard}>
      <h4>{anonymousName(userName)}</h4>
      {basketMenuList.map((menu: any, idx: number) => (
        <div key={idx} className={css.MenuInfo}>
          <span className={css.menuName}>{menu.name}</span>
          <span>
            {" "}
            x <span className={css.count}>{menu.count}</span>
          </span>
        </div>
      ))}
    </li>
  );
}
