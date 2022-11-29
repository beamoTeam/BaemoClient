import { anonymousName } from "../../utils/name";
import css from "./ReceiptModal.module.css";

export default function ReceiptModal({
  toggleReceipt,
  printReceipt,
  receiptItems,
}: any) {
  if (!receiptItems) {
    return null;
  }

  const { address, c_seq, payDatetime, userOrderList } = receiptItems;
  const deliveryPrice = parseInt(String(3000 / userOrderList.length));
  const dateTime = `${payDatetime[0]}-${payDatetime[1]}-${payDatetime[2]} ${payDatetime[3]}:${payDatetime[4]}:${payDatetime[5]}`;

  const testData = userOrderList.map((order: any) => {
    return {
      userName: order.userName,
      basketMenuList: order.basketMenuList,
      totalPrice: order.basketMenuList.reduce(
        (acc: any, curr: any) => (acc += curr.count * curr.price),
        0
      ),
    };
  });

  return (
    <div className={css.modalContainer}>
      <div className={css.overlay} onClick={toggleReceipt}></div>
      <div className={css.modal}>
        <div id="modal-content">
          {testData.map((userOrder: any) => (
            <div key={userOrder.userName}>
              <div className={css.modalTop}>배 달 주 문[배모] ( {anonymousName(userOrder.userName)} )</div>
              <div className={css.modalBody}>
                <div className={css.addrInfo}>
                  <p>주소 : </p>
                  <p>{address}</p>
                </div>
                <div>
                  {/* map */}
                  {userOrder.basketMenuList.map((menu: any, idx: number) => (
                    <div className={css.menuInfo} key={idx}>
                      <span>{menu.name}</span>
                      <span>{menu.count}</span>
                      <span>{(menu.count * menu.price).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className={css.menuInfo}>
                    <span>기타(배달팁)</span>
                    <span>1</span>
                    <span>{deliveryPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div className={css.price}>
                  <span>합계금액</span>
                  <span>
                    {(deliveryPrice + userOrder.totalPrice).toLocaleString()}
                  </span>
                </div>
                <div className={css.orderInfo}>
                  <p>주문번호 : {c_seq}</p>
                  <p>{dateTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="no-print">
          <div className={css.modalFooter}>
            <button className={css.cancel} onClick={toggleReceipt}>
              취소
            </button>
            <button className={css.print} onClick={printReceipt}>
              출력
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
