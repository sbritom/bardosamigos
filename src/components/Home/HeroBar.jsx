import { Link } from "react-router-dom";

export default function HeroBar() {
  return (
    <section className="bar-container">
      <div className="bar-card bar-hero overflow-hidden">
        <div className="grid lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 px-5 py-4 lg:px-6 lg:py-5 flex flex-col justify-center">
            <div className="text-[11px] bar-gold-text font-black tracking-[0.18em] uppercase mb-2">
              IMORTAL0800
            </div>

            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                  TV, rádio, futebol, games e comunidade.
                </h1>

                <p className="text-zinc-400 mt-1.5 text-sm max-w-2xl">
                  Tudo em um só lugar, de forma simples e direta.
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <a
                  href="#chat-tv"
                  className="px-4 py-2 rounded-lg text-xs font-bold border border-[#4b79a6]/30 hover:border-[#4b79a6] transition-all"
                >
                  Abrir chat
                </a>

                <Link
                  to="/tv?categoria=Futebol"
                  className="bar-gold-btn px-4 py-2 rounded-lg text-xs"
                >
                  Assistir TV
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-4 border-t lg:border-t-0 lg:border-l border-[#4b79a6]/15">
            <HeroShortcut title="TV" subtitle="Ao vivo" to="/tv?categoria=Futebol" />
            <HeroShortcut title="Rádio" subtitle="Ouvir" />
            <HeroShortcut title="Futebol" subtitle="Jogos" />
            <HeroShortcut title="Games" subtitle="Explorar" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroShortcut({ title, subtitle, to = "/" }) {
  return (
    <Link
      to={to}
      className="min-h-[82px] px-2 flex flex-col justify-center items-center text-center border-r border-[#4b79a6]/10 hover:bg-[#244d78]/10 transition-all"
    >
      <div className="font-black bar-gold-text text-xs uppercase tracking-wide">{title}</div>
      <div className="text-[10px] text-zinc-500 mt-1">{subtitle}</div>
    </Link>
  );
}
