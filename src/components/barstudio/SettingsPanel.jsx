export default function SettingsPanel({
  formato,
  setFormato,
  borderType,
  setBorderType,
  borderSize,
  setBorderSize,
  borderColor1,
  setBorderColor1,
  borderColor2,
  setBorderColor2,
  glow,
  setGlow,
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setFormato("circle")}
          className={`w-full bg-black border rounded-xl py-4 ${
            formato === "circle" ? "border-yellow-500" : "border-zinc-700"
          }`}
        >
          ⭕ Circular
        </button>

        <button
          onClick={() => setFormato("square")}
          className={`w-full bg-black border rounded-xl py-4 ${
            formato === "square" ? "border-yellow-500" : "border-zinc-700"
          }`}
        >
          ⬜ Quadrado
        </button>
      </div>

      <div className="pt-4 border-t border-zinc-800">
        <div className="flex justify-between text-sm mb-2">
          <span>Espessura da borda</span>
          <span>{borderSize}px</span>
        </div>

        <input
          type="range"
          min={0}
          max={50}
          value={borderSize}
          onChange={(e) => setBorderSize(Number(e.target.value))}
          className="w-full accent-yellow-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setBorderType("none")}
          className={`bg-black border rounded-xl py-3 ${
            borderType === "none" ? "border-yellow-500" : "border-zinc-700"
          }`}
        >
          Sem Borda
        </button>

        <button
          onClick={() => setBorderType("solid")}
          className={`bg-black border rounded-xl py-3 ${
            borderType === "solid" ? "border-yellow-500" : "border-zinc-700"
          }`}
        >
          Cor Única
        </button>

        <button
          onClick={() => setBorderType("gradient")}
          className={`bg-black border rounded-xl py-3 ${
            borderType === "gradient" ? "border-yellow-500" : "border-zinc-700"
          }`}
        >
          Gradiente
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="bg-black border border-zinc-700 rounded-xl p-3">
          <div className="text-xs text-zinc-400 mb-2">Cor 1</div>

          <input
            type="color"
            value={borderColor1}
            onChange={(e) => setBorderColor1(e.target.value)}
            className="w-full h-10 bg-transparent"
          />
        </label>

        <label className="bg-black border border-zinc-700 rounded-xl p-3">
          <div className="text-xs text-zinc-400 mb-2">Cor 2</div>

          <input
            type="color"
            value={borderColor2}
            onChange={(e) => setBorderColor2(e.target.value)}
            className="w-full h-10 bg-transparent"
          />
        </label>
      </div>

      <button
        onClick={() => setGlow(!glow)}
        className={`w-full bg-black border rounded-xl py-4 ${
          glow ? "border-cyan-500" : "border-zinc-700"
        }`}
      >
        ✨ Efeito Glow {glow ? "Ativado" : "Desativado"}
      </button>
    </div>
  );
}