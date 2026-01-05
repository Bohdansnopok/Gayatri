"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminOils() {
  const { fetchOilsProducts, oilsProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchOilsProducts();
  }, []);

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
                    oilsProducts.image
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}
            <div className="admin__edit__card__name">{oilsProducts.name}</div>

            <div className="admin__edit__card__price">{oilsProducts.price}</div>

            <div className="admin__edit__card__buttons">
              <button
                onClick={() => deleteProduct(oilsProducts.id, "oils")}
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
