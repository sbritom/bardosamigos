import { useEffect, useState } from "react";
import { getLiveMatches } from "../services/footballService";

export default function LiveFootballCard() {
  const [live, setLive] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    loadMatches();

    const interval = setInterval(() => {
      loadMatches();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function loadMatches() {
    try {
      const matches = await getLiveMatches();

      setLive(
        matches.filter(
          (m) =>
            m.status === "IN_PLAY" ||
            m.status === "PAUSED"
        ).slice(0, 1)
      );

      setUpcoming(
        matches.filter(
          (m) =>
            m.status === "SCHEDULED" ||
            m.status === "TIMED"
        ).slice(0, 1)
      );

      setFinished(
        matches.filter(
          (m) => m.status === "FINISHED"
        ).slice(0, 1)
      );
    } catch (error) {
      console.error(error);
    }
  }

  function renderMatch(match) {
    if (!match) return "Nenhum jogo";

    return `${match.homeTeam.shortName || match.homeTeam.name} x ${
      match.awayTeam.shortName || match.awayTeam.name
    }`;
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[260px]">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        ⚽ Futebol Agora
      </h3>

      <div className="space-y-3">

        <div className="bg-black rounded-xl p-3">
          <div className="text-green-500 text-sm font-bold mb-1">
            🔴 Jogos Ao Vivo
          </div>

          <div className="text-sm">
            {renderMatch(live[0])}
          </div>
        </div>

        <div className="bg-black rounded-xl p-3">
          <div className="text-yellow-500 text-sm font-bold mb-1">
            📅 Próximos Jogos
          </div>

          <div className="text-sm">
            {renderMatch(upcoming[0])}
          </div>
        </div>

        <div className="bg-black rounded-xl p-3">
          <div className="text-blue-400 text-sm font-bold mb-1">
            🏁 Últimos Resultados
          </div>

          <div className="text-sm">
            {renderMatch(finished[0])}
          </div>
        </div>

      </div>
    </div>
  );
}