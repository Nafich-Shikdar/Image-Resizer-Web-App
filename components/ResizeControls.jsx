import { useState, useEffect } from 'react';
import { resizeImage } from '../utils/imageUtils';

const ResizeControls = ({
  originalDimensions,
  onImageProcessed,
  maintainAspectRatio,
  setMaintainAspectRatio,
  quality,
  setQuality,
  outputFormat,
  setOutputFormat,
  darkMode
}) => {
  const [dimensions, setDimensions] = useState({
    width: originalDimensions.width,
    height: originalDimensions.height
  });
  const [preset, setPreset] = useState('custom');

  const presets = [
    { name: 'Custom', value: 'custom', width: 0, height: 0 },
    { name: 'Small (640×480)', value: '640x480', width: 640, height: 480 },
    { name: 'Medium (1280×720)', value: '1280x720', width: 1280, height: 720 },
    { name: 'Large (1920×1080)', value: '1920x1080', width: 1920, height: 1080 },
    { name: 'Square (800×800)', value: '800x800', width: 800, height: 800 },
  ];

  useEffect(() => {
    setDimensions({
      width: originalDimensions.width,
      height: originalDimensions.height
    });
  }, [originalDimensions]);

  useEffect(() => {
    if (preset !== 'custom') {
      const selectedPreset = presets.find(p => p.value === preset);
      if (selectedPreset) {
        setDimensions({
          width: selectedPreset.width,
          height: selectedPreset.height
        });
      }
    }
  }, [preset]);

  const handleDimensionChange = (e, dimension) => {
    const value = parseInt(e.target.value) || 0;
    
    if (maintainAspectRatio && dimension === 'width') {
      const ratio = originalDimensions.height / originalDimensions.width;
      setDimensions({
        width: value,
        height: Math.round(value * ratio)
      });
    } else if (maintainAspectRatio && dimension === 'height') {
      const ratio = originalDimensions.width / originalDimensions.height;
      setDimensions({
        width: Math.round(value * ratio),
        height: value
      });
    } else {
      setDimensions(prev => ({
        ...prev,
        [dimension]: value
      }));
    }
    
    setPreset('custom');
  };

  const handleProcess = async () => {
    const result = await resizeImage(
      document.getElementById('original-image'),
      dimensions.width,
      dimensions.height,
      outputFormat,
      quality / 100
    );
    onImageProcessed(result);
  };

  useEffect(() => {
    if (originalDimensions.width > 0 && originalDimensions.height > 0) {
      handleProcess();
    }
  }, [dimensions, quality, outputFormat]);

  return (
    <div className={`rounded-lg p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Resize Options</h2>
      
      <div className="space-y-4">
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preset Sizes</label>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          >
            {presets.map((preset) => (
              <option key={preset.value} value={preset.value}>{preset.name}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Width (px)</label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange(e, 'width')}
              min="1"
              className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Height (px)</label>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange(e, 'height')}
              min="1"
              className={`w-full p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="aspect-ratio"
            checked={maintainAspectRatio}
            onChange={() => setMaintainAspectRatio(!maintainAspectRatio)}
            className="mr-2"
          />
          <label htmlFor="aspect-ratio" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Maintain Aspect Ratio
          </label>
        </div>
        
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quality: {quality}%</label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Output Format</label>
          <div className="flex space-x-4">
            {['jpeg', 'png', 'webp'].map((format) => (
              <label key={format} className="flex items-center">
                <input
                  type="radio"
                  name="outputFormat"
                  value={format}
                  checked={outputFormat === format}
                  onChange={() => setOutputFormat(format)}
                  className="mr-2"
                />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{format.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <img id="original-image" src="" alt="" className="hidden" />
    </div>
  );
};

export default ResizeControls;
