const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

console.log("TESTE NEWS");
console.log(import.meta.env);
console.log("NEWS KEY:", API_KEY);

export async function getLatestNews() {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=br&language=pt`
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("NEWS DATA:", data);

    if (!response.ok) {
      throw new Error(data.message || "Erro na API");
    }

    if (!data.results) {
      return [];
    }

    return data.results.slice(0, 5).map((item, index) => ({
      id: index + 1,
      category: item.category?.[0] || "📰 Notícia",
      title: item.title || "Sem título",
      link: item.link || "#",
    }));
  } catch (error) {
    console.error("ERRO NEWS:", error);

    return [
      {
        id: 1,
        category: "⚠️ Sistema",
        title: "Erro ao carregar notícias.",
        link: "#",
      },
    ];
  }
}