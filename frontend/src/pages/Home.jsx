import { useContext, useEffect, useState } from "react";
import axios from "axios";
import userContext from "../contexts/userContext";
import CardDecision from "../components/CardDecision";

export default function Home() {
  const { token } = useContext(userContext);
  const [allDecisions, setAllDecision] = useState([]);
  const [allStatus, setAllStatus] = useState([]);

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`, requestOptions)
      .then((res) => setAllDecision(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/status`)
      .then((res) => setAllStatus(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="all-decisions-container">
      <div className="timeline-zone" />
      <h1>Toutes les décisions</h1>
      {allStatus.map((statut) => (
        <div className="infos-status-container" key={statut.id}>
          <details className="details-container">
            <summary>
              {statut.title}
              <hr />
            </summary>
            <div className="cards-decision-container">
              {allDecisions
                .filter((decision) => decision.title_status === statut.title)
                .map((decision) => (
                  <CardDecision key={decision.d_id} decision={decision} />
                ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
