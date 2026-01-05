"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminHair() {
  const { fetchHairProducts, hairProducts, deleteProduct } = useProductStore();

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
                    hairProducts.image
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}
            <div className="admin__edit__card__name">{hairProducts.name}</div>

            <div className="admin__edit__card__mililitres">{hairProducts.mililitres} Мл</div>

            <div className="admin__edit__card__price">{hairProducts.price}</div>

            <div className="admin__edit__card__buttons">
              <button
                onClick={() => deleteProduct(hairProducts.id, "hair")}
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
