import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import BarCoinsPage from "./pages/BarCoinsPage";
import TvPage from "./pages/TvPage";
import BarStudioPage from "./pages/BarStudioPage";
import EditorFotosPage from "./pages/EditorFotosPage";

import RadioTop from "./components/radio/RadioTop";
import Header from "./components/layout/Header";

import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminTvPage from "./admin/pages/AdminTvPage";
import AdminPlaceholder from "./admin/pages/AdminPlaceholder";

import "./styles/theme.css";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-bar-bg text-white">
      <RadioTop />

      {!isAdmin && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/barcoins" element={<BarCoinsPage />} />
        <Route path="/barstudio" element={<BarStudioPage />} />
        <Route path="/editor-fotos" element={<EditorFotosPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="tv" element={<AdminTvPage />} />
          <Route
            path="radio"
            element={
              <AdminPlaceholder
                title="📻 Rádio"
                description="Programação, AutoDJ, pedidos e rádio própria."
              />
            }
          />
          <Route
            path="football"
            element={
              <AdminPlaceholder
                title="⚽ Futebol"
                description="Competições, partidas, cache e integrações."
              />
            }
          />
          <Route
            path="news"
            element={
              <AdminPlaceholder
                title="📰 Notícias"
                description="Fontes, categorias, RSS e destaques."
              />
            }
          />
          <Route
            path="tools"
            element={
              <AdminPlaceholder
                title="🛠️ Ferramentas"
                description="BarStudio, conversores, uploads e IA."
              />
            }
          />
          <Route
            path="settings"
            element={
              <AdminPlaceholder
                title="⚙️ Configurações"
                description="Tema, módulos, providers, APIs e cache."
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}