// MenubarLayout.jsx
import React from 'react';
import styled from 'styled-components';
import { BiHomeSmile, BiCog } from "react-icons/bi";
import { RiApps2AddLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { TbShieldShare } from "react-icons/tb";

const Menubar = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #A2A2A2;
  font-size: 28px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #50C2C9; /* 버튼 호버 색상 */
  }
`;

const AddButton = styled(Button)`
  font-size: 50px;
  color: #50C2C9; /* Add 버튼 색상 */
`;

const MenubarLayout = () => {
  return (
    <Menubar>
      <Button title="Home"><BiHomeSmile /></Button>
      <Button title="Document"><RiApps2AddLine /></Button> 
      <AddButton title="Add"><IoIosAddCircle /></AddButton>
      <Button title="Send"><TbShieldShare /></Button>
      <Button title="Settings"><BiCog /></Button>
    </Menubar>
  );
};

export default MenubarLayout;
