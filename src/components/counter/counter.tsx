"use client";
import { useState } from "react";
import './counter.css'

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
    </div>
  );
}