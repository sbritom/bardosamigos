export default function MusicCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        🎵 Música
      </h3>

      <div className="space-y-3">
        <div>🔥 Mais Tocadas</div>

        <div>🎤 Lançamentos</div>

        <div>🎧 Spotify Brasil</div>

        <div>🌎 Hits Internacionais</div>
      </div>
    </div>
  );
}