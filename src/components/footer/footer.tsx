import Image from "next/image";
import "./footer.css";
import {
  FaInstagram,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__left">
          <div className="footer__left__logo">Gayatri</div>

          <div className="footer__left__socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={60} className="footer__left__socials__social"/>
            </a>

            <a href="https://t.me" target="_blank" rel="noopener noreferrer">
              <FaTelegram size={60} className="footer__left__socials__social"/>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={60} className="footer__left__socials__social"/>
            </a>
          </div>
        </div>
        <div className="footer__right">
          <a href="https://t.me" className="footer__right__reqQuestion">
            ПОСТАВИТИ ПИТАННЯ
            <FaTelegram size={30} />
          </a>

          <div className="footer__right__navs">
            <a href="">
              <i className="footer__right__navs__nav">
                Договір публічної оферти
              </i>
            </a>
            <a href="">
              <i className="footer__right__navs__nav">
                Політика конфіденційності
              </i>
            </a>
          </div>

          <div className="footer__right__allrights">All rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
