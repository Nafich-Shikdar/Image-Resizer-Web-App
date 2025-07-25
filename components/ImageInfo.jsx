const ImageInfo = ({ image, fileName, fileType, fileSize, dimensions, darkMode }) => {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Original Image</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <img 
              src={image} 
              alt="Preview" 
              className="max-w-full h-auto max-h-48 rounded-md object-contain border" 
            />
          </div>
          <div className="flex-grow">
            <div className="space-y-2">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name:</span>
                <span className="ml-2">{fileName}</span>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type:</span>
                <span className="ml-2">{fileType}</span>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dimensions:</span>
                <span className="ml-2">{dimensions.width} × {dimensions.height} px</span>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Size:</span>
                <span className="ml-2">{formatFileSize(fileSize)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
