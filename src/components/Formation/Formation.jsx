import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/Formation/formation.css";

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   DATOS ACADÉMICOS
   ============================================================ */

const FORMATION_SCENES = [
  {
    id: "origin",
    number: "01",
    kicker: "PUNTO DE PARTIDA",
    title: "ORIGEN",
    subtitle: "EL PRIMER SISTEMA",
    period: "1997 — 1999",
    type: "origin",
    records: [
      {
        index: "01",
        year: "1997",
        degree: "TÉCNICO PROGRAMADOR",
        specialty: "ANALISTA DE SISTEMAS",
        institution: "Centro de Computación IPDATA",
        period: "1997 — 1999",
        status: ""
      }
    ]
  },

  {
    id: "foundation",
    number: "02",
    kicker: "PRIMERA EXPANSIÓN",
    title: "DOBLE FUNDAMENTO",
    subtitle: "CONTABILIDAD + DERECHO",
    period: "2007 — 2014",
    type: "foundation",
    records: [
      {
        index: "02",
        year: "2007",
        degree: "LIC. CONTADURÍA",
        specialty: "",
        institution: "Centro de Estudios Superiores Guerrero",
        period: "2007 — 2011",
        status: ""
      },
      {
        index: "03",
        year: "2009",
        degree: "LIC. DERECHO",
        specialty: "",
        institution: "UAGro",
        period: "2009 — 2014",
        status: ""
      }
    ]
  },

  {
    id: "fiscal",
    number: "03",
    kicker: "PROFUNDIZACIÓN",
    title: "ESPECIALIZACIÓN",
    subtitle: "DERECHO FISCAL + IMPUESTOS",
    period: "2011 — 2018",
    type: "fiscal",
    records: [
      {
        index: "04",
        year: "2011",
        degree: "MAESTRÍA",
        specialty: "EN DERECHO FISCAL",
        institution: "Colegio Mayor de San Carlos",
        period: "2011 — 2013",
        status: ""
      },
      {
        index: "05",
        year: "2015",
        degree: "DOCTORADO",
        specialty: "EN DERECHO FISCAL",
        institution: "Colegio Mayor de San Carlos",
        period: "2015 — 2017",
        status: ""
      },
      {
        index: "06",
        year: "2016",
        degree: "MASTER",
        specialty: "EN IMPUESTOS",
        institution: "GVA",
        period: "2016 — 2018",
        status: ""
      }
    ]
  },

  {
    id: "expansion",
    number: "04",
    kicker: "NUEVAS CAPACIDADES",
    title: "EXPANSIÓN",
    subtitle: "FINANZAS + SISTEMAS + BIOTECNOLOGÍA",
    period: "2019 — 2024",
    type: "expansion",
    records: [
      {
        index: "07",
        year: "2019",
        degree: "LIC. ADMINISTRACIÓN",
        specialty: "DE LAS FINANZAS",
        institution: "UVEG",
        period: "2019 — 2021",
        status: ""
      },
      {
        index: "08",
        year: "2021",
        degree: "INGENIERÍA",
        specialty: "EN SISTEMAS COMPUTACIONALES",
        institution: "UVEG",
        period: "2021 — 2024",
        status: ""
      },
      {
        index: "09",
        year: "2022",
        degree: "INGENIERÍA",
        specialty: "EN BIOTECNOLOGÍA",
        institution: "UNADM",
        period: "2022 — 2026",
        status: "EN CURSO"
      }
    ]
  },

  {
    id: "software",
    number: "05",
    kicker: "CONVERGENCIA",
    title: "SOFTWARE",
    subtitle: "DESARROLLO + DIRECCIÓN",
    period: "2024 — 2027",
    type: "software",
    records: [
      {
        index: "10",
        year: "2024",
        degree: "INGENIERÍA",
        specialty: "EN DESARROLLO DE SOFTWARE",
        institution: "UVEG",
        period: "2024 — 2027",
        status: "EN CURSO"
      },
      {
        index: "11",
        year: "2025",
        degree: "MAESTRÍA",
        specialty: "EN DIRECCIÓN E INGENIERÍA DE SOFTWARE",
        institution: "UTEL",
        period: "2025 — 2026",
        status: "EN CURSO"
      }
    ]
  }
];


/* ============================================================
   PARTICLES
   ============================================================ */

function createParticles(width, height, count = 170) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -(Math.random() * 0.22 + 0.03),
    radius: Math.random() * 1.2 + 0.15,
    alpha: Math.random() * 0.5 + 0.08,
    phase: Math.random() * Math.PI * 2
  }));
}


/* ============================================================
   SVG CONNECTION SYSTEM
   ============================================================ */

function ConnectionSystem({ type }) {
  if (type === "origin") {
    return (
      <svg
        className="formation-svg formation-svg-origin"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="formation-svg-path path-main"
          d="M80 640 C260 640 260 420 450 420 S690 230 1120 230"
        />

        <path
          className="formation-svg-path path-secondary"
          d="M180 720 C360 720 400 560 520 520 S760 350 1080 350"
        />

        <path
          className="formation-svg-path path-grid"
          d="M100 180 H1100 M100 300 H1100 M100 420 H1100 M100 540 H1100"
        />

        <circle
          className="formation-svg-node node-one"
          cx="450"
          cy="420"
          r="5"
        />

        <circle
          className="formation-svg-node node-two"
          cx="690"
          cy="230"
          r="5"
        />

        <circle
          className="formation-svg-node node-three"
          cx="520"
          cy="520"
          r="4"
        />

        <circle
          className="formation-origin-pulse"
          cx="80"
          cy="640"
          r="3"
        />

        <circle
          className="formation-origin-pulse pulse-two"
          cx="1080"
          cy="350"
          r="2"
        />
      </svg>
    );
  }

  if (type === "foundation") {
    return (
      <svg
        className="formation-svg formation-svg-foundation"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="formation-svg-path path-accounting"
          d="M80 640 C240 640 280 460 470 460 C560 460 600 400 600 400"
        />

        <path
          className="formation-svg-path path-law"
          d="M1120 640 C960 640 920 460 730 460 C640 460 600 400 600 400"
        />

        <path
          className="formation-svg-path path-center"
          d="M600 730 V400"
        />

        <circle
          className="formation-svg-node"
          cx="600"
          cy="400"
          r="8"
        />

        <circle
          className="formation-svg-node"
          cx="470"
          cy="460"
          r="5"
        />

        <circle
          className="formation-svg-node"
          cx="730"
          cy="460"
          r="5"
        />

        <circle
          className="formation-foundation-pulse pulse-left"
          cx="80"
          cy="640"
          r="4"
        />

        <circle
          className="formation-foundation-pulse pulse-right"
          cx="1120"
          cy="640"
          r="4"
        />

        <circle
          className="formation-foundation-core-pulse"
          cx="600"
          cy="400"
          r="14"
        />

        <line
          className="formation-svg-measure"
          x1="110"
          y1="680"
          x2="520"
          y2="680"
        />

        <line
          className="formation-svg-measure"
          x1="680"
          y1="680"
          x2="1090"
          y2="680"
        />
      </svg>
    );
  }

  if (type === "fiscal") {
    return (
      <svg
        className="formation-svg formation-svg-fiscal"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle
          className="formation-fiscal-ring ring-large"
          cx="600"
          cy="420"
          r="270"
        />

        <circle
          className="formation-fiscal-ring ring-medium"
          cx="600"
          cy="420"
          r="205"
        />

        <circle
          className="formation-fiscal-ring ring-small"
          cx="600"
          cy="420"
          r="135"
        />

        <path
          className="formation-fiscal-axis"
          d="M600 120 V720 M300 420 H900"
        />

        <path
          className="formation-fiscal-diagonal"
          d="M380 200 L820 640 M820 200 L380 640"
        />

        <circle
          className="formation-svg-node fiscal-node"
          cx="600"
          cy="420"
          r="9"
        />

        <circle
          className="formation-svg-node fiscal-node"
          cx="600"
          cy="150"
          r="4"
        />

        <circle
          className="formation-svg-node fiscal-node"
          cx="870"
          cy="420"
          r="4"
        />

        <circle
          className="formation-svg-node fiscal-node"
          cx="600"
          cy="690"
          r="4"
        />

        <circle
          className="formation-svg-node fiscal-node"
          cx="330"
          cy="420"
          r="4"
        />

        <circle
          className="formation-fiscal-pulse"
          cx="600"
          cy="150"
          r="3"
        />
      </svg>
    );
  }

  if (type === "expansion") {
    return (
      <svg
        className="formation-svg formation-svg-expansion"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="formation-branch branch-finance"
          d="M600 690 C600 580 500 510 330 430 C250 390 190 320 150 180"
        />

        <path
          className="formation-branch branch-systems"
          d="M600 690 C600 560 600 420 600 150"
        />

        <path
          className="formation-branch branch-bio"
          d="M600 690 C600 580 700 510 870 430 C950 390 1010 320 1050 180"
        />

        <circle
          className="formation-expansion-node"
          cx="150"
          cy="180"
          r="7"
        />

        <circle
          className="formation-expansion-node"
          cx="600"
          cy="150"
          r="7"
        />

        <circle
          className="formation-expansion-node"
          cx="1050"
          cy="180"
          r="7"
        />

        <circle
          className="formation-expansion-core"
          cx="600"
          cy="690"
          r="12"
        />

        <circle
          className="formation-expansion-core-inner"
          cx="600"
          cy="690"
          r="4"
        />
      </svg>
    );
  }

  return (
    <svg
      className="formation-svg formation-svg-software"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="formation-software-path software-left"
        d="M100 650 L260 650 L340 540 L470 540 L530 420"
      />

      <path
        className="formation-software-path software-center"
        d="M600 730 V420"
      />

      <path
        className="formation-software-path software-right"
        d="M1100 650 L940 650 L860 540 L730 540 L670 420"
      />

      <path
        className="formation-software-path software-top"
        d="M530 420 H670"
      />

      <rect
        className="formation-software-module module-one"
        x="245"
        y="620"
        width="30"
        height="30"
      />

      <rect
        className="formation-software-module module-two"
        x="585"
        y="390"
        width="30"
        height="30"
      />

      <rect
        className="formation-software-module module-three"
        x="925"
        y="620"
        width="30"
        height="30"
      />

      <circle
        className="formation-software-core"
        cx="600"
        cy="420"
        r="22"
      />

      <circle
        className="formation-software-core-inner"
        cx="600"
        cy="420"
        r="7"
      />
    </svg>
  );
}


/* ============================================================
   RECORD
   ============================================================ */

function FormationRecord({ record }) {
  return (
    <article className="formation-record">
      <div className="formation-record-index">
        {record.index}
      </div>

      <div className="formation-record-year">
        {record.year}
      </div>

      <div className="formation-record-body">
        <div className="formation-record-degree">
          {record.degree}
        </div>

        {record.specialty && (
          <div className="formation-record-specialty">
            {record.specialty}
          </div>
        )}

        <div className="formation-record-institution">
          {record.institution}
        </div>

        <div className="formation-record-meta">
          <span>{record.period}</span>

          {record.status && (
            <span className="formation-record-status">
              {record.status}
            </span>
          )}
        </div>
      </div>

      <div className="formation-record-marker">
        <span />
      </div>
    </article>
  );
}


/* ============================================================
   SCENE
   ============================================================ */

function FormationScene({ scene }) {
  return (
    <div
      className={`formation-scene formation-scene-${scene.type}`}
      data-scene={scene.id}
    >
      <div className="formation-scene-effects">
        <div className="formation-glow formation-glow-a" />
        <div className="formation-glow formation-glow-b" />

        <div className="formation-horizontal-line line-a" />
        <div className="formation-horizontal-line line-b" />
        <div className="formation-horizontal-line line-c" />

        <div className="formation-vertical-line line-v-a" />
        <div className="formation-vertical-line line-v-b" />

        <div className="formation-crosshair crosshair-a" />
        <div className="formation-crosshair crosshair-b" />
      </div>

      <ConnectionSystem type={scene.type} />

      <div className="formation-scene-header">
        <div className="formation-scene-label">
          <span>03</span>
          <span>FORMACIÓN</span>
        </div>

        <div className="formation-scene-period">
          {scene.period}
        </div>
      </div>

      <div className="formation-scene-title">
        <span className="formation-scene-kicker">
          {scene.kicker}
        </span>

        <h2>{scene.title}</h2>

        <p>{scene.subtitle}</p>
      </div>

      <div className="formation-records">
        {scene.records.map((record) => (
          <FormationRecord
            key={record.index}
            record={record}
          />
        ))}
      </div>

      <div className="formation-scene-large-number">
        {scene.number}
      </div>

      <div className="formation-scene-footer">
        <span>MANUEL CUAUHTÉMOC PARRA FLORES</span>
        <span>TRAYECTORIA ACADÉMICA</span>
      </div>
    </div>
  );
}


/* ============================================================
   MAIN COMPONENT
   ============================================================ */

function Formation() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(
        ".formation-scene"
      );

      const resizeCanvas = () => {
        const ratio = Math.min(
          window.devicePixelRatio || 1,
          2
        );

        canvas.width =
          window.innerWidth * ratio;

        canvas.height =
          window.innerHeight * ratio;

        canvas.style.width =
          `${window.innerWidth}px`;

        canvas.style.height =
          `${window.innerHeight}px`;

        context.setTransform(
          ratio,
          0,
          0,
          ratio,
          0,
          0
        );
      };

      resizeCanvas();

      let particles = createParticles(
        window.innerWidth,
        window.innerHeight
      );

      const renderParticles = () => {
        context.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );

        if (!reducedMotion.matches) {
          particles.forEach((particle) => {
            particle.y += particle.vy;
            particle.x += particle.vx;

            if (particle.y < -10) {
              particle.y =
                window.innerHeight + 10;

              particle.x =
                Math.random() *
                window.innerWidth;
            }

            if (particle.x < -10) {
              particle.x =
                window.innerWidth + 10;
            }

            if (
              particle.x >
              window.innerWidth + 10
            ) {
              particle.x = -10;
            }

            const pulse =
              Math.sin(
                performance.now() * 0.001 +
                particle.phase
              ) *
                0.2 +
              0.8;

            context.beginPath();

            context.arc(
              particle.x,
              particle.y,
              particle.radius,
              0,
              Math.PI * 2
            );

            context.fillStyle =
              `rgba(208, 228, 214, ${
                particle.alpha * pulse
              })`;

            context.fill();
          });

          requestAnimationFrame(
            renderParticles
          );
        }
      };

      renderParticles();

      const handleResize = () => {
        resizeCanvas();

        particles = createParticles(
          window.innerWidth,
          window.innerHeight
        );

        ScrollTrigger.refresh();
      };

      window.addEventListener(
        "resize",
        handleResize
      );


      /* ========================================================
         INITIAL STATES
         ======================================================== */

      scenes.forEach((scene) => {
        const title = scene.querySelector(
          ".formation-scene-title"
        );

        const kicker = scene.querySelector(
          ".formation-scene-kicker"
        );

        const heading = scene.querySelector(
          ".formation-scene-title h2"
        );

        const subtitle = scene.querySelector(
          ".formation-scene-title p"
        );

        const records = scene.querySelectorAll(
          ".formation-record"
        );

        const svgPaths = scene.querySelectorAll(
          ".formation-svg-path, .formation-branch, .formation-fiscal-axis, .formation-fiscal-diagonal, .formation-software-path"
        );

        const svgNodes = scene.querySelectorAll(
          ".formation-svg-node, .formation-expansion-node, .formation-expansion-core, .formation-software-core"
        );

        const largeNumber =
          scene.querySelector(
            ".formation-scene-large-number"
          );

        const header =
          scene.querySelector(
            ".formation-scene-header"
          );

        const footer =
          scene.querySelector(
            ".formation-scene-footer"
          );

        gsap.set(scene, {
          autoAlpha: 0
        });

        gsap.set(title, {
          opacity: 0,
          y: 60
        });

        gsap.set(kicker, {
          opacity: 0,
          y: 25
        });

        gsap.set(heading, {
          opacity: 0,
          y: 35,
          scale: 0.94
        });

        gsap.set(subtitle, {
          opacity: 0,
          y: 20
        });

        gsap.set(records, {
          opacity: 0,
          y: 55
        });

        gsap.set(header, {
          opacity: 0,
          y: -20
        });

        gsap.set(footer, {
          opacity: 0
        });

        gsap.set(largeNumber, {
          opacity: 0,
          scale: 1.25,
          rotation: -8
        });

        svgPaths.forEach((path) => {
          const length =
            typeof path.getTotalLength ===
            "function"
              ? path.getTotalLength()
              : 1000;

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0
          });
        });

        gsap.set(svgNodes, {
          opacity: 0,
          scale: 0
        });
      });


      /* ========================================================
         MASTER TIMELINE
         ======================================================== */

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
          pin: ".formation-sticky",
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });


      scenes.forEach((scene, index) => {
        const start = index * 1;

        const title = scene.querySelector(
          ".formation-scene-title"
        );

        const kicker = scene.querySelector(
          ".formation-scene-kicker"
        );

        const heading = scene.querySelector(
          ".formation-scene-title h2"
        );

        const subtitle = scene.querySelector(
          ".formation-scene-title p"
        );

        const records = scene.querySelectorAll(
          ".formation-record"
        );

        const paths = scene.querySelectorAll(
          ".formation-svg-path, .formation-branch, .formation-fiscal-axis, .formation-fiscal-diagonal, .formation-software-path"
        );

        const nodes = scene.querySelectorAll(
          ".formation-svg-node, .formation-expansion-node, .formation-expansion-core, .formation-software-core"
        );

        const header =
          scene.querySelector(
            ".formation-scene-header"
          );

        const footer =
          scene.querySelector(
            ".formation-scene-footer"
          );

        const largeNumber =
          scene.querySelector(
            ".formation-scene-large-number"
          );

        const glows =
          scene.querySelectorAll(
            ".formation-glow"
          );

        const horizontalLines =
          scene.querySelectorAll(
            ".formation-horizontal-line"
          );

        const verticalLines =
          scene.querySelectorAll(
            ".formation-vertical-line"
          );

        const crosshairs =
          scene.querySelectorAll(
            ".formation-crosshair"
          );

        master.to(
          scene,
          {
            autoAlpha: 1,
            duration: 0.01
          },
          start
        );

        master.to(
          header,
          {
            opacity: 1,
            y: 0,
            duration: 0.18,
            ease: "power3.out"
          },
          start
        );

        master.to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power3.out"
          },
          start + 0.04
        );

        master.to(
          kicker,
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.28em",
            duration: 0.16,
            ease: "power3.out"
          },
          start + 0.06
        );

        master.to(
          heading,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power3.out"
          },
          start + 0.09
        );

        master.to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.14,
            ease: "power2.out"
          },
          start + 0.17
        );

        master.to(
          paths,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.025,
            ease: "power2.out"
          },
          start + 0.12
        );

        master.to(
          nodes,
          {
            opacity: 1,
            scale: 1,
            duration: 0.18,
            stagger: 0.04,
            ease: "back.out(2)"
          },
          start + 0.3
        );

        master.to(
          records,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            stagger: 0.06,
            ease: "power3.out"
          },
          start + 0.32
        );

        master.to(
          largeNumber,
          {
            opacity: 0.07,
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power3.out"
          },
          start + 0.2
        );

        master.to(
          glows,
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.08
          },
          start + 0.2
        );

        master.to(
          horizontalLines,
          {
            scaleX: 1,
            opacity: 0.65,
            duration: 0.22,
            stagger: 0.04,
            ease: "power2.out"
          },
          start + 0.16
        );

        master.to(
          verticalLines,
          {
            scaleY: 1,
            opacity: 0.45,
            duration: 0.22,
            stagger: 0.04,
            ease: "power2.out"
          },
          start + 0.18
        );

        master.to(
          crosshairs,
          {
            opacity: 0.5,
            scale: 1,
            duration: 0.2,
            stagger: 0.05
          },
          start + 0.2
        );

        master.to(
          footer,
          {
            opacity: 0.55,
            duration: 0.15
          },
          start + 0.48
        );

        master.to(
          scene,
          {
            duration: 0.25
          },
          start + 0.52
        );

        if (index < scenes.length - 1) {
          master.to(
            paths,
            {
              strokeDashoffset: -300,
              opacity: 0,
              duration: 0.15,
              ease: "power2.in"
            },
            start + 0.78
          );

          master.to(
            nodes,
            {
              opacity: 0,
              scale: 0.25,
              duration: 0.12,
              stagger: 0.02
            },
            start + 0.8
          );

          master.to(
            records,
            {
              opacity: 0,
              y: -30,
              duration: 0.13,
              stagger: 0.025,
              ease: "power2.in"
            },
            start + 0.8
          );

          master.to(
            title,
            {
              opacity: 0,
              y: -40,
              duration: 0.14
            },
            start + 0.82
          );

          master.to(
            scene,
            {
              autoAlpha: 0,
              duration: 0.03
            },
            start + 0.97
          );
        }
      });


      /* ========================================================
         EFECTOS AMBIENTALES — TODAS LAS ESCENAS
         ======================================================== */

      gsap.to(
        ".formation-glow-a",
        {
          x: "8vw",
          y: "-3vh",
          scale: 1.15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-glow-b",
        {
          x: "-7vw",
          y: "4vh",
          scale: 0.88,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-svg-node",
        {
          filter:
            "drop-shadow(0 0 12px rgba(205, 235, 211, .8))",
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          stagger: 0.15,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-crosshair",
        {
          rotation: 360,
          duration: 14,
          repeat: -1,
          ease: "none"
        }
      );

      gsap.to(
        ".formation-horizontal-line",
        {
          opacity: 0.25,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          stagger: 0.25,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-record-marker span",
        {
          scale: 1.8,
          opacity: 0.2,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.15,
          ease: "sine.inOut"
        }
      );


      /* ========================================================
         ORIGEN — SISTEMA EN ACTIVIDAD
         ======================================================== */

      gsap.to(
        ".formation-origin-pulse",
        {
          attr: {
            r: 15
          },
          opacity: 0,
          duration: 2.2,
          repeat: -1,
          stagger: 0.8,
          ease: "power2.out"
        }
      );

      gsap.to(
        ".formation-svg-origin .path-main",
        {
          opacity: 0.55,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-svg-origin .path-secondary",
        {
          opacity: 0.12,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-scene-origin .formation-svg-node",
        {
          scale: 1.45,
          duration: 1.3,
          repeat: -1,
          yoyo: true,
          stagger: 0.3,
          transformOrigin: "center",
          ease: "sine.inOut"
        }
      );


      /* ========================================================
         DOBLE FUNDAMENTO — DOS SISTEMAS EN PARALELO
         ======================================================== */

      gsap.to(
        ".formation-foundation-pulse.pulse-left",
        {
          attr: {
            r: 17
          },
          opacity: 0,
          duration: 2.5,
          repeat: -1,
          ease: "power2.out"
        }
      );

      gsap.to(
        ".formation-foundation-pulse.pulse-right",
        {
          attr: {
            r: 17
          },
          opacity: 0,
          duration: 2.5,
          repeat: -1,
          delay: 1.2,
          ease: "power2.out"
        }
      );

      gsap.to(
        ".formation-foundation-core-pulse",
        {
          attr: {
            r: 34
          },
          opacity: 0,
          duration: 2.2,
          repeat: -1,
          ease: "power2.out"
        }
      );

      gsap.to(
        ".formation-svg-foundation .path-accounting",
        {
          opacity: 0.65,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-svg-foundation .path-law",
        {
          opacity: 0.6,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          delay: 0.4,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-scene-foundation .formation-svg-node",
        {
          scale: 1.35,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          stagger: 0.4,
          transformOrigin: "center",
          ease: "sine.inOut"
        }
      );


      /* ========================================================
         ESPECIALIZACIÓN — ANILLOS ACTIVOS
         ======================================================== */

      gsap.to(
        ".formation-fiscal-ring.ring-large",
        {
          rotation: 360,
          duration: 28,
          repeat: -1,
          ease: "none",
          transformOrigin: "center"
        }
      );

      gsap.to(
        ".formation-fiscal-ring.ring-medium",
        {
          rotation: -360,
          duration: 20,
          repeat: -1,
          ease: "none",
          transformOrigin: "center"
        }
      );

      gsap.to(
        ".formation-fiscal-ring.ring-small",
        {
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: "none",
          transformOrigin: "center"
        }
      );

      gsap.to(
        ".formation-fiscal-pulse",
        {
          attr: {
            r: 14
          },
          opacity: 0,
          duration: 2.4,
          repeat: -1,
          ease: "power2.out"
        }
      );

      gsap.to(
        ".formation-scene-fiscal .fiscal-node",
        {
          scale: 1.5,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
          transformOrigin: "center",
          ease: "sine.inOut"
        }
      );


      /* ========================================================
         EXPANSIÓN — RAMAS VIVAS
         ======================================================== */

      gsap.to(
        ".formation-scene-expansion .branch-finance",
        {
          opacity: 0.65,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-scene-expansion .branch-systems",
        {
          opacity: 0.85,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          delay: 0.25,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-scene-expansion .branch-bio",
        {
          opacity: 0.6,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          delay: 0.5,
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-expansion-node",
        {
          scale: 1.6,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.25,
          transformOrigin: "center",
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-expansion-core",
        {
          scale: 1.25,
          opacity: 0.45,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          transformOrigin: "center",
          ease: "sine.inOut"
        }
      );


      /* ========================================================
         SOFTWARE — ARQUITECTURA ACTIVA
         ======================================================== */

      gsap.to(
        ".formation-software-core",
        {
          scale: 1.18,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          transformOrigin: "center",
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-software-core-inner",
        {
          opacity: 0.25,
          scale: 0.65,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          transformOrigin: "center",
          ease: "sine.inOut"
        }
      );

      gsap.to(
        ".formation-software-module",
        {
          opacity: 0.25,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.3,
          ease: "sine.inOut"
        }
      );


      /* ========================================================
         PROGRESS
         ======================================================== */

      const progressFill =
        section.querySelector(
          ".formation-progress-fill"
        );

      const progressNumber =
        section.querySelector(
          ".formation-progress-number"
        );

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (progressFill) {
            progressFill.style.transform =
              `scaleY(${self.progress})`;
          }

          if (progressNumber) {
            progressNumber.textContent =
              String(
                Math.round(
                  self.progress * 100
                )
              ).padStart(3, "0");
          }
        }
      });


      /* ========================================================
         REDUCED MOTION
         ======================================================== */

      if (reducedMotion.matches) {
        scenes.forEach((scene) => {
          gsap.set(scene, {
            autoAlpha: 1
          });

          gsap.set(
            scene.querySelectorAll(
              ".formation-record, .formation-scene-title, .formation-scene-header, .formation-scene-footer"
            ),
            {
              opacity: 1,
              y: 0
            }
          );

          gsap.set(
            scene.querySelectorAll(
              ".formation-svg-path, .formation-branch, .formation-fiscal-axis, .formation-fiscal-diagonal, .formation-software-path"
            ),
            {
              strokeDashoffset: 0,
              opacity: 1
            }
          );

          gsap.set(
            scene.querySelectorAll(
              ".formation-svg-node, .formation-expansion-node, .formation-expansion-core, .formation-software-core"
            ),
            {
              opacity: 1,
              scale: 1
            }
          );
        });
      }

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener(
          "resize",
          handleResize
        );
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="formation"
      aria-label="Formación académica"
    >
      <div className="formation-sticky">

        <canvas
          ref={canvasRef}
          className="formation-canvas"
          aria-hidden="true"
        />

        <div
          className="formation-background-grid"
          aria-hidden="true"
        />

        <div
          className="formation-noise"
          aria-hidden="true"
        />

        <div
          className="formation-vignette"
          aria-hidden="true"
        />

        <div
          className="formation-scan"
          aria-hidden="true"
        />

        <header className="formation-topbar">
          <div>
            <span>03</span>
            <span>FORMACIÓN</span>
          </div>

          <div>
            <span>ACADEMIC SYSTEM</span>
          </div>

          <div>
            <span>1997 — 2027</span>
          </div>
        </header>

        <div className="formation-progress">
          <span className="formation-progress-number">
            000
          </span>

          <div className="formation-progress-track">
            <span className="formation-progress-fill" />
          </div>
        </div>

        <div className="formation-scenes">
          {FORMATION_SCENES.map((scene) => (
            <FormationScene
              key={scene.id}
              scene={scene}
            />
          ))}
        </div>

        <div className="formation-bottom">
          <span>TRAYECTORIA ACADÉMICA</span>

          <div className="formation-bottom-line">
            <span />
          </div>

          <span>11 PROGRAMAS</span>
        </div>
      </div>
    </section>
  );
}

export default Formation;