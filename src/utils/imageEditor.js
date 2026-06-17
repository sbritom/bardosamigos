export function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));

    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

export async function gerarImagemFinal({
  imageSrc,
  pixelCrop,
  rotation = 0,
  formato = "circle",
  borderSize = 0,
  borderColor1 = "#FFD700",
  borderColor2 = "#00D9FF",
  borderType = "solid",
  glow = false,
}) {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const rotRad = getRadianAngle(rotation);

  const safeArea =
    Math.max(image.width, image.height) * 2;

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    safeArea / 2 - image.width / 2 + pixelCrop.x,
    safeArea / 2 - image.height / 2 + pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const finalSize = Math.max(
    pixelCrop.width,
    pixelCrop.height
  );

  const outputSize =
    finalSize + borderSize * 2;

  const outputCanvas =
    document.createElement("canvas");

  const outputCtx =
    outputCanvas.getContext("2d");

  outputCanvas.width = outputSize;
  outputCanvas.height = outputSize;

  if (glow) {
    outputCtx.shadowColor = borderColor1;
    outputCtx.shadowBlur = 30;
  }

  if (borderSize > 0) {
    if (borderType === "gradient") {
      const gradient =
        outputCtx.createLinearGradient(
          0,
          0,
          outputSize,
          outputSize
        );

      gradient.addColorStop(0, borderColor1);
      gradient.addColorStop(1, borderColor2);

      outputCtx.fillStyle = gradient;
    } else {
      outputCtx.fillStyle = borderColor1;
    }

    if (formato === "circle") {
      outputCtx.beginPath();
      outputCtx.arc(
        outputSize / 2,
        outputSize / 2,
        outputSize / 2,
        0,
        Math.PI * 2
      );
      outputCtx.fill();
    } else {
      outputCtx.fillRect(
        0,
        0,
        outputSize,
        outputSize
      );
    }
  }

  outputCtx.shadowBlur = 0;

  outputCtx.save();

  if (formato === "circle") {
    outputCtx.beginPath();
    outputCtx.arc(
      outputSize / 2,
      outputSize / 2,
      finalSize / 2,
      0,
      Math.PI * 2
    );
    outputCtx.clip();
  }

  outputCtx.drawImage(
    croppedCanvas,
    borderSize,
    borderSize,
    finalSize,
    finalSize
  );

  outputCtx.restore();

  return outputCanvas;
}