"use client";
import { Cross2Icon, FileIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const { getInputProps, getRootProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles.forEach((file) => setFileName(file.name)));
    },
  });
  return (
    <div className="bg-gray-700 p-2 rounded-xl w-">
      <div
        {...getRootProps({
          className:
            "bg-gray-700 border-dashed border-2 rounded-xl cursor-pointer py-8 flex w-56 lg:w-96 md:w-64  justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <FileIcon className="w-10 h-10" />
        <p className="text-xs mt-2 text-slate-100">
          {fileName ? fileName : "Drop PDF Here"}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
