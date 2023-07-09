import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userContext from "../contexts/userContext";
import CookiesConsent from "../components/CookiesConsent";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(userContext);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [cookieValidation, setCookieValidation] = useState("hide");
  const navigate = useNavigate();

  const postUserInfos = (e) => {
    e.preventDefault();
    if (localStorage.getItem("cookieBannerDisplayed")) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/login`,
          {
            email,
            password,
          },
          { withCredentials: true, credentials: "include" }
        )
        .then((res) => {
          setUser(res.data.user);
          setToken(document.cookie);
          setTimeout(() => {
            navigate("/logged/decisions");
          }, 500);
        })
        .catch((err) => console.error(err));
    }
    setCookieValidation("cookie-obligation");
  };

  return (
    <div className="logInContainer">
      <form onSubmit={postUserInfos}>
        <div className="logIn-input">
          <div className="inputsContainer">
            <p className={cookieValidation}>
              Vous devez accepter les cookies avant d'acceder à la plateforme
            </p>

            <label htmlFor="logInUsername">
              <p>Email</p>
            </label>
            <input
              autoComplete="nom d'utilisateur"
              id="logInUsername"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="logInPassword">
              <p>Mot de passe</p>
            </label>
            <input
              autoComplete="mot de passe"
              id="logInPassword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">
            <h2>Se connecter</h2>
          </button>
          <p>Mot de passe oublié ?</p>
        </div>
      </form>
      {showCookieBanner && (
        <CookiesConsent
          setShowCookieBanner={setShowCookieBanner}
          setCookieValidation={setCookieValidation}
        />
      )}
    </div>
  );
}
