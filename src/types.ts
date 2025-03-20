export type ComparisonMode = 'text' | 'json' | 'csv';
export type ViewMode = 'side-by-side' | 'unified';
export type ExportFormat = 'html' | 'markdown' | 'json';

export interface DiffResult {
    type: 'add' | 'remove' | 'equal';
    value: string;
}

export interface ComparisonState {
    leftContent: string;
    rightContent: string;
    mode: ComparisonMode;
    viewMode: ViewMode;
    diffResults: DiffResult[];
    isProcessing: boolean;
    progress: number;
}