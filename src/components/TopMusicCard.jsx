import { useEffect, useState } from "react";
import { buscarTopMusicasBrasil } from "../services/youtubeService";

export default function TopMusicCard() {
  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMusicas();
  }, []);

  async function carregarMusicas() {
    try {
      const data = await buscarTopMusicasBrasil();

      console.log("TOP MUSICAS:", data);

      setMusicas(data);
    } catch (error) {
      console.error("Erro ao carregar músicas:", error);
    } finally {
      setLoading(false);
    }
  }

  const medalhas = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[260px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-yellow-500 text-xl font-bold">
          🔥 Top 5 do Brasil
        </h3>

        <span className="text-xs text-zinc-400">
          YouTube
        </span>
      </div>

      {loading ? (
        <div className="text-zinc-400">
          Carregando músicas...
        </div>
      ) : (
        <div className="space-y-3">
          {musicas.map((musica, index) => (
            <a
              key={musica.id}
              href={musica.link}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 bg-black rounded-xl border border-zinc-800 hover:border-yellow-500 transition-all duration-300 p-3"
            >
              <img
                src={musica.thumbnail}
                alt={musica.titulo}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm line-clamp-2">
                  {medalhas[index]} {musica.titulo}
                </div>

                <div className="text-zinc-400 text-xs mt-1">
                  {musica.canal}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}