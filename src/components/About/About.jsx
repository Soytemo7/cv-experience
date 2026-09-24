import {
  useEffect,
  useRef
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger
} from "gsap/ScrollTrigger";

import "../../styles/About/about.css";

gsap.registerPlugin(
  ScrollTrigger
);

const BASE_URL =
  import.meta.env.BASE_URL;

const PARTICLE_COUNT = 170;
const CONNECTION_DISTANCE = 135;
const LIGHT_COUNT = 12;
const GRID_SIZE = 90;
const SCAN_COUNT = 5;

function clamp(
  value,
  min,
  max
) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

function random(
  min,
  max
) {
  return (
    Math.random() *
      (max - min) +
    min
  );
}

function createParticle(
  width,
  height
) {
  return {
    x: random(0, width),
    y: random(0, height),
    vx: random(-0.08, 0.08),
    vy: random(-0.08, 0.08),
    size: random(0.35, 1.7),
    alpha: random(0.18, 0.65),
    depth: random(0.15, 1),
    phase: random(
      0,
      Math.PI * 2
    )
  };
}

function createLight(
  width,
  height
) {
  return {
    x: random(
      -width,
      width
    ),
    y: random(
      0,
      height
    ),
    width: random(
      80,
      240
    ),
    speed: random(
      0.12,
      0.38
    ),
    alpha: random(
      0.025,
      0.085
    ),
    depth: random(
      0.3,
      1
    ),
    angle: random(
      -0.18,
      0.18
    )
  };
}

function About() {
  const sectionRef =
    useRef(null);

  const canvasRef =
    useRef(null);

  const atmosphereRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const headerRef =
    useRef(null);

  const eyebrowRef =
    useRef(null);

  const titleRef =
    useRef(null);

  const titleGhostRef =
    useRef(null);

  const titleLineRef =
    useRef(null);

  const introductionRef =
    useRef(null);

  const paragraphRefs =
    useRef([]);

  const profileRef =
    useRef(null);

  const visualRef =
    useRef(null);

  const profileNumberRef =
    useRef(null);

  const profileLabelRef =
    useRef(null);

  const imageWrapperRef =
    useRef(null);

  const imageRef =
    useRef(null);

  const imageFrameRef =
    useRef(null);

  const imageFrameInnerRef =
    useRef(null);

  const imageGlowRef =
    useRef(null);

  const imageSweepRef =
    useRef(null);

  const visualLineTopRef =
    useRef(null);

  const visualLineRightRef =
    useRef(null);

  const visualLineBottomRef =
    useRef(null);

  const visualLineLeftRef =
    useRef(null);

  const detailsRef =
    useRef(null);

  const nameRef =
    useRef(null);

  const professionalRef =
    useRef(null);

  const summaryRef =
    useRef(null);

  const dataRef =
    useRef(null);

  const contactRef =
    useRef(null);

  const closingRef =
    useRef(null);

  const closingLineLeftRef =
    useRef(null);

  const closingLineRightRef =
    useRef(null);

  const mouseRef =
    useRef({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    });

  const particlesRef =
    useRef([]);

  const lightsRef =
    useRef([]);

  useEffect(() => {
    const section =
      sectionRef.current;

    const canvas =
      canvasRef.current;

    if (
      !section ||
      !canvas
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
    let animationFrame = 0;

    const resizeCanvas =
      () => {
        width =
          window.innerWidth;

        height =
          window.innerHeight;

        const ratio =
          Math.min(
            window.devicePixelRatio ||
              1,
            2
          );

        canvas.width =
          width * ratio;

        canvas.height =
          height * ratio;

        canvas.style.width =
          `${width}px`;

        canvas.style.height =
          `${height}px`;

        context.setTransform(
          ratio,
          0,
          0,
          ratio,
          0,
          0
        );

        particlesRef.current =
          Array.from(
            {
              length:
                PARTICLE_COUNT
            },
            () =>
              createParticle(
                width,
                height
              )
          );

        lightsRef.current =
          Array.from(
            {
              length:
                LIGHT_COUNT
            },
            () =>
              createLight(
                width,
                height
              )
          );
      };

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    const drawBase =
      () => {
        context.clearRect(
          0,
          0,
          width,
          height
        );

        context.fillStyle =
          "#070707";

        context.fillRect(
          0,
          0,
          width,
          height
        );

        const radial =
          context.createRadialGradient(
            width * 0.5,
            height * 0.43,
            0,
            width * 0.5,
            height * 0.43,
            Math.max(
              width,
              height
            ) * 0.72
          );

        radial.addColorStop(
          0,
          "rgba(255,255,255,0.055)"
        );

        radial.addColorStop(
          0.32,
          "rgba(255,255,255,0.018)"
        );

        radial.addColorStop(
          1,
          "rgba(255,255,255,0)"
        );

        context.fillStyle =
          radial;

        context.fillRect(
          0,
          0,
          width,
          height
        );
      };

    const drawGrid =
      (time) => {
        const mouse =
          mouseRef.current;

        const offsetX =
          mouse.x * 18 +
          Math.sin(
            time * 0.00015
          ) * 8;

        const offsetY =
          mouse.y * 12 +
          Math.cos(
            time * 0.00013
          ) * 6;

        context.save();

        context.translate(
          offsetX,
          offsetY
        );

        context.strokeStyle =
          "rgba(255,255,255,0.028)";

        context.lineWidth = 1;

        const startX =
          -GRID_SIZE -
          (
            (
              offsetX %
                GRID_SIZE
            ) +
              GRID_SIZE
          ) %
            GRID_SIZE;

        const startY =
          -GRID_SIZE -
          (
            (
              offsetY %
                GRID_SIZE
            ) +
              GRID_SIZE
          ) %
            GRID_SIZE;

        for (
          let x = startX;
          x <
          width +
            GRID_SIZE;
          x += GRID_SIZE
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
          let y = startY;
          y <
          height +
            GRID_SIZE;
          y += GRID_SIZE
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

    const drawPerspective =
      (time) => {
        const mouse =
          mouseRef.current;

        const centerX =
          width * 0.5 +
          mouse.x * 30;

        const centerY =
          height * 0.52 +
          mouse.y * 20;

        context.save();

        context.strokeStyle =
          "rgba(255,255,255,0.035)";

        context.lineWidth = 1;

        for (
          let i = -9;
          i <= 9;
          i++
        ) {
          const spread =
            Math.abs(i) *
            95;

          context.beginPath();

          context.moveTo(
            centerX +
              i * 8,
            centerY
          );

          context.lineTo(
            centerX +
              i * 8 +
              spread,
            height
          );

          context.stroke();
        }

        for (
          let i = 1;
          i <= 7;
          i++
        ) {
          const distance =
            Math.pow(
              i / 7,
              1.8
            );

          const y =
            centerY +
            (
              height -
              centerY
            ) *
              distance;

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

        const pulse =
          (
            Math.sin(
              time * 0.0012
            ) + 1
          ) *
          0.5;

        context.beginPath();

        context.arc(
          centerX,
          centerY,
          2 +
            pulse * 3,
          0,
          Math.PI * 2
        );

        context.fillStyle =
          `rgba(255,255,255,${
            0.12 +
            pulse * 0.12
          })`;

        context.fill();

        context.restore();
      };

    const drawConnections =
      () => {
        const particles =
          particlesRef.current;

        for (
          let i = 0;
          i <
          particles.length;
          i++
        ) {
          const first =
            particles[i];

          for (
            let j = i + 1;
            j <
            particles.length;
            j++
          ) {
            const second =
              particles[j];

            const dx =
              first.x -
              second.x;

            const dy =
              first.y -
              second.y;

            const distance =
              Math.sqrt(
                dx * dx +
                  dy * dy
              );

            if (
              distance >
              CONNECTION_DISTANCE
            ) {
              continue;
            }

            const alpha =
              (
                1 -
                distance /
                  CONNECTION_DISTANCE
              ) *
              0.075 *
              Math.min(
                first.depth,
                second.depth
              );

            context.beginPath();

            context.moveTo(
              first.x,
              first.y
            );

            context.lineTo(
              second.x,
              second.y
            );

            context.strokeStyle =
              `rgba(255,255,255,${alpha})`;

            context.lineWidth =
              0.45;

            context.stroke();
          }
        }
      };

    const drawParticles =
      (time) => {
        const mouse =
          mouseRef.current;

        particlesRef.current.forEach(
          (
            particle,
            index
          ) => {
            particle.x +=
              particle.vx *
              particle.depth;

            particle.y +=
              particle.vy *
              particle.depth;

            if (
              particle.x <
              -20
            ) {
              particle.x =
                width + 20;
            }

            if (
              particle.x >
              width + 20
            ) {
              particle.x =
                -20;
            }

            if (
              particle.y <
              -20
            ) {
              particle.y =
                height + 20;
            }

            if (
              particle.y >
              height + 20
            ) {
              particle.y =
                -20;
            }

            const wave =
              Math.sin(
                time * 0.0007 +
                  particle.phase +
                  index
              );

            const x =
              particle.x +
              mouse.x *
                25 *
                particle.depth;

            const y =
              particle.y +
              mouse.y *
                18 *
                particle.depth;

            const alpha =
              particle.alpha *
              (
                0.72 +
                wave * 0.28
              );

            context.beginPath();

            context.arc(
              x,
              y,
              particle.size,
              0,
              Math.PI * 2
            );

            context.fillStyle =
              `rgba(255,255,255,${alpha})`;

            context.fill();

            if (
              particle.depth >
              0.78
            ) {
              context.beginPath();

              context.moveTo(
                x,
                y
              );

              context.lineTo(
                x -
                  particle.vx *
                    35,
                y -
                  particle.vy *
                    35
              );

              context.strokeStyle =
                `rgba(255,255,255,${
                  alpha * 0.2
                })`;

              context.lineWidth =
                0.5;

              context.stroke();
            }
          }
        );
      };

    const drawLights =
      (time) => {
        const mouse =
          mouseRef.current;

        lightsRef.current.forEach(
          (
            light,
            index
          ) => {
            light.x +=
              light.speed;

            if (
              light.x >
              width +
                light.width
            ) {
              light.x =
                -light.width -
                random(
                  0,
                  width
                );
            }

            const y =
              light.y +
              mouse.y *
                25 *
                light.depth;

            const x =
              light.x +
              mouse.x *
                35 *
                light.depth;

            const gradient =
              context.createLinearGradient(
                x,
                y,
                x +
                  light.width,
                y +
                  Math.sin(
                    light.angle
                  ) *
                    light.width
              );

            const pulse =
              (
                Math.sin(
                  time * 0.0008 +
                    index
                ) + 1
              ) *
              0.5;

            gradient.addColorStop(
              0,
              "rgba(255,255,255,0)"
            );

            gradient.addColorStop(
              0.5,
              `rgba(255,255,255,${
                light.alpha *
                (
                  0.65 +
                  pulse * 0.35
                )
              })`
            );

            gradient.addColorStop(
              1,
              "rgba(255,255,255,0)"
            );

            context.save();

            context.rotate(
              light.angle
            );

            context.fillStyle =
              gradient;

            context.fillRect(
              x,
              y,
              light.width,
              1
            );

            context.restore();
          }
        );
      };

    const drawScanner =
      (time) => {
        const cycle =
          (
            time * 0.00008
          ) % 1;

        const y =
          cycle *
          height;

        const gradient =
          context.createLinearGradient(
            0,
            y - 45,
            0,
            y + 45
          );

        gradient.addColorStop(
          0,
          "rgba(255,255,255,0)"
        );

        gradient.addColorStop(
          0.5,
          "rgba(255,255,255,0.035)"
        );

        gradient.addColorStop(
          1,
          "rgba(255,255,255,0)"
        );

        context.fillStyle =
          gradient;

        context.fillRect(
          0,
          y - 45,
          width,
          90
        );

        for (
          let i = 0;
          i < SCAN_COUNT;
          i++
        ) {
          const scanY =
            (
              y +
              i * 90
            ) %
            height;

          context.fillStyle =
            "rgba(255,255,255,0.012)";

          context.fillRect(
            0,
            scanY,
            width,
            1
          );
        }
      };

    const drawVignette =
      () => {
        const gradient =
          context.createRadialGradient(
            width * 0.5,
            height * 0.5,
            Math.min(
              width,
              height
            ) * 0.2,
            width * 0.5,
            height * 0.5,
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
          0.72,
          "rgba(0,0,0,0.16)"
        );

        gradient.addColorStop(
          1,
          "rgba(0,0,0,0.72)"
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

    const render =
      (time) => {
        const mouse =
          mouseRef.current;

        mouse.x +=
          (
            mouse.targetX -
            mouse.x
          ) *
          0.035;

        mouse.y +=
          (
            mouse.targetY -
            mouse.y
          ) *
          0.035;

        drawBase();
        drawGrid(time);
        drawPerspective(time);
        drawConnections();
        drawLights(time);
        drawParticles(time);
        drawScanner(time);
        drawVignette();

        animationFrame =
          requestAnimationFrame(
            render
          );
      };

    animationFrame =
      requestAnimationFrame(
        render
      );

    const handlePointerMove =
      (event) => {
        const rect =
          section.getBoundingClientRect();

        mouseRef.current.targetX =
          clamp(
            (
              (
                event.clientX -
                rect.left
              ) /
                rect.width -
              0.5
            ) * 2,
            -1,
            1
          );

        mouseRef.current.targetY =
          clamp(
            (
              (
                event.clientY -
                rect.top
              ) /
                rect.height -
              0.5
            ) * 2,
            -1,
            1
          );
      };

    const handlePointerLeave =
      () => {
        mouseRef.current.targetX =
          0;

        mouseRef.current.targetY =
          0;
      };

    section.addEventListener(
      "pointermove",
      handlePointerMove
    );

    section.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    const ctx =
      gsap.context(
        () => {
          /*
           * =====================================================
           * ESTADO INICIAL
           * =====================================================
           */

          gsap.set(
            atmosphereRef.current,
            {
              opacity: 0
            }
          );

          gsap.set(
            contentRef.current,
            {
              opacity: 1
            }
          );

          gsap.set(
            headerRef.current,
            {
              opacity: 0,
              y: 90
            }
          );

          gsap.set(
            eyebrowRef.current,
            {
              opacity: 0,
              x: -40
            }
          );

          gsap.set(
            titleRef.current,
            {
              opacity: 0,
              y: 90,
              clipPath:
                "inset(100% 0 0 0)"
            }
          );

          gsap.set(
            titleGhostRef.current,
            {
              opacity: 0,
              x: 80
            }
          );

          gsap.set(
            titleLineRef.current,
            {
              scaleX: 0,
              transformOrigin:
                "left center"
            }
          );

          /*
           * =====================================================
           * INTRODUCCIÓN
           *
           * 0-5 = PÁRRAFOS
           * 6   = LISTA
           * 7   = CIERRE
           * =====================================================
           */

          const introParagraphs =
            paragraphRefs.current.filter(
              Boolean
            );

          const introBooks =
            paragraphRefs.current[6]?.querySelectorAll(
              "li"
            ) || [];

          const introClosing =
            paragraphRefs.current[7];

          /*
           * PÁRRAFOS
           */

          gsap.set(
            introParagraphs.filter(
              (element) =>
                element !==
                paragraphRefs.current[6] &&
                element !==
                paragraphRefs.current[7]
            ),
            {
              opacity: 0,
              y: 52,
              x: -28,
              filter:
                "blur(8px)",
              clipPath:
                "inset(0 0 100% 0)",
              "--intro-line":
                0
            }
          );

          /*
           * LISTA COMPLETA
           *
           * El UL nunca se deja invisible.
           */

          gsap.set(
            paragraphRefs.current[6],
            {
              opacity: 1,
              y: 0,
              x: 0,
              clearProps:
                "filter,clipPath",
              "--intro-line":
                1
            }
          );

          /*
           * LIBROS INDIVIDUALES
           */

          gsap.set(
            introBooks,
            {
              opacity: 0,
              y: 34,
              x: -25,
              filter:
                "blur(7px)",
              clipPath:
                "inset(0 0 100% 0)",
              "--book-line":
                0
            }
          );

          /*
           * ÚLTIMO PÁRRAFO
           */

          gsap.set(
            introClosing,
            {
              opacity: 0,
              y: 58,
              x: 24,
              filter:
                "blur(8px)",
              clipPath:
                "inset(0 0 100% 0)",
              "--intro-line":
                0
            }
          );

          /*
           * PERFIL
           */

          gsap.set(
            profileRef.current,
            {
              opacity: 0,
              y: 100
            }
          );

          gsap.set(
            imageWrapperRef.current,
            {
              opacity: 0,
              x: -100,
              scale: 0.78,
              rotateY: -22,
              rotateX: 10
            }
          );

          gsap.set(
            imageFrameRef.current,
            {
              opacity: 0,
              x: 70,
              y: -50,
              rotate: 12,
              scale: 1.2
            }
          );

          gsap.set(
            imageFrameInnerRef.current,
            {
              opacity: 0,
              scale: 1.15
            }
          );

          gsap.set(
            imageGlowRef.current,
            {
              opacity: 0,
              scale: 0.45
            }
          );

          gsap.set(
            imageSweepRef.current,
            {
              xPercent: -130,
              opacity: 0
            }
          );

          gsap.set(
            [
              visualLineTopRef.current,
              visualLineBottomRef.current
            ],
            {
              opacity: 0,
              scaleX: 0
            }
          );

          gsap.set(
            [
              visualLineLeftRef.current,
              visualLineRightRef.current
            ],
            {
              opacity: 0,
              scaleY: 0
            }
          );

          gsap.set(
            profileNumberRef.current,
            {
              opacity: 0,
              x: -25
            }
          );

          gsap.set(
            profileLabelRef.current,
            {
              opacity: 0,
              x: 25
            }
          );

          gsap.set(
            detailsRef.current,
            {
              opacity: 0,
              x: 90
            }
          );

          gsap.set(
            nameRef.current,
            {
              opacity: 0,
              y: 40
            }
          );

          gsap.set(
            professionalRef.current,
            {
              opacity: 0,
              y: 35
            }
          );

          gsap.set(
            summaryRef.current,
            {
              opacity: 0,
              y: 30
            }
          );

          gsap.set(
            dataRef.current?.children ||
              [],
            {
              opacity: 0,
              y: 24
            }
          );

          gsap.set(
            contactRef.current,
            {
              opacity: 0,
              y: 20
            }
          );

          gsap.set(
            closingRef.current,
            {
              opacity: 0,
              y: 80
            }
          );

          gsap.set(
            [
              closingLineLeftRef.current,
              closingLineRightRef.current
            ],
            {
              scaleX: 0
            }
          );

          /*
           * =====================================================
           * ENTRADA INICIAL
           * =====================================================
           */

          const entrance =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                toggleActions:
                  "play none none none",
                once: true,
                invalidateOnRefresh:
                  true
              }
            });

          entrance
            /*
             * ATMÓSFERA
             */

            .to(
              atmosphereRef.current,
              {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
              }
            )

            /*
             * CABECERA
             */

            .to(
              headerRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
              },
              "<"
            )

            .to(
              eyebrowRef.current,
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out"
              },
              "-=0.55"
            )

            .to(
              titleGhostRef.current,
              {
                opacity: 0.18,
                x: 0,
                duration: 0.65,
                ease: "power3.out"
              },
              "<"
            )

            .to(
              titleRef.current,
              {
                opacity: 1,
                y: 0,
                clipPath:
                  "inset(0% 0 0 0)",
                duration: 1,
                ease: "power4.out"
              },
              "-=0.35"
            )

            .to(
              titleLineRef.current,
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power3.out"
              },
              "-=0.55"
            )

            /*
             * =================================================
             * INTRODUCCIÓN
             * =================================================
             */

            .to(
              introParagraphs.slice(
                0,
                6
              ),
              {
                opacity: 1,
                x: 0,
                y: 0,
                filter:
                  "blur(0px)",
                clipPath:
                  "inset(0% 0 0 0)",
                "--intro-line":
                  1,
                duration: 0.85,
                stagger: 0.22,
                ease: "power4.out"
              },
              "-=0.18"
            )

            /*
             * =================================================
             * LIBROS
             * =================================================
             */

            .to(
              introBooks,
              {
                opacity: 1,
                x: 0,
                y: 0,
                filter:
                  "blur(0px)",
                clipPath:
                  "inset(0% 0 0 0)",
                "--book-line":
                  1,
                duration: 0.65,
                stagger: 0.14,
                ease: "power3.out"
              },
              "-=0.20"
            )

            /*
             * =================================================
             * CIERRE DE INTRODUCCIÓN
             * =================================================
             */

            .to(
              introClosing,
              {
                opacity: 1,
                x: 0,
                y: 0,
                filter:
                  "blur(0px)",
                clipPath:
                  "inset(0% 0 0 0)",
                "--intro-line":
                  1,
                duration: 0.95,
                ease: "power4.out"
              },
              "-=0.10"
            );

          /*
           * =====================================================
           * PERFIL
           * =====================================================
           */

          const profileEntrance =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  profileRef.current,
                start: "top 82%",
                end: "top 28%",
                scrub: 1,
                invalidateOnRefresh:
                  true
              }
            });

          profileEntrance
            .to(
              profileRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
              }
            )

            .to(
              imageGlowRef.current,
              {
                opacity: 0.72,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              },
              "<"
            )

            .to(
              imageFrameRef.current,
              {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 4,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.4)"
              },
              "<0.1"
            )

            .to(
              imageWrapperRef.current,
              {
                opacity: 1,
                x: 0,
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                duration: 1,
                ease: "power4.out"
              },
              "-=0.45"
            )

            .to(
              imageFrameInnerRef.current,
              {
                opacity: 1,
                scale: 1,
                duration: 0.55
              },
              "-=0.55"
            )

            .to(
              [
                visualLineTopRef.current,
                visualLineBottomRef.current
              ],
              {
                opacity: 1,
                scaleX: 1,
                duration: 0.65,
                stagger: 0.1
              },
              "-=0.4"
            )

            .to(
              [
                visualLineLeftRef.current,
                visualLineRightRef.current
              ],
              {
                opacity: 1,
                scaleY: 1,
                duration: 0.65,
                stagger: 0.1
              },
              "-=0.5"
            )

            .to(
              profileNumberRef.current,
              {
                opacity: 1,
                x: 0,
                duration: 0.35
              }
            )

            .to(
              profileLabelRef.current,
              {
                opacity: 1,
                x: 0,
                duration: 0.35
              },
              "<"
            )

            .to(
              imageSweepRef.current,
              {
                opacity: 1,
                xPercent: 130,
                duration: 1.15,
                ease: "power2.inOut"
              }
            );

          /*
           * =====================================================
           * INFORMACIÓN
           * =====================================================
           */

          const detailsEntrance =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  detailsRef.current,
                start: "top 84%",
                end: "top 30%",
                scrub: 1,
                invalidateOnRefresh:
                  true
              }
            });

          detailsEntrance
            .to(
              detailsRef.current,
              {
                opacity: 1,
                x: 0,
                duration: 0.75,
                ease: "power3.out"
              }
            )

            .to(
              nameRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out"
              }
            )

            .to(
              professionalRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.45
              }
            )

            .to(
              summaryRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.5
              }
            )

            .to(
              dataRef.current?.children ||
                [],
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.09,
                ease: "power3.out"
              }
            )

            .to(
              contactRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.4
              }
            );

          /*
           * =====================================================
           * CIERRE
           * =====================================================
           */

          const closingEntrance =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  closingRef.current,
                start: "top 88%",
                end: "top 48%",
                scrub: 1,
                invalidateOnRefresh:
                  true
              }
            });

          closingEntrance
            .to(
              closingRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out"
              }
            )

            .to(
              closingLineLeftRef.current,
              {
                scaleX: 1,
                duration: 0.55
              },
              "<0.15"
            )

            .to(
              closingLineRightRef.current,
              {
                scaleX: 1,
                duration: 0.55
              },
              "<"
            );

          /*
           * =====================================================
           * SALIDA
           * =====================================================
           */

          const exit =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "bottom 13%",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh:
                  true
              }
            });

          exit
            .to(
              atmosphereRef.current,
              {
                opacity: 0.35,
                duration: 1,
                ease: "power2.in"
              }
            )

            .to(
              [
                titleRef.current,
                titleGhostRef.current
              ],
              {
                y: -35,
                opacity: 0,
                duration: 0.7,
                ease: "power3.in"
              },
              "<"
            )

            .to(
              introductionRef.current,
              {
                y: -45,
                opacity: 0,
                duration: 0.7,
                ease: "power3.in"
              },
              "<"
            )

            .to(
              imageWrapperRef.current,
              {
                x: -45,
                y: -35,
                scale: 0.94,
                rotateY: -8,
                opacity: 0,
                duration: 0.85,
                ease: "power3.in"
              },
              "<"
            )

            .to(
              imageFrameRef.current,
              {
                x: -75,
                y: -60,
                rotate: -4,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in"
              },
              "<"
            )

            .to(
              detailsRef.current,
              {
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in"
              },
              "<"
            )

            .to(
              closingRef.current,
              {
                y: 50,
                opacity: 0,
                duration: 0.75,
                ease: "power3.in"
              },
              "<0.1"
            )

            .to(
              contentRef.current,
              {
                y: -25,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
              }
            );

          /*
           * =====================================================
           * PARALLAX VISUAL
           * =====================================================
           */

          gsap.to(
            visualRef.current,
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger:
                  profileRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
              }
            }
          );

          /*
           * =====================================================
           * PARALLAX INTRO
           * =====================================================
           */

          gsap.to(
            introductionRef.current,
            {
              xPercent: -1.5,
              ease: "none",
              scrollTrigger: {
                trigger:
                  introductionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
              }
            }
          );

          /*
           * =====================================================
           * MOVIMIENTO CONTINUO DE LA IMAGEN
           * =====================================================
           */

          gsap.to(
            imageRef.current,
            {
              y: -12,
              scale: 1.015,
              ease: "none",
              scrollTrigger: {
                trigger:
                  profileRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4
              }
            }
          );

          ScrollTrigger.refresh();
        },
        section
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      section.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      section.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about"
    >
      <canvas
        ref={canvasRef}
        className="about-canvas"
      />     

      <div
        ref={atmosphereRef}
        className="about-atmosphere"
      />

      <div
        ref={contentRef}
        className="about-content"
      >
        <header
          ref={headerRef}
          className="about-header"
        >
          <div className="about-header-meta">
            <span ref={eyebrowRef}>
              PERFIL PROFESIONAL
            </span>

            <span>
              01 — 06
            </span>
          </div>

          <div className="about-title-wrapper">
            <span
              ref={titleGhostRef}
              className="about-title-ghost"
            >
              ABOUT
            </span>

            <h2
              ref={titleRef}
              className="about-title"
            >
              Acerca de
              <span>...</span>
            </h2>

            <div
              ref={titleLineRef}
              className="about-title-line"
            />
          </div>
        </header>

        <div
          ref={introductionRef}
          className="about-introduction"
        >
          <p
            ref={(element) => {
              paragraphRefs.current[0] =
                element;
            }}
          >
            Técnico Programador Analista de Sistemas, Licenciado en
            Administración de las Finanzas, Licenciado en Contaduría
            Pública, Licenciado en Derecho e Ingeniero en Computación,
            con formación especializada en tecnologías de información,
            desarrollo de software, análisis de sistemas, transformación
            digital y aplicación de soluciones tecnológicas en los
            ámbitos financiero, administrativo y fiscal.
          </p>

          <p
            ref={(element) => {
              paragraphRefs.current[1] =
                element;
            }}
          >
            Actualmente cursa Ingeniería en Desarrollo de Software y la
            Maestría en Dirección e Ingeniería de Software, fortaleciendo
            sus competencias en programación, arquitectura de software,
            innovación tecnológica y automatización de procesos.
          </p>

          <p
            ref={(element) => {
              paragraphRefs.current[2] =
                element;
            }}
          >
            Es Contador Público certificado, Maestro en Derecho Fiscal,
            Master en Impuestos y Doctor en Derecho Fiscal, integrando
            una visión multidisciplinaria que combina tecnología,
            finanzas, contabilidad, administración y derecho.
          </p>

          <p
            ref={(element) => {
              paragraphRefs.current[3] =
                element;
            }}
          >
            Se desempeña como catedrático a nivel licenciatura en las
            áreas de Ingeniería en Computación, Derecho, Administración
            y Contaduría Pública, así como en programas de Maestría y
            Doctorado.
          </p>

          <p
            ref={(element) => {
              paragraphRefs.current[4] =
                element;
            }}
          >
            Actualmente ejerce como abogado y contador público
            independiente, además de desarrollar actividades relacionadas
            con análisis financiero y mercados bursátiles.
          </p>

          <p
            ref={(element) => {
              paragraphRefs.current[5] =
                element;
            }}
          >
            Es articulista de diversas revistas fiscales de circulación
            nacional e internacional y coautor de los libros:
          </p>

          <ul
            className="about-books"
            ref={(element) => {
              paragraphRefs.current[6] =
                element;
            }}
          >
            <li>
              Defensa Fiscal. Estrategias básicas de impugnación en el
              juicio contencioso administrativo ante el TFJA.
            </li>

            <li>
              Revisiones electrónicas. La nueva facultad de las
              autoridades fiscales.
            </li>

            <li>
              Praxis del juicio contencioso administrativo en línea.
            </li>

            <li>
              Defensa Fiscal. Conceptos de impugnación
              ganadores/perdedores ante el TFJA.
            </li>

            <li>
              Estudio práctico del Régimen Opcional para Grupos de
              Sociedades.
            </li>
          </ul>

          <p
            ref={(element) => {
              paragraphRefs.current[7] =
                element;
            }}
          >
            Ha participado como ponente en temas de tecnología aplicada
            a los negocios, transformación digital, sistemas de
            información, finanzas, fiscalidad y administración,
            destacando por la integración del conocimiento tecnológico
            con las áreas jurídica, contable y empresarial.
          </p>
        </div>

        <div
          ref={profileRef}
          className="about-profile"
        >
          <div
            ref={visualRef}
            className="about-profile-visual"
          >
            <div
              ref={profileNumberRef}
              className="about-profile-number"
            >
              01
            </div>

            <div
              ref={profileLabelRef}
              className="about-profile-label"
            >
              MANUEL
              <br />
              PARRA
            </div>

            <div
              ref={visualLineTopRef}
              className="about-visual-line about-visual-line-top"
            />

            <div
              ref={visualLineRightRef}
              className="about-visual-line about-visual-line-right"
            />

            <div
              ref={visualLineBottomRef}
              className="about-visual-line about-visual-line-bottom"
            />

            <div
              ref={visualLineLeftRef}
              className="about-visual-line about-visual-line-left"
            />

            <div
              ref={imageWrapperRef}
              className="about-image-wrapper"
            >
              <div
                ref={imageGlowRef}
                className="about-image-glow"
              />

              <div
                ref={imageFrameRef}
                className="about-image-frame"
              />

              <div
                ref={imageFrameInnerRef}
                className="about-image-frame-inner"
              />

              <div
                ref={imageSweepRef}
                className="about-image-sweep"
              />

              <img
                ref={imageRef}
                className="about-image"
                src={`${BASE_URL}images/2.webp`}
                alt="Manuel Parra"
              />

              <div className="about-image-overlay" />

              <div className="about-image-corner about-image-corner-tl" />
              <div className="about-image-corner about-image-corner-tr" />
              <div className="about-image-corner about-image-corner-bl" />
              <div className="about-image-corner about-image-corner-br" />

              <div className="about-image-caption">
                <span>
                  MANUEL PARRA
                </span>

                <span>
                  DR. EN DERECHO FISCAL
                </span>
              </div>
            </div>
          </div>

          <div
            ref={detailsRef}
            className="about-profile-details"
          >
            <div
              ref={nameRef}
              className="about-name-block"
            >
              <span>
                Manuel Parra
              </span>

              <h3>
                Dr. en Derecho Fiscal
              </h3>
            </div>

            <p
              ref={professionalRef}
              className="about-professional-title"
            >
              Dr. en Derecho Fiscal,
              <br />
              Trader &amp; Desarrollador de Software.
            </p>

            <p
              ref={summaryRef}
              className="about-summary"
            >
              Profesional con formación en Derecho Fiscal, Contaduría,
              Finanzas y Sistemas Computacionales, enfocado en el
              desarrollo de soluciones tecnológicas y administrativas.
              Experiencia en desarrollo de software, análisis fiscal y
              gestión empresarial.
            </p>

            <div
              ref={dataRef}
              className="about-data-grid"
            >
              <div className="about-data-item">
                <span>
                  Especialidad
                </span>

                <strong>
                  Derecho Fiscal &amp; Tecnología
                </strong>
              </div>

              <div className="about-data-item">
                <span>
                  Website
                </span>

                <strong>
                  soytemo7.github.io{import.meta.env.BASE_URL}
                </strong>
              </div>

              <div className="about-data-item">
                <span>
                  Experiencia
                </span>

                <strong>
                  Impuestos, Software y Finanzas
                </strong>
              </div>

              <div className="about-data-item">
                <span>
                  Ubicación
                </span>

                <strong>
                  Chilpancingo, Guerrero, México
                </strong>
              </div>

              <div className="about-data-item">
                <span>
                  Grado Académico
                </span>

                <strong>
                  Doctorado
                </strong>
              </div>

              <div className="about-data-item">
                <span>
                  Enfoque
                </span>

                <strong>
                  Tecnología, Finanzas e Impuestos
                </strong>
              </div>

              <div className="about-data-item">
                <span>
                  Email
                </span>

                <strong>
                  contador.manuel0@gmail.com
                </strong>
              </div>

              <div className="about-data-item">
                <span>
                  Disponibilidad
                </span>

                <strong>
                  Proyectos y colaboraciones
                </strong>
              </div>
            </div>

            <div
              ref={contactRef}
              className="about-contact"
            >
              <span>
                Contacto
              </span>

              <a href="mailto:contador.manuel0@gmail.com">
                contador.manuel0@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div
          ref={closingRef}
          className="about-closing"
        >
          <div
            ref={closingLineLeftRef}
            className="about-closing-line"
          />

          <p>
            Interés constante en la innovación tecnológica, el análisis
            financiero, la defensa fiscal, contabilidad y el desarrollo
            de herramientas digitales aplicadas al ámbito profesional
            y empresarial.
          </p>

          <div
            ref={closingLineRightRef}
            className="about-closing-line"
          />
        </div>
      </div>
    </section>
  );
}

export default About;