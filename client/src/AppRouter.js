import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import WalletLogin from "./routes/login/WalletLogin";
import WalletPwd from "./routes/login/WalletPwd";
import WalletConfirm from "./routes/login/WalletConfirm";
import KlipLogin from "./routes/login/KlipLogin";
import Main from "./routes/Main";
import Profile from "./routes/settings/Profile";
import Notification from "./routes/settings/Notification";
import Noti from "./routes/settings/Noti";
import Settings from "./routes/settings/Settings";
import Portfolio from "./routes/Portfolio";
import Share from "./routes/Share";
import ShareConfirm from "./routes/ShareConfirm";
import Login from "./routes/login/Login";
import { LoginConfirm, RedirectIfLoggedIn } from "./components/LoginConfirm";
import SignUp from "./routes/login/SignUp";
import SignUpAgree from "./routes/login/SignUpAgree";
import MintSBT from "./routes/settings/MintSBT";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";
import MenubarLayout from "./components/MenubarLayout";

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
