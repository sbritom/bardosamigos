const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

export async function getLatestNews() {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=br&language=pt`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao carregar notícias");
    }

    if (!data.results) {
      return [];
    }

    return data.results.slice(0, 6).map((item, index) => ({
      id: index + 1,
      category: item.category?.[0] || "Notícia",
      title: item.title || "Sem título",
      description: item.description || "",
      image:
        item.image_url ||
        item.image ||
        item.source_icon ||
        null,
      link: item.link || "#",
      date: item.pubDate || "",
      source: item.source_id || "News",
    }));
  } catch (error) {
    console.error("ERRO NEWS:", error);

    return [
      {
        id: 1,
        category: "Sistema",
        title: "Erro ao carregar notícias.",
        description:
          "Não foi possível obter notícias no momento.",
        image: null,
        link: "#",
        date: "",
        source: "Sistema",
      },
    ];
  }
}