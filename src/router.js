import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Alarm from "./pages/Alarm";
import MyPage from "./pages/MyPage";
import BottomTab from "./components/BottomTab"; // BottomTab 컴포넌트 불러오기

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <BottomTab />
    </Router>
  );
};

export default AppRouter;
