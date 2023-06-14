export default function Login() {
  return (
    <div className="logInContainer">
      <form>
        <div className="logIn-input">
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
          <input autoComplete="mot de passe" id="logInPassword" type="text" />
          <button type="button">
            <h2>Se connecter</h2>
          </button>
          <p>Mot de passe oublié ?</p>
        </div>
      </form>
    </div>
  );
}
