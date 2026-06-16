import { useEffect, useState } from "react";
import { getLatestNews } from "../services/newsService";

export default function LatestNewsCard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      const data = await getLatestNews();
      setNews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "";
    }
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-yellow-500 text-xl font-bold">
          📰 Últimas Notícias
        </h3>

        <span className="text-xs text-zinc-400">
          Atualização automática
        </span>
      </div>

      {loading ? (
        <div className="text-center py-10 text-zinc-400">
          Carregando notícias...
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-10 text-zinc-400">
          Nenhuma notícia encontrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="bg-black rounded-xl overflow-hidden border border-zinc-800 hover:border-yellow-500 hover:scale-[1.02] transition-all duration-300"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-44 flex items-center justify-center bg-zinc-800 text-5xl">
                  📰
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-500 text-xs font-semibold uppercase">
                    {item.category}
                  </span>

                  <span className="text-zinc-500 text-xs">
                    {formatDate(item.date)}
                  </span>
                </div>

                <h4 className="text-white font-bold line-clamp-2 mb-2">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="text-zinc-400 text-sm line-clamp-3 mb-3">
                    {item.description}
                  </p>
                )}

                <div className="text-xs text-cyan-400">
                  {item.source}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}