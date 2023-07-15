import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GraphicElements from "../components/graphicElements/GraphicElements";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClickAccept = () => {
    localStorage.setItem("conditionsAcceptation", "true");
    navigate("/");
  };

  const handleClickRefuse = () => {
    localStorage.setItem("conditionsRefused", "false");
    navigate("/");
  };

  return (
    <>
      <GraphicElements />
      <div className="privacy-policy-container">
        <div className="text-container">
          <div className="close-btn">
            <button type="button" onClick={() => navigate("/")}>
              {" "}
              X{" "}
            </button>
          </div>
          <h1>{t("privacyPolicy.title")}</h1>
          <div>
            <h3>{t("privacyPolicy.subTitle.1")}</h3>
            <p>
              <strong>{t("privacyPolicy.strong.1")}</strong>
              {t("privacyPolicy.paragraphe.1")}
            </p>
            <p>
              <strong>{t("privacyPolicy.strong.2")}</strong>
              {t("privacyPolicy.paragraphe.2")}
            </p>
            <p>
              <strong>{t("privacyPolicy.strong.3")}</strong>
              {t("privacyPolicy.paragraphe.3")}
            </p>
          </div>
          <div>
            <h3>{t("privacyPolicy.subTitle.2")}</h3>
            <p>
              <strong>{t("privacyPolicy.strong.4")}</strong>
            </p>
            <p>{t("privacyPolicy.paragraphe.4")}</p>
          </div>
          <div>
            <h3>{t("privacyPolicy.subTitle.3")}</h3>
            <p>
              <strong>{t("privacyPolicy.strong.5")}</strong>
            </p>
            <p>{t("privacyPolicy.paragraphe.5")}</p>
          </div>
          <div>
            <h3>{t("privacyPolicy.subTitle.4")}</h3>
            <p>
              <strong>{t("privacyPolicy.strong.6")}</strong>
            </p>
            <p>{t("privacyPolicy.paragraphe.6")}</p>
          </div>
          <div>
            <h3>{t("privacyPolicy.subTitle.5")}</h3>
            <p>
              <strong>{t("privacyPolicy.strong.7")}</strong>
            </p>
            <p>{t("privacyPolicy.paragraphe.7")}</p>
            <p>
              <strong>{t("privacyPolicy.strong.8")}</strong>
            </p>
            <p>{t("privacyPolicy.paragraphe.8")}</p>
          </div>
          <div className="container-button">
            <button
              type="button"
              className="handle-cookie-btn firstBtn"
              onClick={handleClickAccept}
            >
              {t("privacyPolicy.agree")}
            </button>
            <button
              type="button"
              className="handle-cookie-btn"
              onClick={handleClickRefuse}
            >
              {t("privacyPolicy.reject")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
