import { useEffect, useState } from "react";
import { getLiveMatches } from "../services/footballService";

export default function LiveFootballCard() {
  const [liveMatch, setLiveMatch] = useState(null);
  const [nextMatches, setNextMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarJogos();

    const interval = setInterval(() => {
      carregarJogos();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function carregarJogos() {
    try {
      const matches = await getLiveMatches();

      const live = matches.find(
        (m) =>
          m.status === "IN_PLAY" ||
          m.status === "PAUSED"
      );

      const upcoming = matches
        .filter(
          (m) =>
            m.status === "SCHEDULED" ||
            m.status === "TIMED"
        )
        .slice(0, 3);

      setLiveMatch(live || null);
      setNextMatches(upcoming);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function nomeTime(time) {
    return (
      time?.shortName ||
      time?.tla ||
      time?.name ||
      "Time"
    );
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[260px] flex items-center justify-center">
        <span className="text-zinc-400">
          Carregando partidas...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[260px]">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        ⚽ Futebol Agora
      </h3>

      {liveMatch ? (
        <div className="bg-black rounded-xl p-4 border border-red-500/20">

          <div className="flex items-center justify-between mb-3">
            <div className="text-yellow-500 font-bold">
              🏆 {liveMatch.competition?.name}
            </div>

            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
              AO VIVO
            </div>
          </div>

          <div className="text-center">

            <div className="text-lg font-bold">
              {nomeTime(liveMatch.homeTeam)}
            </div>

            <div className="text-3xl font-bold text-red-500 my-2">
              {liveMatch.score?.fullTime?.home ?? 0}
              {" - "}
              {liveMatch.score?.fullTime?.away ?? 0}
            </div>

            <div className="text-lg font-bold">
              {nomeTime(liveMatch.awayTeam)}
            </div>

          </div>

        </div>
      ) : nextMatches.length > 0 ? (
        <div className="space-y-3">

          <div className="text-yellow-500 font-bold">
            📅 Próximos Jogos
          </div>

          {nextMatches.map((match) => (
            <div
              key={match.id}
              className="bg-black rounded-xl p-3"
            >
              <div className="text-sm text-zinc-400 mb-1">
                {match.competition?.name}
              </div>

              <div className="font-semibold">
                {nomeTime(match.homeTeam)}
                {" x "}
                {nomeTime(match.awayTeam)}
              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="bg-black rounded-xl p-6 text-center">

          <div className="text-5xl mb-3">
            ⚽
          </div>

          <div className="font-bold text-lg">
            Nenhum jogo encontrado
          </div>

          <div className="text-zinc-400 text-sm mt-2">
            Não há partidas ao vivo ou agendadas no momento.
          </div>

        </div>
      )}
    </div>
  );
}