"use client";

import "./cartModal.css";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCartStore } from "@/store/cartStore";
import { useForm } from "react-hook-form";
import { HiOutlineTrash } from "react-icons/hi";
import Image from "next/image";
import arrowDown from "../../../public/arrow-down.svg";
import card from "../../../public/CreditCard.svg";
import handMoney from "../../../public/HandArrowDown.svg";

type CheckoutFormValues = {
  fullName: string;
  phone: string;
  email: string;
};

type CityOption = {
  ref: string;
  present: string;
  mainDescription: string;
  area: string;
};

type WarehouseOption = {
  ref: string;
  description: string;
};

const UKRAINIAN_OPERATOR_CODES = [
  "39",
  "50",
  "63",
  "66",
  "67",
  "68",
  "73",
  "75",
  "77",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
];

const ALLOWED_EMAIL_DOMAINS = [
  "gmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "ukr.net",
  "i.ua",
  "meta.ua",
  "proton.me",
  "protonmail.com",
];

const formatPhoneValue = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  let nationalNumber = digitsOnly;

  if (nationalNumber.startsWith("380")) {
    nationalNumber = nationalNumber.slice(3);
  } else if (nationalNumber.startsWith("0")) {
    nationalNumber = nationalNumber.slice(1);
  }

  nationalNumber = nationalNumber.slice(0, 9);

  let filteredNationalNumber = "";

  for (const digit of nationalNumber) {
    const nextValue = filteredNationalNumber + digit;

    if (
      nextValue.length <= 2 &&
      !UKRAINIAN_OPERATOR_CODES.some((code) => code.startsWith(nextValue))
    ) {
      break;
    }

    filteredNationalNumber = nextValue;
  }

  const operatorCode = filteredNationalNumber.slice(0, 2);
  const firstPart = filteredNationalNumber.slice(2, 5);
  const secondPart = filteredNationalNumber.slice(5, 7);
  const thirdPart = filteredNationalNumber.slice(7, 9);

  let formattedPhone = "+380";

  if (operatorCode) {
    formattedPhone += ` (${operatorCode}`;
    if (operatorCode.length === 2) {
      formattedPhone += ")";
    }
  }

  if (firstPart) {
    formattedPhone += ` ${firstPart}`;
  }

  if (secondPart) {
    formattedPhone += `-${secondPart}`;
  }

  if (thirdPart) {
    formattedPhone += `-${thirdPart}`;
  }

  return formattedPhone;
};

const isValidPhoneValue = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length !== 12 || !digitsOnly.startsWith("380")) {
    return false;
  }

  return UKRAINIAN_OPERATOR_CODES.includes(digitsOnly.slice(3, 5));
};

const formatCardNumberValue = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
  return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

const formatCardExpiryValue = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
  const rawMonth = digitsOnly.slice(0, 2);
  const year = digitsOnly.slice(2, 4);
  let month = rawMonth;

  if (rawMonth.length === 1 && Number(rawMonth) > 1) {
    month = `0${rawMonth}`;
  }

  if (rawMonth.length === 2) {
    const monthNumber = Number(rawMonth);

    if (monthNumber === 0) {
      month = "01";
    } else if (monthNumber > 12) {
      month = "12";
    }
  }

  if (digitsOnly.length <= 2) {
    return month;
  }

  return `${month}/${year}`;
};

const formatCardCvvValue = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 3);
};

const isValidCardNumberValue = (value: string) => {
  return value.replace(/\D/g, "").length === 16;
};

const isValidCardExpiryValue = (value: string) => {
  if (!/^\d{2}\/\d{2}$/.test(value)) {
    return false;
  }

  const [month] = value.split("/");
  const monthNumber = Number(month);

  return monthNumber >= 1 && monthNumber <= 12;
};

const isValidCardCvvValue = (value: string) => {
  return /^\d{3}$/.test(value);
};

const isValidEmailValue = (value: string) => {
  const normalizedValue = value.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
  const match = normalizedValue.match(emailPattern);

  if (!match) {
    return false;
  }

  return ALLOWED_EMAIL_DOMAINS.includes(match[1]);
};

export default function CartModal() {
  const {
    cart: cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCartStore();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutFormValues>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "+380",
      email: "",
    },
  });
  const fullNameField = register("fullName", {
    required: "Введіть імʼя та прізвище",
    validate: (value) =>
      value.trim().length >= 3 || "Введіть імʼя та прізвище",
  });
  const phoneField = register("phone", {
    required: "Введіть номер телефону",
    validate: (value) =>
      isValidPhoneValue(value) || "Введіть коректний номер телефону України",
  });
  const emailField = register("email", {
    required: "Введіть електронну пошту",
    validate: (value) =>
      isValidEmailValue(value) ||
      "Дозволені лише адреси з відомими доменами, наприклад gmail.com або icloud.com",
  });
  const [cityQuery, setCityQuery] = useState("");
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [cityError, setCityError] = useState("");
  const [isPayingByCard, setIsPayingByCard] = useState(true);
  const [phoneValue, setPhoneValue] = useState("+380");
  const [cardNumberValue, setCardNumberValue] = useState("");
  const [cardExpiryValue, setCardExpiryValue] = useState("");
  const [cardCvvValue, setCardCvvValue] = useState("");
  const trueCardPayment = () => {
    setIsPayingByCard(true);
  };
  const falseCardPayment = () => {
    setIsPayingByCard(false);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneValue(event.target.value);
    setPhoneValue(formattedPhone);
    setValue("phone", formattedPhone, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumberValue(formatCardNumberValue(event.target.value));
  };

  const handleCardExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardExpiryValue(formatCardExpiryValue(event.target.value));
  };

  const handleCardCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardCvvValue(formatCardCvvValue(event.target.value));
  };

  const [warehouseQuery, setWarehouseQuery] = useState("");
  const [warehouseOptions, setWarehouseOptions] = useState<WarehouseOption[]>(
    [],
  );
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<WarehouseOption | null>(null);
  const [isWarehouseLoading, setIsWarehouseLoading] = useState(false);
  const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);
  const [warehouseError, setWarehouseError] = useState("");

  const cardNumberError =
    isPayingByCard &&
    cardNumberValue.length > 0 &&
    !isValidCardNumberValue(cardNumberValue)
      ? "Номер картки має містити 16 цифр"
      : "";
  const cardExpiryError =
    isPayingByCard &&
    cardExpiryValue.length > 0 &&
    !isValidCardExpiryValue(cardExpiryValue)
      ? "Введіть дату у форматі MM/YY"
      : "";
  const cardCvvError =
    isPayingByCard &&
    cardCvvValue.length > 0 &&
    !isValidCardCvvValue(cardCvvValue)
      ? "CVV має містити 3 цифри"
      : "";
  const citySelectionError =
    cityQuery.trim().length > 0 && !selectedCity
      ? "Оберіть місто зі списку"
      : "";
  const warehouseSelectionError =
    selectedCity && warehouseQuery.trim().length > 0 && !selectedWarehouse
      ? "Оберіть відділення зі списку"
      : "";

  const isCardPaymentValid =
    !isPayingByCard ||
    (isValidCardNumberValue(cardNumberValue) &&
      isValidCardExpiryValue(cardExpiryValue) &&
      isValidCardCvvValue(cardCvvValue));

  const isDeliveryValid =
    cityQuery.trim().length > 0 &&
    warehouseQuery.trim().length > 0 &&
    Boolean(selectedCity) &&
    Boolean(selectedWarehouse);

  const isSubmitDisabled = !isValid || !isDeliveryValid || !isCardPaymentValid;

  const cityWrapperRef = useRef<HTMLDivElement | null>(null);
  const warehouseWrapperRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = (data: CheckoutFormValues) => {
    // Тут при відправці можна використовувати cartItems,
    // які вже містять актуальну кількість (quantity) для кожного товару
    console.log("Дані для відправки:", {
      ...data,
      city: selectedCity?.present ?? cityQuery,
      warehouse: selectedWarehouse?.description ?? warehouseQuery,
      cityRef: selectedCity?.ref,
      warehouseRef: selectedWarehouse?.ref,
      cartItems,
    });
    alert(`Замовлення оформлене, очікуйте підтвердження`);
    closeCart();
  };

  useEffect(() => {
    setValue("phone", "+380");
  }, [setValue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    }
  }, [isCartOpen]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!cityWrapperRef.current?.contains(target)) {
        setIsCityDropdownOpen(false);
      }

      if (!warehouseWrapperRef.current?.contains(target)) {
        setIsWarehouseDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (cityQuery.trim().length < 2) {
      setCityOptions([]);
      setCityError("");
      setIsCityLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        setIsCityLoading(true);
        setCityError("");

        const params = new URLSearchParams({
          type: "settlements",
          query: cityQuery.trim(),
        });

        const response = await fetch(`/api/nova-poshta?${params.toString()}`, {
          signal: controller.signal,
        });

        const payload = (await response.json()) as
          | { success: true; items: CityOption[] }
          | { success: false; error?: string };

        if (!response.ok || !payload.success) {
          throw new Error(
            (!payload.success && payload.error) || "Не вдалося знайти місто"
          );
        }

        setCityOptions(payload.items);
        setIsCityDropdownOpen(true);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setCityOptions([]);
        setCityError(
          error instanceof Error
            ? error.message
            : "Не вдалося завантажити список міст",
        );
        setIsCityDropdownOpen(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsCityLoading(false);
        }
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [cityQuery]);

  useEffect(() => {
    if (!selectedCity) {
      setWarehouseOptions([]);
      setWarehouseError("");
      setIsWarehouseLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        setIsWarehouseLoading(true);
        setWarehouseError("");

        const params = new URLSearchParams({
          type: "warehouses",
          cityRef: selectedCity.ref,
          query: warehouseQuery.trim(),
        });

        const response = await fetch(`/api/nova-poshta?${params.toString()}`, {
          signal: controller.signal,
        });

        const payload = (await response.json()) as
          | { success: true; items: WarehouseOption[] }
          | { success: false; error?: string };

        if (!response.ok || !payload.success) {
          throw new Error(
            (!payload.success && payload.error) || "Не вдалося знайти відділення"
          );
        }

        setWarehouseOptions(payload.items);
        setIsWarehouseDropdownOpen(true);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setWarehouseOptions([]);
        setWarehouseError(
          error instanceof Error
            ? error.message
            : "Не вдалося завантажити список відділень",
        );
        setIsWarehouseDropdownOpen(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsWarehouseLoading(false);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [selectedCity, warehouseQuery]);

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
                <div key={item.id} className="cartModal__products">
                <div className="cartModal__products__product">
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
                        -
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
                        +
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
                        -
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
                        +
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
              </div>
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

        <form className="cartModal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="cartModal__form__col">
            <h4>Персональна інформація</h4>

            <label className="cartModal__form__label">
              <p className="cartModal__form__label__inputType">
                Прізвище та ім’я *
              </p>
              <input
                className="cartModal__form__label__input"
                placeholder="Іван Петренко"
                {...fullNameField}
              />
              {errors.fullName?.message && (
                <p className="cartModal__form__helper error">
                  {errors.fullName.message}
                </p>
              )}
            </label>
            <label className="cartModal__form__label">
              <p className="cartModal__form__label__inputType">Телефон *</p>
              <input
                className="cartModal__form__label__input"
                placeholder="+380 (000) 000-00-00"
                inputMode="tel"
                autoComplete="tel"
                minLength={19}
                maxLength={19}
                value={phoneValue}
                {...phoneField}
                onChange={handlePhoneChange}
              />
              {errors.phone?.message && (
                <p className="cartModal__form__helper error">
                  {errors.phone.message}
                </p>
              )}
            </label>
            <label className="cartModal__form__label">
              <p className="cartModal__form__label__inputType">
                Електронна пошта *
              </p>
              <input
                className="cartModal__form__label__input"
                placeholder="Example@gmail.com"
                type="email"
                inputMode="email"
                autoComplete="email"
                {...emailField}
              />
              {errors.email?.message && (
                <p className="cartModal__form__helper error">
                  {errors.email.message}
                </p>
              )}
            </label>
          </div>

          <div className="cartModal__form__col">
            <h4>Данні для доставки</h4>

            <label className="cartModal__form__label">
              <div className="cartModal__form__label__inputType">
                Місто та відділення нової пошти *
              </div>

              <div className="cartModal__form__label__inputs">
                <div
                  className="cartModal__form__label__field city-input"
                  ref={cityWrapperRef}
                >
                  <input
                    className="cartModal__form__label__input"
                    placeholder="Місто"
                    autoComplete="off"
                    value={cityQuery}
                    onFocus={() => {
                      setIsCityDropdownOpen(true);
                    }}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setCityQuery(nextValue);
                      setIsCityDropdownOpen(true);
                      setSelectedCity(null);
                      setWarehouseQuery("");
                      setSelectedWarehouse(null);
                      setWarehouseOptions([]);
                      setWarehouseError("");
                    }}
                  />
                  {isCityDropdownOpen && (
                    <div className="cartModal__form__dropdown">
                      {isCityLoading && (
                        <div className="cartModal__form__dropdown__status">
                          Завантаження міст...
                        </div>
                      )}
                      {!isCityLoading && cityError && (
                        <div className="cartModal__form__dropdown__status error">
                          {cityError}
                        </div>
                      )}
                      {!isCityLoading &&
                        !cityError &&
                        cityQuery.trim().length < 2 && (
                          <div className="cartModal__form__dropdown__status">
                            Введіть хоча б 2 літери
                          </div>
                        )}
                      {!isCityLoading &&
                        !cityError &&
                        cityQuery.trim().length >= 2 &&
                        cityOptions.length === 0 && (
                          <div className="cartModal__form__dropdown__status">
                            Міст не знайдено
                          </div>
                        )}
                      {!isCityLoading &&
                        cityOptions.map((city) => (
                          <button
                            key={city.ref}
                            type="button"
                            className="cartModal__form__dropdown__option"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              setSelectedCity(city);
                              setCityQuery(city.present);
                              setCityOptions([]);
                              setIsCityDropdownOpen(false);
                              setWarehouseQuery("");
                              setSelectedWarehouse(null);
                              setWarehouseOptions([]);
                              setWarehouseError("");
                            }}
                          >
                            <span>{city.present}</span>
                            <span>{city.area}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                <div
                  className="cartModal__form__label__field post-input"
                  ref={warehouseWrapperRef}
                >
                  <input
                    className="cartModal__form__label__input"
                    placeholder="Відділення Нової пошти"
                    autoComplete="off"
                    disabled={!selectedCity}
                    value={warehouseQuery}
                    onFocus={() => {
                      setIsWarehouseDropdownOpen(true);
                    }}
                    onChange={(event) => {
                      setWarehouseQuery(event.target.value);
                      setIsWarehouseDropdownOpen(true);
                      setSelectedWarehouse(null);
                    }}
                  />
                  <Image
                    src={arrowDown}
                    alt=""
                    className="cartModal__form__label__input__arrow"
                  />
                  {isWarehouseDropdownOpen && (
                    <div className="cartModal__form__dropdown">
                      {!selectedCity && (
                        <div className="cartModal__form__dropdown__status">
                          Спочатку виберіть місто
                        </div>
                      )}
                      {selectedCity && isWarehouseLoading && (
                        <div className="cartModal__form__dropdown__status">
                          Завантаження відділень...
                        </div>
                      )}
                      {selectedCity &&
                        !isWarehouseLoading &&
                        warehouseError && (
                          <div className="cartModal__form__dropdown__status error">
                            {warehouseError}
                          </div>
                        )}
                      {selectedCity &&
                        !isWarehouseLoading &&
                        !warehouseError &&
                        warehouseOptions.length === 0 && (
                          <div className="cartModal__form__dropdown__status">
                            Відділень не знайдено
                          </div>
                        )}
                      {selectedCity &&
                        !isWarehouseLoading &&
                        warehouseOptions.map((warehouse) => (
                          <button
                            key={warehouse.ref}
                            type="button"
                            className="cartModal__form__dropdown__option"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              setSelectedWarehouse(warehouse);
                              setWarehouseQuery(warehouse.description);
                              setIsWarehouseDropdownOpen(false);
                            }}
                          >
                            <span>{warehouse.description}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {(cityError ||
                warehouseError ||
                citySelectionError ||
                warehouseSelectionError) && (
                <p className="cartModal__form__helper error">
                  {cityError ||
                    warehouseError ||
                    citySelectionError ||
                    warehouseSelectionError}
                </p>
              )}

              {!cityError && !warehouseError && !selectedCity && (
                <p className="cartModal__form__helper">
                  Введіть назву міста і виберіть його зі списку.
                </p>
              )}
            </label>

            <label className="cartModal__form__label">
              <h4>Спосіб оплати</h4>

              <div className="cartModal__form__label__payButtons">
                <button
                  type="button"
                  onClick={trueCardPayment}
                  className={`cartModal__form__label__payButton ${isPayingByCard ? "active" : ""}`}
                >
                  <Image src={card} alt="" className="payButton__decor-icon" />
                  Картою зараз
                </button>

                <button
                  type="button"
                  onClick={falseCardPayment}
                  className={`cartModal__form__label__payButton ${!isPayingByCard ? "active" : ""}`}
                >
                  <Image
                    src={handMoney}
                    alt=""
                    className="payButton__decor-icon"
                  />
                  При отриманні
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isPayingByCard ? (
                  <motion.div
                    className="cartModal__form__label__payButton__card-content"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <label className="cartModal__form__label">
                      <p className="cartModal__form__label__inputType">
                        Номер картки
                      </p>
                      <input
                        className="cartModal__form__label__input"
                        placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        minLength={19}
                        maxLength={19}
                        required={isPayingByCard}
                        value={cardNumberValue}
                        onChange={handleCardNumberChange}
                      />
                      {cardNumberError && (
                        <p className="cartModal__form__helper error">
                          {cardNumberError}
                        </p>
                      )}
                    </label>

                    <div className="cartModal__form__label__payButton__card-content__flex-inputs">
                      <label className="cartModal__form__label">
                        <p className="cartModal__form__label__inputType">
                          MM/YY
                        </p>
                        <input
                          className="cartModal__form__label__input"
                          placeholder="00/00"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          minLength={5}
                          maxLength={5}
                          required={isPayingByCard}
                          value={cardExpiryValue}
                          onChange={handleCardExpiryChange}
                        />
                        {cardExpiryError && (
                          <p className="cartModal__form__helper error">
                            {cardExpiryError}
                          </p>
                        )}
                      </label>

                      <label className="cartModal__form__label">
                        <p className="cartModal__form__label__inputType">CVV</p>
                        <input
                          className="cartModal__form__label__input"
                          placeholder="123"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          minLength={3}
                          maxLength={3}
                          required={isPayingByCard}
                          value={cardCvvValue}
                          onChange={handleCardCvvChange}
                        />
                        {cardCvvError && (
                          <p className="cartModal__form__helper error">
                            {cardCvvError}
                          </p>
                        )}
                      </label>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </label>

            <button
              className="defaultButton"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Перейти до оплати
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
