import { useEffect, useState } from "react";
import { getLiveMatches } from "../services/footballService";

export default function LiveFootballCard() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [nextMatches, setNextMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarJogos();

    const interval = setInterval(() => {
      carregarJogos();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function carregarJogos() {
    try {
      const matches = await getLiveMatches();

      const agora = new Date();

      const aoVivo = matches.filter((m) => {
        const dataJogo = new Date(m.utcDate);

        return (
          m.status === "IN_PLAY" ||
          m.status === "PAUSED" ||
          (["TIMED", "SCHEDULED"].includes(m.status) &&
            dataJogo <= agora)
        );
      });

      const proximos = matches
        .filter((m) => {
          const dataJogo = new Date(m.utcDate);

          return (
            ["TIMED", "SCHEDULED"].includes(m.status) &&
            dataJogo > agora
          );
        })
        .slice(0, 3);

      const recentes = matches
        .filter((m) => m.status === "FINISHED")
        .slice(0, 2);

      setLiveMatches(aoVivo.slice(0, 3));
      setFinishedMatches(recentes);
      setNextMatches(proximos);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function nomeCurto(team) {
    return (
      team?.tla ||
      team?.shortName ||
      team?.name?.substring(0, 3)?.toUpperCase() ||
      "???"
    );
  }

  function placarCasa(match) {
    return match?.score?.fullTime?.home ?? 0;
  }

  function placarFora(match) {
    return match?.score?.fullTime?.away ?? 0;
  }

  function getFlagUrl(team) {
    const countryMap = {
      "Saudi Arabia": "sa",
      Uruguay: "uy",
      Iran: "ir",
      "New Zealand": "nz",
      France: "fr",
      Senegal: "sn",
      Belgium: "be",
      Egypt: "eg",
      Spain: "es",
      "Cape Verde": "cv",
      Brazil: "br",
      Argentina: "ar",
      Portugal: "pt",
      Germany: "de",
      Japan: "jp",
      Morocco: "ma",
      Ecuador: "ec",
      Tunisia: "tn",
      Sweden: "se",
      England: "gb",
      Croatia: "hr",
      Mexico: "mx",
      USA: "us",
      Canada: "ca",
      Paraguay: "py",
      Colombia: "co",
    };

    const code = countryMap[team?.name];

    if (!code) return null;

    return `https://flagcdn.com/w40/${code}.png`;
  }

  function horaJogo(data) {
    return new Date(data).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
        Carregando futebol...
      </div>
    );
  }

  const mostrarAoVivo = liveMatches.length > 0;

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">

      <h3 className="text-yellow-500 text-xl font-bold mb-3">
        ⚽ Central do Futebol
      </h3>

      <div className="text-cyan-400 text-xs font-bold mb-3 uppercase">
        {mostrarAoVivo
          ? "🔵 AO VIVO / RECENTES"
          : "📅 PRÓXIMOS JOGOS"}
      </div>

      <div className="space-y-2">

        {mostrarAoVivo ? (
          <>
            {liveMatches.map((match) => (
              <div
                key={match.id}
                className="bg-black border border-yellow-500/40 rounded-xl p-3"
              >
                <div className="flex items-center justify-between">

                  <div className="w-20 text-center">

                    {getFlagUrl(match.homeTeam) && (
                      <img
                        src={getFlagUrl(match.homeTeam)}
                        className="w-6 h-4 mx-auto mb-1 rounded"
                        alt=""
                      />
                    )}

                    <div className="font-bold text-white">
                      {nomeCurto(match.homeTeam)}
                    </div>

                  </div>

                  <div className="text-center">

                    <div className="text-3xl font-bold text-yellow-500">
                      {placarCasa(match)} : {placarFora(match)}
                    </div>

                    <div className="text-xs text-green-500 font-bold mt-1">
                      🟢 AO VIVO
                    </div>

                  </div>

                  <div className="w-20 text-center">

                    {getFlagUrl(match.awayTeam) && (
                      <img
                        src={getFlagUrl(match.awayTeam)}
                        className="w-6 h-4 mx-auto mb-1 rounded"
                        alt=""
                      />
                    )}

                    <div className="font-bold text-white">
                      {nomeCurto(match.awayTeam)}
                    </div>

                  </div>

                </div>
              </div>
            ))}

            {finishedMatches.map((match) => (
              <div
                key={match.id}
                className="bg-black border border-zinc-700 rounded-xl p-3"
              >
                <div className="flex items-center justify-between">

                  <div className="w-20 text-center">

                    {getFlagUrl(match.homeTeam) && (
                      <img
                        src={getFlagUrl(match.homeTeam)}
                        className="w-6 h-4 mx-auto mb-1 rounded"
                        alt=""
                      />
                    )}

                    <div className="font-bold text-white">
                      {nomeCurto(match.homeTeam)}
                    </div>

                  </div>

                  <div className="text-center">

                    <div className="text-3xl font-bold text-white">
                      {placarCasa(match)} : {placarFora(match)}
                    </div>

                    <div className="text-xs text-zinc-400 mt-1">
                      FINAL
                    </div>

                  </div>

                  <div className="w-20 text-center">

                    {getFlagUrl(match.awayTeam) && (
                      <img
                        src={getFlagUrl(match.awayTeam)}
                        className="w-6 h-4 mx-auto mb-1 rounded"
                        alt=""
                      />
                    )}

                    <div className="font-bold text-white">
                      {nomeCurto(match.awayTeam)}
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </>
        ) : (
          nextMatches.map((match) => (
            <div
              key={match.id}
              className="bg-black border border-zinc-700 rounded-xl p-3"
            >
              <div className="flex items-center justify-between">

                <div className="w-20 text-center">

                  {getFlagUrl(match.homeTeam) && (
                    <img
                      src={getFlagUrl(match.homeTeam)}
                      className="w-6 h-4 mx-auto mb-1 rounded"
                      alt=""
                    />
                  )}

                  <div className="font-bold text-white">
                    {nomeCurto(match.homeTeam)}
                  </div>

                </div>

                <div className="text-center">

                  <div className="text-yellow-500 font-bold">
                    VS
                  </div>

                  <div className="text-xs text-zinc-400 mt-1">
                    🕒 {horaJogo(match.utcDate)}
                  </div>

                </div>

                <div className="w-20 text-center">

                  {getFlagUrl(match.awayTeam) && (
                    <img
                      src={getFlagUrl(match.awayTeam)}
                      className="w-6 h-4 mx-auto mb-1 rounded"
                      alt=""
                    />
                  )}

                  <div className="font-bold text-white">
                    {nomeCurto(match.awayTeam)}
                  </div>

                </div>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}