import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  entrarAdmin,
  recuperarSenhaAdmin,
} from "../../services/adminAuthService";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [modo, setModo] = useState("login");
  const [usuario, setUsuario] = useState("admin");
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState(location.state?.message || "");
  const [enviando, setEnviando] = useState(false);

  async function entrar(event) {
    event.preventDefault();
    setErro("");
    setMensagem("");
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

  async function recuperar(event) {
    event.preventDefault();
    setErro("");
    setMensagem("");

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
      setSenha("");
      setCodigo("");
      setNovaSenha("");
      setConfirmacao("");
      setModo("login");
      setMensagem(
        "Senha redefinida com sucesso. Entre com a nova senha. O código usado foi invalidado."
      );
    } catch (error) {
      setErro(error.message || "Não foi possível redefinir a senha.");
    } finally {
      setEnviando(false);
    }
  }

  function trocarModo(novoModo) {
    setModo(novoModo);
    setErro("");
    setMensagem("");
  }

  return (
    <main className="min-h-screen bg-bar-bg text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bar-card p-6 md:p-8">
          <div className="text-center mb-7">
            <div className="text-5xl mb-3">{modo === "login" ? "🍺" : "🔐"}</div>
            <h1 className="text-3xl font-black">
              {modo === "login" ? (
                <>
                  BAR <span className="bar-gold-text">ADMIN</span>
                </>
              ) : (
                <>
                  Recuperar <span className="bar-gold-text">acesso</span>
                </>
              )}
            </h1>
            <p className="text-zinc-400 mt-2">
              {modo === "login"
                ? "Acesso restrito ao painel administrativo."
                : "Redefina sua senha sem precisar de e-mail."}
            </p>
          </div>

          {mensagem && (
            <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
              {mensagem}
            </div>
          )}

          {erro && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {erro}
            </div>
          )}

          {modo === "login" ? (
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
          ) : (
            <form onSubmit={recuperar} className="space-y-4">
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
          )}

          <button
            type="button"
            onClick={() => trocarModo(modo === "login" ? "recuperar" : "login")}
            className="mt-4 w-full text-center text-sm font-bold text-yellow-400 hover:text-yellow-300"
          >
            {modo === "login" ? "Esqueci minha senha" : "← Voltar ao login"}
          </button>

          <p className="text-xs text-zinc-500 text-center mt-5">
            O painel usa apenas nome de usuário e senha. Nenhum e-mail é solicitado.
          </p>
        </div>
      </div>
    </main>
  );
}
