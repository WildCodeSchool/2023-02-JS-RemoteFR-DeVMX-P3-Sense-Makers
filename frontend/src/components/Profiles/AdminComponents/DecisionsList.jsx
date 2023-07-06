import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import oeil from "../../../assets/view.png";

function DecisionsList() {
  const navigate = useNavigate();
  const [decisions, setDecisions] = useState([]);
  const [filterDecision, setFilterDecision] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`, {
        withCredentials: true,
      })
      .then((res) => {
        setDecisions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="display-decisions">
      <input
        type="text"
        placeholder="recherche decision"
        value={filterDecision}
        onChange={(e) => setFilterDecision(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>titre</th>
            <th>status</th>
            <th>crée le</th>
            <th>Crée par</th>
          </tr>
        </thead>
        <tbody>
          {decisions &&
            decisions
              .filter((e) => {
                return e.title_decision.toLowerCase().includes(filterDecision);
              })
              .map((decision) => {
                const creationDate = new Date(decision.initial_date);
                return (
                  <tr key={decision.d_id}>
                    <td>{decision.d_id}</td>
                    <td>{decision.title_decision}</td>
                    <td>{decision.title_status}</td>
                    <td>{creationDate.toLocaleDateString("fr")}</td>
                    <td>
                      {decision.firstname} {decision.lastname}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="viewBtn"
                        onClick={() => {
                          return navigate(`/decisions/${decision.d_id}`);
                        }}
                      >
                        <img src={oeil} alt="" />
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default DecisionsList;
