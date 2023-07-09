import PropTypes from "prop-types";

function CookiesConsent({ setShowCookieBanner, setCookieValidation }) {
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
        Ce site utilise des cookies. Lisez notre{" "}
        <a style={{ color: " rgb(255, 243, 13)" }} href="/loged/privacy">
          politique d'usage
        </a>{" "}
        pour plus d'infos{" "}
      </p>
      <button type="button" className="cookie-btn" onClick={handleClick}>
        D'accord
      </button>
    </div>
  );
}
CookiesConsent.propTypes = {
  setShowCookieBanner: PropTypes.func.isRequired,
  setCookieValidation: PropTypes.func.isRequired,
};
export default CookiesConsent;
