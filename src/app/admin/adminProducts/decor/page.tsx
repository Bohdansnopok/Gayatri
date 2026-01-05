"use client";

import Image from "next/image";
import AdminSidebar from "../../admin-sidebar/page";
import intensiveHydro from "../../../../public/intensiveGydrotation.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDecor() {
  const { fetchDecorProducts, decorProducts, deleteProduct } =
    useProductStore();

  useEffect(() => {
    fetchDecorProducts();
  }, []);

  useAuth();

  return (
    <aside className="admin">
      <AdminSidebar />
      <div className="admin__edit">
        {decorProducts.map((decorProducts) => (
          <div key={decorProducts.id} className="admin__edit__card">
            {decorProducts.image && (
              <img
                src={decorProducts.image}
                alt={decorProducts.name || ""}
                className="admin__edit__card__image"
                width={300}
                height={350}
                onError={(e) => {
                  console.error(
                    "Помилка завантаження зображення:",
                    decorProducts.image
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            )}
            <div className="admin__edit__card__name">{decorProducts.name}</div>

            <div className="admin__edit__card__mililitres">{decorProducts.mililitres} Мл</div>

            <div className="admin__edit__card__price">
              {decorProducts.price}
            </div>

            <div className="admin__edit__card__buttons">
              <button
                onClick={() => deleteProduct(decorProducts.id, "decor")}
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
