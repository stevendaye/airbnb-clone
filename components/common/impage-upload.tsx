"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import { CldUploadWidget } from "next-cloudinary";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

/* eslint-disable  @typescript-eslint/no-explicit-any */

declare global {
  let cloudinary: any;
}

interface ImageUploadProps {
  imagesSrc: string[];
  onChange: (value: string[]) => void;
}

export const ImpageUpload: React.FC<ImageUploadProps> = ({
  imagesSrc,
  onChange,
}) => {
  const latestImagesRef = useRef(imagesSrc);

  const handleUpload = useCallback(
    (result: any) => {
      const newUrl = result.info.secure_url;
      const updatedImages = [...latestImagesRef.current, newUrl];

      console.log("updatedImages: ", updatedImages);
      onChange(updatedImages);
    },
    [onChange]
  );

  useEffect(() => {
    latestImagesRef.current = imagesSrc;
  }, [imagesSrc]);

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="airbnb_properties"
      options={{
        maxFiles: 5,
      }}
    >
      {({ open }) => {
        return (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => open?.()}
            onClick={() => open?.()}
            className="relative flex flex-col items-center cursor-pointer hover:opacity-70 p-4 gap-4
            text-neutral-600 transition border-2 border-dashed border-neutral-300"
          >
            {imagesSrc.length > 0 && (
              <div className="grid grid-cols-2 gap-2 w-full">
                {imagesSrc.map((src) => (
                  <div
                    key={src}
                    className="relative w-full aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      src={src}
                      fill
                      className="object-cover"
                      alt={`Uploaded image ${src}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {imagesSrc.length === 0 && (
              <>
                <MdOutlineAddPhotoAlternate size={60} />
                <div className="font-semibold text-lg">Click to upload</div>
              </>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
