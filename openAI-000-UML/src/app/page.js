"use client";
import { text_generation } from "@/api/text_gen";
import styles from "@/css/page.module.css";
import InputPage from "./comps/Input";

export default function Home() {
  const text_gen_text = () => {
    text_generation("");
  };

  return (
    <main className={styles.main}>
      <InputPage />
    </main>
  );
}
