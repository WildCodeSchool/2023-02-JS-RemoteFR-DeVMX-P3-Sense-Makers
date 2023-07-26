import { Slide, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import DecisionsList from "../components/AdminComponents/DecisionsList";
import UsersList from "../components/AdminComponents/UsersList";
import AnualStats from "../components/AdminComponents/AnualStats";
import MonthlyStats from "../components/AdminComponents/MonthlyStats";

export default function Administration() {
  const { t } = useTranslation();

  return (
    <div className="admin-global-container">
      <div className="timeline-zone" />
      <h1> {t("admin.title")}</h1>
      <details className="details-container">
        <summary>
          {t("admin.stats")}
          <hr />
        </summary>
        <MonthlyStats />
        <div className="stats-chart">
          <AnualStats />
        </div>
      </details>
      <details className="details-container">
        <summary>
          {t("admin.userManagement")}
          <hr />
        </summary>
        <UsersList />
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
