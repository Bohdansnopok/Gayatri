import Image from "next/image";
import styles from "./page.module.css";
import EssentialOils from "@/components/essentialOils/EssentialOils";
import Face from "@/components/face/Face";
import Skin from "@/components/skin/skin";
import Hair from "@/components/hair/hair";
import DecorativeCosmetic from "@/components/decorativeCosmetic/decorativeCosmetic";
import Footer from "@/components/footer/footer";
import CartModal from "@/components/cartModal/cartModal";

export default function Home() {
  return (
    <main>
      {/* <CartModal /> */}
      <EssentialOils />
      <Face />
      <Skin />
      <Hair />
      <DecorativeCosmetic />
      <Footer />
    </main>
  );
}
