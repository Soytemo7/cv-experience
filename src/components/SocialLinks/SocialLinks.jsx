import "../../styles/SocialLinks/socialLinks.css";

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a
        href="https://www.facebook.com/"
        className="social-link social-link-facebook"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        <span className="social-link-icon">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1z" />
          </svg>
        </span>

        <span className="social-link-tooltip">
          Facebook
        </span>
      </a>

      <a
        href="https://www.instagram.com/manuelcuauhtemoc/"
        className="social-link social-link-instagram"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <span className="social-link-icon">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
              ry="5"
            />

            <circle
              cx="12"
              cy="12"
              r="4"
            />

            <circle
              cx="17.5"
              cy="6.5"
              r="1"
              className="instagram-dot"
            />
          </svg>
        </span>

        <span className="social-link-tooltip">
          Instagram
        </span>
      </a>

      <a
        href="https://github.com/soytemo7"
        className="social-link social-link-github"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <span className="social-link-icon">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.85c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </span>

        <span className="social-link-tooltip">
          GitHub
        </span>
      </a>
    </div>
  );
};

export default SocialLinks;