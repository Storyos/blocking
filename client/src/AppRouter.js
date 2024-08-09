import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletLogin from "./routes/login/WalletLogin";
import WalletPwd from "./routes/login/WalletPwd";
import WalletConfirm from "./routes/login/WalletConfirm";
import KlipLogin from "./routes/login/KlipLogin";
import Main from "./routes/Main";
// import MenubarLayout from "./components/MenubarLayout";
import Profile from "./routes/settings/Profile";
import Notification from "./routes/settings/Notification";
import Settings from "./routes/settings/Settings";
import Portfolio from "./routes/Portfolio";
import Share from "./routes/Share";
import ShareConfirm from "./routes/ShareConfirm";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
          path="/test"
          element={<KlipLogin />}
        />
        <Route
          path="/Main"
          element={<Main />}
        />
        {/* <Route
          path="/MenubarLayout"
          element={<MenubarLayout />}
        /> */}
        <Route
          path="/Settings"
          element={<Settings />}
        />
        <Route
          path="/Profile"
          element={<Profile />}
        />
        <Route
          path="/Notification"
          element={<Notification />}
        />
        <Route
          path="/KlipLogin"
          element={<KlipLogin />}
        />
        <Route
          path="/Portfolio"
          element={<Portfolio />}
        />
        <Route
          path="/Share"
          element={<Share />}
        />
        <Route
          path="/ShareConfirm"
          element={<ShareConfirm />}
        />
      </Routes>
    </BrowserRouter>
  );
}
