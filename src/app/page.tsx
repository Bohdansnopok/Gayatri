import Image from "next/image";
import styles from "./page.module.css";
import EssentialOils from "@/components/essentialOils/EssentialOils";
import Face from "@/components/face/Face";
import Skin from "@/components/skin/skin";
import Hair from "@/components/hair/hair";
import Footer from "@/components/footer/footer";
import CartModal from "@/components/cartModal/cartModal";
import faceCosmetic from "../../server/mock/faceCosmetic.json";
import skinCosmetic from "../../server/mock/skinCosmetic.json";
import hairCosmetic from "../../server/mock/hairCosmetic.json";
import decorationCosmetic from "../../server/mock/decoration.json";
import DecorativeCosmetic from "@/components/decorativeCosmetic/decorativeCosmetic";
import { Product } from "@/store/cartStore";

export default function Home() {
  return (
    <main>
      <EssentialOils />
      <Face/>
      <Skin/>
      <Hair/>
      <DecorativeCosmetic/>
    </main>
  );
}
