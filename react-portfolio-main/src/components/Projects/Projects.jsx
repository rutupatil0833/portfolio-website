import React, { useRef, useState } from "react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.container} id="projects">
      <div className={styles.header}>
        <h2 className={styles.title}>Projects</h2>
        <span className={styles.count}>{projects.length} Projects</span>
      </div>

      <div className={styles.viewport}>
        <div
          className={`${styles.track} ${paused ? styles.paused : ""}`}
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Duplicate array for seamless infinite loop */}
          {[...projects, ...projects].map((project, id) => (
            <ProjectCard key={id} project={project} />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className={styles.dotsRow}>
        {projects.map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </div>
    </section>
  );
};