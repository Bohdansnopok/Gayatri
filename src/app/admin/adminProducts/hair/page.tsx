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

export default function AdminHair() {
  const { fetchHairProducts, hairProducts, deleteProduct } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const openEditModal = (product: any) => {
    setEditingProduct({ ...product });
  };

  useEffect(() => {
    fetchHairProducts();
  }, []);

  useAuth();

  return (
    <aside className="admin">
      <AdminSidebar />
      <div className="admin__edit">
        {hairProducts.map((hairProducts) => (
          <div key={hairProducts.id} className="admin__edit__card">
            {hairProducts.image && (
              <img
                src={hairProducts.image}
                alt={hairProducts.name || ""}
                className="admin__edit__card__image"
                width={300}
                height={350}
                onError={(e) => {
                  console.error(
                    "Помилка завантаження зображення:",
                    hairProducts.image,
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}
            <div className="face__card__wrapper">
              <div className="admin__edit__card__name">{hairProducts.name}</div>

              <div className="admin__edit__card__mililitres">
                {hairProducts.mililitres} Мл
              </div>

              {/* <div className="admin__edit__card__description">
                {hairProducts.description}
              </div> */}

              <button
                className="face__detailsButton"
                onClick={() => setSelectedProduct(hairProducts)}
              >
                Детальніше
              </button>

              <div className="admin__edit__card__price">
                {hairProducts.price}
              </div>

              <div className="admin__edit__card__buttons">
                <button
                  onClick={() => deleteProduct(hairProducts.id, "hair")}
                  className="admin__edit__card__buttons__button"
                >
                  <FaTrash /> Видалити
                </button>

                <button
                  onClick={() => openEditModal(hairProducts)}
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
          category="hair"
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
