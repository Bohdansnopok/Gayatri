"use client";
import { useForm } from "react-hook-form";
import "./counter.css";

export default function Counter({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const {
    register,
    formState: { errors },
  } = useForm({ disabled: false });

  return (
    <div className="cartModal__list__product__counter">
      <input
        type="number"
        min={1}
        max={100}
        {...register("productsCounter")}
        disabled
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="counter__input"
      />
    </div>
  );
}
