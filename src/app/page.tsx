import Image from "next/image";
import styles from "./page.module.css";
import EssentialOils from "@/components/essentialOils/EssentialOils";
import Face from "@/components/face/Face";
import Skin from "@/components/skin/skin";
import Hair from "@/components/hair/hair";
import Footer from "@/components/footer/footer";
import CartModal from "@/components/cartModal/cartModal";
import faceCosmetic from "../../public/mock/faceCosmetic.json";
import skinCosmetic from "../../public/mock/skinCosmetic.json";
import hairCosmetic from "../../public/mock/hairCosmetic.json";
import decorationCosmetic from "../../public/mock/decoration.json";
import DecorativeCosmetic from "@/components/decorativeCosmetic/decorativeCosmetic";

export default function Home() {
  const faceItems = faceCosmetic.filter((item) => item.category === "face");
  const skinItems = skinCosmetic.filter((item) => item.category === "skin");
  const hairItems = hairCosmetic.filter((item) => item.category === "hair");
  const decorationItems = decorationCosmetic.filter(
    (item) => item.category === "decoration"
  );

  return (
    <main>
      <EssentialOils />
      <Face products={faceItems} />
      <Skin products={skinItems} />
      <Hair products={hairItems} />
      <DecorativeCosmetic products={decorationItems}/>
      <Footer />
    </main>
  );
}
