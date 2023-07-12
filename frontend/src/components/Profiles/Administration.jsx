import { Slide, ToastContainer, toast } from "react-toastify";
import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsList from "./AdminComponents/DecisionsList";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import UsersList from "./AdminComponents/UsersList";

export default function Administration() {
  const userAddNotif = () => {
    toast.success("utilisateur ajouté", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
    toast.success("email envoyé", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };

  const userNotAddNotif = () => {
    toast.error("l'email existe déjà", {
      color: "white",
      backgroundColor: "red",
      icon: "❌",
    });
  };

  const userModifNotif = () => {
    toast.success("utilisateur modifié", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const userDeleteNotif = () => {
    toast.success("utilisateur supprimé", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const emailSend = () => {
    toast.success("email envoyé", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const emailNotSend = () => {
    toast.error("email non envoyé", {
      color: "white",
      backgroundColor: "red",
      icon: "❌",
    });
  };
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
      <ToastContainer autoClose={1500} transition={Slide} />
    </div>
  );
}
