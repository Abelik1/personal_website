import { useEffect, useRef } from "react";

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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      height = Math.max(window.innerHeight, 720);
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

      context.clearRect(0, 0, width, height);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.lastMove = performance.now();
    };

    const drawStaticField = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(6, 9, 11, 1)";
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
      if (reducedMotion) {
        drawStaticField();
        return;
      }

      context.globalCompositeOperation = "source-over";
      context.fillStyle = "rgba(6, 9, 11, 0.12)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      context.lineWidth = 1.05;

      const pointerFresh = pointer.active && time - pointer.lastMove < 900;

      for (const particle of particles) {
        particle.px = particle.x;
        particle.py = particle.y;

        const vector = field(particle.x, particle.y, time);
        particle.vx += vector.x * 0.045;
        particle.vy += vector.y * 0.045;

        if (pointerFresh) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < 34000 && distanceSq > 8) {
            const force = (1 - distanceSq / 34000) * 0.32;
            const invDistance = 1 / Math.sqrt(distanceSq);
            particle.vx += (-dy * invDistance + dx * invDistance * 0.12) * force;
            particle.vy += (dx * invDistance + dy * invDistance * 0.12) * force;
            particle.hue = 47 + Math.random() * 26;
          }
        }

        particle.vx *= 0.965;
        particle.vy *= 0.965;
        particle.x += particle.vx + vector.x * 0.62;
        particle.y += particle.vy + vector.y * 0.62;
        particle.life += 1;

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

        const alpha = Math.min(0.32, 0.05 + Math.hypot(particle.vx, particle.vy) * 0.09);
        context.strokeStyle = `hsla(${particle.hue}, 88%, 65%, ${alpha})`;
        context.beginPath();
        context.moveTo(particle.px, particle.py);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fluid-field" aria-hidden="true" />;
}
