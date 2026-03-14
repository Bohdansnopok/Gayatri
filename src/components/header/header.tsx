"use client";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import cartIcon from "../../../public/cart.svg"; // Перейменував для ясності
import "./header.css";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const { cart, openCart } = useCartStore();

  return (
    <div className="header">
      <div className="container">
        <Link href="/" className="header__logo__wrapper">
          <Image
            src={logo}
            alt="Logo"
            height={40}
            width={32}
            className="header__logo"
          />
        </Link>

        <button onClick={openCart} className="cartOpenButton">
          <Image src={cartIcon} alt="Кошик" height={24} width={24} />
          {cart.length > 0 && <span className="cartCount">{cart.length}</span>}
        </button>
      </div>
    </div>
  );
}
