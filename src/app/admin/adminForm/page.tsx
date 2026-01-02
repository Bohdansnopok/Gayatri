"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProductStore } from "@/store/productStore";
import { useState, useEffect } from "react";

type Props = {
  category: "FACE" | "BODY" | "HAIR" | "DECOR";
};

export default function AdminForm({ category }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const addProduct = useProductStore((s) => s.addProduct);

  const categoryProducts = useProductStore((state) => {
    switch (category) {
      case "FACE":
        return state.faceProducts;
      case "BODY":
        return state.bodyProducts;
      case "HAIR":
        return state.hairProducts;
      case "DECOR":
        return state.decorProducts;
      default:
        return [];
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
      switch (category) {
        case "FACE":
          await useProductStore.getState().fetchFaceProducts();
          break;
        case "BODY":
          await useProductStore.getState().fetchBodyProducts();
          break;
        case "HAIR":
          await useProductStore.getState().fetchHairProducts();
          break;
        case "DECOR":
          await useProductStore.getState().fetchDecorProducts();
          break;
      }
    };

    fetchProducts();
  }, [category]);

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
      alert("Введите название товара");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Введите корректную цену");
      return;
    }

    setLoading(true);

    try {
      await addProduct(
        {
          name,
          price: priceNum,
          imageFile: imageFile || undefined,
        },
        category
      );

      setName("");
      setPrice("");
      setImageFile(null);
      setPreview(null);

      const fileInput = document.querySelector(
        `input[type="file"][data-category="${category}"]`
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      alert(`✅ Товар добавлен в ${category}!`);
    } catch (error: any) {
      console.error(`Ошибка:`, error);
      alert(`❌ ${error.message || "Ошибка"}`);
    } finally {
      setLoading(false);
    }
  };

  useAuth();

  return (
    <form className="admin__form" onSubmit={handleSubmit}>
      <h3 className="form__title">Категория: {category}</h3>

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
          <p className="form__preview-title">Превью:</p>
          <img
            src={preview}
            alt={preview || ""}
            className="admin__edit__card__image"
            width={300}
            height={350}
          />
          {imageFile && (
            <p className="form__file-info">
              Файл: {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
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
          min="0"
          step="0.01"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="defaultButton "
        disabled={loading || !name.trim() || !price.trim()}
      >
        {loading ? (
          <span className="loading-text">
            <span className="spinner"></span> Додаємо...
          </span>
        ) : (
          "Додати товар"
        )}
      </button>

      <div className="form__info">
        <p className="form__note">
          <small>* Обов'язкові поля</small>
        </p>
        <p className="form__note">
          <small>Товар буде доданий до категрії: "{category}"</small>
        </p>
      </div>
    </form>
  );
}
