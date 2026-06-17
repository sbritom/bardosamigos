const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export function youtubeWatchToEmbed(url) {
  if (!url) return null;

  let videoId = null;

  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  }

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  }

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  if (!videoId) return url;

  return `https://www.youtube.com/embed/${videoId}`;
}

export function youtubeEmbedFromVideoId(videoId) {
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

export async function buscarLiveDoCanalYoutube(channelId) {
  if (!API_KEY || !channelId) return null;

  try {
    const url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?part=snippet` +
      `&channelId=${channelId}` +
      `&eventType=live` +
      `&type=video` +
      `&maxResults=1` +
      `&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("Erro YouTube API:", data);
      return null;
    }

    const item = data.items?.[0];

    if (!item?.id?.videoId) return null;

    return {
      videoId: item.id.videoId,
      titulo: item.snippet?.title || "Transmissão ao vivo",
      descricao: item.snippet?.description || "",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url ||
        null,
      embedUrl: youtubeEmbedFromVideoId(item.id.videoId),
    };
  } catch (error) {
    console.error("Erro ao buscar live do YouTube:", error);
    return null;
  }
}