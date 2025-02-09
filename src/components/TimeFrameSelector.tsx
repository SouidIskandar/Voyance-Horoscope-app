import React from 'react';
import type { TimeFrame } from '../types';

interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame;
  onSelectTimeFrame: (timeFrame: TimeFrame) => void;
}

export function TimeFrameSelector({
  selectedTimeFrame,
  onSelectTimeFrame,
}: TimeFrameSelectorProps) {
  const timeFrames: TimeFrame[] = ['daily', 'weekly', 'monthly', 'yearly'];

  return (
    <div className="flex space-x-2 mb-8">
      {timeFrames.map((timeFrame) => (
        <button
          key={timeFrame}
          onClick={() => onSelectTimeFrame(timeFrame)}
          className={`px-4 py-2 rounded-full capitalize transition-all duration-300 ${
            selectedTimeFrame === timeFrame
              ? 'bg-indigo-600 text-white'
              : 'bg-white hover:bg-indigo-50'
          }`}
        >
          {timeFrame}
        </button>
      ))}
    </div>
  );
}