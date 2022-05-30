import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const Postcode = ({handleToggle}) => {
  const handleClose = () => {
    console.log("검색 종료시 api 요청");
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <>
      <StWrap onClick={handleToggle} />
      <DaumPostcode
        onComplete={handleComplete}
        onClose={handleClose}
        style={styles}
      />
    </>
  );
};

const styles = {
  position: "absolute",
  marginTop: "50px",
  height: "82vh",
  top: 70,
  left: 0,
  zIndex: 12,
  paddingTop: "5px",
  backgroundColor: "white",
  borderRadius: "5px",
};

const StWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.7;
  z-index: 11;
`;

export default Postcode;
