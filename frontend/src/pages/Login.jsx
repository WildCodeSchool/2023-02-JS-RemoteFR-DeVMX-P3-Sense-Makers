// import { useState } from "react";

export default function Login() {
  // const [logInUsername, setLogInUsername] = useState("");
  return (
    <div className="logInContainer">
      <form>
        <div className="logIn-input">
          <label htmlFor="logInUsername">Nom d'utilisateur</label>
          <input
          // autoComplete="nom d'utilisateur"
          // id="logInUsername"
          // type="text"
          // onChange={(e) => {
          //   setLogInUsername(e.target.value);
          // }}
          />
          <label htmlFor="logInpassword">Mot de passe</label>
        </div>
      </form>
    </div>
  );
}
