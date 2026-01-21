import { Product } from "@/store/cartStore";
import "./cartDescriptionModal.css";

type ModalProps = {
  product: any;
  onClose: () => void;
};

export default function CartDescriptionModal({ product, onClose }: ModalProps) {
  return (
    <div>
      <div className="overlay" onClick={onClose}></div>
      <div
        className="CartDescriptionModal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="close-button">
          X
        </button>
        <div className="CartDescriptionModal__content__wrap">
          <img
            src={product.image}
            alt={product.name}
            className="CartDescriptionModal__content__image"
          />
          <div className="CartDescriptionModal__content__right">
            <h2>{product.name}</h2>
            <p>
              {" "}
              <h2>Ціна:</h2> {product.price} грн
            </p>
            <p>
              {" "}
              <h2>Опис:</h2> {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
