import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/LegacyTransition/legacyTransition.css";

gsap.registerPlugin(ScrollTrigger);

function LegacyTransition() {
  const sectionRef = useRef(null);

  const stageRef = useRef(null);
  const atmosphereRef = useRef(null);

  const architectureRef = useRef(null);
  const ceilingRef = useRef(null);
  const floorRef = useRef(null);
  const leftWallRef = useRef(null);
  const rightWallRef = useRef(null);
  const rearWallRef = useRef(null);

  const planesRef = useRef([]);
  const verticalsRef = useRef([]);
  const horizontalsRef = useRef([]);

  const apertureRef = useRef(null);
  const apertureInnerRef = useRef(null);

  const lightRef = useRef(null);
  const lightColumnRef = useRef(null);

  const textRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleTopRef = useRef(null);
  const titleBottomRef = useRef(null);
  const subtitleRef = useRef(null);

  const closingRef = useRef(null);

  const setPlaneRef = (element, index) => {
    planesRef.current[index] = element;
  };

  const setVerticalRef = (element, index) => {
    verticalsRef.current[index] = element;
  };

  const setHorizontalRef = (element, index) => {
    horizontalsRef.current[index] = element;
  };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const planes = planesRef.current.filter(Boolean);
      const verticals = verticalsRef.current.filter(Boolean);
      const horizontals = horizontalsRef.current.filter(Boolean);

      /* ==========================================================
         ESTADO INICIAL
         ========================================================== */

      gsap.set(stageRef.current, {
        opacity: 0
      });

      gsap.set(atmosphereRef.current, {
        opacity: 0,
        scale: 0.8
      });

      gsap.set(architectureRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 30
      });

      gsap.set(
        [
          ceilingRef.current,
          floorRef.current,
          leftWallRef.current,
          rightWallRef.current,
          rearWallRef.current
        ],
        {
          opacity: 0
        }
      );

      gsap.set(planes, {
        opacity: 0,
        scale: 0.7
      });

      gsap.set(verticals, {
        opacity: 0,
        scaleY: 0
      });

      gsap.set(horizontals, {
        opacity: 0,
        scaleX: 0
      });

      gsap.set(apertureRef.current, {
        opacity: 0,
        scale: 0.4
      });

      gsap.set(apertureInnerRef.current, {
        opacity: 0,
        scale: 0.2
      });

      gsap.set(lightRef.current, {
        opacity: 0,
        scale: 0.3
      });

      gsap.set(lightColumnRef.current, {
        opacity: 0,
        scaleY: 0
      });

      gsap.set(textRef.current, {
        opacity: 0
      });

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 24
      });

      gsap.set(titleTopRef.current, {
        opacity: 0,
        y: 70,
        x: -45
      });

      gsap.set(titleBottomRef.current, {
        opacity: 0,
        y: 70,
        x: 45
      });

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 24
      });

      gsap.set(closingRef.current, {
        opacity: 0
      });


      /* ==========================================================
         POSICIONES DE PLANOS
         ========================================================== */

      const planePositions = [
        {
          x: -31,
          y: -23,
          rotation: -10,
          scale: 0.72
        },
        {
          x: 28,
          y: -19,
          rotation: 8,
          scale: 0.68
        },
        {
          x: -36,
          y: 15,
          rotation: 7,
          scale: 0.75
        },
        {
          x: 34,
          y: 18,
          rotation: -6,
          scale: 0.72
        },
        {
          x: -12,
          y: -34,
          rotation: -4,
          scale: 0.62
        },
        {
          x: 14,
          y: 32,
          rotation: 5,
          scale: 0.66
        }
      ];

      planes.forEach((plane, index) => {
        const position =
          planePositions[index] ||
          planePositions[0];

        gsap.set(plane, {
          xPercent: position.x,
          yPercent: position.y,
          rotation: position.rotation,
          scale: position.scale,
          transformOrigin: "center center"
        });
      });


      /* ==========================================================
         TIMELINE
         ========================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.15
        }
      });


      /* ==========================================================
         01
         EL NEGRO COMIENZA A ABRIRSE
         ========================================================== */

      timeline.to(
        stageRef.current,
        {
          opacity: 1,
          duration: 0.08,
          ease: "none"
        },
        0
      );

      timeline.to(
        atmosphereRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.18,
          ease: "power3.out"
        },
        0.02
      );


      /* ==========================================================
         02
         APARECE LA ESTRUCTURA
         ========================================================== */

      timeline.to(
        architectureRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.22,
          ease: "power3.out"
        },
        0.08
      );

      timeline.to(
        rearWallRef.current,
        {
          opacity: 1,
          duration: 0.16,
          ease: "power2.out"
        },
        0.1
      );

      timeline.to(
        ceilingRef.current,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out"
        },
        0.13
      );

      timeline.to(
        floorRef.current,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out"
        },
        0.16
      );

      timeline.to(
        leftWallRef.current,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out"
        },
        0.18
      );

      timeline.to(
        rightWallRef.current,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out"
        },
        0.2
      );


      /* ==========================================================
         03
         PLANOS LATERALES
         ========================================================== */

      planes.forEach((plane, index) => {
        const start = 0.23 + index * 0.035;

        timeline.to(
          plane,
          {
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            scale: 1,
            duration: 0.2,
            ease: "power3.out"
          },
          start
        );
      });


      /* ==========================================================
         04
         RETÍCULA ARQUITECTÓNICA
         ========================================================== */

      verticals.forEach((line, index) => {
        timeline.to(
          line,
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.12,
            ease: "power2.out"
          },
          0.36 + index * 0.018
        );
      });

      horizontals.forEach((line, index) => {
        timeline.to(
          line,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.12,
            ease: "power2.out"
          },
          0.39 + index * 0.018
        );
      });


      /* ==========================================================
         05
         LA ESTRUCTURA SE ESTIRA
         ========================================================== */

      timeline.to(
        architectureRef.current,
        {
          scale: 1.16,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.47
      );

      timeline.to(
        planes,
        {
          scale: 1.16,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.47
      );

      timeline.to(
        verticals,
        {
          scaleY: 1.18,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.47
      );

      timeline.to(
        horizontals,
        {
          scaleX: 1.18,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.47
      );


      /* ==========================================================
         06
         SE ABRE EL CENTRO
         ========================================================== */

      timeline.to(
        apertureRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.18,
          ease: "power3.out"
        },
        0.59
      );

      timeline.to(
        apertureInnerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power3.out"
        },
        0.62
      );


      /* ==========================================================
         07
         LUZ INTERIOR
         ========================================================== */

      timeline.to(
        lightRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        },
        0.68
      );

      timeline.to(
        lightColumnRef.current,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.22,
          ease: "power3.out"
        },
        0.7
      );


      /* ==========================================================
         08
         LA ESTRUCTURA SE ALEJA
         ========================================================== */

      timeline.to(
        architectureRef.current,
        {
          scale: 1.34,
          opacity: 0.52,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.78
      );

      timeline.to(
        planes,
        {
          scale: 1.32,
          opacity: 0.35,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.78
      );

      timeline.to(
        verticals,
        {
          opacity: 0.35,
          scaleY: 1.32,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.78
      );

      timeline.to(
        horizontals,
        {
          opacity: 0.35,
          scaleX: 1.32,
          duration: 0.22,
          ease: "power2.inOut"
        },
        0.78
      );


      /* ==========================================================
         09
         EL CENTRO SE CONVIERTE EN ESPACIO
         ========================================================== */

      timeline.to(
        apertureRef.current,
        {
          scale: 1.65,
          opacity: 0.45,
          duration: 0.2,
          ease: "power2.inOut"
        },
        0.84
      );

      timeline.to(
        apertureInnerRef.current,
        {
          scale: 1.9,
          opacity: 0.25,
          duration: 0.2,
          ease: "power2.inOut"
        },
        0.84
      );

      timeline.to(
        lightRef.current,
        {
          scale: 1.5,
          opacity: 0.5,
          duration: 0.2,
          ease: "power2.inOut"
        },
        0.84
      );


      /* ==========================================================
         10
         ENTRA EL MENSAJE
         ========================================================== */

      timeline.to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.08
        },
        0.93
      );

      timeline.to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.11,
          ease: "power3.out"
        },
        0.94
      );

      timeline.to(
        titleTopRef.current,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.16,
          ease: "power4.out"
        },
        0.97
      );

      timeline.to(
        titleBottomRef.current,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.16,
          ease: "power4.out"
        },
        1.005
      );

      timeline.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: "power2.out"
        },
        1.09
      );


      /* ==========================================================
         11
         PAUSA VISUAL
         ========================================================== */

      timeline.to(
        {},
        {
          duration: 0.24
        }
      );


      /* ==========================================================
         12
         LA ESTRUCTURA DESAPARECE DETRÁS DEL MENSAJE
         ========================================================== */

      timeline.to(
        architectureRef.current,
        {
          opacity: 0,
          scale: 1.6,
          duration: 0.2,
          ease: "power3.in"
        }
      );

      timeline.to(
        planes,
        {
          opacity: 0,
          scale: 1.55,
          duration: 0.2,
          ease: "power3.in"
        },
        "<"
      );

      timeline.to(
        verticals,
        {
          opacity: 0,
          scaleY: 1.55,
          duration: 0.2,
          ease: "power3.in"
        },
        "<"
      );

      timeline.to(
        horizontals,
        {
          opacity: 0,
          scaleX: 1.55,
          duration: 0.2,
          ease: "power3.in"
        },
        "<"
      );


      /* ==========================================================
         13
         EL TEXTO QUEDA SOLO
         ========================================================== */

      timeline.to(
        eyebrowRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.1,
          ease: "power2.in"
        }
      );

      timeline.to(
        subtitleRef.current,
        {
          opacity: 0,
          y: -18,
          duration: 0.1,
          ease: "power2.in"
        },
        "<"
      );


      /* ==========================================================
         14
         EL TÍTULO SE EXPANDE
         ========================================================== */

      timeline.to(
        titleTopRef.current,
        {
          scale: 1.12,
          xPercent: -4,
          duration: 0.17,
          ease: "power2.inOut"
        }
      );

      timeline.to(
        titleBottomRef.current,
        {
          scale: 1.12,
          xPercent: 4,
          duration: 0.17,
          ease: "power2.inOut"
        },
        "<"
      );


      /* ==========================================================
         15
         DESVANECIMIENTO
         ========================================================== */

      timeline.to(
        titleTopRef.current,
        {
          opacity: 0,
          xPercent: -12,
          scale: 1.2,
          duration: 0.14,
          ease: "power3.in"
        }
      );

      timeline.to(
        titleBottomRef.current,
        {
          opacity: 0,
          xPercent: 12,
          scale: 1.2,
          duration: 0.14,
          ease: "power3.in"
        },
        "<"
      );

      timeline.to(
        apertureRef.current,
        {
          opacity: 0,
          scale: 2.2,
          duration: 0.18,
          ease: "power3.in"
        },
        "<"
      );

      timeline.to(
        apertureInnerRef.current,
        {
          opacity: 0,
          scale: 2.4,
          duration: 0.18,
          ease: "power3.in"
        },
        "<"
      );

      timeline.to(
        lightColumnRef.current,
        {
          opacity: 0,
          scaleY: 1.8,
          duration: 0.18,
          ease: "power3.in"
        },
        "<"
      );


      /* ==========================================================
         16
         NEGRO TOTAL
         ========================================================== */

      timeline.to(
        atmosphereRef.current,
        {
          opacity: 0,
          scale: 1.4,
          duration: 0.18,
          ease: "power2.in"
        }
      );

      timeline.to(
        closingRef.current,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.in"
        },
        "<"
      );


      /* ==========================================================
         MOVIMIENTO AMBIENTAL
         ========================================================== */

      gsap.to(atmosphereRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });

      gsap.to(lightRef.current, {
        x: 18,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(apertureInnerRef.current, {
        rotation: 180,
        duration: 24,
        repeat: -1,
        ease: "none"
      });


      /* ==========================================================
         REFRESH
         ========================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="legacy-transition"
    >
      <div
        ref={stageRef}
        className="legacy-transition-sticky"
      >

        {/* ======================================================
            ATMÓSFERA
            ====================================================== */}

        <div
          ref={atmosphereRef}
          className="legacy-atmosphere"
        />

        {/* ======================================================
            ARQUITECTURA
            ====================================================== */}

        <div
          ref={architectureRef}
          className="legacy-architecture"
        >

          <div
            ref={rearWallRef}
            className="legacy-rear-wall"
          />

          <div
            ref={ceilingRef}
            className="legacy-ceiling"
          />

          <div
            ref={floorRef}
            className="legacy-floor"
          />

          <div
            ref={leftWallRef}
            className="legacy-wall legacy-wall-left"
          />

          <div
            ref={rightWallRef}
            className="legacy-wall legacy-wall-right"
          />

          {/* ====================================================
              PLANOS
              ==================================================== */}

          <div className="legacy-planes">

            {Array.from(
              { length: 6 },
              (_, index) => (
                <div
                  key={`plane-${index}`}
                  ref={(element) =>
                    setPlaneRef(element, index)
                  }
                  className={`legacy-plane legacy-plane-${index + 1}`}
                />
              )
            )}

          </div>

          {/* ====================================================
              VERTICALES
              ==================================================== */}

          <div className="legacy-verticals">

            {Array.from(
              { length: 7 },
              (_, index) => (
                <span
                  key={`vertical-${index}`}
                  ref={(element) =>
                    setVerticalRef(element, index)
                  }
                  className={`legacy-vertical legacy-vertical-${index + 1}`}
                />
              )
            )}

          </div>

          {/* ====================================================
              HORIZONTALES
              ==================================================== */}

          <div className="legacy-horizontals">

            {Array.from(
              { length: 5 },
              (_, index) => (
                <span
                  key={`horizontal-${index}`}
                  ref={(element) =>
                    setHorizontalRef(element, index)
                  }
                  className={`legacy-horizontal legacy-horizontal-${index + 1}`}
                />
              )
            )}

          </div>

        </div>


        {/* ======================================================
            APERTURA CENTRAL
            ====================================================== */}

        <div
          ref={apertureRef}
          className="legacy-aperture"
        >
          <div
            ref={apertureInnerRef}
            className="legacy-aperture-inner"
          />
        </div>


        {/* ======================================================
            LUZ
            ====================================================== */}

        <div
          ref={lightRef}
          className="legacy-light"
        />

        <div
          ref={lightColumnRef}
          className="legacy-light-column"
        />


        {/* ======================================================
            TEXTO
            ====================================================== */}

        <div
          ref={textRef}
          className="legacy-content"
        >

          <div
            ref={eyebrowRef}
            className="legacy-eyebrow"
          >
            DESPUÉS DE LA OBRA
          </div>

          <div className="legacy-title">

            <span ref={titleTopRef}>
              MÁS ALLÁ
            </span>

            <span ref={titleBottomRef}>
              DE LA OBRA
            </span>

          </div>

          <div
            ref={subtitleRef}
            className="legacy-subtitle"
          >
            EL CONOCIMIENTO CONTINÚA
          </div>

        </div>


        {/* ======================================================
            SALIDA
            ====================================================== */}

        <div
          ref={closingRef}
          className="legacy-closing"
        />

      </div>
    </section>
  );
}

export default LegacyTransition;