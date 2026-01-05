"use client";

import Link from "next/link";
import { useState } from "react";
import AdminForm from "../adminForm/page";
import AdminSidebar from "../admin-sidebar/page";
import { useAuth } from "@/hooks/useAuth";

export default function AdminAdd() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) return;
    console.log("Завантажуємо файл:", selectedImage);
  };

  useAuth()
  
  return (
    <section className="admin">
      <AdminSidebar />

      <div className="adminAdd">
        <AdminForm category="OILS" />
        <AdminForm category="FACE" />
        <AdminForm category="BODY" />
        <AdminForm category="HAIR" />
        <AdminForm category="DECOR" />
      </div>
    </section>
  );
}
