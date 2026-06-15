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

  function formatarData(data) {
    if (!data) return "";

    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function placarAoVivo(match) {
    return (
      match?.score?.fullTime?.home ??
      match?.score?.winner ??
      0
    );
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[340px] flex items-center justify-center">
        <span className="text-zinc-400">
          Carregando futebol...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[340px]">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        ⚽ Central do Futebol
      </h3>

      {liveMatch ? (
        <div className="bg-black rounded-xl p-5 border border-red-500/20">

          <div className="flex items-center justify-between mb-4">
            <div className="text-yellow-500 font-bold text-sm">
              🏆 {liveMatch.competition?.name}
            </div>

            <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
              AO VIVO
            </div>
          </div>

          <div className="grid grid-cols-3 items-center text-center">

            <div>
              <div className="font-bold text-lg">
                {nomeTime(liveMatch.homeTeam)}
              </div>
            </div>

            <div>
              <div className="text-4xl font-bold text-red-500">
                {liveMatch.score?.fullTime?.home ?? 0}
                {" - "}
                {liveMatch.score?.fullTime?.away ?? 0}
              </div>
            </div>

            <div>
              <div className="font-bold text-lg">
                {nomeTime(liveMatch.awayTeam)}
              </div>
            </div>

          </div>

        </div>
      ) : nextMatches.length > 0 ? (
        <div>

          <div className="text-yellow-500 font-bold mb-3">
            📅 Próximos Jogos
          </div>

          <div className="space-y-3">

            {nextMatches.map((match) => (
              <div
                key={match.id}
                className="bg-black rounded-xl p-4 border border-zinc-800"
              >
                <div className="text-xs text-yellow-500 font-bold mb-2">
                  🏆 {match.competition?.name}
                </div>

                <div className="grid grid-cols-3 items-center text-center">

                  <div className="font-bold">
                    {nomeTime(match.homeTeam)}
                  </div>

                  <div className="text-zinc-500 text-sm">
                    VS
                  </div>

                  <div className="font-bold">
                    {nomeTime(match.awayTeam)}
                  </div>

                </div>

                <div className="text-center text-yellow-500 text-sm mt-3">
                  🕒 {formatarData(match.utcDate)}
                </div>

              </div>
            ))}

          </div>

        </div>
      ) : (
        <div className="bg-black rounded-xl p-6 text-center">

          <div className="text-5xl mb-3">
            ⚽
          </div>

          <div className="font-bold text-lg">
            Nenhuma partida encontrada
          </div>

          <div className="text-zinc-400 text-sm mt-2">
            Não existem jogos ao vivo ou agendados no momento.
          </div>

        </div>
      )}
    </div>
  );
}