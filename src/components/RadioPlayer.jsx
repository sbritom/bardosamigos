export default function RadioPlayer() {
  return (
    <section
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#1A1A1A",
          border: "1px solid #2a2a2a",
          borderRadius: "16px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#D4AF37",
            marginTop: 0,
          }}
        >
          📻 Rádio Ao Vivo
        </h2>

        <p>🎵 Tocando Agora: Em breve</p>

        <p>👥 Ouvintes: 0</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <button
            style={{
              background: "#2a2a2a",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🎵 Pedir Música
          </button>
        </div>
      </div>
    </section>
  );
}