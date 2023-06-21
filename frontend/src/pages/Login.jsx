import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="logInContainer">
      <form>
        <div className="logIn-input">
          <div className="inputsContainer">
            <label htmlFor="logInUsername">
              <p>Nom d'utilisateur</p>
            </label>
            <input
              autoComplete="nom d'utilisateur"
              id="logInUsername"
              type="text"
            />
            <label htmlFor="logInPassword">
              <p>Mot de passe</p>
            </label>
            <input
              autoComplete="mot de passe"
              id="logInPassword"
              type="password"
            />
          </div>
          <Link to="/alldecisions">
            <button type="submit">
              <h2>Se connecter</h2>
            </button>
          </Link>
          <p>Mot de passe oublié ?</p>
        </div>
      </form>
    </div>
  );
}
