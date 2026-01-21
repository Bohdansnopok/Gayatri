"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import CartDescriptionModal from "../cartDescriptionModal/cartDescriptionModal";

export default function DecorativeCosmetic() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { fetchHairProducts, hairProducts } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchHairProducts();
  });

  return (
    <section id="hair" className="face">
      <div className="container">
        <h1>Догляд за волоссям</h1>
        <div className="face__cards">
          {hairProducts.map((product, index) => (
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
                <button className="face__detailsButton" onClick={() => setSelectedProduct(product)}>
                    Детальніше 
                  </button>
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
