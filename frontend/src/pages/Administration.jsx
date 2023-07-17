import { Slide, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import DecisionsList from "../components/Profiles/AdminComponents/DecisionsList";
import UsersList from "../components/Profiles/AdminComponents/UsersList";
import StatsAnual from "../components/Profiles/AdminComponents/AnualStats";
import MonthlyStats from "../components/Profiles/AdminComponents/MonthlyStats";

export default function Administration() {
  const { t } = useTranslation();

  return (
    <div className="admin-global-container">
      <details className="details-container">
        <summary>
          {t("admin.stats")}
          <hr />
        </summary>
        <MonthlyStats />
        <div className="stats-chart" style={{ height: "60vh" }}>
          <StatsAnual />
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
