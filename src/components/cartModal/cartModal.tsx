"use client";

import Image from "next/image";
import Counter from "../counter/counter";
import "./cartModal.css";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useForm } from "react-hook-form";

export default function CartModal() {
  const {
    cart: cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity
  } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitted },
    setValue,
    watch,
  } = useForm({ mode: "onChange" });

  const paymentMethods = [
    { id: "prepaid", label: "Передплата" },
    { id: "cod", label: "Наложений платіж" },
  ];

  const [selected, setSelected] = useState(paymentMethods[0].id);
  const phoneValue = watch("number");

  const onSubmit = () => {
    alert(`Замовлення оформлене, очікуйте підтвердження`);
    closeCart();
  };

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
  }, [isCartOpen]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isCartOpen) return null;

  return (
    <section className="cartModal-overlay">
      <section className="cartModal">
        <button onClick={closeCart} className="cartModal__close">
          <FaTimes size={20} />
        </button>
        
        <div className="cartModal__title">Товари</div>
        <div className="cartModal__list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
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
                    <div className="cartModal__list__product__name">{item.name}</div>
                    <div className="cartModal__list__product__mililitres">{item.mililitres} мл</div>
                    <div className="cartModal__list__product__price">
                      {item.price * item.quantity} грн
                    </div>
                  </div>
                  <Counter
                    value={item.quantity}
                    onChange={(val) => updateQuantity(item.id, val)}
                  />
                  <button onClick={() => removeFromCart(item.id)} className="cartModal__list__product__delete">
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{textAlign: 'center', padding: '20px'}}>Кошик порожній</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="cartModal__summary">Загальна сума: {totalPrice} грн</div>
            <form onSubmit={handleSubmit(onSubmit)} className="cartModal__form">
              {/* ... ваші поля форми лишаються без змін ... */}
              <div className="cartModal__form__title">Телефон *</div>
              <input
                type="text"
                {...register("number", { required: true, pattern: /^\+380\d{9}$/ })}
                value={phoneValue || "+380"}
                onChange={(e) => {
                  const digits = e.target.value.slice(4).replace(/\D/g, "");
                  setValue("number", "+380" + digits, { shouldValidate: true });
                }}
                className="cartModal__form__input"
              />
              {/* Решта форми */}
              <button type="submit" disabled={!isValid || isSubmitted} className="defaultButton">
                Перейти до оплати
              </button>
            </form>
          </>
        )}
      </section>
    </section>
  );
}