import React, { useState } from "react";

interface TooltipProps {
  message: string; // The text that will be displayed in the tooltip
  children: React.ReactNode; // The element that triggers the tooltip
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setShowTooltip(true);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setShowTooltip(false);
      }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            top: position.y + 10, // Adjust position to appear below and to the right of the cursor
            left: position.x + 10,
          }}
          className="absolute mb-2 z-1000 h-[30px] px-3 transform -translate-x-40 py-1 bg-gray-700 text-white text-sm rounded shadow-lg"
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
