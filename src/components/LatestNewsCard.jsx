import { useEffect, useState } from "react";
import { getLatestNews } from "../services/newsService";

export default function LatestNewsCard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarNoticias();
  }, []);

  async function carregarNoticias() {
    try {
      const data = await getLatestNews();
      setNews(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-yellow-500 text-xl font-bold">
          📰 Últimas Notícias
        </h3>

        <span className="text-xs text-zinc-400">
          Atualização automática
        </span>
      </div>

      {loading ? (
        <div className="text-zinc-400">
          Carregando notícias...
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 bg-black rounded-xl border border-zinc-800 hover:border-yellow-500 transition-all duration-300 p-3"
            >
              <div className="w-16 h-16 flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-zinc-800 flex items-center justify-center">
                    📰
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-yellow-500 text-xs uppercase mb-1">
                  {item.category}
                </div>

                <div className="font-bold text-white text-sm line-clamp-2">
                  {item.title}
                </div>

                <div className="text-cyan-400 text-xs mt-1">
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