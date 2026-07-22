import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';

interface StickerMagnifierProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  zoomLevel?: number;
  showBadge?: boolean;
  children?: React.ReactNode;
}

export const StickerMagnifier: React.FC<StickerMagnifierProps> = ({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  zoomLevel = 3.0,
  showBadge = true,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const clampedX = Math.max(0, Math.min(x, width));
    const clampedY = Math.max(0, Math.min(y, height));

    setCursorPos({ x: clampedX, y: clampedY });

    const xPercent = width > 0 ? (clampedX / width) * 100 : 50;
    const yPercent = height > 0 ? (clampedY / height) * 100 : 50;
    setBgPos({ x: xPercent, y: yPercent });
  };

  const lensSize = 165; // diameter of the magnifying lens in px (increased by 50% from 110px)

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden cursor-crosshair select-none group ${className}`}
    >
      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        className={`${imgClassName} transition-transform duration-300 ${
          isHovered ? 'scale-105 brightness-105' : ''
        }`}
      />

      {/* Children or overlays inside the image frame */}
      {children}

      {/* Lupa Badge Indicator */}
      {showBadge && (
        <div
          className={`absolute top-2 left-2 pointer-events-none z-10 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 scale-100 bg-rose-500/90 text-white shadow-lg shadow-rose-500/40'
              : 'opacity-75 bg-slate-900/70 text-amber-300'
          } backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border border-white/20`}
        >
          <Search className="w-3 h-3 text-amber-300 animate-pulse" />
          <span>{isHovered ? 'Lupa Ativa' : 'Lupa'}</span>
        </div>
      )}

      {/* Magnifier Lens (Lupa) */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-amber-300 shadow-2xl z-30 overflow-hidden bg-no-repeat transition-opacity duration-100"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${cursorPos.x - lensSize / 2}px`,
            top: `${cursorPos.y - lensSize / 2}px`,
            backgroundImage: `url('${src}')`,
            backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
            backgroundSize: `${zoomLevel * 100}%`,
            boxShadow:
              '0 0 0 2px rgba(255, 255, 255, 0.6), 0 0 20px rgba(245, 158, 11, 0.6), inset 0 0 15px rgba(0,0,0,0.4)',
          }}
        >
          {/* Lens Glass Highlight Effect & Crosshair */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
          <div className="absolute bottom-1 right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md">
            <Search className="w-2.5 h-2.5 stroke-[3]" />
          </div>
        </div>
      )}
    </div>
  );
};
