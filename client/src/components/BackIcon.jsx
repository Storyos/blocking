import { VscChevronLeft } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackBtn = styled(VscChevronLeft)`
  position: absolute;
  left: 25px;
  top: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #50c2c9;
  font-size: 20px;
  cursor: pointer;
`;

export default function BackIcon() {
  const navigate = useNavigate();
  return <BackBtn onClick={() => navigate(-1)} />;
}
