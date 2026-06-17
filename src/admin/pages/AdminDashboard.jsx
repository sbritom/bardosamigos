import { getActiveModules } from "../../core/portalRegistry";
import { providers } from "../../core/providers";

export default function AdminDashboard() {
  const modules = getActiveModules();

  return (
    <div>
      <h1 className="text-3xl font-black bar-gold-text mb-2">
        📊 Dashboard
      </h1>

      <p className="text-zinc-400 mb-6">
        Controle geral do Bar dos Amigos.
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <AdminMetric title="Módulos ativos" value={modules.length} icon="🧩" />
        <AdminMetric title="Providers" value={providers.length} icon="📡" />
        <AdminMetric title="TV" value="Online" icon="📺" />
        <AdminMetric title="Rádio" value="Persistente" icon="📻" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bar-card p-4">
          <h2 className="font-black bar-gold-text mb-4">
            Módulos do portal
          </h2>

          <div className="space-y-2">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bar-card-soft p-3 flex items-center justify-between"
              >
                <div>
                  <span className="mr-2">{module.icon}</span>
                  <strong>{module.title}</strong>
                </div>

                <span className="text-xs text-green-500 font-bold">
                  ATIVO
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bar-card p-4">
          <h2 className="font-black bar-gold-text mb-4">
            Providers preparados
          </h2>

          <div className="space-y-2">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="bar-card-soft p-3 flex items-center justify-between"
              >
                <div>
                  <strong>{provider.name}</strong>
                  <div className="text-xs text-zinc-500">{provider.type}</div>
                </div>

                <span
                  className={`text-xs font-bold ${
                    provider.active ? "text-green-500" : "text-zinc-500"
                  }`}
                >
                  {provider.active ? "ATIVO" : "FUTURO"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMetric({ title, value, icon }) {
  return (
    <div className="bar-card p-4">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-zinc-400 text-sm">{title}</div>
      <div className="text-2xl font-black bar-gold-text">{value}</div>
    </div>
  );
}