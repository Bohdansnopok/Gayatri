import Link from "next/link";
import './EssentialOils.css'

export default function EssentialOils() {
  return (
    <section className="essentialOils">
      <div className="container">
        <div className="essentialOils__content">
          <h1>Що таке ефірні олії?</h1>
          <div className="essentialOils__left__subtitle">
            Ефірні олії — це концентровані сполуки, отримані з ароматичних <br />
            рослин, які зберігають їхній аромат, смак і природні корисні <br />
            властивості <br />
          </div>
          <Link className="defaultButton" href="">Докладніше</Link>
        </div>
      </div>
    </section>
  );
}
