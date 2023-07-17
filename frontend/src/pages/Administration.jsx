import { Slide, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import DecisionsList from "../components/Profiles/AdminComponents/DecisionsList";
import UsersList from "../components/Profiles/AdminComponents/UsersList";

export default function Administration() {
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
