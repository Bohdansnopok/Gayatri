"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export default function DecorativeCosmetic() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { fetchDecorProducts, decorProducts } = useProductStore();

  useEffect(() => {
    fetchDecorProducts();
  });

  return (
    <section id="decorative" className="face">
      <div className="container">
        <h1>Декоративна косметика</h1>
        <div className="face__cards">
          {decorProducts.map((product, index) => (
            <div key={product.id} className="face__card">
              <section>
                <div className="face__card__image-container">
                  <img
                    src={product.image}
                    alt={product.name || ""}
                    className="face__card__image"
                    width={300}
                    height={350}
                    onError={(e) => {
                      console.error(
                        "Помилка завантаження зображення:",
                        product.image
                      );
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />
                </div>

                <h2>{product.name}</h2>
                <h4>{product.mililitres} Мл</h4>
              </section>

              <section>
                <div className="face__card__price">{product.price} грн</div>
                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      price: Number(product.price),
                      mililitres: Number(product.mililitres),
                    });
                  }}
                  className="face__card__button defaultButton"
                >
                  Купити
                </button>
              </section>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
