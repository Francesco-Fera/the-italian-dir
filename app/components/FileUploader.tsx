// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { uploadImage } from "../lib/actions";

// export function FileUploader() {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const router = useRouter();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     setFile(selectedFile || null);

//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) return;

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     const result = await uploadImage(formData);
//     setUploading(false);

//     if (result.success) {
//       console.log("Image uploaded successfully:", result.image);
//       router.refresh();
//     } else {
//       console.error("Failed to upload image:", result.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className='space-y-4'>
//       <div>
//         <Label htmlFor='image'>Upload Image</Label>
//         <Input
//           id='image'
//           type='file'
//           accept='image/*'
//           onChange={handleFileChange}
//           disabled={uploading}
//         />
//       </div>
//       {preview && (
//         <div className='mt-4'>
//           <Image
//             src={preview}
//             alt='Preview'
//             width={200}
//             height={200}
//             className='rounded-md object-cover'
//           />
//         </div>
//       )}
//       <Button type='submit' disabled={!file || uploading}>
//         {uploading ? "Uploading..." : "Upload"}
//       </Button>
//     </form>
//   );
// }
