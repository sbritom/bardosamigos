import { useRef } from "react";

export default function ImageUploader({
  onImageSelected,
}) {
  const fileInputRef = useRef(null);

  function selecionarImagem(event) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith("image/")
    ) {
      alert(
        "Selecione uma imagem válida."
      );
      return;
    }

    const url =
      URL.createObjectURL(file);

    onImageSelected({
      file,
      url,
    });
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="
        image/png,
        image/jpeg,
        image/webp,
        image/gif
        "
        onChange={selecionarImagem}
        className="hidden"
      />

      <button
        onClick={() =>
          fileInputRef.current.click()
        }
        className="
          w-full
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          font-bold
          py-4
          rounded-xl
          text-lg
        "
      >
        Selecionar Imagem
      </button>
    </>
  );
}