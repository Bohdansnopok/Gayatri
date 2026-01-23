"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProductStore } from "@/store/productStore";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../admin.css";

interface EditModalProps {
  editingProduct: any;
  setEditingProduct: (product: any) => void;
  category: string;
}

export default function AdminEditModal({
  editingProduct,
  setEditingProduct,
  category,
}: EditModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { updateProduct } = useProductStore();

  const closeEditModal = () => setEditingProduct(null);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      await updateProduct(editingProduct.id, category, editingProduct);
      setEditingProduct(null);
      closeEditModal();
      alert("Продукт успішно оновлено");
    } catch (error) {
      alert("Помилка оновлення продукту");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (!editingProduct) {
    return null;
  }

  useAuth();

  return (
    <div>
      <div className="overlay" onClick={closeEditModal}></div>

      <div className="editingModal">
        <FaTimes onClick={closeEditModal} className="editingModal__close" />

        <form className="editingModal__form" onSubmit={handleSubmit}>
          <h2>Редагувати продукт</h2>
          <label>зображення продукту</label>
          <input
            type="file"
            className="admin__form__imageUpload"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setEditingProduct({
                  ...editingProduct,
                  image: e.target.files[0],
                });
              }
            }}
            disabled={loading}
          />

          <div className="editModal__image-preview">
            <img
              src={
                typeof editingProduct.image === "string"
                  ? editingProduct.image
                  : URL.createObjectURL(editingProduct.image)
              }
              alt="Preview"
              className="editModal__image-preview__img"
            />
          </div>

          <label>Назва продукту</label>
          <input
            type="text"
            className="editModal__input"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
          />

          <label>мілілітри</label>
          <input
            type="text"
            className="editModal__input"
            value={editingProduct.mililitres}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                mililitres: e.target.value,
              })
            }
          />

          <label>Опис продукту</label>
          <textarea
            className="editModal__input"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
          />

          <label>Ціна продукту</label>
          <input
            type="text"
            className="editModal__input"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: e.target.value,
              })
            }
          />

          <button type="submit" className="editModal__button defaultButton">
            Оновити продукт
          </button>
        </form>
      </div>
    </div>
  );
}
