"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "./banner.css";

import slide1 from "../../../public/swiper-slide-2.jpg";
import slide2 from "../../../public/slide-3.jpeg";
import slide3 from "../../../public/swiper-slide1.jpg";

const slides = [
  { id: 1, src: slide1, alt: "Косметика 1" },
  { id: 2, src: slide2, alt: "Косметика 2" },
  { id: 3, src: slide3, alt: "Косметика 3" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="banner">
      <div className="container">
        <motion.div
          className="banner__text"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
          <a href="#collection" className="defaultButton">Переглянути колекцію</a>
        </motion.div>

        <motion.div
          className="slider"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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

          <div className="pagination">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`pagination__dot ${index === current ? "active" : ""}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
