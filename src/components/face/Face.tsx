import Image from "next/image";
import cleashingGel from "../../../public/cleansingGel.jpg";

export default function Face() {
  return (
    <section className="face">
      <div className="container">
        <h1>Догляд за обличчям</h1>
        <div className="face__cards">
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
          <div className="face__card">
            <section>
              <Image src={cleashingGel} className="face__card__image" alt="" height={500} width={400} />
              <h2>Cleansing Gel</h2>
            </section>

            <section>
              <div className="face__card__price">2500 грн</div>

              <div className="face__card__button defaultButton">Купити</div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
