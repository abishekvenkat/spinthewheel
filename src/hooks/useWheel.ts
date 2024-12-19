import { useState, useCallback } from 'react';
import type { WheelItem } from '../types';
import { calculateWinner } from '../utils/wheelCalculations';

export function useWheel() {
  const [items, setItems] = useState<WheelItem[]>([]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [removeUsed, setRemoveUsed] = useState(false);

  const addItem = useCallback((name: string) => {
    setItems(prev => [...prev, { name, used: false }]);
  }, []);

  const deleteItem = useCallback((name: string) => {
    setItems(prev => prev.filter(item => item.name !== name));
  }, []);

  const resetItems = useCallback(() => {
    setItems(prev => prev.map(item => ({ ...item, used: false })));
    setWinner(null);
    setRotation(0);
  }, []);

  const markItemAsUsed = useCallback((name: string) => {
    setItems(prev => 
      prev.map(item => 
        item.name === name ? { ...item, used: true } : item
      )
    );
  }, []);

  const spinWheel = useCallback(() => {
    if (items.length < 2 || isSpinning) return;
    
    const availableItems = removeUsed 
      ? items.filter(item => !item.used)
      : items;
    
    if (availableItems.length < 1) {
      alert('No available items to spin!');
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    
    const spins = 5;
    const baseRotation = 360 * spins;
    const randomDegrees = Math.random() * 360;
    const totalRotation = baseRotation + randomDegrees;
    
    const startTime = performance.now();
    const duration = 3000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation = totalRotation * easeOut(progress);
      
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const winningItem = calculateWinner(currentRotation, availableItems);
        setWinner(winningItem.name);
        
        if (removeUsed) {
          setTimeout(() => {
            markItemAsUsed(winningItem.name);
          }, 3000);
        }
        
        setIsSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  }, [items, isSpinning, removeUsed, markItemAsUsed]);

  const availableItemsCount = removeUsed 
    ? items.filter(item => !item.used).length 
    : items.length;

  return {
    items,
    rotation,
    isSpinning,
    winner,
    removeUsed,
    availableItemsCount,
    totalItemsCount: items.length,
    addItem,
    deleteItem,
    resetItems,
    spinWheel,
    setRemoveUsed,
  };
}