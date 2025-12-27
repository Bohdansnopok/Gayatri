"use client";
import { useState } from "react";

export default function Counter({ initialValue = 1 }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="cartModal__list__product__counter">
      <input 
        type="number" 
        value={count} 
        onChange={(e) => setCount(Number(e.target.value))}
        className="counter__input"
      />
      <div className="counter__controls">
        <button onClick={() => setCount(count + 1)} className="counter__btn">▲</button>
        <button onClick={() => setCount(count > 1 ? count - 1 : 1)} className="counter__btn">▼</button>
      </div>
    </div>
  );
}