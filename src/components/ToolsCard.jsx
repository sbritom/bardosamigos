import { useNavigate } from "react-router-dom";

export default function ToolsCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 h-full">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        🛠 Ferramentas
      </h3>

      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={() => navigate("/ferramentas/barstudio")}
          className="bg-black border border-yellow-500/30 hover:border-yellow-500 rounded-lg py-2 px-3 text-left transition-all"
        >
          🖼 BarStudio
        </button>

        <button
          onClick={() => navigate("/ferramentas/barcolors")}
          className="bg-black border border-cyan-500/30 hover:border-cyan-500 rounded-lg py-2 px-3 text-left transition-all"
        >
          🌈 BarColors
        </button>

        <button className="bg-black border border-zinc-700 rounded-lg py-2 px-3 text-left opacity-60">
          🎨 Avatar Maker
        </button>

        <button className="bg-black border border-zinc-700 rounded-lg py-2 px-3 text-left opacity-60">
          ✂ Magic Cut
        </button>

        <button className="bg-black border border-zinc-700 rounded-lg py-2 px-3 text-left opacity-60">
          📺 Thumb Maker
        </button>
      </div>
    </div>
  );
}