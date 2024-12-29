import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface UploadedFile {
  file: File;
  preview: string;
}

const DragDropImageUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    multiple: true,
  });

  const removeFile = (fileToRemove: UploadedFile) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.preview !== fileToRemove.preview)
    );
  };

  return (
    <div className="space-y-4">
      {/* Drag-and-Drop Zone */}
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md hover:bg-gray-50 cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Upload an image of your vehicle</p>
      </div>

      {/* Image Previews */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 gap-4 w-5/6">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={file.preview}
                alt={file.file.name}
                className="w-full h-32 object-cover rounded-md max-h-[100px]"
              />
              <button
                onClick={() => removeFile(file)}
                className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDropImageUpload;
