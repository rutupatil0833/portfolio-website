"use client";

import { useEffect } from "react";
import styles from "./Cursor.module.css";
import cursorImg from "../../../assets/Cursor/cursor.png";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.createElement("div");

    cursor.className = styles.cursor;
    cursor.style.backgroundImage = `url(${cursorImg})`;

    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const updateMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", updateMouse);

    const animate = () => {
      posX += (mouseX - posX) * 0.2;
      posY += (mouseY - posY) * 0.2;

      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", updateMouse);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default Cursor;