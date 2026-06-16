export default function ChatCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 h-[760px] flex flex-col">
      <h3 className="text-yellow-500 text-2xl font-bold mb-4 text-center">
        💬 Chat Online
      </h3>

      <div className="flex-1 rounded-xl overflow-hidden bg-black border border-zinc-800">
        <iframe
          src="https://xat.com/embed/chat.php#id=160094644&gn=BarDosAmigos"
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          title="BarDosAmigos"
        />
      </div>
    </div>
  );
}