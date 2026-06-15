const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

export async function getLiveMatches() {
  try {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const url = isLocal
      ? "https://api.football-data.org/v4/matches"
      : "/api/football";

    const options = isLocal
      ? {
          headers: {
            "X-Auth-Token": API_KEY,
          },
        }
      : {};

    const response = await fetch(url, options);
    const data = await response.json();

    return data.matches || [];
  } catch (error) {
    console.error("Erro ao buscar partidas:", error);
    return [];
  }
}

export async function getFootballNews() {
  return [];
}