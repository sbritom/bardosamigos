import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  cadastrarUsuario,
  loginUsuario,
  girarRoleta,
  buscarRanking,
  buscarLogs,
  buscarHallDaFama,
  buscarUsuarioLocal,
  sairUsuarioLocal,
} from "../services/barcoinsService";

export default function BarCoinsPage() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const [usuario, setUsuario] = useState(null);

  const [ranking, setRanking] = useState([]);
  const [logs, setLogs] = useState([]);
  const [hallDaFama, setHallDaFama] = useState([]);

  const [ultimoPremio, setUltimoPremio] = useState(null);

  useEffect(() => {
    carregarDados();

    const usuarioSalvo = buscarUsuarioLocal();

    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
  }, []);

  async function carregarDados() {
    try {
      const rankingData = await buscarRanking();
      const logsData = await buscarLogs();
      const hallData = await buscarHallDaFama();

      setRanking(rankingData || []);
      setLogs(logsData || []);
      setHallDaFama(hallData || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function entrar() {
    try {
      const user = await loginUsuario(nome, senha);

      setUsuario(user);

      alert(`Bem-vindo ${user.nome}`);

      await carregarDados();
    } catch {
      alert("Nome ou senha inválidos.");
    }
  }

  async function cadastrar() {
    try {
      const user = await cadastrarUsuario(nome, senha);

      setUsuario(user);

      alert("Cadastro realizado com sucesso.");

      await carregarDados();
    } catch (err) {
      alert(err.message);
    }
  }

  async function girar() {
    try {
      const resultado = await girarRoleta(usuario);

      setUsuario(resultado.usuario);

      setUltimoPremio(resultado.premio);

      await carregarDados();

      if (resultado.tipo === "mega") {
        alert(
          `👑 MEGA JACKPOT!\n\nVocê ganhou ${resultado.premio} BarCoins!`
        );
      } else if (resultado.tipo === "mini") {
        alert(
          `💎 MINI JACKPOT!\n\nVocê ganhou ${resultado.premio} BarCoins!`
        );
      } else {
        alert(
          `🎉 Você ganhou ${resultado.premio} BarCoins!`
        );
      }
    } catch (err) {
      alert(err.message);
    }
  }

  function sair() {
    sairUsuarioLocal();
    setUsuario(null);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold text-yellow-500">
            🪙 BarCoins
          </h1>

          <div className="flex gap-3">

            {usuario && (
              <button
                onClick={sair}
                className="bg-red-600 px-4 py-2 rounded-xl font-bold"
              >
                Sair
              </button>
            )}

            <Link
              to="/"
              className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl hover:border-yellow-500"
            >
              ← Voltar ao Portal
            </Link>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* PERFIL */}
          <div className="lg:col-span-3">

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mb-6">

              <h2 className="font-bold text-yellow-500 mb-4">
                👤 Perfil
              </h2>

              {!usuario ? (
                <>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-black border border-zinc-700 p-3 rounded-lg mb-3"
                    placeholder="Nome"
                  />

                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full bg-black border border-zinc-700 p-3 rounded-lg mb-3"
                    placeholder="Senha 4 dígitos"
                  />

                  <button
                    onClick={entrar}
                    className="w-full bg-yellow-500 text-black font-bold p-3 rounded-lg mb-3"
                  >
                    Entrar
                  </button>

                  <button
                    onClick={cadastrar}
                    className="w-full bg-zinc-700 text-white font-bold p-3 rounded-lg"
                  >
                    Cadastrar
                  </button>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold">
                    {usuario.nome}
                  </div>

                  <div className="text-yellow-500 mt-3">
                    🪙 Saldo: {usuario.saldo || 0}
                  </div>

                  <div className="text-cyan-400">
                    💎 Jackpots: {usuario.jackpots || 0}
                  </div>

                  <div className="text-purple-400">
                    🎰 Giros: {usuario.total_giros || 0}
                  </div>

                  <div className="text-orange-400">
                    🔥 Sequência: {usuario.dias_consecutivos || 0}
                  </div>

                  <div className="text-green-400">
                    🏆 Melhor: {usuario.maior_sequencia || 0}
                  </div>
                </>
              )}

            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

              <h2 className="font-bold text-yellow-500 mb-4">
                🏅 Conquistas
              </h2>

              {usuario?.conquistas?.length ? (
                <div className="space-y-2 text-sm">
                  {usuario.conquistas.map((item) => (
                    <div key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-400">
                  Nenhuma conquista ainda
                </div>
              )}

            </div>

          </div>

          {/* ROLETA */}
          <div className="lg:col-span-6">

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

              <h2 className="font-bold text-yellow-500 mb-4">
                🎰 Roleta BarCoins
              </h2>

              <div className="h-[320px] flex items-center justify-center border border-zinc-700 rounded-xl bg-black">

                <div className="text-center">

                  <div className="text-8xl mb-4 animate-pulse">
                    🎰
                  </div>

                  {ultimoPremio && (
                    <div className="text-3xl font-bold text-green-500">
                      +{ultimoPremio} 🪙
                    </div>
                  )}

                </div>

              </div>

              <button
                onClick={girar}
                disabled={!usuario}
                className="w-full mt-4 bg-yellow-500 text-black font-bold p-4 rounded-xl disabled:opacity-50"
              >
                🎰 Girar Roleta
              </button>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mt-6">

              <h2 className="font-bold text-yellow-500 mb-4">
                🎁 Premiações do Mês
              </h2>

              <div className="space-y-2">
                <div>🥇 1º Lugar → 1000 xats</div>
                <div>🥈 2º Lugar → 500 xats</div>
                <div>🥉 3º Lugar → 150 xats</div>
              </div>

            </div>

          </div>

          {/* LATERAL */}
          <div className="lg:col-span-3">

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mb-6">

              <h2 className="font-bold text-yellow-500 mb-4">
                🏆 Ranking
              </h2>

              <div className="space-y-2">

                {ranking.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-black rounded-xl p-3"
                  >
                    {index === 0 && "🥇 "}
                    {index === 1 && "🥈 "}
                    {index === 2 && "🥉 "}

                    {item.nome} - {item.saldo}
                  </div>
                ))}

              </div>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mb-6">

              <h2 className="font-bold text-yellow-500 mb-4">
                👑 Hall da Fama
              </h2>

              <div className="space-y-2 text-sm">

                {hallDaFama.length === 0 && (
                  <div className="text-zinc-400">
                    Nenhum campeão ainda
                  </div>
                )}

                {hallDaFama.map((item) => (
                  <div key={item.id}>
                    👑 {item.nome}
                    <br />
                    {item.mes}
                  </div>
                ))}

              </div>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

              <h2 className="font-bold text-yellow-500 mb-4">
                📜 Últimos Giros
              </h2>

              <div className="space-y-2 text-sm">

                {logs.map((log) => (
                  <div key={log.id}>
                    🎰 +{log.premio} 🪙
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
