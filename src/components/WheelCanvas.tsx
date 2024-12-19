import React, { useRef, useEffect } from 'react';
import type { WheelItem } from '../types';
import { drawWheel, drawPointer } from '../utils/wheelDrawing';

interface WheelCanvasProps {
  items: WheelItem[];
  rotation: number;
  removeUsed: boolean;
}

export function WheelCanvas({ items, rotation, removeUsed }: WheelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const availableItems = removeUsed 
      ? items.filter(item => !item.used)
      : items;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wheel components
    drawWheel(ctx, availableItems, centerX, centerY, radius, rotation);
    drawPointer(ctx, centerX, centerY, radius);

  }, [items, rotation, removeUsed]);

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="w-full max-w-[500px] dark:invert"
      />
    </div>
  );
}