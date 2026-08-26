import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recuperarSenhaAdmin } from "../../services/adminAuthService";

export default function AdminRecoverPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("admin");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function redefinir(event) {
    event.preventDefault();
    setErro("");

    if (novaSenha.length < 8) {
      setErro("A nova senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmacao) {
      setErro("A confirmação da nova senha não confere.");
      return;
    }

    setEnviando(true);

    try {
      await recuperarSenhaAdmin(usuario, codigo, novaSenha);
      navigate("/admin/login", {
        replace: true,
        state: {
          message:
            "Senha redefinida com sucesso. Entre com a nova senha. O código de recuperação usado foi invalidado.",
        },
      });
    } catch (error) {
      setErro(error.message || "Não foi possível redefinir a senha.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-bar-bg text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bar-card p-6 md:p-8">
          <div className="text-center mb-7">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-3xl font-black">
              Recuperar <span className="bar-gold-text">acesso</span>
            </h1>
            <p className="text-zinc-400 mt-2">
              Use seu código de recuperação para criar uma nova senha.
            </p>
          </div>

          {erro && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {erro}
            </div>
          )}

          <form onSubmit={redefinir} className="space-y-4">
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
              <span className="block text-sm font-bold mb-2">Código de recuperação</span>
              <input
                value={codigo}
                onChange={(event) => setCodigo(event.target.value.toUpperCase())}
                autoCapitalize="characters"
                spellCheck={false}
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 font-mono tracking-wide outline-none focus:border-yellow-500"
                placeholder="BDA-XXXX-XXXX-XXXX-XXXX"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-bold mb-2">Nova senha</span>
              <input
                type="password"
                value={novaSenha}
                onChange={(event) => setNovaSenha(event.target.value)}
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-bold mb-2">Confirmar nova senha</span>
              <input
                type="password"
                value={confirmacao}
                onChange={(event) => setConfirmacao(event.target.value)}
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
              />
            </label>

            <button
              type="submit"
              disabled={enviando}
              className="bar-gold-btn w-full rounded-xl px-4 py-3 disabled:opacity-60"
            >
              {enviando ? "Redefinindo..." : "Redefinir senha"}
            </button>
          </form>

          <div className="mt-5 rounded-xl border border-yellow-500/15 bg-yellow-500/5 p-3 text-xs text-zinc-400">
            Após 5 códigos incorretos, a recuperação fica bloqueada temporariamente. Um código usado não funciona novamente.
          </div>

          <Link
            to="/admin/login"
            className="mt-5 block text-center text-sm font-bold text-yellow-400 hover:text-yellow-300"
          >
            ← Voltar ao login
          </Link>
        </div>
      </div>
    </main>
  );
}
