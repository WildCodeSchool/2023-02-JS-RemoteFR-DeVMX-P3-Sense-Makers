import { Slide, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import DecisionsList from "../components/Profiles/AdminComponents/DecisionsList";
import UsersList from "../components/Profiles/AdminComponents/UsersList";

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
  const { t } = useTranslation();

  return (
    <div className="admin-global-container">
      <details className="details-container">
        <summary>
          {t("admin.stats")}
          <hr />
        </summary>
      </details>
      <details className="details-container">
        <summary>
          {t("admin.userManagement")}
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
          {t("admin.decisionsManagement")}
          <hr />
        </summary>
        <DecisionsList />
      </details>
      <ToastContainer autoClose={1500} transition={Slide} />
    </div>
  );
}
