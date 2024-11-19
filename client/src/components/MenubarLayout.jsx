import React, { useState } from "react";
import styled from "styled-components";
import { BiHomeSmile, BiCog } from "react-icons/bi";
import { RiApps2AddLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { TbShieldShare } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FaRegSmileBeam, FaCertificate, FaBookReader, FaUsers } from "react-icons/fa"; // 아이콘 추가

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
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px 0;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 5px;

  &:hover {
    background-color: #f4fbfc;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  & > svg {
    margin-right: 10px;
    font-size: 20px;
    color: #50c2c9;
  }
`;

export default function MenubarLayout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMenuSelect = (menu) => {
    setIsDropdownOpen(true);
    navigate(`/mintsbt?menu=${encodeURIComponent(menu)}`);
  };

  return (
    <Menubar>
      <Button title="Home" to={`/`}>
        <BiHomeSmile />
      </Button>
      <Button title="Document" to={`/Portfolio`}>
        <RiApps2AddLine />
      </Button>

      <AddButton onClick={handleAddButtonClick} title="Add">
        <IoIosAddCircle />
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem onClick={() => handleMenuSelect("동아리")}>
              <FaRegSmileBeam />
              동아리
            </DropdownItem>
            <DropdownItem onClick={() => handleMenuSelect("증명서")}>
              <FaCertificate />
              증명서
            </DropdownItem>
            <DropdownItem onClick={() => handleMenuSelect("비교과 프로그램")}>
              <FaBookReader />
              비교과 프로그램
            </DropdownItem>
            <DropdownItem onClick={() => handleMenuSelect("학생회")}>
              <FaUsers />
              학생회
            </DropdownItem>
          </DropdownMenu>
        )}
      </AddButton>

      <Button title="Send" to={"/Share"}>
        <TbShieldShare />
      </Button>
      <Button title="Settings" to={`/Settings`}>
        <BiCog />
      </Button>
    </Menubar>
  );
}
