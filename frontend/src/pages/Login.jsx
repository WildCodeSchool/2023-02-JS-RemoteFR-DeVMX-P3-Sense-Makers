import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { dataNotValide } from "../services/toast";
import Lang from "../components/Lang";
import userContext from "../contexts/userContext";
import CookiesConsent from "../components/CookiesConsent";
import ModalEmail from "../components/ModalEmail";
import GraphicElements from "../components/graphicElements/GraphicElements";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { setUser } = useContext(userContext);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [cookieValidation, setCookieValidation] = useState("hide");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const postUserInfos = (e) => {
    e.preventDefault();
    if (localStorage.getItem("conditionsAcceptation")) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setUser(res.data.user);
          setTimeout(() => {
            navigate("/logged/decisions");
          }, 500);
        })
        .catch((err) => {
          console.error(err);
          return dataNotValide();
        });
    } else {
      setCookieValidation("cookie-obligation");
    }
  };

  return (
    <>
      <GraphicElements />
      {openModal && <ModalEmail setOpenModal={setOpenModal} />}
      <div className="languages-choice-container">
        <Lang />
      </div>
      <div className="logInContainer">
        <form onSubmit={postUserInfos}>
          <div className="logIn-input">
            <div className="inputsContainer">
              <p className={cookieValidation}>
                {t("login.banner.textForAcceptation")}
              </p>
              <label htmlFor="logInUsername">
                <p>{t("login.email")}</p>
              </label>
              <input
                autoComplete="nom d'utilisateur"
                id="logInUsername"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="logInPassword">
                <p>{t("login.password")}</p>
              </label>
              <input
                autoComplete="mot de passe"
                id="logInPassword"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">
              <h2>{t("login.connectionButton")}</h2>
            </button>
            <span
              role="button"
              tabIndex="0"
              onKeyDown={() => {}}
              className="reinicialize-password"
              onClick={() => setOpenModal(true)}
            >
              {t("login.forgotPassword")}
            </span>
          </div>
        </form>
        {showCookieBanner && (
          <CookiesConsent
            setShowCookieBanner={setShowCookieBanner}
            setCookieValidation={setCookieValidation}
          />
        )}
      </div>
      <ToastContainer autoClose={1500} transition={Slide} />
    </>
  );
}
