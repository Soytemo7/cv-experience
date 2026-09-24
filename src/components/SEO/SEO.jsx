import { Helmet } from "react-helmet-async";

export default function SEO() {
  return (
    <Helmet>

      {/* =========================================================
          SEO PRINCIPAL
          ========================================================= */}

      <title>
        Manuel Cuauhtémoc Parra Flores | Contador · Abogado · Tecnología
      </title>

      <meta
        name="description"
        content="Manuel Cuauhtémoc Parra Flores, contador público, abogado y profesional independiente con experiencia en tecnología, software, sistemas, finanzas, derecho fiscal e inteligencia artificial."
      />

      <meta
        name="keywords"
        content="Manuel Cuauhtémoc Parra Flores, Manuel Parra, contador público, abogado, derecho fiscal, tecnología, software, desarrollo de software, sistemas computacionales, ingeniería de software, finanzas, transformación digital, inteligencia artificial, programación, administración"
      />

      <meta
        name="author"
        content="Manuel Cuauhtémoc Parra Flores"
      />

      <meta
        name="copyright"
        content="Manuel Cuauhtémoc Parra Flores"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        name="googlebot"
        content="index, follow"
      />

      {/* =========================================================
          CANONICAL
          ========================================================= */}

      <link
        rel="canonical"
        href="https://soytemo7.github.io/cv-experience/"
      />

      {/* =========================================================
          OPEN GRAPH
          ========================================================= */}

      <meta
        property="og:title"
        content="Manuel Cuauhtémoc Parra Flores | Contador · Abogado · Tecnología"
      />

      <meta
        property="og:description"
        content="Trayectoria profesional de Manuel Cuauhtémoc Parra Flores en contabilidad, derecho fiscal, tecnología, software, sistemas, finanzas e inteligencia artificial."
      />

      <meta
        property="og:type"
        content="profile"
      />

      <meta
        property="og:url"
        content="https://soytemo7.github.io/cv-experience/"
      />

      <meta
        property="og:image"
        content="https://soytemo7.github.io/cv-experience/img/foto-perfil.jpeg"
      />

      <meta
        property="og:locale"
        content="es_MX"
      />

      <meta
        property="og:site_name"
        content="Manuel Cuauhtémoc Parra Flores"
      />

      {/* =========================================================
          TWITTER / X
          ========================================================= */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content="Manuel Cuauhtémoc Parra Flores | Contador · Abogado · Tecnología"
      />

      <meta
        name="twitter:description"
        content="Contador, abogado y profesional orientado a tecnología, software, sistemas, finanzas, derecho fiscal e inteligencia artificial."
      />

      <meta
        name="twitter:image"
        content="https://soytemo7.github.io/cv-experience/img/foto-perfil.jpeg"
      />

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

          jobTitle:
            "Contador Público y Abogado",

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