import React from 'react';
import './AdjustTools.css';

const AdjustTools = ({ pencilSize, eraserSize, pencilColor, handlePencilSizeChange, handleEraserSizeChange, handlePencilColorChange }) => {
  return (
    <div className="adjust-tools-container">
      <div className="adjust-tools-item">
        <label htmlFor="pencil-size">Pencil Size:</label>
        <input
          id="pencil-size"
          type="range"
          min="1"
          max="20"
          value={pencilSize}
          onChange={handlePencilSizeChange}
        />
        <span>{pencilSize}</span>
      </div>

      <div className="adjust-tools-item">
        <label htmlFor="eraser-size">Eraser Size:</label>
        <input
          id="eraser-size"
          type="range"
          min="1"
          max="30"
          value={eraserSize}
          onChange={handleEraserSizeChange}
        />
        <span>{eraserSize}</span>
      </div>

      <div className="adjust-tools-item">
        <label htmlFor="pencil-color">Pencil Color:</label>
        <input
          id="pencil-color"
          type="color"
          value={pencilColor}
          onChange={handlePencilColorChange}
        />
      </div>
    </div>
  );
};

export default AdjustTools;
