"use client";

import Image from "next/image";
import "./footer.css";
import { FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa6";
import Link from "next/link";
import instagram from "../../../public/instagram.svg";
import telegram from "../../../public/telegram.svg";
import facebook from "../../../public/facebook.svg";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <footer className="footer">
        <div className="container">
          <div className="footer__left">
            <div className="logo">Gayatri</div>
            <div className="right-deserved footer__copyright">
              © All rights Reserved
            </div>
          </div>
          <div className="footer__right">
            <div className="socials">
              <Image src={instagram} alt="" className="socials__social" />
              <Image src={telegram} alt="" className="socials__social" />
              <Image src={facebook} alt="" className="socials__social" />
            </div>

            <a
              href="/copyright"
              className="public-offer-agreement footer__copyright"
            >
              Договір публічної оферти
            </a>
            <a href="/copyright" className="privacy-policy footer__copyright">
              Політика конфіденційності
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
