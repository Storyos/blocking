import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletLogin from "./routes/WalletLogin";
import WalletPwd from "./routes/WalletPwd";
import WalletConfirm from "./routes/WalletConfirm";

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
      </Routes>
    </BrowserRouter>
  );
}
