import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";

function reducer(state, action) {
  switch (action.type) {
    case "update_input":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}

const customStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#bdbdbd",
    };
  },
  control: (base) => ({
    ...base,
    boxShadow: "5px 5px 8px #bdbdbd",
    borderRadius: "10px",
    width: "auto",
    minWidth: "30vw",
  }),
};
export default function PostDecision() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  // const [expertUsers, setExpertUsers] = useState();
  const [impacted, setImpacted] = useState();
  // const [experts, setExperts] = useState();
  const [hub, setHub] = useState("--");

  const initialState = {
    title: "",
    content: "",
    usefulness: "",
    context: "",
    benefit: "",
    disavantages: "",
    concerned_hub: `${hub}`,
    positives_votes: 0,
    negatives_votes: 0,
    status_id: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // const users = [
  //   { id: 1, label: "Chocolate" },
  //   { id: 2, value: "strawberry", label: "Strawberry" },
  //   { id: 3, value: "vanilla", label: "Vanilla" },
  //   { id: 4, value: "chocole", label: "Chocole" },
  //   { id: 5, value: "strawbey", label: "Strawbey" },
  //   { id: 6, value: "vani", label: "Vani" },
  //   { id: 7, value: "colate", label: "colate" },
  //   { id: 8, value: "strberry", label: "Strberry" },
  //   { id: 9, value: "valla", label: "Valla" },
  //   { id: 10, value: "chlate", label: "Chlate" },
  //   { id: 11, value: "strerry", label: "Strerry" },
  //   { id: 12, value: "vania", label: "Vania" },
  // ];
  /* import users & experts for select */

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/concat`)
      .then((response) => {
        console.info(response.data);
        setUsers(response.data);
      });
    // .get(`${import.meta.env.VITE_BACKEND_URL}/users/experts`).then((response)=>
    // setExperts([response]));
  }, []);
  const filterUsers = (inputValue) => {
    return users.filter((user) =>
      user.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  // const filterExperts = (inputValue) => {
  //   return expertUsers.filter((expertUser) =>
  //     expertUser.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };
  const loadOptionsUsers = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterUsers(inputValue));
    }, 500);
  };
  // const loadOptionExperts = (inputValue, callback) => {
  //   setTimeout(() => {
  //     callback(filterExperts(inputValue));
  //   }, 1000);
  // };
  // const onChangeExpert = (inputValue) => {
  //   setExperts(inputValue);
  // };
  const onChangeImpacted = (inputValue) => {
    setImpacted(inputValue);
  };
  console.info(users);
  console.info(impacted);

  /* Post de la décision dans le back */
  function DecisionPosted(status) {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/decisions`, status)
      .then((response) => {
        if (response.status === 201) {
          // experts.map((expert) => {
          //   return axios.post(
          //     `${import.meta.env.VITE_BACKEND_URL}/decisions/:id/expert`,
          //     { expertId: expert.id, decisionId: response.data[0].Id }
          //   );
          // });
          impacted.map((impact) => {
            return axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/:id/impacted`,
              { impactedId: impact.id, decisionId: response.data[0].Id }
            );
          });
          setTimeout(() => {
            navigate(`/decisions/${response.data[0].insertId}`);
          }, 250);
        }
      });
  }

  return (
    <div className="post-container">
      <div className="title-container">
        <h1 className="post-decision">Poster une décision </h1>
      </div>

      <div className="decision-information">
        <label htmlFor="title_decision">
          Titre de la décision *
          <input
            type="text"
            id="title_decision"
            className="title-decision"
            placeholder="Déménager hors de Paris..."
            value={state.title}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "title",
              });
            }}
          />
        </label>

        <div className="hub-container">
          <label htmlFor="hub_decision">
            Pôle concerné *
            <select
              id="hub_decision"
              value={state.concerned_hub}
              onChange={(e) => {
                setHub(e.target.value);
              }}
            >
              <option value="--">--</option>
              <option value="Hub France">Hub France</option>
            </select>
          </label>
          <div className="hub-select">{state.concerned_hub}</div>
        </div>

        <div className="impacted-people">
          <label htmlFor="concerned_decision">
            Personnes concernées *
            <AsyncSelect
              styles={customStyles}
              cacheOptions
              defaultOptions
              loadOptions={loadOptionsUsers}
              isMulti
              onChange={onChangeImpacted}
            />
          </label>

          <label htmlFor="expert_decision">
            Personnes expertes *
            {/* <AsyncSelect
              styles={customStyles}
              cacheOptions
              defaultOptions
              loadOptions={loadOptionExperts}
              isMulti
              onChange={onChangeExpert}
            /> */}
          </label>
        </div>
      </div>

      <div className="decision-write">
        <label htmlFor="description_decision">
          Description de la décision *
          <textarea
            type="text"
            id="description_decision"
            value={state.content}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "content",
              });
            }}
          />
        </label>
        <label htmlFor="usefulness_decision">
          Utilité de cette décision pour l'organisation *
          <textarea
            type="text"
            id="usefulness_decision"
            value={state.usefulness}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "usefulness",
              });
            }}
          />
        </label>
        <label htmlFor="context_decision">
          Contexte autour de la décision *
          <textarea
            type="text"
            id="context_decision"
            value={state.context}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "context",
              });
            }}
          />
        </label>
        <label htmlFor="benefit_decision">
          Bénéfices de la décision *
          <textarea
            type="text"
            id="benefit_decision"
            value={state.benefit}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "benefit",
              });
            }}
          />
        </label>
        <label htmlFor="disavantages_decision">
          Inconvenients de la décision *
          <textarea
            type="text"
            id="disavantages_decision"
            value={state.disavantages}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "disavantages",
              });
            }}
          />
        </label>
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={() => {
            DecisionPosted(state);
          }}
        >
          Poster cette décision
        </button>
      </div>
    </div>
  );
}
