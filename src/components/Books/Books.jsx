import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/Books/books.css";

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   LIBROS
   ============================================================ */

const BOOKS = [
  {
    number: "01",
    year: "2022",
    image: "libro1.jpg",
    title: "Defensa fiscal",
    subtitle:
      "Estrategias básicas de impugnación en el juicio contencioso administrativo ante el TFJA",
    description:
      "Obra especializada en estrategias de defensa fiscal y análisis de los medios de impugnación dentro del juicio contencioso administrativo ante el Tribunal Federal de Justicia Administrativa.",
    publisher: "Editorial Flores",
    edition: "1ra. Edición",
    isbn: "978-607-610-958-8",
    pages: "552 páginas",
    link:
      "https://www.floreseditor.com.mx/producto/defensa-fiscal/"
  },

  {
    number: "02",
    year: "2019",
    image: "libro2.jpg",
    title: "Revisiones electrónicas",
    subtitle:
      "La nueva facultad de las autoridades fiscales",
    description:
      "Análisis de las facultades de comprobación electrónica de las autoridades fiscales y sus implicaciones jurídicas para los contribuyentes.",
    publisher: "Editorial Flores",
    edition: "1ra. Edición",
    isbn: "978-607-610-800-0",
    pages: "154 páginas",
    link:
      "https://www.floreseditor.com.mx/producto/revisiones-electronicas-la-nueva-facultad-de-las-autoridades-fiscales/"
  },

  {
    number: "03",
    year: "2019",
    image: "libro3.jpg",
    title:
      "Praxis del juicio contencioso administrativo en línea",
    subtitle:
      "Procedimiento administrativo digital",
    description:
      "Estudio práctico del procedimiento contencioso administrativo en línea y las herramientas digitales aplicadas a la justicia administrativa.",
    publisher: "Editorial Flores",
    edition: "1ra. Edición",
    isbn: "978-607-610-751-5",
    pages: "328 páginas",
    link:
      "https://www.floreseditor.com.mx/producto/praxis-del-juicio-contencioso-administrativo-en-linea/"
  },

  {
    number: "04",
    year: "2018",
    image: "libro4.jpg",
    title: "Defensa Fiscal",
    subtitle:
      "Conceptos de impugnación ganadores/perdedores ante el TFJA",
    description:
      "Análisis de conceptos de impugnación utilizados en medios de defensa fiscal ante el Tribunal Federal de Justicia Administrativa.",
    publisher: "Editorial Flores",
    edition: "1ra. Edición",
    isbn: "978-607-610-654-9",
    pages: "496 páginas",
    link:
      "https://www.floreseditor.com.mx/producto/defensa-fiscal-conceptos-de-impugnacion-ganadores-perdedores-ante-el-tfja/"
  }
];


/* ============================================================
   COMPONENTE
   ============================================================ */

function Books() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }


    /* ========================================================
       ESTADO CANVAS
       ======================================================== */

    const state = {
      progress: 0,
      mouseX: 0.5,
      mouseY: 0.5
    };


    /* ========================================================
       PARTICULAS
       ======================================================== */

    const particles = Array.from(
      { length: 70 },
      (_, index) => ({
        x: Math.random(),
        y: Math.random(),
        size: 0.4 + Math.random() * 1.4,
        speed:
          0.0002 +
          Math.random() * 0.0006,
        phase:
          Math.random() *
          Math.PI *
          2,
        index
      })
    );


    let animationFrame = 0;


    /* ========================================================
       CANVAS — RESIZE
       ======================================================== */

    const resizeCanvas = () => {
      const rect =
        canvas.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.max(
        1,
        Math.floor(rect.width * dpr)
      );

      canvas.height = Math.max(
        1,
        Math.floor(rect.height * dpr)
      );

      context.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };


    /* ========================================================
       CANVAS — FONDO
       ======================================================== */

    const drawBackground = (time) => {
      const rect =
        canvas.getBoundingClientRect();

      const width = rect.width;
      const height = rect.height;

      context.clearRect(
        0,
        0,
        width,
        height
      );


      /* ------------------------------------------------------
         Fondo radial
         ------------------------------------------------------ */

      const background =
        context.createRadialGradient(
          width * 0.5,
          height * 0.48,
          0,
          width * 0.5,
          height * 0.48,
          Math.max(
            width,
            height
          ) * 0.8
        );

      background.addColorStop(
        0,
        "rgba(25, 29, 34, 0.92)"
      );

      background.addColorStop(
        0.45,
        "rgba(7, 9, 12, 0.98)"
      );

      background.addColorStop(
        1,
        "rgba(2, 3, 4, 1)"
      );

      context.fillStyle =
        background;

      context.fillRect(
        0,
        0,
        width,
        height
      );


      /* ------------------------------------------------------
         Retícula editorial
         ------------------------------------------------------ */

      const gridSize =
        Math.max(
          42,
          width / 24
        );

      context.beginPath();

      for (
        let x = 0;
        x <= width;
        x += gridSize
      ) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }

      for (
        let y = 0;
        y <= height;
        y += gridSize
      ) {
        context.moveTo(0, y);
        context.lineTo(width, y);
      }

      context.strokeStyle =
        "rgba(255, 255, 255, 0.025)";

      context.lineWidth = 1;

      context.stroke();


      /* ------------------------------------------------------
         Luz cinematográfica
         ------------------------------------------------------ */

      const lightX =
        width *
        (
          0.5 +
          (state.mouseX - 0.5) *
            0.12
        );

      const lightY =
        height *
        (
          0.46 +
          (state.mouseY - 0.5) *
            0.08
        );

      const light =
        context.createRadialGradient(
          lightX,
          lightY,
          0,
          lightX,
          lightY,
          Math.max(
            width,
            height
          ) * 0.42
        );

      light.addColorStop(
        0,
        "rgba(180, 190, 200, 0.075)"
      );

      light.addColorStop(
        0.35,
        "rgba(130, 145, 160, 0.025)"
      );

      light.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
      );

      context.fillStyle =
        light;

      context.fillRect(
        0,
        0,
        width,
        height
      );


      /* ------------------------------------------------------
         Partículas
         ------------------------------------------------------ */

      particles.forEach(
        (particle) => {
          const px =
            (
              (
                particle.x +
                time *
                  particle.speed
              ) % 1
            ) * width;

          const py =
            particle.y * height +
            Math.sin(
              time * 0.0005 +
                particle.phase
            ) * 8;

          const alpha =
            0.12 +
            Math.sin(
              time * 0.001 +
                particle.phase
            ) * 0.06;

          context.beginPath();

          context.arc(
            px,
            py,
            particle.size,
            0,
            Math.PI * 2
          );

          context.fillStyle =
            `rgba(220, 225, 230, ${Math.max(
              0.02,
              alpha
            )})`;

          context.fill();
        }
      );


      /* ------------------------------------------------------
         Línea editorial
         ------------------------------------------------------ */

      const lineY =
        height *
        (
          0.5 +
          (state.progress - 0.5) *
            0.04
        );

      const gradient =
        context.createLinearGradient(
          0,
          0,
          width,
          0
        );

      gradient.addColorStop(
        0,
        "rgba(255,255,255,0)"
      );

      gradient.addColorStop(
        0.3,
        "rgba(255,255,255,0.08)"
      );

      gradient.addColorStop(
        0.7,
        "rgba(255,255,255,0.08)"
      );

      gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      context.beginPath();

      context.moveTo(
        0,
        lineY
      );

      context.lineTo(
        width,
        lineY
      );

      context.strokeStyle =
        gradient;

      context.lineWidth = 1;

      context.stroke();
    };


    /* ========================================================
       CANVAS — LOOP
       ======================================================== */

    const render = (time) => {
      drawBackground(time);

      animationFrame =
        requestAnimationFrame(
          render
        );
    };


    /* ========================================================
       MOUSE
       ======================================================== */

    const handleMouseMove =
      (event) => {
        const rect =
          section.getBoundingClientRect();

        state.mouseX =
          (
            event.clientX -
            rect.left
          ) /
          Math.max(
            1,
            rect.width
          );

        state.mouseY =
          (
            event.clientY -
            rect.top
          ) /
          Math.max(
            1,
            rect.height
          );
      };


    /* ========================================================
       INICIALIZACIÓN CANVAS
       ======================================================== */

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    section.addEventListener(
      "mousemove",
      handleMouseMove
    );

    animationFrame =
      requestAnimationFrame(
        render
      );


    /* ========================================================
       GSAP
       ======================================================== */

    const contextGSAP =
      gsap.context(() => {
        const bookElements =
          gsap.utils.toArray(
            ".books-item"
          );


        /* ====================================================
           ELEMENTOS
           ==================================================== */

        const intro =
          document.querySelector(
            ".books-intro"
          );

        const counter =
          document.querySelector(
            ".books-counter"
          );

        const counterCurrent =
          document.querySelector(
            ".books-counter-current"
          );

        const progress =
          document.querySelector(
            ".books-progress"
          );

        const closing =
          document.querySelector(
            ".books-closing"
          );


        /* ====================================================
           ESTADO INICIAL
           ==================================================== */

        gsap.set(
          intro,
          {
            opacity: 0,
            y: 50
          }
        );

        gsap.set(
          counter,
          {
            opacity: 0,
            x: -30
          }
        );

        gsap.set(
          progress,
          {
            scaleX: 0,
            transformOrigin:
              "left center"
          }
        );

        gsap.set(
          bookElements,
          {
            opacity: 0
          }
        );

        gsap.set(
          ".books-item-cover",
          {
            opacity: 0,
            scale: 0.84,
            y: 60
          }
        );

        gsap.set(
          ".books-item-info",
          {
            opacity: 0,
            x: 80
          }
        );

        gsap.set(
          ".books-item-number",
          {
            opacity: 0,
            y: 30
          }
        );

        gsap.set(
          ".books-item-meta",
          {
            opacity: 0,
            y: 25
          }
        );

        gsap.set(
          ".books-item-description",
          {
            opacity: 0,
            y: 30
          }
        );

        gsap.set(
          closing,
          {
            opacity: 0
          }
        );


        /* ====================================================
           TIMELINE PRINCIPAL
           
           TODA la narrativa está aquí.
           No hay timelines independientes para los libros.
           ==================================================== */

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: section,

              start:
                "top top",

              end:
                "bottom bottom",

              scrub:
                1.05,

              invalidateOnRefresh:
                true,

              onUpdate:
                (self) => {
                  state.progress =
                    self.progress;


                  /* ------------------------------------------
                     CONTADOR
                     ------------------------------------------ */

                  const totalBooks =
                    bookElements.length;

                  const introEnd =
                    0.105;

                  const booksStart =
                    0.145;

                  const booksEnd =
                    0.79;

                  let activeIndex = 0;

                  if (
                    self.progress <
                    booksStart
                  ) {
                    activeIndex = 0;
                  } else if (
                    self.progress >=
                    booksEnd
                  ) {
                    activeIndex =
                      totalBooks - 1;
                  } else {
                    const normalized =
                      (
                        self.progress -
                        booksStart
                      ) /
                      (
                        booksEnd -
                        booksStart
                      );

                    activeIndex =
                      Math.min(
                        totalBooks - 1,
                        Math.floor(
                          normalized *
                            totalBooks
                        )
                      );
                  }

                  if (
                    counterCurrent
                  ) {
                    counterCurrent.textContent =
                      String(
                        activeIndex + 1
                      ).padStart(
                        2,
                        "0"
                      );
                  }
                }
            }
          });


        /* ====================================================
           01 — INTRO
           ==================================================== */

        timeline

          .to(
            intro,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            },
            0
          )

          .to(
            counter,
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out"
            },
            0.2
          )

          .to(
            progress,
            {
              scaleX: 1,
              duration: 1.2,
              ease: "none"
            },
            0
          );


        /* ====================================================
           02 — SALIDA DEL INTRO
           
           LIBROS PUBLICADOS desaparece ANTES
           de que aparezca cualquier portada.
           ==================================================== */

        timeline.to(
          intro,
          {
            opacity: 0,
            y: -45,
            duration: 0.5,
            ease: "power2.in"
          },
          0.95
        );


        /* ====================================================
           03 — LIBROS
           ==================================================== */

        bookElements.forEach(
          (book, index) => {
            const start =
              1.55 +
              index * 1.72;


            const cover =
              book.querySelector(
                ".books-item-cover"
              );

            const info =
              book.querySelector(
                ".books-item-info"
              );

            const number =
              book.querySelector(
                ".books-item-number"
              );

            const meta =
              book.querySelector(
                ".books-item-meta"
              );

            const description =
              book.querySelector(
                ".books-item-description"
              );


            /* ----------------------------------------------
               ENTRADA DEL LIBRO
               ---------------------------------------------- */

            timeline

              .to(
                book,
                {
                  opacity: 1,
                  duration: 0.1
                },
                start
              )

              .to(
                cover,
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power3.out"
                },
                start
              )

              .to(
                number,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.42,
                  ease: "power2.out"
                },
                start + 0.12
              )

              .to(
                info,
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.7,
                  ease: "power3.out"
                },
                start + 0.18
              )

              .to(
                meta,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out"
                },
                start + 0.35
              )

              .to(
                description,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out"
                },
                start + 0.46
              );


            /* ----------------------------------------------
               PERMANENCIA
               ---------------------------------------------- */

            timeline.to(
              {},
              {
                duration: 0.65
              },
              start + 0.95
            );


            /* ----------------------------------------------
               SALIDA COMPLETA
               
               TODOS salen.
               INCLUYENDO EL CUARTO.
               ---------------------------------------------- */

            timeline.to(
              book,
              {
                opacity: 0,
                duration: 0.48,
                ease: "power2.in"
              },
              start + 1.6
            );
          }
        );


        /* ====================================================
           04 — CIERRE
           
           El cierre empieza DESPUÉS de la salida
           completa del cuarto libro.
           ==================================================== */

        const closingStart =
          1.55 +
          (
            BOOKS.length *
            1.72
          ) +
          0.35;


        timeline

          .to(
            closing,
            {
              opacity: 1,
              duration: 0.45,
              ease: "power2.out"
            },
            closingStart
          )

          .fromTo(
            ".books-closing-line",
            {
              scaleX: 0
            },
            {
              scaleX: 1,
              duration: 0.7,
              ease: "power2.inOut"
            },
            closingStart + 0.1
          )

          .fromTo(
            ".books-closing-title",
            {
              opacity: 0,
              y: 40
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out"
            },
            closingStart + 0.28
          )

          .fromTo(
            ".books-closing-text",
            {
              opacity: 0,
              y: 25
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            },
            closingStart + 0.52
          );


        /* ====================================================
           05 — SALIDA DEL CIERRE
           
           Dejamos también un pequeño cierre limpio
           antes de entregar la pantalla a la siguiente
           sección.
           ==================================================== */

        timeline.to(
          closing,
          {
            opacity: 0,
            y: -25,
            duration: 0.4,
            ease: "power2.in"
          },
          closingStart + 1.55
        );

      }, section);


    /* ========================================================
       CLEANUP
       ======================================================== */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      section.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      contextGSAP.revert();
    };
  }, []);


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      id="books"
      ref={sectionRef}
      className="books"
    >

      <div className="books-sticky">

        <canvas
          ref={canvasRef}
          className="books-canvas"
        />


        <div className="books-overlay" />


        {/* ==================================================
            CABECERA
            ================================================== */}

        <div className="books-topline">

          <span>
            07
          </span>

          <span>
            OBRA PUBLICADA
          </span>

          <span>
            DERECHO FISCAL · INVESTIGACIÓN
          </span>

        </div>


        {/* ==================================================
            INTRO
            ================================================== */}

        <div className="books-intro">

          <div className="books-intro-index">
            07 / 09
          </div>

          <div className="books-intro-kicker">
            CONOCIMIENTO CONVERTIDO EN OBRA
          </div>

          <h2>
            LIBROS
            <span>
              PUBLICADOS
            </span>
          </h2>

          <p>
            Investigación, análisis jurídico y
            experiencia fiscal convertidos en
            publicaciones especializadas.
          </p>

        </div>


        {/* ==================================================
            CONTADOR
            ================================================== */}

        <div className="books-counter">

          <span className="books-counter-current">
            01
          </span>

          <span className="books-counter-separator">
            /
          </span>

          <span>
            04
          </span>

        </div>


        {/* ==================================================
            PROGRESO
            ================================================== */}

        <div className="books-progress">
          <span />
        </div>


        {/* ==================================================
            LIBROS
            ================================================== */}

        <div className="books-items">

          {BOOKS.map(
            (book) => {
              const imagePath =
                `${import.meta.env.BASE_URL}img/testimonials/${book.image}`;

              return (
                <article
                  className="books-item"
                  key={book.number}
                >

                  {/* ----------------------------------------
                      NÚMERO
                      ---------------------------------------- */}

                  <div className="books-item-number">

                    <span>
                      {book.number}
                    </span>

                    <small>
                      {book.year}
                    </small>

                  </div>


                  {/* ----------------------------------------
                      PORTADA
                      ---------------------------------------- */}

                  <a
                    className="books-item-cover"
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      `Ver ${book.title}`
                    }
                  >

                    <div className="books-cover-frame">

                      <img
                        src={imagePath}
                        alt={book.title}
                      />

                    </div>

                    <span className="books-cover-hint">
                      VER PUBLICACIÓN ↗
                    </span>

                  </a>


                  {/* ----------------------------------------
                      INFORMACIÓN
                      ---------------------------------------- */}

                  <div className="books-item-info">

                    <div className="books-item-category">
                      PUBLICACIÓN · {book.year}
                    </div>

                    <h3>
                      {book.title}
                    </h3>

                    <h4>
                      {book.subtitle}
                    </h4>


                    <div className="books-item-meta">

                      <span>
                        {book.publisher}
                      </span>

                      <span>
                        {book.edition}
                      </span>

                      <span>
                        ISBN {book.isbn}
                      </span>

                      <span>
                        {book.pages}
                      </span>

                    </div>


                    <p className="books-item-description">
                      {book.description}
                    </p>

                  </div>

                </article>
              );
            }
          )}

        </div>


        {/* ==================================================
            CIERRE
            ================================================== */}

        <div className="books-closing">

          <div className="books-closing-line" />

          <div className="books-closing-kicker">
            OBRA · INVESTIGACIÓN · EXPERIENCIA
          </div>

          <h2 className="books-closing-title">
            DEL ANÁLISIS
            <span>
              AL LEGADO.
            </span>
          </h2>

          <p className="books-closing-text">
            Una trayectoria profesional también se
            construye a través del conocimiento que
            permanece.
          </p>

        </div>


        {/* ==================================================
            FOOTER
            ================================================== */}

        <div className="books-footer">

          <span>
            MANUEL CUAUHTÉMOC PARRA FLORES
          </span>

          <span>
            DERECHO FISCAL / PUBLICACIONES
          </span>

        </div>

      </div>

    </section>
  );
}


export default Books;