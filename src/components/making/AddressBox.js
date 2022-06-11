import React from "react";
import styled from "styled-components";

function AddressBox({ addr, userSelect, setUserSelect }) {
  const { detailAddr, phone } = userSelect;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSelect({
      ...userSelect,
      [name]: value
    });
  };

  return (
    <>
      <StWrap>
        <StHeadingBox>
          <StHeading>수령 장소</StHeading>
        </StHeadingBox>
        <StAddress>{addr}</StAddress>
        <div>
          <StInputWrap>
            <StInput
              name="detailAddr"
              value={detailAddr}
              onChange={handleChange}
              placeholder="상세 주소"
              required
            />
          </StInputWrap>
          <StInputWrap>
            <StInput
              name="phone"
              value={phone}
              onChange={handleChange}
              type="tel"
              placeholder="전화번호"
            />
          </StInputWrap>
        </div>
      </StWrap>
    </>
  );
}

export default AddressBox;

const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;

const StInputWrap = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const StInput = styled.input`
  height: 2rem;
  width: 100%;

  padding: 10px;
  margin: 0.2rem 0;

  background-color: white;

  border: 1px solid #881fc8;
  border-radius: 2px;
`;

const StHeadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StHeading = styled.p`
  font-weight: 600;
  font-size: 1rem;

  margin: 0.5rem 0;
`;

const StAddress = styled.p`
  width: 100%;
  height: auto;

  margin: 1rem 0;

  font-size: 0.9rem;
  font-weight: 500;
`;
// const StChangeBtn = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   width: 2r.5em;
//   height: 1rem;

//   padding: 0.3rem;

//   font-size: 0.6rem;

//   border-radius: 2px;
//   border: 1px solid #881fc8;
// `;
