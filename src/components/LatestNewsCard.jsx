import { useEffect, useState } from "react";
import { getLatestNews } from "../services/newsService";

export default function LatestNewsCard() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const data = await getLatestNews();
    setNews(data);
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[380px]">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        📰 Últimas Notícias
      </h3>

      <div className="space-y-3">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="block bg-black rounded-xl p-3 hover:border-yellow-500 border border-transparent transition-all"
          >
            <div className="text-xs text-yellow-500 mb-1">
              {item.category}
            </div>

            <div className="text-white font-medium">
              {item.title}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}