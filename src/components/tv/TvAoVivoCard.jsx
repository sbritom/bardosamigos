import { useEffect, useState } from "react";
import { buscarCanais } from "../../services/tvService";

const CANAL_PADRAO = {
  id: "padrao-musica",
  nome: "Música",
  categoria: "Música",
  tipo: "youtube_embed",
  url_embed: "https://www.youtube.com/embed/s6GjCmE8afw",
  titulo_transmissao: "Música ao Vivo",
  descricao: "Canal padrão do Bar dos Amigos",
  destaque_home: true,
  ativo: true,
};

export default function TvAoVivoCard() {
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

      setCanalAtual(
        destaque ||
        canaisComPlayer[0] ||
        CANAL_PADRAO
      );
    } catch (error) {
      console.error("Erro ao carregar TV:", error);
      setCanalAtual(CANAL_PADRAO);
    } finally {
      setCarregando(false);
    }
  }

  function abrirTv(categoria) {
    window.location.href =
      `/tv?categoria=${encodeURIComponent(categoria)}`;
  }

  if (carregando) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 h-[760px] flex items-center justify-center">
        <div className="text-zinc-400">
          Carregando TV...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-yellow-500/20 h-[760px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-yellow-500 text-xl font-bold">
          📺 TV Ao Vivo
        </h3>

        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full font-bold">
          AO VIVO
        </span>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800">
        <iframe
          className="w-full h-full"
          src={canalAtual.url_embed}
          title={canalAtual.nome}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-4">
        <div className="font-bold text-yellow-500 text-lg">
          🔴 {canalAtual.titulo_transmissao ||
            canalAtual.nome ||
            "Transmissão ao Vivo"}
        </div>

        <div className="text-zinc-400 text-sm mt-1">
          {canalAtual.descricao ||
            canalAtual.categoria ||
            "TV Bar dos Amigos"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto pt-5">
        {[
          "Música",
          "Filmes",
          "Eventos",
          "Futebol",
        ].map((categoria) => (
          <button
            key={categoria}
            onClick={() => abrirTv(categoria)}
            className="bg-black border border-zinc-700 hover:border-yellow-500 rounded-lg py-3 text-sm transition-all"
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}