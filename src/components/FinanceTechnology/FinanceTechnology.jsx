import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/FinanceTechnology/financeTechnology.css";

gsap.registerPlugin(ScrollTrigger);

const FINANCE_TERMS = [
  "MERCADO",
  "CAPITAL",
  "RIESGO",
  "LIQUIDEZ",
  "INVERSIÓN",
  "RENDIMIENTO",
  "VALOR",
  "ANÁLISIS",
  "ESTRATEGIA",
  "DATOS",
  "TENDENCIA",
  "PROYECCIÓN",
];

const ENGINEERING_TERMS = [
  "SISTEMAS",
  "SOFTWARE",
  "ALGORITMO",
  "ARQUITECTURA",
  "CÓDIGO",
  "DATOS",
  "AUTOMATIZACIÓN",
  "INTEGRACIÓN",
  "PROCESO",
  "LÓGICA",
  "INNOVACIÓN",
  "DESARROLLO",
];

function FinanceTechnology() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let disposed = false;

    const state = {
      intro: 0,
      market: 0,
      engineering: 0,
      split: 0,
      systems: 0,
      convergence: 0,
      final: 0,
      exit: 0,
    };

    const particles = [];
    const dataPoints = [];
    const circuits = [];
    const sparks = [];

    const random = (min, max) =>
      Math.random() * (max - min) + min;

    const clamp = (value, min = 0, max = 1) =>
      Math.max(min, Math.min(max, value));

    const lerp = (a, b, amount) =>
      a + (b - a) * amount;

    const easeOut = (value) => {
      const v = clamp(value);

      return 1 - Math.pow(1 - v, 3);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      createScene();
    };

    const createScene = () => {
      particles.length = 0;
      dataPoints.length = 0;
      circuits.length = 0;
      sparks.length = 0;

      const particleCount = Math.min(
        280,
        Math.max(
          120,
          Math.floor(
            (width * height) / 6200
          )
        )
      );

      for (
        let index = 0;
        index < particleCount;
        index += 1
      ) {
        particles.push({
          x: random(0, width),
          y: random(0, height),
          size: random(0.35, 1.8),
          alpha: random(0.08, 0.42),
          speed: random(0.05, 0.28),
          drift: random(-0.12, 0.12),
          phase: random(
            0,
            Math.PI * 2
          ),
        });
      }

      for (
        let index = 0;
        index < 34;
        index += 1
      ) {
        dataPoints.push({
          x: random(
            width * 0.08,
            width * 0.92
          ),
          y: random(
            height * 0.18,
            height * 0.82
          ),
          size: random(1, 2.8),
          phase: random(
            0,
            Math.PI * 2
          ),
        });
      }

      for (
        let index = 0;
        index < 26;
        index += 1
      ) {
        const side =
          index % 2 === 0
            ? -1
            : 1;

        circuits.push({
          side,
          offsetX: random(
            30,
            width * 0.26
          ),
          offsetY: random(
            -height * 0.34,
            height * 0.34
          ),
          length: random(
            80,
            260
          ),
          phase: random(
            0,
            Math.PI * 2
          ),
        });
      }

      for (
        let index = 0;
        index < 48;
        index += 1
      ) {
        sparks.push({
          angle: random(
            0,
            Math.PI * 2
          ),
          radius: random(
            70,
            Math.min(
              width,
              height
            ) * 0.55
          ),
          speed: random(
            0.0005,
            0.0025
          ),
          size: random(
            0.7,
            2.4
          ),
          alpha: random(
            0.18,
            0.72
          ),
        });
      }
    };

    const drawBackground = (time) => {
      const gradient =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.48,
          0,
          width * 0.5,
          height * 0.48,
          Math.max(
            width,
            height
          ) * 0.85
        );

      gradient.addColorStop(
        0,
        "#111a20"
      );

      gradient.addColorStop(
        0.32,
        "#091116"
      );

      gradient.addColorStop(
        0.7,
        "#04080b"
      );

      gradient.addColorStop(
        1,
        "#010203"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      const centralGlow =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          0,
          width * 0.5,
          height * 0.5,
          Math.min(
            width,
            height
          ) * 0.5
        );

      centralGlow.addColorStop(
        0,
        `rgba(175, 205, 220, ${
          0.025 +
          state.intro * 0.045
        })`
      );

      centralGlow.addColorStop(
        0.5,
        "rgba(90, 135, 155, 0.012)"
      );

      centralGlow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
      );

      ctx.fillStyle =
        centralGlow;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      ctx.save();

      const offset =
        (time * 0.012) % 80;

      ctx.globalAlpha =
        0.018 +
        state.systems * 0.012;

      ctx.strokeStyle =
        "#d8e6ec";

      ctx.lineWidth = 1;

      for (
        let x = -80;
        x <
        width + 80;
        x += 80
      ) {
        ctx.beginPath();

        ctx.moveTo(
          x + offset,
          0
        );

        ctx.lineTo(
          x -
            height +
            offset,
          height
        );

        ctx.stroke();
      }

      ctx.restore();
    };

    const drawTechnicalGrid = () => {
      const progress =
        easeOut(state.systems);

      if (progress <= 0) {
        return;
      }

      const spacing =
        Math.max(
          40,
          Math.min(
            72,
            width / 17
          )
        );

      ctx.save();

      ctx.globalAlpha =
        0.018 +
        progress * 0.05;

      ctx.strokeStyle =
        "#cbdde5";

      ctx.lineWidth = 1;

      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      for (
        let x =
          centerX % spacing;
        x < width;
        x += spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(x, 0);
        ctx.lineTo(
          x,
          height
        );

        ctx.stroke();
      }

      for (
        let x =
          centerX % spacing -
          spacing;
        x > 0;
        x -= spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(x, 0);
        ctx.lineTo(
          x,
          height
        );

        ctx.stroke();
      }

      for (
        let y =
          centerY % spacing;
        y < height;
        y += spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(0, y);
        ctx.lineTo(
          width,
          y
        );

        ctx.stroke();
      }

      for (
        let y =
          centerY % spacing -
          spacing;
        y > 0;
        y -= spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(0, y);
        ctx.lineTo(
          width,
          y
        );

        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCore = (time) => {
      const progress =
        easeOut(state.intro);

      if (progress <= 0) {
        return;
      }

      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      const pulse =
        1 +
        Math.sin(
          time * 0.0022
        ) *
          0.06;

      const radius =
        (16 +
          progress * 30) *
        pulse;

      ctx.save();

      const glow =
        ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius * 5
        );

      glow.addColorStop(
        0,
        `rgba(225, 238, 245, ${
          0.22 * progress
        })`
      );

      glow.addColorStop(
        0.2,
        `rgba(170, 205, 220, ${
          0.1 * progress
        })`
      );

      glow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
      );

      ctx.fillStyle = glow;

      ctx.fillRect(
        centerX - radius * 5,
        centerY - radius * 5,
        radius * 10,
        radius * 10
      );

      for (
        let index = 0;
        index < 4;
        index += 1
      ) {
        const ring =
          radius +
          index * 15 +
          Math.sin(
            time * 0.001 +
              index
          ) *
            1.8;

        ctx.beginPath();

        ctx.arc(
          centerX,
          centerY,
          ring,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle =
          `rgba(215, 231, 238, ${
            0.16 * progress
          })`;

        ctx.lineWidth = 1;

        ctx.stroke();
      }

      ctx.beginPath();

      ctx.arc(
        centerX,
        centerY,
        3.2 * progress,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "#edf5f8";

      ctx.fill();

      ctx.restore();
    };

    const drawMarketChart = (time) => {
      const progress =
        easeOut(state.market);

      if (progress <= 0) {
        return;
      }

      const left =
        width * 0.08;

      const right =
        width * 0.48;

      const top =
        height * 0.25;

      const bottom =
        height * 0.7;

      const chartWidth =
        right - left;

      const chartHeight =
        bottom - top;

      ctx.save();

      ctx.globalAlpha =
        progress;

      ctx.strokeStyle =
        "rgba(180, 210, 225, 0.13)";

      ctx.lineWidth = 1;

      for (
        let index = 0;
        index < 6;
        index += 1
      ) {
        const y =
          top +
          (chartHeight / 5) *
            index;

        ctx.beginPath();

        ctx.moveTo(
          left,
          y
        );

        ctx.lineTo(
          right,
          y
        );

        ctx.stroke();
      }

      for (
        let index = 0;
        index < 8;
        index += 1
      ) {
        const x =
          left +
          (chartWidth / 7) *
            index;

        ctx.beginPath();

        ctx.moveTo(
          x,
          top
        );

        ctx.lineTo(
          x,
          bottom
        );

        ctx.stroke();
      }

      const values = [
        0.72,
        0.64,
        0.69,
        0.54,
        0.61,
        0.46,
        0.5,
        0.37,
        0.43,
        0.29,
        0.35,
        0.18,
        0.25,
        0.12,
      ];

      ctx.beginPath();

      values.forEach(
        (value, index) => {
          const x =
            left +
            (chartWidth /
              (values.length - 1)) *
              index;

          const y =
            top +
            chartHeight *
              value;

          if (index === 0) {
            ctx.moveTo(
              x,
              lerp(
                bottom,
                y,
                progress
              )
            );
          } else {
            ctx.lineTo(
              x,
              lerp(
                bottom,
                y,
                progress
              )
            );
          }
        }
      );

      ctx.strokeStyle =
        "rgba(222, 237, 244, 0.82)";

      ctx.lineWidth = 1.7;

      ctx.stroke();

      values.forEach(
        (value, index) => {
          const x =
            left +
            (chartWidth /
              (values.length - 1)) *
              index;

          const targetY =
            top +
            chartHeight *
              value;

          const y =
            lerp(
              bottom,
              targetY,
              progress
            );

          ctx.beginPath();

          ctx.arc(
            x,
            y,
            1.8,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "rgba(228, 241, 247, 0.78)";

          ctx.fill();
        }
      );

      const baseline =
        bottom + 20;

      ctx.strokeStyle =
        "rgba(200, 220, 230, 0.18)";

      ctx.beginPath();

      ctx.moveTo(
        left,
        baseline
      );

      ctx.lineTo(
        right,
        baseline
      );

      ctx.stroke();

      ctx.restore();

      drawFloatingTerms(
        FINANCE_TERMS,
        -1,
        progress,
        time
      );
    };

    const drawEngineeringSystem = (
      time
    ) => {
      const progress =
        easeOut(
          state.engineering
        );

      if (progress <= 0) {
        return;
      }

      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      const right =
        width * 0.92;

      ctx.save();

      ctx.globalAlpha =
        progress;

      const baseX =
        width * 0.52;

      const baseY =
        height * 0.24;

      const nodeCount = 8;

      for (
        let index = 0;
        index < nodeCount;
        index += 1
      ) {
        const angle =
          (index /
            nodeCount) *
            Math.PI *
            2 +
          time * 0.00015;

        const radiusX =
          width * 0.23;

        const radiusY =
          height * 0.27;

        const x =
          centerX +
          Math.cos(angle) *
            radiusX;

        const y =
          centerY +
          Math.sin(angle) *
            radiusY;

        ctx.beginPath();

        ctx.moveTo(
          baseX,
          baseY
        );

        ctx.lineTo(
          x,
          y
        );

        ctx.strokeStyle =
          "rgba(190, 215, 225, 0.13)";

        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          2.2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(215, 232, 239, 0.65)";

        ctx.fill();
      }

      ctx.strokeStyle =
        "rgba(215, 231, 238, 0.22)";

      ctx.lineWidth = 1;

      const boxWidth =
        Math.min(
          230,
          width * 0.28
        );

      const boxHeight =
        Math.min(
          150,
          height * 0.22
        );

      ctx.strokeRect(
        right -
          boxWidth,
        height * 0.39,
        boxWidth,
        boxHeight
      );

      const innerRows = 5;

      for (
        let index = 0;
        index < innerRows;
        index += 1
      ) {
        const y =
          height * 0.43 +
          index * 21;

        ctx.beginPath();

        ctx.moveTo(
          right -
            boxWidth +
            18,
          y
        );

        ctx.lineTo(
          right - 28,
          y
        );

        ctx.strokeStyle =
          "rgba(205, 225, 233, 0.16)";

        ctx.stroke();
      }

      ctx.beginPath();

      ctx.arc(
        centerX,
        centerY,
        45 +
          Math.sin(
            time * 0.0015
          ) *
            3,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle =
        "rgba(215, 232, 239, 0.28)";

      ctx.stroke();

      ctx.restore();

      drawFloatingTerms(
        ENGINEERING_TERMS,
        1,
        progress,
        time
      );
    };

    const drawFloatingTerms = (
      terms,
      side,
      progress,
      time
    ) => {
      ctx.save();

      terms.forEach(
        (term, index) => {
          const angle =
            (index /
              terms.length) *
              Math.PI *
              2 +
            time *
              0.000025 *
              side;

          const radius =
            145 +
            (index % 5) * 45;

          const centerX =
            width * 0.5 +
            side *
              width *
              0.22;

          const centerY =
            height * 0.5;

          const x =
            centerX +
            Math.cos(angle) *
              radius *
              0.46 *
              progress;

          const y =
            centerY +
            Math.sin(angle) *
              radius *
              0.62 *
              progress;

          ctx.globalAlpha =
            0.14 +
            progress * 0.34;

          ctx.fillStyle =
            side < 0
              ? "#b5d2e1"
              : "#c9d8df";

          ctx.font =
            `${8 +
              (index % 3) *
                1.4}px Arial, sans-serif`;

          ctx.fillText(
            term,
            x,
            y
          );
        }
      );

      ctx.restore();
    };

    const drawCircuits = (time) => {
      const progress =
        easeOut(state.systems);

      if (progress <= 0) {
        return;
      }

      ctx.save();

      circuits.forEach(
        (circuit, index) => {
          const side =
            circuit.side;

          const originX =
            width * 0.5 +
            side *
              circuit.offsetX;

          const originY =
            height * 0.5 +
            circuit.offsetY;

          const pulse =
            0.5 +
            Math.sin(
              time * 0.001 +
                circuit.phase
            ) *
              0.5;

          const length =
            circuit.length *
            progress;

          ctx.beginPath();

          ctx.moveTo(
            originX,
            originY
          );

          ctx.lineTo(
            originX +
              side *
                length *
                0.45,
            originY
          );

          ctx.lineTo(
            originX +
              side *
                length *
                0.45,
            originY +
              (index % 2 === 0
                ? 28
                : -28)
          );

          ctx.lineTo(
            originX +
              side *
                length,
            originY +
              (index % 2 === 0
                ? 28
                : -28)
          );

          ctx.strokeStyle =
            side < 0
              ? `rgba(155, 205, 225, ${
                  0.12 +
                  pulse * 0.12
                })`
              : `rgba(195, 215, 225, ${
                  0.1 +
                  pulse * 0.12
                })`;

          ctx.lineWidth = 1;

          ctx.stroke();

          ctx.beginPath();

          ctx.arc(
            originX +
              side *
                length,
            originY +
              (index % 2 === 0
                ? 28
                : -28),
            2,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "rgba(220, 237, 244, 0.62)";

          ctx.fill();
        }
      );

      ctx.restore();
    };

    const drawDataPoints = (time) => {
      const progress =
        easeOut(
          Math.max(
            state.market,
            state.engineering,
            state.systems
          )
        );

      if (progress <= 0) {
        return;
      }

      ctx.save();

      dataPoints.forEach(
        (point, index) => {
          const pulse =
            0.5 +
            Math.sin(
              time * 0.0015 +
                point.phase
            ) *
              0.5;

          ctx.globalAlpha =
            (0.12 +
              pulse * 0.22) *
            progress;

          ctx.beginPath();

          ctx.arc(
            point.x,
            point.y,
            point.size,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            index % 2 === 0
              ? "#b8d6e4"
              : "#d2dce1";

          ctx.fill();
        }
      );

      ctx.restore();
    };

    const drawConvergence = (time) => {
      const progress =
        easeOut(
          state.convergence
        );

      if (progress <= 0) {
        return;
      }

      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      ctx.save();

      for (
        let index = 0;
        index < 64;
        index += 1
      ) {
        const angle =
          (index / 64) *
            Math.PI *
            2 +
          time * 0.00008;

        const radius =
          520 -
          progress * 470 +
          (index % 6) * 8;

        const startX =
          centerX +
          Math.cos(angle) *
            radius;

        const startY =
          centerY +
          Math.sin(angle) *
            radius *
            0.62;

        const endX =
          lerp(
            startX,
            centerX,
            progress
          );

        const endY =
          lerp(
            startY,
            centerY,
            progress
          );

        ctx.beginPath();

        ctx.moveTo(
          startX,
          startY
        );

        ctx.lineTo(
          endX,
          endY
        );

        ctx.strokeStyle =
          index % 2 === 0
            ? "rgba(165, 210, 228, 0.25)"
            : "rgba(205, 222, 231, 0.21)";

        ctx.globalAlpha =
          progress * 0.7;

        ctx.stroke();
      }

      const pulse =
        1 +
        Math.sin(
          time * 0.002
        ) *
          0.08;

      const radius =
        (18 +
          progress * 48) *
        pulse;

      const glow =
        ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius * 5
        );

      glow.addColorStop(
        0,
        `rgba(235, 245, 249, ${
          progress * 0.22
        })`
      );

      glow.addColorStop(
        0.2,
        `rgba(165, 210, 225, ${
          progress * 0.09
        })`
      );

      glow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
      );

      ctx.fillStyle = glow;

      ctx.fillRect(
        centerX - radius * 5,
        centerY - radius * 5,
        radius * 10,
        radius * 10
      );

      ctx.restore();
    };

    const drawSparks = (time) => {
      const progress =
        easeOut(
          Math.max(
            state.market,
            state.engineering,
            state.convergence
          )
        );

      if (progress <= 0) {
        return;
      }

      ctx.save();

      sparks.forEach(
        (spark) => {
          const angle =
            spark.angle +
            time * spark.speed;

          const radius =
            spark.radius *
            (0.68 +
              progress * 0.48);

          const x =
            width * 0.5 +
            Math.cos(angle) *
              radius;

          const y =
            height * 0.5 +
            Math.sin(angle) *
              radius *
              0.62;

          ctx.globalAlpha =
            spark.alpha *
            progress;

          ctx.beginPath();

          ctx.arc(
            x,
            y,
            spark.size,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "#dbeaf0";

          ctx.fill();
        }
      );

      ctx.restore();
    };

    const drawScanner = (time) => {
      const progress =
        state.systems;

      if (progress <= 0) {
        return;
      }

      const scanY =
        ((time * 0.05) %
          (height + 180)) -
        90;

      const gradient =
        ctx.createLinearGradient(
          0,
          scanY - 55,
          0,
          scanY + 55
        );

      gradient.addColorStop(
        0,
        "rgba(190, 220, 230, 0)"
      );

      gradient.addColorStop(
        0.5,
        `rgba(190, 220, 230, ${
          0.025 +
          progress * 0.035
        })`
      );

      gradient.addColorStop(
        1,
        "rgba(190, 220, 230, 0)"
      );

      ctx.fillStyle =
        gradient;

      ctx.fillRect(
        0,
        scanY - 55,
        width,
        110
      );

      ctx.strokeStyle =
        `rgba(215, 232, 239, ${
          0.06 +
          progress * 0.05
        })`;

      ctx.beginPath();

      ctx.moveTo(
        0,
        scanY
      );

      ctx.lineTo(
        width,
        scanY
      );

      ctx.stroke();
    };

    const drawParticles = (time) => {
      ctx.save();

      particles.forEach(
        (particle) => {
          particle.y -=
            particle.speed;

          particle.x +=
            particle.drift *
            0.08;

          if (particle.y < -10) {
            particle.y =
              height + 10;
          }

          if (particle.x < -10) {
            particle.x =
              width + 10;
          }

          if (
            particle.x >
            width + 10
          ) {
            particle.x = -10;
          }

          const alpha =
            particle.alpha *
            (0.55 +
              Math.sin(
                time * 0.001 +
                  particle.phase
              ) *
                0.25);

          ctx.globalAlpha =
            alpha;

          ctx.fillStyle =
            "#dce9ee";

          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      );

      ctx.restore();
    };

    const drawVignette = () => {
      const gradient =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(
            width,
            height
          ) * 0.18,
          width * 0.5,
          height * 0.5,
          Math.max(
            width,
            height
          ) * 0.76
        );

      gradient.addColorStop(
        0,
        "rgba(0, 0, 0, 0)"
      );

      gradient.addColorStop(
        0.62,
        "rgba(0, 0, 0, 0.05)"
      );

      gradient.addColorStop(
        1,
        "rgba(0, 0, 0, 0.8)"
      );

      ctx.fillStyle =
        gradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );
    };

    const render = (time) => {
      if (disposed) {
        return;
      }

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      drawBackground(time);
      drawTechnicalGrid();
      drawMarketChart(time);
      drawEngineeringSystem(time);
      drawCircuits(time);
      drawDataPoints(time);
      drawCore(time);
      drawSparks(time);
      drawConvergence(time);
      drawScanner(time);
      drawParticles(time);
      drawVignette();

      frame =
        requestAnimationFrame(
          render
        );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    frame =
      requestAnimationFrame(
        render
      );

    const gsapContext =
      gsap.context(() => {
        /*
         * La secuencia ocupa TODA la sección.
         *
         * No hacemos que la sección siguiente
         * aparezca mientras esta todavía está
         * ejecutando su narrativa.
         */
        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.05,
            },
          });

        timeline
          .to(
            state,
            {
              intro: 1,
              duration: 0.1,
              ease: "none",
            },
            0
          )
          .to(
            state,
            {
              market: 1,
              duration: 0.2,
              ease: "power2.out",
            },
            0.08
          )
          .to(
            state,
            {
              engineering: 1,
              duration: 0.2,
              ease: "power2.out",
            },
            0.23
          )
          .to(
            state,
            {
              split: 1,
              duration: 0.18,
              ease: "power2.out",
            },
            0.37
          )
          .to(
            state,
            {
              systems: 1,
              duration: 0.2,
              ease: "power2.out",
            },
            0.46
          )
          .to(
            state,
            {
              convergence: 1,
              duration: 0.23,
              ease: "power3.inOut",
            },
            0.63
          )
          .to(
            state,
            {
              final: 1,
              duration: 0.18,
              ease: "power2.out",
            },
            0.78
          )
          .to(
            state,
            {
              exit: 1,
              duration: 0.14,
              ease: "power2.in",
            },
            0.9
          );

        gsap.to(
          ".finance-technology-chapter",
          {
            opacity: 0,
            y: -45,
            scrollTrigger: {
              trigger: section,
              start: "17% top",
              end: "27% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".finance-technology-intro",
          {
            opacity: 0,
            y: -45,
            scrollTrigger: {
              trigger: section,
              start: "18% top",
              end: "31% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".finance-technology-hero",
          {
            opacity: 0,
            scale: 1.12,
            y: -35,
            scrollTrigger: {
              trigger: section,
              start: "20% top",
              end: "39% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".finance-technology-system-label",
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "28% top",
              end: "48% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".finance-technology-system-value",
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "31% top",
              end: "51% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".finance-technology-system-copy",
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: "34% top",
              end: "54% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".finance-technology-bridge",
          {
            opacity: 1,
            scaleX: 1,
            scrollTrigger: {
              trigger: section,
              start: "45% top",
              end: "62% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
        ".finance-technology-convergence",
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "57% top",
            end: "70% top",
            scrub: 1,
          },
        }
      );

      gsap.to(
        ".finance-technology-convergence-item",
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          scrollTrigger: {
            trigger: section,
            start: "60% top",
            end: "70% top",
            scrub: 1,
          },
        }
      );

      /*
      * ANÁLISIS + SISTEMAS termina completamente
      * antes de comenzar FINANZAS Y TECNOLOGÍA.
      */
      gsap.to(
        ".finance-technology-convergence",
        {
          opacity: 0,
          y: -35,
          scrollTrigger: {
            trigger: section,
            start: "70% top",
            end: "78% top",
            scrub: 1,
          },
        }
      );

      gsap.to(
        ".finance-technology-final",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "79% top",
            end: "90% top",
            scrub: 1,
          },
        }
      );

      gsap.to(
        ".finance-technology-final-meta",
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "86% top",
            end: "94% top",
            scrub: 1,
          },
        }
      );

      /*
      * El cierre también termina antes de abandonar
      * la sección para que Books entre limpio.
      */
      gsap.to(
        ".finance-technology-final",
        {
          opacity: 0,
          y: -35,
          scrollTrigger: {
            trigger: section,
            start: "94% top",
            end: "99% top",
            scrub: 1,
          },
        }
      );

      gsap.to(
        ".finance-technology-final-meta",
        {
          opacity: 0,
          y: -20,
          scrollTrigger: {
            trigger: section,
            start: "95% top",
            end: "99% top",
            scrub: 1,
          },
        }
      );

        gsap.to(
          ".finance-technology-scroll",
          {
            opacity: 0,
            y: 30,
            scrollTrigger: {
              trigger: section,
              start: "8% top",
              end: "18% top",
              scrub: 1,
            },
          }
        );
      }, section);

    return () => {
      disposed = true;

      cancelAnimationFrame(frame);

      window.removeEventListener(
        "resize",
        resize
      );

      gsapContext.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="finance-technology"
      id="finance-technology"
    >
      <div className="finance-technology-sticky">

        <canvas
          ref={canvasRef}
          className="finance-technology-canvas"
        />

        <div className="finance-technology-ui">

          <div className="finance-technology-chapter">
            <span>06</span>

            <i />

            <strong>
              FINANZAS / INGENIERÍA
            </strong>
          </div>

          <div className="finance-technology-intro">
            <span>
              SISTEMA DE ANÁLISIS
            </span>

            <strong>
              CAPITAL + TECNOLOGÍA
            </strong>

            <small>
              DATOS · SISTEMAS · DECISIONES
            </small>
          </div>

          <div className="finance-technology-hero">
            <span>
              DEL ANÁLISIS A LA CONSTRUCCIÓN
            </span>

            <h2>
              FINANZAS
              <em>/</em>
              INGENIERÍA
            </h2>

            <p>
              DATOS PARA DECIDIR.
              <br />
              SISTEMAS PARA TRANSFORMAR.
            </p>
          </div>

          <div className="finance-technology-system finance-technology-system-left">

            <div className="finance-technology-system-label">
              SISTEMA 01
            </div>

            <div className="finance-technology-system-value">
              FINANZAS
            </div>

            <p className="finance-technology-system-copy">
              MERCADO · CAPITAL · RIESGO
              <br />
              ANÁLISIS · ESTRATEGIA · VALOR
            </p>

          </div>

          <div className="finance-technology-system finance-technology-system-right">

            <div className="finance-technology-system-label">
              SISTEMA 02
            </div>

            <div className="finance-technology-system-value">
              INGENIERÍA
            </div>

            <p className="finance-technology-system-copy">
              SOFTWARE · DATOS · SISTEMAS
              <br />
              LÓGICA · AUTOMATIZACIÓN · DESARROLLO
            </p>

          </div>

          <div className="finance-technology-bridge" />

          <div className="finance-technology-convergence">

            <span>
              PUNTO DE CONVERGENCIA
            </span>

            <h3>
              ANÁLISIS
              <em>+</em>
              SISTEMAS
            </h3>

            <div className="finance-technology-convergence-grid">

              <div className="finance-technology-convergence-item">
                <strong>
                  DATOS
                </strong>

                <small>
                  INFORMACIÓN
                </small>
              </div>

              <div className="finance-technology-convergence-item">
                <strong>
                  LÓGICA
                </strong>

                <small>
                  DECISIÓN
                </small>
              </div>

              <div className="finance-technology-convergence-item">
                <strong>
                  PROCESO
                </strong>

                <small>
                  AUTOMATIZACIÓN
                </small>
              </div>

              <div className="finance-technology-convergence-item">
                <strong>
                  ESTRATEGIA
                </strong>

                <small>
                  TRANSFORMACIÓN
                </small>
              </div>

            </div>

          </div>

          <div className="finance-technology-final">

            <span>
              UNA NUEVA ETAPA PROFESIONAL
            </span>

            <h2>
              FINANZAS
              <br />
              <em>Y</em> TECNOLOGÍA
            </h2>

          </div>

          <div className="finance-technology-final-meta">

            <div>
              <strong>
                01
              </strong>

              <span>
                ANÁLISIS
              </span>
            </div>

            <i />

            <div>
              <strong>
                02
              </strong>

              <span>
                SISTEMAS
              </span>
            </div>

            <i />

            <div>
              <strong>
                01
              </strong>

              <span>
                VISIÓN
              </span>
            </div>

          </div>

          <div className="finance-technology-scroll">
            <span>
              SCROLL
            </span>

            <i />
          </div>

        </div>
      </div>
    </section>
  );
}

export default FinanceTechnology;