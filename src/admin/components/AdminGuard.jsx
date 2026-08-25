import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  observarAutenticacaoAdmin,
  obterSessaoAdmin,
} from "../../services/adminAuthService";

export default function AdminGuard() {
  const location = useLocation();
  const [carregando, setCarregando] = useState(true);
  const [sessao, setSessao] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function verificar() {
      const atual = await obterSessaoAdmin();
      if (!ativo) return;
      setSessao(atual);
      setCarregando(false);
    }

    verificar();

    const parar = observarAutenticacaoAdmin((atual) => {
      if (!ativo) return;
      setSessao(atual);
      setCarregando(false);
    });

    return () => {
      ativo = false;
      parar();
    };
  }, []);

  if (carregando) {
    return (
      <main className="min-h-screen bg-bar-bg text-white flex items-center justify-center px-4">
        <div className="bar-card p-6 text-center text-zinc-400">
          Verificando acesso administrativo...
        </div>
      </main>
    );
  }

  if (!sessao) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}
