import React from 'react';
import "./restaurant.css"
function Header() {
  return (
    <div>
       <header>
        <div className="topMenu">
          <div className="left">
            <ul>
              <li><a href="#" className="order">주문접수</a></li>
              <li><a href="#" className="store">매장관리</a></li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li><a href="#" className="name">홍길동님</a></li>
              <li><a href="#" className="point">6,380,000 Point</a></li>
              <li><a href="#" className="mypage">내정보</a></li>
              <li><a href="#" className="service">고객센터</a></li>
              <li><a href="#" className="logout">로그아웃</a></li>
            </ul>
          </div>
        </div>
      </header>
      <main className="orders-container">
        <aside className="order-type-container">
          <div className="order-type-card">
            <div>접수 대기</div>
            <div>5</div>
            <div className="new-alert">new</div>
          </div>
        </aside>

        <article className="order-info-container">
          <div className="order-info-card">
            <div className="order-time">13:22</div>

            <div className="order-menus">
              <section className="info-section">
                <div className="menu-info">
                  <span className="total-qt">[ 메뉴 4개 ]</span>
                  <span className="total-price">31,800원</span>
                  <span className="pay-status">결제 완료</span>
                </div>
                <div className="menus">
                  환금올리브치킨 2개 / 황금올리브 반반 2개 / 콜라 1.25L 4개
                </div>
                <div className="order-addr">
                  전라남도 무안군 청계면 승달산길 91, 참좋은집 000호
                </div>
              </section>

              <section className="menu-card-section">
                <div className="menu-card">
                  <div className="card-title">포장 1</div>
                  <div className="card-content">
                    <span>황금올리브치킨</span><span>x 1개</span>
                  </div>
                </div>
              </section>
            </div>

            <div className="receipt-btn-section">
              <div className="receipt-btn">주문표 인쇄</div>
              <div className="receipt-btn">접수하기</div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default Header;