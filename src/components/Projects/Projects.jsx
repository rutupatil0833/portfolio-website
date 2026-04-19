
import React, { useRef, useState, useEffect } from "react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          entry.target.classList.add(styles.visible);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} id="projects" ref={sectionRef}>

      {/* background grid */}
      <div className={styles.grid} />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>What I've built</span>
          <h2 className={styles.title}>Projects</h2>
        </div>
        <span className={styles.count}>{projects.length} projects</span>
      </div>

      <div className={styles.viewport}>
        <div
          className={`${styles.track} ${paused ? styles.paused : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...projects, ...projects].map((project, id) => (
            <ProjectCard key={id} project={project} />
          ))}
        </div>
      </div>

        </section>
  );
};
