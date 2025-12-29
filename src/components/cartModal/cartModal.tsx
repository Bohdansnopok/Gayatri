"use client";

import Image from "next/image";
import cleansignGel from "../../../public/cleansingGel.jpg";
import Counter from "../counter/counter";
import "./cartModal.css";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export interface Product {
  id: string;
  name: string;
  mililitres: string;
  category: string;
  price: number;
  image?: string;
}

export default function CartModal() {
  const paymentMethods = [
    { id: "prepaid", label: "Передплата" },
    { id: "cod", label: "Наложений платіж" },
  ];

  const [selected, setSelected] = useState(paymentMethods[0].id);

  const handleSubmit = () => {
    alert(`Ви обрали: ${selected}`);
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const { cart, removeFromCart, clearCart } = useCartStore();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="cartOpenButton">
        <FaShoppingCart size={20} />
        <span>{cart.length}</span>
      </button>
      {isOpen && (
        <section className="cartModal-overlay">
          <section className="cartModal">
            <button
              onClick={() => setIsOpen(false)}
              className="cartModal__close"
            >
              <FaTimes size={20} />
            </button>
            <div className="cartModal__title">Товари</div>
            <div className="cartModal__list">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="cartModal__list__product">
                    <div className="cartModal__list__product__wrapper">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        height={46}
                        width={46}
                        className="cartModal__list__product__image"
                      />
                      <div className="cartModal__list__product__info">
                        <div className="cartModal__list__product__name">
                          {item.name}
                        </div>
                        <div className="cartModal__list__product__mililitres">
                          {item.mililitres}
                        </div>
                        <div className="cartModal__list__product__price__mobileWrapper">
                          <Counter />
                          <div className="cartModal__list__product__price">
                            {item.price} грн
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="cartModal__list__product__delete"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                      <div className="cartModal__list__product__price__deckstopWrapper">
                        <Counter />

                        <div className="cartModal__list__product__price">
                          {item.price} грн
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cartModal__list__product__delete"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Кошик порожній</p>
              )}
            </div>
            <div className="cartModal__summary">Загальна сума: {totalPrice}</div>
            <div className="cartModal__title">Зробити замовлення</div>
            <form className="cartModal__form">
              <div className="cartModal__form__title">Прізвище та ім'я *</div>
              <input type="text" className="cartModal__form__input" />
              <div className="cartModal__form__title">Телефон *</div>
              <input
                type="number"
                placeholder="+38 (000) 000-00-00
"
                className="cartModal__form__input"
              />
              <div className="cartModal__form__title">Електронна пошта *</div>
              <input type="text" className="cartModal__form__input" />
              <div className="cartModal__form__title">Доставка *</div>
              <input
                type="text"
                placeholder="
місто, відділенні Нової пошти
"
                className="cartModal__form__input"
              />
              <div className="cartModal__form__title">Нік в телеграм *</div>
              <input
                type="text"
                placeholder="Для швидшого піддвердження замовлення
"
                className="cartModal__form__input"
              />
            </form>
            <div className="cartModal__title cartModal__payment__title">
              Варіант оплати
            </div>
            <div className="cartModal__payment">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelected(method.id)}
                  className="cartModal__payment__version"
                >
                  <span>{method.label}</span>
                  {selected === method.id && (
                    <span className="checkMark">✓</span>
                  )}
                </div>
              ))}
            </div>
            <div className="cartModal__payment__button__wrapper">
              <button
                type="submit"
                className="defaultButton cartModal__payment__button"
              >
                Перейти до оплати
              </button>
            </div>
          </section>
        </section>
      )}
    </div>
  );
}
