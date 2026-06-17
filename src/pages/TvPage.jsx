import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import TVPlayer from "../components/tv/TVPlayer";
import {
  buscarCanaisPorCategoria,
  resolverCanalAutomatico,
} from "../services/tvService";

const categorias = [
  { nome: "Futebol", icon: "⚽" },
  { nome: "Música", icon: "🎵" },
  { nome: "Filmes", icon: "🎬" },
  { nome: "Eventos", icon: "🎤" },
  { nome: "Canais", icon: "📡" },
];

export default function TvPage() {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get("categoria") || "Futebol";

  const [canais, setCanais] = useState([]);
  const [canalAtual, setCanalAtual] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregar();

    const interval = setInterval(() => {
      carregar(false);
    }, 60000);

    return () => clearInterval(interval);
  }, [categoria]);

  async function carregar(mostrarLoading = true) {
    try {
      if (mostrarLoading) setCarregando(true);

      const lista = await buscarCanaisPorCategoria(categoria);
      setCanais(lista);

      if (lista.length > 0) {
        const canalResolvido = await resolverCanalAutomatico(lista[0]);
        setCanalAtual(canalResolvido);
      } else {
        setCanalAtual(null);
      }
    } catch (error) {
      console.error("Erro ao carregar TV:", error);
    } finally {
      setCarregando(false);
    }
  }

  async function selecionarCanal(canal) {
    setCarregando(true);

    const canalResolvido = await resolverCanalAutomatico(canal);

    setCanalAtual(canalResolvido);
    setCarregando(false);
  }

  return (
    <main className="pb-10">
      <section className="bar-container mt-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black bar-gold-text">
              📺 TV Bar dos Amigos
            </h1>
            <p className="text-zinc-400 mt-1">
              Canais ao vivo, lives automáticas e estrutura pronta para IPTV.
            </p>
          </div>

          <Link
            to="/"
            className="bar-mini-card px-4 py-2 text-sm font-bold w-fit"
          >
            ← Voltar
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto bar-scroll mb-5">
          {categorias.map((cat) => (
            <Link
              key={cat.nome}
              to={`/tv?categoria=${encodeURIComponent(cat.nome)}`}
              className={`px-5 py-3 rounded-xl border text-sm font-black transition-all min-w-max ${
                categoria === cat.nome
                  ? "bar-gold-btn"
                  : "bg-zinc-950 border-yellow-500/20 hover:border-yellow-500"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.nome}
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9">
            <div className="bar-card overflow-hidden">
              {carregando ? (
                <div className="aspect-video bg-black flex items-center justify-center text-zinc-400">
                  Carregando transmissão...
                </div>
              ) : (
                <TVPlayer canal={canalAtual} />
              )}

              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black bar-gold-text">
                    {canalAtual?.titulo_transmissao ||
                      canalAtual?.nome ||
                      "Nenhuma transmissão"}
                  </h2>

                  <p className="text-zinc-400 mt-1">
                    {canalAtual?.descricao ||
                      "Escolha um canal disponível na lista."}
                  </p>

                  {canalAtual?.status === "offline" && (
                    <p className="text-yellow-400 text-sm mt-2">
                      Live automática não encontrada. Exibindo canal reserva.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black ${
                      canalAtual?.status === "offline"
                        ? "bg-zinc-700 text-zinc-300"
                        : "bar-live"
                    }`}
                  >
                    {canalAtual?.status === "offline" ? "RESERVA" : "AO VIVO"}
                  </span>

                  <span className="text-xs text-zinc-500 uppercase">
                    {canalAtual?.plataforma || "tv"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-3">
            <div className="bar-card p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black bar-gold-text">
                  {categoria}
                </h3>

                <button
                  onClick={() => carregar()}
                  className="text-xs border border-yellow-500/25 px-3 py-1 rounded-full hover:border-yellow-500"
                >
                  Atualizar
                </button>
              </div>

              <div className="space-y-3 max-h-[620px] overflow-y-auto bar-scroll pr-1">
                {canais.length === 0 && (
                  <div className="text-zinc-500 text-sm">
                    Nenhum canal cadastrado.
                  </div>
                )}

                {canais.map((canal) => (
                  <button
                    key={canal.id}
                    onClick={() => selecionarCanal(canal)}
                    className={`w-full text-left rounded-xl p-4 transition-all border ${
                      canalAtual?.id === canal.id
                        ? "bar-gold-btn"
                        : "bg-black border-yellow-500/15 hover:border-yellow-500"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-black">{canal.nome}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {canal.descricao || canal.plataforma}
                        </div>
                      </div>

                      {canal.auto_live && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-red-600 text-white font-black">
                          AUTO
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}