import { useEffect, useRef } from "react";
import { fieldBus } from "./fieldBus";

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  hue: number;
  life: number;
};

const BACKGROUND_SPEED = 0.5;

const field = (x: number, y: number, t: number) => {
  const s1 = Math.sin(y * 0.011 + t * 0.00042);
  const s2 = Math.cos(x * 0.009 - t * 0.00036);
  const s3 = Math.sin((x + y) * 0.006 + t * 0.00024);
  return {
    x: s1 + s3 * 0.55,
    y: s2 - s3 * 0.45
  };
};

export function FluidField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.45,
      active: false,
      lastMove: 0
    };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastFrame = 0;
    // Eased 0..1 restlessness around the hovered project card, plus the last box it covered.
    let agitation = 0;
    let halo: { x0: number; y0: number; x1: number; y1: number; hue: number } | null = null;
    const HALO_PAD = 110;

    const resetParticle = (particle: Particle, scatter = true) => {
      particle.x = scatter ? Math.random() * width : pointer.x;
      particle.y = scatter ? Math.random() * height : pointer.y;
      particle.px = particle.x;
      particle.py = particle.y;
      particle.vx = 0;
      particle.vy = 0;
      particle.hue = 164 + Math.random() * 50;
      particle.life = Math.random() * 120;
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const targetCount = reducedMotion
        ? 80
        : Math.min(760, Math.max(260, Math.floor((width * height) / 2700)));

      particles = Array.from({ length: targetCount }, () => {
        const particle: Particle = { x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0, hue: 0, life: 0 };
        resetParticle(particle);
        return particle;
      });

      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, width, height);
      if (reducedMotion) drawStaticField();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.lastMove = performance.now();
    };

    const drawStaticField = () => {
      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(16, 20, 19, 1)";
      context.fillRect(0, 0, width, height);
      context.lineWidth = 1;
      for (let y = 70; y < height; y += 38) {
        for (let x = 36; x < width; x += 42) {
          const vector = field(x, y, 1000);
          context.strokeStyle = "rgba(112, 225, 209, 0.11)";
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + vector.x * 15, y + vector.y * 15);
          context.stroke();
        }
      }
    };

    const draw = (time: number) => {
      if (document.hidden) return;
      // Cap drawing near 60 fps so high-refresh displays keep the original speed.
      if (time - lastFrame < 15) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      if (reducedMotion) {
        drawStaticField();
        return;
      }

      context.globalCompositeOperation = "source-over";
      context.fillStyle = "rgba(16, 20, 19, 0.09)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      context.lineWidth = 1.18;

      const pointerFresh = pointer.active && time - pointer.lastMove < 900;

      const hovered = fieldBus.agitation;
      if (hovered) {
        const rect = hovered.el.getBoundingClientRect();
        halo = {
          x0: rect.left - HALO_PAD,
          y0: rect.top - HALO_PAD,
          x1: rect.right + HALO_PAD,
          y1: rect.bottom + HALO_PAD,
          hue: hovered.hue
        };
        agitation += (1 - agitation) * 0.12;
        // Throw sparks off the card's edge so the buzz is visible around its border.
        const sparks = Math.round(7 * agitation);
        for (let i = 0; i < sparks; i++) {
          const spark = particles[(Math.random() * particles.length) | 0];
          const along = Math.random() * 2 * (rect.width + rect.height);
          let sx = rect.left;
          let sy = rect.top;
          if (along < rect.width) sx += along;
          else if (along < rect.width + rect.height) { sx = rect.right; sy += along - rect.width; }
          else if (along < 2 * rect.width + rect.height) { sx = rect.right - (along - rect.width - rect.height); sy = rect.bottom; }
          else sy = rect.bottom - (along - 2 * rect.width - rect.height);
          spark.x = spark.px = sx;
          spark.y = spark.py = sy;
          spark.vx = (Math.random() - 0.5) * 3;
          spark.vy = (Math.random() - 0.5) * 3;
          spark.life = 380;
        }
      } else {
        agitation *= 0.9;
        if (agitation < 0.02) {
          agitation = 0;
          halo = null;
        }
      }

      if (pointerFresh) {
        const glowRadius = 52.5;
        const glow = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          glowRadius
        );
        glow.addColorStop(0, "rgba(112, 225, 209, 0.12)");
        glow.addColorStop(0.36, "rgba(242, 184, 102, 0.055)");
        glow.addColorStop(1, "rgba(112, 225, 209, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pointer.x, pointer.y, glowRadius, 0, Math.PI * 2);
        context.fill();
      }

      for (const particle of particles) {
        particle.px = particle.x;
        particle.py = particle.y;

        const vector = field(particle.x, particle.y, time * BACKGROUND_SPEED);
        particle.vx += vector.x * 0.045 * BACKGROUND_SPEED;
        particle.vy += vector.y * 0.045 * BACKGROUND_SPEED;

        if (pointerFresh) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < 62000 && distanceSq > 8) {
            const force = (1 - distanceSq / 62000) * 0.5;
            const invDistance = 1 / Math.sqrt(distanceSq);
            // Circulation with a slight inward pull, so the pointer stirs the haze and never empties it.
            particle.vx += (-dy * invDistance - dx * invDistance * 0.08) * force;
            particle.vy += (dx * invDistance - dy * invDistance * 0.08) * force;
            particle.hue = 47 + Math.random() * 26;
          }
        }

        let excited = false;
        if (halo && agitation > 0 && particle.x > halo.x0 && particle.x < halo.x1 && particle.y > halo.y0 && particle.y < halo.y1) {
          // Vibrate: random kicks each frame, tinted with the project's accent.
          particle.vx += (Math.random() - 0.5) * 2.2 * agitation;
          particle.vy += (Math.random() - 0.5) * 2.2 * agitation;
          particle.hue = halo.hue + Math.random() * 24;
          excited = true;
        }

        particle.vx *= excited ? 0.9 : 0.965;
        particle.vy *= excited ? 0.9 : 0.965;
        particle.x += (particle.vx + vector.x * 0.62) * BACKGROUND_SPEED;
        particle.y += (particle.vy + vector.y * 0.62) * BACKGROUND_SPEED;
        particle.life += BACKGROUND_SPEED;

        if (
          particle.x < -30 ||
          particle.x > width + 30 ||
          particle.y < -30 ||
          particle.y > height + 30 ||
          particle.life > 520
        ) {
          resetParticle(particle);
          continue;
        }

        const alpha = excited
          ? Math.min(0.85, 0.24 + Math.hypot(particle.vx, particle.vy) * 0.2)
          : Math.min(0.52, 0.09 + Math.hypot(particle.vx, particle.vy) * 0.14);
        context.strokeStyle = `hsla(${particle.hue}, 92%, 68%, ${alpha})`;
        context.beginPath();
        context.moveTo(particle.px, particle.py);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const syncAnimation = () => {
      cancelAnimationFrame(animationFrame);
      reducedMotion = motionPreference.matches;
      lastFrame = 0;
      pointer.active = false;
      agitation = 0;
      halo = null;
      if (document.hidden) return;
      if (reducedMotion) drawStaticField();
      else animationFrame = requestAnimationFrame(draw);
    };

    resize();
    motionPreference.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      motionPreference.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fluid-field" aria-hidden="true" />;
}
