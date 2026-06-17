import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarCanais } from "../../services/tvService";

const CANAL_PADRAO = {
  id: "padrao-tv",
  nome: "TV Bar dos Amigos",
  categoria: "Futebol",
  tipo: "youtube_embed",
  url_embed: "https://www.youtube.com/embed/URt8jOImwTw",
  titulo_transmissao: "Transmissão Ao Vivo",
  descricao: "Canal principal do Bar dos Amigos",
  destaque_home: true,
  ativo: true,
};

export default function TvAoVivoCard() {
  const navigate = useNavigate();

  const [canalAtual, setCanalAtual] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setCarregando(true);

      const canais = await buscarCanais();

      const canaisComPlayer = canais.filter(
        (canal) => canal.ativo === true && canal.url_embed
      );

      const destaque = canaisComPlayer.find(
        (canal) => canal.destaque_home === true
      );

      setCanalAtual(destaque || canaisComPlayer[0] || CANAL_PADRAO);
    } catch (error) {
      console.error("Erro ao carregar TV:", error);
      setCanalAtual(CANAL_PADRAO);
    } finally {
      setCarregando(false);
    }
  }

  function abrirTv(categoria) {
    navigate(`/tv?categoria=${encodeURIComponent(categoria)}`);
  }

  if (carregando) {
    return (
      <div className="bar-card h-full min-h-[500px] flex items-center justify-center">
        <div className="text-zinc-400">Carregando TV...</div>
      </div>
    );
  }

  return (
    <div className="bar-card h-full min-h-[500px] flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="bar-gold-text text-xl font-black">📺 TV Ao Vivo</h3>

        <button
          onClick={() => abrirTv(canalAtual?.categoria || "Futebol")}
          className="text-xs border border-yellow-500/25 px-3 py-1 rounded-full hover:border-yellow-500 transition-all"
        >
          Ver todos
        </button>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden bg-black border border-yellow-500/15">
        <iframe
          className="w-full h-full"
          src={canalAtual.url_embed}
          title={canalAtual.nome}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="font-black bar-gold-text text-xl">
            {canalAtual.titulo_transmissao || canalAtual.nome}
          </div>

          <div className="text-zinc-400 text-sm mt-1">
            {canalAtual.descricao || canalAtual.categoria || "TV Bar dos Amigos"}
          </div>
        </div>

        <span className="bar-live px-3 py-1 rounded-full text-xs shrink-0">
          AO VIVO
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-auto pt-5">
        {["Futebol", "Música", "Filmes", "Eventos"].map((categoria) => (
          <button
            key={categoria}
            onClick={() => abrirTv(categoria)}
            className="bar-mini-card py-3 text-sm font-bold"
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}