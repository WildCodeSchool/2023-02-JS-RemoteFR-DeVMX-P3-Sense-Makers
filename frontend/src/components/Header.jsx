import { useState } from "react";
import makeSenseLogo from "../assets/make_sense.png";
import kikoAvatar from "../assets/avatar0.png";

export default function Header() {
  const [showHamburger, setShowHamburger] = useState(false);

  const handleToggleBurger = () => {
    setShowHamburger(!showHamburger);
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img src={makeSenseLogo} alt="" />
      </div>
      <div className="navigation-container">
        <div
          className="login-button"
          role="button"
          tabIndex="0"
          onKeyDown={() => {}}
          onClick={() => handleToggleBurger()}
        >
          {showHamburger && (
            <nav className="login-menu">
              <ul>
                <li>Parcourir les décisions</li>
                <li>Mes décisions</li>
                <li>Notifications</li>
                <li>Administration</li>
              </ul>
              <ul>
                <li>Mon compte</li>
                <li>Decisions</li>
                <li>Déconnexion</li>
              </ul>
            </nav>
          )}
          <div className="burger-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18L20 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <img className="img-avatar" src={kikoAvatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
}
