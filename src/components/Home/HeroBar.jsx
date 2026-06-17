import { Link } from "react-router-dom";

export default function HeroBar() {
  return (
    <section className="bar-container">
      <div className="bar-card bar-hero overflow-hidden">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-5 p-6 lg:p-8">
            <div className="text-sm bar-gold-text font-black mb-2">
              🍻 BAR DOS AMIGOS
            </div>

            <h1 className="text-3xl lg:text-5xl font-black leading-tight">
              Aqui a <span className="bar-gold-text">diversão</span>
              <br />
              nunca para!
            </h1>

            <p className="text-zinc-300 mt-3 max-w-xl">
              Rádio, TV, futebol, notícias, ferramentas e comunidade em um só lugar.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/tv?categoria=Futebol"
                className="bar-gold-btn px-5 py-3 rounded-xl text-sm"
              >
                📺 Assistir TV
              </Link>

              <a
                href="#chat-tv"
                className="px-5 py-3 rounded-xl text-sm font-bold bg-black/50 border border-yellow-500/20 hover:border-yellow-500 transition-all"
              >
                💬 Entrar no Chat
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 border-t lg:border-t-0 lg:border-l border-yellow-500/10">
            <HeroShortcut icon="📺" title="TV ao vivo" subtitle="Assista agora" to="/tv?categoria=Futebol" />
            <HeroShortcut icon="📻" title="Rádio online" subtitle="Ouça agora" />
            <HeroShortcut icon="⚽" title="Futebol" subtitle="Jogos e resultados" />
            <HeroShortcut icon="🛠️" title="Ferramentas" subtitle="BarStudio" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroShortcut({ icon, title, subtitle, to = "/" }) {
  return (
    <Link
      to={to}
      className="p-5 min-h-[150px] flex flex-col justify-center items-center text-center border-r border-b border-yellow-500/10 hover:bg-yellow-500/10 transition-all"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="font-black bar-gold-text uppercase text-sm">{title}</div>
      <div className="text-xs text-zinc-400 mt-1">{subtitle}</div>
    </Link>
  );
}