export default function AdminPlaceholder({ title, description }) {
  return (
    <div>
      <h1 className="text-3xl font-black bar-gold-text mb-2">
        {title}
      </h1>

      <p className="text-zinc-400 mb-6">
        {description}
      </p>

      <div className="bar-card p-6">
        <div className="text-5xl mb-4">🚧</div>

        <h2 className="text-xl font-black mb-2">
          Módulo preparado
        </h2>

        <p className="text-zinc-400">
          A estrutura já está pronta para receber as funções administrativas.
        </p>
      </div>
    </div>
  );
}