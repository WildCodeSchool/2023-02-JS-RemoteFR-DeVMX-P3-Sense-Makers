import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ModalEmail({ setOpenModal }) {
  const [email, setEmail] = useState();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/forgotpassword`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setOpenModal(false);
          toast.success(t("Toast.send"), {
            color: "white",
            backgroundColor: "green",
            icon: "✔️",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(t("Toast.notSend"), {
          color: "white",
          backgroundColor: "red",
          icon: "❌",
        });
      });
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="close-btn">
          <button type="button" onClick={() => setOpenModal(false)}>
            {" "}
            X{" "}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <label htmlFor="verifemail">
              {t("modalEmail.email")} <br />
              <input
                type="email"
                id="verifemail"
                name="verifemail"
                placeholder={t("modalEmail.placeholderEmail")}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit">{t("modalEmail.validate")}</button>
          </div>
        </form>
        <ToastContainer autoClose={1500} transition={Slide} />
      </div>
    </div>
  );
}
ModalEmail.propTypes = {
  setOpenModal: PropTypes.bool.isRequired,
};
