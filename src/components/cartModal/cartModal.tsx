"use client";

import Image from "next/image";
import cleansignGel from "../../../public/cleansingGel.jpg";
import Counter from "../counter/counter";
import "./cartModal.css";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useForm } from "react-hook-form";

export interface Product {
  id: string;
  name: string;
  mililitres: number;
  category: string;
  price: number;
  image?: string;
}

export default function CartModal() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    setValue,
    watch,
  } = useForm({ mode: "onChange" });

  const paymentMethods = [
    { id: "prepaid", label: "Передплата" },
    { id: "cod", label: "Наложений платіж" },
  ];

  const [selected, setSelected] = useState(paymentMethods[0].id);

  const onSubmit = () => {
    alert(`Замовлення оформлене очікуйте підтвердження`);
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [phone, setPhone] = useState("+380");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.slice(4).replace(/\D/g, "");
    setPhone("+380" + digits);
  };

  const phoneValue = watch("number");

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
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                      <div className="cartModal__list__product__info">
                        <div className="cartModal__list__product__name">
                          {item.name}
                        </div>
                        <div className="cartModal__list__product__mililitres">
                          {item.mililitres}
                        </div>
                        <div className="cartModal__list__product__price__mobileWrapper">
                          <Counter
                            value={item.quantity}
                            onChange={(value: number) =>
                              updateQuantity(item.id, value)
                            }
                          />

                          <div className="cartModal__list__product__price">
                            {item.price * item.quantity} грн
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
                        <Counter
                          value={item.quantity}
                          onChange={(value: number) =>
                            updateQuantity(item.id, value)
                          }
                        />

                        <div className="cartModal__list__product__price">
                          {item.price * item.quantity} грн
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
            <div className="cartModal__summary">
              Загальна сума: {totalPrice} грн
            </div>
            <div className="cartModal__title">Зробити замовлення</div>

            <form onSubmit={handleSubmit(onSubmit)} className="cartModal__form">
              <div className="cartModal__form__title">Прізвище та ім'я *</div>
              <input
                type="text"
                {...register("name", { required: "Обовʼязкове поле" })}
                className="cartModal__form__input"
              />
              <div className="cartModal__form__title">Телефон *</div>
              <input
                type="text"
                {...register("number", {
                  required: "Обовʼязкове поле",
                  pattern: {
                    value: /^\+380\d{9}$/,
                    message:
                      "Некоректний номер телефону. Формат: +380XXXXXXXXX",
                  },
                })}
                maxLength={12}
                placeholder="+38 (000) 000-00-00"
                value={phoneValue || "+380"}
                onChange={(e) => {
                  const digits = e.target.value.slice(4).replace(/\D/g, "");
                  const newPhone = "+380" + digits;
                  setValue("number", newPhone, { shouldValidate: true }); // синхронізуємо з RHF
                }}
                className="cartModal__form__input"
              />

              <div className="cartModal__form__title">Електронна пошта *</div>
              <input
                type="text"
                {...register("email")}
                className="cartModal__form__input"
              />
              <div className="cartModal__form__title">Доставка *</div>
              <input
                type="text"
                {...register("delivery")}
                placeholder="
місто, відділенні Нової пошти
"
                className="cartModal__form__input"
              />
              <div className="cartModal__form__title">Нік в телеграм *</div>
              <input
                type="text"
                {...register("telegramName")}
                placeholder="Для швидшого піддвердження замовлення
"
                className="cartModal__form__input"
              />
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
                  disabled={!isValid || isSubmitted}
                  className="defaultButton cartModal__payment__button"
                >
                  Перейти до оплати
                </button>
              </div>
            </form>
          </section>
        </section>
      )}
    </div>
  );
}
