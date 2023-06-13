import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <h1>Have fun with OpenAi ChatGPT</h1>
      </main>
      <Navbar />
    </div>
  );
}
