import React, { useState } from 'react';
import Whiteboard from './Whiteboard';
import ToolButtons from './ToolButtons';
import AdjustTools from './AdjustTools';
import './DropdownContainer.css';

const DropdownContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tool, setTool] = useState('pencil'); // Default tool is pencil
  const [showDropdown, setShowDropdown] = useState(false); // Control the visibility of the dropdown

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
      <button className="dropdown-btn" onClick={toggleContainer}>
        {isExpanded ? '▼' : '▲'}
      </button>

      {isExpanded && (
        <div className="dropdown-container">
          <ToolButtons tool={tool} handleToolChange={handleToolChange} />

          {/* Adjust Tools Dropdown Button */}
          <div className="adjust-tools-dropdown">
            <button className="adjust-tools-btn" onClick={toggleDropdown}>
              Adjust Tools
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="dropdown-menu">
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

export default DropdownContainer;
