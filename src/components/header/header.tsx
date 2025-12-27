import Image from "next/image";
import logo from "../../../public/logo.png";
import "./header.css";

export default function Header() {
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
          <button className="header__nav">Догляд за лицем</button>
          <button className="header__nav">Догляд за тілом</button>
          <button className="header__nav">Догляд за волоссям</button>
          <button className="header__nav">Декоративна косметика</button>
        </div>
      </div>
    </div>
  );
}
