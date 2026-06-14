const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

export async function getLiveMatches() {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches",
      {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      }
    );

    const data = await response.json();

    console.log("FOOTBALL API:", data);

    return data.matches || [];
  } catch (error) {
    console.error("Erro ao buscar partidas:", error);
    return [];
  }
}

export async function getFootballNews() {
  return [];
}