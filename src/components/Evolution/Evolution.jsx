import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/Evolution/evolution.css";

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   FORMACIÓN ACADÉMICA
   ============================================================ */

const EDUCATION = [
  {
    year: "1997 — 1999",
    shortYear: "97",
    title: "Técnico Programador y Analista de Sistemas",
    institution: "Centro de Computación IPDATA",
    category: "TECNOLOGÍA",
    text:
      "Formación en programación, análisis de sistemas, desarrollo de software y resolución de problemas informáticos, estableciendo las bases para la especialización tecnológica.",
  },
  {
    year: "2007 — 2011",
    shortYear: "07",
    title: "Licenciatura en Contaduría Pública",
    institution: "Centro de Estudios Superiores Guerrero",
    category: "CONTADURÍA",
    text:
      "Formación profesional en contabilidad, auditoría, costos, finanzas, impuestos y administración, orientada al cumplimiento de las obligaciones fiscales y financieras.",
  },
  {
    year: "2009 — 2014",
    shortYear: "09",
    title: "Licenciatura en Derecho",
    institution: "Universidad Autónoma de Guerrero",
    category: "DERECHO",
    text:
      "Formación jurídica con énfasis en Derecho Fiscal, Administrativo, Constitucional y Procesal, enfocada en la asesoría y defensa legal de personas y empresas.",
  },
  {
    year: "2011 — 2013",
    shortYear: "11",
    title: "Maestría en Derecho Fiscal",
    institution: "Colegio Mayor de San Carlos",
    category: "DERECHO FISCAL",
    text:
      "Especialización en legislación tributaria, medios de defensa fiscal, interpretación normativa y estrategias jurídicas aplicadas al ámbito tributario.",
  },
  {
    year: "2015 — 2017",
    shortYear: "15",
    title: "Doctorado en Derecho Fiscal",
    institution: "Colegio Mayor de San Carlos",
    category: "DERECHO FISCAL",
    text:
      "Programa de investigación avanzada en Derecho Fiscal, enfocado en la defensa del contribuyente, análisis jurídico y generación de conocimiento especializado.",
  },
  {
    year: "2016 — 2018",
    shortYear: "16",
    title: "Máster en Impuestos",
    institution: "GVA Consultoría y Capacitación S.C.",
    category: "IMPUESTOS",
    text:
      "Programa enfocado en planeación tributaria, cumplimiento fiscal, análisis de reformas y aplicación práctica de la legislación fiscal vigente.",
  },
  {
    year: "2019 — 2021",
    shortYear: "19",
    title: "Licenciatura en Administración de las Finanzas",
    institution: "Universidad Virtual del Estado de Guanajuato (UVEG)",
    category: "FINANZAS",
    text:
      "Especialización en administración financiera, evaluación de inversiones, planeación estratégica y gestión eficiente de recursos económicos.",
  },
  {
    year: "2021 — 2024",
    shortYear: "21",
    title: "Ingeniería en Sistemas Computacionales",
    institution: "Universidad Virtual del Estado de Guanajuato (UVEG)",
    category: "SISTEMAS",
    text:
      "Formación en programación, ingeniería de software, bases de datos, redes, inteligencia artificial y desarrollo de soluciones tecnológicas.",
  },
  {
    year: "2022 — 2026",
    shortYear: "22",
    title: "Ingeniería en Biotecnología",
    institution: "Universidad Abierta y a Distancia de México (UnADM)",
    category: "CIENCIA",
    status: "EN CURSO",
    text:
      "Estudios orientados a la biotecnología, bioingeniería, bioprocesos y aplicación de tecnologías científicas para la innovación y el desarrollo sostenible.",
  },
  {
    year: "2024 — 2027",
    shortYear: "24",
    title: "Ingeniería en Desarrollo de Software",
    institution: "Universidad Virtual del Estado de Guanajuato (UVEG)",
    category: "SOFTWARE",
    status: "EN CURSO",
    text:
      "Formación especializada en desarrollo de software, arquitectura de sistemas, programación, inteligencia artificial y transformación digital.",
  },
  {
    year: "2025 — ACTUALIDAD",
    shortYear: "25",
    title: "Maestría en Dirección e Ingeniería de Software",
    institution: "Universidad UTEL",
    category: "SOFTWARE",
    status: "EN CURSO",
    text:
      "Formación en gestión de proyectos de software, arquitectura empresarial, metodologías ágiles, calidad e innovación tecnológica.",
  },
];


/* ============================================================
   EXPERIENCIA PROFESIONAL
   ============================================================ */

const EXPERIENCE = [
  {
    year: "2005 — 2014",
    shortYear: "05",
    title: "Administración y Contabilidad en Empresas Privadas",
    institution: "Empresas del Sector Hotelero, Comercial y de Servicios",
    category: "ADMINISTRACIÓN",
    items: [
      "Administración general de empresas, supervisión de personal y coordinación de operaciones.",
      "Control de caja, inventarios, facturación y atención directa a clientes y proveedores.",
      "Elaboración de contabilidad, nóminas y estados financieros.",
      "Cálculo y presentación de impuestos federales, estatales y declaraciones informativas.",
      "Manejo de plataformas del SAT, IMSS, SEFINA y sistemas administrativos ASPEL.",
      "Optimización de procesos administrativos, financieros y contables para mejorar la eficiencia operativa.",
    ],
  },
  {
    year: "2012 — 2014",
    shortYear: "12",
    title: "Especialista en Contabilidad e Impuestos",
    institution: "Productos Comerciales del Pacífico (PROCOPA)",
    category: "FISCAL",
    items: [
      "Contabilidad general y cálculo de impuestos.",
      "Presentación de declaraciones e informativas.",
      "Facturación electrónica y administración de nómina.",
      "Atención a proveedores y procesos administrativos.",
    ],
  },
  {
    year: "2014 — ACTUALIDAD",
    shortYear: "14",
    title: "Contador Público y Consultor Fiscal",
    institution: "Despacho Contable y Práctica Independiente",
    category: "CONTADURÍA",
    items: [
      "Consultoría contable, fiscal y financiera.",
      "Planeación tributaria y cumplimiento fiscal.",
      "Asesoría a personas físicas y morales.",
      "Automatización de procesos mediante tecnología.",
    ],
  },
  {
    year: "2015 — ACTUALIDAD",
    shortYear: "15",
    title: "Abogado Fiscalista y Litigante",
    institution: "Práctica Profesional Independiente",
    category: "DERECHO",
    items: [
      "Defensa en materia fiscal y administrativa.",
      "Litigio civil, mercantil, laboral y familiar.",
      "Estrategias jurídicas para empresas.",
      "Representación legal de clientes.",
    ],
  },
  {
    year: "2021 — ACTUALIDAD",
    shortYear: "21",
    title: "Ingeniero de Software y Desarrollador Tecnológico",
    institution: "Desarrollo de Proyectos Tecnológicos",
    category: "SOFTWARE",
    items: [
      "Diseño y desarrollo de aplicaciones web, sistemas administrativos y herramientas digitales.",
      "Implementación de soluciones mediante programación, bases de datos e inteligencia artificial.",
      "Automatización de procesos empresariales utilizando tecnologías modernas y desarrollo de software.",
      "Integración de conocimientos en ingeniería, finanzas y derecho para la transformación digital.",
    ],
  },
  {
    year: "2012 — ACTUALIDAD",
    shortYear: "12",
    title: "Docente Universitario",
    institution: "Instituciones de Educación Superior",
    category: "DOCENCIA",
    items: [
      "Docencia en licenciatura, maestría y doctorado.",
      "Asignaturas en Derecho, Contaduría, Finanzas y Software.",
      "Dirección de tesis y proyectos de investigación.",
      "Desarrollo de materiales y recursos académicos.",
    ],
  },
  {
    year: "2017 — ACTUALIDAD",
    shortYear: "17",
    title: "Conferencista, Autor y Articulista",
    institution: "Editoriales, Universidades y Revistas Especializadas",
    category: "DIVULGACIÓN",
    items: [
      "Coautor de libros especializados en Derecho Fiscal.",
      "Más de 325 artículos especializados publicados.",
      "Participación en conferencias y actividades académicas sobre temas fiscales.",
      "Divulgación de conocimiento jurídico y fiscal.",
    ],
  },
  {
    year: "2023 — ACTUALIDAD",
    shortYear: "23",
    title: "Reconocimientos Profesionales",
    institution: "Revista Defensa Fiscal",
    category: "RECONOCIMIENTO",
    items: [
      "Reconocido entre los Fiscalistas más importantes de México.",
      "Reconocimientos correspondientes al periodo 2023 — 2026.",
      "Aporte al desarrollo y divulgación del Derecho Tributario en México.",
    ],
  },
];


/* ============================================================
   EDUCATION ITEM
   ============================================================ */

function EducationItem({ item, index }) {
  return (
    <article
      className="evolution-entry evolution-entry-education"
      data-index={index}
    >
      <div className="evolution-entry-node">
        <span />
      </div>

      <div className="evolution-entry-year">
        <span className="evolution-entry-year-full">
          {item.year}
        </span>

        <span className="evolution-entry-year-short">
          {item.shortYear}
        </span>
      </div>

      <div className="evolution-entry-card">
        <div className="evolution-entry-card-glow" />

        <div className="evolution-entry-top">
          <span className="evolution-entry-category">
            {item.category}
          </span>

          {item.status && (
            <span className="evolution-entry-status">
              {item.status}
            </span>
          )}
        </div>

        <h4>
          {item.title}
        </h4>

        <p className="evolution-entry-institution">
          {item.institution}
        </p>

        <div className="evolution-entry-divider" />

        <p className="evolution-entry-description">
          {item.text}
        </p>

        <span className="evolution-entry-corner" />
      </div>
    </article>
  );
}


/* ============================================================
   EXPERIENCE ITEM
   ============================================================ */

function ExperienceItem({ item, index }) {
  return (
    <article
      className="evolution-entry evolution-entry-experience"
      data-index={index}
    >
      <div className="evolution-entry-node">
        <span />
      </div>

      <div className="evolution-entry-year">
        <span className="evolution-entry-year-full">
          {item.year}
        </span>

        <span className="evolution-entry-year-short">
          {item.shortYear}
        </span>
      </div>

      <div className="evolution-entry-card">
        <div className="evolution-entry-card-glow" />

        <div className="evolution-entry-top">
          <span className="evolution-entry-category">
            {item.category}
          </span>
        </div>

        <h4>
          {item.title}
        </h4>

        <p className="evolution-entry-institution">
          {item.institution}
        </p>

        <div className="evolution-entry-divider" />

        <ul>
          {item.items.map((description, itemIndex) => (
            <li key={itemIndex}>
              <span className="evolution-list-marker" />
              {description}
            </li>
          ))}
        </ul>

        <span className="evolution-entry-corner" />
      </div>
    </article>
  );
}


/* ============================================================
   EVOLUTION
   ============================================================ */

function Evolution() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {

      /* --------------------------------------------------------
         HEADER
         -------------------------------------------------------- */

      gsap.fromTo(
        ".evolution-header-index",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".evolution-header",
            start: "top 84%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".evolution-header-kicker",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".evolution-header",
            start: "top 84%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".evolution-header h2",
        {
          opacity: 0,
          y: 40,
          clipPath: "inset(100% 0 0 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1.15,
          delay: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".evolution-header",
            start: "top 84%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".evolution-header-description",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".evolution-header",
            start: "top 84%",
            once: true,
          },
        }
      );


      /* --------------------------------------------------------
         PROFILE
         -------------------------------------------------------- */

      gsap.fromTo(
        ".evolution-profile-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".evolution-profile",
            start: "top 82%",
            once: true,
          },
        }
      );


      /* --------------------------------------------------------
         BLOCK HEADERS
         -------------------------------------------------------- */

      gsap.utils.toArray(
        ".evolution-block-header"
      ).forEach((header) => {

        gsap.fromTo(
          header,
          {
            opacity: 0,
            x: -35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 86%",
              once: true,
            },
          }
        );

      });


      /* --------------------------------------------------------
         TIMELINE AXES
         -------------------------------------------------------- */

      gsap.utils.toArray(
        ".evolution-timeline"
      ).forEach((timeline) => {

        const axis =
          timeline.querySelector(
            ".evolution-timeline-axis"
          );

        if (!axis) {
          return;
        }

        gsap.fromTo(
          axis,
          {
            scaleY: 0,
            transformOrigin: "top center",
          },
          {
            scaleY: 1,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timeline,
              start: "top 78%",
              once: true,
            },
          }
        );

      });


      /* --------------------------------------------------------
         ENTRIES
         -------------------------------------------------------- */

      gsap.utils.toArray(
        ".evolution-entry"
      ).forEach((entry) => {

        const node =
          entry.querySelector(
            ".evolution-entry-node"
          );

        const card =
          entry.querySelector(
            ".evolution-entry-card"
          );

        const year =
          entry.querySelector(
            ".evolution-entry-year"
          );

        const delay =
          Number(entry.dataset.index || 0) * 0.035;

        gsap.fromTo(
          entry,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 89%",
              once: true,
            },
          }
        );

        if (node) {
          gsap.fromTo(
            node,
            {
              scale: 0,
            },
            {
              scale: 1,
              duration: 0.55,
              delay: delay + 0.12,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: entry,
                start: "top 89%",
                once: true,
              },
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            {
              clipPath: "inset(0 100% 0 0)",
            },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.9,
              delay: delay + 0.05,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: entry,
                start: "top 89%",
                once: true,
              },
            }
          );
        }

        if (year) {
          gsap.fromTo(
            year,
            {
              opacity: 0,
              x: -15,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              delay: delay + 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 89%",
                once: true,
              },
            }
          );
        }

      });


      /* --------------------------------------------------------
         BACKGROUND PARALLAX
         -------------------------------------------------------- */

      gsap.to(
        ".evolution-background-grid",
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      gsap.to(
        ".evolution-glow-one",
        {
          y: 180,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      gsap.to(
        ".evolution-glow-two",
        {
          y: -220,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        }
      );


      /* --------------------------------------------------------
         CAMPO ESPACIAL
         -------------------------------------------------------- */

      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      if (!reducedMotion) {

        /* ------------------------------------------------------
           PARTÍCULAS
           ------------------------------------------------------ */

        const particles =
          gsap.utils.toArray(
            ".evolution-space-particle"
          );

        particles.forEach(
          (particle, index) => {

            gsap.fromTo(
              particle,
              {
                opacity:
                  0.28 +
                  (index % 5) * 0.04,
                scale:
                  0.65 +
                  (index % 4) * 0.22,
                x: 0,
                y: 0,
              },
              {
                opacity:
                  0.62 +
                  (index % 5) * 0.065,
                scale:
                  0.9 +
                  (index % 4) * 0.3,
                x:
                  [-100, 150, -180, 210, -125][
                    index % 5
                  ],
                y:
                  [120, -150, 180, -100, 75][
                    index % 5
                  ],
                duration:
                  7 +
                  (index % 6) * 2.2,
                delay:
                  (index % 9) * 0.55,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              }
            );

          }
        );


        /* ------------------------------------------------------
           PLANETAS
           ------------------------------------------------------ */

        const planets =
          gsap.utils.toArray(
            ".evolution-space-planet"
          );

        const planetMotion = [
          {
            x: -240,
            y: 150,
            duration: 27,
            scale: 1.08,
            rotation: 360,
          },
          {
            x: 180,
            y: -120,
            duration: 34,
            scale: 1.04,
            rotation: -360,
          },
          {
            x: -170,
            y: 190,
            duration: 31,
            scale: 1.1,
            rotation: 360,
          },
          {
            x: 220,
            y: 120,
            duration: 38,
            scale: 1.06,
            rotation: -360,
          },
          {
            x: -210,
            y: -130,
            duration: 30,
            scale: 1.08,
            rotation: 360,
          },
          {
            x: 130,
            y: 170,
            duration: 24,
            scale: 1.14,
            rotation: -360,
          },
        ];

        planets.forEach(
          (planet, index) => {

            const motion =
              planetMotion[
                index % planetMotion.length
              ];

            gsap.fromTo(
              planet,
              {
                x: 0,
                y: 0,
                scale: 0.9,
                opacity: 0.82,
              },
              {
                x: motion.x,
                y: motion.y,
                scale: motion.scale,
                opacity: 1,
                duration: motion.duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 1.2,
              }
            );

            gsap.to(
              planet,
              {
                rotation: motion.rotation,
                duration:
                  45 +
                  index * 7,
                repeat: -1,
                ease: "none",
              }
            );

          }
        );


        /* ------------------------------------------------------
           COMETAS
           
           La posición del cometa representa la CABEZA.
           La cola se orienta exclusivamente mediante CSS.
           
           Por eso NO rotamos el elemento completo:
           
           COMETA 1:
           movimiento → abajo / izquierda
           cola       ← arriba / derecha
           
           COMETA 2:
           movimiento → derecha / abajo
           cola       ← izquierda / arriba
           
           COMETA 3:
           movimiento → arriba / izquierda
           cola       ← abajo / derecha
           ------------------------------------------------------ */

        const comets =
          gsap.utils.toArray(
            ".evolution-space-comet"
          );

        const field =
          section.querySelector(
            ".evolution-space-field"
          );

        if (field) {

          const getFieldSize = () => {

            const rect =
              field.getBoundingClientRect();

            return {
              width: Math.max(
                rect.width,
                window.innerWidth
              ),
              height: Math.max(
                rect.height,
                window.innerHeight
              ),
            };

          };


          const cometTrajectories = [

            /* ------------------------------------------------
               COMETA 1
               ARRIBA-DERECHA
                    ↓
               ABAJO-IZQUIERDA

               LA CABEZA VA DELANTE.
               LA COLA QUEDA ARRIBA-DERECHA.
               ------------------------------------------------ */

            {
              start: (size) => ({
                x: size.width * 0.72,
                y: -size.height * 0.28,
              }),

              end: (size) => ({
                x: -size.width * 0.82,
                y: size.height * 1.12,
              }),

              duration: 18,
              delay: 0,
            },


            /* ------------------------------------------------
               COMETA 2
               IZQUIERDA-MEDIA
                    ↓
               DERECHA-INFERIOR

               LA CABEZA VA DERECHA-ABAJO.
               LA COLA QUEDA IZQUIERDA-ARRIBA.
               ------------------------------------------------ */

            {
              start: (size) => ({
                x: -size.width * 0.32,
                y: size.height * 0.28,
              }),

              end: (size) => ({
                x: size.width * 1.15,
                y: size.height * 0.92,
              }),

              duration: 21,
              delay: 7,
            },


            /* ------------------------------------------------
               COMETA 3
               ABAJO-DERECHA
                    ↓
               ARRIBA-IZQUIERDA

               LA CABEZA VA ARRIBA-IZQUIERDA.
               LA COLA QUEDA ABAJO-DERECHA.
               ------------------------------------------------ */

            {
              start: (size) => ({
                x: size.width * 0.92,
                y: size.height * 1.15,
              }),

              end: (size) => ({
                x: -size.width * 0.45,
                y: -size.height * 0.38,
              }),

              duration: 20,
              delay: 13,
            },

          ];


          const animateComet = (
            comet,
            index
          ) => {

            const trajectory =
              cometTrajectories[
                index %
                cometTrajectories.length
              ];

            const size =
              getFieldSize();

            const start =
              trajectory.start(size);

            const end =
              trajectory.end(size);


            /* ------------------------------------------------
               ELEMENTOS INTERNOS
               ------------------------------------------------ */

            const tail =
              comet.querySelector(
                ".evolution-space-comet-tail"
              );

            const wideTail =
              comet.querySelector(
                ".evolution-space-comet-tail-wide"
              );

            const corona =
              comet.querySelector(
                ".evolution-space-comet-corona"
              );


            /* ------------------------------------------------
               LIMPIAR ANIMACIONES ANTERIORES
               ------------------------------------------------ */

            gsap.killTweensOf(
              comet
            );

            if (tail) {
              gsap.killTweensOf(
                tail
              );
            }

            if (wideTail) {
              gsap.killTweensOf(
                wideTail
              );
            }

            if (corona) {
              gsap.killTweensOf(
                corona
              );
            }


            /* ------------------------------------------------
               POSICIÓN INICIAL

               IMPORTANTE:
               rotation = 0.

               La dirección visual de la cola NO depende
               de la rotación del objeto completo.
               ------------------------------------------------ */

            gsap.set(
              comet,
              {
                x: start.x,
                y: start.y,
                opacity: 0,
                scale: 0.72,
                rotation: 0,
                transformOrigin:
                  "center center",
              }
            );


            /* ------------------------------------------------
               ENTRADA + RECORRIDO
               ------------------------------------------------ */

            const timeline =
              gsap.timeline({
                delay:
                  trajectory.delay,
                repeat: -1,
                repeatDelay:
                  4 + index * 2,
              });


            timeline.to(
              comet,
              {
                opacity: 1,
                scale: 0.92,
                duration: 1.1,
                ease: "power2.out",
              }
            );


            timeline.to(
              comet,
              {
                x: end.x,
                y: end.y,
                scale: 1.08,
                duration:
                  trajectory.duration,
                ease: "none",
              }
            );


            /* ------------------------------------------------
               DESAPARECE DESPUÉS DE SALIR
               ------------------------------------------------ */

            timeline.to(
              comet,
              {
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
              }
            );


            /* ------------------------------------------------
               COLA PRINCIPAL

               La animación modifica únicamente longitud/
               intensidad, NO la dirección.
               ------------------------------------------------ */

            if (tail) {

              gsap.fromTo(
                tail,
                {
                  scaleX: 0.72,
                  opacity: 0.62,
                },
                {
                  scaleX: 1.08,
                  opacity: 1,
                  duration:
                    1.1 +
                    index * 0.18,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                }
              );

            }


            /* ------------------------------------------------
               COLA DIFUSA EXTERIOR
               ------------------------------------------------ */

            if (wideTail) {

              gsap.fromTo(
                wideTail,
                {
                  scaleX: 0.62,
                  opacity: 0.28,
                },
                {
                  scaleX: 1.05,
                  opacity: 0.72,
                  duration:
                    1.45 +
                    index * 0.2,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                }
              );

            }


            /* ------------------------------------------------
               CORONA
               ------------------------------------------------ */

            if (corona) {

              gsap.fromTo(
                corona,
                {
                  scale: 0.82,
                  opacity: 0.55,
                },
                {
                  scale: 1.18,
                  opacity: 0.95,
                  duration:
                    1.2 +
                    index * 0.15,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                }
              );

            }

          };


          comets.forEach(
            (comet, index) => {

              animateComet(
                comet,
                index
              );

            }
          );


          /* ------------------------------------------------
             RECALCULAR TRAYECTORIAS AL CAMBIAR TAMAÑO
             ------------------------------------------------ */

          let resizeTimer;

          const handleResize = () => {

            clearTimeout(
              resizeTimer
            );

            resizeTimer =
              window.setTimeout(
                () => {

                  comets.forEach(
                    (comet, index) => {

                      animateComet(
                        comet,
                        index
                      );

                    }
                  );

                },
                250
              );

          };


          window.addEventListener(
            "resize",
            handleResize
          );


          section._evolutionCometResize =
            handleResize;

        }


        /* ------------------------------------------------------
           ASTEROIDES
           ------------------------------------------------------ */

        const asteroids =
          gsap.utils.toArray(
            ".evolution-space-asteroid"
          );

        asteroids.forEach(
          (asteroid, index) => {

            const direction =
              index % 2 === 0
                ? 1
                : -1;

            gsap.fromTo(
              asteroid,
              {
                x:
                  direction > 0
                    ? -180
                    : 220,

                y:
                  index === 0
                    ? 130
                    : index === 1
                      ? -120
                      : 80,

                opacity: 0,

                rotation:
                  direction > 0
                    ? -25
                    : 35,

                scale:
                  0.82 +
                  index * 0.08,
              },
              {
                x:
                  direction > 0
                    ? 1250
                    : -1250,

                y:
                  index === 0
                    ? 430
                    : index === 1
                      ? 620
                      : -360,

                opacity: 0.9,

                rotation:
                  direction > 0
                    ? 360
                    : -300,

                scale:
                  1 +
                  index * 0.08,

                duration:
                  14 +
                  index * 3,

                delay:
                  5 +
                  index * 5,

                repeat: -1,

                repeatDelay:
                  8 +
                  index * 3,

                ease: "none",
              }
            );

          }
        );


        /* ------------------------------------------------------
           PARALLAX ESPACIAL
           ------------------------------------------------------ */

        gsap.to(
          ".evolution-space-field",
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 3,
            },
          }
        );

      }


      /* --------------------------------------------------------
         REDUCED MOTION — MANTENER VISIBLES
         -------------------------------------------------------- */

      else {

        gsap.set(
          ".evolution-space-particle",
          {
            opacity: 0.55,
          }
        );

        gsap.set(
          ".evolution-space-planet",
          {
            opacity: 0.9,
            scale: 1,
          }
        );

        gsap.set(
          ".evolution-space-comet",
          {
            opacity: 0.9,
            scale: 1,
            rotation: 0,
          }
        );

        gsap.set(
          ".evolution-space-asteroid",
          {
            opacity: 0.7,
          }
        );

      }

    }, section);

    return () => {

      if (
        section._evolutionCometResize
      ) {

        window.removeEventListener(
          "resize",
          section._evolutionCometResize
        );

        delete section._evolutionCometResize;

      }

      ctx.revert();

    };

  }, []);


  return (
    <section
      id="evolution"
      ref={sectionRef}
      className="evolution"
    >

      {/* ======================================================
          AMBIENTE
          ====================================================== */}

      <div
        className="evolution-background-grid"
        aria-hidden="true"
      />

      <div
        className="evolution-glow evolution-glow-one"
        aria-hidden="true"
      />

      <div
        className="evolution-glow evolution-glow-two"
        aria-hidden="true"
      />


      {/* ======================================================
          CAMPO ESPACIAL
          ====================================================== */}

      <div
        className="evolution-space-field"
        aria-hidden="true"
      >

        {/* ----------------------------------------------------
            PARTÍCULAS
            ---------------------------------------------------- */}

        <div className="evolution-space-particles">

          {Array.from(
            { length: 42 },
            (_, index) => (
              <span
                key={`particle-${index}`}
                className={`evolution-space-particle evolution-space-particle-${index + 1}`}
              />
            )
          )}

        </div>


        {/* ----------------------------------------------------
            PLANETAS
            ---------------------------------------------------- */}

        <div className="evolution-space-planets">

          {/* PLANETA 1 — ROCOSO */}

          <span
            className="
              evolution-space-planet
              evolution-space-planet-rock
              evolution-space-planet-one
            "
          >
            <span className="evolution-space-planet-atmosphere" />

            <span className="evolution-space-planet-surface" />

            <span className="evolution-space-planet-crater evolution-space-planet-crater-one" />
            <span className="evolution-space-planet-crater evolution-space-planet-crater-two" />
            <span className="evolution-space-planet-crater evolution-space-planet-crater-three" />
            <span className="evolution-space-planet-crater evolution-space-planet-crater-four" />
            <span className="evolution-space-planet-crater evolution-space-planet-crater-five" />

            <span className="evolution-space-planet-highlight" />
          </span>


          {/* PLANETA 2 — GIGANTE GASEOSO */}

          <span
            className="
              evolution-space-planet
              evolution-space-planet-gas
              evolution-space-planet-two
            "
          >
            <span className="evolution-space-planet-gas-band evolution-space-space-gas-band-one" />
            <span className="evolution-space-planet-gas-band evolution-space-space-gas-band-two" />
            <span className="evolution-space-planet-gas-band evolution-space-space-gas-band-three" />
            <span className="evolution-space-planet-gas-band evolution-space-space-gas-band-four" />

            <span className="evolution-space-planet-gas-storm" />

            <span className="evolution-space-planet-gas-highlight" />
          </span>


          {/* PLANETA 3 — HIELO */}

          <span
            className="
              evolution-space-planet
              evolution-space-planet-ice
              evolution-space-planet-three
            "
          >
            <span className="evolution-space-planet-ice-surface" />

            <span className="evolution-space-planet-ice-crack evolution-space-planet-ice-crack-one" />
            <span className="evolution-space-planet-ice-crack evolution-space-planet-ice-crack-two" />
            <span className="evolution-space-planet-ice-crack evolution-space-planet-ice-crack-three" />

            <span className="evolution-space-planet-ice-highlight" />
            <span className="evolution-space-planet-ice-glow" />
          </span>


          {/* PLANETA 4 — ANILLADO */}

          <span
            className="
              evolution-space-planet
              evolution-space-planet-ringed
              evolution-space-planet-four
            "
          >
            <span className="evolution-space-planet-ring evolution-space-planet-ring-back" />

            <span className="evolution-space-planet-ring-body">
              <span className="evolution-space-planet-ring-surface" />
              <span className="evolution-space-planet-ring-highlight" />
            </span>

            <span className="evolution-space-planet-ring evolution-space-planet-ring-front" />
          </span>


          {/* PLANETA 5 — ROCOSO COBRE */}

          <span
            className="
              evolution-space-planet
              evolution-space-planet-copper
              evolution-space-planet-five
            "
          >
            <span className="evolution-space-planet-copper-surface" />

            <span className="evolution-space-planet-crater evolution-space-planet-copper-crater-one" />
            <span className="evolution-space-planet-crater evolution-space-planet-copper-crater-two" />
            <span className="evolution-space-planet-crater evolution-space-planet-copper-crater-three" />

            <span className="evolution-space-planet-copper-ridge" />
            <span className="evolution-space-planet-copper-highlight" />
          </span>


          {/* PLANETA 6 — LUNA */}

          <span
            className="
              evolution-space-planet
              evolution-space-planet-moon
              evolution-space-planet-six
            "
          >
            <span className="evolution-space-planet-moon-surface" />

            <span className="evolution-space-planet-moon-crater evolution-space-space-moon-crater-one" />
            <span className="evolution-space-planet-moon-crater evolution-space-space-moon-crater-two" />
            <span className="evolution-space-planet-moon-crater evolution-space-space-moon-crater-three" />

            <span className="evolution-space-planet-moon-highlight" />
          </span>

        </div>


        {/* ----------------------------------------------------
            COMETAS
            ---------------------------------------------------- */}

        <div className="evolution-space-comet-layer">

          <span
            className="
              evolution-space-comet
              evolution-space-comet-one
            "
          >
            <span className="evolution-space-comet-tail-wide" />
            <span className="evolution-space-comet-tail" />
            <span className="evolution-space-comet-corona" />
            <span className="evolution-space-comet-core" />
          </span>


          <span
            className="
              evolution-space-comet
              evolution-space-comet-two
            "
          >
            <span className="evolution-space-comet-tail-wide" />
            <span className="evolution-space-comet-tail" />
            <span className="evolution-space-comet-corona" />
            <span className="evolution-space-comet-core" />
          </span>


          <span
            className="
              evolution-space-comet
              evolution-space-comet-three
            "
          >
            <span className="evolution-space-comet-tail-wide" />
            <span className="evolution-space-comet-tail" />
            <span className="evolution-space-comet-corona" />
            <span className="evolution-space-comet-core" />
          </span>

        </div>


        {/* ----------------------------------------------------
            ASTEROIDES
            ---------------------------------------------------- */}

        <div className="evolution-space-asteroids">

          <span
            className="
              evolution-space-asteroid
              evolution-space-asteroid-one
            "
          />

          <span
            className="
              evolution-space-asteroid
              evolution-space-asteroid-two
            "
          />

          <span
            className="
              evolution-space-asteroid
              evolution-space-asteroid-three
            "
          />

        </div>

      </div>


      <div
        className="evolution-noise"
        aria-hidden="true"
      />

      <div
        className="evolution-top-scan"
        aria-hidden="true"
      />


      {/* ======================================================
          CONTENEDOR
          ====================================================== */}

      <div className="evolution-container">


        {/* ====================================================
            HEADER
            ==================================================== */}

        <header className="evolution-header">

          <div className="evolution-header-index">
            <span>04</span>
            <i />
            <span>EVOLUCIÓN</span>
          </div>

          <p className="evolution-header-kicker">
            CURRÍCULUM PROFESIONAL
          </p>

          <h2>
            Una trayectoria
            <br />
            construida entre disciplinas.
          </h2>

          <p className="evolution-header-description">
            Derecho, contaduría, finanzas y tecnología integrados
            en una trayectoria profesional, académica y de desarrollo
            tecnológico.
          </p>

          <div className="evolution-header-decoration">
            <span />
            <span />
            <span />
          </div>

        </header>


        {/* ====================================================
            PROFILE
            ==================================================== */}

        <section className="evolution-profile">

          <div className="evolution-block-header">

            <div className="evolution-block-number">
              01
            </div>

            <div>
              <span>PERFIL</span>
              <h3>Resumen profesional</h3>
            </div>

            <div className="evolution-section-line" />

          </div>


          <article className="evolution-profile-card">

            <div className="evolution-profile-card-grid" />

            <div className="evolution-profile-main">

              <div className="evolution-profile-id">
                <span>IDENTIDAD PROFESIONAL</span>
                <strong>MPF / 01</strong>
              </div>

              <span className="evolution-profile-label">
                PROFESIONAL INDEPENDIENTE
              </span>

              <h3>
                Manuel
              </h3>

              <p>
                Contador y Abogado especializado en Derecho Fiscal,
                Contaduría Pública, Finanzas y Tecnologías de la
                Información.
              </p>

              <p>
                Su trayectoria integra la práctica profesional,
                la docencia universitaria, la investigación y el
                desarrollo de soluciones tecnológicas, combinando
                conocimientos jurídicos, financieros y de software
                para resolver problemas complejos y participar en
                procesos de transformación digital.
              </p>

              <div className="evolution-profile-signature">
                <span />
                <small>
                  PROFESIONAL · ACADÉMICO · TECNOLÓGICO
                </small>
              </div>

            </div>


            <div className="evolution-profile-data">

              <div className="evolution-profile-data-item">
                <span>DISCIPLINAS</span>
                <strong>
                  DERECHO
                  <br />
                  CONTADURÍA
                  <br />
                  FINANZAS
                  <br />
                  SOFTWARE
                </strong>
              </div>

              <div className="evolution-profile-data-item">
                <span>EXPERIENCIA</span>
                <strong>
                  13+ AÑOS
                </strong>
              </div>

              <div className="evolution-profile-data-item">
                <span>UBICACIÓN</span>
                <strong>
                  CHILPANCINGO
                  <br />
                  GUERRERO · MÉXICO
                </strong>
              </div>

              <div className="evolution-profile-data-index">
                04 / 01
              </div>

            </div>

          </article>

        </section>


        {/* ====================================================
            EDUCACIÓN
            ==================================================== */}

        <section className="evolution-block">

          <div className="evolution-block-header">

            <div className="evolution-block-number">
              02
            </div>

            <div>
              <span>FORMACIÓN</span>
              <h3>Formación académica</h3>
            </div>

            <div className="evolution-section-line" />

          </div>


          <div className="evolution-section-intro">

            <span>
              1997 — 2027
            </span>

            <p>
              Una formación progresiva que parte de la programación,
              atraviesa el ámbito jurídico, fiscal y financiero,
              y converge nuevamente en ingeniería y desarrollo
              de software.
            </p>

          </div>


          <div className="evolution-timeline">

            <div
              className="evolution-timeline-axis"
              aria-hidden="true"
            />

            {EDUCATION.map((item, index) => (
              <EducationItem
                key={`${item.year}-${item.title}`}
                item={item}
                index={index}
              />
            ))}

          </div>

        </section>


        {/* ====================================================
            EXPERIENCIA
            ==================================================== */}

        <section className="evolution-block evolution-experience">

          <div className="evolution-block-header">

            <div className="evolution-block-number">
              03
            </div>

            <div>
              <span>TRAYECTORIA</span>
              <h3>Experiencia profesional</h3>
            </div>

            <div className="evolution-section-line" />

          </div>


          <div className="evolution-section-intro">

            <span>
              2005 — ACTUALIDAD
            </span>

            <p>
              Experiencia desarrollada entre la práctica profesional,
              el ejercicio jurídico y fiscal, la docencia, la
              divulgación especializada y el desarrollo tecnológico.
            </p>

          </div>


          <div className="evolution-timeline">

            <div
              className="evolution-timeline-axis"
              aria-hidden="true"
            />

            {EXPERIENCE.map((item, index) => (
              <ExperienceItem
                key={`${item.year}-${item.title}`}
                item={item}
                index={index}
              />
            ))}

          </div>

        </section>


        {/* ====================================================
            FOOTER
            ==================================================== */}

        <footer className="evolution-footer">

          <div className="evolution-footer-line" />

          <span>DERECHO</span>

          <i />

          <span>CONTADURÍA</span>

          <i />

          <span>FINANZAS</span>

          <i />

          <span>SOFTWARE</span>

          <div className="evolution-footer-line" />

        </footer>

      </div>

    </section>
  );
}

export default Evolution;