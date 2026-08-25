import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  entrarAdmin,
  obterSessaoAdmin,
} from "../../services/adminAuthService";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    obterSessaoAdmin().then((sessao) => {
      if (sessao) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  async function entrar(event) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await entrarAdmin(usuario, senha);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (error) {
      setErro(error.message || "Não foi possível entrar.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-bar-bg text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bar-card p-6 md:p-8">
          <div className="text-center mb-7">
            <div className="text-5xl mb-3">🍺</div>
            <h1 className="text-3xl font-black">
              BAR <span className="bar-gold-text">ADMIN</span>
            </h1>
            <p className="text-zinc-400 mt-2">
              Acesso restrito ao painel administrativo.
            </p>
          </div>

          {location.state?.message && (
            <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
              {location.state.message}
            </div>
          )}

          {erro && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {erro}
            </div>
          )}

          <form onSubmit={entrar} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-bold mb-2">Usuário</span>
              <input
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                placeholder="admin"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-bold mb-2">Senha</span>
              <input
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                placeholder="Sua senha"
              />
            </label>

            <button
              type="submit"
              disabled={enviando}
              className="bar-gold-btn w-full rounded-xl px-4 py-3 disabled:opacity-60"
            >
              {enviando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-xs text-zinc-500 text-center mt-5">
            O painel usa apenas nome de usuário e senha. Nenhum e-mail é solicitado.
          </p>
        </div>
      </div>
    </main>
  );
}
