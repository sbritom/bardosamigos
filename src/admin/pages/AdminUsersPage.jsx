import { useEffect, useState } from "react";
import {
  criarAdministrador,
  listarAdministradores,
  redefinirSenhaAdministrador,
} from "../../services/adminUsersService";

export default function AdminUsersPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novoUsuario, setNovoUsuario] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [resetId, setResetId] = useState(null);
  const [resetSenha, setResetSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [codigoCriado, setCodigoCriado] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setCarregando(true);
    setErro("");

    try {
      setUsuarios(await listarAdministradores());
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrar(event) {
    event.preventDefault();
    setErro("");
    setMensagem("");
    setCodigoCriado("");

    if (novaSenha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmacao) {
      setErro("A confirmação da senha não confere.");
      return;
    }

    try {
      const resultado = await criarAdministrador(novoUsuario, novaSenha);
      setNovoUsuario("");
      setNovaSenha("");
      setConfirmacao("");
      setCodigoCriado(resultado.recoveryCode || "");
      setMensagem(
        resultado.warning ||
          "Administrador cadastrado com sucesso. Guarde o código de recuperação exibido abaixo."
      );
      await carregar();
    } catch (error) {
      setErro(error.message);
    }
  }

  async function redefinir(userId) {
    setErro("");
    setMensagem("");

    if (resetSenha.length < 8) {
      setErro("A nova senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    try {
      await redefinirSenhaAdministrador(userId, resetSenha);
      setResetId(null);
      setResetSenha("");
      setMensagem("Senha redefinida com sucesso.");
    } catch (error) {
      setErro(error.message);
    }
  }

  async function copiarCodigo() {
    if (!codigoCriado) return;
    try {
      await navigator.clipboard.writeText(codigoCriado);
      setMensagem("Código copiado. Entregue-o ao novo administrador e oriente-o a guardar em local seguro.");
    } catch {
      setMensagem("Copie o código manualmente e entregue-o ao novo administrador.");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-black bar-gold-text mb-2">👤 Usuários</h1>
      <p className="text-zinc-400 mb-6">
        Cadastre e gerencie administradores usando apenas nome de usuário e senha.
      </p>

      {mensagem && (
        <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
          {mensagem}
        </div>
      )}

      {codigoCriado && (
        <div className="mb-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
          <div className="text-sm font-black text-yellow-300 mb-2">Código de recuperação do novo administrador</div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 rounded-xl border border-yellow-500/25 bg-black px-4 py-3 font-mono text-lg tracking-wider text-yellow-300 break-all">
              {codigoCriado}
            </div>
            <button
              type="button"
              onClick={copiarCodigo}
              className="rounded-xl border border-yellow-500/25 px-4 py-3 font-bold hover:border-yellow-500"
            >
              Copiar
            </button>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Esse código serve para recuperar a conta sem e-mail. Guarde-o em local seguro.
          </p>
        </div>
      )}

      {erro && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {erro}
        </div>
      )}

      <div className="grid xl:grid-cols-[420px_1fr] gap-4">
        <form onSubmit={cadastrar} className="bar-card p-5 h-fit">
          <h2 className="font-black bar-gold-text mb-4">Novo administrador</h2>

          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-bold mb-2">Nome de usuário</span>
              <input
                value={novoUsuario}
                onChange={(event) => setNovoUsuario(event.target.value)}
                autoCapitalize="none"
                spellCheck={false}
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                placeholder="ex.: gian"
              />
              <span className="block text-xs text-zinc-500 mt-2">
                3 a 32 caracteres. Use letras, números, ponto, hífen ou sublinhado.
              </span>
            </label>

            <label className="block">
              <span className="block text-sm font-bold mb-2">Senha</span>
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
              <span className="block text-sm font-bold mb-2">Confirmar senha</span>
              <input
                type="password"
                value={confirmacao}
                onChange={(event) => setConfirmacao(event.target.value)}
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
              />
            </label>

            <button type="submit" className="bar-gold-btn w-full rounded-xl px-4 py-3">
              Cadastrar administrador
            </button>
          </div>
        </form>

        <section className="bar-card p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="font-black bar-gold-text">Administradores cadastrados</h2>
            <button
              onClick={carregar}
              className="rounded-xl border border-yellow-500/25 px-3 py-2 text-xs font-bold hover:border-yellow-500"
            >
              Atualizar
            </button>
          </div>

          {carregando ? (
            <div className="text-zinc-400">Carregando...</div>
          ) : (
            <div className="space-y-3">
              {usuarios.map((usuario) => (
                <div key={usuario.id} className="bar-card-soft p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="font-black">{usuario.username}</div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {usuario.role === "super_admin" ? "Super administrador" : "Administrador"}
                        {usuario.lastSignInAt
                          ? ` • último acesso ${new Date(usuario.lastSignInAt).toLocaleString("pt-BR")}`
                          : " • ainda não acessou"}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setResetId(resetId === usuario.id ? null : usuario.id);
                        setResetSenha("");
                      }}
                      className="rounded-xl border border-yellow-500/25 px-3 py-2 text-xs font-bold hover:border-yellow-500"
                    >
                      Redefinir senha
                    </button>
                  </div>

                  {resetId === usuario.id && (
                    <div className="mt-4 flex flex-col md:flex-row gap-2">
                      <input
                        type="password"
                        value={resetSenha}
                        onChange={(event) => setResetSenha(event.target.value)}
                        autoComplete="new-password"
                        className="flex-1 rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                        placeholder="Nova senha (mínimo 8 caracteres)"
                      />
                      <button
                        onClick={() => redefinir(usuario.id)}
                        className="bar-gold-btn rounded-xl px-4 py-3"
                      >
                        Salvar nova senha
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {usuarios.length === 0 && (
                <div className="text-zinc-500">Nenhum administrador encontrado.</div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
