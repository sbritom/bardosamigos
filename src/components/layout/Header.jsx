import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/tv?categoria=Futebol", label: "TV", icon: "📺" },
  { to: "/", label: "Chat", icon: "💬" },
  { to: "/", label: "Rádio", icon: "📻" },
  { to: "/", label: "Futebol", icon: "⚽" },
  { to: "/", label: "Notícias", icon: "📰" },
  { to: "/", label: "Ferramentas", icon: "🛠️" },
  { to: "/", label: "Games", icon: "🎮" },
  { to: "/", label: "Comunidade", icon: "👥" },
];

export default function Header() {
  return (
    <header className="bar-container py-3">
      <div className="bar-card px-4 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="text-4xl">🍺</div>

            <div>
              <div className="text-2xl font-black leading-none">
                BAR DOS <span className="bar-gold-text">AMIGOS</span>
              </div>
              <div className="text-xs text-zinc-400 font-semibold">
                DESDE 2016 • TECH PUB
              </div>
            </div>
          </Link>

          <nav className="flex-1 overflow-x-auto bar-scroll">
            <div className="flex gap-2 min-w-max lg:justify-center">
              {navItems.map((item) => (
                <NavLink
                  key={`${item.label}-${item.to}`}
                  to={item.to}
                  className={({ isActive }) =>
                    `bar-nav-item px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive && item.to === "/" ? "active" : ""
                    }`
                  }
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="hidden xl:flex items-center gap-3 text-sm text-zinc-300">
            <span>🟢 Online</span>
            <span>🔎</span>
          </div>
        </div>
      </div>
    </header>
  );
}