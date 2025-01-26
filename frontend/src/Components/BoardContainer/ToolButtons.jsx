import React from 'react';

const ToolButtons = ({ tool, handleToolChange }) => (
  <div className="tool-buttons">
    <button
      className={`tool-btn ${tool === 'pencil' ? 'active' : ''}`}
      onClick={() => handleToolChange('pencil')}
    >
      Pencil
    </button>
    <button
      className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
      onClick={() => handleToolChange('eraser')}
    >
      Eraser
    </button>
  </div>
);

export default ToolButtons;
