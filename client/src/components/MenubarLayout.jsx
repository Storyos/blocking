// MenubarLayout.jsx
import React from "react";
import styled from "styled-components";
import { BiHomeSmile, BiCog } from "react-icons/bi";
import { RiApps2AddLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { TbShieldShare } from "react-icons/tb";
import { Link } from "react-router-dom";

const Menubar = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  margin-bottom: 5px;
`;

const Button = styled(Link)`
  background: none;
  border: none;
  color: #a2a2a2;
  font-size: 28px;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;

  &:hover {
    color: #50c2c9; /* 버튼 호버 색상 */
  }
`;

const AddButton = styled(Link)`
  font-size: 50px;
  color: #50c2c9; /* Add 버튼 색상 */
`;

const MenubarLayout = () => {
  return (
    <Menubar>
      <Button
        title="Home"
        to={`/`}
      >
        <BiHomeSmile />
      </Button>
      <Button
        title="Document"
        to={`/Portfolio`}
      >
        <RiApps2AddLine />
      </Button>
      <AddButton
        title="Add"
        to="/mintsbt"
      >
        <IoIosAddCircle />
      </AddButton>
      <Button
        title="Send"
        to={"/Share"}
      >
        <TbShieldShare />
      </Button>
      <Button
        title="Settings"
        to={`/Settings`}
      >
        <BiCog />
      </Button>
    </Menubar>
  );
};

export default MenubarLayout;
