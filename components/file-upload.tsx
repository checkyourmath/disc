"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

import { UploadEndpoint } from "@/app/api/uploadthing/enums/upload-enpoint.enum";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: UploadEndpoint;
};

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = (value?.split(".").pop() || "").toLowerCase();

  if (fileType && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          alt="Server image"
          className="rounded-full"
          src={value}
        />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(response) => {
        onChange(response?.[0].url);
      }}
      onUploadError={
        (/* error */) => {
          // TODO: removeme
          // console.log("");
          // console.log("onUploadError");
          // console.log("error", error);
        }
      }
    />
  );
};
