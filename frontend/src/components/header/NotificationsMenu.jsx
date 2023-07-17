import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function NotificationButton({
  handleShowNotificationsMenu,
  impacts,
  experts,
  ReadNotif,
}) {
  const { t } = useTranslation();

  function ShowNotif() {
    if (experts.length > 0) {
      return experts.map((expert) => {
        return (
          <Link
            className="notification-text"
            key={expert.decisionID}
            to={`/logged/decisions/${expert.decisionID}`}
            onClick={() => {
              ReadNotif("taggedexperts", expert.decisionID, "Experts");
              handleShowNotificationsMenu();
            }}
          >
            {expert.sender} {t("notif")}
          </Link>
        );
      });
    }
    if (impacts.length > 0) {
      return impacts.map((impact) => {
        return (
          <Link
            className="notification-text"
            key={impact.decisionID}
            to={`/logged/decisions/${impact.decisionID}`}
            onClick={() => {
              ReadNotif("taggedimpacted", impact.decisionID, "Impacts");
              handleShowNotificationsMenu();
            }}
          >
            {impact.sender} vous a indiqué comme impacté sur une décision
          </Link>
        );
      });
    }
  }
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
        <div className="notifications-title">{t("header.notif")}</div>
        <ul>{(experts.length > 0 || impacts.length > 0) && ShowNotif()}</ul>
      </div>
    </div>
  );
}

NotificationButton.propTypes = {
  handleShowNotificationsMenu: PropTypes.func.isRequired,
  impacts: PropTypes.arrayOf.isRequired,
  experts: PropTypes.arrayOf.isRequired,
  ReadNotif: PropTypes.func.isRequired,
};
