import { diffLines } from 'diff';
import { parse } from 'papaparse';
import { DiffResult, ComparisonMode } from '../types';

export const compareContents = (
    left: string,
    right: string,
    mode: ComparisonMode
): DiffResult[] => {
    switch (mode) {
        case 'json':
            return compareJson(left, right);
        case 'csv':
            return compareCsv(left, right);
        default:
            return compareText(left, right);
    }
};

const compareText = (left: string, right: string): DiffResult[] => {
    const diff = diffLines(left, right);
    return diff.map((part) => ({
        type: part.added ? 'add' : part.removed ? 'remove' : 'equal',
        value: part.value,
    }));
};

const compareJson = (left: string, right: string): DiffResult[] => {
    try {
        const leftObj = JSON.parse(left);
        const rightObj = JSON.parse(right);
        const diff = diffLines(
            JSON.stringify(leftObj, null, 2),
            JSON.stringify(rightObj, null, 2)
        );
        return diff.map((part) => ({
            type: part.added ? 'add' : part.removed ? 'remove' : 'equal',
            value: part.value,
        }));
    } catch (e) {
        return [{ type: 'equal', value: 'Invalid JSON format' }];
    }
};

const compareCsv = (left: string, right: string): DiffResult[] => {
    try {
        const leftData = parse(left).data;
        const rightData = parse(right).data;
        const diff = diffLines(
            leftData.map((row: any) => row.join(',')).join('\n'),
            rightData.map((row: any) => row.join(',')).join('\n')
        );
        return diff.map((part) => ({
            type: part.added ? 'add' : part.removed ? 'remove' : 'equal',
            value: part.value,
        }));
    } catch (e) {
        return [{ type: 'equal', value: 'Invalid CSV format' }];
    }
};