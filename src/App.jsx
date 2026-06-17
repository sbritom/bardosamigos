import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BarCoinsPage from "./pages/BarCoinsPage";
import TvPage from "./pages/TvPage";

import RadioTop from "./components/radio/RadioTop";
import Header from "./components/layout/Header";

import "./styles/theme.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bar-bg text-white">
        <RadioTop />

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/barcoins" element={<BarCoinsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}