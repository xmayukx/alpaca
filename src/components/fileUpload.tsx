"use client";
import { uploadToS3 } from "@/lib/s3";
import { Cross2Icon, FileIcon } from "@radix-ui/react-icons";
import { useState, CSSProperties, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const override: CSSProperties = {
  margin: "0 auto",
  justifyContent: "center",
};
const FileUpload = () => {
  const router = useRouter();
  // let [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      fileKey,
      fileName,
    }: {
      fileKey: string;
      fileName: string;
    }) => {
      const response = await fetch("/api/create-chat", {
        method: "POST",
        body: JSON.stringify({
          fileKey,
          fileName,
        }),
      });
      const data = await response.json();
      if (data === null || data === undefined) {
        toast.error("Something went wrong");
        return;
      }
      return data;
    },
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const { getInputProps, getRootProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      if (file.size > 10 * 1024 * 1024) {
        // alert("File size is too big, should be less than 10 MB");
        toast.error("File size is too big, should be less than 10 MB");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.fileKey || !data?.fileName) {
          toast.error("Something went wrong");
          return;
        }
        console.log(data);
        mutate(
          {
            fileKey: data.fileKey,
            fileName: data.fileName,
          },
          {
            onSuccess: ({ chat_id }) => {
              // console.log(data);
              toast.success("Chat created!");
              router.push(`/chat/${chat_id}`);
            },
            onError: (error) => {
              console.log(error);
              toast.error("Error creating chat");
            },
          },
        );
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("File was not uploaded. Please try again later.");
      } finally {
        setUploading(false);
      }
    },
  });
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(false);
  // }, []);
  // if (!isMounted) {
  //   return null;
  // }
  return (
    <div className="bg-gray-700 p-2 rounded-xl w-">
      <div
        {...getRootProps({
          className:
            "bg-gray-700 border-dashed border-2 rounded-xl cursor-pointer py-8 flex w-56 lg:w-96 md:w-64  justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            <PropagateLoader
              color={color}
              cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="mt-5 text-sm text-slate-100/95">
              hold on, we cooking...
            </p>
          </>
        ) : (
          <>
            <FileIcon className="w-10 h-10" />
            <p className="text-xs mt-2 text-slate-100">
              {fileName ? fileName : "Drop PDF Here. Less than 10 MB"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
