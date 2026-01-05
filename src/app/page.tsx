import Image from "next/image";
import styles from "./page.module.css";
import EssentialOils from "@/components/essentialOils/EssentialOils";
import Face from "@/components/face/Face";
import Skin from "@/components/skin/skin";
import Hair from "@/components/hair/hair";
import DecorativeCosmetic from "@/components/decorativeCosmetic/decorativeCosmetic";
import { Product } from "@/store/cartStore";
import Oils from "@/components/oils/oils";

export default function Home() {
  return (
    <main>
      <EssentialOils />
      <Oils />
      <Face />
      <Skin />
      <Hair />
      <DecorativeCosmetic />
    </main>
  );
}
