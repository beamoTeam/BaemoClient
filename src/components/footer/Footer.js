import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCommentAdd } from "react-icons/bi";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { IoMdHome, IoMdListBox, IoMdPerson } from "react-icons/io";

const NAV = [
  { title: "홈", icon: <IoMdHome />, url: "/" },
  { title: "채팅", icon: <BsChatLeftDotsFill />, url: "/chatting" },
  { title: "방만들기", icon: <BiCommentAdd />, url: "/create" },
  { title: "주문내역", icon: <IoMdListBox />, url: "/history" },
  { title: "프로필", icon: <IoMdPerson />, url: "/profile" },
];

function Footer() {
  return (
    <StFooter>
      {NAV.map((nav) => (
        <StLi key={nav.title}>
          <Link to={nav.url}>
            {nav.icon}
            <StP>{nav.title}</StP>
          </Link>
        </StLi>
      ))}
    </StFooter>
  );
}

const StFooter = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 3rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: white;

  z-index: 10;
`;

const StLi = styled.li`
  font-size: 1.2rem;
  text-align: center;
`;

const StP = styled.span`
  display: block;
  font-size: 0.6rem;
`;

export default Footer;
