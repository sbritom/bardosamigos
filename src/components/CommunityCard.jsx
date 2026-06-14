export default function CommunityCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <h3 className="text-yellow-500 text-xl font-bold mb-4">
        👥 Comunidade
      </h3>

      <div className="space-y-3">
        <div>🏆 Top Membros</div>

        <div>🎂 Aniversariantes</div>

        <div>⭐ Destaques</div>

        <div>🎉 Eventos da Semana</div>
      </div>
    </div>
  );
}