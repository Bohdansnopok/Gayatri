"use client";

import Image from "next/image";
import "./ourProducts.css";
import dropIcon from "../../../public/drop.svg";
import magicIcon from "../../../public/magic.svg";
import heartIcon from "../../../public/heart.png";
import wavesIcon from "../../../public/waves.svg";
import paintsIcon from "../../../public/paints.svg";
import { useProductStore } from "@/store/productStore";

export default function OurProducts() {
  const setOpenSection = useProductStore((state) => state.setOpenSection);
  
  return (
    <section className="ourProducts">
      <div className="container">
        <h2>Наші продукти</h2>

        <div className="ourProducts__cards">
          <a
            href="#oils"
            className="ourProducts__cards__card "
            onClick={() => setOpenSection('oils')}
          >
            <div className="ourProducts__cards__card__icon">
              <Image src={dropIcon} alt="" />
            </div>
            <div>
              <h3>Ефірні олії</h3>
              <div className="ourProducts__cards__card__subtitle">
                Природна сила ароматів
              </div>
            </div>
          </a>
          <a
            href="#face"
            className="ourProducts__cards__card"
            onClick={() => setOpenSection('face')}
          >
            <div className="ourProducts__cards__card__icon">
              <Image src={magicIcon} alt="" />
            </div>
            <div>
              <h3>
                Догляд за <br /> обличчям
              </h3>
              <div className="ourProducts__cards__card__subtitle">
                Сяюча і здорова шкіра
              </div>
            </div>
          </a>
          <a
            href="#body"
            className="ourProducts__cards__card"
            onClick={() => setOpenSection('body')}
          >
            <div className="ourProducts__cards__card__icon">
              <Image src={heartIcon} alt="" />
            </div>
            <div>
              <h3>Догляд за тілом</h3>
              <div className="ourProducts__cards__card__subtitle">
                М'якість і ніжність
              </div>
            </div>
          </a>
          <a
            href="#hair"
            className="ourProducts__cards__card"
            onClick={() => setOpenSection('hair')}
          >
            <div className="ourProducts__cards__card__icon">
              <Image src={wavesIcon} alt="" />
            </div>
            <div>
              <h3>
                Догляд за <br /> волоссям
              </h3>
              <div className="ourProducts__cards__card__subtitle">
                Сила та блиск
              </div>
            </div>
          </a>
          <a
            href="#decor"
            className="ourProducts__cards__card"
            onClick={() => setOpenSection('decor')}
          >
            <div className="ourProducts__cards__card__icon">
              <Image src={paintsIcon} alt="" />
            </div>
            <div>
              <h3>
                Декоративна <br /> косметика
              </h3>
              <div className="ourProducts__cards__card__subtitle">
                Виразіть себе
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
