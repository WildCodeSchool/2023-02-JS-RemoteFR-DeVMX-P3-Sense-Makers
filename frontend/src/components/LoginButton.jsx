import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import kikoAvatar from "../assets/avatar0.png";

export default function LoginButton() {
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const handleShowLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const menuRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowLoginMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={menuRef}>
      <div
        className="login-button"
        role="button"
        tabIndex="0"
        onKeyDown={() => {}}
        onClick={() => handleShowLoginMenu()}
      >
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
      <div className={showLoginMenu ? "login-menu" : "login-menu-hidden"}>
        <ul className="login-menu-app">
          <li>
            <Link
              className={
                pathname === "/decision" ? "link-style active" : "link-style"
              }
              to="/decision"
              onClick={() => handleShowLoginMenu()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <div className="li-text">Parcourir les décisions</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === "/myDecisions" ? "link-style active" : "link-style"
              }
              to="/myDecisions"
              onClick={() => handleShowLoginMenu()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-grid"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>

              <div className="li-text">Mes décisions</div>
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div className="li-text">Notifications</div>
          </li>
          <li>
            <Link
              className={
                pathname === "/profil" ? "link-style active" : "link-style"
              }
              to="/profil"
              onClick={() => handleShowLoginMenu()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-table"
              >
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
              </svg>
              <div className="li-text">Administration</div>
            </Link>
          </li>
        </ul>
        <ul className="login-menu-user">
          <li>
            <Link
              className={
                pathname === "/profil" ? "link-style active" : "link-style"
              }
              to="/profil"
              onClick={() => handleShowLoginMenu()}
            >
              <div className="li-text">Mon compte</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === "/postDecision"
                  ? "link-style active"
                  : "link-style"
              }
              to="/postDecision"
              onClick={() => handleShowLoginMenu()}
            >
              <div className="li-text">Créer une décision</div>{" "}
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/" ? "link-style active" : "link-style"}
              to="/"
              onClick={() => handleShowLoginMenu()}
            >
              <div className="li-text">Déconnexion</div>{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
