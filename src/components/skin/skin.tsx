"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export default function DecorativeCosmetic() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { fetchBodyProducts, bodyProducts } = useProductStore();

useEffect(() => {
  fetchBodyProducts()
})

  return (
    <section id="decorative" className="face">
      <div className="container">
        <h1>Декоративна косметика</h1>
        <div className="face__cards">
          {bodyProducts.map((product, index) => (
            <div key={product.id} className="face__card">
              <section>
                <div className="face__card__image-container">
                  <Image
                    src={product.image}
                    className="face__card__image"
                    alt={product.name}
                    height={500}
                    width={400}
                    priority={index <= 1}
                  />
                </div>

                <h2>{product.name}</h2>
                {/* <h4>{product.mililitres}</h4> */}
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
