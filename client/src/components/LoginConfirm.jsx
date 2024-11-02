// 로그인하지 않은 사용자는 login 페이지로 리디렉션
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function LoginConfirm({ children }) {
  const user = auth.currentUser;
  console.log('user :>> ', user);
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
