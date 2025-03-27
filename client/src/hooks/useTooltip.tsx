import { useState } from "react";

interface UseTooltipProps {
  message: string;
  delay?: number;
}

export function useTooltip({ message, delay = 400 }: UseTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + window.scrollY,
    });
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const TooltipComponent = () => {
    if (!isVisible) return null;
    
    return (
      <div
        className="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm"
        style={{
          left: `${position.x}px`,
          top: `${position.y + 10}px`,
          transform: "translateX(-50%)",
        }}
      >
        {message}
        <div
          className="absolute w-2 h-2 bg-gray-900 rotate-45"
          style={{
            left: "50%",
            top: "-4px",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    );
  };

  return {
    tooltipProps: {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
    },
    TooltipComponent,
  };
}
