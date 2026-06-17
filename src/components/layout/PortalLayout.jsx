export default function PortalLayout({ children }) {
  return (
    <main className="pb-10">
      {children}

      <footer className="bar-container mt-6 text-center text-xs text-zinc-500">
        © 2016 - 2026 Bar dos Amigos. Todos os direitos reservados.
      </footer>
    </main>
  );
}