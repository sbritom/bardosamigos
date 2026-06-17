import { Link } from "react-router-dom";

import HeroBar from "../components/home/HeroBar";
import ChatCard from "../components/ChatCard";
import TvAoVivoCard from "../components/tv/TvAoVivoCard";
import LiveFootballCard from "../components/LiveFootballCard";
import LatestNewsCard from "../components/LatestNewsCard";

export default function Home() {
  return (
    <main className="pb-10">
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
        <div className="bar-card p-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <QuickAccess icon="📻" title="Rádio Online" subtitle="Música e programação" />
            <QuickAccess icon="⚽" title="Futebol Ao Vivo" subtitle="Jogos e campeonatos" />
            <QuickAccess icon="📰" title="Notícias" subtitle="Atualidades do mundo" />
            <QuickAccess icon="🛠️" title="Ferramentas" subtitle="BarStudio" />
            <QuickAccess icon="🎮" title="Games" subtitle="Notícias e novidades" />
            <QuickAccess icon="💰" title="BarCoins" subtitle="Missões e prêmios" to="/barcoins" />
          </div>
        </div>
      </section>

      <section className="bar-container mt-4">
        <div className="grid xl:grid-cols-12 gap-4">
          <div className="xl:col-span-3">
            <LiveFootballCard />
          </div>

          <div className="xl:col-span-3">
            <LatestNewsCard />
          </div>

          <div className="xl:col-span-3">
            <MusicPanel />
          </div>

          <div className="xl:col-span-3">
            <CommunityPanel />
          </div>
        </div>
      </section>

      <section className="bar-container mt-4">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <ToolsPanel />
          </div>

          <div className="lg:col-span-5">
            <GamesPanel />
          </div>
        </div>
      </section>

      <section className="bar-container mt-4">
        <div className="bar-card p-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <InfoStrip icon="🎧" title="100% gratuito" text="Tudo em um só lugar" />
            <InfoStrip icon="👤" title="Sem cadastro" text="Acesse livre e total" />
            <InfoStrip icon="📡" title="Conteúdo ao vivo" text="Atualizado em tempo real" />
            <InfoStrip icon="🛠️" title="+20 ferramentas" text="Para você usar" />
            <InfoStrip icon="🛡️" title="Site seguro" text="Privacidade em primeiro lugar" />
          </div>
        </div>
      </section>

      <footer className="bar-container mt-6 text-center text-xs text-zinc-500">
        © 2016 - 2026 Bar dos Amigos. Todos os direitos reservados.
      </footer>
    </main>
  );
}

function QuickAccess({ icon, title, subtitle, to = "/" }) {
  return (
    <Link to={to} className="bar-mini-card p-4 flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <div>
        <div className="font-black text-sm">{title}</div>
        <div className="text-xs text-zinc-400">{subtitle}</div>
      </div>
    </Link>
  );
}

function MusicPanel() {
  return (
    <div className="bar-card p-4 h-full">
      <PanelHeader title="🎵 Rádio / Música" />

      <div className="bar-card-soft p-4">
        <div className="text-xs bar-gold-text font-bold uppercase mb-2">
          Tocando agora
        </div>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center text-2xl">
            🎤
          </div>

          <div className="flex-1">
            <div className="font-bold">Última Saudade</div>
            <div className="text-xs text-zinc-400">Henrique & Juliano</div>

            <div className="h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full w-2/3 bg-yellow-500 rounded-full" />
            </div>
          </div>

          <button className="w-10 h-10 rounded-full bar-gold-btn">▶</button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 text-xs font-bold text-center">
        <button className="bar-mini-card py-2">Top 5</button>
        <button className="bar-mini-card py-2">Lançamentos</button>
        <button className="bar-mini-card py-2">Pedidos</button>
      </div>
    </div>
  );
}

function CommunityPanel() {
  const items = [
    ["🏆", "Top Membros", "Os mais ativos do chat"],
    ["🎂", "Aniversariantes", "06 de Junho"],
    ["⭐", "Destaques", "Usuários em evidência"],
    ["🎁", "Missões", "Complete e ganhe prêmios"],
    ["💰", "Ranking BarCoins", "Os mais ricos do portal"],
  ];

  return (
    <div className="bar-card p-4 h-full">
      <PanelHeader title="👥 Comunidade" />

      <div className="space-y-2">
        {items.map(([icon, title, text]) => (
          <div key={title} className="bar-card-soft p-3 flex items-center gap-3">
            <div className="text-2xl">{icon}</div>
            <div>
              <div className="font-bold text-sm">{title}</div>
              <div className="text-xs text-zinc-400">{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsPanel() {
  const tools = [
    ["🖼️", "Avatar Maker"],
    ["🎨", "Name Colorido"],
    ["🪄", "Banner Maker"],
    ["✂️", "Magic Cut"],
    ["📦", "Hospedar Imagem"],
    ["🔁", "Conversor"],
    ["🔳", "QR Code"],
    ["✨", "BarStudio"],
  ];

  return (
    <div className="bar-card p-4 h-full">
      <PanelHeader title="🛠️ Ferramentas" button="Ver todas" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map(([icon, title]) => (
          <button key={title} className="bar-mini-card p-4 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-sm font-bold">{title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function GamesPanel() {
  const games = ["Free Fire", "Fortnite", "Minecraft", "Roblox", "CS2", "League"];

  return (
    <div className="bar-card p-4 h-full">
      <PanelHeader title="🎮 Games" button="Ver todos" />

      <div className="grid grid-cols-2 gap-3">
        {games.map((game) => (
          <div
            key={game}
            className="bar-mini-card min-h-[86px] p-3 flex items-end font-black"
          >
            {game}
          </div>
        ))}
      </div>

      <div className="bar-card-soft p-4 mt-3">
        <div className="font-black bar-gold-text">🏆 Torneios e Eventos</div>
        <div className="text-sm text-zinc-400 mt-1">
          Participe dos nossos eventos e ganhe prêmios exclusivos.
        </div>
      </div>
    </div>
  );
}

function InfoStrip({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-xl">
        {icon}
      </div>

      <div>
        <div className="font-black text-sm uppercase">{title}</div>
        <div className="text-xs text-zinc-400">{text}</div>
      </div>
    </div>
  );
}

function PanelHeader({ title, button }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-black bar-gold-text">{title}</h2>

      {button && (
        <button className="text-xs border border-yellow-500/25 px-3 py-1 rounded-full hover:border-yellow-500 transition-all">
          {button}
        </button>
      )}
    </div>
  );
}