import React from "react";
import styled from "styled-components";
import Point from "./Point";
import { useUserSeqState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { userSeq } = useUserSeqState();

  if (!userSeq || userSeq === 'null') navigate("/login", { replace: true });
  return (
    <StWrap>
      <StUserName>{userSeq}</StUserName>
      <StUserEmail>htl0014@icloud.com</StUserEmail>
      <Point />
    </StWrap>
  );
}

export default Profile;

const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.7rem;

  background-color: white;
`;

const StUserName = styled.div`
  font-weight: 600;
  font-size: 1.4rem;

  margin-top: 1rem;
`;

const StUserEmail = styled.div`
  font-weight: 600;
  font-size: 0.9rem;

  margin: 0.5rem 0 4rem 0;
`;
