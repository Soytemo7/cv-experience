import {
  useEffect,
  useRef
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger
} from "gsap/ScrollTrigger";

import "../../styles/Experience/Experience.css";

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   DATOS
   ============================================================ */

const YEARS = [
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026"
];


/* ============================================================
   COMPONENTE
   ============================================================ */

function Experience() {

  /* ----------------------------------------------------------
     REFS
     ---------------------------------------------------------- */

  const sectionRef = useRef(null);

  const backgroundRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);

  const particlesRef = useRef(null);

  const orbitRef = useRef(null);
  const ringOneRef = useRef(null);
  const ringTwoRef = useRef(null);
  const ringThreeRef = useRef(null);

  const chapterRef = useRef(null);
  const chapterLineRef = useRef(null);

  const ghostRef = useRef(null);

  const numberWrapRef = useRef(null);
  const numberRef = useRef(null);
  const numberShadowRef = useRef(null);
  const numberGhostRef = useRef(null);

  const yearsRef = useRef(null);
  const yearTrackRef = useRef(null);
  const yearCurrentRef = useRef(null);

  const labelRef = useRef(null);
  const descriptionRef = useRef(null);

  const progressRef = useRef(null);
  const progressFillRef = useRef(null);

  const markerRef = useRef(null);

  const scanRef = useRef(null);

  const transitionRef = useRef(null);

  const noiseRef = useRef(null);


  /* ----------------------------------------------------------
     ANIMACION
     ---------------------------------------------------------- */

  useEffect(() => {

    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }


    const ctx = gsap.context(() => {

      /* ======================================================
         ESTADO INICIAL
         
         TODO ESTA PRESENTE DESDE EL PRINCIPIO.
         NO EXISTE UNA INTRO INDEPENDIENTE.
         ====================================================== */

      gsap.set(
        backgroundRef.current,
        {
          scale: 1,
          x: 0,
          opacity: 1
        }
      );


      gsap.set(
        gridRef.current,
        {
          scale: 1,
          x: 0,
          opacity: 0.035,
          backgroundPosition: "0 0"
        }
      );


      gsap.set(
        glowRef.current,
        {
          scale: 0.9,
          x: 0,
          opacity: 0.32
        }
      );


      gsap.set(
        orbitRef.current,
        {
          scale: 0.92,
          x: 0,
          opacity: 0.48,
          rotation: 0
        }
      );


      gsap.set(
        chapterRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)"
        }
      );


      gsap.set(
        chapterLineRef.current,
        {
          scaleX: 1
        }
      );


      gsap.set(
        ghostRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 0.38
        }
      );


      /* ======================================================
         13
         
         EL NUMERO SIEMPRE PARTE DEL CENTRO.
         ====================================================== */

      gsap.set(
        numberWrapRef.current,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0
        }
      );


      gsap.set(
        numberRef.current,
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          letterSpacing: "-0.10em"
        }
      );


      gsap.set(
        numberShadowRef.current,
        {
          x: -18,
          y: 10,
          scale: 1,
          opacity: 0.32
        }
      );


      gsap.set(
        numberGhostRef.current,
        {
          x: 22,
          y: -8,
          scale: 1,
          opacity: 0.18
        }
      );


      /* ======================================================
         INFORMACION
         ====================================================== */

      gsap.set(
        labelRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)"
        }
      );


      gsap.set(
        descriptionRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)"
        }
      );


      gsap.set(
        yearsRef.current,
        {
          x: 0,
          opacity: 1
        }
      );


      gsap.set(
        yearTrackRef.current,
        {
          xPercent: 0
        }
      );


      gsap.set(
        yearCurrentRef.current,
        {
          y: 0,
          opacity: 1
        }
      );


      gsap.set(
        markerRef.current,
        {
          scale: 1,
          opacity: 1
        }
      );


      gsap.set(
        progressRef.current,
        {
          opacity: 1
        }
      );


      gsap.set(
        progressFillRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center"
        }
      );


      gsap.set(
        transitionRef.current,
        {
          scaleY: 0,
          transformOrigin: "bottom center"
        }
      );


      /* ======================================================
         MOVIMIENTO AMBIENTAL
         
         Estos movimientos NO controlan el 13.
         ====================================================== */

      const glowFloat = gsap.to(
        glowRef.current,
        {
          scale: 1.08,
          opacity: 0.46,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        }
      );


      const ringOneRotation = gsap.to(
        ringOneRef.current,
        {
          rotation: 360,
          duration: 28,
          ease: "none",
          repeat: -1
        }
      );


      const ringTwoRotation = gsap.to(
        ringTwoRef.current,
        {
          rotation: -360,
          duration: 38,
          ease: "none",
          repeat: -1
        }
      );


      const ringThreeRotation = gsap.to(
        ringThreeRef.current,
        {
          rotation: 360,
          duration: 20,
          ease: "none",
          repeat: -1
        }
      );


      /* ======================================================
         TIMELINE PRINCIPAL
         
         UNA SOLA NARRATIVA.
         
         0.00
         13 normal
         
         0.20
         13 grande
         
         0.42
         13 domina
         
         0.65
         13 gigante
         
         0.82
         fragmento tipografico
         
         0.92
         desaparece
         ====================================================== */

      const timeline = gsap.timeline({

        scrollTrigger: {

          trigger: section,

          start: "top top",

          end: "bottom top",

          scrub: true,

          invalidateOnRefresh: true

        }

      });


      /* ======================================================
         0 → 0.18
         
         PRIMER CRECIMIENTO
         ====================================================== */

      timeline
        .to(
          numberWrapRef.current,
          {
            scale: 1.42,
            duration: 0.18,
            ease: "none"
          },
          0
        )
        .to(
          glowRef.current,
          {
            scale: 1.18,
            opacity: 0.48,
            duration: 0.18,
            ease: "none"
          },
          0
        )
        .to(
          backgroundRef.current,
          {
            scale: 1.08,
            duration: 0.18,
            ease: "none"
          },
          0
        )
        .to(
          gridRef.current,
          {
            scale: 1.08,
            opacity: 0.045,
            backgroundPosition: "45px 35px",
            duration: 0.18,
            ease: "none"
          },
          0
        );


      /* ======================================================
         0.18 → 0.38
         
         EL 13 SE CONVIERTE EN EL CENTRO ABSOLUTO.
         ====================================================== */

      timeline
        .to(
          numberWrapRef.current,
          {
            scale: 2.15,
            duration: 0.20,
            ease: "none"
          },
          0.18
        )
        .to(
          numberRef.current,
          {
            letterSpacing: "-0.12em",
            duration: 0.20,
            ease: "none"
          },
          0.18
        )
        .to(
          numberShadowRef.current,
          {
            x: -42,
            opacity: 0.20,
            duration: 0.20,
            ease: "none"
          },
          0.18
        )
        .to(
          numberGhostRef.current,
          {
            x: 52,
            opacity: 0.11,
            duration: 0.20,
            ease: "none"
          },
          0.18
        );


      /* ======================================================
         TEXTO COMIENZA A RETIRARSE
         ====================================================== */

      timeline
        .to(
          chapterRef.current,
          {
            x: -90,
            opacity: 0,
            filter: "blur(4px)",
            duration: 0.18,
            ease: "none"
          },
          0.22
        )
        .to(
          ghostRef.current,
          {
            scale: 1.22,
            opacity: 0.16,
            x: -130,
            duration: 0.22,
            ease: "none"
          },
          0.22
        )
        .to(
          labelRef.current,
          {
            x: -55,
            opacity: 0.62,
            duration: 0.20,
            ease: "none"
          },
          0.22
        )
        .to(
          descriptionRef.current,
          {
            x: -65,
            opacity: 0.46,
            duration: 0.20,
            ease: "none"
          },
          0.22
        );


      /* ======================================================
         0.38 → 0.58
         
         SEGUNDO CRECIMIENTO.
         ====================================================== */

      timeline
        .to(
          numberWrapRef.current,
          {
            scale: 3.15,
            duration: 0.20,
            ease: "none"
          },
          0.38
        )
        .to(
          glowRef.current,
          {
            scale: 1.45,
            opacity: 0.56,
            duration: 0.20,
            ease: "none"
          },
          0.38
        )
        .to(
          backgroundRef.current,
          {
            scale: 1.17,
            duration: 0.20,
            ease: "none"
          },
          0.38
        )
        .to(
          orbitRef.current,
          {
            scale: 1.25,
            opacity: 0.62,
            duration: 0.20,
            ease: "none"
          },
          0.38
        );


      /* ======================================================
         AÑOS
         
         AHORA LOS AÑOS SE CONVIERTEN EN LA SEGUNDA CAPA
         DE LA NARRATIVA.
         ====================================================== */

      timeline
        .to(
          yearsRef.current,
          {
            x: -45,
            duration: 0.18,
            ease: "none"
          },
          0.30
        )
        .to(
          yearTrackRef.current,
          {
            xPercent: -30,
            duration: 0.30,
            ease: "none"
          },
          0.30
        );


      /* ======================================================
         0.58 → 0.74
         
         EL 13 YA ES ENORME.
         ====================================================== */

      timeline
        .to(
          numberWrapRef.current,
          {
            scale: 4.65,
            duration: 0.16,
            ease: "none"
          },
          0.58
        )
        .to(
          numberRef.current,
          {
            filter: "blur(1px)",
            opacity: 0.86,
            duration: 0.16,
            ease: "none"
          },
          0.58
        )
        .to(
          numberShadowRef.current,
          {
            x: -90,
            opacity: 0.09,
            duration: 0.16,
            ease: "none"
          },
          0.58
        )
        .to(
          numberGhostRef.current,
          {
            x: 110,
            opacity: 0.045,
            duration: 0.16,
            ease: "none"
          },
          0.58
        )
        .to(
          labelRef.current,
          {
            x: -120,
            opacity: 0.18,
            duration: 0.16,
            ease: "none"
          },
          0.58
        )
        .to(
          descriptionRef.current,
          {
            x: -150,
            opacity: 0.10,
            duration: 0.16,
            ease: "none"
          },
          0.58
        );


      /* ======================================================
         0.74 → 0.88
         
         EL 13 DEJA DE PARECER UN NUMERO.
         
         SE CONVIERTE EN UNA FORMA GIGANTE.
         ====================================================== */

      timeline
        .to(
          numberWrapRef.current,
          {
            scale: 7.2,
            duration: 0.14,
            ease: "none"
          },
          0.74
        )
        .to(
          numberRef.current,
          {
            filter: "blur(2px)",
            opacity: 0.62,
            duration: 0.14,
            ease: "none"
          },
          0.74
        )
        .to(
          orbitRef.current,
          {
            scale: 1.6,
            opacity: 0.28,
            duration: 0.14,
            ease: "none"
          },
          0.74
        )
        .to(
          backgroundRef.current,
          {
            scale: 1.28,
            duration: 0.14,
            ease: "none"
          },
          0.74
        )
        .to(
          gridRef.current,
          {
            scale: 1.35,
            opacity: 0.065,
            backgroundPosition: "130px 110px",
            duration: 0.14,
            ease: "none"
          },
          0.74
        );


      /* ======================================================
         AÑOS TERMINAN DE RECORRER
         ====================================================== */

      timeline
        .to(
          yearsRef.current,
          {
            x: -240,
            opacity: 0.35,
            duration: 0.16,
            ease: "none"
          },
          0.70
        )
        .to(
          yearTrackRef.current,
          {
            xPercent: -68,
            duration: 0.18,
            ease: "none"
          },
          0.70
        );


      /* ======================================================
         0.88 → 1
         
         SALIDA.
         ====================================================== */

      timeline
        .to(
          numberWrapRef.current,
          {
            scale: 9.5,
            opacity: 0,
            duration: 0.12,
            ease: "none"
          },
          0.88
        )
        .to(
          numberRef.current,
          {
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.12,
            ease: "none"
          },
          0.88
        )
        .to(
          yearsRef.current,
          {
            x: -500,
            opacity: 0,
            duration: 0.12,
            ease: "none"
          },
          0.88
        )
        .to(
          orbitRef.current,
          {
            scale: 2,
            opacity: 0,
            duration: 0.12,
            ease: "none"
          },
          0.88
        )
        .to(
          glowRef.current,
          {
            scale: 2,
            opacity: 0,
            duration: 0.12,
            ease: "none"
          },
          0.88
        )
        .to(
          transitionRef.current,
          {
            scaleY: 1,
            duration: 0.12,
            ease: "none"
          },
          0.90
        );


      /* ======================================================
         PROGRESO
         ====================================================== */

      const progressTrigger =
        ScrollTrigger.create({

          trigger: section,

          start: "top top",

          end: "bottom top",

          onUpdate: self => {

            const progress =
              self.progress;


            if (progressFillRef.current) {

              gsap.set(
                progressFillRef.current,
                {
                  scaleX: progress
                }
              );

            }


            if (yearCurrentRef.current) {

              const index =
                Math.min(
                  YEARS.length - 1,
                  Math.floor(
                    progress *
                    YEARS.length
                  )
                );


              yearCurrentRef.current.textContent =
                YEARS[index];

            }

          }

        });


      /* ======================================================
         LIMPIEZA
         ====================================================== */

      return () => {

        timeline.kill();

        progressTrigger.kill();

        glowFloat.kill();

        ringOneRotation.kill();

        ringTwoRotation.kill();

        ringThreeRotation.kill();

      };

    }, sectionRef);


    return () => {

      ctx.revert();

    };

  }, []);


  /* ==========================================================
     JSX
     ========================================================== */

  return (

    <section
      ref={sectionRef}
      className="experience experience-section"
    >

      <div className="experience-sticky">

        <div
          ref={backgroundRef}
          className="experience-background"
        />


        <div
          ref={gridRef}
          className="experience-grid"
        />


        <div
          ref={glowRef}
          className="experience-glow"
        />


        <div
          ref={particlesRef}
          className="experience-particles"
        >

          {Array.from(
            { length: 34 },
            (_, index) => (
              <span key={index} />
            )
          )}

        </div>


        <div
          ref={orbitRef}
          className="experience-orbit"
        >

          <div
            ref={ringOneRef}
            className="experience-orbit-ring experience-orbit-ring-1"
          />

          <div
            ref={ringTwoRef}
            className="experience-orbit-ring experience-orbit-ring-2"
          />

          <div
            ref={ringThreeRef}
            className="experience-orbit-ring experience-orbit-ring-3"
          />


          <div
            className="experience-orbit-dot experience-orbit-dot-1"
          />

          <div
            className="experience-orbit-dot experience-orbit-dot-2"
          />

          <div
            className="experience-orbit-dot experience-orbit-dot-3"
          />

        </div>


        <div
          ref={scanRef}
          className="experience-scan"
        />


        <div
          ref={chapterRef}
          className="experience-chapter"
        >

          <div className="experience-chapter-number">
            02
          </div>

          <div
            ref={chapterLineRef}
            className="experience-chapter-line"
          />

          <div className="experience-chapter-label">
            TRAYECTORIA
          </div>

        </div>


        <div
          ref={ghostRef}
          className="experience-ghost"
        >
          EXPERIENCE
        </div>


        <div
          ref={numberWrapRef}
          className="experience-number-wrap"
        >

          <div
            ref={numberShadowRef}
            className="experience-number-shadow"
          >
            13
          </div>


          <div
            ref={numberGhostRef}
            className="experience-number-ghost"
          >
            13
          </div>


          <div
            ref={numberRef}
            className="experience-number"
          >
            13
          </div>

        </div>


        <div
          ref={labelRef}
          className="experience-label"
        >

          <span className="experience-label-small">
            AÑOS
          </span>

          <span className="experience-label-large">
            DE EXPERIENCIA
          </span>

        </div>


        <div
          ref={descriptionRef}
          className="experience-description"
        >
          UNA TRAYECTORIA CONSTRUIDA
          <br />
          ENTRE DISCIPLINAS,
          <br />
          TRANSFORMACIÓN Y EVOLUCIÓN.
        </div>


        <div
          ref={yearsRef}
          className="experience-years"
        >

          <div
            ref={yearCurrentRef}
            className="experience-year-current"
          >
            2014
          </div>


          <div
            ref={yearTrackRef}
            className="experience-year-track"
          >

            {YEARS.map(
              (year, index) => (

                <span
                  key={year}
                  className={
                    index === YEARS.length - 1
                      ? "is-current"
                      : ""
                  }
                >
                  {year}
                </span>

              )
            )}

          </div>

        </div>


        <div
          ref={markerRef}
          className="experience-marker"
        >

          <span className="experience-marker-dot" />

          <span className="experience-marker-line" />

          <span className="experience-marker-text">
            CONTINUIDAD
          </span>

        </div>


        <div
          ref={progressRef}
          className="experience-progress"
        >

          <div className="experience-progress-meta">

            <span>
              2014
            </span>

            <span>
              2026
            </span>

          </div>


          <div className="experience-progress-track">

            <span
              ref={progressFillRef}
              className="experience-progress-fill"
            />

          </div>

        </div>


        <div
          ref={noiseRef}
          className="experience-noise"
        />


        <div className="experience-vignette" />


        <div className="experience-frame">

          <span
            className="experience-frame-corner experience-frame-tl"
          />

          <span
            className="experience-frame-corner experience-frame-tr"
          />

          <span
            className="experience-frame-corner experience-frame-br"
          />

          <span
            className="experience-frame-corner experience-frame-bl"
          />

        </div>


        <div
          ref={transitionRef}
          className="experience-transition"
        />

      </div>

    </section>

  );

}


export default Experience;