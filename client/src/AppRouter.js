import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletLogin from "./routes/WalletLogin";
import WalletPwd from "./routes/WalletPwd";
import WalletConfirm from "./routes/WalletConfirm";
import KlipLogin from "./routes/test";
import Main from "./routes/Main";
import MenubarLayout from "./routes/MenubarLayout";
import Profile from "./routes/Profile";

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
          element={<KlipLogin/>}
        />
        <Route
          path="/Main"
          element={<Main />}
        />
        <Route
          path="/MenubarLayout"
          element={<MenubarLayout />}
        />
        <Route
          path="/Profile"
          element={<Profile />}
        />
      </Routes>
    </BrowserRouter>
  );
}
