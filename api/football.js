export default async function handler(req, res) {
  try {
    const API_KEY =
      process.env.FOOTBALL_API_KEY ||
      process.env.VITE_FOOTBALL_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        error: "Chave da Football API não configurada.",
      });
    }

    const hoje = new Date();
    const daqui7Dias = new Date();
    daqui7Dias.setDate(hoje.getDate() + 7);

    const dateFrom = hoje.toISOString().slice(0, 10);
    const dateTo = daqui7Dias.toISOString().slice(0, 10);

    const response = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      }
    );

    const data = await response.json();

    return res.status(200).json({
      matches: data.matches || [],
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar jogos.",
      details: error.message,
    });
  }
}