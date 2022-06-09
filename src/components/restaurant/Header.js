import React from 'react';

function Header() {
  return (
      <div>
       <header>
        <div className="topMenu">
          <div className="left">
            <ul>
              <li><span className="order">주문접수</span></li>
              <li><span className="store">매장관리</span></li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li><span className="name">홍길동님</span></li>
              <li><span className="point">6,380,000 Point</span></li>
              <li><span className="mypage">내정보</span></li>
              <li><span className="service">고객센터</span></li>
              <li><span className="logout">로그아웃</span></li>
            </ul>
          </div>
        </div>
      </header>

      
    </div>
  );
}

export default Header;