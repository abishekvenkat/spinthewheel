import { RotateCcw } from 'lucide-react';

interface SpinControlsProps {
  onSpin: () => void;
  onReset: () => void;
  isSpinning: boolean;
  disabled: boolean;
  removeUsed: boolean;
  onToggleRemoveUsed: (value: boolean) => void;
  availableItemsCount: number;
  totalItemsCount: number;
}

export function SpinControls({
  onSpin,
  onReset,
  isSpinning,
  disabled,
  removeUsed,
  onToggleRemoveUsed,
  availableItemsCount,
  totalItemsCount,
}: SpinControlsProps) {
  const showResetOnly = removeUsed && availableItemsCount <= 1 && totalItemsCount > 1;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {!showResetOnly && (
          <button
            onClick={onSpin}
            disabled={disabled}
            className="flex-1 py-2 bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning ? 'Spinning...' : 'Spin!'}
          </button>
        )}
        
        <button
          onClick={onReset}
          className={`py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${
            showResetOnly 
              ? 'w-full bg-white dark:bg-black text-gray-900 dark:text-white'
              : 'px-2 bg-white dark:bg-black text-gray-900 dark:text-white'
          }`}
        >
          {showResetOnly ? (
            'Reset Spin'
          ) : (
            <RotateCcw className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <input
          type="checkbox"
          id="removeUsed"
          checked={removeUsed}
          onChange={(e) => onToggleRemoveUsed(e.target.checked)}
          className="rounded border-gray-300 dark:border-gray-700"
        />
        <label htmlFor="removeUsed" className="text-gray-900 dark:text-white">
          Remove used items from wheel
        </label>
      </div>
    </div>
  );
}