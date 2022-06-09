import React from "react";
import SideBar from "./SideBar";
import { filterSameMenu } from "../../utils/filter";

function Main({ orders }) {
  if (typeof orders === 'string') orders = [];
  return (
    <div>
      <main className="orders-container">
        <SideBar orderCount={orders?.length} />
        {orders?.map((order, idx) => (
          <OrderCard key={idx} order={order} />
        ))}
      </main>
    </div>
  );
}

function OrderCard({ order }) {
  const { address, payDatetime: time, totalAmount, userOrderList } = order;
  const result = filter1(userOrderList);
  const menuText = filter2(result);
  return (
    <article className="order-info-container">
      <div className="order-info-card">
        <div className="order-time">{`${time[3]}:${time[4]}`}</div>

        <div className="order-menus">
          <section className="info-section">
            <div className="menu-info">
              <span className="total-qt">
                {`[ 메뉴 ${userOrderList.length}개 ]`}{" "}
              </span>
              <span className="total-price">
                {totalAmount.toLocaleString()}원{" "}
              </span>
              <span className="pay-status">( 결제 완료 )</span>
            </div>
            <div className="menus">
              {menuText?.map(x => <>{x}<br key={x}></br></>)}
            </div>
            <div className="order-addr">{address}</div>
          </section>

          <section className="menu-card-section">
            {result?.map((userOrder, idx) => (
              <MenuCard key={idx} seq={idx} userOrder={userOrder} />
            ))}
          </section>
        </div>

        <div className="receipt-btn-section">
          <div className="receipt-btn">주문표 인쇄</div>
          <div className="receipt-btn">접수하기</div>
        </div>
      </div>
    </article>
  );
}

function MenuCard({ seq, userOrder }) {
  return (
    <div className="menu-card">
      <div className="card-title">포장 {seq + 1}</div>
      {userOrder?.map((menu, idx) => {
        return (
          <div key={idx} className="card-content">
            <span>{menu.name}</span>
            <span>x {menu.count}개</span>
          </div>
        );
      })}
    </div>
  );
}
export default Main;

function filter1(userOrderList) {
  const result = [];
  userOrderList.forEach((userOrder) => {
    result.push(filterSameMenu(userOrder.basketMenuList));
  });
  return result;
}

function filter2(result) {
  const totalMenu = {};
  result.forEach((item) => {
    item.forEach((x) => {
      const key = x.name;
      if (!totalMenu[key]) {
        totalMenu[key] = x.count;
      } else {
        totalMenu[key] += x.count;
      }
    });
  });

  return Object.keys(totalMenu).map((x) => `${x} ${totalMenu[x]}개`);
}
