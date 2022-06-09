import React from "react";

function SideBar({ orderCount }) {

  return (
    <>
      <aside className="order-type-container">
        <div className="order-type-card">
          <div>접수 대기</div>
          <div>{orderCount}</div>
          <div className="new-alert">new</div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
