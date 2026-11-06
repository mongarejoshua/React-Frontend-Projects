import { createExportSvg } from './paintingUtils.js';

export async function exportPainting(painting, format = 'png', scale = 1) {
  const width = 1600 * scale;
  const height = 2000 * scale;
  const svg = createExportSvg(painting, width, height);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not create an export canvas.');
    context.drawImage(image, 0, 0, width, height);
    const output = await new Promise((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error('The image could not be exported.')), `image/${format}`, format === 'jpeg' ? 0.94 : undefined);
    });
    const downloadUrl = URL.createObjectURL(output);
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = `rothko-studio-${Date.now()}.${format === 'jpeg' ? 'jpg' : 'png'}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  } finally {
    URL.revokeObjectURL(url);
  }
}
