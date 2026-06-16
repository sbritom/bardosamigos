import { useEffect, useState } from "react";
import { getLiveMatches } from "../services/footballService";

export default function LiveFootballCard() {
  const [matches, setMatches] = useState([]);
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
      const data = await getLiveMatches();

      const ordenados = [...data].sort((a, b) => {
        const prioridade = {
          IN_PLAY: 1,
          PAUSED: 2,
          TIMED: 3,
          SCHEDULED: 4,
          FINISHED: 5,
        };

        const pa = prioridade[a.status] || 99;
        const pb = prioridade[b.status] || 99;

        if (pa !== pb) return pa - pb;

        return new Date(a.utcDate) - new Date(b.utcDate);
      });

      setMatches(ordenados.slice(0, 5));
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }

  function nomeCurto(team) {
    const traducoes = {
      "Saudi Arabia": "Arábia Saudita",
      Uruguay: "Uruguai",
      Sweden: "Suécia",
      Tunisia: "Tunísia",
      Spain: "Espanha",
      "Cape Verde": "Cabo Verde",
      Iran: "Irã",
      "New Zealand": "Nova Zelândia",
      France: "França",
      Senegal: "Senegal",
      Belgium: "Bélgica",
      Egypt: "Egito",
      Brazil: "Brasil",
      Argentina: "Argentina",
      Germany: "Alemanha",
      Japan: "Japão",
      Portugal: "Portugal",
      England: "Inglaterra",
      Croatia: "Croácia",
      Colombia: "Colômbia",
      Morocco: "Marrocos",
      Ecuador: "Equador",
      Paraguay: "Paraguai",
      Mexico: "México",
      Canada: "Canadá",
      USA: "Estados Unidos",
      Norway: "Noruega",
      Iraq: "Iraque",
      Austria: "Áustria",
      Algeria: "Argélia",
      Ghana: "Gana",
      Panama: "Panamá",
      Qatar: "Catar",
      Switzerland: "Suíça",
      Scotland: "Escócia",
      Haiti: "Haiti",
      Australia: "Austrália",
      Turkey: "Turquia",
      Jordan: "Jordânia",
      "DR Congo": "RD Congo",
      Uzbekistan: "Uzbequistão",
      Czechia: "República Tcheca",
      "South Africa": "África do Sul",
      "South Korea": "Coreia do Sul",
      "Bosnia and Herzegovina": "Bósnia",
      Curacao: "Curaçao",
      "Ivory Coast": "Costa do Marfim",
    };

    return traducoes[team?.name] || team?.shortName || team?.name || "Time";
  }

  function placarCasa(match) {
    return match?.score?.fullTime?.home ?? match?.score?.halfTime?.home ?? 0;
  }

  function placarFora(match) {
    return match?.score?.fullTime?.away ?? match?.score?.halfTime?.away ?? 0;
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
      Norway: "no",
      Iraq: "iq",
      Austria: "at",
      Algeria: "dz",
      Ghana: "gh",
      Panama: "pa",
      Qatar: "qa",
      Switzerland: "ch",
      Scotland: "gb",
      Haiti: "ht",
      Australia: "au",
      Turkey: "tr",
      Jordan: "jo",
      Uzbekistan: "uz",
      Czechia: "cz",
      "South Africa": "za",
      "South Korea": "kr",
      "Bosnia and Herzegovina": "ba",
      Curacao: "cw",
      "Ivory Coast": "ci",
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

  function dataJogo(data) {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  function statusLabel(match) {
    if (match.status === "IN_PLAY") return "🔴 AO VIVO";
    if (match.status === "PAUSED") return "🟡 INTERVALO";
    if (match.status === "FINISHED") return "✅ FINAL";
    return `🕒 ${dataJogo(match.utcDate)} - ${horaJogo(match.utcDate)}`;
  }

  function isLive(match) {
    return match.status === "IN_PLAY" || match.status === "PAUSED";
  }

  function isFinished(match) {
    return match.status === "FINISHED";
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 h-[540px] flex flex-col">
      <h3 className="text-yellow-500 text-xl font-bold mb-3">
        ⚽ Central do Futebol
      </h3>

      <div className="text-cyan-400 text-xs font-bold mb-3 uppercase">
        📅 Jogos de hoje e próximos
      </div>

      {loading ? (
        <div className="text-zinc-400">Carregando futebol...</div>
      ) : matches.length === 0 ? (
        <div className="bg-black rounded-xl border border-zinc-800 p-4 text-zinc-400 text-sm">
          Nenhuma partida encontrada no momento.
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto pr-1">
          {matches.map((match) => (
            <div
              key={match.id}
              className={`bg-black rounded-xl p-3 border ${
                isLive(match)
                  ? "border-yellow-500/60"
                  : "border-zinc-800"
              }`}
            >
              <div className="text-xs font-bold mb-2 text-cyan-400">
                {statusLabel(match)}
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="w-20 text-center">
                  {getFlagUrl(match.homeTeam) && (
                    <img
                      src={getFlagUrl(match.homeTeam)}
                      className="w-6 h-4 mx-auto mb-1 rounded"
                      alt=""
                    />
                  )}

                  <div className="font-bold text-white text-xs leading-tight line-clamp-2">
                    {nomeCurto(match.homeTeam)}
                  </div>
                </div>

                <div className="text-center min-w-[70px]">
                  {isLive(match) || isFinished(match) ? (
                    <>
                      <div className="text-2xl font-bold text-yellow-500">
                        {placarCasa(match)} : {placarFora(match)}
                      </div>

                      <div className="text-[11px] text-zinc-400 mt-1">
                        {isLive(match) ? "AO VIVO" : "FINAL"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-yellow-500 font-bold text-lg">
                        VS
                      </div>

                      <div className="text-[11px] text-zinc-400 mt-1">
                        {horaJogo(match.utcDate)}
                      </div>
                    </>
                  )}
                </div>

                <div className="w-20 text-center">
                  {getFlagUrl(match.awayTeam) && (
                    <img
                      src={getFlagUrl(match.awayTeam)}
                      className="w-6 h-4 mx-auto mb-1 rounded"
                      alt=""
                    />
                  )}

                  <div className="font-bold text-white text-xs leading-tight line-clamp-2">
                    {nomeCurto(match.awayTeam)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}