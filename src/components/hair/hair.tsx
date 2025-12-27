import Image from "next/image";
import hydrapertide from "../../../public/hydrapeptide.jpg";

export default function Hair() {
  return (
    <section className="face">
      <div className="container">
        <h1>Догляд за волоссям</h1>
        <div className="face__cards">
          <div className="face__card">
            <section>
              <Image
                src={hydrapertide}
                className="face__card__image"
                alt=""
                height={500}
                width={400}
              />
              <h2>intensive Hydration</h2>
            </section>

            <section>
              <div className="face__card__price">900 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image
                src={hydrapertide}
                className="face__card__image"
                alt=""
                height={500}
                width={400}
              />
              <h2>intensive Hydration</h2>
            </section>

            <section>
              <div className="face__card__price">900 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image
                src={hydrapertide}
                className="face__card__image"
                alt=""
                height={500}
                width={400}
              />
              <h2>intensive Hydration</h2>
            </section>

            <section>
              <div className="face__card__price">900 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
