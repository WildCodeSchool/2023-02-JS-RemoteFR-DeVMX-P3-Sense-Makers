import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function CookiesConsent({ setShowCookieBanner, setCookieValidation }) {
  const { t } = useTranslation();

  const handleClickAccept = () => {
    localStorage.setItem("conditionsAcceptation", "true");
    setShowCookieBanner(false);
    setCookieValidation("hide");
  };
  setTimeout(() => {
    if (!localStorage.getItem("conditionsAcceptation")) {
      setShowCookieBanner(true);
    } else setShowCookieBanner(false);
  });

  const handleClickRefuse = () => {
    localStorage.setItem("conditionsRefused", "false");
    setShowCookieBanner(true);
  };
  return (
    <div className="cookie-container">
      <p>
        {t("cookieConsent.textPart1")}{" "}
        <a style={{ color: " rgb(227, 97, 100)" }} href="/privacypolicy">
          {t("cookieConsent.link")}
        </a>{" "}
        {t("cookieConsent.textPart2")}{" "}
      </p>
      <div className="container-button">
        <button
          type="button"
          className="cookie-btn"
          onClick={handleClickAccept}
        >
          {t("cookieConsent.agreement")}
        </button>
        <button
          type="button"
          className="cookie-btn"
          onClick={handleClickRefuse}
        >
          Refus
        </button>
      </div>
    </div>
  );
}
CookiesConsent.propTypes = {
  setShowCookieBanner: PropTypes.func.isRequired,
  setCookieValidation: PropTypes.func.isRequired,
};
export default CookiesConsent;
