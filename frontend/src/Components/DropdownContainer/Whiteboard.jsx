import React, { useRef, useState, useEffect } from 'react';
import './Whiteboard.css';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setLastPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
    setLastPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineJoin = 'round';
    context.lineCap = 'round';
  }, []);

  return (
    <div className="whiteboard-container">
      <div className="controls">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          title="Pick a color"
        />
        <input
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={handleLineWidthChange}
          title="Change line width"
        />
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        className="canvas"
      />
    </div>
  );
};

export default Whiteboard;
