import { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import NotificationButton from "./NotificationsMenu";
import userContext from "../../contexts/userContext";
import Lang from "../Lang";

export default function LoginButton({
  showLoginMenu,
  setShowLoginMenu,
  handleShowLoginMenu,
  showNotificationsMenu,
  handleShowNotificationsMenu,
  userRoleId,
  impacts,
  experts,
  ReadNotif,
  NotificationNumber,
  decisions,
  notifValidation,
}) {
  const menuRef = useRef();
  const { pathname } = useLocation();
  const { setUser, setToken, user } = useContext(userContext);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowLoginMenu(false);
      }
    };
    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [setShowLoginMenu]);

  const disconnect = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    document.cookie =
      "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    handleShowLoginMenu();
  };
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
        <img
          className="img-avatar"
          src={
            user.photo === "default_avatar.png"
              ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                  user.photo
                }`
              : `${import.meta.env.VITE_BACKEND_URL}/uploads/${user.photo}`
          }
          alt="avatar"
        />
      </div>
      <div className={showLoginMenu ? "login-menu" : "login-menu-hidden"}>
        <ul className="login-menu-app">
          <li>
            {" "}
            <Lang />
          </li>
          <li>
            <Link
              className={
                pathname === "/logged/decisions"
                  ? "link-style active"
                  : "link-style"
              }
              to="/logged/decisions"
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
              <div className="li-text">{t("header.decision")}</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === "/logged/users/mydecisions"
                  ? "link-style active"
                  : "link-style"
              }
              to="/logged/users/mydecisions"
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

              <div className="li-text">{t("header.my-decisions")}</div>
            </Link>
          </li>
          <li>
            <div
              className="notifications-icon"
              role="button"
              tabIndex="0"
              onKeyDown={() => {}}
              onClick={() => {
                handleShowLoginMenu();
                handleShowNotificationsMenu();
              }}
            >
              <div className="bell-container-button">
                {(experts.length > 0 || impacts.length > 0) && (
                  <div className="notif-number">{NotificationNumber}</div>
                )}
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
              </div>
              <div className="notification-icon-title">{t("header.notif")}</div>
            </div>
          </li>
          {userRoleId === 1 && (
            <li>
              <Link
                className={
                  pathname === "/logged/administration"
                    ? "link-style active"
                    : "link-style"
                }
                to="/logged/administration"
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
                <div className="li-text">{t("header.admin")}</div>
              </Link>
            </li>
          )}
        </ul>
        <ul className="login-menu-user">
          <li>
            <Link
              className={
                pathname === "/logged/myprofil"
                  ? "link-style active"
                  : "link-style"
              }
              to="/logged/myprofil"
              onClick={() => handleShowLoginMenu()}
            >
              <div className="li-text">{t("header.account")}</div>
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === "/logged/postdecision"
                  ? "link-style active"
                  : "link-style"
              }
              to="/logged/postdecision"
              onClick={() => handleShowLoginMenu()}
            >
              <div className="li-text">{t("header.creation")}</div>{" "}
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/" ? "link-style active" : "link-style"}
              to="/"
              onClick={disconnect}
            >
              <div className="li-text">{t("header.disconnect")}</div>{" "}
            </Link>
          </li>
        </ul>
      </div>
      {showNotificationsMenu && (
        <NotificationButton
          handleShowNotificationsMenu={handleShowNotificationsMenu}
          impacts={impacts}
          experts={experts}
          ReadNotif={ReadNotif}
          decisions={decisions}
          notifValidation={notifValidation}
        />
      )}
    </div>
  );
}

LoginButton.propTypes = {
  showLoginMenu: PropTypes.bool.isRequired,
  setShowLoginMenu: PropTypes.func.isRequired,
  handleShowLoginMenu: PropTypes.func.isRequired,
  showNotificationsMenu: PropTypes.bool.isRequired,
  handleShowNotificationsMenu: PropTypes.func.isRequired,
  userRoleId: PropTypes.number.isRequired,
  impacts: PropTypes.arrayOf(
    PropTypes.shape({
      decisionID: PropTypes.number.isRequired,
      is_notif_read: PropTypes.number.isRequired,
      sender: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  experts: PropTypes.arrayOf(
    PropTypes.shape({
      decisionID: PropTypes.number.isRequired,
      is_notif_read: PropTypes.number.isRequired,
      sender: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  decisions: PropTypes.arrayOf(
    PropTypes.shape({
      d_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  notifValidation: PropTypes.arrayOf(
    PropTypes.shape({
      d_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  ReadNotif: PropTypes.func.isRequired,
  NotificationNumber: PropTypes.number.isRequired,
};
