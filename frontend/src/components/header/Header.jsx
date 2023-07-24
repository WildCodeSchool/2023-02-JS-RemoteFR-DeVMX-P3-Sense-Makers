import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginButton from "./ProfileMenuButton";
import NotificationButton from "./NotificationsMenu";
import makeSenseLogo from "../../assets/make_sense.png";
import userContext from "../../contexts/userContext";
import Lang from "../Lang";

export default function Header() {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);

  const { pathname } = useLocation();
  const { user } = useContext(userContext);
  const { t } = useTranslation();

  const handleShowNotificationsMenu = () => {
    setShowNotificationsMenu(!showNotificationsMenu);
  };

  const handleShowLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const [impacts, setImpacts] = useState([]);
  const [experts, setExperts] = useState([]);
  const [decisions, setDecisions] = useState([]);

  const ReadNotif = useCallback(
    (concerned, Id) => {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}/${concerned}`,
          { decicionsId: Id },
          {
            withCredentials: true,
          }
        )
        .catch((err) => console.error(err));
    },
    [showNotificationsMenu]
  );
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}/taggedexperts`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setExperts(response.data);
      })
      .catch((err) => console.error(err));
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}/taggedimpacted`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setImpacts(response.data);
      })
      .catch((err) => console.error(err));
  }, [ReadNotif]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}/decisions`, {
        withCredentials: true,
      })
      .then((response) => {
        setDecisions(response.data.filter((data) => data.status_id === 2));
      })
      .catch((err) => console.error(err));
  }, []);

  function NotificationNumber() {
    return experts.length + impacts.length + decisions.length;
  }

  return (
    <div className="header">
      <div className="logo-container">
        <img className="img-logo" src={makeSenseLogo} alt="" />
      </div>
      <div className="navBar-and-loginButton">
        <nav className="navBar-icons">
          <ul className="navBar-list">
            <li>
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

                <div className="li-text">{t("header.my-decisions")}</div>
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
                <div className="bell-container">
                  {(experts.length > 0 || impacts.length > 0) && (
                    <div className="notif-number">{NotificationNumber()}</div>
                  )}
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
                </div>
                <div className="notification-icon-title">Notifications</div>
              </div>

              {showNotificationsMenu && (
                <NotificationButton
                  showNotificationsMenu={showNotificationsMenu}
                  setShowNotificationsMenu={setShowNotificationsMenu}
                  handleShowNotificationsMenu={handleShowNotificationsMenu}
                  impacts={impacts}
                  experts={experts}
                  ReadNotif={ReadNotif}
                  decisions={decisions}
                />
              )}
            </li>
            {user.role_id === 1 && (
              <li>
                <Link
                  className={
                    pathname === "/logged/administration"
                      ? "link-style active"
                      : "link-style"
                  }
                  to="/logged/administration"
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
                  <div className="li-text">{t("header.admin")}</div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <LoginButton
          setShowLoginMenu={setShowLoginMenu}
          handleShowLoginMenu={handleShowLoginMenu}
          showLoginMenu={showLoginMenu}
          showNotificationsMenu={showNotificationsMenu}
          setShowNotificationsMenu={setShowNotificationsMenu}
          handleShowNotificationsMenu={handleShowNotificationsMenu}
          userRoleId={user.role_id}
          impacts={impacts}
          experts={experts}
          setImpacts={setImpacts}
          setExperts={setExperts}
          ReadNotif={ReadNotif}
          decisions={decisions}
          NotificationNumber={NotificationNumber()}
        />
      </div>
    </div>
  );
}
