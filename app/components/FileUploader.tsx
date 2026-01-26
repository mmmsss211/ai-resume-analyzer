import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";
import { cn } from "~/lib/utils";
import { Trash } from "@/components/animate-ui/icons/trash";
interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      const file = acceptedFile[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="flex flex-col h-full  border-dashed border-emerald-900/40 rounded-sm p-1.5 cursor-pointer bg-emerald-900/10 hover:bg-emerald-900/5 transition-all duration-200">
      <div
        {...getRootProps()}
        className={cn(
          "w-full h-full border-dashed border border-emerald-900/30 rounded-xs cursor-pointer p-5 flex flex-col items-center justify-center",
          file ? "" : "min-h-[150px]",
        )}
      >
        <input {...getInputProps()} />
        {file ?
          <div
            className="text-sm text-gray-500 flex flex-row items-center justify-between w-full bg-white p-3 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <div className="flex flex-col items-left">
              {file.name}
              <span className="text-xs text-gray-400">
                ({formatSize(file.size)})
              </span>
            </div>
            <button
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect?.(null);
              }}
            >
              <Trash animateOnHover size={16} />
            </button>
          </div>
        : <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-gray-500">
              <b>Drag and drop</b> some files here, or click to select files
            </p>
            <p className="text-xs text-gray-500">PDF (max 20 MB)</p>
          </div>
        }
      </div>
    </div>
  );
};

export default FileUploader;
