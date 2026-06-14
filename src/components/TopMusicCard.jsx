export default function TopMusicCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 min-h-[260px]">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        🎵 Top 5 da Rádio
      </h3>

      <div className="space-y-3">

        <div className="bg-black rounded-xl p-3">
          🥇 Henrique & Juliano
        </div>

        <div className="bg-black rounded-xl p-3">
          🥈 Ana Castela
        </div>

        <div className="bg-black rounded-xl p-3">
          🥉 Gusttavo Lima
        </div>

        <div className="bg-black rounded-xl p-3">
          4️⃣ Jorge & Mateus
        </div>

        <div className="bg-black rounded-xl p-3">
          5️⃣ Zé Neto & Cristiano
        </div>

      </div>
    </div>
  );
}