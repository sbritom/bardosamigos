import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  alterarMinhaSenha,
  obterSessaoAdmin,
  sairAdmin,
} from "../../services/adminAuthService";

export default function AdminSettingsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

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
      </div>
    </div>
  );
}
