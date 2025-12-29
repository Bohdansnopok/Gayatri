"use client";
import "./counter.css";

export default function Counter({ value, onChange }) {
  return (
    <div className="cartModal__list__product__counter">
      <input
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="counter__input"
      />
    </div>
  );
}