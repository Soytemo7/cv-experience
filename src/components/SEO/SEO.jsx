import { Helmet } from "react-helmet-async";

export default function SEO() {
  return (
    <Helmet>

      {/* =========================================================
          SCHEMA.ORG
          ========================================================= */}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",

          name: "Manuel Cuauhtémoc Parra Flores",

          url: "https://soytemo7.github.io/cv-experience/",

          image:
            "https://soytemo7.github.io/cv-experience/img/foto-perfil.jpeg",

          jobTitle: "Contador Público y Abogado",

          description:
            "Profesional independiente con experiencia en contabilidad, derecho fiscal, tecnología, software, sistemas, finanzas e inteligencia artificial.",

          sameAs: [
            "https://github.com/soytemo7",
          ],
        })}
      </script>

    </Helmet>
  );
}