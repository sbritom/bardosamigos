export default function ExportPanel({
  imageSrc,
  uploading,
  onDownload,
  onUpload,
}) {
  return (
    <div className="mt-8 pt-6 border-t border-zinc-800">
      <h3 className="text-lg font-bold text-yellow-500 mb-4">
        Exportar
      </h3>

      <div className="grid gap-3">
        <button
          onClick={onDownload}
          disabled={!imageSrc}
          className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all"
        >
          ⬇ Baixar PNG
        </button>

        <button
          onClick={onUpload}
          disabled={!imageSrc || uploading}
          className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all"
        >
          {uploading ? "Hospedando..." : "☁ Hospedar Imagem"}
        </button>
      </div>

      <div className="mt-4 text-xs text-zinc-500 text-center">
        Suas imagens são suas.
        <br />
        Nenhum arquivo é salvo automaticamente.
      </div>
    </div>
  );
}