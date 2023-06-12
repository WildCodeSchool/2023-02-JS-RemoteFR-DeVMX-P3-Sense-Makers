import { useState } from "react";

export default function NotificationButton() {
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(true);

  const handleShowNotificationsMenu = () => {
    setShowNotificationsMenu(!showNotificationsMenu);
  };
  return (
    <>
      <div
        role="button"
        tabIndex="0"
        onKeyDown={() => {}}
        onClick={handleShowNotificationsMenu}
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
          className="feather feather-bell"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <div className="icon-title">Notifications</div>
      </div>
      {showNotificationsMenu && (
        <div className="notifications-modal">
          <div className="notifications-container">
            <div className="notifications-title">Notifications</div>
            <ul>
              <li>Titre décision 1</li>
              <li>Titre décision 2</li>
              <li>Titre décision 3</li>
              <li>Titre décision 4</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
