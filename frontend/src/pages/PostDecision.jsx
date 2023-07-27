import { useEffect, useReducer, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";
import TextEditor from "../components/TextEditors/TextEditor";
import userContext from "../contexts/userContext";

/* Style selector */
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

  options: (base) => ({
    ...base,
    backgroundColor: "white",
    border: "1px #bdbdbd solid",
    boxShadow: "5px 5px 8px #bdbdbd ",
    borderRadius: "10px",
  }),
};

/* Reducer definition */
function reducer(state, action) {
  switch (action.type) {
    case "update_input":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "update_hubID":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}
export default function PostDecision() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [expertUsers, setExpertUsers] = useState();
  const [impacted, setImpacted] = useState([]);
  const [experts, setExperts] = useState([]);
  const [hub, setHub] = useState([]);
  const [selectedHub, setSelectedHub] = useState();
  const { user } = useContext(userContext);
  const { t } = useTranslation();

  /*  reducer initialisation */
  const initialState = {
    title: "",
    content: "",
    usefulness: "",
    context: "",
    benefit: "",
    disadvantages: "",
    concerned_hub_id: 0,
    positives_votes: 0,
    negatives_votes: 0,
    status_id: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Add the  Hub id to send in the Back */
  useEffect(() => {
    for (let i = 0; i < hub.length; i += 1) {
      if (hub[i].title === selectedHub) {
        dispatch({
          type: "update_input",
          value: hub[i].id,
          key: "concerned_hub_id",
        });
      }
    }
  }, [selectedHub]);

  /* import users & experts for select */

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/concat`, {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/experts`, {
        withCredentials: true,
      })
      .then((response) => {
        setExpertUsers(response.data);
      });
  }, []);

  /* Import concerned Hub  */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/concernedhub`, {
        withCredentials: true,
      })
      .then((response) => {
        setHub(response.data);
      });
  }, []);

  /* Fonction for experts & impacted selection */
  const filterUsers = (inputValue) => {
    return users.filter((u) =>
      u.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionsUsers = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterUsers(inputValue));
    }, 500);
  };

  const filterExperts = (inputValue) => {
    return expertUsers.filter((expertUser) =>
      expertUser.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptionExperts = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterExperts(inputValue));
    }, 500);
  };

  /* Post decision to the back */
  function DecisionPosted(status) {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/decisions`, status, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          /* post dans user_décision */
          axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/decisions/:id/user`,
            {
              userId: user.id,
              decisionId: response.data[0].insertId,
            },
            { withCredentials: true }
          );

          experts.map((expert) => {
            return axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/:id/expert`,
              {
                expertId: expert.id,
                decisionId: response.data[0].insertId,
              },
              { withCredentials: true }
            );
          });
          impacted.map((impact) => {
            return axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/decisions/:id/impacted`,
              {
                impactedId: impact.id,
                decisionId: response.data[0].insertId,
              },
              { withCredentials: true }
            );
          });
        }
        toast.success(t("Toast.notifyDecision"), {
          color: "white",
          backgroundColor: "green",
          icon: "✔️",
        });
        setTimeout(() => {
          navigate(`/logged/decisions/${response.data[0].insertId}`);
        }, 2500);
      });
  }

  const editors = [
    [t("postDecision.editors.desc"), "content"],
    [t("postDecision.editors.usefulness"), "usefulness"],
    [t("postDecision.editors.context"), "context"],
    [t("postDecision.editors.benefit"), "benefit"],
    [t("postDecision.editors.disadvantages"), "disadvantages"],
  ];

  return (
    <div className="post-container">
      <div className="title-container">
        <h1 className="post-decision">{t("postDecision.title")}</h1>
      </div>

      <div className="decision-information">
        <label htmlFor="title_decision">
          {t("postDecision.inputs.title")} *
          <input
            type="text"
            id="title_decision"
            className="title-decision"
            placeholder={t("postDecision.placeholder")}
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
            {t("postDecision.inputs.hub")} *
            <select
              id="hub_decision"
              value={selectedHub}
              defaultValue="--"
              onChange={(e) => {
                setSelectedHub(e.target.value);
              }}
            >
              <option value="--">--</option>
              {hub.map((hu) => {
                return (
                  <option key={hu.id} value={hu.title}>
                    {hu.title}
                  </option>
                );
              })}
            </select>
          </label>
          {selectedHub && <div className="hub-select">{selectedHub}</div>}
        </div>

        <div className="impacted-people">
          <label htmlFor="concerned_decision">
            {t("postDecision.inputs.impacted")} *
            <AsyncSelect
              id="concerned_decision"
              styles={customStyles}
              cacheOptions
              defaultOptions={users}
              loadOptions={loadOptionsUsers}
              isMulti
              onChange={(inputValue) => setImpacted(inputValue)}
            />
          </label>

          <label htmlFor="expert_decision">
            {t("postDecision.inputs.experts")} *
            <AsyncSelect
              id="expert_decision"
              styles={customStyles}
              cacheOptions
              defaultOptions={expertUsers}
              loadOptions={loadOptionExperts}
              isMulti
              onChange={(inputValue) => setExperts(inputValue)}
            />
          </label>
        </div>
      </div>

      <div className="decision-write">
        {editors.map((edit) => {
          return (
            <TextEditor
              key={edit[1]}
              name={edit[1]}
              title={edit[0]}
              refInit={edit[3]}
              dispatch={dispatch}
            />
          );
        })}
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={() => {
            DecisionPosted(state);
          }}
        >
          {t("postDecision.button")}
        </button>
      </div>
      <ToastContainer autoClose={1500} transition={Slide} />
    </div>
  );
}
