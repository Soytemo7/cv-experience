import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/Identity/identity.css";

gsap.registerPlugin(ScrollTrigger);

const BASE_URL = import.meta.env.BASE_URL;

const IMAGE_SOURCES = [
  `${BASE_URL}images/1.webp`,
  `${BASE_URL}images/2.webp`,
  `${BASE_URL}images/3.webp`,
  `${BASE_URL}images/4.webp`,
  `${BASE_URL}images/5.webp`,
  `${BASE_URL}images/6.webp`
];

const IMAGE_VISIBLE_DURATION = 7;
const IMAGE_TRANSITION_DURATION = 1.8;

function Identity() {
  const sectionRef = useRef(null);

  const sceneRef = useRef(null);
  const worldRef = useRef(null);
  const atmosphereRef = useRef(null);

  const forestBackRef = useRef(null);
  const forestMidRef = useRef(null);
  const forestFrontRef = useRef(null);

  const lightRef = useRef(null);
  const lightBeamRef = useRef(null);
  const flareRef = useRef(null);

  const particlesFarRef = useRef(null);
  const particlesMidRef = useRef(null);
  const particlesNearRef = useRef(null);

  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const imageElementRef = useRef(null);
  const imageMaskRef = useRef(null);
  const imageGlowRef = useRef(null);

  const orbitRef = useRef(null);
  const orbitInnerRef = useRef(null);
  const orbitOuterRef = useRef(null);
  const orbitFragmentsRef = useRef(null);

  const chapterRef = useRef(null);
  const chapterLineRef = useRef(null);

  const giantWordRef = useRef(null);
  const giantWordBackRef = useRef(null);

  const firstNameRef = useRef(null);
  const surnameRef = useRef(null);
  const nameLineRef = useRef(null);

  const roleRef = useRef(null);

  const experienceRef = useRef(null);
  const experienceNumberRef = useRef(null);
  const experienceLabelRef = useRef(null);

  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineProgressRef = useRef(null);
  const timelineMarkerRef = useRef(null);

  const sideDataRef = useRef(null);
  const sideDataTopRef = useRef(null);
  const sideDataBottomRef = useRef(null);

  const scrollRef = useRef(null);

  const fragmentsRef = useRef(null);
  const energyRef = useRef(null);
  const vignetteRef = useRef(null);

  const imageCycleRef = useRef(null);
  const currentImageIndexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      /*
       * ============================================================
       * ESTADO INICIAL
       * ============================================================
       */

      gsap.set(sceneRef.current, {
        opacity: 0
      });

      gsap.set(worldRef.current, {
        scale: 1.04
      });

      gsap.set(atmosphereRef.current, {
        scale: 1.12,
        opacity: 0
      });

      gsap.set(
        [
          forestBackRef.current,
          forestMidRef.current,
          forestFrontRef.current
        ],
        {
          opacity: 0
        }
      );

      gsap.set(lightRef.current, {
        opacity: 0,
        scale: 0.7
      });

      gsap.set(lightBeamRef.current, {
        opacity: 0,
        xPercent: -120
      });

      gsap.set(flareRef.current, {
        opacity: 0,
        scale: 0.5
      });

      gsap.set(
        [
          particlesFarRef.current,
          particlesMidRef.current,
          particlesNearRef.current
        ],
        {
          opacity: 0
        }
      );

      gsap.set(imageWrapRef.current, {
        opacity: 0,
        xPercent: 7,
        scale: 1.08
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.12
      });

      gsap.set(imageMaskRef.current, {
        scaleX: 1,
        transformOrigin: "right center"
      });

      gsap.set(imageGlowRef.current, {
        opacity: 0,
        scale: 0.7
      });

      gsap.set(
        [
          orbitRef.current,
          orbitInnerRef.current,
          orbitOuterRef.current,
          orbitFragmentsRef.current
        ],
        {
          opacity: 0
        }
      );

      gsap.set(chapterRef.current, {
        opacity: 0,
        y: 25
      });

      gsap.set(chapterLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
      });

      gsap.set(giantWordRef.current, {
        opacity: 0,
        xPercent: -10
      });

      gsap.set(giantWordBackRef.current, {
        opacity: 0,
        xPercent: 8
      });

      gsap.set(firstNameRef.current, {
        opacity: 0,
        xPercent: -18
      });

      gsap.set(surnameRef.current, {
        opacity: 0,
        xPercent: 18
      });

      gsap.set(nameLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
      });

      gsap.set(roleRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set(experienceRef.current, {
        opacity: 0,
        y: 40
      });

      gsap.set(experienceNumberRef.current, {
        opacity: 0,
        scale: 0.7
      });

      gsap.set(
        [
          experienceLabelRef.current,
          sideDataRef.current,
          sideDataTopRef.current,
          sideDataBottomRef.current
        ],
        {
          opacity: 0
        }
      );

      gsap.set(timelineRef.current, {
        opacity: 0,
        y: 25
      });

      gsap.set(timelineLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
      });

      gsap.set(timelineProgressRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
      });

      gsap.set(timelineMarkerRef.current, {
        scale: 0
      });

      gsap.set(
        [
          fragmentsRef.current,
          energyRef.current
        ],
        {
          opacity: 0
        }
      );

      gsap.set(scrollRef.current, {
        opacity: 0
      });

      /*
       * ============================================================
       * INTRO
       * ============================================================
       */

      const intro = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power4.out"
        }
      });

      intro
        .to(sceneRef.current, {
          opacity: 1,
          duration: 0.8
        })

        .to(
          worldRef.current,
          {
            scale: 1,
            duration: 4,
            ease: "power2.out"
          },
          0
        )

        .to(
          atmosphereRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 3,
            ease: "power3.out"
          },
          "-=3.6"
        )

        .to(
          forestBackRef.current,
          {
            opacity: 0.7,
            duration: 2
          },
          "-=2.5"
        )

        .to(
          forestMidRef.current,
          {
            opacity: 0.9,
            duration: 2
          },
          "-=2"
        )

        .to(
          forestFrontRef.current,
          {
            opacity: 0.75,
            duration: 2
          },
          "-=1.7"
        )

        .to(
          lightRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 2.6
          },
          "-=2.4"
        )

        .to(
          lightBeamRef.current,
          {
            opacity: 1,
            xPercent: 0,
            duration: 2.4,
            ease: "power3.inOut"
          },
          "-=2.1"
        )

        .to(
          [
            particlesFarRef.current,
            particlesMidRef.current,
            particlesNearRef.current
          ],
          {
            opacity: 1,
            duration: 1.6,
            stagger: 0.18
          },
          "-=1.8"
        )

        .to(
          imageGlowRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 2.2
          },
          "-=1.6"
        )

        .to(
          imageWrapRef.current,
          {
            opacity: 1,
            xPercent: 0,
            scale: 1,
            duration: 2.5,
            ease: "power4.out"
          },
          "-=2"
        )

        .to(
          imageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 2.3,
            ease: "power3.out"
          },
          "-=2.3"
        )

        .to(
          imageMaskRef.current,
          {
            scaleX: 0,
            duration: 1.8,
            ease: "power4.inOut"
          },
          "-=1.9"
        )

        .to(
          [
            orbitRef.current,
            orbitInnerRef.current,
            orbitOuterRef.current,
            orbitFragmentsRef.current
          ],
          {
            opacity: 1,
            duration: 1.5,
            stagger: 0.08
          },
          "-=1.2"
        )

        .to(
          giantWordBackRef.current,
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.7,
            ease: "power3.out"
          },
          "-=1.1"
        )

        .to(
          giantWordRef.current,
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.8,
            ease: "power4.out"
          },
          "-=1.4"
        )

        .to(
          chapterRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8
          },
          "-=0.9"
        )

        .to(
          chapterLineRef.current,
          {
            scaleX: 1,
            duration: 0.9
          },
          "-=0.55"
        )

        .to(
          firstNameRef.current,
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.3
          },
          "-=0.55"
        )

        .to(
          surnameRef.current,
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.3
          },
          "-=1"
        )

        .to(
          nameLineRef.current,
          {
            scaleX: 1,
            duration: 1.1
          },
          "-=0.6"
        )

        .to(
          roleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9
          },
          "-=0.55"
        )

        .to(
          experienceRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9
          },
          "-=0.5"
        )

        .to(
          experienceNumberRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.5)"
          },
          "-=0.7"
        )

        .to(
          [
            experienceLabelRef.current,
            sideDataRef.current,
            sideDataTopRef.current,
            sideDataBottomRef.current
          ],
          {
            opacity: 1,
            duration: 0.7,
            stagger: 0.08
          },
          "-=0.65"
        )

        .to(
          timelineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8
          },
          "-=0.45"
        )

        .to(
          timelineLineRef.current,
          {
            scaleX: 1,
            duration: 1.2
          },
          "-=0.55"
        )

        .to(
          timelineProgressRef.current,
          {
            scaleX: 0.42,
            duration: 1.1
          },
          "-=1"
        )

        .to(
          timelineMarkerRef.current,
          {
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)"
          },
          "-=0.65"
        )

        .to(
          fragmentsRef.current,
          {
            opacity: 1,
            duration: 1
          },
          "-=0.45"
        )

        .to(
          energyRef.current,
          {
            opacity: 1,
            duration: 0.8
          },
          "-=0.65"
        )

        .to(
          scrollRef.current,
          {
            opacity: 1,
            duration: 0.8
          },
          "-=0.2"
        );

      /*
       * ============================================================
       * CAMBIO DE IMÁGENES
       * ============================================================
       */

      const startImageCycle = () => {
        imageCycleRef.current?.kill();

        currentImageIndexRef.current = 0;

        if (imageElementRef.current) {
          imageElementRef.current.src =
            IMAGE_SOURCES[0];
        }

        gsap.set(imageWrapRef.current, {
          opacity: 1,
          xPercent: 0,
          scale: 1
        });

        gsap.set(imageRef.current, {
          opacity: 1,
          scale: 1
        });

        gsap.set(imageGlowRef.current, {
          opacity: 0.8,
          scale: 1
        });

        imageCycleRef.current = gsap.timeline({
          repeat: -1,
          delay: IMAGE_VISIBLE_DURATION
        });

        imageCycleRef.current
          .to(
            imageWrapRef.current,
            {
              opacity: 0,
              scale: 1.035,
              xPercent: -2,
              duration: IMAGE_TRANSITION_DURATION,
              ease: "power2.inOut"
            }
          )

          .to(
            imageGlowRef.current,
            {
              opacity: 0.25,
              scale: 1.15,
              duration: IMAGE_TRANSITION_DURATION,
              ease: "power2.inOut"
            },
            "<"
          )

          .add(() => {
            currentImageIndexRef.current =
              (currentImageIndexRef.current + 1) %
              IMAGE_SOURCES.length;

            if (imageElementRef.current) {
              imageElementRef.current.src =
                IMAGE_SOURCES[
                  currentImageIndexRef.current
                ];
            }
          })

          .set(imageRef.current, {
            scale: 1.1
          })

          .to(
            imageWrapRef.current,
            {
              opacity: 1,
              scale: 1,
              xPercent: 0,
              duration: IMAGE_TRANSITION_DURATION,
              ease: "power2.inOut"
            }
          )

          .to(
            imageRef.current,
            {
              scale: 1,
              duration: IMAGE_TRANSITION_DURATION,
              ease: "power2.out"
            },
            "<"
          )

          .to(
            imageGlowRef.current,
            {
              opacity: 0.8,
              scale: 1,
              duration: IMAGE_TRANSITION_DURATION,
              ease: "power2.out"
            },
            "<"
          )

          .to(
            {},
            {
              duration: IMAGE_VISIBLE_DURATION
            }
          );
      };

      intro.eventCallback(
        "onComplete",
        startImageCycle
      );

      /*
       * ============================================================
       * ENTRADA DE IDENTITY
       * ============================================================
       */

      const playIntro = () => {
        if (
          intro.progress() === 0 &&
          !intro.isActive()
        ) {
          intro.play(0);
        }
      };

      const restartIntro = () => {
        imageCycleRef.current?.kill();

        currentImageIndexRef.current = 0;

        if (imageElementRef.current) {
          imageElementRef.current.src =
            IMAGE_SOURCES[0];
        }

        intro.restart();
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",

        onEnter: () => {
          playIntro();
        },

        onEnterBack: () => {
          restartIntro();
        }
      });

      /*
       * ============================================================
       * VIDA ATMOSFÉRICA
       * ============================================================
       */

      gsap.to(atmosphereRef.current, {
        scale: 1.045,
        xPercent: 1.5,
        yPercent: -1,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(forestBackRef.current, {
        xPercent: 2,
        yPercent: -1,
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(forestMidRef.current, {
        xPercent: -1.5,
        yPercent: 1,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(forestFrontRef.current, {
        xPercent: 1,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(lightRef.current, {
        scale: 1.08,
        xPercent: 2,
        opacity: 0.82,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(lightBeamRef.current, {
        xPercent: 12,
        opacity: 0.75,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(flareRef.current, {
        opacity: 0.65,
        scale: 1.08,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      /*
       * ============================================================
       * VIDA PARTÍCULAS
       * ============================================================
       */

      gsap.to(particlesFarRef.current, {
        yPercent: -8,
        xPercent: 3,
        duration: 13,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(particlesMidRef.current, {
        yPercent: -13,
        xPercent: -4,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(particlesNearRef.current, {
        yPercent: -20,
        xPercent: 5,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      /*
       * ============================================================
       * VIDA RETRATO
       * ============================================================
       */

      gsap.to(imageRef.current, {
        scale: 1.035,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(imageGlowRef.current, {
        opacity: 0.8,
        scale: 1.04,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      /*
       * ============================================================
       * VIDA ÓRBITAS
       * ============================================================
       */

      gsap.to(orbitInnerRef.current, {
        rotation: 360,
        duration: 32,
        ease: "none",
        repeat: -1
      });

      gsap.to(orbitOuterRef.current, {
        rotation: -360,
        duration: 48,
        ease: "none",
        repeat: -1
      });

      gsap.to(orbitFragmentsRef.current, {
        rotation: 360,
        duration: 18,
        ease: "none",
        repeat: -1
      });

      /*
       * ============================================================
       * VIDA TIPOGRAFÍA
       * ============================================================
       */

      gsap.to(firstNameRef.current, {
        x: 5,
        duration: 5.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(surnameRef.current, {
        x: -5,
        duration: 6.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(experienceNumberRef.current, {
        y: -4,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      /*
       * ============================================================
       * SCROLL — MUNDO
       * ============================================================
       */

      const worldScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      worldScroll
        .to(
          worldRef.current,
          {
            scale: 1.16,
            xPercent: -2,
            yPercent: 2,
            duration: 0.58,
            ease: "none"
          },
          0
        )
        .to(
          worldRef.current,
          {
            scale: 1.34,
            xPercent: 4,
            yPercent: -10,
            opacity: 0,
            duration: 0.42,
            ease: "power2.in"
          },
          0.58
        );

      /*
       * ============================================================
       * SCROLL — PAISAJE
       * ============================================================
       */

      const landscapeScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      landscapeScroll
        .to(
          forestBackRef.current,
          {
            xPercent: -4,
            yPercent: 8,
            scale: 1.08,
            duration: 0.6,
            ease: "none"
          },
          0
        )
        .to(
          forestMidRef.current,
          {
            xPercent: 5,
            yPercent: -3,
            scale: 1.1,
            duration: 0.6,
            ease: "none"
          },
          0
        )
        .to(
          forestFrontRef.current,
          {
            xPercent: -8,
            yPercent: -8,
            scale: 1.15,
            duration: 0.6,
            ease: "none"
          },
          0
        )
        .to(
          [
            forestBackRef.current,
            forestMidRef.current,
            forestFrontRef.current
          ],
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
          },
          0.66
        );

      /*
       * ============================================================
       * SCROLL — RETRATO
       * ============================================================
       */

      const portraitScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      portraitScroll
        .to(
          imageWrapRef.current,
          {
            xPercent: 2,
            yPercent: -5,
            scale: 0.93,
            duration: 0.58,
            ease: "none"
          },
          0
        )
        .to(
          imageRef.current,
          {
            scale: 1.2,
            xPercent: -4,
            yPercent: -2,
            duration: 0.58,
            ease: "none"
          },
          0
        )
        .to(
          imageGlowRef.current,
          {
            scale: 1.4,
            opacity: 0.3,
            duration: 0.58,
            ease: "none"
          },
          0
        )
        .to(
          imageWrapRef.current,
          {
            xPercent: 16,
            yPercent: -28,
            scale: 0.66,
            opacity: 0,
            rotation: -2.5,
            duration: 0.42,
            ease: "power2.in"
          },
          0.58
        )
        .to(
          imageRef.current,
          {
            scale: 1.42,
            xPercent: -9,
            duration: 0.42,
            ease: "none"
          },
          0.58
        );

      /*
       * ============================================================
       * SCROLL — NOMBRE
       * ============================================================
       */

      const nameScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      nameScroll
        .to(
          giantWordRef.current,
          {
            xPercent: -16,
            yPercent: -17,
            scale: 0.78,
            opacity: 0.08,
            duration: 0.56,
            ease: "none"
          },
          0
        )
        .to(
          giantWordBackRef.current,
          {
            xPercent: 18,
            yPercent: 12,
            scale: 1.2,
            opacity: 0,
            duration: 0.56,
            ease: "none"
          },
          0
        )
        .to(
          firstNameRef.current,
          {
            xPercent: -18,
            yPercent: -21,
            scale: 0.78,
            duration: 0.58,
            ease: "none"
          },
          0
        )
        .to(
          surnameRef.current,
          {
            xPercent: 16,
            yPercent: -18,
            scale: 0.78,
            duration: 0.58,
            ease: "none"
          },
          0
        )
        .to(
          firstNameRef.current,
          {
            xPercent: -48,
            yPercent: -42,
            scale: 0.48,
            opacity: 0,
            duration: 0.42,
            ease: "power2.in"
          },
          0.58
        )
        .to(
          surnameRef.current,
          {
            xPercent: 42,
            yPercent: -37,
            scale: 0.48,
            opacity: 0,
            duration: 0.42,
            ease: "power2.in"
          },
          0.58
        );

      /*
       * ============================================================
       * SCROLL — ÓRBITAS
       * ============================================================
       */

      const orbitScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      orbitScroll
        .to(
          orbitRef.current,
          {
            xPercent: 15,
            yPercent: -10,
            scale: 1.25,
            duration: 0.62,
            ease: "none"
          },
          0
        )
        .to(
          orbitInnerRef.current,
          {
            rotation: 100,
            duration: 0.62,
            ease: "none"
          },
          0
        )
        .to(
          orbitOuterRef.current,
          {
            rotation: -120,
            duration: 0.62,
            ease: "none"
          },
          0
        )
        .to(
          orbitRef.current,
          {
            xPercent: 42,
            yPercent: -34,
            scale: 1.7,
            opacity: 0,
            duration: 0.38,
            ease: "power2.in"
          },
          0.62
        );

      /*
       * ============================================================
       * SCROLL — DATOS
       * ============================================================
       */

      const dataScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      dataScroll
        .to(
          chapterRef.current,
          {
            y: -90,
            opacity: 0,
            duration: 0.38,
            ease: "none"
          },
          0.15
        )
        .to(
          roleRef.current,
          {
            xPercent: -15,
            yPercent: -90,
            opacity: 0,
            duration: 0.42,
            ease: "none"
          },
          0.28
        )
        .to(
          experienceRef.current,
          {
            xPercent: 18,
            yPercent: -80,
            opacity: 0,
            duration: 0.42,
            ease: "none"
          },
          0.34
        )
        .to(
          sideDataRef.current,
          {
            xPercent: -20,
            opacity: 0,
            duration: 0.35,
            ease: "none"
          },
          0.3
        )
        .to(
          sideDataTopRef.current,
          {
            yPercent: -80,
            opacity: 0,
            duration: 0.35,
            ease: "none"
          },
          0.35
        )
        .to(
          sideDataBottomRef.current,
          {
            yPercent: 80,
            opacity: 0,
            duration: 0.35,
            ease: "none"
          },
          0.4
        );

      /*
       * ============================================================
       * SCROLL — TIMELINE
       * ============================================================
       */

      const timelineScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      timelineScroll
        .to(
          timelineRef.current,
          {
            yPercent: 20,
            duration: 0.4,
            ease: "none"
          },
          0
        )
        .to(
          timelineProgressRef.current,
          {
            scaleX: 1,
            duration: 0.62,
            ease: "none"
          },
          0.08
        )
        .to(
          timelineMarkerRef.current,
          {
            xPercent: 130,
            duration: 0.62,
            ease: "none"
          },
          0.08
        )
        .to(
          timelineRef.current,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.32,
            ease: "power2.in"
          },
          0.7
        );

      /*
       * ============================================================
       * SCROLL — PARTÍCULAS
       * ============================================================
       */

      gsap.to(particlesFarRef.current, {
        xPercent: -12,
        yPercent: -20,
        scale: 1.15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "5% top",
          end: "82% top",
          scrub: true
        }
      });

      gsap.to(particlesMidRef.current, {
        xPercent: 18,
        yPercent: -42,
        scale: 1.35,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "12% top",
          end: "72% top",
          scrub: true
        }
      });

      gsap.to(particlesNearRef.current, {
        xPercent: -28,
        yPercent: -55,
        scale: 1.6,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "20% top",
          end: "68% top",
          scrub: true
        }
      });

      /*
       * ============================================================
       * SCROLL — LUZ
       * ============================================================
       */

      gsap.to(lightRef.current, {
        xPercent: 25,
        yPercent: -18,
        scale: 1.3,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "68% top",
          scrub: true
        }
      });

      gsap.to(lightBeamRef.current, {
        xPercent: 180,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "20% top",
          end: "65% top",
          scrub: true
        }
      });

      gsap.to(flareRef.current, {
        xPercent: 45,
        yPercent: -35,
        scale: 2,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "25% top",
          end: "72% top",
          scrub: true
        }
      });

      /*
       * ============================================================
       * SCROLL — FRAGMENTOS / ENERGÍA
       * ============================================================
       */

      gsap.to(fragmentsRef.current, {
        xPercent: 25,
        yPercent: -35,
        rotation: 12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "72% top",
          scrub: true
        }
      });

      gsap.to(energyRef.current, {
        xPercent: -25,
        yPercent: -50,
        scale: 1.4,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "18% top",
          end: "70% top",
          scrub: true
        }
      });

      /*
       * ============================================================
       * SALIDA
       * ============================================================
       */

      gsap.to(vignetteRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "72% top",
          end: "100% top",
          scrub: true
        }
      });

      gsap.to(scrollRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "45% top",
          end: "60% top",
          scrub: true
        }
      });

      /*
       * ============================================================
       * REFRESH INICIAL
       * ============================================================
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        if (window.scrollY <= 10) {
          playIntro();
        }
      });
    }, section);

    return () => {
      imageCycleRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="identity"
    >
      <div className="identity-sticky">

        <div
          ref={sceneRef}
          className="identity-scene"
        >

          <div
            ref={worldRef}
            className="identity-world"
          >

            <div
              ref={atmosphereRef}
              className="identity-atmosphere"
            />

            <div
              ref={forestBackRef}
              className="identity-forest identity-forest-back"
            />

            <div
              ref={forestMidRef}
              className="identity-forest identity-forest-mid"
            />

            <div
              ref={forestFrontRef}
              className="identity-forest identity-forest-front"
            />

            <div
              ref={lightRef}
              className="identity-light"
            />

            <div
              ref={lightBeamRef}
              className="identity-light-beam"
            />

            <div
              ref={flareRef}
              className="identity-flare"
            />

            <div
              ref={particlesFarRef}
              className="identity-particles identity-particles-far"
            >
              {Array.from({ length: 28 }, (_, index) => (
                <span key={index} />
              ))}
            </div>

            <div
              ref={particlesMidRef}
              className="identity-particles identity-particles-mid"
            >
              {Array.from({ length: 22 }, (_, index) => (
                <span key={index} />
              ))}
            </div>

            <div
              ref={particlesNearRef}
              className="identity-particles identity-particles-near"
            >
              {Array.from({ length: 16 }, (_, index) => (
                <span key={index} />
              ))}
            </div>

            <div
              ref={imageGlowRef}
              className="identity-image-glow"
            />

            <div
              ref={imageWrapRef}
              className="identity-image-wrap"
            >
              <div
                ref={imageRef}
                className="identity-image"
              >
                <img
                  ref={imageElementRef}
                  src={`${BASE_URL}images/1.webp`}
                  alt="Manuel Parra"
                />
              </div>

              <div
                ref={imageMaskRef}
                className="identity-image-mask"
              />
            </div>

            <div className="identity-image-light" />

            <div
              ref={orbitRef}
              className="identity-orbit"
            >
              <div
                ref={orbitOuterRef}
                className="identity-orbit-outer"
              >
                <span />
                <span />
                <span />
                <span />
              </div>

              <div
                ref={orbitInnerRef}
                className="identity-orbit-inner"
              >
                <span />
                <span />
                <span />
              </div>

              <div
                ref={orbitFragmentsRef}
                className="identity-orbit-fragments"
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div
              ref={fragmentsRef}
              className="identity-fragments"
            >
              <span className="fragment fragment-1" />
              <span className="fragment fragment-2" />
              <span className="fragment fragment-3" />
              <span className="fragment fragment-4" />
              <span className="fragment fragment-5" />
              <span className="fragment fragment-6" />
              <span className="fragment fragment-7" />
              <span className="fragment fragment-8" />
            </div>

            <div
              ref={energyRef}
              className="identity-energy"
            >
              <span />
              <span />
              <span />
            </div>

            <div className="identity-grid" />

            <div className="identity-image-vignette" />

          </div>

          <div className="identity-content">

            <div
              ref={chapterRef}
              className="identity-chapter"
            >
              <span className="identity-chapter-number">
                01
              </span>

              <span
                ref={chapterLineRef}
                className="identity-chapter-line"
              />

              <span className="identity-chapter-name">
                IDENTIDAD
              </span>
            </div>

            <div
              ref={giantWordBackRef}
              className="identity-giant-word identity-giant-word-back"
            >
              MANUEL
            </div>

            <div
              ref={giantWordRef}
              className="identity-giant-word"
            >
              PARRA
            </div>

            <div className="identity-left-marker">
              <span>CONTADOR</span>
              <i />
              <span>ABOGADO</span>
              <i />
              <span>INGENIERO</span>
            </div>

            <div
              ref={firstNameRef}
              className="identity-first-name"
            >
              MANUEL
            </div>

            <div
              ref={surnameRef}
              className="identity-surname"
            >
              PARRA
            </div>

            <div
              ref={nameLineRef}
              className="identity-name-line"
            />

            <div
              ref={roleRef}
              className="identity-role"
            >
              <span>CONTADOR</span>
              <i>·</i>
              <span>ABOGADO</span>
              <i>·</i>
              <span>DESARROLLO DE SOFTWARE</span>
            </div>

            <div
              ref={experienceRef}
              className="identity-experience"
            >
              <strong ref={experienceNumberRef}>
                13
              </strong>

              <div
                ref={experienceLabelRef}
                className="identity-experience-label"
              >
                <span>AÑOS</span>
                <span>DE EXPERIENCIA</span>
              </div>
            </div>

            <div
              ref={sideDataRef}
              className="identity-side-data"
            >
              <span>PROFESIONAL</span>
              <strong>INDEPENDIENTE</strong>
              <span>FISCAL · JURÍDICO · TECNOLOGÍA</span>
            </div>

            <div
              ref={sideDataTopRef}
              className="identity-side-top"
            >
              <span>MX / GRO</span>
              <span>EST. 1997</span>
            </div>

            <div
              ref={sideDataBottomRef}
              className="identity-side-bottom"
            >
              <span>1997</span>
              <i />
              <span>2026</span>
            </div>

            <div
              ref={timelineRef}
              className="identity-timeline"
            >
              <div className="identity-timeline-years">
                <span>1997</span>
                <span>2007</span>
                <span>2014</span>
                <span>2021</span>
                <span>2026</span>
              </div>

              <div className="identity-timeline-track">
                <span
                  ref={timelineLineRef}
                  className="identity-timeline-base"
                />

                <span
                  ref={timelineProgressRef}
                  className="identity-timeline-progress"
                />

                <i
                  ref={timelineMarkerRef}
                  className="identity-timeline-marker"
                />
              </div>

              <div className="identity-timeline-caption">
                <span>ORIGEN</span>
                <span>EVOLUCIÓN</span>
                <span>CONVERGENCIA</span>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="identity-scroll"
            >
              <span>DESPLAZA PARA CONTINUAR</span>

              <div className="identity-scroll-line">
                <i />
              </div>
            </div>

          </div>

          <div className="identity-frame">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="identity-top-rule" />

          <div className="identity-bottom-rule" />

          <div className="identity-noise" />

          <div
            ref={vignetteRef}
            className="identity-vignette"
          />

        </div>
      </div>
    </section>
  );
}

export default Identity;