import PropTypes from "prop-types";
import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsList from "./AdminComponents/DecisionsList";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import UsersList from "./AdminComponents/UsersList";

export default function AdminProfile({
  userAddNotif,
  userNotAddNotif,
  userModifNotif,
  userDeleteNotif,
  emailSend,
  emailNotSend,
}) {
  return (
    <div className="admin-global-container">
      <DecisionsDetails />
      <DecisionsManagement />
      <details className="details-container">
        <summary>
          Statistiques
          <hr />
        </summary>
      </details>
      <details className="details-container">
        <summary>
          Gestion des utilisateurs
          <hr />
        </summary>
        <UsersList
          userAddNotif={userAddNotif}
          userNotAddNotif={userNotAddNotif}
          userModifNotif={userModifNotif}
          userDeleteNotif={userDeleteNotif}
          emailSend={emailSend}
          emailNotSend={emailNotSend}
        />
      </details>
      <details className="details-container">
        <summary>
          Gestion des decisions
          <hr />
        </summary>
        <DecisionsList />
      </details>
    </div>
  );
}
AdminProfile.propTypes = {
  userAddNotif: PropTypes.func.isRequired,
  userNotAddNotif: PropTypes.func.isRequired,
  userModifNotif: PropTypes.func.isRequired,
  userDeleteNotif: PropTypes.func.isRequired,
  emailSend: PropTypes.func.isRequired,
  emailNotSend: PropTypes.func.isRequired,
};
