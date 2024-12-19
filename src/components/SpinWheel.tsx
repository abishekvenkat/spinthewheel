import React from 'react';
import { Header } from './Header';
import { AddItemForm } from './AddItemForm';
import { ItemList } from './ItemList';
import { WheelCanvas } from './WheelCanvas';
import { SpinControls } from './SpinControls';
import { Result } from './Result';
import { GitHubLink } from './GitHubLink';
import { useWheel } from '../hooks/useWheel';

export function SpinWheel() {
  const {
    items,
    rotation,
    isSpinning,
    winner,
    removeUsed,
    availableItemsCount,
    totalItemsCount,
    addItem,
    deleteItem,
    resetItems,
    spinWheel,
    setRemoveUsed,
  } = useWheel();

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <AddItemForm onAdd={addItem} />
            <ItemList items={items} onDelete={deleteItem} />
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <WheelCanvas
              items={items}
              rotation={rotation}
              removeUsed={removeUsed}
            />
            <div className="w-full max-w-[500px]">
              <SpinControls
                onSpin={spinWheel}
                onReset={resetItems}
                isSpinning={isSpinning}
                disabled={isSpinning || items.length < 2}
                removeUsed={removeUsed}
                onToggleRemoveUsed={setRemoveUsed}
                availableItemsCount={availableItemsCount}
                totalItemsCount={totalItemsCount}
              />
              <Result winner={winner} />
            </div>
          </div>
        </div>

        <GitHubLink />
      </div>
    </div>
  );
}