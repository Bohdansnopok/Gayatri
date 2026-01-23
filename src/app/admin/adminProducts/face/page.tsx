"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AdminEditModal from "../../adminEditModal/adminEditModal";
import CartDescriptionModal from "@/components/cartDescriptionModal/cartDescriptionModal";

export default function AdminEdit() {
  const { fetchFaceProducts, faceProducts, deleteProduct } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const openEditModal = (product: any) => {
    setEditingProduct({ ...product });
  };

  useEffect(() => {
    fetchFaceProducts();
  }, []);

  useAuth();

  return (
    <aside className="admin">
      <AdminSidebar />
      <div className="admin__edit">
        {faceProducts.map((faceProducts) => (
          <div key={faceProducts.id} className="admin__edit__card">
            {faceProducts.image && (
              <img
                src={faceProducts.image}
                alt={faceProducts.name || ""}
                className="admin__edit__card__image"
                width={300}
                height={350}
                onError={(e) => {
                  console.error(
                    "Помилка завантаження зображення:",
                    faceProducts.image,
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}

            <div className="face__card__wrapper">
              <div className="admin__edit__card__name">{faceProducts.name}</div>

              <div className="admin__edit__card__mililitres">
                {faceProducts.mililitres} Мл
              </div>

              {/* <div className="admin__edit__card__description">
                {faceProducts.description}
              </div> */}

              <button
                className="face__detailsButton"
                onClick={() => setSelectedProduct(faceProducts)}
              >
                Детальніше
              </button>

              <div className="admin__edit__card__price">
                {faceProducts.price}
              </div>

              <div className="admin__edit__card__buttons">
                <button
                  onClick={() => deleteProduct(faceProducts.id, "face")}
                  className="admin__edit__card__buttons__button"
                >
                  <FaTrash /> Видалити
                </button>

                <button
                  onClick={() => openEditModal(faceProducts)}
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
        <AdminEditModal
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          category="face"
        />
      )}

      {selectedProduct && (
        <CartDescriptionModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </aside>
  );
}
