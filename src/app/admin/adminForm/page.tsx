// src/components/AdminForm.tsx - СПРОЩЕНА ВЕРСІЯ
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProductStore } from "@/store/productStore";
import { useState, useEffect } from "react";

type Props = {
  category: "FACE" | "BODY" | "HAIR" | "DECOR" | "OILS";
};

export default function AdminForm({ category }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mililitres, setMililitres] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Тільки потрібні функції
  const addProduct = useProductStore((s) => s.addProduct);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Введіть назву товару");
      return;
    }

    const priceNum = parseFloat(price);
    const mililitresNum = parseFloat(mililitres);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Введіть коректну ціну");
      return;
    }

    setLoading(true);

    try {
      if (!imageFile) {
        alert("Завантажте зображення");
        setLoading(false);
        return;
      }

      await addProduct(
        {
          name,
          price: priceNum,
          mililitres: mililitresNum,
          imageFile,
        },
        category
      );

      setName("");
      setPrice("");
      setMililitres("");
      setImageFile(null);
      setPreview(null);

      const fileInput = document.querySelector(
        `input[type="file"][data-category="${category}"]`
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      alert(`✅ Товар додано до ${category}!`);
    } catch (error: any) {
      console.error(`Помилка:`, error);
      alert(`❌ ${error.message || "Помилка"}`);
    } finally {
      setLoading(false);
    }
  };

  // Видалено всі useEffect з fetch - це була причина лагів
  // useAuth також може бути причиною - спробуйте коментувати його
  useAuth();

  return (
    <form className="admin__form" onSubmit={handleSubmit}>
      <h3 className="form__title">Gayatri shop:{category}</h3>

      <div className="form__group">
        <input
          type="file"
          className="admin__form__imageUpload"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          data-category={category}
        />
      </div>

      {preview && (
        <div className="form__preview">
          <p className="form__preview-title">Прев'ю:</p>
          <img
            src={preview}
            alt="Preview"
            className="admin__edit__card__image"
            width={300}
            height={350}
          />
        </div>
      )}

      <div className="form__group">
        <input
          type="text"
          className="form__input"
          placeholder="Назва товару"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="form__group">
        <input
          type="number"
          className="form__input"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="1"
          step="1"
          disabled={loading}
        />
      </div>

      <div className="form__group">
        <input
          type="number"
          className="form__input"
          placeholder="Мілілітри"
          value={mililitres}
          onChange={(e) => setMililitres(e.target.value)}
          min="0"
          step="1"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="defaultButton"
        disabled={loading || !name.trim() || !price.trim()}
      >
        {loading ? "Додаємо..." : "Додати товар"}
      </button>
    </form>
  );
}