import PortalLayout from "../components/layout/PortalLayout";
import PortalCard from "../components/shared/PortalCard";
import QuickTile from "../components/shared/QuickTile";

import HeroBar from "../components/home/HeroBar";
import ChatCard from "../components/ChatCard";
import TvAoVivoCard from "../components/tv/TvAoVivoCard";
import LiveFootballCard from "../components/LiveFootballCard";
import LatestNewsCard from "../components/LatestNewsCard";

import { quickAccess } from "../config/portalConfig";

export default function Home() {
  return (
    <PortalLayout>
      <HeroBar />

      <section id="chat-tv" className="bar-container mt-4">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <ChatCard />
          </div>

          <div className="lg:col-span-6">
            <TvAoVivoCard />
          </div>
        </div>
      </section>

      <section className="bar-container mt-4">
        <PortalCard>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            {quickAccess.map((item) => (
              <QuickTile
                key={item.title}
                icon={item.icon}
                title={item.title}
                subtitle="Acessar"
                to={item.path}
              />
            ))}
          </div>
        </PortalCard>
      </section>

      <section className="bar-container mt-4">
        <div className="grid xl:grid-cols-12 gap-4">
          <div className="xl:col-span-4">
            <LiveFootballCard />
          </div>

          <div className="xl:col-span-4">
            <LatestNewsCard />
          </div>

          <div className="xl:col-span-4">
            <PortalCard title="🎵 Rádio / Música">
              <div className="bar-card-soft p-4">
                <div className="text-xs bar-gold-text font-bold uppercase mb-2">
                  Tocando agora
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center text-2xl">
                    🎧
                  </div>

                  <div className="flex-1">
                    <div className="font-bold">Rádio Bar dos Amigos</div>
                    <div className="text-xs text-zinc-400">
                      Programação ao vivo
                    </div>

                    <div className="h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-2/3 bg-yellow-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-xs font-bold text-center">
                <button className="bar-mini-card py-2">Top 5</button>
                <button className="bar-mini-card py-2">Pedidos</button>
                <button className="bar-mini-card py-2">Agenda</button>
              </div>
            </PortalCard>
          </div>
        </div>
      </section>

      <section className="bar-container mt-4">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <PortalCard
              title="Ferramentas / BarStudio"
              icon="🛠️"
              action={
                <button className="text-xs border border-yellow-500/25 px-3 py-1 rounded-full hover:border-yellow-500 transition-all">
                  Ver todas
                </button>
              }
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  ["🖼️", "Avatar"],
                  ["🎨", "NameColor"],
                  ["🪄", "Banner"],
                  ["✂️", "Magic Cut"],
                  ["📦", "Hospedar"],
                  ["🔁", "Converter"],
                  ["🔳", "QR Code"],
                  ["✨", "IA"],
                ].map(([icon, title]) => (
                  <button key={title} className="bar-mini-card p-4 text-center">
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="text-sm font-bold">{title}</div>
                  </button>
                ))}
              </div>
            </PortalCard>
          </div>

          <div className="lg:col-span-5">
            <PortalCard title="Games / Comunidade" icon="🎮">
              <div className="grid grid-cols-2 gap-3">
                {["Free Fire", "Fortnite", "Minecraft", "Roblox"].map(
                  (game) => (
                    <div
                      key={game}
                      className="bar-mini-card min-h-[86px] p-3 flex items-end font-black"
                    >
                      {game}
                    </div>
                  )
                )}
              </div>

              <div className="bar-card-soft p-4 mt-3">
                <div className="font-black bar-gold-text">
                  👥 Comunidade ativa
                </div>
                <div className="text-sm text-zinc-400 mt-1">
                  Eventos, ranking, missões e destaques do portal.
                </div>
              </div>
            </PortalCard>
          </div>
        </div>
      </section>
    </PortalLayout>
  );
}