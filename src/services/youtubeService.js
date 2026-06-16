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
    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet` +
      `&q=musicas mais tocadas brasil 2026` +
      `&type=video` +
      `&videoCategoryId=10` +
      `&maxResults=5` +
      `&regionCode=BR` +
      `&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items?.length) {
      return [];
    }

    return data.items.map((item) => ({
      id: item.id.videoId,
      titulo: item.snippet.title,
      canal: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.high?.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error("Erro Top Músicas:", error);
    return [];
  }
}