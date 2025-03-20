import React from 'react';
import { DiffResult, ViewMode } from '../types';

interface DiffViewerProps {
    diffResults: DiffResult[];
    viewMode: ViewMode;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ diffResults, viewMode }) => {
    if (viewMode === 'unified') {
        return (
            <div className="font-mono text-sm bg-white rounded-lg shadow overflow-auto max-h-[600px]">
                {diffResults.map((result, index) => (
                    <div
                        key={index}
                        className={`px-4 py-1 ${
                            result.type === 'add'
                                ? 'bg-green-50 text-green-900'
                                : result.type === 'remove'
                                    ? 'bg-red-50 text-red-900'
                                    : ''
                        }`}
                    >
            <span className="mr-2">
              {result.type === 'add' ? '+' : result.type === 'remove' ? '-' : ' '}
            </span>
                        {result.value}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 font-mono text-sm">
            <div className="bg-white rounded-lg shadow overflow-auto max-h-[600px]">
                {diffResults.map((result, index) => (
                    <div
                        key={`left-${index}`}
                        className={`px-4 py-1 ${
                            result.type === 'remove' ? 'bg-red-50 text-red-900' : ''
                        }`}
                    >
                        {result.type !== 'add' ? result.value : ''}
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-lg shadow overflow-auto max-h-[600px]">
                {diffResults.map((result, index) => (
                    <div
                        key={`right-${index}`}
                        className={`px-4 py-1 ${
                            result.type === 'add' ? 'bg-green-50 text-green-900' : ''
                        }`}
                    >
                        {result.type !== 'remove' ? result.value : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};