import { useRef, useState } from 'react';
import { downloadImage } from '../utils/imageUtils';

const OutputPreview = ({ processedImage, outputSize, outputDimensions, fileName, outputFormat, darkMode }) => {
  const [downloadName, setDownloadName] = useState(fileName);
  const nameInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleDownload = () => {
    if (!processedImage) return;
    downloadImage(processedImage, `${downloadName}.${outputFormat}`);
  };

  return (
    <div className={`rounded-lg p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Output Preview</h2>
      
      {processedImage ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <img 
              src={processedImage} 
              alt="Resized preview" 
              className="max-w-full h-auto max-h-64 rounded-md object-contain border" 
            />
          </div>
          
          <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Resolution:</span>
              </div>
              <div>
                {outputDimensions.width} × {outputDimensions.height} px
              </div>
              
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>File Size:</span>
              </div>
              <div>
                {formatFileSize(outputSize)}
              </div>
              
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Format:</span>
              </div>
              <div>
                {outputFormat.toUpperCase()}
              </div>
            </div>
          </div>
          
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>File Name</label>
            <div className="flex">
              <input
                type="text"
                value={downloadName}
                onChange={(e) => setDownloadName(e.target.value)}
                ref={nameInputRef}
                className={`flex-grow p-2 rounded-l-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <span className={`px-3 py-2 border-t border-b border-r rounded-r-md ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                .{outputFormat}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleDownload}
            disabled={!processedImage}
            className={`w-full px-4 py-2 rounded-md ${!processedImage ? 'bg-gray-400 cursor-not-allowed' : darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
          >
            Download Resized Image
          </button>
        </div>
      ) : (
        <div className={`p-8 text-center rounded-md ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
          Resized image will appear here
        </div>
      )}
    </div>
  );
};

export default OutputPreview;
