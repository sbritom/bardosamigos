export default function FootballCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[380px] flex flex-col">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        ⚽ Futebol
      </h3>

      <div className="space-y-4">

        <div className="bg-black rounded-xl p-3">
          🏆 Copa do Mundo
        </div>

        <div className="bg-black rounded-xl p-3">
          BR Brasileirão
        </div>

        <div className="bg-black rounded-xl p-3">
          ⭐ Champions League
        </div>

        <div className="bg-black rounded-xl p-3">
          🔄 Mercado da Bola
        </div>

      </div>

      <button className="w-full mt-auto bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl">
        Ver Mais
      </button>
    </div>
  );
}