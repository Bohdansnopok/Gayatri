"use client";

import Image from "next/image";
import "./productAccordions.css";
import dropIcon from "../../../public/drop.svg";
import cardBg from "../../../public/product-card-bg.jpg";
import arrow from "../../../public/arrow.svg";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";

export default function ProductAccordion() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { fetchOilsProducts, oilsProducts } = useProductStore();
  
  useEffect(() => {
    fetchOilsProducts();
  }, [fetchOilsProducts]); 

  const [accordionOpen, setAccordionOpen] = useState(false);

  const accordionToggle = () => {
    setAccordionOpen((prev) => !prev);
  };

  return (
    <section className="products-accrodion">
      <div className="container">
        <div className="products-accrodion__item oils">
          <button
            onClick={accordionToggle}
            className="products-accrodion__button"
          >
            <div className="icon-title-wrapp">
              <div className="ourProducts__cards__card__icon">
                <Image src={dropIcon} alt="Drop Icon" />
              </div>
              <h2>
                <strong>Ефірні олії</strong>
              </h2>
            </div>
            <Image 
              src={arrow} 
              alt="Arrow" 
              className={`arrow ${accordionOpen ? "active" : ""}`} 
            />
          </button>

          {accordionOpen && (
            <div className="products-accrodion__item__content active">
              {oilsProducts.map((product) => (
                <div key={product.id} className="products-accrodion__item__content__card">
                  <img src={product.image} alt="Product Background" width={443} height={567}/>
                  <div className="products-accrodion__item__content__card__info">
                    <h3>{product.name || "Ефірні олії"}</h3>
                    <div className="subtitle">Природна сила ароматів</div>
                    <div className="flex-wrapp">
                      <div className="price">
                        {product.price}
                      </div>
                      <button 
                        className="addToCart defaultButton"
                        onClick={() => addToCart(product)}
                      >
                        Додати до кошика
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}