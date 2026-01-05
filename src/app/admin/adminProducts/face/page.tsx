"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminEdit() {
  const { fetchFaceProducts, faceProducts, deleteProduct } = useProductStore();

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
                    faceProducts.image
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}

            <div className="admin__edit__card__name">{faceProducts.name}</div>

            <div className="admin__edit__card__mililitres">{faceProducts.mililitres} Мл</div>

            <div className="admin__edit__card__price">{faceProducts.price}</div>

            <div className="admin__edit__card__buttons">
              <button
                onClick={() => deleteProduct(faceProducts.id, "face")}
                className="admin__edit__card__buttons__button"
              >
                <FaTrash /> Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
