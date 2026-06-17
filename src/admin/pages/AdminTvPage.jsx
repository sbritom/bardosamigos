import { useEffect, useState } from "react";
import { buscarCanais } from "../../services/tvService";

export default function AdminTvPage() {
  const [canais, setCanais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setCarregando(true);
    const lista = await buscarCanais();
    setCanais(lista);
    setCarregando(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-black bar-gold-text mb-2">
        📺 TV Inteligente
      </h1>

      <p className="text-zinc-400 mb-6">
        Gerenciamento visual dos canais. A edição completa entra no próximo pacote.
      </p>

      <div className="bar-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black bar-gold-text">
            Canais cadastrados
          </h2>

          <button
            onClick={carregar}
            className="bar-gold-btn px-4 py-2 rounded-xl text-sm"
          >
            Atualizar
          </button>
        </div>

        {carregando ? (
          <div className="text-zinc-400">Carregando canais...</div>
        ) : (
          <div className="space-y-3">
            {canais.map((canal) => (
              <div
                key={canal.id}
                className="bar-card-soft p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-black">{canal.nome}</div>
                  <div className="text-sm text-zinc-400">
                    {canal.categoria} • {canal.plataforma || canal.tipo}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {canal.titulo_transmissao || canal.descricao}
                  </div>
                </div>

                <div className="flex gap-2">
                  {canal.ativo && (
                    <span className="px-3 py-1 rounded-full bg-green-600 text-xs font-black">
                      ATIVO
                    </span>
                  )}

                  {canal.auto_live && (
                    <span className="px-3 py-1 rounded-full bg-red-600 text-xs font-black">
                      AUTO LIVE
                    </span>
                  )}

                  {canal.destaque_home && (
                    <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-black">
                      HOME
                    </span>
                  )}
                </div>
              </div>
            ))}

            {canais.length === 0 && (
              <div className="text-zinc-500">
                Nenhum canal encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}