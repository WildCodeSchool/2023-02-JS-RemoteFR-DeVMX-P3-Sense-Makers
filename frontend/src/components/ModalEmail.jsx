import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

export default function ModalEmail({ setOpenModal }) {
  const [email, setEmail] = useState();

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
      .then((response) => console.info(response))
      .catch((err) => console.error(err));
    setOpenModal(false);
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
              Saisir votre email <br />
              <input
                type="email"
                id="verifemail"
                name="verifemail"
                placeholder="Insérez votre email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit">Valider</button>
          </div>
        </form>
      </div>
    </div>
  );
}
ModalEmail.propTypes = {
  setOpenModal: PropTypes.bool.isRequired,
};
