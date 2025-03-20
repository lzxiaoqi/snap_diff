import { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { DiffViewer } from './components/DiffViewer';
import { compareContents } from './utils/diff';
import { ComparisonMode, ViewMode, DiffResult } from './types';
import { SplitSquareHorizontal, Combine } from 'lucide-react';

function App() {
    const [leftContent, setLeftContent] = useState('');
    const [rightContent, setRightContent] = useState('');
    const [mode, setMode] = useState<ComparisonMode>('text');
    const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
    const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCompare = useCallback(() => {
        if (!leftContent || !rightContent) return;

        setIsProcessing(true);
        setTimeout(() => {
            const results = compareContents(leftContent, rightContent, mode);
            setDiffResults(results);
            setIsProcessing(false);
        }, 100);
    }, [leftContent, rightContent, mode]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">File Comparison Tool</h1>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <FileUpload side="left" onFileSelect={setLeftContent} />
                        <textarea
                            value={leftContent}
                            onChange={(e) => setLeftContent(e.target.value)}
                            placeholder="Paste first content here..."
                            className="mt-4 w-full h-48 p-4 rounded-lg border border-gray-300 font-mono"
                        />
                    </div>
                    <div>
                        <FileUpload side="right" onFileSelect={setRightContent} />
                        <textarea
                            value={rightContent}
                            onChange={(e) => setRightContent(e.target.value)}
                            placeholder="Paste second content here..."
                            className="mt-4 w-full h-48 p-4 rounded-lg border border-gray-300 font-mono"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-8">
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as ComparisonMode)}
                        className="rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="text">Text</option>
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                    </select>

                    <button
                        onClick={() => setViewMode(viewMode === 'side-by-side' ? 'unified' : 'side-by-side')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                        {viewMode === 'side-by-side' ? (
                            <><SplitSquareHorizontal size={20} /> Side by Side</>
                        ) : (
                            <><Combine size={20} /> Unified</>
                        )}
                    </button>

                    <button
                        onClick={handleCompare}
                        disabled={!leftContent || !rightContent || isProcessing}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isProcessing ? 'Processing...' : 'Compare'}
                    </button>
                </div>

                {diffResults.length > 0 && (
                    <DiffViewer diffResults={diffResults} viewMode={viewMode} />
                )}
            </div>
        </div>
    );
}

export default App;