import React, { useState } from 'react';
import Whiteboard from './Whiteboard';
import './DropdownContainer.css';

const DropdownContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tool, setTool] = useState('pencil'); // Default tool is pencil

  const toggleContainer = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToolChange = (toolType) => {
    setTool(toolType); // Set the selected tool (pencil or eraser)
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-btn" onClick={toggleContainer}>
        {isExpanded ? '▼' : '▲'} {/* Arrow direction */}
      </button>
      {isExpanded && (
        <div className="container-content">
          {/* Tool buttons */}
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

          {/* Whiteboard */}
          <Whiteboard tool={tool} />
        </div>
      )}
    </div>
  );
};

export default DropdownContainer;
