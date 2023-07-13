import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import GraphicElements from "../components/graphicElements/GraphicElements";

export default function resetPassword() {
  const [password, setPassword] = useState();
  const [verifPassword, setVerifPassword] = useState();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const token = params.get("token");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notify = () => {
    toast.success("Mot de passe reinitialisé", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === verifPassword) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/resetpassword`,
          {
            password,
            id,
            token,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          notify();
          setTimeout(() => {
            navigate("/");
          }, 1500);
          console.info(response);
        })
        .catch((err) => console.error(err));
    } else {
      toast.error("les mot de passe ne sont pas similaires!", {
        color: "white",
        backgroundColor: "red",
        icon: "❌",
      });
    }
  };

  return (
    <>
      <GraphicElements />
      <form onSubmit={handleSubmit}>
        <div className="reset-password-container">
          <label htmlFor="newpassword">
            {t("resetPassword.newPassword")} <br />
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              placeholder=" Insérez votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="verifypassword">
            {t("resetPassword.confirmationPassword")} <br />
            <input
              type="password"
              id="verifypassword"
              name="verifypassword"
              placeholder=" Votre mot de passe"
              onChange={(e) => setVerifPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">{t("resetPassword.validate")}</button>
        </div>
        <ToastContainer autoClose={1500} transition={Slide} />
      </form>
    </>
  );
}
