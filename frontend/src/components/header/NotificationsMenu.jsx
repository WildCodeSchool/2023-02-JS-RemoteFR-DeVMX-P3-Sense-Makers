import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function NotificationsMenu({
  handleShowNotificationsMenu,
  impacts,
  experts,
  ReadNotif,
  decisions,
  notifValidation,
}) {
  const { t } = useTranslation();

  return (
    <div
      className="notifications-modal"
      role="button"
      tabIndex="0"
      onKeyDown={() => {}}
      onClick={handleShowNotificationsMenu}
    >
      <div className="notifications-container">
        <div className="close-btn">
          <button type="button" onClick={handleShowNotificationsMenu}>
            {" "}
            X{" "}
          </button>
        </div>
        <div className="notifications-title">{t("header.notif")}</div>

        <ul>
          {experts.length > 0 &&
            experts.map((expert) => (
              <Link
                className="notification-text"
                key={expert.decisionID}
                to={`/logged/decisions/${expert.decisionID}`}
                onClick={() => {
                  ReadNotif("taggedexperts", expert.decisionID, "Experts");
                  handleShowNotificationsMenu();
                }}
              >
                {expert.sender} {t("notifExpert")}
              </Link>
            ))}
          {impacts.length > 0 &&
            impacts.map((impact) => (
              <Link
                className="notification-text"
                key={impact.decisionID}
                to={`/logged/decisions/${impact.decisionID}`}
                onClick={() => {
                  ReadNotif("taggedimpacted", impact.decisionID, "Impacts");
                  handleShowNotificationsMenu();
                }}
              >
                {impact.sender} {t("notifImpacted")}
              </Link>
            ))}
          {decisions.map((decision) => (
            <Link
              className="notification-text"
              key={decision.d_id}
              to={`/logged/decisions/${decision.d_id}`}
              onClick={() => {
                handleShowNotificationsMenu();
              }}
            >
              {t("notifFirst")}
            </Link>
          ))}
          {notifValidation.length > 0 &&
            notifValidation.map((notifValid) => (
              <Link
                className="notification-text"
                key={notifValid.decisionID}
                to={`/logged/decisions/${notifValid.decisionID}`}
                onClick={() => {
                  handleShowNotificationsMenu();
                }}
              >
                {t("notifValid")}
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}

NotificationsMenu.propTypes = {
  handleShowNotificationsMenu: PropTypes.func.isRequired,
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
      d_id: PropTypes.number,
    })
  ),
  ReadNotif: PropTypes.func.isRequired,
};

NotificationsMenu.defaultProps = {
  notifValidation: PropTypes.arrayOf(
    PropTypes.shape({
      d_id: null,
    })
  ),
};
