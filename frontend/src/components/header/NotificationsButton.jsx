import PropTypes from "prop-types";

export default function NotificationButton({ handleShowNotificationsMenu }) {
  return (
    <div className="notifications-modal">
      <div className="notifications-container">
        <svg
          onClick={handleShowNotificationsMenu}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x icon-close-modal"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <div className="notifications-title">Notifications</div>
        <ul>
          <li className="li-notifications">Titre décision 1</li>
          <li className="li-notifications">Titre décision 2</li>
          <li className="li-notifications">Titre décision 3</li>
          <li className="li-notifications">Titre décision 4</li>
        </ul>
      </div>
    </div>
  );
}

NotificationButton.propTypes = {
  handleShowNotificationsMenu: PropTypes.func.isRequired,
};
