import { Slide, ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import DecisionsDetails from "../components/Profiles/AdminComponents/DecisionsDetails";
import DecisionsList from "../components/Profiles/AdminComponents/DecisionsList";
import DecisionsManagement from "../components/Profiles/AdminComponents/DecisionsManagement";
import UsersList from "../components/Profiles/AdminComponents/UsersList";
import StatsAnual from "../components/Profiles/AdminComponents/StatsAnual";

export default function Administration() {
  const [statsData, setStatsData] = useState([]);
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`, {
        withCredentials: true,
      })
      .then((response) => setStatsData(response.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="admin-global-container">
      <DecisionsDetails />
      <DecisionsManagement />
      <details className="details-container">
        <summary>
          Statistiques
          <hr />
        </summary>
        <StatsAnual statsData={statsData} />
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
