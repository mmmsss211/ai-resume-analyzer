import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFile: File[]) => {
    const file = acceptedFile[0] || null;
    onFileSelect?.(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex items-center justify-center border-dashed border-emerald-900/40 rounded-sm p-3 cursor-pointer bg-emerald-900/10">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? (
<div>test</div>
        ) : (
            <div className="flex flex-col items-center">
                <p className="text-sm text-gray-400"><b>Drag and drop</b> some files here, or click to select files</p><p className="text-sm text-gray-400">PDF (max 20 MB)</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
