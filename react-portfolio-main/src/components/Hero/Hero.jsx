import React, { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const section = canvas.parentElement; // ← listen on whole section


    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const shapes = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: 0,
      baseY: 0,
      size: Math.random() * 60 + 20,
      depth: Math.random() * 0.06 + 0.01,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.003,
      alpha: Math.random() * 0.12 + 0.04,
      type: ["ring", "square", "cross", "dot"][i % 4],
    }));
    shapes.forEach(s => {
      s.baseX = s.x;
      s.baseY = s.y;
    });

    let mx = canvas.width / 2;
    let my = canvas.height / 2;

    const onMove = e => {                      // ← now on section

      const r = section.getBoundingClientRect();

      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    section.addEventListener("mousemove", onMove); // ← changed


    const drawShape = (ctx, s) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const tx = s.baseX + (mx - cx) * s.depth;
      const ty = s.baseY + (my - cy) * s.depth;
      s.rot += s.rotSpeed;
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(s.rot);
      ctx.globalAlpha = s.alpha;
      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.fillStyle   = "rgba(255,255,255,1)";
      ctx.lineWidth = 1;
      const h = s.size / 2;
      if (s.type === "ring") {
        ctx.beginPath();
        ctx.arc(0, 0, h, 0, Math.PI * 2);
        ctx.stroke();
      } else if (s.type === "square") {
        ctx.strokeRect(-h, -h, s.size, s.size);
      } else if (s.type === "cross") {
        ctx.beginPath();
        ctx.moveTo(-h, 0); ctx.lineTo(h, 0);
        ctx.moveTo(0, -h); ctx.lineTo(0, h);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(s => drawShape(ctx, s));
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove); // ← changed

      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.particles}
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Rutuja Patil</h1>
        <p className={styles.description}>
          Creative Frontend Developer and UI/UX Designer skilled in
          React.js, JavaScript, and modern UI design. Experienced in
          building responsive, user-focused applications like TimeLazy
          and other real-world projects. Focused on clean design,
          performance, and scalable solutions.
        </p>
       
<a href="#contact" className={styles.contactBtn}>

  Contact Me
</a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
