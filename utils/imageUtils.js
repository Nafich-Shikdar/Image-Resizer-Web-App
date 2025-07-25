export const resizeImage = (imageElement, width, height, format = 'jpeg', quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(imageElement, 0, 0, width, height);
    
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve({
        url,
        size: blob.size,
        dimensions: { width, height }
      });
    }, `image/${format}`, quality);
  });
};

export const downloadImage = (dataUrl, fileName) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
