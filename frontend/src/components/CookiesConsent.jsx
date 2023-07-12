import PropTypes from "prop-types";

function CookiesConsent({ setShowCookieBanner, setCookieValidation }) {
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
        Ce site utilise des données de connexion. Lisez notre{" "}
        <a style={{ color: " rgb(227, 97, 100)" }} href="/privacypolicies">
          politique de confidentialité
        </a>{" "}
        pour plus d'infos{" "}
      </p>
      <div className="container-button">
        <button
          type="button"
          className="cookie-btn"
          onClick={handleClickAccept}
        >
          Accord
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
