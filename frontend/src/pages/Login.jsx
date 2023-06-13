// import { useState } from "react";

export default function Login() {
  // const [logInUsername, setLogInUsername] = useState("");
  // const [logInPassword, setLogInPassword] = useState("");
  return (
    <div className="logInContainer">
      <form>
        <div className="logIn-input">
          <label htmlFor="logInUsername">Nom d'utilisateur</label>
          <input
            autoComplete="nom d'utilisateur"
            id="logInUsername"
            type="text"
            // onChange={(e) => {
            //   setLogInUsername(e.target.value);
            // }}
          />
          <label htmlFor="logInPassword">Mot de passe</label>
          <input
            autoComplete="mot de passe"
            id="logInPassword"
            type="text"
            // onChange={(e) => {
            //   setLogInPassword(e.target.value);
            // }}
          />
          <button type="button">
            <h4>Se connecter</h4>
          </button>
          <p>
            {/* <Link to=""> */}
            Mot de passe oublié ?{/* </Link> */}
          </p>
        </div>
      </form>
    </div>
  );
}
