"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./banner.css";

// Імпортуємо картинки (або використовуй шляхи рядками)
import slide1 from "../../../public/swiper-slide-2.jpg";
import slide2 from '../../../public/slide-3.jpeg';
import slide3 from "../../../public/swiper-slide1.jpg";


const slides = [
  { id: 1, src: slide1, alt: "Косметика 1" },
  { id: 2, src: slide2, alt: "Косметика 2" },
  { id: 3, src: slide3, alt: "Косметика 3" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  // Автоперемикання (опціонально)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="banner">
      <div className="container">
        <div className="banner__text">
          <h1 className="banner__title">
            <i>
              Краса — це не тренд. <br /> Це стан.
            </i>
          </h1>

          <h1 className="banner__title mobile">
            <i>
              Краса — це не <br /> тренд. Це стан.
            </i>
          </h1>
          <div className="banner__subtitle">
            <p>
              Ми створюємо косметику, яка підкреслює природність, а не <br />
              маскує її.{" "}
            </p>
            <p>Для шкіри, яка хоче виглядати живою — щодня.</p>
          </div>
          <button className="defaultButton">Переглянути колекцію</button>
        </div>

        <div className="slider">
          <div className="slider__wrapper">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slider__item ${index === current ? "active" : ""}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority
                  className="slider__image"
                />
              </div>
            ))}
          </div>

          {/* Пагінація тепер поза межами slider__wrapper */}
          <div className="pagination">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`pagination__dot ${index === current ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
