import Image from "next/image";
import apricotHydrolate from "../../../public/apricotHydrolate.jpg";
import cucumberHydrolate from "../../../public/cucumberHydrolate.jpg";

export default function DecorativeCosmetic() {
  return (
    <section className="face">
      <div className="container">
        <h1>Декоративна косметика</h1>
        <div className="face__cards">
          <div className="face__card">
            <section>
              <Image
                src={apricotHydrolate}
                className="face__card__image"
                alt=""
                height={500}
                width={400}
              />
              <h2>apricot Hydrolate</h2>
            </section>

            <section>
              <div className="face__card__price">1900 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image
                src={cucumberHydrolate}
                className="face__card__image"
                alt=""
                height={500}
                width={400}
              />
              <h2>cucumber Hydrolate</h2>
            </section>

            <section>
              <div className="face__card__price">1100 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
