import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import LoginConfirm from "./components/LoginConfirm";
import SignUp from "./routes/login/SignUp";

function Layout() {
  return (
    <div>
      <LoginConfirm>
        <Outlet />
      </LoginConfirm>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인한 사용자만 볼 수 있는 페이지*/}
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path=""
            element={<Main />}
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
        </Route>
        {/* 아래 라우터들은 로그인하지 않고 볼 수 있는 페이지 */}
        <Route
          path="/walletlogin"
          element={<WalletLogin />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/walletlogin"
          element={<WalletLogin />}
        />
        <Route
          path="/walletpwd"
          element={<WalletPwd />}
        />
        <Route
          path="/walletconfirm"
          element={<WalletConfirm />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
}
