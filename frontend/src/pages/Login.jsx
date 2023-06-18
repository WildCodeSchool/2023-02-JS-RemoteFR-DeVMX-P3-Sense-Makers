// import GraphicElements from "@components/graphicElements/GraphicElements";

export default function Login() {
  return (
    <>
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
            <button type="button">
              <h2>Se connecter</h2>
            </button>
            <p>Mot de passe oublié ?</p>
          </div>
        </form>
      </div>
      {/* <GraphicElements /> */}
      {/* <div className="bottom-left-deco">
        <div className="rectangle1" />
        <div className="circle1" />
        <div className="rectangle2" />
        <div className="circle2" />
        <div className="rectangle3" />
        <div className="circle3" />
        <div className="rectangle4" />
        <div className="circle4" />
        <div className="rectangle5" />
        <div className="circle5" />
        <div className="rectangle6" />
        <div className="circle6" />
      </div> */}
    </>
  );
}
