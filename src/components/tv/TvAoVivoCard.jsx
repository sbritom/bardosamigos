import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarCanalInteligente,
  buscarCanaisPorCategoria,
  resolverCanalAutomatico,
} from "../../services/tvService";

const categorias = ["Futebol", "Música", "Filmes", "Eventos"];

const CANAL_PADRAO = {
  id: "padrao-tv",
  nome: "TV Bar dos Amigos",
  categoria: "Futebol",
  plataforma: "youtube",
  url_embed: "https://www.youtube.com/embed/URt8jOImwTw",
  titulo_transmissao: "Transmissão Ao Vivo",
  descricao: "Canal principal do Bar dos Amigos",
  status: "online",
};

export default function TvAoVivoCard() {
  const navigate = useNavigate();

  const [canalAtual, setCanalAtual] = useState(null);
  const [canais, setCanais] = useState([]);
  const [categoriaAtual, setCategoriaAtual] = useState("Futebol");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregar("Futebol");

    const interval = setInterval(() => {
      carregar(categoriaAtual, false);
    }, 60000);

    return () => clearInterval(interval);
  }, [categoriaAtual]);

  async function carregar(categoria = "Futebol", mostrarLoading = true) {
    try {
      if (mostrarLoading) setCarregando(true);

      const lista = await buscarCanaisPorCategoria(categoria);
      const canal = await buscarCanalInteligente(categoria);

      setCanais(lista);
      setCanalAtual(canal || CANAL_PADRAO);
    } catch (error) {
      console.error("Erro ao carregar TV:", error);
      setCanalAtual(CANAL_PADRAO);
    } finally {
      setCarregando(false);
    }
  }

  async function trocarCanal(canal) {
    setCarregando(true);

    const resolvido = await resolverCanalAutomatico(canal);

    setCanalAtual(resolvido || canal);
    setCarregando(false);
  }

  function trocarCategoria(categoria) {
    setCategoriaAtual(categoria);
  }

  function abrirTv() {
    navigate(`/tv?categoria=${encodeURIComponent(categoriaAtual)}`);
  }

  return (
    <div className="bar-card h-full min-h-[500px] flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="bar-gold-text text-xl font-black">📺 TV Ao Vivo</h3>

        <button
          onClick={abrirTv}
          className="text-xs border border-yellow-500/25 px-3 py-1 rounded-full hover:border-yellow-500 transition-all"
        >
          Ver todos
        </button>
      </div>

      <div className="grid xl:grid-cols-12 gap-3 flex-1">
        <div className="xl:col-span-8">
          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-yellow-500/15">
            {carregando ? (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Carregando TV...
              </div>
            ) : canalAtual?.url_embed ? (
              <iframe
                className="w-full h-full"
                src={canalAtual.url_embed}
                title={canalAtual.nome}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Nenhuma transmissão disponível
              </div>
            )}
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-black bar-gold-text text-xl">
                {canalAtual?.titulo_transmissao ||
                  canalAtual?.nome ||
                  "TV Bar dos Amigos"}
              </div>

              <div className="text-zinc-400 text-sm mt-1">
                {canalAtual?.descricao ||
                  canalAtual?.categoria ||
                  "Transmissão ao vivo"}
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs shrink-0 font-black ${
                canalAtual?.status === "offline"
                  ? "bg-zinc-700 text-zinc-300"
                  : "bar-live"
              }`}
            >
              {canalAtual?.status === "offline" ? "RESERVA" : "AO VIVO"}
            </span>
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => trocarCategoria(categoria)}
                className={`py-2 rounded-lg text-xs font-black border ${
                  categoriaAtual === categoria
                    ? "bar-gold-btn"
                    : "bg-black border-yellow-500/15 hover:border-yellow-500"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto bar-scroll pr-1">
            {canais.slice(0, 5).map((canal) => (
              <button
                key={canal.id}
                onClick={() => trocarCanal(canal)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  canalAtual?.id === canal.id
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-black border-yellow-500/15 hover:border-yellow-500"
                }`}
              >
                <div className="font-bold text-sm">{canal.nome}</div>
                <div className="text-xs opacity-70 mt-1">
                  {canal.auto_live ? "Live automática" : canal.plataforma}
                </div>
              </button>
            ))}

            {canais.length === 0 && (
              <div className="text-xs text-zinc-500 p-3">
                Nenhum canal nesta categoria.
              </div>
            )}
          </div>

          <button
            onClick={abrirTv}
            className="bar-gold-btn w-full mt-3 py-3 rounded-xl text-xs"
          >
            Ver todos os canais
          </button>
        </div>
      </div>
    </div>
  );
}