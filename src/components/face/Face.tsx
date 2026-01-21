"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import CartDescriptionModal from "../cartDescriptionModal/cartDescriptionModal";

export default function DecorativeCosmetic() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { fetchFaceProducts, faceProducts } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchFaceProducts();
  });

  return (
    <section id="face" className="face">
      <div className="container">
        <h1>Догляд за обличчям</h1>
        <div className="face__cards">
          {faceProducts.map((product, index) => (
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
                        product.image,
                      );
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />
                </div>

                <h2>{product.name}</h2>
                <h4>{product.mililitres} Мл</h4>
                <button onClick={() => setSelectedProduct(product)}>
                  Детальніше / Редагувати
                </button>

                {/* <p>{product.description}</p> */}
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

      {selectedProduct && (
        <CartDescriptionModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
}
