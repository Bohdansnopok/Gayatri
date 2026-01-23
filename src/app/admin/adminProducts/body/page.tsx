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

export default function AdminBody() {
  const { fetchBodyProducts, bodyProducts, deleteProduct } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const openEditModal = (product: any) => {
    setEditingProduct({ ...product });
  };

  useEffect(() => {
    fetchBodyProducts();
  }, []);

  useAuth();

  return (
    <aside className="admin">
      <AdminSidebar />
      <div className="admin__edit">
        {bodyProducts.map((bodyProducts) => (
          <div key={bodyProducts.id} className="admin__edit__card">
            {bodyProducts.image && (
              <img
                src={bodyProducts.image}
                alt={bodyProducts.name || ""}
                className="admin__edit__card__image"
                width={300}
                height={350}
                onError={(e) => {
                  console.error(
                    "Помилка завантаження зображення:",
                    bodyProducts.image,
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}
            <div className="face__card__wrapper">
              <div className="admin__edit__card__name">{bodyProducts.name}</div>

              <div className="admin__edit__card__mililitres">
                {bodyProducts.mililitres} Мл
              </div>

              {/* <div className="admin__edit__card__description">
                {bodyProducts.description}
              </div> */}

              <button
                className="face__detailsButton"
                onClick={() => setSelectedProduct(bodyProducts)}
              >
                Детальніше
              </button>

              <div className="admin__edit__card__price">
                {bodyProducts.price}
              </div>

              <div className="admin__edit__card__buttons">
                <button
                  onClick={() => deleteProduct(bodyProducts.id, "body")}
                  className="admin__edit__card__buttons__button"
                >
                  <FaTrash /> Видалити
                </button>
                <button
                  onClick={() => openEditModal(bodyProducts)}
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
          category="body"
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
