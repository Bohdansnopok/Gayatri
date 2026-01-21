import "./cartDescriptionModal.css";

type ModalProps = {
  product: Product;
  onClose: () => void;
};

export default function CartDescriptionModal({ product, onClose }: ModalProps) {
  return (
    <div className="overlay" onClick={onClose}>
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

        {/* Тут можна додати кнопку "Зберегти зміни" */}
      </div>
    </div>
  );
}
