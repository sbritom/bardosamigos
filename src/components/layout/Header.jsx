import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/tv?categoria=Futebol", label: "TV" },
  { to: "/", label: "Rádio" },
  { to: "/", label: "Futebol" },
  { to: "/", label: "Games" },
  { to: "/", label: "Comunidade" },
];

export default function Header() {
  const [tema, setTema] = useState(() => localStorage.getItem("imortal0800-tema") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem("imortal0800-tema", tema);
  }, [tema]);

  return (
    <header className="bar-container py-2">
      <div className="bar-card px-4 py-2.5">
        <div className="flex items-center gap-4 min-h-[54px]">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#173a63] border border-[#4b79a6]/30 flex items-center justify-center text-white font-black text-sm">
              I8
            </div>

            <div>
              <div className="text-xl font-black leading-none tracking-tight">
                IMORTAL<span className="bar-gold-text">0800</span>
              </div>
              <div className="text-[10px] text-zinc-400 font-semibold tracking-[0.16em] uppercase mt-1">
                Portal da comunidade
              </div>
            </div>
          </Link>

          <nav className="flex-1 overflow-x-auto bar-scroll hidden md:block">
            <div className="flex gap-1 min-w-max lg:justify-center">
              {navItems.map((item) => (
                <NavLink
                  key={`${item.label}-${item.to}`}
                  to={item.to}
                  className={({ isActive }) =>
                    `bar-nav-item px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive && item.to === "/" ? "active" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="bar-nav-item px-3 py-2 rounded-lg text-xs font-bold"
              aria-label="Idioma atual"
            >
              PT
            </button>

            <button
              type="button"
              onClick={() => setTema((atual) => (atual === "dark" ? "light" : "dark"))}
              className="bar-nav-item w-10 h-10 rounded-lg flex items-center justify-center"
              aria-label={tema === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
              title={tema === "dark" ? "Modo claro" : "Modo escuro"}
            >
              {tema === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
