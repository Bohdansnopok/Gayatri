import Image from "next/image";
import "./ourProducts.css";
import dropIcon from "../../../public/drop.svg";
import magicIcon from "../../../public/magic.svg";
import heartIcon from "../../../public/heart.svg";
import wavesIcon from "../../../public/waves.svg";
import paintsIcon from "../../../public/paints.svg";

export default function OurProducts() {
  return (
    <section className="ourProducts">
      <div className="container">
        <h2>Наші продукти</h2>

        <div className="ourProducts__cards">
          <a href="#" className="ourProducts__cards__card">
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
          <a href="#" className="ourProducts__cards__card">
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
          <a href="#" className="ourProducts__cards__card">
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
          <a  href="#" className="ourProducts__cards__card">
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
          <a  href="#" className="ourProducts__cards__card">
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
        </div>
      </div>
    </section>
  );
}
