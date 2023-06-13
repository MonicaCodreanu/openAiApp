import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <button className={styles.homeBtn}>Home</button>
          </Link>
        </li>
        <li>
          <Link href="/pet">
            <button className={styles.petBtn}>Pet</button>
          </Link>
        </li>
        <li>
          <Link href="/travel">
            <button className={styles.travelBtn}>Travel</button>
          </Link>
        </li>
        <li>
          <Link href="/draw">
            <button className={styles.drawBtn}>Draw</button>
          </Link>
        </li>
        <li>
          <Link href="/fun">
            <button className={styles.funBtn}>Fun</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
