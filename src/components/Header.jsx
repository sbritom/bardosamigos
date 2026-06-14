export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
              🍺
            </div>

            <div>
              <h1 className="text-2xl font-bold text-yellow-500">
                BAR DOS AMIGOS
              </h1>

              <p className="text-zinc-400 text-sm">
                Comunidade • Rádio • Diversão
              </p>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-white">
            <a href="#">Home</a>
            <a href="#">Rádio</a>
            <a href="#">Games</a>
            <a href="#">Futebol</a>
            <a href="#">Músicas</a>
            <a href="#">Ferramentas</a>
          </nav>
        </div>
      </div>
    </header>
  );
}