import React from 'react';

interface ResultProps {
  winner: string | null;
}

export function Result({ winner }: ResultProps) {
  if (!winner) return null;

  return (
    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Result</h2>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{winner}</p>
    </div>
  );
}