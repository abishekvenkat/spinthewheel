import type { WheelItem } from '../types';

export function calculateWinner(rotation: number, items: WheelItem[]): WheelItem {
  // Calculate the winning index based on final rotation
  // Note: We subtract the rotation from 360 because the wheel spins clockwise
  const normalizedRotation = (360 - (rotation % 360)) % 360;
  const sliceSize = 360 / items.length;
  const winningIndex = Math.floor(normalizedRotation / sliceSize);
  
  return items[winningIndex];
}