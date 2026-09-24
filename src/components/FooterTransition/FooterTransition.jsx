import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/FooterTransition/footer-transition.css";

gsap.registerPlugin(ScrollTrigger);

const SIGNAL_COUNT = 180;
const RING_COUNT = 7;
const WAVE_COUNT = 9;
const PARTICLE_COUNT = 120;
const RAY_COUNT = 42;

const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const lerp = (a, b, t) =>
  a + (b - a) * t;

const easeInOut = (t) =>
  t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

const random = (min, max) =>
  Math.random() * (max - min) + min;

const createSignal = (
  width,
  height,
  index
) => {
  const angle =
    (index / SIGNAL_COUNT) *
      Math.PI *
      2 +
    random(-0.025, 0.025);

  const radius =
    random(
      Math.min(width, height) * 0.18,
      Math.max(width, height) * 0.78
    );

  return {
    angle,
    radius,
    baseRadius: radius,
    size: random(0.45, 1.8),
    alpha: random(0.12, 0.58),
    speed: random(0.15, 0.65),
    phase: random(
      0,
      Math.PI * 2
    ),
    depth: random(
      0.2,
      1
    ),
    drift: random(
      -1,
      1
    ),
  };
};

const createRing = (
  width,
  height,
  index
) => ({
  radius:
    Math.min(width, height) *
    (
      0.07 +
      index * 0.045
    ),

  width: random(
    0.5,
    1.2
  ),

  alpha: random(
    0.07,
    0.22
  ),

  phase: random(
    0,
    Math.PI * 2
  ),
});

const createWave = (
  width,
  height,
  index
) => ({
  radius:
    Math.min(width, height) *
    (
      0.12 +
      index * 0.055
    ),

  thickness: random(
    0.5,
    1.4
  ),

  alpha: random(
    0.04,
    0.14
  ),

  phase:
    index *
      0.8 +
    random(
      0,
      0.5
    ),
});

const createParticle = (
  width,
  height
) => ({
  x: random(
    -width * 0.1,
    width * 1.1
  ),

  y: random(
    -height * 0.1,
    height * 1.1
  ),

  size: random(
    0.4,
    1.7
  ),

  alpha: random(
    0.06,
    0.34
  ),

  speed: random(
    0.08,
    0.45
  ),

  phase: random(
    0,
    Math.PI * 2
  ),

  depth: random(
    0.15,
    1
  ),
});

const createRay = (
  index
) => ({
  angle:
    (
      index /
      RAY_COUNT
    ) *
      Math.PI *
      2 +
    random(
      -0.035,
      0.035
    ),

  length: random(
    0.15,
    0.7
  ),

  alpha: random(
    0.04,
    0.15
  ),

  width: random(
    0.4,
    1
  ),

  phase: random(
    0,
    Math.PI * 2
  ),
});

function FooterTransition() {
  const sectionRef =
    useRef(null);

  const canvasRef =
    useRef(null);

  const sceneRef =
    useRef(null);

  const coreRef =
    useRef(null);

  const signalRef =
    useRef(null);

  const statusRef =
    useRef(null);

  const flashRef =
    useRef(null);

  const cursorRef =
    useRef({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    });

  useEffect(() => {
    const section =
      sectionRef.current;

    const canvas =
      canvasRef.current;

    const scene =
      sceneRef.current;

    if (
      !section ||
      !canvas ||
      !scene
    ) {
      return undefined;
    }

    const context =
      canvas.getContext(
        "2d"
      );

    if (!context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;

    let animationFrame = 0;

    let destroyed = false;

    const signals = [];
    const rings = [];
    const waves = [];
    const particles = [];
    const rays = [];

    const state = {
      progress: 0,
      entrance: 0,
      signal: 0,
      connection: 0,
      synchronization: 0,
      pulse: 0,
      expansion: 0,
      dissipation: 0,
      exit: 0,
      distortion: 0,
      flash: 0,
    };

    const resize = () => {
      width =
        window.innerWidth;

      height =
        window.innerHeight;

      dpr =
        Math.min(
          window.devicePixelRatio ||
            1,
          2
        );

      canvas.width =
        width * dpr;

      canvas.height =
        height * dpr;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      context.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      signals.length = 0;
      rings.length = 0;
      waves.length = 0;
      particles.length = 0;
      rays.length = 0;

      for (
        let index = 0;
        index < SIGNAL_COUNT;
        index += 1
      ) {
        signals.push(
          createSignal(
            width,
            height,
            index
          )
        );
      }

      for (
        let index = 0;
        index < RING_COUNT;
        index += 1
      ) {
        rings.push(
          createRing(
            width,
            height,
            index
          )
        );
      }

      for (
        let index = 0;
        index < WAVE_COUNT;
        index += 1
      ) {
        waves.push(
          createWave(
            width,
            height,
            index
          )
        );
      }

      for (
        let index = 0;
        index < PARTICLE_COUNT;
        index += 1
      ) {
        particles.push(
          createParticle(
            width,
            height
          )
        );
      }

      for (
        let index = 0;
        index < RAY_COUNT;
        index += 1
      ) {
        rays.push(
          createRay(
            index
          )
        );
      }
    };

    const drawBackground = (
      time
    ) => {
      const mouse =
        cursorRef.current;

      const centerX =
        width / 2 +
        mouse.x * 28;

      const centerY =
        height / 2 +
        mouse.y * 22;

      const radius =
        Math.max(
          width,
          height
        ) * 0.9;

      const pulse =
        Math.sin(
          time * 0.00045
        ) * 0.012;

      const gradient =
        context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );

      gradient.addColorStop(
        0,
        `rgba(105,145,175,${
          0.12 +
          pulse +
          state.pulse * 0.055
        })`
      );

      gradient.addColorStop(
        0.28,
        "rgba(72,105,132,0.055)"
      );

      gradient.addColorStop(
        0.62,
        "rgba(30,45,58,0.025)"
      );

      gradient.addColorStop(
        1,
        "rgba(5,8,11,0)"
      );

      context.fillStyle =
        gradient;

      context.fillRect(
        0,
        0,
        width,
        height
      );

      context.save();

      context.globalAlpha =
        0.035 *
        state.connection;

      context.strokeStyle =
        "#9bb8ca";

      context.lineWidth = 1;

      const spacing = 92;

      const offset =
        state.signal *
        width *
        0.08;

      for (
        let x =
          -height +
          offset;
        x <
        width + height;
        x += spacing
      ) {
        context.beginPath();

        context.moveTo(
          x,
          0
        );

        context.lineTo(
          x +
            height *
              0.55,
          height
        );

        context.stroke();
      }

      context.restore();
    };

    const drawParticles = (
      time
    ) => {
      if (
        state.entrance <= 0
      ) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      particles.forEach(
        (
          particle,
          index
        ) => {
          const movement =
            Math.sin(
              time *
                0.0003 *
                particle.speed +
                particle.phase
            );

          const movementY =
            Math.cos(
              time *
                0.00023 *
                particle.speed +
                particle.phase
            );

          let x =
            particle.x +
            movement *
              18 *
              particle.depth;

          let y =
            particle.y +
            movementY *
              14 *
              particle.depth;

          if (
            state.connection >
            0
          ) {
            const amount =
              easeInOut(
                state.connection
              );

            x =
              lerp(
                x,
                centerX +
                  (
                    x -
                    centerX
                  ) *
                    0.42,
                amount *
                  0.7
              );

            y =
              lerp(
                y,
                centerY +
                  (
                    y -
                    centerY
                  ) *
                    0.42,
                amount *
                  0.7
              );
          }

          if (
            state.expansion >
            0
          ) {
            const dx =
              x -
              centerX;

            const dy =
              y -
              centerY;

            const distance =
              Math.hypot(
                dx,
                dy
              ) || 1;

            const power =
              state.expansion *
              width *
              0.28 *
              particle.depth;

            x +=
              (dx / distance) *
              power;

            y +=
              (dy / distance) *
              power;
          }

          if (
            state.exit >
            0
          ) {
            const dx =
              x -
              centerX;

            const dy =
              y -
              centerY;

            const distance =
              Math.hypot(
                dx,
                dy
              ) || 1;

            const power =
              state.exit *
              width *
              0.65;

            x +=
              (dx / distance) *
              power;

            y +=
              (dy / distance) *
              power;
          }

          context.globalAlpha =
            particle.alpha *
            state.entrance *
            (
              1 -
              state.dissipation *
                0.8
            );

          context.fillStyle =
            "#b9d0dd";

          context.beginPath();

          context.arc(
            x,
            y,
            particle.size,
            0,
            Math.PI * 2
          );

          context.fill();

          if (
            state.pulse >
              0.35 &&
            index % 8 === 0
          ) {
            const pulseLength =
              8 +
              state.pulse *
                28;

            context.globalAlpha =
              particle.alpha *
              state.pulse *
              0.3;

            context.strokeStyle =
              "#b9d0dd";

            context.lineWidth =
              0.5;

            context.beginPath();

            context.moveTo(
              x -
                pulseLength,
              y
            );

            context.lineTo(
              x +
                pulseLength,
              y
            );

            context.stroke();
          }
        }
      );

      context.restore();
    };

    const drawSignal = (
      time
    ) => {
      if (
        state.signal <= 0
      ) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      signals.forEach(
        (
          signal,
          index
        ) => {
          const breathing =
            Math.sin(
              time *
                0.00035 *
                signal.speed +
                signal.phase
            ) *
            12;

          let radius =
            signal.baseRadius +
            breathing;

          const connection =
            easeInOut(
              state.connection
            );

          radius =
            lerp(
              radius,
              radius * 0.35,
              connection
            );

          const synchronization =
            state.synchronization;

          const angle =
            signal.angle +
            time *
              0.000035 *
              signal.speed;

          let x =
            centerX +
            Math.cos(angle) *
              radius;

          let y =
            centerY +
            Math.sin(angle) *
              radius;

          x +=
            cursorRef.current.x *
            signal.depth *
            24;

          y +=
            cursorRef.current.y *
            signal.depth *
            18;

          if (
            state.expansion >
            0
          ) {
            const dx =
              x -
              centerX;

            const dy =
              y -
              centerY;

            const distance =
              Math.hypot(
                dx,
                dy
              ) || 1;

            const expansion =
              state.expansion *
              width *
              0.32 *
              signal.depth;

            x +=
              (dx / distance) *
              expansion;

            y +=
              (dy / distance) *
              expansion;
          }

          if (
            state.exit >
            0
          ) {
            const dx =
              x -
              centerX;

            const dy =
              y -
              centerY;

            const distance =
              Math.hypot(
                dx,
                dy
              ) || 1;

            const exitPower =
              state.exit *
              width *
              0.72 *
              signal.depth;

            x +=
              (dx / distance) *
              exitPower;

            y +=
              (dy / distance) *
              exitPower;
          }

          const wave =
            Math.sin(
              time *
                0.0006 +
                signal.phase
            );

          const alpha =
            signal.alpha *
            state.signal *
            (
              0.65 +
              synchronization *
                0.35
            ) *
            (
              1 -
              state.dissipation
            );

          context.globalAlpha =
            alpha;

          context.fillStyle =
            "#d7e7ef";

          context.beginPath();

          context.arc(
            x,
            y,
            signal.size *
              (
                1 +
                state.pulse *
                  1.6
              ),
            0,
            Math.PI * 2
          );

          context.fill();

          if (
            index % 9 === 0 &&
            state.connection >
              0.35
          ) {
            const next =
              signals[
                (
                  index + 1
                ) %
                  signals.length
              ];

            const nextAngle =
              next.angle +
              time *
                0.000035 *
                next.speed;

            const nextRadius =
              lerp(
                next.baseRadius,
                next.baseRadius *
                  0.35,
                connection
              );

            const nextX =
              centerX +
              Math.cos(
                nextAngle
              ) *
                nextRadius;

            const nextY =
              centerY +
              Math.sin(
                nextAngle
              ) *
                nextRadius;

            const distance =
              Math.hypot(
                nextX - x,
                nextY - y
              );

            if (
              distance <
              Math.min(
                width,
                height
              ) * 0.32
            ) {
              context.globalAlpha =
                0.035 *
                state.connection *
                (
                  1 -
                  state.dissipation
                );

              context.strokeStyle =
                "#b9d0dd";

              context.lineWidth =
                0.6;

              context.beginPath();

              context.moveTo(
                x,
                y
              );

              context.lineTo(
                nextX,
                nextY
              );

              context.stroke();
            }
          }

          if (
            wave > 0.96 &&
            index % 17 === 0
          ) {
            context.globalAlpha =
              0.25 *
              state.synchronization;

            context.strokeStyle =
              "#d7e7ef";

            context.lineWidth =
              0.5;

            context.beginPath();

            context.arc(
              x,
              y,
              5 +
                state.pulse *
                  14,
              0,
              Math.PI * 2
            );

            context.stroke();
          }
        }
      );

      context.restore();
    };

    const drawCore = (
      time
    ) => {
      const centerX =
        width / 2;

      const centerY =
        height / 2;

      const pulse =
        Math.sin(
          time * 0.0012
        );

      context.save();

      const coreRadius =
        Math.min(
          width,
          height
        ) *
        (
          0.018 +
          state.pulse *
            0.035 +
          state.expansion *
            0.025
        );

      const gradient =
        context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          coreRadius *
            5
        );

      gradient.addColorStop(
        0,
        `rgba(220,240,248,${
          0.7 *
          state.connection
        })`
      );

      gradient.addColorStop(
        0.25,
        `rgba(145,190,212,${
          0.22 *
          state.connection
        })`
      );

      gradient.addColorStop(
        1,
        "rgba(90,130,150,0)"
      );

      context.fillStyle =
        gradient;

      context.beginPath();

      context.arc(
        centerX,
        centerY,
        coreRadius * 5,
        0,
        Math.PI * 2
      );

      context.fill();

      context.globalAlpha =
        state.connection *
        (
          1 -
          state.dissipation
        );

      context.fillStyle =
        "#e3f1f7";

      context.beginPath();

      context.arc(
        centerX,
        centerY,
        coreRadius *
          (
            1 +
            pulse *
              0.1
          ),
        0,
        Math.PI * 2
      );

      context.fill();

      context.restore();
    };

    const drawRings = (
      time
    ) => {
      if (
        state.connection <= 0
      ) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      rings.forEach(
        (
          ring,
          index
        ) => {
          const pulse =
            Math.sin(
              time *
                0.0005 +
                ring.phase
            ) *
            3;

          const radius =
            ring.radius +
            pulse +
            state.pulse *
              Math.min(
                width,
                height
              ) *
              0.012 *
              index;

          const alpha =
            ring.alpha *
            state.connection *
            (
              1 -
              state.dissipation
            ) *
            (
              1 -
              state.exit
            );

          context.globalAlpha =
            alpha;

          context.strokeStyle =
            "#9fb8c7";

          context.lineWidth =
            ring.width;

          context.beginPath();

          context.arc(
            centerX,
            centerY,
            radius,
            0,
            Math.PI * 2
          );

          context.stroke();
        }
      );

      context.restore();
    };

    const drawWaves = (
      time
    ) => {
      if (
        state.pulse <= 0
      ) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      waves.forEach(
        (
          wave,
          index
        ) => {
          const radius =
            wave.radius *
            (
              1 +
              state.pulse *
                2.2
            );

          const rotation =
            time *
              0.00015 +
            wave.phase;

          const alpha =
            wave.alpha *
            state.pulse *
            (
              1 -
              state.dissipation
            );

          context.globalAlpha =
            alpha;

          context.strokeStyle =
            "#c2d8e3";

          context.lineWidth =
            wave.thickness;

          context.beginPath();

          context.arc(
            centerX,
            centerY,
            radius,
            rotation,
            rotation +
              Math.PI *
                (
                  1.2 +
                  index *
                    0.08
                )
          );

          context.stroke();
        }
      );

      context.restore();
    };

    const drawRays = () => {
      if (
        state.expansion <= 0
      ) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      rays.forEach(
        (
          ray,
          index
        ) => {
          const inner =
            20 +
            state.expansion *
              40;

          const outer =
            inner +
            state.expansion *
              Math.max(
                width,
                height
              ) *
              ray.length;

          const angle =
            ray.angle +
            state.distortion *
              (
                index % 2 === 0
                  ? 0.08
                  : -0.08
              );

          context.globalAlpha =
            ray.alpha *
            state.expansion *
            (
              1 -
              state.exit
            );

          context.strokeStyle =
            "#a9c2d0";

          context.lineWidth =
            ray.width;

          context.beginPath();

          context.moveTo(
            centerX +
              Math.cos(angle) *
                inner,
            centerY +
              Math.sin(angle) *
                inner
          );

          context.lineTo(
            centerX +
              Math.cos(angle) *
                outer,
            centerY +
              Math.sin(angle) *
                outer
          );

          context.stroke();
        }
      );

      context.restore();
    };

    const drawScan = (
      time
    ) => {
      if (
        state.synchronization <=
        0
      ) {
        return;
      }

      const progress =
        (
          time *
            0.000055 +
          state.progress *
            0.85
        ) % 1.2;

      const y =
        progress *
        height;

      const gradient =
        context.createLinearGradient(
          0,
          y - 100,
          0,
          y + 100
        );

      gradient.addColorStop(
        0,
        "rgba(150,190,210,0)"
      );

      gradient.addColorStop(
        0.5,
        `rgba(170,205,220,${
          0.035 *
          state.synchronization
        })`
      );

      gradient.addColorStop(
        1,
        "rgba(150,190,210,0)"
      );

      context.fillStyle =
        gradient;

      context.fillRect(
        0,
        y - 100,
        width,
        200
      );
    };

    const drawExit = () => {
      if (
        state.exit <= 0
      ) {
        return;
      }

      context.save();

      const amount =
        easeInOut(
          state.exit
        );

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      const gradient =
        context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          Math.max(
            width,
            height
          ) * 0.7
        );

      gradient.addColorStop(
        0,
        `rgba(0,0,0,${
          0.2 * amount
        })`
      );

      gradient.addColorStop(
        0.55,
        `rgba(0,0,0,${
          0.48 * amount
        })`
      );

      gradient.addColorStop(
        1,
        `rgba(0,0,0,${
          0.9 * amount
        })`
      );

      context.fillStyle =
        gradient;

      context.fillRect(
        0,
        0,
        width,
        height
      );

      context.restore();
    };

    const drawFlash = () => {
      if (
        state.flash <= 0
      ) {
        return;
      }

      context.save();

      context.globalAlpha =
        state.flash *
        0.08;

      context.fillStyle =
        "#dcebf2";

      context.fillRect(
        0,
        0,
        width,
        height
      );

      context.restore();
    };

    const drawVignette = () => {
      const gradient =
        context.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(
            width,
            height
          ) * 0.18,
          width / 2,
          height / 2,
          Math.max(
            width,
            height
          ) * 0.78
        );

      gradient.addColorStop(
        0,
        "rgba(0,0,0,0)"
      );

      gradient.addColorStop(
        0.65,
        "rgba(0,0,0,0.08)"
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0.62)"
      );

      context.fillStyle =
        gradient;

      context.fillRect(
        0,
        0,
        width,
        height
      );
    };

    const render = (
      time
    ) => {
      if (destroyed) {
        return;
      }

      context.clearRect(
        0,
        0,
        width,
        height
      );

      const mouse =
        cursorRef.current;

      mouse.x +=
        (
          mouse.targetX -
          mouse.x
        ) *
        0.055;

      mouse.y +=
        (
          mouse.targetY -
          mouse.y
        ) *
        0.055;

      drawBackground(
        time
      );

      drawParticles(
        time
      );

      drawSignal(
        time
      );

      drawRings(
        time
      );

      drawCore(
        time
      );

      drawWaves(
        time
      );

      drawRays();

      drawScan(
        time
      );

      drawExit();

      drawVignette();

      drawFlash();

      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    const pointerMove = (
      event
    ) => {
      cursorRef.current.targetX =
        (
          event.clientX /
            window.innerWidth -
          0.5
        ) * 2;

      cursorRef.current.targetY =
        (
          event.clientY /
            window.innerHeight -
          0.5
        ) * 2;
    };

    const pointerLeave = () => {
      cursorRef.current.targetX = 0;
      cursorRef.current.targetY = 0;
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "pointermove",
      pointerMove
    );

    window.addEventListener(
      "pointerleave",
      pointerLeave
    );

    animationFrame =
      requestAnimationFrame(
        render
      );

    const ctx =
      gsap.context(
        () => {
          gsap.set(
            scene,
            {
              opacity: 0,
              scale: 0.92,
              y: 70,
            }
          );

          gsap.set(
            coreRef.current,
            {
              opacity: 0,
              scale: 0.4,
            }
          );

          gsap.set(
            signalRef.current,
            {
              opacity: 0,
              y: 35,
            }
          );

          gsap.set(
            statusRef.current,
            {
              opacity: 0,
              y: 18,
            }
          );

          gsap.set(
            flashRef.current,
            {
              opacity: 0,
            }
          );

          const timeline =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.15,
                invalidateOnRefresh: true,

                onUpdate: (
                  self
                ) => {
                  state.progress =
                    self.progress;
                },
              },
            });

          /*
           * =====================================================
           * 01 — ACTIVACIÓN
           * =====================================================
           */

          timeline.addLabel(
            "activacion",
            0
          );

          timeline.to(
            state,
            {
              entrance: 1,
              signal: 0.45,
              duration: 0.12,
              ease: "none",
            },
            "activacion"
          );

          timeline.to(
            scene,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.18,
              ease: "power4.out",
            },
            "activacion"
          );

          timeline.to(
            signalRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.16,
              ease: "power3.out",
            },
            "activacion+=0.03"
          );

          timeline.to(
            statusRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.12,
              ease: "power3.out",
            },
            "activacion+=0.08"
          );

          /*
           * =====================================================
           * 02 — CONEXIÓN
           * =====================================================
           */

          timeline.addLabel(
            "conexion",
            0.14
          );

          timeline.to(
            state,
            {
              signal: 1,
              connection: 1,
              duration: 0.18,
              ease: "power2.inOut",
            },
            "conexion"
          );

          timeline.to(
            coreRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.18,
              ease: "back.out(1.7)",
            },
            "conexion+=0.03"
          );

          /*
           * =====================================================
           * 03 — SINCRONIZACIÓN
           * =====================================================
           */

          timeline.addLabel(
            "sincronizacion",
            0.32
          );

          timeline.to(
            state,
            {
              synchronization: 1,
              duration: 0.15,
              ease: "power2.inOut",
            },
            "sincronizacion"
          );

          /*
           * =====================================================
           * 04 — PRIMER PULSO
           * =====================================================
           */

          timeline.addLabel(
            "pulso",
            0.44
          );

          timeline.to(
            state,
            {
              pulse: 1,
              distortion: 0.35,
              flash: 1,
              duration: 0.12,
              ease: "power3.in",
            },
            "pulso"
          );

          timeline.to(
            flashRef.current,
            {
              opacity: 1,
              duration: 0.035,
              ease: "none",
            },
            "pulso+=0.015"
          );

          timeline.to(
            flashRef.current,
            {
              opacity: 0,
              duration: 0.08,
              ease: "power2.out",
            },
            "pulso+=0.05"
          );

          timeline.to(
            state,
            {
              flash: 0,
              pulse: 0.35,
              duration: 0.08,
              ease: "none",
            },
            "pulso+=0.05"
          );

          /*
           * =====================================================
           * 05 — EXPANSIÓN
           * =====================================================
           */

          timeline.addLabel(
            "expansion",
            0.56
          );

          timeline.to(
            state,
            {
              expansion: 1,
              pulse: 0.75,
              distortion: 0.75,
              duration: 0.18,
              ease: "power3.inOut",
            },
            "expansion"
          );

          /*
           * =====================================================
           * 06 — DESMATERIALIZACIÓN
           * =====================================================
           */

          timeline.addLabel(
            "disipacion",
            0.72
          );

          timeline.to(
            state,
            {
              dissipation: 1,
              expansion: 0.55,
              pulse: 0.2,
              distortion: 0.25,
              duration: 0.16,
              ease: "power3.inOut",
            },
            "disipacion"
          );

          timeline.to(
            coreRef.current,
            {
              opacity: 0,
              scale: 0.6,
              duration: 0.13,
              ease: "power3.in",
            },
            "disipacion+=0.02"
          );

          timeline.to(
            statusRef.current,
            {
              opacity: 0,
              y: -12,
              duration: 0.1,
              ease: "power2.in",
            },
            "disipacion+=0.02"
          );

          /*
           * =====================================================
           * 07 — SILENCIO
           * =====================================================
           */

          timeline.addLabel(
            "silencio",
            0.82
          );

          timeline.to(
            state,
            {
              signal: 0.22,
              connection: 0.2,
              synchronization: 0.1,
              pulse: 0,
              expansion: 0,
              duration: 0.12,
              ease: "power2.out",
            },
            "silencio"
          );

          /*
           * =====================================================
           * 08 — SALIDA
           * =====================================================
           */

          timeline.addLabel(
            "salida",
            0.88
          );

          timeline.to(
            state,
            {
              exit: 1,
              dissipation: 1,
              signal: 0,
              connection: 0,
              synchronization: 0,
              duration: 0.12,
              ease: "power4.in",
            },
            "salida"
          );

          timeline.to(
            scene,
            {
              scale: 1.06,
              y: -35,
              opacity: 0,
              duration: 0.12,
              ease: "power4.in",
            },
            "salida"
          );

          timeline.to(
            signalRef.current,
            {
              opacity: 0,
              y: -25,
              duration: 0.1,
              ease: "power3.in",
            },
            "salida"
          );
        },
        section
      );

    return () => {
      destroyed = true;

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "pointermove",
        pointerMove
      );

      window.removeEventListener(
        "pointerleave",
        pointerLeave
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="footer-transition"
    >
      <div className="footer-transition-sticky">
        <div
          ref={sceneRef}
          className="footer-transition-scene"
        >
          <canvas
            ref={canvasRef}
            className="footer-transition-canvas"
          />

          <div
            ref={signalRef}
            className="footer-transition-signal"
          >
            <span>
              FINAL SIGNAL
            </span>
          </div>

          <div
            ref={coreRef}
            className="footer-transition-core"
          />

          <div
            ref={statusRef}
            className="footer-transition-status"
          >
            <span>
              CONNECTION
            </span>

            <span>
              ESTABLISHED
            </span>
          </div>

          <div
            ref={flashRef}
            className="footer-transition-flash"
          />

          <div className="footer-transition-scanlines" />

          <div className="footer-transition-grain" />

          <div className="footer-transition-edge footer-transition-edge-top" />

          <div className="footer-transition-edge footer-transition-edge-right" />

          <div className="footer-transition-edge footer-transition-edge-bottom" />

          <div className="footer-transition-edge footer-transition-edge-left" />
        </div>
      </div>
    </section>
  );
}

export default FooterTransition;