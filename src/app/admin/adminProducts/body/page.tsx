"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminBody() {
  const { fetchBodyProducts, bodyProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchBodyProducts();
  }, []);

  useAuth()

  return (
    <aside className="admin">
      <AdminSidebar />
      <div className="admin__edit">
        {bodyProducts.map((bodyProducts) => (
          <div  key={bodyProducts.id}  className="admin__edit__card">
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
                    bodyProducts.image
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}
            <div className="admin__edit__card__name">{bodyProducts.name}</div>

            <div className="admin__edit__card__price">{bodyProducts.price}</div>

            <div className="admin__edit__card__buttons">
              <button onClick={() => deleteProduct(bodyProducts.id, "body")} className="admin__edit__card__buttons__button">
                <FaTrash /> Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
