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

  function getFlagUrl(team) {
    const countryMap = {
      "Saudi Arabia": "sa",
      Uruguay: "uy",
      Iran: "ir",
      "New Zealand": "nz",
      France: "fr",
      Senegal: "sn",
      Brazil: "br",
      Argentina: "ar",
      Spain: "es",
      Portugal: "pt",
      Germany: "de",
      Belgium: "be",
      England: "gb",
      Croatia: "hr",
      Morocco: "ma",
      Japan: "jp",
      Sweden: "se",
      Tunisia: "tn",
      Ecuador: "ec",
      "Ivory Coast": "ci",
      Norway: "no",
      Iraq: "iq",
      Ghana: "gh",
      Panama: "pa",
      Austria: "at",
      Algeria: "dz",
      Mexico: "mx",
      Canada: "ca",
      Qatar: "qa",
      Switzerland: "ch",
      Scotland: "gb",
      Haiti: "ht",
      Australia: "au",
      Turkey: "tr",
      Paraguay: "py",
      USA: "us",
      Colombia: "co",
    };

    const code = countryMap[team?.name];

    if (!code) return null;

    return `https://flagcdn.com/w40/${code}.png`;
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        <div className="text-center text-zinc-400">
          Carregando futebol...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">

      <h3 className="text-yellow-500 text-xl font-bold mb-3">
        ⚽ Central do Futebol
      </h3>

      {liveMatch ? (
        <div className="bg-black rounded-xl p-4 border border-red-500/20">

          <div className="flex justify-between items-center mb-3">
            <div className="text-yellow-500 text-xs font-bold">
              🏆 {liveMatch.competition?.name}
            </div>

            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              AO VIVO
            </div>
          </div>

          <div className="grid grid-cols-3 items-center text-center">

            <div>
              {getFlagUrl(liveMatch.homeTeam) && (
                <img
                  src={getFlagUrl(liveMatch.homeTeam)}
                  className="w-8 h-6 mx-auto mb-1 rounded"
                  alt=""
                />
              )}

              <div className="font-bold text-sm">
                {nomeTime(liveMatch.homeTeam)}
              </div>
            </div>

            <div className="text-3xl font-bold text-red-500">
              {liveMatch.score?.fullTime?.home ?? 0}
              {" - "}
              {liveMatch.score?.fullTime?.away ?? 0}
            </div>

            <div>
              {getFlagUrl(liveMatch.awayTeam) && (
                <img
                  src={getFlagUrl(liveMatch.awayTeam)}
                  className="w-8 h-6 mx-auto mb-1 rounded"
                  alt=""
                />
              )}

              <div className="font-bold text-sm">
                {nomeTime(liveMatch.awayTeam)}
              </div>
            </div>

          </div>

        </div>
      ) : (
        <>

          <div className="text-yellow-500 font-bold mb-2">
            📅 Próximos Jogos
          </div>

          <div className="space-y-2">

            {nextMatches.map((match) => (
              <div
                key={match.id}
                className="bg-black rounded-xl p-3 border border-zinc-800"
              >
                <div className="text-yellow-500 text-xs font-bold mb-2">
                  🏆 {match.competition?.name}
                </div>

                <div className="grid grid-cols-3 items-center text-center">

                  <div>
                    {getFlagUrl(match.homeTeam) && (
                      <img
                        src={getFlagUrl(match.homeTeam)}
                        className="w-7 h-5 mx-auto mb-1 rounded"
                        alt=""
                      />
                    )}

                    <div className="font-semibold text-sm">
                      {nomeTime(match.homeTeam)}
                    </div>
                  </div>

                  <div className="text-zinc-500 text-xs font-bold">
                    VS
                  </div>

                  <div>
                    {getFlagUrl(match.awayTeam) && (
                      <img
                        src={getFlagUrl(match.awayTeam)}
                        className="w-7 h-5 mx-auto mb-1 rounded"
                        alt=""
                      />
                    )}

                    <div className="font-semibold text-sm">
                      {nomeTime(match.awayTeam)}
                    </div>
                  </div>

                </div>

                <div className="text-center text-yellow-500 text-xs mt-2">
                  🕒 {formatarData(match.utcDate)}
                </div>

              </div>
            ))}

          </div>

        </>
      )}

    </div>
  );
}