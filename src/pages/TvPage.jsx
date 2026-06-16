import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { buscarCanaisPorCategoria } from "../services/tvService";

export default function TvPage() {
  const [searchParams] = useSearchParams();

  const categoria =
    searchParams.get("categoria") || "Futebol";

  const [canais, setCanais] = useState([]);
  const [canalAtual, setCanalAtual] = useState(null);

  useEffect(() => {
    carregar();
  }, [categoria]);

  async function carregar() {
    const lista = await buscarCanaisPorCategoria(categoria);

    setCanais(lista);

    if (lista.length > 0) {
      setCanalAtual(lista[0]);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-4xl font-bold text-yellow-500">
              📺 TV Bar dos Amigos
            </h1>

            <p className="text-zinc-400 mt-1">
              Assista canais ao vivo diretamente do portal
            </p>
          </div>

          <Link
            to="/"
            className="bg-zinc-900 hover:bg-yellow-500 hover:text-black border border-zinc-700 px-4 py-2 rounded-xl transition-all"
          >
            ← Voltar
          </Link>

        </div>

        <div className="flex flex-wrap gap-2 mb-6">

          <Link
            to="/tv?categoria=Futebol"
            className={`px-4 py-2 rounded-xl border transition-all ${
              categoria === "Futebol"
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-zinc-900 border-zinc-700"
            }`}
          >
            ⚽ Futebol
          </Link>

          <Link
            to="/tv?categoria=Música"
            className={`px-4 py-2 rounded-xl border transition-all ${
              categoria === "Música"
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-zinc-900 border-zinc-700"
            }`}
          >
            🎵 Música
          </Link>

          <Link
            to="/tv?categoria=Filmes"
            className={`px-4 py-2 rounded-xl border transition-all ${
              categoria === "Filmes"
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-zinc-900 border-zinc-700"
            }`}
          >
            🎬 Filmes
          </Link>

          <Link
            to="/tv?categoria=Eventos"
            className={`px-4 py-2 rounded-xl border transition-all ${
              categoria === "Eventos"
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-zinc-900 border-zinc-700"
            }`}
          >
            🎤 Eventos
          </Link>

        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="lg:col-span-3">

            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">

              <div className="aspect-video bg-black">

                {canalAtual?.url_embed ? (
                  <iframe
                    className="w-full h-full"
                    src={canalAtual.url_embed}
                    title={canalAtual.nome}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-500">
                    Nenhuma transmissão disponível
                  </div>
                )}

              </div>

              <div className="p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-yellow-500">
                      {canalAtual?.titulo_transmissao ||
                        canalAtual?.nome}
                    </h2>

                    <p className="text-zinc-400 mt-2">
                      {canalAtual?.descricao}
                    </p>

                  </div>

                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    🔴 AO VIVO
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">

            <h3 className="text-yellow-500 text-xl font-bold mb-4">
              {categoria}
            </h3>

            <div className="space-y-3">

              {canais.map((canal) => (
                <button
                  key={canal.id}
                  onClick={() => setCanalAtual(canal)}
                  className={`w-full text-left rounded-xl p-4 transition-all ${
                    canalAtual?.id === canal.id
                      ? "bg-yellow-500 text-black"
                      : "bg-black border border-zinc-700 hover:border-yellow-500"
                  }`}
                >
                  <div className="font-bold text-base">
                    {canal.nome}
                  </div>

                  <div className="text-xs opacity-80 mt-1">
                    {canal.descricao}
                  </div>
                </button>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}