import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarRanking } from "../services/barcoinsService";

export default function BarCoinsCard() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    carregarRanking();
  }, []);

  async function carregarRanking() {
    try {
      const data = await buscarRanking();
      setRanking(data.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-yellow-500/20">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-yellow-500 text-2xl font-bold">
          🪙 BarCoins
        </h3>

        <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-bold">
          ONLINE
        </span>
      </div>

      <div className="space-y-3">

        <div className="bg-black rounded-xl p-3 border border-zinc-800">
          <div className="text-yellow-500 font-bold mb-2">
            🏆 Top 3 Ranking
          </div>

          {ranking.length === 0 ? (
            <div className="text-zinc-400 text-sm">
              Carregando ranking...
            </div>
          ) : (
            ranking.map((user, index) => (
              <div
                key={user.id}
                className="flex justify-between text-sm py-1"
              >
                <span>
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  {user.nome}
                </span>

                <span className="text-yellow-500">
                  {user.saldo}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="bg-black rounded-xl p-3 border border-zinc-800">
          <div className="font-bold text-green-500">
            🎰 Roleta Diária
          </div>

          <div className="text-xs text-zinc-400 mt-1">
            Gire 1 vez a cada 24 horas e acumule BarCoins.
          </div>
        </div>

        <div className="bg-black rounded-xl p-3 border border-zinc-800">
          <div className="font-bold text-cyan-400">
            💎 Jackpots
          </div>

          <div className="text-sm mt-2">
            Mini Jackpot → 100 🪙
          </div>

          <div className="text-sm">
            Mega Jackpot → 500 🪙
          </div>
        </div>

        <div className="bg-black rounded-xl p-3 border border-zinc-800">
          <div className="font-bold text-orange-400">
            🎁 Premiação Mensal
          </div>

          <div className="text-sm mt-2">
            🥇 1000 xats
          </div>

          <div className="text-sm">
            🥈 500 xats
          </div>

          <div className="text-sm">
            🥉 150 xats
          </div>
        </div>

        <Link
          to="/barcoins"
          className="block w-full text-center bg-yellow-500 text-black font-bold p-3 rounded-xl hover:scale-105 transition"
        >
          🚀 Entrar no BarCoins
        </Link>

      </div>

    </div>
  );
}
