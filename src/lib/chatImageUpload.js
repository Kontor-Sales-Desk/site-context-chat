const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_DIMENSION = 1568;
const MAX_BYTES = 4 * 1024 * 1024;
const MAX_IMAGES = 4;

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

function dataUrlToPayload(dataUrl) {
  const match = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(dataUrl);
  if (!match) throw new Error('Invalid image data');
  return { media_type: match[1], data: match[2] };
}

async function loadImageElement(file) {
  const dataUrl = await readFileAsDataUrl(file);
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error('Failed to decode image'));
    image.src = dataUrl;
  });
  return { image, dataUrl };
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to encode image'))),
      type,
      quality,
    );
  });
}

async function resizeIfNeeded(file) {
  const { image } = await loadImageElement(file);
  const longest = Math.max(image.naturalWidth, image.naturalHeight);
  const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = outputType === 'image/jpeg' ? 0.88 : undefined;

  if (longest <= MAX_DIMENSION && file.size <= MAX_BYTES) {
    return readFileAsDataUrl(file);
  }

  const scale = Math.min(1, MAX_DIMENSION / longest);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to prepare image');
  ctx.drawImage(image, 0, 0, width, height);

  let blob = await canvasToBlob(canvas, outputType, quality);
  if (blob.size > MAX_BYTES && outputType === 'image/jpeg') {
    blob = await canvasToBlob(canvas, outputType, 0.72);
  }
  if (blob.size > MAX_BYTES) {
    throw new Error('Image is too large after compression. Try a smaller screenshot.');
  }

  return readFileAsDataUrl(blob);
}

/** @returns {Promise<{ media_type: string; data: string; previewUrl: string }>} */
export async function prepareChatImageFile(file) {
  if (!ACCEPTED_TYPES.has(file.type)) {
    throw new Error('Use a PNG, JPEG, WebP, or GIF image.');
  }
  const dataUrl = await resizeIfNeeded(file);
  const payload = dataUrlToPayload(dataUrl);
  return { ...payload, previewUrl: dataUrl };
}

export function extractImageFilesFromClipboard(clipboardData) {
  if (!clipboardData?.items) return [];
  const files = [];
  for (const item of clipboardData.items) {
    if (item.kind === 'file' && item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) files.push(file);
    }
  }
  return files;
}

export const CHAT_IMAGE_UPLOAD_LIMITS = {
  maxImages: MAX_IMAGES,
  maxBytes: MAX_BYTES,
};
