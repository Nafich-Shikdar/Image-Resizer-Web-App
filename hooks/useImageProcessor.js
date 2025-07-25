import { useEffect, useState } from 'react';
import { resizeImage } from '../utils/imageUtils';

const useImageProcessor = (originalImage, dimensions, outputFormat, quality) => {
  const [processedImage, setProcessedImage] = useState(null);
  const [outputSize, setOutputSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!originalImage || dimensions.width === 0 || dimensions.height === 0) return;

    const processImage = async () => {
      setIsProcessing(true);
      
      try {
        const img = new Image();
        img.src = originalImage;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const result = await resizeImage(
          img,
          dimensions.width,
          dimensions.height,
          outputFormat,
          quality / 100
        );
        
        setProcessedImage(result.url);
        setOutputSize(result.size);
      } catch (error) {
        console.error('Image processing error:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [originalImage, dimensions, outputFormat, quality]);

  return { processedImage, outputSize, isProcessing };
};

export default useImageProcessor;
