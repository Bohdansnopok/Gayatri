"use client";

import "./cartModal.css";
import { FaTimes, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useForm } from "react-hook-form";
import { HiOutlineTrash } from "react-icons/hi";

export default function CartModal() {
  const {
    cart: cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCartStore();

  const { handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit = () => {
    // Тут при відправці можна використовувати cartItems,
    // які вже містять актуальну кількість (quantity) для кожного товару
    console.log("Дані для відправки:", cartItems);
    alert(`Замовлення оформлене, очікуйте підтвердження`);
    closeCart();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    }
  }, [isCartOpen]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isCartOpen) return null;

  return (
    <section className="cartModal-overlay">
      <section className="cartModal">
        <div className="cartModal__top-line">
          <h3>Кошик</h3>
          <button onClick={closeCart} className="cartModal__close">
            <FaTimes size={25} />
          </button>
        </div>

        <div className="cartModal__products">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <>
                <div key={item.id} className="cartModal__products__product">
                  <div className="cartModal__product-left">
                    {(() => {
                      const imageSrc = item.image
                        ? item.image.startsWith("http")
                          ? item.image
                          : item.image.startsWith("/")
                            ? item.image
                            : `/${item.image}`
                        : "/logo.png";
                      return (
                        <img
                          src={imageSrc}
                          alt={item.name}
                          className="cartModal__product-img"
                          onError={(e) => {
                            e.currentTarget.src = "/logo.png";
                          }}
                        />
                      );
                    })()}
                    <div className="cartModal__product-info">
                      <h3>{item.name}</h3>
                    </div>
                  </div>

                  <div className="cartModal__product-right">
                    <div className="cartModal__quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="cartModal__qty-btn"
                      >
                        <FaChevronDown size={19} color="#4a5565" />
                      </button>
                      <span className="cartModal__qty-value">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="cartModal__qty-btn"
                      >
                        <FaChevronUp size={19} color="#4a5565" />
                      </button>
                    </div>

                    <div className="flex-row">
                      <p className="cartModal__product-price">
                        {item.price * item.quantity} грн
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cartModal__remove"
                      >
                        <HiOutlineTrash size={28} color="#4a5565" />{" "}
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  key={`${item.id}-mobile`}
                  className="cartModal__products__product mobile"
                >
                  <div className="cartModal__product-left">
                    {(() => {
                      const imageSrc = item.image
                        ? item.image.startsWith("http")
                          ? item.image
                          : item.image.startsWith("/")
                            ? item.image
                            : `/${item.image}`
                        : "/logo.png";
                      return (
                        <img
                          src={imageSrc}
                          alt={item.name}
                          className="cartModal__product-img"
                          onError={(e) => {
                            e.currentTarget.src = "/logo.png";
                          }}
                        />
                      );
                    })()}
                  </div>

                  <div className="cartModal__product-info">
                    <h3>{item.name}</h3>
                  </div>

                  <div className="cartModal__product-right">
                    <div className="cartModal__quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="cartModal__qty-btn"
                      >
                        <FaChevronDown size={19} color="#4a5565" />
                      </button>
                      <span className="cartModal__qty-value">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="cartModal__qty-btn"
                      >
                        <FaChevronUp size={19} color="#4a5565" />
                      </button>
                    </div>

                    <div className="flex-row">
                      <p className="cartModal__product-price">
                        {item.price * item.quantity} грн
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cartModal__remove"
                      >
                        <HiOutlineTrash size={28} color="#4a5565" />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <h1 className="cartModal__empty">Кошик порожній</h1>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cartModal__footer">
            <div className="cartModal__total">
              <span className="cartModal__total__title">Загальна вартість</span>
              <span className="cartModal__total__price">{totalPrice} грн</span>
            </div>
          </div>
        )}

        <form className="cartModal__form">
          <label className="cartModal__form__label">
            <p className="cartModal__form__label__inputType">
              Прізвище та ім’я *
            </p>
            <input
              className="cartModal__form__label__input"
              placeholder="Іван Петренко"
            />
          </label>
          <label className="cartModal__form__label">
            <p className="cartModal__form__label__inputType">Телефон *</p>
            <input
              className="cartModal__form__label__input"
              placeholder="+380 (000) 000-00-00"
            />
          </label>
          <label className="cartModal__form__label">
            <p className="cartModal__form__label__inputType">
              Електронна пошта *
            </p>
            <input
              className="cartModal__form__label__input"
              placeholder="Example@gmail.com"
            />
          </label>
          <label className="cartModal__form__label">
            <p className="cartModal__form__label__inputType">Доставка *</p>
            <input
              className="cartModal__form__label__input"
              placeholder="Місто, відділення Нової пошти"
            />
          </label>
          <label className="cartModal__form__label">
            <p className="cartModal__form__label__inputType">Доставка </p>
            <input
              className="cartModal__form__label__input"
              placeholder="Для швидкого підтвердження замовлення"
            />
          </label>

          <button className="defaultButton" type="submit">
            Перейти до оплати
          </button>
        </form>
      </section>
    </section>
  );
}
