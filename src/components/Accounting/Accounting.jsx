import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/Accounting/accounting.css";

gsap.registerPlugin(ScrollTrigger);


const ACCOUNTING_TERMS = [
  "ACTIVO",
  "PASIVO",
  "CAPITAL",
  "INGRESOS",
  "EGRESOS",
  "FLUJO",
  "BALANCE",
  "COSTOS",
  "RESULTADOS",
  "IMPUESTOS",
  "PATRIMONIO",
  "ANÁLISIS",
];

const LEGAL_TERMS = [
  "FISCAL",
  "DEFENSA",
  "LITIGIO",
  "PRUEBA",
  "NORMA",
  "CRITERIO",
  "ESTRATEGIA",
  "PROCEDIMIENTO",
  "ARGUMENTACIÓN",
  "ADMINISTRATIVO",
  "CIVIL",
  "MERCANTIL",
];

function Accounting() {
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
      network: 0,
      split: 0,
      accounting: 0,
      legal: 0,
      convergence: 0,
      typography: 0,
      exit: 0,
    };

    const particles = [];
    const nodes = [];
    const sparks = [];

    const random = (min, max) =>
      Math.random() * (max - min) + min;

    const lerp = (a, b, amount) =>
      a + (b - a) * amount;

    const clamp = (value, min = 0, max = 1) =>
      Math.max(min, Math.min(max, value));

    const easeOut = (value) => {
      const v = clamp(value);
      return 1 - Math.pow(1 - v, 3);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

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
      nodes.length = 0;
      sparks.length = 0;

      const particleCount = Math.min(
        260,
        Math.max(
          120,
          Math.floor((width * height) / 6500)
        )
      );

      for (let index = 0; index < particleCount; index += 1) {
        particles.push({
          x: random(0, width),
          y: random(0, height),
          size: random(0.35, 1.7),
          alpha: random(0.12, 0.5),
          speed: random(0.08, 0.38),
          drift: random(-0.18, 0.18),
          phase: random(0, Math.PI * 2),
        });
      }

      for (let index = 0; index < 92; index += 1) {
        const angle =
          (index / 92) *
            Math.PI *
            2 +
          random(-0.08, 0.08);

        const radius = random(80, 310);

        nodes.push({
          angle,
          radius,
          size: random(1, 3),
          phase: random(0, Math.PI * 2),
          side:
            index % 2 === 0
              ? -1
              : 1,
        });
      }

      for (let index = 0; index < 38; index += 1) {
        sparks.push({
          angle: random(0, Math.PI * 2),
          radius: random(40, 340),
          speed: random(0.001, 0.004),
          size: random(1, 2.6),
          alpha: random(0.3, 0.9),
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
          Math.max(width, height) * 0.8
        );

      gradient.addColorStop(
        0,
        "#151b20"
      );

      gradient.addColorStop(
        0.3,
        "#0b1014"
      );

      gradient.addColorStop(
        0.7,
        "#05080b"
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

      const glow =
        ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          0,
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.36
        );

      glow.addColorStop(
        0,
        `rgba(170, 195, 210, ${
          0.035 +
          state.intro * 0.035
        })`
      );

      glow.addColorStop(
        0.5,
        "rgba(80, 110, 130, 0.018)"
      );

      glow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
      );

      ctx.fillStyle = glow;
      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      ctx.save();

      ctx.globalAlpha = 0.025;

      const offset =
        (time * 0.008) %
        70;

      for (
        let x = -70;
        x < width + 70;
        x += 70
      ) {
        ctx.beginPath();

        ctx.moveTo(
          x + offset,
          0
        );

        ctx.lineTo(
          x - height + offset,
          height
        );

        ctx.strokeStyle =
          "#dce6ec";

        ctx.lineWidth = 1;

        ctx.stroke();
      }

      ctx.restore();
    };

    const drawGrid = () => {
      const progress =
        clamp(state.network);

      if (progress <= 0) {
        return;
      }

      ctx.save();

      const spacing =
        Math.max(
          42,
          Math.min(70, width / 18)
        );

      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      ctx.globalAlpha =
        0.025 +
        progress * 0.055;

      ctx.strokeStyle =
        "#d8e1e7";

      ctx.lineWidth = 1;

      for (
        let x = centerX % spacing;
        x < width;
        x += spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);

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
        ctx.lineTo(x, height);

        ctx.stroke();
      }

      for (
        let y = centerY % spacing;
        y < height;
        y += spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(0, y);
        ctx.lineTo(width, y);

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
        ctx.lineTo(width, y);

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
        Math.sin(time * 0.002) *
          0.08;

      const radius =
        (22 +
          progress * 46) *
        pulse;

      ctx.save();

      const glow =
        ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius * 4
        );

      glow.addColorStop(
        0,
        `rgba(225, 235, 242, ${
          0.28 * progress
        })`
      );

      glow.addColorStop(
        0.18,
        `rgba(185, 210, 225, ${
          0.13 * progress
        })`
      );

      glow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
      );

      ctx.fillStyle = glow;

      ctx.fillRect(
        centerX - radius * 4,
        centerY - radius * 4,
        radius * 8,
        radius * 8
      );

      ctx.strokeStyle =
        `rgba(220, 230, 236, ${
          0.28 * progress
        })`;

      ctx.lineWidth = 1;

      for (
        let index = 0;
        index < 3;
        index += 1
      ) {
        const ring =
          radius +
          index * 17 +
          Math.sin(
            time * 0.001 +
              index
          ) *
            2;

        ctx.beginPath();

        ctx.arc(
          centerX,
          centerY,
          ring,
          0,
          Math.PI * 2
        );

        ctx.stroke();
      }

      ctx.fillStyle =
        "#edf3f6";

      ctx.beginPath();

      ctx.arc(
        centerX,
        centerY,
        3.5 * progress,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();
    };

    const getNodePosition = (
      node,
      time
    ) => {
      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      const split =
        easeOut(state.split);

      let angle =
        node.angle +
        time *
          0.000035 *
          (node.side === 1
            ? 1
            : -1);

      let radius =
        node.radius;

      if (split > 0) {
        radius +=
          split *
          (node.side === 1
            ? width * 0.17
            : width * 0.15);
      }

      const sideOffset =
        split *
        node.side *
        width *
        0.055;

      return {
        x:
          centerX +
          Math.cos(angle) *
            radius +
          sideOffset,

        y:
          centerY +
          Math.sin(angle) *
            radius *
            0.62,
      };
    };

    const drawNetwork = (time) => {
      const progress =
        easeOut(state.network);

      if (progress <= 0) {
        return;
      }

      ctx.save();

      const positions =
        nodes.map((node) =>
          getNodePosition(
            node,
            time
          )
        );

      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      ctx.globalAlpha =
        0.18 * progress;

      ctx.lineWidth = 1;

      for (
        let index = 0;
        index < positions.length;
        index += 1
      ) {
        const position =
          positions[index];

        const distance =
          Math.hypot(
            position.x -
              centerX,
            position.y -
              centerY
          );

        if (distance > 400) {
          continue;
        }

        ctx.beginPath();

        ctx.moveTo(
          centerX,
          centerY
        );

        ctx.lineTo(
          position.x,
          position.y
        );

        ctx.strokeStyle =
          index % 2 === 0
            ? "rgba(190, 215, 228, 0.28)"
            : "rgba(220, 225, 215, 0.18)";

        ctx.stroke();
      }

      for (
        let index = 0;
        index <
        positions.length - 1;
        index += 1
      ) {
        const current =
          positions[index];

        const next =
          positions[index + 1];

        const distance =
          Math.hypot(
            current.x -
              next.x,
            current.y -
              next.y
          );

        if (distance < 100) {
          ctx.beginPath();

          ctx.moveTo(
            current.x,
            current.y
          );

          ctx.lineTo(
            next.x,
            next.y
          );

          ctx.strokeStyle =
            "rgba(205, 220, 230, 0.16)";

          ctx.stroke();
        }
      }

      positions.forEach(
        (position, index) => {
          const node =
            nodes[index];

          ctx.beginPath();

          ctx.arc(
            position.x,
            position.y,
            node.size,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            index % 2 === 0
              ? "rgba(205, 225, 235, 0.72)"
              : "rgba(225, 220, 205, 0.56)";

          ctx.globalAlpha =
            0.18 +
            progress * 0.65;

          ctx.fill();
        }
      );

      ctx.restore();
    };

    const drawOrbitals = (time) => {
      const progress =
        easeOut(
          Math.max(
            state.network,
            state.split
          )
        );

      if (progress <= 0) {
        return;
      }

      const centerX =
        width * 0.5;

      const centerY =
        height * 0.5;

      ctx.save();

      ctx.translate(
        centerX,
        centerY
      );

      ctx.rotate(
        time * 0.00008
      );

      const orbitWidth =
        width *
        (0.28 +
          progress * 0.22);

      const orbitHeight =
        height *
        (0.16 +
          progress * 0.1);

      for (
        let index = 0;
        index < 5;
        index += 1
      ) {
        ctx.beginPath();

        const currentOrbitWidth = Math.max(
          12,
          orbitWidth - index * 55
        );

        const currentOrbitHeight = Math.max(
          8,
          orbitHeight - index * 24
        );

        ctx.ellipse(
          0,
          0,
          currentOrbitWidth,
          currentOrbitHeight,
          index * 0.23,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle =
          `rgba(210, 225, 235, ${
            0.025 +
            progress * 0.055
          })`;

        ctx.lineWidth = 1;

        ctx.stroke();
      }

      ctx.restore();
    };

    const drawAccountingSystem = (
      time
    ) => {
      const progress =
        easeOut(state.accounting);

      if (progress <= 0) {
        return;
      }

      const left =
        width * 0.18;

      const right =
        width * 0.5;

      const centerY =
        height * 0.5;

      ctx.save();

      ctx.globalAlpha =
        progress;

      ctx.strokeStyle =
        "rgba(192, 220, 232, 0.22)";

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.moveTo(
        left,
        centerY
      );

      ctx.bezierCurveTo(
        width * 0.28,
        height * 0.28,
        width * 0.34,
        height * 0.24,
        right,
        centerY
      );

      ctx.stroke();

      ctx.beginPath();

      ctx.moveTo(
        left,
        centerY
      );

      ctx.bezierCurveTo(
        width * 0.28,
        height * 0.72,
        width * 0.34,
        height * 0.76,
        right,
        centerY
      );

      ctx.stroke();

      const chartX =
        width * 0.1;

      const chartY =
        height * 0.65;

      const chartWidth =
        width * 0.28;

      const chartHeight =
        height * 0.22;

      ctx.strokeStyle =
        "rgba(210, 225, 232, 0.14)";

      ctx.beginPath();

      ctx.moveTo(
        chartX,
        chartY
      );

      ctx.lineTo(
        chartX + chartWidth,
        chartY
      );

      ctx.stroke();

      const values = [
        0.22,
        0.31,
        0.26,
        0.48,
        0.42,
        0.61,
        0.54,
        0.76,
        0.69,
        0.87,
      ];

      ctx.beginPath();

      values.forEach(
        (value, index) => {
          const x =
            chartX +
            (chartWidth /
              (values.length - 1)) *
              index;

          const y =
            chartY -
            chartHeight *
              value *
              progress;

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      );

      ctx.strokeStyle =
        "rgba(220, 235, 242, 0.65)";

      ctx.lineWidth = 1.5;

      ctx.stroke();

      for (
        let index = 0;
        index < values.length;
        index += 1
      ) {
        const x =
          chartX +
          (chartWidth /
            (values.length - 1)) *
            index;

        const y =
          chartY -
          chartHeight *
            values[index] *
            progress;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(225, 238, 244, 0.8)";

        ctx.fill();
      }

      const bars = 8;

      for (
        let index = 0;
        index < bars;
        index += 1
      ) {
        const value =
          0.25 +
          Math.abs(
            Math.sin(index * 1.7)
          ) *
            0.65;

        const barWidth =
          chartWidth / bars * 0.45;

        const x =
          chartX +
          index *
            (chartWidth / bars);

        const barHeight =
          chartHeight *
          value *
          progress;

        ctx.fillStyle =
          "rgba(180, 207, 220, 0.12)";

        ctx.fillRect(
          x,
          chartY -
            barHeight,
          barWidth,
          barHeight
        );
      }

      ctx.restore();

      drawFloatingTerms(
        ACCOUNTING_TERMS,
        -1,
        progress,
        time
      );
    };

    const drawLegalSystem = (time) => {
      const progress =
        easeOut(state.legal);

      if (progress <= 0) {
        return;
      }

      const left =
        width * 0.5;

      const right =
        width * 0.82;

      const centerY =
        height * 0.5;

      ctx.save();

      ctx.globalAlpha =
        progress;

      ctx.strokeStyle =
        "rgba(225, 220, 205, 0.2)";

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.moveTo(
        left,
        centerY
      );

      ctx.bezierCurveTo(
        width * 0.66,
        height * 0.28,
        width * 0.73,
        height * 0.24,
        right,
        centerY
      );

      ctx.stroke();

      ctx.beginPath();

      ctx.moveTo(
        left,
        centerY
      );

      ctx.bezierCurveTo(
        width * 0.66,
        height * 0.72,
        width * 0.73,
        height * 0.76,
        right,
        centerY
      );

      ctx.stroke();

      const top =
        height * 0.27;

      const bottom =
        height * 0.73;

      const axisX =
        width * 0.84;

      ctx.strokeStyle =
        "rgba(225, 220, 205, 0.14)";

      ctx.beginPath();

      ctx.moveTo(
        axisX,
        top
      );

      ctx.lineTo(
        axisX,
        bottom
      );

      ctx.stroke();

      for (
        let index = 0;
        index < 9;
        index += 1
      ) {
        const y =
          top +
          ((bottom - top) /
            8) *
            index;

        const lineWidth =
          index % 3 === 0
            ? width * 0.13
            : width * 0.08;

        ctx.beginPath();

        ctx.moveTo(
          axisX -
            lineWidth,
          y
        );

        ctx.lineTo(
          axisX,
          y
        );

        ctx.strokeStyle =
          "rgba(225, 220, 205, 0.18)";

        ctx.stroke();
      }

      ctx.beginPath();

      ctx.arc(
        axisX,
        height * 0.5,
        38 +
          Math.sin(
            time * 0.001
          ) *
            3,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle =
        "rgba(235, 228, 210, 0.32)";

      ctx.stroke();

      ctx.beginPath();

      ctx.arc(
        axisX,
        height * 0.5,
        7,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "rgba(238, 231, 216, 0.72)";

      ctx.fill();

      ctx.restore();

      drawFloatingTerms(
        LEGAL_TERMS,
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
      if (!terms.length) {
        return;
      }

      ctx.save();

      terms.forEach(
        (term, index) => {
          const angle =
            (index / terms.length) *
              Math.PI *
              2 +
            time *
              0.00003 *
              side;

          const radius =
            150 +
            (index % 5) * 54;

          const centerX =
            width * 0.5 +
            side *
              width *
              0.18;

          const centerY =
            height * 0.5;

          const x =
            centerX +
            Math.cos(angle) *
              radius *
              0.48 *
              progress;

          const y =
            centerY +
            Math.sin(angle) *
              radius *
              0.58 *
              progress;

          ctx.globalAlpha =
            0.18 +
            progress * 0.38;

          ctx.fillStyle =
            side < 0
              ? "#b8d1df"
              : "#d2cbbd";

          ctx.font =
            `${8 +
              (index % 3) * 1.5}px Arial, sans-serif`;

          ctx.letterSpacing = "1px";

          ctx.fillText(
            term,
            x,
            y
          );
        }
      );

      ctx.restore();
    };

    const drawSparks = (time) => {
      const progress =
        easeOut(
          Math.max(
            state.network,
            state.split
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
            (0.65 +
              progress * 0.55);

          const x =
            width * 0.5 +
            Math.cos(angle) *
              radius;

          const y =
            height * 0.5 +
            Math.sin(angle) *
              radius *
              0.65;

          ctx.beginPath();

          ctx.arc(
            x,
            y,
            spark.size,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "rgba(225, 235, 240, 0.8)";

          ctx.globalAlpha =
            spark.alpha *
            progress;

          ctx.fill();
        }
      );

      ctx.restore();
    };

    const drawScanner = (time) => {
      const progress =
        state.network;

      if (progress <= 0) {
        return;
      }

      const scanY =
        ((time * 0.055) %
          (height + 200)) -
        100;

      const gradient =
        ctx.createLinearGradient(
          0,
          scanY - 50,
          0,
          scanY + 50
        );

      gradient.addColorStop(
        0,
        "rgba(210, 225, 235, 0)"
      );

      gradient.addColorStop(
        0.5,
        `rgba(210, 225, 235, ${
          0.035 +
          progress * 0.035
        })`
      );

      gradient.addColorStop(
        1,
        "rgba(210, 225, 235, 0)"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        scanY - 50,
        width,
        100
      );

      ctx.strokeStyle =
        `rgba(220, 230, 236, ${
          0.08 +
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

    const drawConvergence = (
      time
    ) => {
      const progress =
        easeOut(state.convergence);

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
        index < 46;
        index += 1
      ) {
        const side =
          index % 2 === 0
            ? -1
            : 1;

        const angle =
          (index / 46) *
            Math.PI *
            2;

        const radius =
          480 -
          progress * 430 +
          (index % 5) * 10;

        const startX =
          centerX +
          Math.cos(angle) *
            radius;

        const startY =
          centerY +
          Math.sin(angle) *
            radius *
            0.62;

        const endX = lerp(
          startX,
          centerX,
          progress
        );

        const endY = lerp(
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
          side < 0
            ? "rgba(185, 215, 230, 0.28)"
            : "rgba(225, 215, 195, 0.23)";

        ctx.globalAlpha =
          progress * 0.7;

        ctx.stroke();
      }

      const flash =
        Math.pow(
          progress,
          8
        );

      if (flash > 0.02) {
        const glow =
          ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            220
          );

        glow.addColorStop(
          0,
          `rgba(240, 245, 248, ${
            flash * 0.2
          })`
        );

        glow.addColorStop(
          1,
          "rgba(240, 245, 248, 0)"
        );

        ctx.fillStyle = glow;

        ctx.fillRect(
          centerX - 220,
          centerY - 220,
          440,
          440
        );
      }

      ctx.restore();
    };

    const drawParticles = (
      time
    ) => {
      ctx.save();

      particles.forEach(
        (particle) => {
          particle.y -=
            particle.speed;

          particle.x +=
            particle.drift *
            0.1;

          if (particle.y < -10) {
            particle.y =
              height + 10;
          }

          if (
            particle.x < -10
          ) {
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
            (0.5 +
              Math.sin(
                time *
                  0.001 +
                  particle.phase
              ) *
                0.25);

          ctx.globalAlpha =
            alpha;

          ctx.fillStyle =
            "#dce6eb";

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
          ) * 0.16,
          width * 0.5,
          height * 0.5,
          Math.max(
            width,
            height
          ) * 0.72
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
        "rgba(0, 0, 0, 0.78)"
      );

      ctx.fillStyle = gradient;

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
      drawGrid();
      drawNetwork(time);
      drawOrbitals(time);
      drawAccountingSystem(time);
      drawLegalSystem(time);
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
        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.15,
            },
          });

        timeline
          .to(
            state,
            {
              intro: 1,
              duration: 0.12,
              ease: "none",
            },
            0
          )
          .to(
            state,
            {
              network: 1,
              duration: 0.2,
              ease: "none",
            },
            0.08
          )
          .to(
            state,
            {
              split: 1,
              duration: 0.2,
              ease: "power2.out",
            },
            0.22
          )
          .to(
            state,
            {
              accounting: 1,
              duration: 0.22,
              ease: "power2.out",
            },
            0.3
          )
          .to(
            state,
            {
              legal: 1,
              duration: 0.22,
              ease: "power2.out",
            },
            0.38
          )
          .to(
            state,
            {
              convergence: 1,
              duration: 0.28,
              ease: "power3.inOut",
            },
            0.66
          )
          .to(
            state,
            {
              typography: 1,
              duration: 0.16,
              ease: "power2.out",
            },
            0.78
          )
          .to(
            state,
            {
              exit: 1,
              duration: 0.18,
              ease: "power2.in",
            },
            0.9
          );

        gsap.to(
          ".accounting-chapter",
          {
            opacity: 0,
            y: -50,
            scrollTrigger: {
              trigger: section,
              start: "18% top",
              end: "31% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-intro",
          {
            opacity: 0,
            y: -50,
            scrollTrigger: {
              trigger: section,
              start: "17% top",
              end: "30% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-hero",
          {
            opacity: 0,
            scale: 1.15,
            y: -40,
            scrollTrigger: {
              trigger: section,
              start: "19% top",
              end: "42% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-system-label",
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "24% top",
              end: "44% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-system-value",
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "27% top",
              end: "48% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-experience",
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: "46% top",
              end: "62% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-experience-item",
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            scrollTrigger: {
              trigger: section,
              start: "48% top",
              end: "68% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-final",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: section,
              start: "73% top",
              end: "90% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-final-meta",
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: "82% top",
              end: "94% top",
              scrub: 1,
            },
          }
        );

        gsap.to(
          ".accounting-scroll",
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
      className="accounting"
    >
      <div className="accounting-sticky">

        <canvas
          ref={canvasRef}
          className="accounting-canvas"
        />

        <div className="accounting-ui">

          <div className="accounting-chapter">
            <span>05</span>

            <i />

            <strong>
              EXPERIENCIA
            </strong>
          </div>

          <div className="accounting-intro">
            <span>
              SISTEMA PROFESIONAL
            </span>

            <strong>
              ANÁLISIS
            </strong>

            <small>
              DATOS · NORMA · ESTRATEGIA
            </small>
          </div>

          <div className="accounting-hero">

            <span>
              UNA TRAYECTORIA
            </span>

            <h2>
              CONTADOR
              <em>/</em>
              ABOGADO
            </h2>

            <p>
              DOS DISCIPLINAS.
              <br />
              UNA MISMA FORMA DE PENSAR.
            </p>

          </div>

          <div className="accounting-system accounting-system-left">

            <div className="accounting-system-label">
              SISTEMA 01
            </div>

            <div className="accounting-system-value">
              CONTABILIDAD
            </div>

            <p>
              INFORMACIÓN FINANCIERA
              <br />
              CONTROL · ANÁLISIS · PRECISIÓN
            </p>

          </div>

          <div className="accounting-system accounting-system-right">

            <div className="accounting-system-label">
              SISTEMA 02
            </div>

            <div className="accounting-system-value">
              DERECHO
            </div>

            <p>
              NORMA · LITIGIO
              <br />
              DEFENSA · ESTRATEGIA
            </p>

          </div>

          <div className="accounting-experience">

            <span>
              CAMPO DE EXPERIENCIA
            </span>

            <div className="accounting-experience-grid">

              <div className="accounting-experience-item">
                <strong>
                  FISCAL
                </strong>

                <small>
                  TRIBUTACIÓN
                </small>
              </div>

              <div className="accounting-experience-item">
                <strong>
                  ADMINISTRATIVO
                </strong>

                <small>
                  PROCEDIMIENTO
                </small>
              </div>

              <div className="accounting-experience-item">
                <strong>
                  CIVIL
                </strong>

                <small>
                  PATRIMONIO
                </small>
              </div>

              <div className="accounting-experience-item">
                <strong>
                  MERCANTIL
                </strong>

                <small>
                  NEGOCIOS
                </small>
              </div>

              <div className="accounting-experience-item">
                <strong>
                  LABORAL
                </strong>

                <small>
                  RELACIONES
                </small>
              </div>

              <div className="accounting-experience-item">
                <strong>
                  FAMILIAR
                </strong>

                <small>
                  PATRIMONIO
                </small>
              </div>

              <div className="accounting-experience-item">
                <strong>
                  FINANZAS
                </strong>

                <small>
                  ANÁLISIS
                </small>
              </div>

            </div>

          </div>

          <div className="accounting-final">

            <span>
              EXPERIENCIA CONSTRUIDA
            </span>

            <h2>
              CONTADOR
              <br />
              <em>Y</em> ABOGADO
            </h2>

          </div>

          <div className="accounting-final-meta">

            <div>
              <strong>
                13
              </strong>

              <span>
                AÑOS
              </span>
            </div>

            <i />

            <div>
              <strong>
                02
              </strong>

              <span>
                DISCIPLINAS
              </span>
            </div>

            <i />

            <div>
              <strong>
                360°
              </strong>

              <span>
                VISIÓN
              </span>
            </div>

          </div>

          <div className="accounting-scroll">
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

export default Accounting;