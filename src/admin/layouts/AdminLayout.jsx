import { Link, NavLink, Outlet } from "react-router-dom";

const menu = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/tv", label: "TV", icon: "📺" },
  { to: "/admin/radio", label: "Rádio", icon: "📻" },
  { to: "/admin/football", label: "Futebol", icon: "⚽" },
  { to: "/admin/news", label: "Notícias", icon: "📰" },
  { to: "/admin/tools", label: "Ferramentas", icon: "🛠️" },
  { to: "/admin/settings", label: "Configurações", icon: "⚙️" },
];

export default function AdminLayout() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-yellow-500/20 bg-zinc-950 min-h-screen p-4">
          <Link to="/" className="block mb-6">
            <div className="text-2xl font-black">
              🍺 BAR <span className="bar-gold-text">ADMIN</span>
            </div>
            <div className="text-xs text-zinc-500">
              Painel Administrativo
            </div>
          </Link>

          <nav className="space-y-2">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bar-gold-btn"
                      : "bg-black border border-yellow-500/10 hover:border-yellow-500"
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="p-6">
          <Outlet />
        </section>
      </div>
    </main>
  );
}