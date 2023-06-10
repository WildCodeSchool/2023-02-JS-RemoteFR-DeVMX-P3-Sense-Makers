import LoginButton from "./LoginButton";
import makeSenseLogo from "../assets/make_sense.png";

export default function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={makeSenseLogo} alt="" />
      </div>
      <div className="navigation-container">
        <LoginButton />
      </div>
    </div>
  );
}
