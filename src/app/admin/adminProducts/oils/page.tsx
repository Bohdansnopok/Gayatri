"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { close } from "fs";
import AdminEditModal from "../../adminEditModal/adminEditModal";
import CartDescriptionModal from "@/components/cartDescriptionModal/cartDescriptionModal";

export default function AdminOils() {
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { fetchOilsProducts, oilsProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchOilsProducts();
  }, []);

  const openEditModal = (product: any) => {
    setEditingProduct({ ...product });
  };

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
              {/* <div className="admin__edit__card__description">
                {oilsProducts.description}
              </div> */}
              <button
                className="face__detailsButton"
                onClick={() => setSelectedProduct(oilsProducts)}
              >
                Детальніше
              </button>

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
        <AdminEditModal
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          category="oils"
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
