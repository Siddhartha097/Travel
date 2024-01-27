'use client'

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";


interface UploadImageProps {
  onChange: (value: string) => void;
  value: string;
}

declare global {
  var cloudinary : any;
}

const UploadImage: React.FC<UploadImageProps> = ({ value, onChange }) => {

  const handleUpload = useCallback((res:any) => {
    onChange(res.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload}
      uploadPreset="u2jbtqdk"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div 
            onClick={() => open?.()} 
            className="relative cursor-pointer hover:opacity-70 border-dashed border-2 border-neutral-300 p-20 transition flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50}/>
            <div className="font-semibold text-lg">
              Click to upload image 
            </div>
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image 
                  src={value}
                  alt="uploaded"
                  style={{objectFit: 'cover'}}
                  fill
                />
              </div>
            )}
          </div>
        )
      } }
    </CldUploadWidget>
  )
}

export default UploadImage
