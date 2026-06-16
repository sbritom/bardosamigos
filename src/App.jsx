import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BarCoinsPage from "./pages/BarCoinsPage";
import TvPage from "./pages/TvPage";

import RadioTop from "./components/radio/RadioTop";

export default function App() {
  return (
    <BrowserRouter>
      <RadioTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barcoins" element={<BarCoinsPage />} />
        <Route path="/tv" element={<TvPage />} />
      </Routes>
    </BrowserRouter>
  );
}