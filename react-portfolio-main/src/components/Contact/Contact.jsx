import React, { useEffect, useRef } from "react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className={styles.container} ref={sectionRef}>

      {/* animated grid lines bg */}
      <div className={styles.grid} />

      {/* glow orb */}
      <div className={styles.orb} />

      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={styles.eyebrow}>Get in touch</span>
          <h2 className={styles.heading}>Contact</h2>
          <p className={styles.sub}>Feel free to reach out!</p>
        </div>

        <ul className={styles.links}>
          
          <li className={styles.link}>
            <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn" />
            <a href="https://www.linkedin.com/in/rutuja-patil-81b358305/"
               target="_blank" rel="noreferrer">LinkedIn</a>
          </li>
          <li className={styles.link}>
            <img src={getImageUrl("contact/githubIcon.png")} alt="GitHub" />
            <a href="https://github.com/rutupatil0833"
               target="_blank" rel="noreferrer">GitHub</a>
          </li>
          <li className={styles.link}>
            <img src={getImageUrl("contact/emailIcon.png")} alt="Email" />
            <a href="mailto:rhpatil611@gmail.com">rhpatil611@gmail.com</a>
          </li>
        </ul>
      </div>

      <p className={styles.copy}>
        © {new Date().getFullYear()} Rutuja Patil. All rights reserved.
      </p>
    </footer>
  );
};