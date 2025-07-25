import { useState, useCallback } from 'react';
import DropZone from './components/DropZone';
import ImageInfo from './components/ImageInfo';
import ResizeControls from './components/ResizeControls';
import OutputPreview from './components/OutputPreview';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [outputSize, setOutputSize] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState('jpeg');

  const handleImageProcessed = useCallback((processedData) => {
    setProcessedImage(processedData.url);
    setOutputSize(processedData.size);
    setDimensions(processedData.dimensions);
  }, []);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(e.target.result);
        setDimensions({ width: img.width, height: img.height });
        setFileName(file.name.split('.')[0]);
        setFileType(file.type.split('/')[1].toUpperCase());
        setFileSize(file.size);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const resetAll = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setDimensions({ width: 0, height: 0 });
    setOutputSize(0);
    setFileName('');
    setFileType('');
    setFileSize(0);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Image Resizer</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {!originalImage ? (
          <DropZone onImageUpload={handleImageUpload} darkMode={darkMode} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ImageInfo 
                image={originalImage} 
                fileName={fileName} 
                fileType={fileType} 
                fileSize={fileSize} 
                dimensions={dimensions}
                darkMode={darkMode}
              />
              
              <ResizeControls
                originalDimensions={dimensions}
                onImageProcessed={handleImageProcessed}
                maintainAspectRatio={maintainAspectRatio}
                setMaintainAspectRatio={setMaintainAspectRatio}
                quality={quality}
                setQuality={setQuality}
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
                darkMode={darkMode}
              />
              
              <button
                onClick={resetAll}
                className={`px-4 py-2 rounded-md ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors`}
              >
                Reset
              </button>
            </div>
            
            <OutputPreview
              processedImage={processedImage}
              outputSize={outputSize}
              outputDimensions={dimensions}
              fileName={fileName}
              outputFormat={outputFormat}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
