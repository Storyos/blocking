import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { LoginConfirm, RedirectIfLoggedIn } from "./components/LoginConfirm";
import MenubarLayout from "./components/MenubarLayout";
import KlipLogin from "./routes/login/KlipLogin";
import Login from "./routes/login/Login";
import SignUp from "./routes/login/SignUp";
import SignUpAgree from "./routes/login/SignUpAgree";
import WalletConfirm from "./routes/login/WalletConfirm";
import WalletLogin from "./routes/login/WalletLogin";
import WalletPwd from "./routes/login/WalletPwd";
import Main from "./routes/Main";
import Portfolio from "./routes/Portfolio";
import MintSBT from "./routes/settings/MintSBT";
import Noti from "./routes/settings/Noti";
import Notification from "./routes/settings/Notification";
import Profile from "./routes/settings/Profile";
import Settings from "./routes/settings/Settings";
import Share from "./routes/Share";
import ShareConfirm from "./routes/ShareConfirm";

function AnimatedRoutes() {
  const location = useLocation(); // BrowserRouter 내부에서 useLocation 사용

  return (
    // <TransitionGroup>
    //   <CSSTransition
    //     key={location.pathname} // location에 따라 애니메이션 처리
    //     classNames="slide" // CSS 클래스 이름
    //     timeout={300} // 애니메이션 시간 (ms)
    //   >
    <Routes location={location}>
      {/* 로그인한 사용자만 볼 수 있는 페이지*/}
      {/* main에서만 메뉴바 제거 */}
      <Route
        path="/"
        element={
          <LoginConfirm>
            <Outlet />
          </LoginConfirm>
        }
      >
        <Route
          path=""
          element={<Main />}
        />
      </Route>
      <Route
        path="/"
        element={
          <LoginConfirm>
            <MenubarLayout />
            <Outlet />
          </LoginConfirm>
        }
      >
        <Route
          path="/walletpwd"
          element={<WalletPwd />}
        />
        <Route
          path="/walletconfirm"
          element={<WalletConfirm />}
        />
        <Route
          path="kliplogin"
          element={<KlipLogin />}
        />
        <Route
          path="profile"
          element={<Profile />}
        />
        <Route
          path="notification"
          element={<Notification />}
        />
        <Route
          path="noti"
          element={<Noti />}
        />
        <Route
          path="settings"
          element={<Settings />}
        />
        <Route
          path="portfolio"
          element={<Portfolio />}
        />
        <Route
          path="share"
          element={<Share />}
        />
        <Route
          path="shareconfirm"
          element={<ShareConfirm />}
        />
        <Route
          path="mintsbt"
          element={<MintSBT />}
        />
      </Route>

      {/* 로그인하지 않은 사용자들이 볼 수 있는 페이지 */}
      <Route
        path="/"
        element={
          <RedirectIfLoggedIn>
            <Outlet />
          </RedirectIfLoggedIn>
        }
      >
        <Route
          path="/walletlogin"
          element={<WalletLogin />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/signupagree"
          element={<SignUpAgree />}
        />
      </Route>
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
