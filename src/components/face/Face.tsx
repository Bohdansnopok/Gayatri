"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  category: string;
}

interface FaceProps {
  products?: Product[];
}

export default function Face({ products = [] }: FaceProps) {
  if (products.length === 0) return null;
  const addToCart = useCartStore((state) => state.addToCart);


  return (
    <section id="face" className="face">
      <div className="container">
        <h1>Догляд за обличчям</h1>

        <div className="face__cards">
          {products.map((product) => (
            <div key={product.id} className="face__card">
              <section>
                <div className="face__card__image-container">
                  <Image
                    src={product.image}
                    className="face__card__image"
                    alt={product.name}
                    height={500}
                    width={400}
                    priority={product.id <= 2}
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
