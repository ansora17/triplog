import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import TourPlanner from "./pages/course/TourPlanner.jsx";
import "./assets/index.css"; // 스타일시트 추가
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tour" element={<TourPlanner />} />
    </Routes>
  </BrowserRouter>
);
