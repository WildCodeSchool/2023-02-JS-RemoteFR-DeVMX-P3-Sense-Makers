import axios from "axios";
import { useState } from "react";

export default function resetPassword() {
  const [newPassword, setNewPassword] = useState();
  const [verifPassword, setVerifPassword] = useState();
  const params = new URLSearchParams(window.location.search);
  const userEmail = params.get("email");
  const token = params.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === verifPassword) {
      console.info("ok");
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/resetpassword`, {
          user: { password: newPassword, email: userEmail, tok: token },
        })
        .then((response) => console.info(response))
        .catch((err) => console.error(err));
    } else {
      console.info("Is not the same password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="reset-password-container">
        <label htmlFor="newpassword">
          Nouveau mot de passe <br />
          <input
            type="password"
            id="newpassword"
            name="newpassword"
            placeholder="Insérez votre mot de passe"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="verifypassword">
          Ressaisir le mot de passe <br />
          <input
            type="password"
            id="verifypassword"
            name="verifypassword"
            placeholder=" votre mot de passe"
            onChange={(e) => setVerifPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Valider</button>
      </div>
    </form>
  );
}
