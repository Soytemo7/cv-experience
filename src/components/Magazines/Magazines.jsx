import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/Magazines/magazines.css";

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   DATOS
   ============================================================ */

const MAGAZINES = [
  {
    number: 875,
    image: `${import.meta.env.BASE_URL}img/revistas/875.jpg`,
    date: "2ª QUINCENA DE MARZO DE 2026",
    page: "42",
    title:
      "Actualización del límite a los ingresos totales anuales de una S.A.S. en 2026",
  },
  {
    number: 874,
    image: `${import.meta.env.BASE_URL}img/revistas/874.jpg`,
    date: "1ª QUINCENA DE MARZO DE 2026",
    page: "29",
    title:
      "Pérdidas Fiscales en el régimen de intereses de Personas Físicas. Cómo actualizarlas y disminuirlas para sus declaraciones anuales",
  },
  {
    number: 870,
    image: `${import.meta.env.BASE_URL}img/revistas/870.jpg`,
    date: "1ª QUINCENA DE ENERO DE 2026",
    page: "41",
    title:
      "Proyección de cuotas obrero patronales del IMSS-INFONAVIT con salario mínimo 2026",
  },
  {
    number: 870,
    image: `${import.meta.env.BASE_URL}img/revistas/870.jpg`,
    date: "1ª QUINCENA DE ENERO DE 2026",
    page: "25",
    title:
      "Régimen de Arrendamiento de personas físicas. Último pago provisional trimestral acumulando ingresos totales del ejercicio 2025",
  },
  {
    number: 869,
    image: `${import.meta.env.BASE_URL}img/revistas/869.jpg`,
    date: "2ª QUINCENA DE DICIEMBRE DE 2025",
    page: "24",
    title:
      "De salarios caídos a intereses capitalizables en laboral. Cálculo, límites legales y tratamiento fiscal",
  },
  {
    number: 869,
    image: `${import.meta.env.BASE_URL}img/revistas/869.jpg`,
    date: "2ª QUINCENA DE DICIEMBRE DE 2025",
    page: "13",
    title:
      "Proyección de cuotas obrero patronales del IMSS-INFONAVIT con salario mínimo 2026",
  },
  {
    number: 868,
    image: `${import.meta.env.BASE_URL}img/revistas/868.jpg`,
    date: "1ª QUINCENA DE DICIEMBRE DE 2025",
    page: "49",
    title:
      "Régimen de Arrendamiento de personas físicas. Último pago provisional trimestral acumulando ingresos totales del ejercicio 2025",
  },
  {
    number: 866,
    image: `${import.meta.env.BASE_URL}img/revistas/866.jpg`,
    date: "1ª QUINCENA DE NOVIEMBRE DE 2025",
    page: "17",
    title:
      "Ingresos por enajenación de inmuebles con diferente fecha de adquisición y construcción. Cálculo de la ganancia y del pago provisional del ISR (artículo 200 del RLISR)",
  },
  {
    number: 865,
    image: `${import.meta.env.BASE_URL}img/revistas/865.jpg`,
    date: "2ª QUINCENA DE OCTUBRE DE 2025",
    page: "28",
    title:
      "Acreditamiento del ISR definitivo en distribución de dividendos o utilidades",
  },
  {
    number: 864,
    image: `${import.meta.env.BASE_URL}img/revistas/864.jpg`,
    date: "1ª QUINCENA DE OCTUBRE DE 2025",
    page: "34",
    title:
      "Jornada especial de 24x24. Cálculo del tiempo extraordinario y sus efectos en materia del ISR",
  },
  {
    number: 862,
    image: `${import.meta.env.BASE_URL}img/revistas/862.jpg`,
    date: "1ª QUINCENA DE SEPTIEMBRE DE 2025",
    page: "32",
    title:
      "Horas extraordinarias. Exención fiscal y SDI sui géneris (metodología para una remuneración justa)",
  },
  {
    number: 861,
    image: `${import.meta.env.BASE_URL}img/revistas/861.jpg`,
    date: "2ª QUINCENA DE AGOSTO DE 2025",
    page: "11–34",
    title:
      "Prima de antigüedad e ISR. Guía práctica para su cálculo",
  },
];


const EDITION_COUNT =
  new Set(
    MAGAZINES.map(
      (item) => item.number
    )
  ).size;


/* ============================================================
   COMPONENTE
   ============================================================ */

function Magazines() {
  const sectionRef =
    useRef(null);

  const carouselRef =
    useRef(null);

  const canvasRef =
    useRef(null);

  const touchStartXRef =
    useRef(0);

  const mouseRef =
    useRef({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    });

  const [activeIndex, setActiveIndex] =
    useState(0);


  const activeMagazine =
    MAGAZINES[activeIndex];


  /* ==========================================================
     CAMBIAR PUBLICACIÓN
     ========================================================== */

  const changeMagazine = useCallback(
    (nextIndex) => {
      let index = nextIndex;

      if (index < 0) {
        index =
          MAGAZINES.length - 1;
      }

      if (
        index >=
        MAGAZINES.length
      ) {
        index = 0;
      }

      setActiveIndex(index);
    },
    []
  );


  const nextMagazine =
    useCallback(() => {
      changeMagazine(
        activeIndex + 1
      );
    }, [
      activeIndex,
      changeMagazine,
    ]);


  const previousMagazine =
    useCallback(() => {
      changeMagazine(
        activeIndex - 1
      );
    }, [
      activeIndex,
      changeMagazine,
    ]);


  /* ==========================================================
     CAMBIO AUTOMÁTICO
     ========================================================== */

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setActiveIndex(
          (currentIndex) => {
            if (
              currentIndex >=
              MAGAZINES.length - 1
            ) {
              return 0;
            }

            return currentIndex + 1;
          }
        );
      }, 3000);


    return () => {
      window.clearInterval(
        timer
      );
    };
  }, []);


  /* ==========================================================
     CANVAS AMBIENTAL
     ========================================================== */

  useEffect(() => {
    const section =
      sectionRef.current;

    const canvas =
      canvasRef.current;

    if (!section || !canvas) {
      return undefined;
    }


    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return undefined;
    }


    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let disposed = false;


    const particles = [];
    const sparks = [];
    const orbitParticles = [];


    const random = (
      min,
      max
    ) =>
      Math.random() *
        (max - min) +
      min;


    const resize = () => {
      width =
        section.clientWidth;

      height =
        section.clientHeight;

      dpr =
        Math.min(
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
      sparks.length = 0;
      orbitParticles.length = 0;


      const particleCount =
        Math.min(
          180,
          Math.max(
            90,
            Math.floor(
              (width * height) /
                10000
            )
          )
        );


      for (
        let index = 0;
        index < particleCount;
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
            1.6
          ),
          alpha: random(
            0.08,
            0.42
          ),
          speed: random(
            0.025,
            0.14
          ),
          drift: random(
            -0.06,
            0.06
          ),
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
        sparks.push({
          angle: random(
            0,
            Math.PI * 2
          ),
          radius: random(
            170,
            430
          ),
          speed: random(
            0.00015,
            0.0007
          ),
          size: random(
            0.7,
            2
          ),
          alpha: random(
            0.15,
            0.6
          ),
          phase: random(
            0,
            Math.PI * 2
          ),
        });
      }


      for (
        let index = 0;
        index < 24;
        index += 1
      ) {
        orbitParticles.push({
          angle:
            (index / 24) *
              Math.PI *
              2,
          radius: random(
            130,
            280
          ),
          speed: random(
            0.0002,
            0.00055
          ),
          size: random(
            0.8,
            1.8
          ),
          alpha: random(
            0.15,
            0.5
          ),
        });
      }
    };


    const drawBackground =
      (time) => {
        const centerX =
          width * 0.34;

        const centerY =
          height * 0.52;


        const gradient =
          ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            Math.max(
              width,
              height
            ) * 0.72
          );


        gradient.addColorStop(
          0,
          "#15191d"
        );

        gradient.addColorStop(
          0.3,
          "#0c1013"
        );

        gradient.addColorStop(
          0.68,
          "#07090b"
        );

        gradient.addColorStop(
          1,
          "#030405"
        );


        ctx.fillStyle =
          gradient;

        ctx.fillRect(
          0,
          0,
          width,
          height
        );


        /* ----------------------------------------------
           HALO CENTRAL DINÁMICO
           ---------------------------------------------- */

        const pulse =
          1 +
          Math.sin(
            time * 0.0014
          ) *
            0.045;


        const glowRadius =
          Math.min(
            width,
            height
          ) *
          0.27 *
          pulse;


        const glow =
          ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            glowRadius
          );


        glow.addColorStop(
          0,
          "rgba(215,225,232,0.075)"
        );

        glow.addColorStop(
          0.28,
          "rgba(170,190,202,0.035)"
        );

        glow.addColorStop(
          0.65,
          "rgba(100,120,135,0.012)"
        );

        glow.addColorStop(
          1,
          "rgba(0,0,0,0)"
        );


        ctx.fillStyle =
          glow;

        ctx.fillRect(
          centerX -
            glowRadius,
          centerY -
            glowRadius,
          glowRadius * 2,
          glowRadius * 2
        );
      };


    const drawGrid =
      (time) => {
        ctx.save();


        const spacing =
          Math.max(
            55,
            Math.min(
              90,
              width / 16
            )
          );


        const drift =
          (time * 0.006) %
          spacing;


        ctx.globalAlpha =
          0.025;


        ctx.strokeStyle =
          "#d8e1e6";

        ctx.lineWidth = 1;


        for (
          let x =
            -spacing +
            drift;
          x <
          width +
            spacing;
          x += spacing
        ) {
          ctx.beginPath();

          ctx.moveTo(
            x,
            0
          );

          ctx.lineTo(
            x,
            height
          );

          ctx.stroke();
        }


        for (
          let y =
            -spacing +
            drift;
          y <
          height +
            spacing;
          y += spacing
        ) {
          ctx.beginPath();

          ctx.moveTo(
            0,
            y
          );

          ctx.lineTo(
            width,
            y
          );

          ctx.stroke();
        }


        ctx.restore();
      };


    const drawDiagonalLines =
      (time) => {
        ctx.save();


        const offset =
          (time * 0.018) %
          130;


        ctx.globalAlpha =
          0.018;


        ctx.strokeStyle =
          "#e2e8eb";

        ctx.lineWidth = 1;


        for (
          let x =
            -height -
            130 +
            offset;
          x <
          width +
            height;
          x += 130
        ) {
          ctx.beginPath();

          ctx.moveTo(
            x,
            0
          );

          ctx.lineTo(
            x +
              height,
            height
          );

          ctx.stroke();
        }


        ctx.restore();
      };


    const drawOrbitals =
      (time) => {
        const centerX =
          width * 0.34;

        const centerY =
          height * 0.52;


        ctx.save();

        ctx.translate(
          centerX,
          centerY
        );

        ctx.rotate(
          time * 0.00004
        );


        for (
          let index = 0;
          index < 4;
          index += 1
        ) {
          const rx =
            150 +
            index * 65;

          const ry =
            72 +
            index * 32;


          ctx.beginPath();

          ctx.ellipse(
            0,
            0,
            rx,
            ry,
            index *
              0.28,
            0,
            Math.PI * 2
          );


          ctx.strokeStyle =
            `rgba(215,225,232,${
              0.018 +
              index * 0.004
            })`;

          ctx.lineWidth = 1;

          ctx.stroke();
        }


        orbitParticles.forEach(
          (particle) => {
            const angle =
              particle.angle +
              time *
                particle.speed;

            const x =
              Math.cos(
                angle
              ) *
              particle.radius;

            const y =
              Math.sin(
                angle
              ) *
              particle.radius *
              0.45;


            ctx.beginPath();

            ctx.arc(
              x,
              y,
              particle.size,
              0,
              Math.PI * 2
            );


            ctx.fillStyle =
              "rgba(220,230,235,0.75)";

            ctx.globalAlpha =
              particle.alpha;

            ctx.fill();
          }
        );


        ctx.restore();
      };


    const drawScanner =
      (time) => {
        const scanY =
          ((time * 0.028) %
            (height + 180)) -
          90;


        const gradient =
          ctx.createLinearGradient(
            0,
            scanY - 80,
            0,
            scanY + 80
          );


        gradient.addColorStop(
          0,
          "rgba(215,225,232,0)"
        );

        gradient.addColorStop(
          0.5,
          "rgba(215,225,232,0.035)"
        );

        gradient.addColorStop(
          1,
          "rgba(215,225,232,0)"
        );


        ctx.fillStyle =
          gradient;

        ctx.fillRect(
          0,
          scanY - 80,
          width,
          160
        );


        ctx.beginPath();

        ctx.moveTo(
          0,
          scanY
        );

        ctx.lineTo(
          width,
          scanY
        );


        ctx.strokeStyle =
          "rgba(225,235,240,0.065)";

        ctx.lineWidth = 1;

        ctx.stroke();
      };


    const drawSparks =
      (time) => {
        const centerX =
          width * 0.34;

        const centerY =
          height * 0.52;


        ctx.save();


        sparks.forEach(
          (spark) => {
            const angle =
              spark.angle +
              time *
                spark.speed;


            const radius =
              spark.radius +
              Math.sin(
                time * 0.0008 +
                  spark.phase
              ) *
                10;


            const x =
              centerX +
              Math.cos(
                angle
              ) *
                radius;

            const y =
              centerY +
              Math.sin(
                angle
              ) *
                radius *
                0.52;


            ctx.beginPath();

            ctx.arc(
              x,
              y,
              spark.size,
              0,
              Math.PI * 2
            );


            ctx.fillStyle =
              "rgba(225,235,240,0.8)";

            ctx.globalAlpha =
              spark.alpha;

            ctx.fill();
          }
        );


        ctx.restore();
      };


    const drawParticles =
      (time) => {
        ctx.save();


        particles.forEach(
          (particle) => {
            particle.y -=
              particle.speed;

            particle.x +=
              particle.drift;


            if (
              particle.y <
              -10
            ) {
              particle.y =
                height + 10;
            }


            if (
              particle.x <
              -10
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
              (
                0.55 +
                Math.sin(
                  time *
                    0.001 +
                    particle.phase
                ) *
                  0.25
              );


            ctx.globalAlpha =
              alpha;

            ctx.fillStyle =
              "#dce5e9";


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


    const drawVignette =
      () => {
        const gradient =
          ctx.createRadialGradient(
            width * 0.34,
            height * 0.5,
            Math.min(
              width,
              height
            ) * 0.12,
            width * 0.34,
            height * 0.5,
            Math.max(
              width,
              height
            ) * 0.8
          );


        gradient.addColorStop(
          0,
          "rgba(0,0,0,0)"
        );

        gradient.addColorStop(
          0.58,
          "rgba(0,0,0,0.04)"
        );

        gradient.addColorStop(
          1,
          "rgba(0,0,0,0.72)"
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


    const render =
      (time) => {
        if (disposed) {
          return;
        }


        ctx.clearRect(
          0,
          0,
          width,
          height
        );


        drawBackground(
          time
        );

        drawGrid(
          time
        );

        drawDiagonalLines(
          time
        );

        drawOrbitals(
          time
        );

        drawSparks(
          time
        );

        drawScanner(
          time
        );

        drawParticles(
          time
        );

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


    return () => {
      disposed = true;

      cancelAnimationFrame(
        frame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);


  /* ==========================================================
     ENTRADA DE LA SECCIÓN
     ========================================================== */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return undefined;
    }


    const context =
      gsap.context(
        () => {
          gsap.fromTo(
            ".magazines-header",
            {
              opacity: 0,
              y: 45,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",

              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
            }
          );


          gsap.fromTo(
            ".magazines-carousel",
            {
              opacity: 0,
              y: 70,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              delay: 0.12,
              ease: "power3.out",

              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true,
              },
            }
          );


          gsap.fromTo(
            ".magazines-footer",
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.25,
              ease: "power3.out",

              scrollTrigger: {
                trigger: section,
                start: "top 58%",
                once: true,
              },
            }
          );


          /* ----------------------------------------------
             MICRO MOVIMIENTO DEL FONDO
             ---------------------------------------------- */

          gsap.to(
            ".magazines-carousel-glow",
            {
              scale: 1.16,
              opacity: 0.7,
              duration: 3.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );


          /* ----------------------------------------------
             PARALLAX GENERAL DE LA SECCIÓN
             ---------------------------------------------- */

          gsap.to(
            ".magazines-covers",
            {
              y: -18,

              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );


          gsap.to(
            ".magazines-active-information",
            {
              y: 14,

              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            }
          );


          gsap.to(
            ".magazines-header-copy",
            {
              y: -12,

              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
              },
            }
          );
        },
        section
      );


    return () => {
      context.revert();
    };
  }, []);


  /* ==========================================================
     PARALLAX DEL MOUSE
     ========================================================== */

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return undefined;
    }


    const mouse =
      mouseRef.current;


    let animationFrame = 0;


    const handlePointerMove =
      (event) => {
        const rect =
          section.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        mouse.targetX =
          (x - 0.5) * 2;

        mouse.targetY =
          (y - 0.5) * 2;
      };


    const handlePointerLeave =
      () => {
        mouse.targetX = 0;
        mouse.targetY = 0;
      };


    const animate =
      () => {
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


        const covers =
          section.querySelector(
            ".magazines-covers"
          );

        const information =
          section.querySelector(
            ".magazines-active-information"
          );

        const glow =
          section.querySelector(
            ".magazines-carousel-glow"
          );


        if (covers) {
          gsap.set(
            covers,
            {
              rotateY:
                mouse.x * 2.2,
              rotateX:
                mouse.y * -1.4,
            }
          );
        }


        if (information) {
          gsap.set(
            information,
            {
              x:
                mouse.x * 4,
              y:
                mouse.y * 2,
            }
          );
        }


        if (glow) {
          gsap.set(
            glow,
            {
              x:
                mouse.x * 18,
              y:
                mouse.y * 12,
            }
          );
        }


        animationFrame =
          requestAnimationFrame(
            animate
          );
      };


    section.addEventListener(
      "pointermove",
      handlePointerMove
    );

    section.addEventListener(
      "pointerleave",
      handlePointerLeave
    );


    animationFrame =
      requestAnimationFrame(
        animate
      );


    return () => {
      section.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      section.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      cancelAnimationFrame(
        animationFrame
      );


      const covers =
        section.querySelector(
          ".magazines-covers"
        );

      const information =
        section.querySelector(
          ".magazines-active-information"
        );


      if (covers) {
        gsap.set(
          covers,
          {
            clearProps:
              "transform",
          }
        );
      }


      if (information) {
        gsap.set(
          information,
          {
            clearProps:
              "transform",
          }
        );
      }
    };
  }, []);


  /* ==========================================================
     ANIMACIÓN DE CAMBIO
     ========================================================== */

  useEffect(() => {
    const carousel =
      carouselRef.current;

    if (!carousel) {
      return;
    }


    const cover =
      carousel.querySelector(
        ".magazines-active-cover"
      );

    const information =
      carousel.querySelector(
        ".magazines-active-information"
      );

    const top =
      carousel.querySelector(
        ".magazines-active-top"
      );

    const meta =
      carousel.querySelector(
        ".magazines-active-meta"
      );

    const article =
      carousel.querySelector(
        ".magazines-active-article"
      );

    const glow =
      carousel.querySelector(
        ".magazines-carousel-glow"
      );


    if (
      !cover ||
      !information
    ) {
      return;
    }


    gsap.killTweensOf([
      cover,
      information,
      top,
      meta,
      article,
      glow,
    ]);


    /* ----------------------------------------------
       FLASH DE CAMBIO
       ---------------------------------------------- */

    gsap.fromTo(
      carousel,
      {
        "--transition-glow": 0,
      },
      {
        "--transition-glow": 1,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );


    /* ----------------------------------------------
       PORTADA
       ---------------------------------------------- */

    gsap.fromTo(
      cover,
      {
        opacity: 0.25,
        scale: 0.88,
        rotateY: -22,
        rotateX: 4,
        x: 65,
        filter:
          "brightness(0.55) saturate(0.55) blur(2px)",
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        x: 0,
        filter:
          "brightness(1) saturate(1) blur(0px)",
        duration: 0.78,
        ease: "power4.out",
      }
    );


    /* ----------------------------------------------
       INFORMACIÓN
       ---------------------------------------------- */

    gsap.fromTo(
      information,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.62,
        delay: 0.1,
        ease: "power3.out",
      }
    );


    if (top) {
      gsap.fromTo(
        top,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          delay: 0.16,
          ease: "power3.out",
        }
      );
    }


    if (meta) {
      gsap.fromTo(
        meta,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          delay: 0.23,
          ease: "power3.out",
        }
      );
    }


    if (article) {
      gsap.fromTo(
        article,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.52,
          delay: 0.29,
          ease: "power3.out",
        }
      );
    }


    /* ----------------------------------------------
       PULSO DEL GLOW
       ---------------------------------------------- */

    if (glow) {
      gsap.fromTo(
        glow,
        {
          scale: 0.82,
          opacity: 0.2,
        },
        {
          scale: 1.12,
          opacity: 0.8,
          duration: 0.85,
          ease: "power2.out",
        }
      );
    }
  }, [activeIndex]);


  /* ==========================================================
     TECLADO
     ========================================================== */

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        const section =
          sectionRef.current;

        if (!section) {
          return;
        }


        const rect =
          section.getBoundingClientRect();


        const visible =
          rect.top <
            window.innerHeight &&
          rect.bottom > 0;


        if (!visible) {
          return;
        }


        if (
          event.key ===
          "ArrowRight"
        ) {
          event.preventDefault();

          nextMagazine();
        }


        if (
          event.key ===
          "ArrowLeft"
        ) {
          event.preventDefault();

          previousMagazine();
        }
      };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    nextMagazine,
    previousMagazine,
  ]);


  /* ==========================================================
     TOUCH
     ========================================================== */

  const handleTouchStart =
    (event) => {
      touchStartXRef.current =
        event.touches[0].clientX;
    };


  const handleTouchEnd =
    (event) => {
      const endX =
        event.changedTouches[0]
          .clientX;


      const distance =
        endX -
        touchStartXRef.current;


      if (
        Math.abs(distance) <
        45
      ) {
        return;
      }


      if (distance < 0) {
        nextMagazine();
      } else {
        previousMagazine();
      }
    };


  /* ==========================================================
     POSICIÓN DE LAS PORTADAS
     ========================================================== */

  const getRelativeIndex =
    (index) => {
      let difference =
        index -
        activeIndex;


      const half =
        Math.floor(
          MAGAZINES.length / 2
        );


      if (
        difference > half
      ) {
        difference -=
          MAGAZINES.length;
      }


      if (
        difference < -half
      ) {
        difference +=
          MAGAZINES.length;
      }


      return difference;
    };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      ref={sectionRef}
      className="magazines"
    >

      <canvas
        ref={canvasRef}
        className="magazines-canvas"
        aria-hidden="true"
      />


      <div className="magazines-noise" />


      <div className="magazines-inner">

        {/* ====================================================
            ENCABEZADO
            ==================================================== */}

        <header className="magazines-header">

          <div className="magazines-header-label">

            <span>
              08
            </span>

            <i />

            <strong>
              PUBLICACIONES
            </strong>

          </div>


          <div className="magazines-header-copy">

            <span>
              REVISTA PAF
            </span>

            <h2>
              Artículos
              <em> publicados.</em>
            </h2>

            <p>
              Una selección de publicaciones
              técnicas en materia fiscal,
              laboral y legal.
            </p>

          </div>


          <div className="magazines-header-count">

            <strong>
              {String(
                activeIndex + 1
              ).padStart(
                2,
                "0"
              )}
            </strong>

            <span>
              / {String(
                MAGAZINES.length
              ).padStart(
                2,
                "0"
              )}
            </span>

          </div>

        </header>


        {/* ====================================================
            CARRUSEL
            ==================================================== */}

        <div
          ref={carouselRef}
          className="magazines-carousel"
          onTouchStart={
            handleTouchStart
          }
          onTouchEnd={
            handleTouchEnd
          }
        >

          <div className="magazines-carousel-glow" />

          <div className="magazines-carousel-ring magazines-carousel-ring-one" />
          <div className="magazines-carousel-ring magazines-carousel-ring-two" />
          <div className="magazines-carousel-ring magazines-carousel-ring-three" />


          {/* ==================================================
              PORTADAS
              ================================================== */}

          <div className="magazines-covers">

            {MAGAZINES.map(
              (
                magazine,
                index
              ) => {
                const relative =
                  getRelativeIndex(
                    index
                  );


                if (
                  Math.abs(
                    relative
                  ) > 2
                ) {
                  return null;
                }


                return (
                  <button
                    key={`${magazine.number}-${magazine.page}-${index}`}
                    type="button"
                    className={
                      `magazines-cover ${
                        relative === 0
                          ? "is-active"
                          : ""
                      } ${
                        relative === -1
                          ? "is-prev"
                          : ""
                      } ${
                        relative === 1
                          ? "is-next"
                          : ""
                      } ${
                        relative < -1
                          ? "is-far-prev"
                          : ""
                      } ${
                        relative > 1
                          ? "is-far-next"
                          : ""
                      }`
                    }
                    onClick={() =>
                      changeMagazine(
                        index
                      )
                    }
                    style={{
                      "--cover-offset":
                        `${relative * 58}px`,

                      "--cover-depth":
                        `${Math.abs(relative)}`,
                    }}
                    aria-label={`Ver artículo de la edición ${magazine.number}`}
                  >

                    <span className="magazines-cover-image">

                      <span className="magazines-cover-border" />

                      <span className="magazines-cover-light" />

                      <img
                        src={
                          magazine.image
                        }
                        alt={`Revista PAF ${magazine.number}`}
                      />

                    </span>

                  </button>
                );
              }
            )}

          </div>


          {/* ==================================================
              FLECHA IZQUIERDA
              ================================================== */}

          <button
            type="button"
            className="magazines-arrow magazines-arrow-left"
            onClick={
              previousMagazine
            }
            aria-label="Publicación anterior"
          >

            <span>
              ←
            </span>

          </button>


          {/* ==================================================
              FLECHA DERECHA
              ================================================== */}

          <button
            type="button"
            className="magazines-arrow magazines-arrow-right"
            onClick={
              nextMagazine
            }
            aria-label="Siguiente publicación"
          >

            <span>
              →
            </span>

          </button>


          {/* ==================================================
              INFORMACIÓN ACTIVA
              ================================================== */}

          <div className="magazines-active-information">

            <div className="magazines-active-top">

              <span>
                EDICIÓN
              </span>

              <strong>
                {activeMagazine.number}
              </strong>

            </div>


            <div className="magazines-active-meta">

              <div>

                <span>
                  PUBLICACIÓN
                </span>

                <strong>
                  {activeMagazine.date}
                </strong>

              </div>


              <div>

                <span>
                  PÁGINA
                </span>

                <strong>
                  {activeMagazine.page}
                </strong>

              </div>

            </div>


            <div className="magazines-active-article">

              <span>
                ARTÍCULO
              </span>

              <h3>
                {activeMagazine.title}
              </h3>

            </div>

          </div>


          {/* ==================================================
              INDICADORES
              ================================================== */}

          <div className="magazines-dots">

            {MAGAZINES.map(
              (
                magazine,
                index
              ) => (

                <button
                  key={`${magazine.number}-dot-${magazine.page}-${index}`}
                  type="button"
                  className={
                    index ===
                    activeIndex
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    changeMagazine(
                      index
                    )
                  }
                  aria-label={`Ir al artículo ${index + 1}`}
                />

              )
            )}

          </div>


          {/* ==================================================
              HINT
              ================================================== */}

          <div className="magazines-wheel-hint">

            <span>
              FLECHAS
            </span>

            <i />

            <span>
              CAMBIA PUBLICACIÓN
            </span>

          </div>

        </div>


        {/* ====================================================
            PIE / ESTADÍSTICAS
            ==================================================== */}

        <footer className="magazines-footer">

          <div className="magazines-footer-line" />


          <div className="magazines-footer-item">

            <strong>
              {EDITION_COUNT}
            </strong>

            <span>
              EDICIONES
            </span>

          </div>


          <div className="magazines-footer-separator" />


          <div className="magazines-footer-item">

            <strong>
              {MAGAZINES.length}
            </strong>

            <span>
              ARTÍCULOS
            </span>

          </div>


          <div className="magazines-footer-separator" />


          <div className="magazines-footer-item">

            <strong>
              2025–26
            </strong>

            <span>
              PERIODO
            </span>

          </div>


          <div className="magazines-footer-line" />

        </footer>

      </div>

    </section>
  );
}


export default Magazines;