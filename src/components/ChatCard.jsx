export default function ChatCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
      <h3 className="text-yellow-500 text-2xl font-bold mb-4 text-center">
        💬 Chat Online
      </h3>

      <div className="flex justify-center">
        <iframe
          src="https://xat.com/embed/chat.php#id=160094644&gn=BarDosAmigos"
          width="650"
          height="486"
          frameBorder="0"
          scrolling="no"
          title="BarDosAmigos"
        />
      </div>
    </div>
  );
}