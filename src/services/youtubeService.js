const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function buscarLiveDoCanal(channelId) {
  try {
    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet` +
      `&channelId=${channelId}` +
      `&eventType=live` +
      `&type=video` +
      `&maxResults=1` +
      `&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items?.length) {
      return null;
    }

    const live = data.items[0];

    return {
      videoId: live.id.videoId,
      titulo: live.snippet.title,
      thumbnail: live.snippet.thumbnails?.high?.url,
    };
  } catch (error) {
    console.error("Erro YouTube Live:", error);
    return null;
  }
}

export async function buscarTopMusicasBrasil() {
  try {
    const buscas = [
      "sertanejo 2025",
      "top brasil 2025",
      "ana castela",
      "henrique e juliano",
      "gusttavo lima"
    ];

    const resultados = [];

    for (const busca of buscas) {
      const url =
        `https://www.googleapis.com/youtube/v3/search` +
        `?part=snippet` +
        `&q=${encodeURIComponent(busca)}` +
        `&type=video` +
        `&videoCategoryId=10` +
        `&maxResults=1` +
        `&regionCode=BR` +
        `&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.items?.length) {
        const item = data.items[0];

        resultados.push({
          id: item.id.videoId,
          titulo: item.snippet.title,
          canal: item.snippet.channelTitle,
          thumbnail:
            item.snippet.thumbnails?.medium?.url ||
            item.snippet.thumbnails?.high?.url,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        });
      }
    }

    return resultados;
  } catch (error) {
    console.error("Erro Top Músicas:", error);
    return [];
  }
}