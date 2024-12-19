import { X } from 'lucide-react';
import type { WheelItem } from '../types';

interface ItemListProps {
  items: WheelItem[];
  onDelete: (name: string) => void;
}

export function ItemList({ items, onDelete }: ItemListProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">List</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <span className={`${item.used ? 'line-through opacity-50' : ''} text-gray-900 dark:text-white`}>
              {item.name}
            </span>
            <button
              onClick={() => onDelete(item.name)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full"
            >
              <X size={16} className="text-gray-900 dark:text-white" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}