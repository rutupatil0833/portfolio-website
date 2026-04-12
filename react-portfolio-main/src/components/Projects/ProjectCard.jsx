import React from "react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source, active },
}) => {
  return (
    <div className={styles.card}>
      {active && (
        <div className={styles.activeBadge}>
          <span className={styles.activeDot} />
          Active
        </div>
      )}

      <div className={styles.imgWrap}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Screenshot of ${title}`}
          className={styles.image}
        />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        <a href={demo} className={styles.link} target="_blank" rel="noreferrer">
          Demo
        </a>
        <a href={source} className={styles.link} target="_blank" rel="noreferrer">
          Source
        </a>
      </div>
    </div>
  );
};