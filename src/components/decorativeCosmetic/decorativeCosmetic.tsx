"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  category: string;
}

interface DecorativeProps {
  products?: Product[];
}

export default function DecorativeCosmetic({ products = [] }: DecorativeProps) {
  if (products.length === 0) return null;
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <section id="decorative" className="face">
      <div className="container">
        <h1>Декоративна косметика</h1>
        <div className="face__cards">
          {products.map((product, index) => (
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
              </section>

              <section>
                <div className="face__card__price">{product.price} грн</div>
                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      price: Number(product.price),
                      mililitres: "50 мл",
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
