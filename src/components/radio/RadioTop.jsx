export default function RadioTop() {
  return (
    <div className="bg-black border-b border-yellow-500/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-center gap-3 min-w-[220px]">
            <div className="text-2xl">📻</div>

            <div>
              <div className="text-yellow-500 font-bold leading-tight">
                Hunter FM Hits Brasil
              </div>
              <div className="text-xs text-zinc-400">
                Rádio do Bar dos Amigos
              </div>
            </div>
          </div>

          <audio controls className="w-full h-10">
            <source
              src="https://live.hunter.fm/hitsbrasil_stream?ag=mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>
      </div>
    </div>
  );
}