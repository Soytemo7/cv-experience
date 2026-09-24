import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/Footer/footer.css";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  "REACT",
  "JAVASCRIPT",
  "HTML5",
  "CSS3",
  "NODE.JS",
  "EXPRESS",
  "MONGODB",
  "FIREBASE",
  "GIT",
  "GITHUB",
  "VITE",
  "NPM",
  "BOOTSTRAP",
  "ANT DESIGN",
];

const NAVIGATION = [
  {
    id: "identity",
    number: "01",
    label: "IDENTIDAD",
    selector: ".identity",
  },
  {
    id: "experience",
    number: "02",
    label: "TRAYECTORIA",
    selector: ".experience",
  },
  {
    id: "about",
    number: "03",
    label: "ACERCA DE",
    selector: ".about",
  },
  {
    id: "formation",
    number: "04",
    label: "FORMACIÓN",
    selector: ".formation",
  },
  {
    id: "evolution",
    number: "05",
    label: "CURRÍCULUM VITAE",
    selector: ".evolution",
  },
  {
    id: "books",
    number: "06",
    label: "LIBROS",
    selector: ".books",
  },
  {
    id: "magazines",
    number: "07",
    label: "ARTÍCULOS",
    selector: ".magazines",
  },
  {
    id: "contact",
    number: "08",
    label: "CONTACTO",
    selector: ".contact-section",
  },
];

const PARTICLE_COUNT = 95;

function Footer() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const identityRef = useRef(null);
  const navigationRef = useRef(null);
  const technologyRef = useRef(null);
  const bottomRef = useRef(null);
  const signatureRef = useRef(null);

  const cursorRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const theme =
        root.getAttribute("data-theme");

      setIsDark(
        theme !== "light"
      );
    };

    updateTheme();

    const observer =
      new MutationObserver(
        updateTheme
      );

    observer.observe(root, {
      attributes: true,
      attributeFilter: [
        "data-theme",
      ],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section =
      sectionRef.current;

    const canvas =
      canvasRef.current;

    if (!section || !canvas) {
      return undefined;
    }

    const context =
      canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;
    let destroyed = false;

    const particles = [];

    const state = {
      progress: 0,
      entrance: 0,
      glow: 0,
      particles: 0,
      grid: 0,
      outro: 0,
    };

    const random = (
      min,
      max
    ) =>
      Math.random() *
        (max - min) +
      min;

    const resize = () => {
      width =
        window.innerWidth;

      height =
        section.offsetHeight ||
        window.innerHeight;

      dpr = Math.min(
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

      particles.length = 0;

      for (
        let index = 0;
        index <
        PARTICLE_COUNT;
        index += 1
      ) {
        particles.push({
          x: random(
            0,
            width
          ),
          y: random(
            0,
            height
          ),
          size: random(
            0.35,
            1.5
          ),
          alpha: random(
            0.08,
            0.35
          ),
          speed: random(
            0.08,
            0.38
          ),
          phase: random(
            0,
            Math.PI * 2
          ),
          depth: random(
            0.2,
            1
          ),
        });
      }
    };

    const drawBackground =
      (time) => {
        const centerX =
          width / 2 +
          cursorRef.current.x *
            28;

        const centerY =
          height * 0.43 +
          cursorRef.current.y *
            20;

        const radius =
          Math.max(
            width,
            height
          ) * 0.9;

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
          );

        if (isDark) {
          gradient.addColorStop(
            0,
            `rgba(90,120,145,${
              0.075 +
              pulse * 0.008 +
              state.glow * 0.045
            })`
          );

          gradient.addColorStop(
            0.35,
            "rgba(42,57,70,0.035)"
          );

          gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
          );
        } else {
          gradient.addColorStop(
            0,
            `rgba(90,110,125,${
              0.045 +
              state.glow * 0.025
            })`
          );

          gradient.addColorStop(
            0.45,
            "rgba(110,120,125,0.018)"
          );

          gradient.addColorStop(
            1,
            "rgba(255,255,255,0)"
          );
        }

        context.fillStyle =
          gradient;

        context.fillRect(
          0,
          0,
          width,
          height
        );
      };

    const drawGrid = () => {
      if (state.grid <= 0) {
        return;
      }

      const spacing =
        width < 700
          ? 70
          : 110;

      context.save();

      context.globalAlpha =
        0.06 *
        state.grid;

      context.lineWidth =
        0.5;

      context.strokeStyle =
        isDark
          ? "#d6e2e8"
          : "#263139";

      for (
        let x = 0;
        x <= width;
        x += spacing
      ) {
        context.beginPath();

        context.moveTo(
          x,
          0
        );

        context.lineTo(
          x,
          height
        );

        context.stroke();
      }

      for (
        let y = 0;
        y <= height;
        y += spacing
      ) {
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

    const drawParticles =
      (time) => {
        if (
          state.particles <=
          0
        ) {
          return;
        }

        context.save();

        particles.forEach(
          (
            particle,
            index
          ) => {
            const movementX =
              Math.sin(
                time *
                  0.00025 *
                  particle.speed +
                  particle.phase
              ) *
              16;

            const movementY =
              Math.cos(
                time *
                  0.00021 *
                  particle.speed +
                  particle.phase
              ) *
              12;

            let x =
              particle.x +
              movementX;

            let y =
              particle.y +
              movementY;

            const centerX =
              width / 2;

            const centerY =
              height * 0.42;

            if (
              state.outro >
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

              const force =
                state.outro *
                width *
                0.22 *
                particle.depth;

              x +=
                (dx /
                  distance) *
                force;

              y +=
                (dy /
                  distance) *
                force;
            }

            const alpha =
              particle.alpha *
              state.particles *
              (
                1 -
                state.outro *
                  0.75
              );

            context.globalAlpha =
              alpha;

            context.fillStyle =
              isDark
                ? "#c5d5de"
                : "#56636b";

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
              index % 12 === 0 &&
              state.glow >
                0.45
            ) {
              context.globalAlpha =
                alpha *
                0.25;

              context.beginPath();

              context.arc(
                x,
                y,
                particle.size *
                  4,
                0,
                Math.PI * 2
              );

              context.fill();
            }
          }
        );

        context.restore();
      };

    const drawCentralGlow =
      (time) => {
        if (
          state.glow <= 0
        ) {
          return;
        }

        const centerX =
          width / 2;

        const centerY =
          height * 0.38;

        const breathing =
          Math.sin(
            time * 0.001
          );

        const radius =
          Math.min(
            width,
            height
          ) *
          (
            0.18 +
            state.glow *
              0.09 +
            breathing *
              0.008
          );

        const gradient =
          context.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            radius
          );

        if (isDark) {
          gradient.addColorStop(
            0,
            `rgba(140,175,195,${
              0.08 *
              state.glow
            })`
          );

          gradient.addColorStop(
            0.35,
            `rgba(90,125,145,${
              0.035 *
              state.glow
            })`
          );

          gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
          );
        } else {
          gradient.addColorStop(
            0,
            `rgba(80,100,110,${
              0.035 *
              state.glow
            })`
          );

          gradient.addColorStop(
            1,
            "rgba(255,255,255,0)"
          );
        }

        context.fillStyle =
          gradient;

        context.beginPath();

        context.arc(
          centerX,
          centerY,
          radius,
          0,
          Math.PI * 2
        );

        context.fill();
      };

    const drawScan =
      (time) => {
        if (
          state.entrance <=
          0
        ) {
          return;
        }

        const progress =
          (
            time *
              0.000035 +
            state.progress *
              1.4
          ) % 1.15;

        const y =
          progress *
          height;

        const gradient =
          context.createLinearGradient(
            0,
            y - 70,
            0,
            y + 70
          );

        gradient.addColorStop(
          0,
          "rgba(255,255,255,0)"
        );

        gradient.addColorStop(
          0.5,
          isDark
            ? `rgba(190,215,225,${
                0.018 *
                state.entrance
              })`
            : `rgba(30,40,45,${
                0.012 *
                state.entrance
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
          y - 70,
          width,
          140
        );
      };

    const draw = (time) => {
      if (destroyed) {
        return;
      }

      context.clearRect(
        0,
        0,
        width,
        height
      );

      const cursor =
        cursorRef.current;

      cursor.x +=
        (
          cursor.targetX -
          cursor.x
        ) *
        0.05;

      cursor.y +=
        (
          cursor.targetY -
          cursor.y
        ) *
        0.05;

      drawBackground(time);
      drawGrid();
      drawCentralGlow(time);
      drawParticles(time);
      drawScan(time);

      animationFrame =
        requestAnimationFrame(
          draw
        );
    };

    const pointerMove =
      (event) => {
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

    const pointerLeave =
      () => {
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
        draw
      );

    const ctx =
      gsap.context(
        () => {
          gsap.set(
            eyebrowRef.current,
            {
              opacity: 0,
              y: 22,
            }
          );

          gsap.set(
            titleRef.current,
            {
              opacity: 0,
              y: 70,
              scale: 0.94,
            }
          );

          gsap.set(
            subtitleRef.current,
            {
              opacity: 0,
              y: 25,
            }
          );

          gsap.set(
            identityRef.current,
            {
              opacity: 0,
              y: 35,
            }
          );

          gsap.set(
            navigationRef.current,
            {
              opacity: 0,
              y: 35,
            }
          );

          gsap.set(
            technologyRef.current,
            {
              opacity: 0,
              y: 30,
            }
          );

          gsap.set(
            bottomRef.current,
            {
              opacity: 0,
              y: 25,
            }
          );

          gsap.set(
            signatureRef.current,
            {
              opacity: 0,
              scale: 0.92,
            }
          );

          const items =
            technologyRef.current?.querySelectorAll(
              ".footer-tech-item"
            );

          if (items) {
            gsap.set(
              items,
              {
                opacity: 0,
                y: 12,
              }
            );
          }

          const navItems =
            navigationRef.current?.querySelectorAll(
              ".footer-nav-item"
            );

          if (navItems) {
            gsap.set(
              navItems,
              {
                opacity: 0,
                x: -14,
              }
            );
          }

          const timeline =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                end: "bottom 88%",
                scrub: 1.05,
                invalidateOnRefresh: true,
                onUpdate: (
                  self
                ) => {
                  state.progress =
                    self.progress;
                },
              },
            });

          timeline.to(
            state,
            {
              entrance: 1,
              duration: 0.16,
              ease: "none",
            },
            0
          );

          timeline.to(
            state,
            {
              grid: 1,
              particles: 1,
              duration: 0.28,
              ease: "power2.out",
            },
            0
          );

          timeline.to(
            state,
            {
              glow: 1,
              duration: 0.25,
              ease: "power2.out",
            },
            0.08
          );

          timeline.to(
            eyebrowRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.18,
              ease: "power3.out",
            },
            0.02
          );

          timeline.to(
            titleRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.32,
              ease: "power4.out",
            },
            0.08
          );

          timeline.to(
            subtitleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.18,
              ease: "power3.out",
            },
            0.22
          );

          timeline.to(
            identityRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "power3.out",
            },
            0.30
          );

          timeline.to(
            navigationRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "power3.out",
            },
            0.38
          );

          if (navItems) {
            timeline.to(
              navItems,
              {
                opacity: 1,
                x: 0,
                stagger: 0.025,
                duration: 0.12,
                ease: "power3.out",
              },
              0.42
            );
          }

          timeline.to(
            technologyRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "power3.out",
            },
            0.55
          );

          if (items) {
            timeline.to(
              items,
              {
                opacity: 1,
                y: 0,
                stagger: 0.018,
                duration: 0.09,
                ease: "power3.out",
              },
              0.58
            );
          }

          timeline.to(
            bottomRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.18,
              ease: "power3.out",
            },
            0.76
          );

          timeline.to(
            signatureRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.18,
              ease: "back.out(1.4)",
            },
            0.82
          );

          timeline.to(
            state,
            {
              glow: 0.35,
              duration: 0.12,
              ease: "power2.out",
            },
            0.9
          );

          timeline.to(
            state,
            {
              outro: 0.35,
              duration: 0.1,
              ease: "power2.in",
            },
            0.94
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
  }, [isDark]);

  const scrollToSection =
  (event, selector) => {
    event.preventDefault();

    const target =
      document.querySelector(
        selector
      );

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }; 

  return (
    <footer
      ref={sectionRef}
      className={`footer ${
        isDark
          ? "footer-dark"
          : "footer-light"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="footer-canvas"
      />

      <div className="footer-noise" />

      <div className="footer-grid-overlay" />

      <div className="footer-horizontal-line footer-horizontal-line-top" />

      <div className="footer-horizontal-line footer-horizontal-line-bottom" />

      <div className="footer-inner">

        <header className="footer-header">

          <div
            ref={eyebrowRef}
            className="footer-eyebrow"
          >
            <span>
              09 / FINAL SECTION
            </span>

            <i />

            <strong>
              PORTFOLIO 2026
            </strong>
          </div>

          <div className="footer-title-block">

            <h2
              ref={titleRef}
              className="footer-title"
            >
              MANUEL
              <span>PARRA</span>
            </h2>

            <p
              ref={subtitleRef}
              className="footer-subtitle"
            >
              CONTADOR · ABOGADO
              <br />
              TECNOLOGÍA · SOFTWARE · IA
            </p>

          </div>

        </header>

        <div className="footer-main-grid">

          <section
            ref={identityRef}
            className="footer-identity"
          >
            <div className="footer-section-label">
              <span>01</span>
              <strong>IDENTIDAD</strong>
            </div>

            <div className="footer-identity-line" />

            <p>
              Profesional independiente
              con una trayectoria construida
              entre contabilidad, derecho,
              finanzas y tecnología.
            </p>

            <p>
              Una evolución continua desde
              los sistemas y la programación
              hasta el desarrollo de software
              y la inteligencia artificial.
            </p>

            <div className="footer-identity-meta">
              <span>13 AÑOS</span>
              <span>EXPERIENCIA</span>
            </div>
          </section>

          <section
            ref={navigationRef}
            className="footer-navigation"
          >
            <div className="footer-section-label">
              <span>02</span>
              <strong>NAVEGACIÓN</strong>
            </div>

          <div className="footer-nav-list">

              {NAVIGATION.map(
                (item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="footer-nav-item"
                    onClick={(event) =>
                      scrollToSection(
                        event,
                        item.selector
                      )
                    }
                  >
                    <span>
                      {item.number}
                    </span>

                    <strong>
                      {item.label}
                    </strong>

                    <i>↗</i>
                  </a>
                )
              )}

            </div>
        
          </section>

        </div>

        <section
          ref={technologyRef}
          className="footer-technology"
        >
          <div className="footer-section-label">
            <span>03</span>
            <strong>STACK TECNOLÓGICO</strong>
          </div>

          <div className="footer-tech-list">

            {TECH_STACK.map(
              (
                technology,
                index
              ) => (
                <span
                  key={technology}
                  className="footer-tech-item"
                >
                  <small>
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </small>

                  {technology}
                </span>
              )
            )}

          </div>
        </section>

        <div
          ref={bottomRef}
          className="footer-bottom"
        >

          <div className="footer-status">
            <span className="footer-status-dot" />

            <span>
              SYSTEM ONLINE
            </span>
          </div>

          <div className="footer-location">
            CHILPANCINGO · GUERRERO · MÉXICO
          </div>

          <div className="footer-year">
            © {new Date().getFullYear()}
            {" "}
            MANUEL PARRA
          </div>

        </div>

        <div className="footer-signature-wrapper">

          <div className="footer-signature-line" />

          <div
            ref={signatureRef}
            className="footer-signature"
          >
            <span>
              CONTADOR
            </span>

            <i />

            <span>
              ABOGADO
            </span>

            <i />

            <span>
              DESARROLLADOR
            </span>
          </div>

          <div className="footer-signature-line" />

        </div>

        <div className="footer-credits">
          <span>
            Diseño y adaptación
          </span>

          <strong>
            MANUEL PARRA
          </strong>
        </div>

      </div>
    </footer>
  );
}

export default Footer;