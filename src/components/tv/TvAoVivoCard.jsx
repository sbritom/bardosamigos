import { useEffect, useState } from "react";
import { buscarCanais } from "../../services/tvService";

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

      const destaques = canais.filter(
        (canal) => canal.destaque_home === true
      );

      if (destaques.length > 0) {
        setCanalAtual(destaques[0]);
      } else {
        setCanalAtual(canais[0] || null);
      }
    } catch (error) {
      console.error("Erro ao carregar TV:", error);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 h-full min-h-[420px] flex items-center justify-center">
        <div className="text-zinc-400">Carregando TV...</div>
      </div>
    );
  }

  if (!canalAtual) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 h-full min-h-[420px] flex items-center justify-center">
        <div className="text-zinc-400">
          Nenhuma transmissão disponível.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-red-500/20 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-red-500 text-xl font-bold">
          📺 TV Ao Vivo
        </h3>

        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full font-bold">
          AO VIVO
        </span>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800">
        {canalAtual.url_embed ? (
          <iframe
            className="w-full h-full"
            src={canalAtual.url_embed}
            title={canalAtual.nome}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400">
            Canal sem player configurado
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="font-bold text-yellow-500 text-lg">
          🔴 {canalAtual.nome}
        </div>

        <div className="text-zinc-400 text-sm mt-1">
          {canalAtual.titulo_transmissao ||
            canalAtual.descricao ||
            "Transmissão ao vivo"}
        </div>
      </div>
    </div>
  );
}