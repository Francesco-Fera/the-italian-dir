"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStartupImages } from "../lib/actions";
import { SubmitButton } from "./Buttons";

interface MediaFormProps {
  currentLogoUrl?: string;
  currentCoverUrl?: string;
  startupId: string;
}

export default function MediaForm({
  currentLogoUrl,
  currentCoverUrl,
  startupId,
}: MediaFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    currentLogoUrl || null
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    currentCoverUrl || null
  );

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void
  ) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpdateImages = async (formData: FormData) => {
    const response = await updateStartupImages(formData);
  };

  return (
    <form action={handleUpdateImages}>
      <input type='hidden' name='id' value={startupId} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='logo'>Logo Image</Label>
          <Input
            id='logo'
            name='logo'
            type='file'
            accept='image/*'
            onChange={(e) => handleFileChange(e, setLogoFile, setLogoPreview)}
          />
          {logoPreview && (
            <div className='mt-2'>
              <Image
                src={logoPreview}
                alt='Logo Preview'
                width={100}
                height={100}
                className='rounded-md object-cover'
              />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor='cover'>Cover Image</Label>
          <Input
            id='cover'
            name='cover'
            type='file'
            accept='image/*'
            onChange={(e) => handleFileChange(e, setCoverFile, setCoverPreview)}
          />
          {coverPreview && (
            <div className='mt-2'>
              <Image
                src={coverPreview}
                alt='Cover Preview'
                width={200}
                height={100}
                className='rounded-md object-cover'
              />
            </div>
          )}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
