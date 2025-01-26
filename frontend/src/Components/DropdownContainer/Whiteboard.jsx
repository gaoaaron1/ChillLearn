import React, { useRef, useState, useEffect } from 'react';
import './Whiteboard.css';

const Whiteboard = ({ tool, pencilSize, eraserSize, pencilColor }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    const ctx = context;
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLastX(x);
    setLastY(y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    const ctx = context;
    if (!ctx || !isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = tool === 'pencil' ? pencilSize : eraserSize;
    ctx.strokeStyle = pencilColor;
    ctx.lineCap = 'round';

    if (tool === 'pencil') {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
    }

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="whiteboard-container">
      <canvas
        ref={canvasRef}
        className="whiteboard"
        width="600"
        height="400"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Whiteboard;
