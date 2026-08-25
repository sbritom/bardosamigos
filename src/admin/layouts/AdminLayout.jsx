import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  obterSessaoAdmin,
  sairAdmin,
} from "../../services/adminAuthService";

const menu = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/tv", label: "TV", icon: "📺" },
  { to: "/admin/radio", label: "Rádio", icon: "📻" },
  { to: "/admin/football", label: "Futebol", icon: "⚽" },
  { to: "/admin/news", label: "Notícias", icon: "📰" },
  { to: "/admin/users", label: "Usuários", icon: "👤" },
  { to: "/admin/tools", label: "Ferramentas", icon: "🛠️" },
  { to: "/admin/settings", label: "Configurações", icon: "⚙️" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    obterSessaoAdmin().then((sessao) => {
      if (sessao?.username) setUsername(sessao.username);
    });
  }, []);

  async function logout() {
    setSaindo(true);
    await sairAdmin();
    navigate("/admin/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-yellow-500/20 bg-zinc-950 min-h-screen p-4 flex flex-col">
          <Link to="/admin" className="block mb-6">
            <div className="text-2xl font-black">
              🍺 BAR <span className="bar-gold-text">ADMIN</span>
            </div>
            <div className="text-xs text-zinc-500">Painel Administrativo</div>
          </Link>

          <div className="bar-card-soft p-3 mb-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">
              Conectado como
            </div>
            <div className="font-black mt-1">{username}</div>
          </div>

          <nav className="space-y-2 flex-1">
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

          <button
            onClick={logout}
            disabled={saindo}
            className="mt-4 w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-black text-red-300 hover:bg-red-500/20 disabled:opacity-60"
          >
            {saindo ? "Saindo..." : "🚪 Sair"}
          </button>

          <Link
            to="/"
            className="mt-2 text-center text-xs text-zinc-500 hover:text-zinc-300"
          >
            ← Voltar ao site
          </Link>
        </aside>

        <section className="p-6">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
