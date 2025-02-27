import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UploadRelay from "./pages/UploadRelay";
import UploadTickle from "./pages/UploadTickle";
import Alarm from "./pages/Alarm";
import MyPage from "./pages/MyPage";
import Relay from "./pages/relay/Relay";
import RelayLayout from "./pages/relay/RelayLayout";
import Guest from "./pages/Guest";

const ProtectedRoute = ({ element, redirectTo }) => {
  const isLoggedIn = sessionStorage.getItem("userName");
  if (isLoggedIn) {
    return element;
  }
  return <Navigate to={redirectTo} replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute element={<Home />} redirectTo="/guest-login" />
          }
        />

        <Route path="/guest-login" element={<Guest />} />

        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload/relay" element={<UploadRelay />} />
        <Route path="/upload/tickle" element={<UploadTickle />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/relay/:relayId" element={<RelayLayout />}>
          <Route path="tickle/:tickleId" element={<Relay />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
