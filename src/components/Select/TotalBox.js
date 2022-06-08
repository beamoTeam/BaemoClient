import React from "react";
import styled from "styled-components";
import { addMenuToCart } from "../../api";
import { useChatSeqState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

function TotalBox({ menuInfo }) {
  const navigate = useNavigate();
  const { chatSeq } = useChatSeqState();
  const { count, price } = menuInfo;

  const addToCart = async (u_seq, c_seq, data) => {
    try {
      await addMenuToCart(u_seq, c_seq, data);
      navigate(-1, { replace: true });
    } catch (err) {
      throw new Error(`${err} - 장바구니에 메뉴 담을때 에러`);
    }
  };

  return (
    <StTotalWrap>
      <StTotalText>
        <p>총 주문금액</p>
        <p>{((count + 1) * price).toLocaleString()}원</p>
      </StTotalText>
      <StMinPrice>최소주문금액 16,000원</StMinPrice>
      <div>
        <StAddToCartBtn onClick={() => addToCart(1, chatSeq, menuInfo)}>
          장바구니에 추가
        </StAddToCartBtn>
      </div>
    </StTotalWrap>
  );
}

export default TotalBox;

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  margin-top: 0.18rem;

  background-color: white;
`;

const StTotalText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 600;
  font-size: 1.1rem;
`;

const StMinPrice = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 0;

  text-align: center;

  font-weight: 600;
  font-size: 0.8rem;
  color: #929292;
`;

const StAddToCartBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #881fc8;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 0;

  border-radius: 2px;
`;
