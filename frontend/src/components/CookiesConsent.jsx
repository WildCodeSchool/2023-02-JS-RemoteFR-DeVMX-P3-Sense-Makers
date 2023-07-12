import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function CookiesConsent({ setShowCookieBanner, setCookieValidation }) {
  const { t } = useTranslation();

  const handleClick = () => {
    localStorage.setItem("cookieBannerDisplayed", "true");
    setShowCookieBanner(false);
    setCookieValidation("hide");
  };
  setTimeout(() => {
    if (!localStorage.getItem("cookieBannerDisplayed")) {
      setShowCookieBanner(true);
    } else setShowCookieBanner(false);
  });
  return (
    <div className="cookie-container">
      <p>
        {t("cookieConsent.textPart1")}{" "}
        <a style={{ color: " rgb(255, 243, 13)" }} href="/loged/privacy">
          {t("cookieConsent.link")}
        </a>{" "}
        {t("cookieConsent.textPart2")}{" "}
      </p>
      <button type="button" className="cookie-btn" onClick={handleClick}>
        {t("cookieConsent.agreement")}
      </button>
    </div>
  );
}
CookiesConsent.propTypes = {
  setShowCookieBanner: PropTypes.func.isRequired,
  setCookieValidation: PropTypes.func.isRequired,
};
export default CookiesConsent;
