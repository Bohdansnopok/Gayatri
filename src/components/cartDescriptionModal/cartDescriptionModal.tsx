import { Product } from "@/store/cartStore";
import "./cartDescriptionModal.css";
import { FaTimes } from "react-icons/fa";

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
            <div>
              {" "}
              <h2>Ціна:</h2> {product.price} грн
            </div>
            <div>
              {" "}
              <h2>мілілітри:</h2> {product.mililitres} Мл
            </div>
            <div>
              {" "}
              <h2>Опис:</h2> {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
