"use client"

import Image from "next/image";
import logo from "../../../public/logo.png";
import "./header.css";
import Link from "next/link";

export default function Header() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); 
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { name: "Догляд за обличчям", id: "face" },
    { name: "Догляд за тілом", id: "skin" },
    { name: "Догляд за волоссям", id: "hair" },
    { name: "Декоративна косметика", id: "decorative" },
  ];

  return (
    <div className="header">
      <div className="container">
        <a href="/" className="header__logo__wrapper">
          <Image
            src={logo}
            alt=""
            height={140}
            width={140}
            className="header__logo"
          />
          <p>Ефірні олії Gayatri</p>
        </a>

        <div className="header__navs">
          {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleScroll(e, item.id)}
          className="header__nav"
        >
          {item.name}
        </a>
      ))}
        </div>
      </div>
    </div>
  );
}
