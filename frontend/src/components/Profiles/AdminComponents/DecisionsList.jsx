import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import oeil from "../../../assets/view.png";

function DecisionsList() {
  const navigate = useNavigate();
  const [decisions, setDecisions] = useState([]);
  const [filterDecision, setFilterDecision] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = decisions.slice(firstIndex, lastIndex);
  const npage = Math.ceil(decisions.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
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

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCpage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
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
          {records &&
            records
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
                          return navigate(`/logged/decisions/${decision.d_id}`);
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
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button type="button" onClick={prePage}>
              Prev
            </button>
          </li>
          {numbers.map((n) => (
            <li
              className={`page-item-number ${
                currentPage === n ? "active" : ""
              }`}
              key={n}
            >
              <button type="button" onClick={() => changeCpage(n)}>
                {n}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" type="button" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DecisionsList;
