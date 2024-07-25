// MenubarLayout.jsx
import React from 'react';
import styled from 'styled-components';
import { FaHome, FaPlus, FaEnvelope, FaCog } from 'react-icons/fa';
import { CgFileDocument } from 'react-icons/cg'; // 서류 아이콘 추가

const Menubar = styled.div`
  width: 318px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  position: fixed;
  bottom: 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #808080;
  font-size: 20px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #50C2C9; /* 버튼 호버 색상 */
  }
`;

const MenubarLayout = () => {
  return (
    <Menubar>
      <Button title="Home"><FaHome /></Button>
      <Button title="Add"><FaPlus /></Button>
      <Button title="Document"><CgFileDocument /></Button> 
      <Button title="Send"><FaEnvelope /></Button>
      <Button title="Settings"><FaCog /></Button>
    </Menubar>
  );
};

export default MenubarLayout;
