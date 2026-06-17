export default function TVPlayer({ canal }) {
  if (!canal?.url_embed) {
    return (
      <div className="aspect-video bg-black flex items-center justify-center text-zinc-500">
        Nenhuma transmissão disponível
      </div>
    );
  }

  if (canal.plataforma === "radio") {
    return (
      <div className="aspect-video bg-black flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-4">📻</div>
        <h2 className="text-2xl font-black bar-gold-text">{canal.nome}</h2>
        <p className="text-zinc-400 mt-2">{canal.descricao}</p>

        <audio className="mt-6 w-full max-w-xl" controls src={canal.url_embed}>
          Seu navegador não suporta áudio.
        </audio>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black">
      <iframe
        className="w-full h-full"
        src={canal.url_embed}
        title={canal.nome}
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}