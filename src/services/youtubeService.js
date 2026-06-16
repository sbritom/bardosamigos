const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

console.log("================================");
console.log("YOUTUBE API KEY:", API_KEY);
console.log("================================");

export async function buscarLiveDoCanal(channelId) {
  try {
    if (!API_KEY) {
      console.error("API KEY do YouTube não encontrada.");
      return null;
    }

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

    console.log("LIVE STATUS:", response.status);
    console.log("LIVE DATA:", data);

    if (!response.ok) {
      console.error("Erro YouTube Live:", data);
      return null;
    }

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
    if (!API_KEY) {
      console.error("API KEY do YouTube não encontrada.");
      return [];
    }

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet` +
      `&q=musica brasil 2026` +
      `&type=video` +
      `&videoCategoryId=10` +
      `&maxResults=5` +
      `&regionCode=BR` +
      `&key=${API_KEY}`;

    console.log("URL TOP MUSICAS:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("STATUS TOP MUSICAS:", response.status);
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error("Erro YouTube:", data);
      return [];
    }

    if (!data.items?.length) {
      return [];
    }

    return data.items.map((item) => ({
      id: item.id.videoId,
      titulo: item.snippet.title,
      canal: item.snippet.channelTitle,
      thumbnail:
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.default?.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error("Erro Top Músicas:", error);
    return [];
  }
}