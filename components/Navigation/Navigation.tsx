"use client";
import React from "react";
import Link from "next/link";
import { LoginButtton } from "./Login";
import styles from "./Navigation.module.css";
import clsx from "clsx";

export const Navigation: React.FC = () => {
  return (
    <>
    <nav className={clsx(styles.nav)}>
      <ul>
        <li>
          <Link href="/"><b>osl</b> hub</Link>
        </li>
        <li>
          {/* <Link href="/about">About</Link> */}
        </li>
        <li>
          {/* <Link href="/contact">Contact</Link> */}
        </li>
      </ul>
      <LoginButtton />
    </nav>
    </>
  );
};
