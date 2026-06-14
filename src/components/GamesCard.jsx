export default function GamesCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[380px] flex flex-col">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        🎮 Games
      </h3>

      <div className="space-y-4">

        <div className="bg-black rounded-xl p-3">
          🔥 GTA VI
        </div>

        <div className="bg-black rounded-xl p-3">
          🟦 Roblox
        </div>

        <div className="bg-black rounded-xl p-3">
          🔥 Free Fire
        </div>

        <div className="bg-black rounded-xl p-3">
          ⚽ EA FC 26
        </div>

      </div>

      <button className="w-full mt-auto bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl">
        Ver Mais
      </button>
    </div>
  );
}