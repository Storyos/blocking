import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotificationIcon = styled(Link)`
  position: absolute;
  right: 10px;
  top: 0px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #50c2c9;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default function NotifyIcon() {
  return (
    <NotificationIcon to="/Notification">
      <FaBell />
    </NotificationIcon>
  );
}
