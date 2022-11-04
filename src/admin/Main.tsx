import OrderCard from "./OrderCard";
import css from "./Main.module.css";

export default function Main({
  orders,
  currentTab,
  acceptOrder,
  openReceiptModal,
}: any) {
  return (
    <div className={css.Main}>
      <ul className={css.orderCardList}>
        {orders.length === 0 ? (
          <h4>주문이 없습니다.</h4>
        ) : (
          orders.map((order: any) => (
            <OrderCard
              key={order.c_seq}
              order={order}
              acceptOrder={acceptOrder}
              currentTab={currentTab}
              openReceiptModal={openReceiptModal}
            />
          ))
        )}
      </ul>
    </div>
  );
}
