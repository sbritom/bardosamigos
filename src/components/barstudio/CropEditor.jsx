import Cropper from "react-easy-crop";

export default function CropEditor({
  imageSrc,
  crop,
  setCrop,
  zoom,
  setZoom,
  rotation,
  setRotation,
  formato,
  onCropComplete,
  borderSize,
  borderType,
  borderColor1,
  borderColor2,
  glow,
}) {
  if (!imageSrc) {
    return (
      <div className="w-full h-full flex items-center justify-center text-center">
        <div>
          <div className="text-7xl mb-4">🖼️</div>

          <div className="text-2xl text-zinc-500">
            Nenhuma imagem carregada
          </div>

          <div className="text-zinc-600 mt-2">
            Faça upload para começar
          </div>
        </div>
      </div>
    );
  }

  const overlayStyle =
    borderType === "gradient"
      ? {
          padding: `${borderSize}px`,
          borderRadius: formato === "circle" ? "9999px" : "24px",
          background: `linear-gradient(135deg, ${borderColor1}, ${borderColor2})`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          boxShadow: glow ? `0 0 35px ${borderColor1}` : "none",
        }
      : {
          border:
            borderType === "none"
              ? "none"
              : `${borderSize}px solid ${borderColor1}`,
          borderRadius: formato === "circle" ? "9999px" : "24px",
          boxShadow: glow ? `0 0 35px ${borderColor1}` : "none",
        };

  return (
    <div className="relative w-full h-full">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1}
        cropShape={formato === "circle" ? "round" : "rect"}
        showGrid={false}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
      />

      {borderSize > 0 && borderType !== "none" && (
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "12%",
            ...overlayStyle,
          }}
        />
      )}
    </div>
  );
}