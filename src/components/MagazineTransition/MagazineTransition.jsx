import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/MagazineTransition/magazine-transition.css";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 280;
const NODE_COUNT = 64;
const LINE_COUNT = 34;
const TRAIL_COUNT = 42;
const BAR_COUNT = 28;

const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const lerp = (a, b, t) =>
  a + (b - a) * t;

const easeOut = (t) =>
  1 - Math.pow(1 - t, 3);

const easeIn = (t) =>
  t * t * t;

const easeInOut = (t) =>
  t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

const random = (min, max) =>
  Math.random() * (max - min) + min;

const createParticle = (width, height, index) => {
  const side = index % 8;

  let x = 0;
  let y = 0;

  if (side === 0) {
    x = random(-width * 0.2, width * 1.2);
    y = random(-height * 0.25, -20);
  } else if (side === 1) {
    x = random(-width * 0.2, width * 1.2);
    y = random(height + 20, height * 1.25);
  } else if (side === 2) {
    x = random(-width * 0.25, -20);
    y = random(-height * 0.1, height * 1.1);
  } else if (side === 3) {
    x = random(width + 20, width * 1.25);
    y = random(-height * 0.1, height * 1.1);
  } else {
    x = random(0, width);
    y = random(0, height);
  }

  return {
    x,
    y,
    originX: x,
    originY: y,

    size: random(0.45, 2.1),

    alpha: random(0.18, 0.78),

    depth: random(0.15, 1),

    speed: random(0.15, 0.8),

    phase: random(0, Math.PI * 2),

    angle: random(0, Math.PI * 2),

    distance: Math.hypot(
      x - width / 2,
      y - height / 2
    ),
  };
};

const createNode = (width, height, index) => ({
  x: random(0, width),
  y: random(0, height),

  originX: random(0, width),
  originY: random(0, height),

  size: random(0.8, 2.4),

  alpha: random(0.2, 0.65),

  depth: random(0.2, 1),

  phase: random(0, Math.PI * 2),

  angle:
    (index / NODE_COUNT) *
      Math.PI *
      2 +
    random(-0.2, 0.2),

  radius: random(
    Math.min(width, height) * 0.12,
    Math.min(width, height) * 0.48
  ),
});

const createLine = (width, height) => ({
  x: random(-width * 0.4, width * 1.4),
  y: random(-height * 0.4, height * 1.4),

  length: random(
    width * 0.08,
    width * 0.55
  ),

  angle: random(
    -Math.PI * 0.35,
    Math.PI * 0.35
  ),

  alpha: random(0.08, 0.3),

  width: random(0.5, 1.4),

  depth: random(0.2, 1),

  phase: random(0, Math.PI * 2),
});

const createTrail = (width, height) => ({
  x: random(0, width),
  y: random(0, height),

  length: random(
    width * 0.04,
    width * 0.22
  ),

  angle: random(
    -Math.PI,
    Math.PI
  ),

  speed: random(0.15, 0.8),

  alpha: random(0.08, 0.28),

  width: random(0.5, 1.2),

  phase: random(0, Math.PI * 2),
});

const createBar = (width, height) => ({
  x: random(0, width),
  y: random(0, height),

  width: random(
    width * 0.01,
    width * 0.12
  ),

  height: random(1, 3),

  alpha: random(0.06, 0.2),

  depth: random(0.2, 1),

  phase: random(0, Math.PI * 2),
});

function MagazineTransition() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const sceneRef = useRef(null);

  const flashRef = useRef(null);

  const leftStructureRef =
    useRef(null);

  const rightStructureRef =
    useRef(null);

  const topStructureRef =
    useRef(null);

  const bottomStructureRef =
    useRef(null);

  const cursorRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const scene = sceneRef.current;

    if (!section || !canvas || !scene) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;

    let animationFrame = 0;

    let destroyed = false;

    const particles = [];
    const nodes = [];
    const lines = [];
    const trails = [];
    const bars = [];

    const state = {
      progress: 0,

      entrance: 0,

      field: 0,

      grid: 0,

      structure: 0,

      compression: 0,

      explosion: 0,

      reorganization: 0,

      exit: 0,

      particles: 0,

      nodes: 0,

      trails: 0,

      scan: 0,

      distortion: 0,

      flash: 0,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(
        window.devicePixelRatio || 1,
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

      particles.length = 0;
      nodes.length = 0;
      lines.length = 0;
      trails.length = 0;
      bars.length = 0;

      for (
        let index = 0;
        index < PARTICLE_COUNT;
        index += 1
      ) {
        particles.push(
          createParticle(
            width,
            height,
            index
          )
        );
      }

      for (
        let index = 0;
        index < NODE_COUNT;
        index += 1
      ) {
        nodes.push(
          createNode(
            width,
            height,
            index
          )
        );
      }

      for (
        let index = 0;
        index < LINE_COUNT;
        index += 1
      ) {
        lines.push(
          createLine(
            width,
            height
          )
        );
      }

      for (
        let index = 0;
        index < TRAIL_COUNT;
        index += 1
      ) {
        trails.push(
          createTrail(
            width,
            height
          )
        );
      }

      for (
        let index = 0;
        index < BAR_COUNT;
        index += 1
      ) {
        bars.push(
          createBar(
            width,
            height
          )
        );
      }
    };

    const drawBackground = (
      time
    ) => {
      const centerX =
        width / 2 +
        cursorRef.current.x * 35;

      const centerY =
        height / 2 +
        cursorRef.current.y * 25;

      const radius =
        Math.max(width, height) *
        0.82;

      const gradient =
        context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );

      const pulse =
        Math.sin(
          time * 0.00035
        ) *
        0.015;

      gradient.addColorStop(
        0,
        `rgba(255,255,255,${
          0.075 +
          pulse +
          state.compression * 0.035
        })`
      );

      gradient.addColorStop(
        0.3,
        "rgba(255,255,255,0.025)"
      );

      gradient.addColorStop(
        0.68,
        "rgba(255,255,255,0.008)"
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      context.fillStyle = gradient;

      context.fillRect(
        0,
        0,
        width,
        height
      );

      context.save();

      const diagonal =
        state.field *
        width *
        0.16;

      context.translate(
        diagonal,
        -diagonal * 0.25
      );

      context.strokeStyle =
        "rgba(255,255,255,0.025)";

      context.lineWidth = 1;

      const spacing = 74;

      for (
        let x = -height;
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
          x + height,
          height
        );

        context.stroke();
      }

      context.restore();
    };

    const drawGrid = () => {
      const amount =
        state.grid;

      if (amount <= 0) {
        return;
      }

      context.save();

      const spacingX =
        Math.max(
          70,
          width / 15
        );

      const spacingY =
        Math.max(
          70,
          height / 10
        );

      const shift =
        state.reorganization *
        width *
        0.22;

      context.strokeStyle =
        "rgba(255,255,255,0.07)";

      context.lineWidth = 1;

      context.globalAlpha =
        amount *
        (1 - state.exit * 0.7);

      for (
        let x =
          -spacingX +
          shift;
        x <
        width +
          spacingX;
        x += spacingX
      ) {
        context.beginPath();

        context.moveTo(
          x,
          0
        );

        context.lineTo(
          x +
            state.distortion *
              35,
          height
        );

        context.stroke();
      }

      for (
        let y =
          -spacingY;
        y <
        height +
          spacingY;
        y += spacingY
      ) {
        context.beginPath();

        context.moveTo(
          0,
          y
        );

        context.lineTo(
          width,
          y +
            state.distortion *
              22
        );

        context.stroke();
      }

      context.restore();
    };

    const drawPerspective = () => {
      const amount =
        state.structure;

      if (amount <= 0) {
        return;
      }

      context.save();

      context.globalAlpha =
        0.14 *
        amount *
        (1 - state.exit);

      context.strokeStyle =
        "#ffffff";

      context.lineWidth = 1;

      const horizon =
        height *
        (
          0.5 +
          state.compression *
            0.08
        );

      for (
        let index = -16;
        index <= 16;
        index += 1
      ) {
        const endX =
          width / 2 +
          index *
            width *
            0.075;

        context.beginPath();

        context.moveTo(
          width / 2,
          horizon
        );

        context.lineTo(
          endX,
          height
        );

        context.stroke();
      }

      for (
        let index = 0;
        index < 9;
        index += 1
      ) {
        const t =
          index / 9;

        const y =
          horizon +
          Math.pow(
            t,
            1.75
          ) *
            height *
            0.52;

        context.beginPath();

        context.moveTo(
          0,
          y
        );

        context.lineTo(
          width,
          y
        );

        context.stroke();
      }

      context.restore();
    };

    const drawBars = (
      time
    ) => {
      if (
        state.reorganization <= 0
      ) {
        return;
      }

      context.save();

      bars.forEach(
        (bar, index) => {
          const movement =
            Math.sin(
              time * 0.0005 +
                bar.phase
            ) *
            15;

          const direction =
            index % 2 === 0
              ? 1
              : -1;

          const shift =
            state.reorganization *
            width *
            0.25 *
            direction;

          const x =
            bar.x +
            movement +
            shift;

          const y =
            bar.y +
            Math.sin(
              time * 0.0004 +
                bar.phase
            ) *
              12;

          context.globalAlpha =
            bar.alpha *
            state.reorganization *
            (1 - state.exit);

          context.fillStyle =
            "#ffffff";

          context.fillRect(
            x,
            y,
            bar.width,
            bar.height
          );
        }
      );

      context.restore();
    };

    const drawLines = (
      time
    ) => {
      const amount =
        state.structure;

      if (amount <= 0) {
        return;
      }

      context.save();

      lines.forEach(
        (line, index) => {
          const breathing =
            Math.sin(
              time * 0.00035 +
                line.phase
            ) *
            15 *
            line.depth;

          const compression =
            state.compression *
            (width / 2 -
              line.x) *
            0.35;

          const explosion =
            state.explosion *
            width *
            0.6 *
            (
              index % 2 === 0
                ? 1
                : -1
            );

          const reorganization =
            state.reorganization *
            width *
            0.3 *
            (
              index % 3 === 0
                ? -1
                : 1
            );

          const angle =
            line.angle +
            state.distortion *
            0.3;

          const length =
            line.length *
            (
              1 +
              state.explosion *
                1.8
            );

          const x =
            line.x +
            breathing -
            compression +
            explosion +
            reorganization;

          const y =
            line.y +
            breathing * 0.4;

          const x2 =
            x +
            Math.cos(angle) *
              length;

          const y2 =
            y +
            Math.sin(angle) *
              length;

          context.globalAlpha =
            line.alpha *
            amount *
            (
              1 -
              state.exit *
                0.85
            );

          context.lineWidth =
            line.width;

          context.strokeStyle =
            "#ffffff";

          context.beginPath();

          context.moveTo(
            x,
            y
          );

          context.lineTo(
            x2,
            y2
          );

          context.stroke();
        }
      );

      context.restore();
    };

    const drawNodes = (
      time
    ) => {
      const amount =
        state.nodes;

      if (amount <= 0) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      nodes.forEach(
        (node, index) => {
          const angle =
            node.angle +
            time *
              0.000025 *
              node.depth;

          const breathing =
            Math.sin(
              time * 0.00045 +
                node.phase
            ) *
            10;

          const spread =
            lerp(
              0.45,
              1.55,
              state.field
            );

          const compression =
            1 -
            state.compression *
              0.72;

          const explosion =
            state.explosion *
            (
              1.5 +
              node.depth
            );

          const radius =
            node.radius *
            spread *
            compression *
            (
              1 +
              explosion
            );

          let x =
            centerX +
            Math.cos(angle) *
              (
                radius +
                breathing
              );

          let y =
            centerY +
            Math.sin(angle) *
              (
                radius +
                breathing
              );

          x +=
            cursorRef.current.x *
            node.depth *
            35;

          y +=
            cursorRef.current.y *
            node.depth *
            28;

          if (
            state.reorganization >
            0
          ) {
            const targetX =
              index % 2 === 0
                ? width *
                  0.18
                : width *
                  0.82;

            const targetY =
              height *
              (
                0.15 +
                (index /
                  NODE_COUNT) *
                  0.7
              );

            const amount2 =
              easeInOut(
                state.reorganization
              );

            x = lerp(
              x,
              targetX,
              amount2 *
                0.55
            );

            y = lerp(
              y,
              targetY,
              amount2 *
                0.55
            );
          }

          node.x = x;
          node.y = y;
        }
      );

      nodes.forEach(
        (node, index) => {
          const next =
            nodes[
              (index + 1) %
                nodes.length
            ];

          if (!next) {
            return;
          }

          const distance =
            Math.hypot(
              next.x - node.x,
              next.y - node.y
            );

          const maxDistance =
            Math.min(
              width,
              height
            ) *
            0.24;

          if (
            distance >
            maxDistance
          ) {
            return;
          }

          context.globalAlpha =
            0.06 *
            amount *
            (
              1 -
              distance /
                maxDistance
            ) *
            (
              1 -
              state.exit
            );

          context.strokeStyle =
            "#ffffff";

          context.lineWidth = 1;

          context.beginPath();

          context.moveTo(
            node.x,
            node.y
          );

          context.lineTo(
            next.x,
            next.y
          );

          context.stroke();
        }
      );

      nodes.forEach(
        (node) => {
          context.globalAlpha =
            node.alpha *
            amount *
            (
              1 -
              state.exit
            );

          context.fillStyle =
            "#ffffff";

          context.beginPath();

          context.arc(
            node.x,
            node.y,
            node.size *
              (
                1 +
                state.explosion *
                  1.8
              ),
            0,
            Math.PI * 2
          );

          context.fill();
        }
      );

      context.restore();
    };

    const drawParticles = (
      time
    ) => {
      const amount =
        state.particles;

      if (amount <= 0) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      particles.forEach(
        (particle, index) => {
          const wave =
            Math.sin(
              time *
                0.00045 *
                particle.speed +
                particle.phase
            );

          const wave2 =
            Math.cos(
              time *
                0.00032 *
                particle.speed +
                particle.phase
            );

          let x =
            particle.originX +
            wave *
              26 *
              particle.depth;

          let y =
            particle.originY +
            wave2 *
              22 *
              particle.depth;

          const fieldSpread =
            state.field *
            (
              0.4 +
              particle.depth *
                0.85
            );

          x =
            lerp(
              centerX +
                (
                  x -
                  centerX
                ) *
                  0.2,
              x,
              fieldSpread
            );

          y =
            lerp(
              centerY +
                (
                  y -
                  centerY
                ) *
                  0.2,
              y,
              fieldSpread
            );

          if (
            state.compression >
            0
          ) {
            const compression =
              easeInOut(
                state.compression
              );

            x =
              lerp(
                x,
                centerX +
                  (
                    x -
                    centerX
                  ) *
                    0.22,
                compression
              );

            y =
              lerp(
                y,
                centerY +
                  (
                    y -
                    centerY
                  ) *
                    0.22,
                compression
              );
          }

          if (
            state.explosion >
            0
          ) {
            const dx =
              x - centerX;

            const dy =
              y - centerY;

            const distance =
              Math.hypot(
                dx,
                dy
              ) || 1;

            const power =
              state.explosion *
              width *
              0.72;

            x +=
              (dx / distance) *
              power *
              particle.depth;

            y +=
              (dy / distance) *
              power *
              particle.depth;
          }

          if (
            state.reorganization >
            0
          ) {
            const side =
              index % 2 === 0
                ? -1
                : 1;

            const targetX =
              side < 0
                ? width * 0.08
                : width * 0.92;

            const targetY =
              height *
              (
                0.1 +
                (
                  index /
                  PARTICLE_COUNT
                ) *
                  0.8
              );

            const amount2 =
              easeInOut(
                state.reorganization
              );

            x =
              lerp(
                x,
                targetX,
                amount2 *
                  0.72
              );

            y =
              lerp(
                y,
                targetY,
                amount2 *
                  0.72
              );
          }

          if (
            state.exit >
            0
          ) {
            const dx =
              x - centerX;

            const dy =
              y - centerY;

            const distance =
              Math.hypot(
                dx,
                dy
              ) || 1;

            const exitPower =
              state.exit *
              width *
              (
                0.45 +
                particle.depth
              );

            x +=
              (dx / distance) *
              exitPower;

            y +=
              (dy / distance) *
              exitPower *
              0.7;
          }

          context.globalAlpha =
            particle.alpha *
            amount *
            (
              1 -
              state.exit *
                0.7
            );

          const size =
            particle.size *
            (
              1 +
              state.explosion *
                2.2
            );

          context.fillStyle =
            "#ffffff";

          context.beginPath();

          context.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
          );

          context.fill();

          if (
            state.explosion >
              0.15 &&
            index % 6 === 0
          ) {
            const trailLength =
              10 +
              state.explosion *
                80 *
                particle.depth;

            /*
             * IMPORTANTE:
             * Estas variables deben existir
             * dentro de este bloque.
             */
            const dx =
              x - centerX;

            const dy =
              y - centerY;

            const directionX =
              dx /
              (
                Math.abs(dx) +
                1
              );

            const directionY =
              dy /
              (
                Math.abs(dy) +
                1
              );

            const trailX =
              x -
              directionX *
                trailLength;

            const trailY =
              y -
              directionY *
                trailLength *
                0.35;

            context.globalAlpha =
              particle.alpha *
              state.explosion *
              0.35;

            context.beginPath();

            context.moveTo(
              x,
              y
            );

            context.lineTo(
              trailX,
              trailY
            );

            context.strokeStyle =
              "#ffffff";

            context.lineWidth =
              0.6;

            context.stroke();
          }
        }
      );

      context.restore();
    };

    const drawTrails = (
      time
    ) => {
      const amount =
        state.trails;

      if (amount <= 0) {
        return;
      }

      context.save();

      trails.forEach(
        (trail, index) => {
          const movement =
            time *
            0.00015 *
            trail.speed;

          const cycle =
            (
              movement +
              trail.phase
            ) %
            1;

          const progress =
            cycle < 0.5
              ? cycle * 2
              : (1 - cycle) * 2;

          const explosion =
            state.explosion *
            width *
            0.4;

          const side =
            index % 2 === 0
              ? -1
              : 1;

          const x =
            trail.x +
            Math.sin(
              time * 0.0002 +
                trail.phase
            ) *
              35 +
            side *
              explosion;

          const y =
            trail.y +
            progress *
              height *
              0.18;

          const length =
            trail.length *
            (
              1 +
              state.explosion *
                2.5
            );

          context.globalAlpha =
            trail.alpha *
            amount *
            (
              1 -
              state.exit
            );

          context.strokeStyle =
            "#ffffff";

          context.lineWidth =
            trail.width;

          context.beginPath();

          context.moveTo(
            x,
            y
          );

          context.lineTo(
            x +
              Math.cos(
                trail.angle
              ) *
              length,
            y +
              Math.sin(
                trail.angle
              ) *
              length
          );

          context.stroke();
        }
      );

      context.restore();
    };

    const drawScanner = (
      time
    ) => {
      const amount =
        state.scan;

      if (amount <= 0) {
        return;
      }

      const progress =
        (
          time *
            0.00008 +
          state.progress *
            1.6
        ) %
        1.25;

      const y =
        progress *
        height;

      const gradient =
        context.createLinearGradient(
          0,
          y - 90,
          0,
          y + 90
        );

      gradient.addColorStop(
        0,
        "rgba(255,255,255,0)"
      );

      gradient.addColorStop(
        0.5,
        `rgba(255,255,255,${
          0.09 * amount
        })`
      );

      gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      context.fillStyle =
        gradient;

      context.fillRect(
        0,
        y - 90,
        width,
        180
      );

      context.globalAlpha =
        0.5 * amount;

      context.fillStyle =
        "#ffffff";

      context.fillRect(
        0,
        y,
        width,
        1
      );
    };

    const drawCompression = () => {
      const amount =
        state.compression;

      if (amount <= 0) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      context.globalAlpha =
        0.12 *
        amount;

      context.strokeStyle =
        "#ffffff";

      context.lineWidth = 1;

      for (
        let index = 0;
        index < 18;
        index += 1
      ) {
        const t =
          index / 17;

        const y =
          lerp(
            0,
            height,
            t
          );

        const left =
          lerp(
            0,
            centerX,
            amount
          );

        const right =
          lerp(
            width,
            centerX,
            amount
          );

        context.beginPath();

        context.moveTo(
          left,
          y
        );

        context.lineTo(
          right,
          y
        );

        context.stroke();
      }

      for (
        let index = 0;
        index < 18;
        index += 1
      ) {
        const t =
          index / 17;

        const x =
          lerp(
            0,
            centerX,
            amount
          );

        const y =
          t * height;

        context.beginPath();

        context.moveTo(
          x,
          centerY
        );

        context.lineTo(
          lerp(
            x,
            width,
            amount
          ),
          y
        );

        context.stroke();
      }

      context.restore();
    };

    const drawExplosion = () => {
      const amount =
        state.explosion;

      if (amount <= 0) {
        return;
      }

      const centerX =
        width / 2;

      const centerY =
        height / 2;

      context.save();

      context.globalAlpha =
        0.12 *
        amount;

      context.strokeStyle =
        "#ffffff";

      context.lineWidth = 1;

      const rayCount = 32;

      for (
        let index = 0;
        index < rayCount;
        index += 1
      ) {
        const angle =
          (
            index /
            rayCount
          ) *
            Math.PI *
            2;

        const inner =
          30 +
          amount * 120;

        const outer =
          inner +
          amount *
            Math.max(
              width,
              height
            ) *
            0.8;

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

      context.restore();
    };

    const drawExit = () => {
      const amount =
        state.exit;

      if (amount <= 0) {
        return;
      }

      context.save();

      const offset =
        amount *
        width *
        0.7;

      context.globalAlpha =
        0.12 *
        (1 - amount * 0.35);

      context.strokeStyle =
        "#ffffff";

      context.lineWidth = 1;

      for (
        let index = 0;
        index < 18;
        index += 1
      ) {
        const y =
          index *
          (
            height / 18
          );

        context.beginPath();

        context.moveTo(
          -width * 0.3 -
            offset,
          y
        );

        context.lineTo(
          width * 0.55 -
            offset,
          y
        );

        context.stroke();
      }

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
          ) * 0.16,
          width / 2,
          height / 2,
          Math.max(
            width,
            height
          ) * 0.75
        );

      gradient.addColorStop(
        0,
        "rgba(0,0,0,0)"
      );

      gradient.addColorStop(
        0.7,
        "rgba(0,0,0,0.035)"
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0.48)"
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

    const drawFlash = () => {
      if (
        state.flash <= 0
      ) {
        return;
      }

      context.save();

      context.globalAlpha =
        state.flash *
        0.12;

      context.fillStyle =
        "#ffffff";

      context.fillRect(
        0,
        0,
        width,
        height
      );

      context.restore();
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

      drawBackground(time);

      drawGrid();

      drawPerspective();

      drawLines(time);

      drawNodes(time);

      drawBars(time);

      drawParticles(time);

      drawTrails(time);

      drawCompression();

      drawExplosion();

      drawScanner(time);

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

    const ctx = gsap.context(
      () => {
        gsap.set(
          scene,
          {
            opacity: 0,
            scale: 0.78,
            y: 100,
            rotateX: 10,
          }
        );

        gsap.set(
          leftStructureRef.current,
          {
            x: "-18vw",
            opacity: 0,
          }
        );

        gsap.set(
          rightStructureRef.current,
          {
            x: "18vw",
            opacity: 0,
          }
        );

        gsap.set(
          topStructureRef.current,
          {
            y: "-15vh",
            opacity: 0,
          }
        );

        gsap.set(
          bottomStructureRef.current,
          {
            y: "15vh",
            opacity: 0,
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
         * ======================================================
         * 01 — ENTRADA
         * ======================================================
         */

        timeline.addLabel(
          "entrada",
          0
        );

        timeline.to(
          state,
          {
            entrance: 1,
            particles: 0.35,
            duration: 0.1,
            ease: "none",
          },
          "entrada"
        );

        timeline.to(
          scene,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            duration: 0.16,
            ease: "power4.out",
          },
          "entrada"
        );

        timeline.to(
          leftStructureRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.16,
            ease: "power3.out",
          },
          "entrada+=0.02"
        );

        timeline.to(
          rightStructureRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.16,
            ease: "power3.out",
          },
          "entrada+=0.02"
        );

        timeline.to(
          topStructureRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.16,
            ease: "power3.out",
          },
          "entrada+=0.04"
        );

        timeline.to(
          bottomStructureRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.16,
            ease: "power3.out",
          },
          "entrada+=0.04"
        );

        /*
         * ======================================================
         * 02 — CONSTRUCCIÓN DEL CAMPO
         * ======================================================
         */

        timeline.addLabel(
          "campo",
          0.12
        );

        timeline.to(
          state,
          {
            field: 1,
            grid: 1,
            structure: 0.55,
            nodes: 0.5,
            particles: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "campo"
        );

        /*
         * ======================================================
         * 03 — ORGANIZACIÓN
         * ======================================================
         */

        timeline.addLabel(
          "estructura",
          0.28
        );

        timeline.to(
          state,
          {
            structure: 1,
            nodes: 1,
            scan: 0.7,
            duration: 0.18,
            ease: "power2.inOut",
          },
          "estructura"
        );

        /*
         * ======================================================
         * 04 — COMPRESIÓN
         * ======================================================
         */

        timeline.addLabel(
          "compresion",
          0.44
        );

        timeline.to(
          state,
          {
            compression: 1,
            distortion: 0.45,
            duration: 0.15,
            ease: "power3.inOut",
          },
          "compresion"
        );

        timeline.to(
          leftStructureRef.current,
          {
            x: "7vw",
            duration: 0.15,
            ease: "power2.inOut",
          },
          "compresion"
        );

        timeline.to(
          rightStructureRef.current,
          {
            x: "-7vw",
            duration: 0.15,
            ease: "power2.inOut",
          },
          "compresion"
        );

        /*
         * ======================================================
         * 05 — EXPLOSIÓN
         * ======================================================
         */

        timeline.addLabel(
          "explosion",
          0.56
        );

        timeline.to(
          state,
          {
            explosion: 1,
            compression: 0.15,
            trails: 1,
            flash: 1,
            duration: 0.13,
            ease: "power3.in",
          },
          "explosion"
        );

        timeline.to(
          flashRef.current,
          {
            opacity: 1,
            duration: 0.035,
            ease: "none",
          },
          "explosion+=0.02"
        );

        timeline.to(
          flashRef.current,
          {
            opacity: 0,
            duration: 0.09,
            ease: "power2.out",
          },
          "explosion+=0.055"
        );

        timeline.to(
          state,
          {
            flash: 0,
            duration: 0.08,
            ease: "none",
          },
          "explosion+=0.055"
        );

        /*
         * ======================================================
         * 06 — REORGANIZACIÓN
         * ======================================================
         */

        timeline.addLabel(
          "reorganizacion",
          0.66
        );

        timeline.to(
          state,
          {
            reorganization: 1,
            explosion: 0.2,
            compression: 0,
            distortion: 1,
            duration: 0.2,
            ease: "power3.inOut",
          },
          "reorganizacion"
        );

        timeline.to(
          leftStructureRef.current,
          {
            x: "-4vw",
            duration: 0.18,
            ease: "power3.inOut",
          },
          "reorganizacion"
        );

        timeline.to(
          rightStructureRef.current,
          {
            x: "4vw",
            duration: 0.18,
            ease: "power3.inOut",
          },
          "reorganizacion"
        );

        timeline.to(
          topStructureRef.current,
          {
            y: "5vh",
            duration: 0.18,
            ease: "power3.inOut",
          },
          "reorganizacion"
        );

        timeline.to(
          bottomStructureRef.current,
          {
            y: "-5vh",
            duration: 0.18,
            ease: "power3.inOut",
          },
          "reorganizacion"
        );

        /*
         * ======================================================
         * 07 — SEGUNDA FASE
         * ======================================================
         */

        timeline.addLabel(
          "segunda-fase",
          0.79
        );

        timeline.to(
          state,
          {
            explosion: 0,
            reorganization: 0.65,
            distortion: 0.55,
            scan: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          "segunda-fase"
        );

        /*
         * ======================================================
         * 08 — SALIDA
         * ======================================================
         */

        timeline.addLabel(
          "salida",
          0.87
        );

        timeline.to(
          state,
          {
            exit: 1,
            particles: 0.55,
            nodes: 0.2,
            duration: 0.13,
            ease: "power3.in",
          },
          "salida"
        );

        timeline.to(
          scene,
          {
            x: "-15vw",
            y: "-4vh",
            scale: 1.1,
            opacity: 0,
            duration: 0.13,
            ease: "power4.in",
          },
          "salida"
        );

        timeline.to(
          leftStructureRef.current,
          {
            x: "-22vw",
            opacity: 0,
            duration: 0.12,
            ease: "power3.in",
          },
          "salida"
        );

        timeline.to(
          rightStructureRef.current,
          {
            x: "22vw",
            opacity: 0,
            duration: 0.12,
            ease: "power3.in",
          },
          "salida"
        );

        timeline.to(
          topStructureRef.current,
          {
            y: "-18vh",
            opacity: 0,
            duration: 0.12,
            ease: "power3.in",
          },
          "salida"
        );

        timeline.to(
          bottomStructureRef.current,
          {
            y: "18vh",
            opacity: 0,
            duration: 0.12,
            ease: "power3.in",
          },
          "salida"
        );
      },
      section
    );

    const cursorAnimation = () => {
      if (destroyed) {
        return;
      }

      const {
        x,
        y,
      } = cursorRef.current;

      gsap.set(
        leftStructureRef.current,
        {
          y: y * 12,
        }
      );

      gsap.set(
        rightStructureRef.current,
        {
          y: y * -12,
        }
      );

      gsap.set(
        topStructureRef.current,
        {
          x: x * 18,
        }
      );

      gsap.set(
        bottomStructureRef.current,
        {
          x: x * -18,
        }
      );
    };

    gsap.ticker.add(
      cursorAnimation
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

      gsap.ticker.remove(
        cursorAnimation
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="magazine-transition"
    >
      <div className="magazine-transition-sticky">
        <div
          ref={sceneRef}
          className="magazine-transition-scene"
        >
          <canvas
            ref={canvasRef}
            className="magazine-transition-canvas"
          />

          <div
            ref={leftStructureRef}
            className="
              magazine-transition-structure
              magazine-transition-structure-left
            "
          >
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div
            ref={rightStructureRef}
            className="
              magazine-transition-structure
              magazine-transition-structure-right
            "
          >
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div
            ref={topStructureRef}
            className="
              magazine-transition-structure
              magazine-transition-structure-top
            "
          >
            <span />
            <span />
            <span />
            <span />
          </div>

          <div
            ref={bottomStructureRef}
            className="
              magazine-transition-structure
              magazine-transition-structure-bottom
            "
          >
            <span />
            <span />
            <span />
            <span />
          </div>

          <div
            ref={flashRef}
            className="magazine-transition-flash"
          />

          <div className="magazine-transition-scanlines" />

          <div className="magazine-transition-grain" />

          <div className="magazine-transition-edge magazine-transition-edge-top" />
          <div className="magazine-transition-edge magazine-transition-edge-right" />
          <div className="magazine-transition-edge magazine-transition-edge-bottom" />
          <div className="magazine-transition-edge magazine-transition-edge-left" />
        </div>
      </div>
    </section>
  );
}

export default MagazineTransition;