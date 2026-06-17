import { useCallback, useState } from "react";
import Footer from "../components/Footer";
import { supabase } from "../services/supabase";

import ImageUploader from "../components/barstudio/ImageUploader";
import CropEditor from "../components/barstudio/CropEditor";
import SettingsPanel from "../components/barstudio/SettingsPanel";
import ExportPanel from "../components/barstudio/ExportPanel";

import { gerarImagemFinal } from "../utils/imageEditor";

const BUCKET = "barstudio";

export default function BarStudioPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [formato, setFormato] = useState("circle");
  const [borderType, setBorderType] = useState("solid");
  const [borderSize, setBorderSize] = useState(8);
  const [borderColor1, setBorderColor1] = useState("#FFD700");
  const [borderColor2, setBorderColor2] = useState("#00D9FF");
  const [glow, setGlow] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  function handleImageSelected({ file, url }) {
    setImageSrc(url);
    setFileName(file.name);
    setResultado(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  }

  async function gerarCanvasFinal() {
    if (!imageSrc || !croppedAreaPixels) {
      alert("Selecione uma imagem primeiro.");
      return null;
    }

    return await gerarImagemFinal({
      imageSrc,
      pixelCrop: croppedAreaPixels,
      rotation,
      formato,
      borderSize,
      borderType,
      borderColor1,
      borderColor2,
      glow,
    });
  }

  async function baixarImagem() {
    const canvas = await gerarCanvasFinal();
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `barstudio-${Date.now()}.png`;
      a.click();

      URL.revokeObjectURL(url);
    }, "image/png");
  }

  async function hospedarImagem() {
    try {
      setUploading(true);

      const canvas = await gerarCanvasFinal();
      if (!canvas) {
        setUploading(false);
        return;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("Não foi possível gerar a imagem.");
          setUploading(false);
          return;
        }

        const filePath = `uploads/barstudio-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}.png`;

        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, blob, {
            contentType: "image/png",
            upsert: false,
          });

        if (error) {
          console.error(error);
          alert("Erro ao hospedar imagem.");
          setUploading(false);
          return;
        }

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

        const link = data.publicUrl;

        setResultado({
          link,
          html: `<img src="${link}" alt="BarStudio" />`,
          bbcode: `[img]${link}[/img]`,
          markdown: `![BarStudio](${link})`,
        });

        setUploading(false);
      }, "image/png");
    } catch (error) {
      console.error(error);
      alert("Erro inesperado ao hospedar imagem.");
      setUploading(false);
    }
  }

  async function copiar(texto) {
    await navigator.clipboard.writeText(texto);
    alert("Copiado!");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex justify-end mb-6">
          <a
            href="/"
            className="bg-zinc-900 border border-yellow-500/30 hover:border-yellow-500 rounded-xl px-5 py-3 flex items-center gap-2 transition-all"
          >
            🏠 Voltar para o início
          </a>
        </div>

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-yellow-500 mb-2">
            🖼 BarStudio
          </h1>

          <p className="text-zinc-400 text-lg">
            Editor simples para criar imagens redondas, quadradas e com bordas
            personalizadas.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-3">
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 h-full">
              <h2 className="text-3xl font-bold text-yellow-500 mb-6">
                Upload
              </h2>

              <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🖼️</div>

                <div className="text-xl font-semibold mb-4">
                  Envie sua imagem
                </div>

                <ImageUploader onImageSelected={handleImageSelected} />

                <p className="text-zinc-500 mt-4">
                  Formatos aceitos:
                  <br />
                  PNG • JPG • WEBP • GIF
                </p>

                {fileName && (
                  <p className="text-cyan-400 text-sm mt-3 break-all">
                    {fileName}
                  </p>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  Ajustes
                </h3>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>🔍 Zoom</span>
                      <span>{Math.round(zoom * 100)}%</span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full accent-yellow-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>🔄 Rotação</span>
                      <span>{rotation}°</span>
                    </div>

                    <input
                      type="range"
                      min={-180}
                      max={180}
                      step={1}
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-yellow-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setRotation(rotation - 90)}
                      className="bg-black border border-zinc-700 rounded-xl py-3 hover:border-yellow-500"
                    >
                      ↺ -90°
                    </button>

                    <button
                      onClick={() => setRotation(rotation + 90)}
                      className="bg-black border border-zinc-700 rounded-xl py-3 hover:border-yellow-500"
                    >
                      ↻ +90°
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-5">
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 h-full">
              <h2 className="text-3xl font-bold text-yellow-500 mb-2">
                Editor
              </h2>

              <p className="text-zinc-500 mb-6">
                Arraste a imagem, ajuste o zoom e personalize sua borda em tempo
                real.
              </p>

              <div className="relative w-full aspect-square max-w-[600px] mx-auto bg-black rounded-2xl border border-zinc-700 overflow-hidden">
                <CropEditor
                  imageSrc={imageSrc}
                  crop={crop}
                  setCrop={setCrop}
                  zoom={zoom}
                  setZoom={setZoom}
                  rotation={rotation}
                  setRotation={setRotation}
                  formato={formato}
                  onCropComplete={onCropComplete}
                  borderSize={borderSize}
                  borderType={borderType}
                  borderColor1={borderColor1}
                  borderColor2={borderColor2}
                  glow={glow}
                />
              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 h-full">
              <h2 className="text-3xl font-bold text-yellow-500 mb-2">
                Configurações
              </h2>

              <p className="text-zinc-500 mb-6">
                Defina formato, borda, cores e exportação.
              </p>

              <SettingsPanel
                formato={formato}
                setFormato={setFormato}
                borderType={borderType}
                setBorderType={setBorderType}
                borderSize={borderSize}
                setBorderSize={setBorderSize}
                borderColor1={borderColor1}
                setBorderColor1={setBorderColor1}
                borderColor2={borderColor2}
                setBorderColor2={setBorderColor2}
                glow={glow}
                setGlow={setGlow}
              />

              <ExportPanel
                imageSrc={imageSrc}
                uploading={uploading}
                onDownload={baixarImagem}
                onUpload={hospedarImagem}
              />
            </div>
          </div>
        </div>

        {resultado && (
          <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-yellow-500 text-2xl font-bold mb-4">
              ✅ Imagem hospedada
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                ["Link direto", resultado.link],
                ["HTML", resultado.html],
                ["BBCode", resultado.bbcode],
                ["Markdown", resultado.markdown],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-black border border-zinc-800 rounded-xl p-4"
                >
                  <div className="text-yellow-500 font-bold mb-2">
                    {label}
                  </div>

                  <textarea
                    readOnly
                    value={value}
                    className="w-full h-20 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300"
                  />

                  <button
                    onClick={() => copiar(value)}
                    className="mt-3 bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg"
                  >
                    Copiar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}