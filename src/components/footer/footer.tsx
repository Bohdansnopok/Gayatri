import Image from "next/image";
import "./footer.css";
import { FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa6";
import Link from "next/link";

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
              <FaInstagram
                size={30}
                className="footer__left__socials__social"
              />
            </a>

            <a href="https://t.me" target="_blank" rel="noopener noreferrer">
              <FaTelegram size={30} className="footer__left__socials__social" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={30} className="footer__left__socials__social" />
            </a>
          </div>
        </div>
        <div className="footer__right">
          <a href="https://t.me" className="footer__right__reqQuestion">
            ПОСТАВИТИ ПИТАННЯ
            <FaTelegram size={30} />
          </a>

          <div className="footer__right__navs">
            <Link href="">
              <i className="footer__right__navs__nav">
                <a href="/copyright">Договір публічної оферти</a>
              </i>
            </Link>
            <Link href="">
              <i className="footer__right__navs__nav">
                <a href="/privacyPolice">Політика конфіденційності</a>
              </i>
            </Link>
          </div>

          <div className="footer__right__allrights">All rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
