import { Slide, ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import DecisionsDetails from "../components/Profiles/AdminComponents/DecisionsDetails";
import DecisionsList from "../components/Profiles/AdminComponents/DecisionsList";
import DecisionsManagement from "../components/Profiles/AdminComponents/DecisionsManagement";
import UsersList from "../components/Profiles/AdminComponents/UsersList";
import StatsAnual from "../components/Profiles/AdminComponents/StatsAnual";

export default function Administration() {
  const [decisionsData, setDecisionsData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  // console.log("🚀 - statsData:", statsData);

  // statsData.forEach((decision) => console.log(decision.finishedValid));
  // console.log("🚀 - statsData:", decisionsData);

  // const decisionsDates = [];

  // for (const decision of decisionsData) {
  //   const date = new Date(decision.initial_date);
  //   const month = date.toLocaleString("default", { month: "long" });
  //   decisionsDates.push(month);
  // }
  // console.log("🚀 - decisionsDates:", decisionsDates);

  const getStatsData = (data) => {
    const monthArray = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const decisionsByMonth = [];

    for (let i = 0; i < monthArray.length; i += 1) {
      const resultByMonth = [];

      const statsResult = {
        created: 0,
        firstMadeDecision: 0,
        waitingFor: 0,
        waitingForExpert: 0,
        notFinished: 0,
        finishedValid: 0,
        finishedNotValid: 0,
        totalFinished: 0,
      };

      for (const decision of data) {
        const date = new Date(decision.initial_date);
        const month = date.toLocaleString("default", {
          month: "long",
        });
        if (month === monthArray[i]) {
          const decisionStatus = decision.status_id;
          const isValidatedDecision = decision.is_validated;
          // console.log("🚀 - isValidatedDecision:", isValidatedDecision);

          switch (decisionStatus) {
            case 2:
              statsResult.waitingFor += 1;
              break;
            case 3:
              statsResult.firstMadeDecision += 1;
              break;
            case 4:
              statsResult.waitingForExpert += 1;
              break;
            case isValidatedDecision === false:
              statsResult.finishedNotValid += 1;
              break;
            case isValidatedDecision === true:
              statsResult.finishedValid += 1;
              break;
            case 6:
              statsResult.totalFinished += 1;
              break;
            case 7:
              statsResult.finishedNotValid += 1;
              break;
            default:
              break;
          }
          statsResult.created += 1;
        }
      }
      resultByMonth.push(statsResult);

      decisionsByMonth.push(resultByMonth[0]);
    }
    setStatsData(decisionsByMonth);
  };

  useEffect(() => {
    getStatsData(decisionsData);
    // statsData.forEach((decision) => console.log(decision.finishedValid));
  }, [decisionsData]);

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
      .then((response) => setDecisionsData(response.data))
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
