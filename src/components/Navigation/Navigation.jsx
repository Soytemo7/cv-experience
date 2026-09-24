import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import gsap from "gsap";

import "../../styles/Navigation/navigation.css";


const NAVIGATION_ITEMS = [
  {
    id: "identity",
    number: "01",
    label: "IDENTIDAD",
    selector: ".identity"
  },
  {
    id: "experience",
    number: "02",
    label: "TRAYECTORIA",
    selector: ".experience"
  },
  {
    id: "about",
    number: "03",
    label: "ACERCA DE",
    selector: ".about"
  },
  {
    id: "formation",
    number: "04",
    label: "FORMACIÓN",
    selector: ".formation"
  },
  {
    id: "evolution",
    number: "05",
    label: "CURRÍCULUM VITAE",
    selector: ".evolution"
  },
  {
    id: "books",
    number: "06",
    label: "LIBROS",
    selector: ".books"
  },
    {
    id: "magazines",
    number: "07",
    label: "ARTÍCULOS",
    selector: ".magazines"
  },
  {
    id: "contact",
    number: "08",
    label: "CONTACTO",
    selector: ".contact-section"
  },
  
];

function Navigation() {
  const navigationRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [activeSection, setActiveSection] =
    useState("identity");

  const [hoveredSection, setHoveredSection] =
    useState(null);

  const [compact, setCompact] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);


  /*
   * ============================================================
   * INTRODUCCIÓN
   * ============================================================
   */

  useEffect(() => {
    const navigation = navigationRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;
    const cta = ctaRef.current;

    if (
      !navigation ||
      !logo ||
      !links ||
      !cta
    ) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(
        navigation,
        {
          y: -30,
          autoAlpha: 0
        }
      );

      gsap.set(
        [
          logo,
          links,
          cta
        ],
        {
          autoAlpha: 0
        }
      );

      gsap
        .timeline()
        .to(
          navigation,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out"
          }
        )
        .to(
          logo,
          {
            autoAlpha: 1,
            duration: 0.45,
            ease: "power2.out"
          },
          "-=0.45"
        )
        .to(
          links,
          {
            autoAlpha: 1,
            duration: 0.45,
            ease: "power2.out"
          },
          "-=0.3"
        )
        .to(
          cta,
          {
            autoAlpha: 1,
            duration: 0.45,
            ease: "power2.out"
          },
          "-=0.3"
        );
    }, navigation);

    return () => {
      context.revert();
    };
  }, []);


  /*
   * ============================================================
   * DETECCIÓN DE SECCIÓN
   * ============================================================
   */

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    setCompact(
      scrollY > 90
    );

    const detectionPoint =
      viewportHeight * 0.42;

    const sections =
      NAVIGATION_ITEMS
        .map((item) => {
          const element =
            document.querySelector(
              item.selector
            );

          if (!element) {
            return null;
          }

          const rect =
            element.getBoundingClientRect();

          return {
            ...item,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          };
        })
        .filter(Boolean);

    if (!sections.length) {
      return;
    }

    const sectionAtPoint =
      sections.find(
        (section) =>
          detectionPoint >= section.top &&
          detectionPoint < section.bottom
      );

    if (sectionAtPoint) {
      setActiveSection(
        (currentSection) =>
          currentSection === sectionAtPoint.id
            ? currentSection
            : sectionAtPoint.id
      );

      return;
    }

    let closestSection =
      sections[0];

    let closestDistance =
      Infinity;

    sections.forEach(
      (section) => {
        const center =
          section.top +
          section.height / 2;

        const distance =
          Math.abs(
            center -
            detectionPoint
          );

        if (
          distance <
          closestDistance
        ) {
          closestDistance =
            distance;

          closestSection =
            section;
        }
      }
    );

    if (closestSection) {
      setActiveSection(
        (currentSection) =>
          currentSection ===
          closestSection.id
            ? currentSection
            : closestSection.id
      );
    }
  }, []);


  /*
   * ============================================================
   * SCROLL / RESIZE
   * ============================================================
   */

  useEffect(() => {
    const scheduleUpdate = () => {
      if (
        animationFrameRef.current
      ) {
        return;
      }

      animationFrameRef.current =
        window.requestAnimationFrame(
          () => {
            animationFrameRef.current =
              null;

            updateActiveSection();
          }
        );
    };

    scheduleUpdate();

    const delayedUpdate =
      window.setTimeout(
        () => {
          updateActiveSection();
        },
        100
      );

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      {
        passive: true
      }
    );

    window.addEventListener(
      "resize",
      scheduleUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scheduleUpdate
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate
      );

      window.clearTimeout(
        delayedUpdate
      );

      if (
        animationFrameRef.current
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }
    };
  }, [
    updateActiveSection
  ]);


  /*
   * ============================================================
   * CERRAR MENÚ AL PASAR A DESKTOP
   * ============================================================
   */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 680) {
        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);


  /*
   * ============================================================
   * NAVEGACIÓN
   * ============================================================
   */

  const handleNavigation =
    (item) => {
      const element =
        document.querySelector(
          item.selector
        );

      if (!element) {
        return;
      }

      setMobileOpen(false);
      setHoveredSection(null);

      const navigationHeight =
        navigationRef.current
          ?.offsetHeight || 0;

      const rect =
        element.getBoundingClientRect();

      const targetPosition =
        rect.top +
        window.scrollY -
        navigationHeight -
        24;

      window.scrollTo({
        top:
          Math.max(
            targetPosition,
            0
          ),
        behavior: "smooth"
      });
    };


  /*
   * ============================================================
   * CTA — INICIO
   * ============================================================
   */

  const handleStart = () => {
    setMobileOpen(false);
    setHoveredSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  /*
   * ============================================================
   * LOGO
   * ============================================================
   */

  const handleLogoClick = () => {
    setMobileOpen(false);
    setHoveredSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  /*
   * ============================================================
   * MENÚ MÓVIL
   * ============================================================
   */

  const handleMobileToggle = () => {
    setMobileOpen(
      (current) =>
        !current
    );

    setHoveredSection(null);
  };


  /*
   * ============================================================
   * HOVER
   * ============================================================
   */

  const handleMouseEnter =
    (item) => {
      if (
        !compact ||
        activeSection === item.id
      ) {
        return;
      }

      setHoveredSection(
        item.id
      );
    };


  const handleMouseLeave =
    () => {
      setHoveredSection(
        null
      );
    };


  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <nav
      ref={navigationRef}
      className={[
        "site-navigation",
        compact
          ? "site-navigation-compact"
          : "",
        mobileOpen
          ? "site-navigation-mobile-open"
          : ""
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Navegación principal"
    >

      <div
        className="site-navigation-inner"
      >

        {/* ======================================================
            LOGO
            ====================================================== */}

        <button
          ref={logoRef}
          type="button"
          className="site-navigation-logo"
          onClick={
            handleLogoClick
          }
          aria-label="Volver al inicio"
        >
          <span
            className=
              "site-navigation-logo-mark"
          >
            MP
          </span>

          <span
            className=
              "site-navigation-logo-name"
          >
            MANUEL
          </span>
        </button>


        {/* ======================================================
            NAVEGACIÓN DESKTOP
            ====================================================== */}

        <div
          ref={linksRef}
          className=
            "site-navigation-links"
          onMouseLeave={
            handleMouseLeave
          }
        >

          {NAVIGATION_ITEMS.map(
            (item, index) => {
              const isActive =
                activeSection ===
                item.id;

              const isHovered =
                hoveredSection ===
                item.id;

              let positionClass =
                "";

              if (
                hoveredSection
              ) {
                const hoveredIndex =
                  NAVIGATION_ITEMS.findIndex(
                    (navigationItem) =>
                      navigationItem.id ===
                      hoveredSection
                  );

                if (
                  index <
                  hoveredIndex
                ) {
                  positionClass =
                    "is-before-hover";
                }

                if (
                  index >
                  hoveredIndex
                ) {
                  positionClass =
                    "is-after-hover";
                }
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "site-navigation-link",
                    isActive
                      ? "is-active"
                      : "",
                    isHovered
                      ? "is-hovered"
                      : "",
                    positionClass
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() =>
                    handleMouseEnter(
                      item
                    )
                  }
                  onClick={() =>
                    handleNavigation(
                      item
                    )
                  }
                  aria-label={
                    item.label
                  }
                >

                  <span
                    className=
                      "site-navigation-link-number"
                  >
                    {item.number}
                  </span>

                  <span
                    className=
                      "site-navigation-link-label"
                  >
                    {item.label}
                  </span>

                  <span
                    className=
                      "site-navigation-link-dot"
                    aria-hidden="true"
                  />

                </button>
              );
            }
          )}

        </div>


        {/* ======================================================
            CTA DESKTOP
            ====================================================== */}

        <button
          ref={ctaRef}
          type="button"
          className=
            "site-navigation-cta"
          onClick={handleStart}
        >
          <span>
            INICIO
          </span>

          <span
            className=
              "site-navigation-cta-arrow"
          >
            ↗
          </span>
        </button>


        {/* ======================================================
            BOTÓN MÓVIL
            ====================================================== */}

        <button
          type="button"
          className={[
            "site-navigation-mobile-toggle",
            mobileOpen
              ? "is-open"
              : ""
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={
            handleMobileToggle
          }
          aria-label={
            mobileOpen
              ? "Cerrar navegación"
              : "Abrir navegación"
          }
          aria-expanded={
            mobileOpen
          }
        >
          <span />
          <span />
        </button>

      </div>


      {/* ========================================================
          MENÚ MÓVIL
          ======================================================== */}

      <div
        className={[
          "site-navigation-mobile-menu",
          mobileOpen
            ? "is-open"
            : ""
        ]
          .filter(Boolean)
          .join(" ")}
      >

        {NAVIGATION_ITEMS.map(
          (item) => (
            <button
              key={item.id}
              type="button"
              className={[
                "site-navigation-mobile-link",
                activeSection ===
                item.id
                  ? "is-active"
                  : ""
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                handleNavigation(
                  item
                )
              }
            >

              <span
                className=
                  "site-navigation-mobile-number"
              >
                {item.number}
              </span>

              <span
                className=
                  "site-navigation-mobile-label"
              >
                {item.label}
              </span>

              <span
                className=
                  "site-navigation-mobile-arrow"
              >
                ↗
              </span>

            </button>
          )
        )}

        <button
          type="button"
          className=
            "site-navigation-mobile-start"
          onClick={handleStart}
        >
          <span>
            INICIO
          </span>

          <span>
            ↗
          </span>
        </button>

      </div>

    </nav>
  );
}


export default Navigation;