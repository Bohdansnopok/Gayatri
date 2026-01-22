"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { close } from "fs";

export default function AdminOils() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { fetchOilsProducts, oilsProducts, deleteProduct, updateProduct } =
    useProductStore();

  useEffect(() => {
    fetchOilsProducts();
  }, []);

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

  const [editingProduct, setEditingProduct] = useState<any>(null);

  const openEditModal = (product: any) => {
    setEditingProduct({ ...product });
  };

  const closeEditModal = () => setEditingProduct(null);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
    e.preventDefault();

    await updateProduct(editingProduct.id, "oils", editingProduct);
    closeEditModal();
    alert("Продукт успішно оновлено");
    } catch (error) {
      alert("Помилка оновлення продукту");
    }
  }

  useAuth();

  return (
    <aside className="admin">
      <AdminSidebar />
      <div className="admin__edit">
        {oilsProducts.map((oilsProducts) => (
          <div key={oilsProducts.id} className="admin__edit__card">
            {oilsProducts.image && (
              <img
                src={oilsProducts.image}
                alt={oilsProducts.name || ""}
                className="admin__edit__card__image"
                width={300}
                height={350}
                onError={(e) => {
                  console.error(
                    "Помилка завантаження зображення:",
                    oilsProducts.image,
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}
            <div className="face__card__wrapper">
              <div className="admin__edit__card__name">{oilsProducts.name}</div>
              <div className="admin__edit__card__mililitres">
                {oilsProducts.mililitres} Мл
              </div>
              <div className="admin__edit__card__description">
                {oilsProducts.description}
              </div>
              <div className="admin__edit__card__price">
                {oilsProducts.price}
              </div>
              <div className="admin__edit__card__buttons">
                <button
                  onClick={() => deleteProduct(oilsProducts.id, "oils")}
                  className="admin__edit__card__buttons__button"
                >
                  <FaTrash /> Видалити
                </button>

                <button
                  onClick={() => openEditModal(oilsProducts)}
                  className="admin__edit__card__buttons__button"
                >
                  <FaEdit /> редагувати
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div>
          <div className="overlay" onClick={closeEditModal}></div>

          <div className="editingModal">
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

              <button type="submit" className="editModal__button defaultButton">Оновити продукт</button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
