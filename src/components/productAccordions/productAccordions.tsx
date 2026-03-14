"use client";

import Image from "next/image";
import "./productAccordions.css";
import dropIcon from "../../../public/drop.svg";
import magicIcon from "../../../public/magic.svg";
import heartIcon from "../../../public/heart.png";
import wavesIcon from "../../../public/waves.svg";
import paintsIcon from "../../../public/paints.svg";
import arrow from "../../../public/arrow.svg";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { motion } from "framer-motion";

export default function ProductAccordion() {
  const addToCart = useCartStore((state) => state.addToCart);
  const {
    openSection,
    toggleSection,
    fetchOilsProducts,
    oilsProducts,
    fetchFaceProducts,
    faceProducts,
    fetchBodyProducts,
    bodyProducts,
    fetchHairProducts,
    hairProducts,
    fetchDecorProducts,
    decorProducts,
  } = useProductStore();

  useEffect(() => {
    fetchOilsProducts();
    fetchFaceProducts();
    fetchBodyProducts();
    fetchHairProducts();
    fetchDecorProducts();
  }, [
    fetchOilsProducts,
    fetchFaceProducts,
    fetchBodyProducts,
    fetchHairProducts,
    fetchDecorProducts,
  ]);

  return (
    <motion.div
      className="products-accrodion"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container">
        <motion.div
          className="products-accrodion__item oils"
          id="oils"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => toggleSection("oils")}
            className="products-accrodion__button"
          >
            <div className="icon-title-wrapp">
              <div className="ourProducts__cards__card__icon drop">
                <Image src={dropIcon} alt="Drop Icon" />
              </div>
              <h2>
                <strong>Ефірні олії</strong>
              </h2>
            </div>
            <Image
              src={arrow}
              alt="Arrow"
              className={`arrow ${openSection === "oils" ? "active" : ""}`}
            />
          </button>

          {openSection === "oils" && (
            <div className="products-accrodion__item__content active">
              {oilsProducts.map((product) => (
                <div
                  key={product.id}
                  className="products-accrodion__item__content__card"
                >
                  <img src={product.image} alt={product.name} />
                  <div className="products-accrodion__item__content__card__info">
                    <h3>{product.name}</h3>
                    <div className="subtitle">{product.description}</div>
                    <div className="flex-wrapp">
                      <div className="price">{product.price} <span>₴</span></div>
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
        </motion.div>

        <motion.div
          className="products-accrodion__item face"
          id="face"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => toggleSection("face")}
            className="products-accrodion__button"
          >
            <div className="icon-title-wrapp">
              <div className="ourProducts__cards__card__icon magic">
                <Image src={magicIcon} alt="Magic Icon" />
              </div>
              <h2>
                <strong>Догляд за обличчям</strong>
              </h2>
            </div>
            <Image
              src={arrow}
              alt="Arrow"
              className={`arrow ${openSection === "face" ? "active" : ""}`}
            />
          </button>

          {openSection === "face" && (
            <div className="products-accrodion__item__content active">
              {faceProducts.map((product) => (
                <div
                  key={product.id}
                  className="products-accrodion__item__content__card"
                >
                  <img src={product.image} alt={product.name} />
                  <div className="products-accrodion__item__content__card__info">
                    <h3>{product.name}</h3>
                    <div className="subtitle">{product.description}</div>
                    <div className="flex-wrapp">
                      <div className="price">{product.price} <span>₴</span></div>
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
        </motion.div>

        <motion.div
          className="products-accrodion__item body"
          id="body"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => toggleSection("body")}
            className="products-accrodion__button"
          >
            <div className="icon-title-wrapp">
              <div className="ourProducts__cards__card__icon magic">
                <Image src={heartIcon} alt="Magic Icon" />
              </div>
              <h2>
                <strong>Догляд за тілом</strong>
              </h2>
            </div>
            <Image
              src={arrow}
              alt="Arrow"
              className={`arrow ${openSection === "body" ? "active" : ""}`}
            />
          </button>

          {openSection === "body" && (
            <div className="products-accrodion__item__content active">
              {bodyProducts.map((product) => (
                <div
                  key={product.id}
                  className="products-accrodion__item__content__card"
                >
                  <img src={product.image} alt={product.name} />
                  <div className="products-accrodion__item__content__card__info">
                    <h3>{product.name}</h3>
                    <div className="subtitle">{product.description}</div>
                    <div className="flex-wrapp">
                      <div className="price">{product.price} <span>₴</span></div>
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
        </motion.div>

        <motion.div
          className="products-accrodion__item hair"
          id="hair"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => toggleSection("hair")}
            className="products-accrodion__button"
          >
            <div className="icon-title-wrapp">
              <div className="ourProducts__cards__card__icon waves">
                <Image src={wavesIcon} alt="Magic Icon" />
              </div>
              <h2>
                <strong>Догляд за волоссям</strong>
              </h2>
            </div>
            <Image
              src={arrow}
              alt="Arrow"
              className={`arrow ${openSection === "hair" ? "active" : ""}`}
            />
          </button>

          {openSection === "hair" && (
            <div className="products-accrodion__item__content active">
              {hairProducts.map((product) => (
                <div
                  key={product.id}
                  className="products-accrodion__item__content__card"
                >
                  <img src={product.image} alt={product.name} />
                  <div className="products-accrodion__item__content__card__info">
                    <h3>{product.name}</h3>
                    <div className="subtitle">{product.description}</div>
                    <div className="flex-wrapp">
                      <div className="price">{product.price} <span>₴</span></div>
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
        </motion.div>

        <motion.div
          className="products-accrodion__item decor"
          id="decor"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => toggleSection("decor")}
            className="products-accrodion__button"
          >
            <div className="icon-title-wrapp">
              <div className="ourProducts__cards__card__icon paints">
                <Image src={paintsIcon} alt="Magic Icon" />
              </div>
              <h2>
                <strong>Декоративна косметика</strong>
              </h2>
            </div>
            <Image
              src={arrow}
              alt="Arrow"
              className={`arrow ${openSection === "decor" ? "active" : ""}`}
            />
          </button>

          {openSection === "decor" && (
            <div className="products-accrodion__item__content active">
              {decorProducts.map((product) => (
                <div
                  key={product.id}
                  className="products-accrodion__item__content__card"
                >
                  <img src={product.image} alt={product.name} />
                  <div className="products-accrodion__item__content__card__info">
                    <h3>{product.name}</h3>
                    <div className="subtitle">{product.description}</div>
                    <div className="flex-wrapp">
                      <div className="price">{product.price} <span>₴</span></div>
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
        </motion.div>
      </div>
    </motion.div>
  );
}
