import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
    side: 'left' | 'right';
    onFileSelect: (content: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ side, onFileSelect }) => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            onFileSelect(content);
        };
        reader.readAsText(file);
    };

    return (
        <div className="relative">
            <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".txt,.json,.csv,.xml"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    Upload {side === 'left' ? 'first' : 'second'} file
                </p>
                <p className="text-xs text-gray-500">
                    Supports TXT, JSON, CSV, XML
                </p>
            </div>
        </div>
    );
};