import { useEffect, useState } from "react";
import { gerarImagemFinal } from "../../utils/imageEditor";

export default function PreviewCanvas({
  imageSrc,
  pixelCrop,
  rotation,
  formato,
  borderSize,
  borderType,
  borderColor1,
  borderColor2,
  glow,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    async function atualizarPreview() {
      if (!imageSrc || !pixelCrop) {
        setPreviewUrl(null);
        return;
      }

      try {
        const canvas = await gerarImagemFinal({
          imageSrc,
          pixelCrop,
          rotation,
          formato,
          borderSize,
          borderType,
          borderColor1,
          borderColor2,
          glow,
        });

        setPreviewUrl(
          canvas.toDataURL("image/png")
        );
      } catch (error) {
        console.error(error);
      }
    }

    atualizarPreview();
  }, [
    imageSrc,
    pixelCrop,
    rotation,
    formato,
    borderSize,
    borderType,
    borderColor1,
    borderColor2,
    glow,
  ]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview Final"
          className="
            max-w-full
            max-h-full
            object-contain
          "
        />
      ) : (
        <div className="text-zinc-500">
          Preview Final
        </div>
      )}
    </div>
  );
}