import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  alterarMinhaSenha,
  obterSessaoAdmin,
  sairAdmin,
} from "../../services/adminAuthService";
import { gerarCodigoRecuperacao } from "../../services/adminUsersService";

export default function AdminSettingsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [codigoRecuperacao, setCodigoRecuperacao] = useState("");
  const [gerandoCodigo, setGerandoCodigo] = useState(false);
  const [mensagemCodigo, setMensagemCodigo] = useState("");

  useEffect(() => {
    obterSessaoAdmin().then((sessao) => {
      if (sessao?.username) setUsername(sessao.username);
    });
  }, []);

  async function salvar(event) {
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

    if (senhaAtual === novaSenha) {
      setErro("Escolha uma senha diferente da atual.");
      return;
    }

    setSalvando(true);

    try {
      await alterarMinhaSenha(senhaAtual, novaSenha);
      await sairAdmin();
      navigate("/admin/login", {
        replace: true,
        state: { message: "Senha alterada. Entre novamente com a nova senha." },
      });
    } catch (error) {
      setErro(error.message || "Não foi possível alterar a senha.");
      setSalvando(false);
    }
  }

  async function gerarCodigo() {
    setMensagemCodigo("");
    setGerandoCodigo(true);

    try {
      const data = await gerarCodigoRecuperacao();
      setCodigoRecuperacao(data.recoveryCode || "");
      setMensagemCodigo(
        "Novo código gerado. O código anterior deixou de funcionar. Guarde este código em local seguro."
      );
    } catch (error) {
      setMensagemCodigo(error.message || "Não foi possível gerar o código.");
    } finally {
      setGerandoCodigo(false);
    }
  }

  async function copiarCodigo() {
    if (!codigoRecuperacao) return;
    try {
      await navigator.clipboard.writeText(codigoRecuperacao);
      setMensagemCodigo("Código copiado. Guarde-o em local seguro.");
    } catch {
      setMensagemCodigo("Copie o código manualmente e guarde-o em local seguro.");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-black bar-gold-text mb-2">⚙️ Configurações</h1>
      <p className="text-zinc-400 mb-6">
        Segurança e preferências da sua conta administrativa.
      </p>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className="bar-card p-5">
          <h2 className="font-black bar-gold-text mb-4">Conta</h2>

          <div className="bar-card-soft p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">Usuário</div>
            <div className="text-xl font-black mt-1">{username}</div>
            <p className="text-sm text-zinc-500 mt-2">
              O acesso administrativo usa somente nome de usuário e senha.
            </p>
          </div>
        </section>

        <form onSubmit={salvar} className="bar-card p-5">
          <h2 className="font-black bar-gold-text mb-4">Alterar minha senha</h2>

          {erro && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {erro}
            </div>
          )}

          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-bold mb-2">Senha atual</span>
              <input
                type="password"
                value={senhaAtual}
                onChange={(event) => setSenhaAtual(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-yellow-500/20 bg-black px-4 py-3 outline-none focus:border-yellow-500"
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
              disabled={salvando}
              className="bar-gold-btn w-full rounded-xl px-4 py-3 disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Alterar senha"}
            </button>
          </div>
        </form>

        <section className="bar-card p-5 lg:col-span-2">
          <h2 className="font-black bar-gold-text mb-2">Código de recuperação</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Use este código se esquecer sua senha. Ao gerar um novo código, o anterior é invalidado.
          </p>

          {mensagemCodigo && (
            <div className="mb-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-sm text-zinc-300">
              {mensagemCodigo}
            </div>
          )}

          {codigoRecuperacao && (
            <div className="mb-4 flex flex-col md:flex-row gap-2">
              <div className="flex-1 rounded-xl border border-yellow-500/25 bg-black px-4 py-3 font-mono text-lg tracking-wider text-yellow-300 break-all">
                {codigoRecuperacao}
              </div>
              <button
                type="button"
                onClick={copiarCodigo}
                className="rounded-xl border border-yellow-500/25 px-4 py-3 font-bold hover:border-yellow-500"
              >
                Copiar
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={gerarCodigo}
            disabled={gerandoCodigo}
            className="bar-gold-btn rounded-xl px-4 py-3 disabled:opacity-60"
          >
            {gerandoCodigo ? "Gerando..." : "Gerar novo código de recuperação"}
          </button>
        </section>
      </div>
    </div>
  );
}
