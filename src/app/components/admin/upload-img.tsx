/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2Icon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const UploadImg: React.FC<ImageProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url, index) => {
          return (
            <div
              key={index}
              className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onRemove(url)}
                  size="icon"
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
              <Image fill className="object-cover" alt="image" src={url} />
            </div>
          );
        })}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="fiky123">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              onClick={onClick}
              disabled={disabled}
              type="button"
              variant="secondary"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImg;
