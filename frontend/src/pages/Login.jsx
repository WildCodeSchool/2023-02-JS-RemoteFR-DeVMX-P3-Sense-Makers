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
      {/* <div className="rectangle" />
      <div className="circle" /> */}
    </>
  );
}

// <svg
//   viewBox="0 0 220 100"
//   xmlns="http://www.w3.org/2000/svg"
//   className="rectangle"
// >
//   <rect x="0" y="0" width="100" height="15" />
// </svg>
// <svg
//   viewBox="0 0 5 50"
//   xmlns="http://www.w3.org/2000/svg"
//   className="circle"
// >
//   <circle cx="50" cy="50" r="4" />
// </svg>

// {/* <svg
// xmlns="http://www.w3.org/2000/svg"
// width="24"
// height="24"
// viewBox="0 0 24 24"
// className="input-icon ri-eye-off-line"
// >
// <path
//   fill="currentColor"
//   d="M17.883 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.818-9A10.982 10.982 0 0 1 4.52 5.935L1.394 2.808l1.414-1.414l19.799 19.798l-1.414 1.415l-3.31-3.31ZM5.936 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.936 7.35Zm6.978 6.978l-3.242-3.241a2.5 2.5 0 0 0 3.241 3.241Zm7.893 2.265l-1.431-1.431A8.935 8.935 0 0 0 20.778 12A9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.593Zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.77Z"
// />
// </svg> */}
