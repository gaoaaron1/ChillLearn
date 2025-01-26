import React, { useState } from 'react';
import Whiteboard from './Whiteboard';
import ToolButtons from './ToolButtons';
import AdjustTools from './AdjustTools';
import './BoardContainer.css';

const BoardContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tool, setTool] = useState('pencil'); // Default tool is pencil
  const [showboard, setShowboard] = useState(false); // Control the visibility of the board

  // State for customizing pencil and eraser settings
  const [pencilSize, setPencilSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(20);
  const [pencilColor, setPencilColor] = useState('#000000'); // Default pencil color is black

  const toggleContainer = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToolChange = (toolType) => {
    setTool(toolType);
  };

  const toggleboard = () => {
    setShowboard(!showboard);
  };

  const handlePencilSizeChange = (e) => {
    setPencilSize(e.target.value);
  };

  const handleEraserSizeChange = (e) => {
    setEraserSize(e.target.value);
  };

  const handlePencilColorChange = (e) => {
    setPencilColor(e.target.value);
  };

  return (
    <>
      <button className="board-btn" onClick={toggleContainer}>
        {isExpanded ? '▼' : '▲'}
      </button>

      {isExpanded && (
        <div className="board-container">
          <ToolButtons tool={tool} handleToolChange={handleToolChange} />

          {/* Adjust Tools board Button */}
          <div className="adjust-tools-board">
            <button className="adjust-tools-btn" onClick={toggleboard}>
              Adjust Tools
            </button>

            {/* board Menu */}
            {showboard && (
              <div className="board-tool-menu">
                <AdjustTools
                  pencilSize={pencilSize}
                  eraserSize={eraserSize}
                  pencilColor={pencilColor}
                  handlePencilSizeChange={handlePencilSizeChange}
                  handleEraserSizeChange={handleEraserSizeChange}
                  handlePencilColorChange={handlePencilColorChange}
                />
              </div>
            )}
          </div>

          <Whiteboard
            tool={tool}
            pencilSize={pencilSize}
            eraserSize={eraserSize}
            pencilColor={pencilColor}
          />
        </div>
      )}
    </>
  );
};

export default BoardContainer;
