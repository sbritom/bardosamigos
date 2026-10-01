export default function PortalLayout({ children }) {
  return (
    <main className="pb-6">
      {children}

      <footer className="bar-container mt-5 text-center text-[11px] text-zinc-500 border-t border-[#4b79a6]/15 pt-4">
        © 2026 IMORTAL0800. Todos os direitos reservados.
      </footer>
    </main>
  );
}
