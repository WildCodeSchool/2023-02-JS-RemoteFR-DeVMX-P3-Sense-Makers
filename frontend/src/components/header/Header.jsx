import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginButton from "./ProfileMenuButton";
import NotificationButton from "./NotificationsMenu";
import makeSenseLogo from "../../assets/make_sense.png";

export default function Header() {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);

  const { pathname } = useLocation();

  const handleShowNotificationsMenu = () => {
    setShowNotificationsMenu(!showNotificationsMenu);
  };

  const handleShowLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };
  return (
    <div className="header">
      <div className="logo-container">
        <img className="img-logo" src={makeSenseLogo} alt="" />
      </div>
      <nav className="navBar-icons">
        <ul className="navBar-list">
          <li>
            <Link
              className={
                pathname === "/logged/decisions"
                  ? "link-style active"
                  : "link-style"
              }
              to="/logged/decisions"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              <div className="li-text">Décisions</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === "/logged/users/:id/decisions"
                  ? "link-style active"
                  : "link-style"
              }
              to="/logged/users/:id/decisions"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <div
              className="notifications-icon-style"
              role="button"
              tabIndex="0"
              onKeyDown={() => {}}
              onClick={handleShowNotificationsMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              <div className="notification-icon-title">Notifications</div>
            </div>

            {showNotificationsMenu && (
              <NotificationButton
                showNotificationsMenu={showNotificationsMenu}
                setShowNotificationsMenu={setShowNotificationsMenu}
                handleShowNotificationsMenu={handleShowNotificationsMenu}
              />
            )}
          </li>
          <li>
            <Link
              className={
                pathname === "/logged/profile"
                  ? "link-style active"
                  : "link-style"
              }
              to="/logged/profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
      </nav>
      <LoginButton
        setShowLoginMenu={setShowLoginMenu}
        handleShowLoginMenu={handleShowLoginMenu}
        showLoginMenu={showLoginMenu}
        showNotificationsMenu={showNotificationsMenu}
        setShowNotificationsMenu={setShowNotificationsMenu}
        handleShowNotificationsMenu={handleShowNotificationsMenu}
      />
    </div>
  );
}
