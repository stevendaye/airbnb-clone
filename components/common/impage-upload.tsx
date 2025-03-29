"use client";

import Image from "next/image";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { MdOutlineAddPhotoAlternate } from "react-icons/md";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImpageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="airbnb_properties"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => open?.()}
            onClick={() => open?.()}
            className={`relative flex flex-col justify-center items-center cursor-pointer
            hover:opacity-70 p-20 gap-4 text-neutral-600 transition ${
              !value && "border-2 border-dashed border-neutral-300"
            } `}
          >
            <MdOutlineAddPhotoAlternate size={60} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt="Property's Photo"
                  className="rounded-xl"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
