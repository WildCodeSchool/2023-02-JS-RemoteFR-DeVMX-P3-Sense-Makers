import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Lang from "../components/Lang";
import Img404 from "../assets/raton 1.png";
import logo from "../assets/make_sense.png";

export default function WrongPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="wrong-page-container">
      <div className="logo-container">
        <img src={logo} alt="logo" />
        <Lang />
      </div>
      <div className="content-container">
        <img className="raccoon" src={Img404} alt="Raccoon" />
        <div className="text-container">
          <h1 className="wrongPage">{t("wrongPage.title")}</h1>
          <h2>{t("wrongPage.subTitle")}</h2>
          <p>
            {t("wrongPage.text")}{" "}
            <button
              type="button"
              onClick={() => {
                setTimeout(() => {
                  navigate("/");
                }, 500);
              }}
            >
              {t("wrongPage.textButton")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
