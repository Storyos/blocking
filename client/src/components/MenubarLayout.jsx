import React, { useState } from "react";
import styled from "styled-components";
import { BiHomeSmile, BiCog } from "react-icons/bi";
import { RiApps2AddLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { TbShieldShare } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Menubar = styled.div`
  width: 100vw;
  max-width: 600px;
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

const AddButton = styled.div`
  font-size: 50px;
  color: #50c2c9; /* Add 버튼 색상 */
  cursor: pointer;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 60px; /* AddButton 위쪽에 위치 */
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  width: 150px;
  padding: 10px 0;
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: #333;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function MenubarLayout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMenuSelect = (menu) => {
    setIsDropdownOpen(true); // handleclick이 2번 겹쳐서 실행되므로 true로 설정하면 handleAddButtonClick에서 false로 바꿈
    navigate(`/mintsbt?menu=${encodeURIComponent(menu)}`);
  };

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
        onClick={handleAddButtonClick}
        title="Add"
      >
        <IoIosAddCircle />
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem onClick={() => handleMenuSelect("동아리")}>동아리</DropdownItem>
            <DropdownItem onClick={() => handleMenuSelect("증명서")}>증명서</DropdownItem>
            <DropdownItem onClick={() => handleMenuSelect("비교과 프로그램")}>비교과 프로그램</DropdownItem>
            <DropdownItem onClick={() => handleMenuSelect("학생회")}>학생회</DropdownItem>
          </DropdownMenu>
        )}
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
}
